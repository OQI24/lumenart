import { LandingImage, LandingForm } from "@/components/landings/shared";
import { LANDING_CONTACTS } from "@/lib/landings/contacts";
import EntryDate from "@/components/landings/diary/EntryDate";
import HeaderNav from "@/components/landings/diary/HeaderNav";
import HeroStickers from "@/components/landings/diary/HeroStickers";
import ScrapbookPages from "@/components/landings/diary/ScrapbookPages";
import VoicesCarousel from "@/components/landings/diary/VoicesCarousel";
import "./theme.css";

const TOC = [
  { href: "#opening", label: "Открытие тетради" },
  { href: "#studio", label: "Кто пишет" },
  { href: "#spine", label: "Хронология" },
  { href: "#partners", label: "Партнёры" },
  { href: "#scrapbook", label: "Другие проекты" },
  { href: "#materials", label: "Материалы" },
  { href: "#voices", label: "Голоса" },
] as const;

const MOBILE_NAV = [
  { href: "#studio", label: "Кто ведёт" },
  { href: "#why", label: "Почему так" },
  { href: "#scrapbook", label: "Скрапбук" },
  { href: "#styles", label: "Характеры света" },
  { href: "#voices", label: "Голоса" },
  { href: "#last", label: "Новая запись" },
  { href: "/diary/privacy/", label: "Конфиденциальность" },
] as const;

const ENTRIES = [
  {
    day: "День 1",
    title: "Первый разговор за столом",
    text: "Приехали с планами квартиры и пачкой референсов. В каталоге «всё не то», это было ясно сразу. Разобрали, где завтракают, где работают, где сидят вечером. Договорились просто: днём свет спокойный, вечером камерный, без постановки.",
    note: "Потолок 2,95 м. Металл: тёплая латунь.",
    image: "/images/stock/apartment.jpg",
  },
  {
    day: "День 3",
    title: "Три направления на одном листе",
    text: "Нарисовали три варианта для столовой и гостиной. Первый вышел слишком декоративным, второй слишком сухим. Третий связал зоны длинной линией и не мешал жить в комнате. Его и взяли дальше.",
    note: "Эскиз №3: 2,4 м, два уровня яркости.",
    image: "/images/stock/about.jpg",
  },
  {
    day: "День 6",
    title: "Модель и правка с дизайнером",
    text: "Собрали 3D в масштабе комнаты, проверили высоту над столом и диваном, отправили дизайнеру. Правки небольшие: чуть опустили подвес, убрали лишний изгиб. Форма стала тише и точнее.",
    note: "Модель и размеры ушли в общий чат проекта.",
    image: "/images/stock/office.jpg",
  },
  {
    day: "День 10",
    title: "Образцы на столе",
    text: "Привезли две патины латуни и три стекла. Смотрели днём и вечером рядом с деревом и текстилем из квартиры. Остановились на тёплом металле и опале: рядом с мебелью не спорит, свет рассеивается мягко.",
    note: "Утвердили образец B2. Стекло матовое.",
    image: "/images/stock/style-artdeco.jpg",
  },
  {
    day: "День 14",
    title: "Узлы, крепления, схема",
    text: "Конструктор разложил подвесы, питание и доступ для обслуживания. Для потолка подготовили закладные и порядок монтажа. После этого на объекте обычно уже не бывает сюрпризов: всё записано.",
    note: "220 В + DALI. Раму для обслуживания снимать не нужно.",
    image: "/images/stock/style-minimal.jpg",
  },
  {
    day: "День 18",
    title: "Цех: рама, электрика, тест",
    text: "Собрали раму, проложили электрику, прогнали каждый модуль. На стенде включили сценарии «утро / день / ужин / ночь» и подкрутили диммирование, чтобы переходы не дёргались.",
    note: "Фото из цеха ушли заказчику в тот же день.",
    image: "/images/stock/style-industrial.jpg",
  },
  {
    day: "День 22",
    title: "Упаковка и доставка",
    text: "Модули упаковали отдельно и пронумеровали. На объекте не ищем, что куда: открываем по порядку и собираем как по записям в тетради.",
    note: "Доставка по Москве. Время стыковали с ремонтной бригадой.",
    image: "/images/stock/lobby.jpg",
  },
  {
    day: "День 25",
    title: "Монтаж и первое включение",
    text: "Монтаж занял день. Вечером выставили четыре сценария под ритм дома. Хозяйка сказала: «В гостиной наконец хочется оставаться». Лучшая строка в этой тетради.",
    note: "Пульт объяснили за 20 минут. Гарантийный лист передали.",
    image: "/images/stock/home.jpg",
  },
] as const;

