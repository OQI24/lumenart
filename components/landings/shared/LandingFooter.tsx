import Link from "next/link";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import { LANDING_COPY } from "@/lib/landings/copy";
import { cn } from "@/lib/utils";

interface LandingFooterProps {
  className?: string;
}

export default function LandingFooter({ className }: LandingFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-[var(--landing-border)] py-10 text-sm text-[var(--landing-muted)]",
        className,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 font-[family-name:var(--landing-font-display)] text-lg text-[var(--landing-fg)]">
            {LANDING_CONTACTS.name}
          </p>
          <div className="space-y-1">
            <p>
              <a
                href={`tel:${LANDING_CONTACTS.phoneRaw}`}
                className="transition-colors hover:text-[var(--landing-fg)]"
              >
                {LANDING_CONTACTS.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${LANDING_CONTACTS.email}`}
                className="transition-colors hover:text-[var(--landing-fg)]"
              >
                {LANDING_CONTACTS.email}
              </a>
            </p>
            <p>
              <a
                href={LANDING_CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--landing-fg)]"
              >
                Telegram {LANDING_CONTACTS.telegramHandle}
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href="/privacy/"
            className="transition-colors hover:text-[var(--landing-fg)]"
          >
            {LANDING_COPY.footer.privacy}
          </Link>
          <p>
            © {year} {LANDING_CONTACTS.name}. {LANDING_COPY.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
