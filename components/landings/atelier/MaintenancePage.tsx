import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import { ATELIER_COPY } from "@/lib/landings/atelier-content";
import "./theme.css";

export default function AtelierMaintenance() {
  const copy = ATELIER_COPY.maintenance;

  return (
    <div className="atelier">
      <div className="atelier-static-bg" aria-hidden="true" />
      <div className="atelier-grain" aria-hidden="true" />

      <main className="atelier-status">
        <article className="atelier-sheet">
          <p className="atelier-eyebrow">{copy.kicker}</p>
          <h1>{copy.title}</h1>
          <p className="atelier-copy">{copy.lead}</p>
          <div className="atelier-actions">
            <a className="atelier-btn" href={`tel:${LANDING_CONTACTS.phoneRaw}`}>
              {LANDING_CONTACTS.phone}
            </a>
            <a
              className="atelier-btn"
              href={LANDING_CONTACTS.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {LANDING_CONTACTS.telegramHandle}
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
