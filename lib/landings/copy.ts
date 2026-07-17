/** Сдержанный копирайт для лендинга /diary. Без em dash в UI. */

export const LANDING_COPY = {
  brand: "LumenArt",
  hero: {
    title: "Индивидуальное дизайнерское освещение. Проект, производство и монтаж.",
    subtitle: "Москва и область. Средний срок изготовления - 14 дней.",
    cta: "Получить расчёт со скидкой 5%",
  },
  about: {
    title: "О студии",
    paragraphs: [
      "Делаем свет под конкретный интерьер, а не из готового каталога. Сценарий собираем под задачу помещения: жилой, ресторан, лобби или шоурум.",
      "Проект ведём от эскиза до включения на объекте. Чертежи, производство, контроль качества и монтаж остаются в одной команде.",
    ],
  },
  audience: {
    title: "Для кого работаем",
    designers: {
      title: "Дизайнерам интерьера",
      text: "Работаем как партнёры студии: 3D-модели, образцы материалов, согласование с заказчиком и монтаж на объекте.",
    },
    developers: {
      title: "Девелоперам и архитекторам",
      text: "Серийные и уникальные решения для лобби, общественных зон и типовых планировок. Сроки и бюджет фиксируем заранее.",
    },
  },
  process: {
    title: "Как работаем",
    steps: [
      {
        title: "Задача и референсы",
        description: "Разбираем бриф, собираем референсы и фиксируем техническое задание.",
      },
      {
        title: "3D и согласование",
        description: "Готовим модель, согласуем материалы, размеры и тип света.",
      },
      {
        title: "Производство",
        description: "Изготавливаем у себя с контролем на каждом этапе.",
      },
      {
        title: "Доставка",
        description: "Упаковываем и привозим готовое изделие на объект.",
      },
      {
        title: "Монтаж",
        description: "Устанавливаем, подключаем и показываем, как управлять светом.",
      },
    ],
  },
  projects: {
    title: "Проекты",
    items: [
      {
        id: "restaurant",
        title: "Ресторан",
        category: "HoReCa",
        image: "/images/stock/restaurant.jpg",
      },
      {
        id: "office",
        title: "Офис",
        category: "Коммерция",
        image: "/images/stock/office.jpg",
      },
      {
        id: "home",
        title: "Частный дом",
        category: "Жилой",
        image: "/images/stock/home.jpg",
      },
      {
        id: "lobby",
        title: "Лобби",
        category: "Public",
        image: "/images/stock/lobby.jpg",
      },
      {
        id: "showroom",
        title: "Шоурум",
        category: "Retail",
        image: "/images/stock/showroom.jpg",
      },
      {
        id: "hotel",
        title: "Отель",
        category: "Hospitality",
        image: "/images/stock/hotel.jpg",
      },
    ],
  },
  styles: {
    title: "Стили света",
    items: [
      {
        id: "art-deco",
        title: "Ар-деко",
        description: "Геометрия, латунь и симметрия. Акцентный свет с характером.",
        image: "/images/stock/style-artdeco.jpg",
      },
      {
        id: "minimal",
        title: "Минимализм",
        description: "Чистые линии и спокойный свет без лишнего декора.",
        image: "/images/stock/style-minimal.jpg",
      },
      {
        id: "industrial",
        title: "Индастриал",
        description: "Металл, бетон и открытые конструкции в рабочем свете.",
        image: "/images/stock/style-industrial.jpg",
      },
      {
        id: "classic",
        title: "Классика",
        description: "Тёплый рассеянный свет, латунь и проверенные формы.",
        image: "/images/stock/style-classic.jpg",
      },
    ],
  },
  testimonials: {
    title: "Отзывы",
    items: [
      {
        id: 1,
        quote:
          "Сделали ровно то, что мы задумали. Свет стал главным акцентом зала. Сроки совпали, на монтаже без сюрпризов.",
        author: "Анна К.",
        role: "Архитектор",
      },
      {
        id: 2,
        quote:
          "Уже третий объект с LumenArt. Берут нестандартные задачи спокойно, и это экономит нам время на объекте.",
        author: "Михаил Д.",
        role: "Дизайнер интерьеров",
      },
      {
        id: 3,
        quote:
          "Свет для загородного дома: от проекта до установки у одной команды. Вечером дома совсем другое ощущение.",
        author: "Елена С.",
        role: "Владелец частного дома",
      },
    ],
  },
  contacts: {
    title: "Контакты",
    subtitle: "Оставьте заявку. Подготовим смету под задачу и бюджет.",
    formCta: "Получить расчёт со скидкой 5%",
    successTitle: "Заявка отправлена",
    successText: "Свяжемся в течение 30 минут и учтём скидку 5% к проекту.",
  },
  footer: {
    privacy: "Политика конфиденциальности",
    rights: "Все права защищены.",
  },
  images: {
    hero: "/images/stock/hero.jpg",
    about: "/images/stock/about.jpg",
    designers: "/images/stock/showroom.jpg",
    developers: "/images/stock/lobby.jpg",
  },
} as const;

export type LandingCopy = typeof LANDING_COPY;
