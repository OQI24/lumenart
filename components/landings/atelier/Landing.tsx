import Image from "next/image";
import { LandingForm } from "@/components/landings/shared";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import {
  ATELIER_ASSEMBLY,
  ATELIER_CHAPTERS,
  ATELIER_COPY,
  ATELIER_MATERIALS,
  ATELIER_PHOTOS,
} from "@/lib/landings/atelier-content";
import HeaderNav from "@/components/landings/atelier/HeaderNav";
import AtelierMagnetic from "@/components/landings/atelier/AtelierMagnetic";
import MotionController from "@/components/landings/atelier/MotionController";
import Preloader from "@/components/landings/atelier/Preloader";
import SceneCanvas from "@/components/landings/atelier/SceneCanvas";
import "./theme.css";

export default function AtelierLanding() {
  const copy = ATELIER_COPY;

  return (
    <div className="atelier">
      <a className="atelier-skip" href="#opening">
        {"Перейти к содержанию"}
      </a>
      <Preloader />
      <div className="atelier-poster" aria-hidden="true" />
      <SceneCanvas />
      <MotionController />
      <div className="atelier-grain" aria-hidden="true" />
      <HeaderNav />

      <main>
        <section className="atelier-hero" id="opening">
          <div className="atelier-sheet atelier-hero-sheet" data-paper-layer="14">
            <span className="atelier-tape atelier-tape-top" aria-hidden="true" />
            <p className="atelier-date" data-hero-item>
              {copy.hero.date}
            </p>
            <p className="atelier-eyebrow" data-hero-item>
              {copy.hero.eyebrow}
            </p>
            <h1 data-split-title>{copy.hero.title}</h1>
            <p className="atelier-lead" data-hero-item>
              {copy.hero.lead}
            </p>
            <a className="atelier-primary-link" href="#sketch" data-hero-item>
              <span>{copy.hero.scroll}</span>
              <i aria-hidden="true">{"↓"}</i>
            </a>
            <p className="atelier-hand atelier-hero-hand" data-hero-item>
              {copy.hero.hand}
            </p>
          </div>

          <aside className="atelier-object-card" data-hero-item>
            <span>{copy.hero.objectLabel}</span>
            <div className="atelier-object-cross" aria-hidden="true" />
          </aside>

          <nav className="atelier-chapter-index" aria-label={copy.menu}>
            {ATELIER_CHAPTERS.map((chapter) => (
              <a href={chapter.href} key={chapter.num} data-hero-item>
                <span>{chapter.num}</span>
                <strong>{chapter.title}</strong>
                <small>{chapter.note}</small>
              </a>
            ))}
          </nav>
        </section>

        <section className="atelier-section atelier-sketch" id="sketch">
          <div className="atelier-section-number" aria-hidden="true">
            {"01"}
          </div>
          <article
            className="atelier-sheet atelier-story-sheet is-sketch"
            data-atelier-reveal
            data-paper-layer="-18"
          >
            <span className="atelier-tape atelier-tape-top" aria-hidden="true" />
            <p className="atelier-hand" data-reveal-item>
              {copy.sketch.hand}
            </p>
            <p className="atelier-eyebrow" data-reveal-item>
              {copy.sketch.chapter}
            </p>
            <h2 data-split-title>{copy.sketch.title}</h2>
            <p className="atelier-copy" data-reveal-item>
              {copy.sketch.body}
            </p>
            <dl className="atelier-facts" data-reveal-item>
              {copy.sketch.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
            <p className="atelier-margin-note" data-reveal-item>
              {copy.sketch.note}
            </p>
          </article>
        </section>

        <section className="atelier-section atelier-materials" id="materials">
          <div className="atelier-section-number" aria-hidden="true">
            {"02"}
          </div>

          <article className="atelier-sheet atelier-story-sheet is-material" data-atelier-reveal>
            <span className="atelier-tape atelier-tape-corner" aria-hidden="true" />
            <p className="atelier-hand" data-reveal-item>
              {copy.materials.hand}
            </p>
            <p className="atelier-eyebrow" data-reveal-item>
              {copy.materials.chapter}
            </p>
            <h2 data-split-title>{copy.materials.title}</h2>
            <p className="atelier-copy" data-reveal-item>
              {copy.materials.body}
            </p>
            <div className="atelier-swatches" data-reveal-item>
              {ATELIER_MATERIALS.map((material) => (
                <article key={material.index}>
                  <span className={`atelier-swatch is-${material.swatch}`} aria-hidden="true" />
                  <div>
                    <small>{material.index}</small>
                    <h3>{material.name}</h3>
                    <p>{material.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="atelier-margin-note" data-reveal-item>
              {copy.materials.note}
            </p>
          </article>

          <div className="atelier-photo-pile" data-atelier-reveal data-paper-layer="28">
            {ATELIER_PHOTOS.slice(0, 2).map((photo) => (
              <AtelierMagnetic className={`atelier-photo ${photo.className}`} key={photo.src}>
                <span className="atelier-tape" aria-hidden="true" />
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={720}
                  height={900}
                  unoptimized
                />
                <figcaption>{photo.caption}</figcaption>
              </AtelierMagnetic>
            ))}
          </div>
        </section>

        <section className="atelier-section atelier-assembly" id="assembly">
          <div className="atelier-section-number" aria-hidden="true">
            {"03"}
          </div>
          <header
            className="atelier-sheet atelier-assembly-intro"
            data-atelier-reveal
            data-paper-layer="-12"
          >
            <span className="atelier-tape atelier-tape-corner" aria-hidden="true" />
            <p className="atelier-hand" data-reveal-item>
              {copy.assembly.hand}
            </p>
            <p className="atelier-eyebrow" data-reveal-item>
              {copy.assembly.chapter}
            </p>
            <h2 data-split-title>{copy.assembly.title}</h2>
            <p className="atelier-copy" data-reveal-item>
              {copy.assembly.body}
            </p>
          </header>

          <div className="atelier-stack">
            {ATELIER_ASSEMBLY.map((part) => (
              <article className="atelier-sheet atelier-stack-card" data-stack-card key={part.num}>
                <span>{part.num}</span>
                <h3>{part.title}</h3>
                <p>{part.detail}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
          <p className="atelier-hand atelier-assembly-note">{copy.assembly.note}</p>
        </section>

        <section className="atelier-section atelier-first-light" id="first-light">
          <div className="atelier-section-number" aria-hidden="true">
            {"04"}
          </div>
          <AtelierMagnetic className="atelier-night-photo">
            <span className="atelier-tape" aria-hidden="true" />
            <Image
              src={ATELIER_PHOTOS[2].src}
              alt={ATELIER_PHOTOS[2].alt}
              width={960}
              height={1080}
              unoptimized
            />
            <figcaption>{ATELIER_PHOTOS[2].caption}</figcaption>
          </AtelierMagnetic>

          <article className="atelier-night-copy" data-atelier-reveal>
            <p className="atelier-hand" data-reveal-item>
              {copy.firstLight.hand}
            </p>
            <p className="atelier-eyebrow" data-reveal-item>
              {copy.firstLight.chapter}
            </p>
            <h2 data-split-title>{copy.firstLight.title}</h2>
            <p className="atelier-copy" data-reveal-item>
              {copy.firstLight.body}
            </p>
            <blockquote data-reveal-item>
              <p>{copy.firstLight.quote}</p>
              <cite>{copy.firstLight.quoteAuthor}</cite>
            </blockquote>
          </article>
        </section>

        <section className="atelier-section atelier-contacts" id="contacts">
          <div className="atelier-sheet atelier-contact-sheet" data-atelier-reveal>
            <span className="atelier-tape atelier-tape-top" aria-hidden="true" />
            <div className="atelier-contact-copy">
              <p className="atelier-hand" data-reveal-item>
                {copy.contacts.hand}
              </p>
              <p className="atelier-eyebrow" data-reveal-item>
                {copy.contacts.chapter}
              </p>
              <h2 data-split-title>{copy.contacts.title}</h2>
              <p className="atelier-copy" data-reveal-item>
                {copy.contacts.body}
              </p>
            </div>
            <div className="atelier-form-wrap" data-reveal-item>
              <LandingForm
                privacyHref="/atelier/privacy/"
                submitLabel={copy.contacts.formCta}
                submitVariant="fill"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="atelier-footer">
        <p className="atelier-footer-backdrop" aria-hidden="true">
          {copy.brand}
        </p>
        <div className="atelier-footer-inner">
          <div className="atelier-footer-contacts">
            <a href={`tel:${LANDING_CONTACTS.phoneRaw}`}>{LANDING_CONTACTS.phone}</a>
            <a href={`mailto:${LANDING_CONTACTS.email}`}>{LANDING_CONTACTS.email}</a>
            <a href={LANDING_CONTACTS.telegram} target="_blank" rel="noopener noreferrer">
              {"Telegram "}
              {LANDING_CONTACTS.telegramHandle}
            </a>
          </div>
          <div className="atelier-footer-meta">
            <a href={copy.footer.privacyHref}>{copy.footer.privacy}</a>
            <p>
              {copy.footer.city}
              {" "}
              {new Date().getFullYear()}
              {" "}
              {copy.brand}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
