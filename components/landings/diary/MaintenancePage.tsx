import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import StatusParticles from "@/components/landings/diary/StatusParticles";
import "@/components/landings/diary/theme.css";
import "@/components/landings/diary/status.css";

export default function DiaryMaintenance() {
  return (
    <main className="s12 s12-status">
      <StatusParticles />

      <p className="s12-status-brand" aria-hidden="true">
        {"LumenArt"}
      </p>

      <article className="s12-status-sheet is-maint">
        <span className="s12-sticker-tape s12-status-tape" aria-hidden="true" />
        <p className="s12-hand s12-hand-deep s12-status-kicker">{"временно недоступен"}</p>
        <h1>{"Сайт на обслуживании"}</h1>
        <p className="s12-status-lead">
          {LANDING_CONTACTS.name}
          {
            " — индивидуальный свет для интерьера. Сейчас обновляем сайт, поэтому страницы временно закрыты. По вопросам проектов пишите или звоните: ответим как обычно."
          }
        </p>

        <div className="s12-status-desk" aria-hidden="true">
          <div className="s12-status-lines">
            <span className="s12-status-line" />
            <span className="s12-status-line" />
            <span className="s12-status-line" />
            <span className="s12-status-line" />
          </div>
          <span className="s12-status-pen" />
          <span className="s12-status-blot" />
        </div>

        <p className="s12-status-note">
          <span className="s12-hand">{"контакты"}</span>
          {
            "Телефон, почта и Telegram — всё работает. Скоро вернёмся с обновлённым сайтом."
          }
        </p>

        <div className="s12-status-contacts">
          <a href={`tel:${LANDING_CONTACTS.phoneRaw}`}>{LANDING_CONTACTS.phone}</a>
          <a href={`mailto:${LANDING_CONTACTS.email}`}>{LANDING_CONTACTS.email}</a>
          <a href={LANDING_CONTACTS.telegram} target="_blank" rel="noopener noreferrer">
            {"Telegram "}
            {LANDING_CONTACTS.telegramHandle}
          </a>
        </div>
      </article>
    </main>
  );
}
