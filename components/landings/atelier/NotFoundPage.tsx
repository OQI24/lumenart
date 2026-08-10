import Link from "next/link";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import { ATELIER_COPY } from "@/lib/landings/atelier-content";
import "./theme.css";

export default function AtelierNotFound() {
  const copy = ATELIER_COPY.notFound;

  return (
    <div className="atelier">
      <div className="atelier-static-bg" aria-hidden="true" />
      <div className="atelier-grain" aria-hidden="true" />

      <main className="atelier-status">
        <article className="atelier-sheet">
          <p className="atelier-eyebrow">{copy.kicker}</p>
          <p className="code">{copy.code}</p>
          <h1>{copy.title}</h1>
          <p className="atelier-copy">{copy.lead}</p>
          <div className="atelier-actions">
            <Link className="atelier-btn" href="/atelier/">
              {copy.back}
            </Link>
            <a className="atelier-btn" href={`mailto:${LANDING_CONTACTS.email}`}>
              {copy.mail}
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
