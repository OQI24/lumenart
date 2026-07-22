"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { DIARY_PRELOAD_IMAGES } from "@/components/landings/diary/diary-preload-images";

/** Sync with theme.css / HeroStickers mobile breakpoint. */
const MOBILE_GATE_MQ = "(max-width: 1099px)";
const MOBILE_TIMEOUT_MS = 10_000;
const STALL_MS = 300;
const ONE_ASSET_MS = 8_000;
const SOFT_CAP = 0.85;
const SOFT_TAU_MS = 2_400;

const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function withBasePath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  if (!BASE_PATH) return src;
  if (src === BASE_PATH || src.startsWith(`${BASE_PATH}/`)) return src;
  return `${BASE_PATH}${src}`;
}

function softFrac(elapsedMs: number): number {
  return SOFT_CAP * (1 - Math.exp(-elapsedMs / SOFT_TAU_MS));
}

function warmImageDecode(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(failSafe);
      resolve();
    };
    const afterLoad = () => {
      if (typeof img.decode === "function") {
        img.decode().then(finish, finish);
      } else {
        finish();
      }
    };
    const failSafe = window.setTimeout(finish, ONE_ASSET_MS);
    img.onload = afterLoad;
    img.onerror = finish;
    img.src = src;
    if (img.complete) afterLoad();
  });
}

function preloadAsset(
  src: string,
  onFrac: (frac: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  const url = withBasePath(src);

  return new Promise((resolve) => {
    if (signal?.aborted) {
      onFrac(1);
      resolve();
      return;
    }

    const xhr = new XMLHttpRequest();
    const started = performance.now();
    let lastSoft = 0;
    let useBytes = false;
    let settled = false;
    let softTimer = 0;

    const clearSoft = () => {
      if (!softTimer) return;
      window.clearInterval(softTimer);
      softTimer = 0;
    };

    const reportSoft = () => {
      if (useBytes) return;
      const next = softFrac(performance.now() - started);
      if (next > lastSoft) {
        lastSoft = next;
        onFrac(next);
      }
    };

    const settle = (warm: () => Promise<void>) => {
      if (settled) return;
      settled = true;
      clearSoft();
      onFrac(1);
      void warm().finally(resolve);
    };

    const onAbort = () => {
      if (settled) return;
      settled = true;
      clearSoft();
      xhr.abort();
      onFrac(1);
      resolve();
    };

    signal?.addEventListener("abort", onAbort, { once: true });
    reportSoft();
    softTimer = window.setInterval(reportSoft, 80);

    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.timeout = ONE_ASSET_MS;

    xhr.onprogress = (e) => {
      if (e.lengthComputable && e.total > 0) {
        useBytes = true;
        clearSoft();
        onFrac(Math.min(1, e.loaded / e.total));
      } else {
        reportSoft();
      }
    };

    xhr.onload = () => {
      settle(async () => {
        try {
          if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
            const objectUrl = URL.createObjectURL(xhr.response as Blob);
            try {
              await warmImageDecode(objectUrl);
            } finally {
              URL.revokeObjectURL(objectUrl);
            }
          } else {
            await warmImageDecode(url);
          }
        } catch {
          await warmImageDecode(url);
        }
      });
    };

    xhr.onerror = () => {
      settle(() => warmImageDecode(url).catch(() => undefined));
    };

    xhr.ontimeout = () => {
      settle(() => Promise.resolve());
    };

    xhr.send();
  });
}

function statusCopy(ratio: number): string {
  if (ratio < 0.35) return "собираем тетрадь…";
  if (ratio < 0.75) return "открываем дневник…";
  return "почти готово…";
}

function labelOffset(percent: number, indeterminate: boolean): string {
  if (indeterminate || (percent > 0 && percent < 100)) return "-50%";
  return percent <= 0 ? "0%" : "-100%";
}

type DiaryPreloadProps = {
  children: ReactNode;
  images?: readonly string[];
};

