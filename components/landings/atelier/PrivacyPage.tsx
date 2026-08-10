import Link from "next/link";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import { ATELIER_COPY } from "@/lib/landings/atelier-content";
import "./theme.css";

export default function AtelierPrivacy() {
  const copy = ATELIER_COPY.privacy;

  return (
    <div className="atelier">
      <div className="atelier-static-bg" aria-hidden="true" />
      <div className="atelier-grain" aria-hidden="true" />

      <main className="atelier-privacy">
        <article className="atelier-sheet">
          <Link className="atelier-back" href="/atelier/">
            {copy.back}
          </Link>
          <p className="atelier-eyebrow">{copy.kicker}</p>
          <h1>{copy.title}</h1>

          <div className="atelier-privacy-body">
            {copy.sections.map((section, index) => (
              <div key={section.heading ?? `intro-${index}`}>
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.body ? <p>{section.body}</p> : null}
                {section.heading === "5. Контакты" ? (
                  <p>
                    {"По вопросам обработки персональных данных обращайтесь по адресу: "}
                    <a href={`mailto:${LANDING_CONTACTS.email}`}>{LANDING_CONTACTS.email}</a>
                  </p>
                ) : null}
              </div>
            ))}
            <p>{copy.updated}</p>
          </div>
        </article>
      </main>
    </div>
  );
}