const PARTNERS = [
  {
    role: "Дизайнерам интерьера",
    text: "Отдаём 3D, образцы и выезжаем на согласование с заказчиком. Свет должен держать ваш проект, а не перетягивать его на себя.",
  },
  {
    role: "Архитекторам и девелоперам",
    text: "До производства фиксируем узлы, сроки и бюджет. Делаем и штучные вещи, и повторяемые решения для лобби и общих зон.",
  },
  {
    role: "Владельцам домов и квартир",
    text: "Одна команда от эскиза до включения. Этапы понятные, по ходу приходят фото, а готовый свет живёт в комнате, а не только на картинке.",
  },
] as const;

const WHY = [
  {
    title: "Своё производство",
    text: "Ключевые этапы не раздаём по подрядчикам. Форма, металл, сборка и контроль остаются у нас.",
  },
  {
    title: "Около 14 дней",
    text: "После утверждения образца держим ровный производственный ритм. Даты пишем в договоре.",
  },
  {
    title: "Монтаж своими бригадами",
    text: "Ставим, подключаем, настраиваем сценарии и коротко показываем, как всем этим пользоваться.",
  },
  {
    title: "Скидка 5% на расчёт",
    text: "Если заявка через форму, в смете на расчёт проекта считаем скидку 5%.",
  },
] as const;

const SCRAPBOOK = [
  { title: "Ресторан", caption: "Акцент над столами гостей", image: "/images/stock/restaurant.jpg" },
  { title: "Лобби", caption: "Подвес как арт-объект", image: "/images/stock/lobby.jpg" },
  { title: "Отель", caption: "Тёплый свет у ресепшен", image: "/images/stock/hotel.jpg" },
  { title: "Шоурум", caption: "Треки и точечные акценты", image: "/images/stock/showroom.jpg" },
  { title: "Кафе", caption: "Вечерний сценарий зала", image: "/images/stock/cafe.jpg" },
  { title: "Офис", caption: "Линейный свет open space", image: "/images/stock/office.jpg" },
] as const;

const MATERIALS = [
  { name: "Патинированная латунь", detail: "Тёплый металл, который стареет красиво" },
  { name: "Опаловое стекло", detail: "Мягкое рассеивание без резкой тени" },
  { name: "Алюминиевый профиль", detail: "Точная геометрия длинных линий" },
  { name: "Свет 2700-3000 K", detail: "Домашняя температура без желтизны" },
  { name: "CRI 95+", detail: "Цвета материалов остаются честными" },
  { name: "DALI / Zigbee / KNX", detail: "Управление, которое стыкуется с домом" },
] as const;

