import Link from "next/link";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import "@/components/landings/diary/theme.css";
import "@/components/landings/diary/privacy.css";

export default function DiaryPrivacy() {
  return (
    <main className="s12 s12-privacy">
      <p className="s12-privacy-brand" aria-hidden="true">
        LumenArt
      </p>

      <article className="s12-privacy-sheet">
        <span className="s12-sticker-tape s12-privacy-tape" aria-hidden="true" />

        <Link className="s12-privacy-back" href="/diary/">
          ← к дневнику проекта
        </Link>

        <p className="s12-hand s12-hand-ink s12-privacy-kicker">юридическая запись</p>
        <h1>Политика конфиденциальности</h1>

        <div className="s12-privacy-body">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты
            персональных данных пользователей сайта LumenArt (далее — «Сайт»),
            принадлежащего компании LumenArt (далее — «Компания»).
          </p>

          <h2>1. Какие данные мы собираем</h2>
          <p>
            При заполнении формы заявки на Сайте мы можем запрашивать следующие данные:
            имя, номер телефона, описание задачи. Данные предоставляются пользователем
            добровольно.
          </p>

          <h2>2. Цели обработки</h2>
          <p>
            Персональные данные используются исключительно для связи с пользователем,
            подготовки коммерческого предложения и оказания услуг Компании.
          </p>

          <h2>3. Хранение и защита</h2>
          <p>
            Компания принимает необходимые организационные и технические меры для защиты
            персональных данных от несанкционированного доступа, изменения, раскрытия или
            уничтожения.
          </p>

          <h2>4. Передача третьим лицам</h2>
          <p>
            Персональные данные не передаются третьим лицам, за исключением случаев,
            предусмотренных законодательством Российской Федерации.
          </p>

          <h2>5. Контакты</h2>
          <p>
            По вопросам обработки персональных данных обращайтесь по адресу:{" "}
            <a href={`mailto:${LANDING_CONTACTS.email}`}>{LANDING_CONTACTS.email}</a>
          </p>

          <p className="s12-privacy-updated">Дата последнего обновления: 30 июня 2026 г.</p>
        </div>
      </article>
    </main>
  );
}
