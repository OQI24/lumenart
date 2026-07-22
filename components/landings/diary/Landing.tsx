import { LandingImage, LandingForm } from "@/components/landings/shared";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import {
  DIARY_COPY,
  DIARY_ENTRIES,
  DIARY_MATERIALS,
  DIARY_MOBILE_NAV,
  DIARY_PARTNERS,
  DIARY_SCRAPBOOK,
  DIARY_STYLES,
  DIARY_TOC,
  DIARY_VOICES,
  DIARY_WHY,
} from "@/lib/landings/diary-content";
import DiaryPreload from "@/components/landings/diary/DiaryPreload";
import EntryDate from "@/components/landings/diary/EntryDate";
import HeaderNav from "@/components/landings/diary/HeaderNav";
import HeroStickers from "@/components/landings/diary/HeroStickers";
import ScrapbookPages from "@/components/landings/diary/ScrapbookPages";
import VoicesCarousel from "@/components/landings/diary/VoicesCarousel";
import "./theme.css";

export default function DiaryLanding() {
  const copy = DIARY_COPY;

  return (
    <DiaryPreload>
      <main>
        <header className="s12-header">
          <HeaderNav
            brand={copy.brand}
            tagline={copy.tagline}
            toc={DIARY_TOC}
            menu={DIARY_MOBILE_NAV}
          />
        </header>

        <section className="s12-hero" id="opening">
          <div className="s12-hero-copy">
            <EntryDate />
            <p className="s12-kicker">{copy.hero.kicker}</p>
            <h1>{copy.hero.title}</h1>
            <p className="s12-lead">{copy.hero.lead}</p>
            <div className="s12-hero-meta">
              {copy.hero.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <HeroStickers />
        </section>

        <section className="s12-note" id="studio">
          <aside className="s12-hand s12-hand-ink">{copy.studio.aside}</aside>
          <div>
            <h2>{copy.studio.title}</h2>
            {copy.studio.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <ul className="s12-facts">
              {copy.studio.facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="s12-why" id="why">
          <p className="s12-hand s12-hand-deep">{copy.why.hand}</p>
          <h2>{copy.why.title}</h2>
          <div className="s12-why-grid">
            {DIARY_WHY.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="s12-spine" id="spine">
          <div className="s12-spine-intro">
            <p className="s12-hand s12-hand-ink">{copy.spine.hand}</p>
            <h2>{copy.spine.title}</h2>
            <p>{copy.spine.lead}</p>
          </div>

          <div className="s12-spine-list">
            {DIARY_ENTRIES.map((entry, index) => (
              <article
                key={entry.day}
                className={`s12-entry${index === DIARY_ENTRIES.length - 1 ? " is-last" : ""}`}
              >
                <div className="s12-rail" aria-hidden="true">
                  <span className="s12-rail-dot" />
                  <span className="s12-rail-line" />
                </div>
                <time dateTime={`day-${index + 1}`}>{entry.day}</time>
                <div className="s12-entry-body">
                  <h3>{entry.title}</h3>
                  <p>{entry.text}</p>
                  <p className="s12-margin-note">
                    <span className="s12-hand">{copy.spine.noteLabel}</span>
                    {entry.note}
                  </p>
                  <LandingImage
                    src={entry.image}
                    alt={entry.title}
                    className={`s12-photo s12-photo-${index % 4}`}
                    loading={index < 2 ? "eager" : undefined}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="s12-insert" id="partners">
          <div className="s12-insert-head">
            <p className="s12-hand">{copy.partners.hand}</p>
            <h2>{copy.partners.title}</h2>
          </div>
          <div className="s12-insert-grid">
            {DIARY_PARTNERS.map((partner) => (
              <div key={partner.role} className="s12-partner">
                <b>{partner.role}</b>
                <p>{partner.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="s12-pages" id="scrapbook">
          <div className="s12-pages-head">
            <p className="s12-hand s12-hand-ink">{copy.scrapbook.hand}</p>
            <h2>{copy.scrapbook.title}</h2>
            <p>{copy.scrapbook.lead}</p>
          </div>
          <ScrapbookPages items={DIARY_SCRAPBOOK} />
        </section>

        <section className="s12-spec" id="materials">
          <div className="s12-spec-head">
            <p className="s12-hand s12-hand-deep">{copy.materials.hand}</p>
            <h2>{copy.materials.title}</h2>
            <p>{copy.materials.lead}</p>
          </div>
          <div className="s12-spec-grid">
            {DIARY_MATERIALS.map((item) => (
              <article key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="s12-styles" id="styles">
          <div className="s12-styles-head">
            <p className="s12-hand s12-hand-ink">{copy.styles.hand}</p>
            <h2>{copy.styles.title}</h2>
          </div>
          <div className="s12-styles-grid">
            {DIARY_STYLES.map((style) => (
              <article key={style.title}>
                <LandingImage
                  src={style.image}
                  alt={style.title}
                  className="s12-style-img"
                />
                <h3>{style.title}</h3>
                <p>{style.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="s12-review" id="voices">
          <p className="s12-hand">{copy.voices.hand}</p>
          <h2>{copy.voices.title}</h2>
          <VoicesCarousel voices={DIARY_VOICES} />
        </section>

        <section className="s12-last" id="last">
          <div>
            <p className="s12-hand s12-hand-ink">{copy.cta.hand}</p>
            <h2>{copy.cta.title}</h2>
            <p>{copy.cta.text}</p>
          </div>
          <div className="s12-sticker">
            <span className="s12-sticker-tape" aria-hidden="true" />
            <p className="s12-hand s12-sticker-label">{copy.cta.stickerLabel}</p>
            <LandingForm
              className="s12-form"
              submitLabel={copy.cta.submitLabel}
              privacyHref={copy.footer.privacyHref}
            />
          </div>
        </section>

        <footer className="s12-foot">
          <p className="s12-foot-backdrop" aria-hidden="true">
            {copy.brand}
          </p>
          <div className="s12-foot-inner">
            <div className="s12-foot-contacts">
              <a href={`tel:${LANDING_CONTACTS.phoneRaw}`}>{LANDING_CONTACTS.phone}</a>
              <a href={`mailto:${LANDING_CONTACTS.email}`}>{LANDING_CONTACTS.email}</a>
              <a href={LANDING_CONTACTS.telegram} target="_blank" rel="noopener noreferrer">
                {"Telegram "}
                {LANDING_CONTACTS.telegramHandle}
              </a>
            </div>
            <div className="s12-foot-meta">
              <p>{LANDING_CONTACTS.address}</p>
              <a href={copy.footer.privacyHref}>{copy.footer.privacy}</a>
              <p>
                {"© "}
                {new Date().getFullYear()}
                {" "}
                {copy.brand}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </DiaryPreload>
  );
}