/** ready=false на SSR/первом paint — иначе hydrate mismatch; mobile gate, desktop prefetch. */
export default function DiaryPreload({
  children,
  images = DIARY_PRELOAD_IMAGES,
}: DiaryPreloadProps) {
  const [ready, setReady] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [stalled, setStalled] = useState(false);

  const genRef = useRef(0);
  const fracsRef = useRef<number[]>([]);
  const rafRef = useRef(0);

  const total = images.length;
  const percent = Math.min(100, Math.round(ratio * 100));
  const indeterminate = stalled && ratio < 0.01 && !ready;

  useEffect(() => {
    const gen = ++genRef.current;
    const mobile = window.matchMedia(MOBILE_GATE_MQ).matches;
    const ac = new AbortController();

    const alive = () => genRef.current === gen;

    if (!mobile) {
      void Promise.allSettled(
        images.map((src) => preloadAsset(src, () => {}, ac.signal)),
      );
      setReady(true);
      return () => ac.abort();
    }

    fracsRef.current = Array.from({ length: total }, () => 0);
    setRatio(0);
    setStalled(false);
    setReady(false);

    const flushUi = () => {
      rafRef.current = 0;
      if (!alive()) return;
      if (total === 0) {
        setRatio(1);
        return;
      }
      const sum = fracsRef.current.reduce((a, b) => a + b, 0);
      setRatio(sum / total);
    };

    const scheduleUi = () => {
      if (!alive() || rafRef.current) return;
      rafRef.current = requestAnimationFrame(flushUi);
    };

    const setFrac = (index: number, frac: number) => {
      if (!alive()) return;
      const prev = fracsRef.current[index] ?? 0;
      const next = Math.max(prev, Math.min(1, frac));
      if (next === prev) return;
      fracsRef.current[index] = next;
      scheduleUi();
    };

    const open = () => {
      if (!alive()) return;
      for (let i = 0; i < total; i++) fracsRef.current[i] = 1;
      setRatio(1);
      setReady(true);
    };

    const stallTimer = window.setTimeout(() => {
      if (!alive()) return;
      setStalled(true);
      void Promise.allSettled(
        images.map((src) => preloadAsset(src, () => {}, ac.signal)),
      );
    }, STALL_MS);

    const timeout = window.setTimeout(open, MOBILE_TIMEOUT_MS);

    if (total === 0) {
      window.clearTimeout(timeout);
      window.clearTimeout(stallTimer);
      open();
    } else {
      void Promise.allSettled(
        images.map((src, i) =>
          preloadAsset(src, (frac) => setFrac(i, frac), ac.signal),
        ),
      ).then(() => {
        window.clearTimeout(timeout);
        window.clearTimeout(stallTimer);
        open();
      });
    }

    return () => {
      ac.abort();
      window.clearTimeout(timeout);
      window.clearTimeout(stallTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [images, total]);

  const fillStyle = indeterminate
    ? undefined
    : ({ "--progress": `${percent}%` } as CSSProperties);

  return (
    <div className={`s12 s12-preload${ready ? " is-ready" : ""}`}>
      <div
        className="s12-preload-splash"
        aria-hidden={ready}
        aria-busy={!ready}
        role="status"
        aria-live="polite"
      >
        <div className="s12-preload-sheet">
          <div className="s12-preload-flip" aria-hidden="true">
            <span className="s12-preload-page s12-preload-page--back" />
            <span className="s12-preload-page s12-preload-page--mid" />
            <span className="s12-preload-page s12-preload-page--front" />
          </div>

          <p className="s12-preload-brand">{"LumenArt"}</p>
          <p className="s12-hand s12-hand-ink s12-preload-line">
            {statusCopy(ratio)}
          </p>
          <p className="s12-preload-sub">{"Дневник светового проекта"}</p>

          <div
            className={`s12-preload-progress${indeterminate ? " is-indeterminate" : ""}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={indeterminate ? undefined : percent}
            aria-label="Загрузка изображений"
          >
            <div className="s12-preload-progress-track">
              <div className="s12-preload-progress-fill" style={fillStyle} />
            </div>
            <div className="s12-preload-progress-rail" aria-hidden="true">
              <span
                className="s12-hand s12-hand-deep s12-preload-progress-label"
                style={{
                  left: indeterminate ? "50%" : `${percent}%`,
                  transform: `translateX(${labelOffset(percent, indeterminate)})`,
                }}
              >
                {indeterminate ? "…" : `${percent}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="s12-preload-content">{ready ? children : null}</div>
    </div>
  );
}
