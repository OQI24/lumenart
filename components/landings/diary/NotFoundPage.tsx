import Link from "next/link";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import StatusParticles from "@/components/landings/diary/StatusParticles";
import "@/components/landings/diary/theme.css";
import "@/components/landings/diary/status.css";

export default function DiaryNotFound() {
  return (
    <main className="s12 s12-status">
      <StatusParticles />

      <p className="s12-status-brand" aria-hidden="true">
        {"LumenArt"}
      </p>

      <article className="s12-status-sheet">
        <span className="s12-sticker-tape s12-status-tape" aria-hidden="true" />
        <p className="s12-hand s12-hand-ink s12-status-kicker">{"запись не найдена"}</p>
        <p className="s12-status-code">
          {"404"}
          <span className="s12-status-code-strike" aria-hidden="true" />
        </p>
        <h1>{"Этой страницы нет в тетради"}</h1>
        <p className="s12-status-lead">
          {"Лист либо вырвали, либо его ещё не вклеили. Вернитесь к дневнику проекта "}
          {LANDING_CONTACTS.name}
          {" — там записи на месте."}
        </p>

        <div className="s12-status-empty" aria-hidden="true">
          <p className="s12-hand s12-hand-deep s12-status-empty-label">
            {"место под фото пусто"}
          </p>
        </div>

        <p className="s12-status-note">
          <span className="s12-hand">{"на полях"}</span>
          {"Если искали конкретный проект — напишите нам. Подскажем, где смотреть."}
        </p>

        <div className="s12-status-actions">
          <Link className="s12-status-link" href="/diary/">
            {"к дневнику проекта"}
          </Link>
          <a className="s12-status-link" href={`mailto:${LANDING_CONTACTS.email}`}>
            {"написать на почту"}
          </a>
        </div>
      </article>
    </main>
  );
}