const VOICES = [
  {
    quote:
      "Особенно понравился этап с образцами. Мы увидели будущий свет до производства и были спокойны за результат.",
    name: "Марина С.",
    role: "Владелица квартиры",
  },
  {
    quote:
      "Дизайнеру удобно работать: модель, размеры и материалы приходят вовремя, без бесконечных «уточним позже».",
    name: "Игорь П.",
    role: "Дизайнер интерьера",
  },
  {
    quote:
      "На объекте монтаж прошёл по чертежу. Никаких сюрпризов с закладными. Вечером уже настраивали сценарии.",
    name: "Анна К.",
    role: "Архитектор",
  },
  {
    quote:
      "В ресторане после настройки гости стали дольше задерживаться за столами. Свет собрал зал, не перетянув на себя внимание.",
    name: "Сергей М.",
    role: "Управляющий ресторана",
  },
  {
    quote:
      "Для лобби нужно было повторяемое решение. Получили систему, а не один красивый объект «на удачу».",
    name: "Елена В.",
    role: "Девелопер",
  },
  {
    quote:
      "В частном доме сделали четыре сценария. Утром и вечером свет ощущается по-разному, и это как раз то, чего не хватало.",
    name: "Дмитрий Н.",
    role: "Владелец дома",
  },
  {
    quote:
      "Согласовали металл и стекло за один выезд. Дальше производство шло по утверждённому образцу, без переигрывания.",
    name: "Ольга Р.",
    role: "Дизайнер интерьера",
  },
  {
    quote:
      "В офисе нужно было убрать блики с мониторов и оставить тёплый вечер. Получилось ровно так, как обсуждали на макете.",
    name: "Павел Т.",
    role: "Руководитель студии",
  },
  {
    quote:
      "Чертежи пришли вместе с узлами крепления. Монтажники сразу поняли порядок, объект сдали без доработок.",
    name: "Кирилл А.",
    role: "Прораб",
  },
  {
    quote:
      "Для спальни сделали тихий свет без «отельного» блеска. Вечером комната стала спокойнее, чем на рендерах.",
    name: "Наталья Ф.",
    role: "Заказчица",
  },
  {
    quote:
      "Брали сложную геометрию над лестницей. Конструкция держала форму, свет лёг ровно, без пятен на ступенях.",
    name: "Артём Л.",
    role: "Архитектор",
  },
  {
    quote:
      "Сроки совпали с отделкой. Привезли, повесили, настроили. На объекте не пришлось ничего придумывать заново.",
    name: "Виктория Г.",
    role: "Дизайнер проекта",
  },
  {
    quote:
      "В кафе хотели один характер света на весь зал. После настройки место стало узнаваемым, но без театральности.",
    name: "Роман Б.",
    role: "Владелец кафе",
  },
  {
    quote:
      "Попросили повторить решение в двух квартирах одного ЖК. Вторая сборка совпала с первой по тону и высоте.",
    name: "Ирина М.",
    role: "Менеджер объекта",
  },
  {
    quote:
      "Форма заявки, выезд, эскиз, образец, монтаж. Всё шло по дням, как в дневнике. Это и успокоило больше всего.",
    name: "Алексей Ю.",
    role: "Владелец квартиры",
  },
] as const;

export default function DiaryLanding() {
  return (
    <main className="s12">
      <header className="s12-header">
        <div className="s12-header-brand">
          <b>LumenArt</b>
          <span>Дневник светового проекта</span>
        </div>
        <HeaderNav toc={TOC} menu={MOBILE_NAV} />
      </header>

      <section className="s12-hero" id="opening">
        <div className="s12-hero-copy">
          <EntryDate />
          <p className="s12-kicker">Тетрадь №42 · Москва</p>
          <h1>Как свет становится частью дома</h1>
          <p className="s12-lead">
            Хронология одного проекта: от разговора за столом до вечера, когда всё задуманное сбылось.
            Только дни, конкретные этапы и что сделали по факту.
          </p>
          <div className="s12-hero-meta">
            <span>5 ключевых этапов</span>
            <span>1 команда</span>
            <span>4 световых сценария</span>
          </div>
        </div>
        <HeroStickers />
      </section>

      <section className="s12-note" id="studio">
        <aside className="s12-hand s12-hand-ink">На полях</aside>
        <div>
          <h2>Кто ведёт этот дневник</h2>
          <p>
            LumenArt проектирует, производит и ставит индивидуальный свет. В одной тетради рядом
            дизайнер, конструктор, мастер, монтажник и заказчик. Поэтому работа не расползается
            по разным подрядчикам: за каждый день кто-то отвечает.
          </p>
          <p>
            Москва и область. После согласования образца обычно укладываемся примерно в 14 дней.
            Свет собираем под конкретную комнату, а не выбираем наугад из каталога.
          </p>
          <ul className="s12-facts">
            <li>
              <strong>150+</strong>
              <span>реализованных проектов</span>
            </li>
            <li>
              <strong>12</strong>
              <span>лет практики</span>
            </li>
            <li>
              <strong>14</strong>
              <span>дней в среднем</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="s12-why" id="why">
        <p className="s12-hand s12-hand-deep">Почему так ведём проекты</p>
        <h2>Четыре правила этой тетради</h2>
        <div className="s12-why-grid">
          {WHY.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="s12-spine" id="spine">
        <div className="s12-spine-intro">
          <p className="s12-hand s12-hand-ink">Основная часть</p>
          <h2>Хронология: от разговора до включения</h2>
          <p>
            Ниже ход одного жилого проекта. Сроки у вас могут быть другими, порядок тот же:
            сначала задача, потом форма, потом металл, потом свет в комнате.
          </p>
        </div>

        <div className="s12-spine-list">
          {ENTRIES.map((entry, index) => (
            <article
              key={entry.day}
              className={`s12-entry${index === ENTRIES.length - 1 ? " is-last" : ""}`}
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
                  <span className="s12-hand">заметка</span>
                  {entry.note}
                </p>
                <LandingImage
                  src={entry.image}
                  alt={entry.title}
                  className={`s12-photo s12-photo-${index % 4}`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="s12-insert" id="partners">
        <div className="s12-insert-head">
          <p className="s12-hand">Вкладной лист</p>
          <h2>Кому оставляем место на полях</h2>
        </div>
        <div className="s12-insert-grid">
          {PARTNERS.map((partner) => (
            <div key={partner.role} className="s12-partner">
              <b>{partner.role}</b>
              <p>{partner.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="s12-pages" id="scrapbook">
        <div className="s12-pages-head">
          <p className="s12-hand s12-hand-ink">Скрапбук</p>
          <h2>Страницы из других проектов</h2>
          <p>Не только этот дом. Короткие вклейки из других объектов.</p>
        </div>
        <ScrapbookPages items={SCRAPBOOK} />
      </section>

      <section className="s12-spec" id="materials">
        <div className="s12-spec-head">
          <p className="s12-hand s12-hand-deep">Вклейка</p>
          <h2>Материалы и техника</h2>
          <p>Обычно это прячут в спецификации. Здесь рядом с фото: и на глаз, и по делу.</p>
        </div>
        <div className="s12-spec-grid">
          {MATERIALS.map((item) => (
            <article key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="s12-styles" id="styles">
        <div className="s12-styles-head">
          <p className="s12-hand s12-hand-ink">Ещё несколько почерков</p>
          <h2>Какие характеры света ведём чаще всего</h2>
        </div>
        <div className="s12-styles-grid">
          <article>
            <LandingImage src="/images/stock/style-artdeco.jpg" alt="Ар-деко" className="s12-style-img" />
            <h3>Ар-деко</h3>
            <p>Геометрия, латунь, симметрия. Свет как ювелирная деталь интерьера.</p>
          </article>
          <article>
            <LandingImage src="/images/stock/style-minimal.jpg" alt="Минимализм" className="s12-style-img" />
            <h3>Минимализм</h3>
            <p>Чистые линии и тихие поверхности. Свет работает, не споря с архитектурой.</p>
          </article>
          <article>
            <LandingImage src="/images/stock/style-industrial.jpg" alt="Индастриал" className="s12-style-img" />
            <h3>Индастриал</h3>
            <p>Металл, открытые узлы, честная конструкция. Фактура важнее декора.</p>
          </article>
          <article>
            <LandingImage src="/images/stock/style-classic.jpg" alt="Классика" className="s12-style-img" />
            <h3>Классика</h3>
            <p>Тёплый рассеянный свет, проверенные формы, спокойная роскошь вечером.</p>
          </article>
        </div>
      </section>

      <section className="s12-review" id="voices">
        <p className="s12-hand">Записано со слов</p>
        <h2>Голоса из готовых проектов</h2>
        <VoicesCarousel voices={VOICES} />
      </section>

      <section className="s12-last" id="last">
        <div>
          <p className="s12-hand s12-hand-ink">Последняя запись пока свободна</p>
          <h2>С чего начнётся ваш проект ?</h2>
          <p>
            Коротко опишите пространство, сроки и референсы. Ответим с первым ориентиром
            по решению, сроку и бюджету. В расчёте через форму скидка 5%.
          </p>
        </div>
        <div className="s12-sticker">
          <span className="s12-sticker-tape" aria-hidden="true" />
          <p className="s12-hand s12-sticker-label">новая запись</p>
          <LandingForm
            className="s12-form"
            submitLabel="Начать дневник проекта"
            privacyHref="/diary/privacy/"
          />
        </div>
      </section>

      <footer className="s12-foot">
        <p className="s12-foot-backdrop" aria-hidden="true">
          LumenArt
        </p>
        <div className="s12-foot-inner">
          <div className="s12-foot-contacts">
            <a href={`tel:${LANDING_CONTACTS.phoneRaw}`}>{LANDING_CONTACTS.phone}</a>
            <a href={`mailto:${LANDING_CONTACTS.email}`}>{LANDING_CONTACTS.email}</a>
            <a href={LANDING_CONTACTS.telegram} target="_blank" rel="noopener noreferrer">
              Telegram {LANDING_CONTACTS.telegramHandle}
            </a>
          </div>
          <div className="s12-foot-meta">
            <p>{LANDING_CONTACTS.address}</p>
            <a href="/diary/privacy/">Политика конфиденциальности</a>
            <p>© {new Date().getFullYear()} LumenArt</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
