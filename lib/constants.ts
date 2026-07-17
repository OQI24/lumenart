export const SITE = {
  name: "LumenArt",
  phone: "+7 (930) 777-96-90",
  phoneRaw: "+79307779690",
  email: "lyumen.art@yandex.ru",
  address: "Москва и Московская область",
  social: {
    telegram: "https://t.me/lyumen_art",
    telegramHandle: "@lyumen_art",
    vk: "#",
    instagram: "#",
  },
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lumenart.pro";

export const SITE_DESCRIPTION =
  "Индивидуальное дизайнерское освещение: проект, производство и монтаж. Сроки держим. Расчёт проекта со скидкой 5%.";

export const HERO_KPIS = [
  { value: "150+", label: "реализованных проектов" },
  { value: "12", label: "лет на рынке" },
  { value: "14", label: "дней в среднем" },
] as const;

export const AUDIENCE_SEGMENTS = [
  {
    id: "designers",
    title: "Для дизайнеров интерьера",
    description:
      "Работаем как партнёры студии: 3D-модели, образцы материалов, согласование с заказчиком и монтаж на объекте",
    image: "/images/stock/showroom.jpg",
    href: "#contacts",
    cta: "Подробнее →",
  },
  {
    id: "developers",
    title: "Для девелоперов и архитекторов",
    description:
      "Серийные и уникальные решения для лобби, общественных зон и типовых планировок. Сроки и бюджет фиксируем заранее.",
    image: "/images/stock/lobby.jpg",
    href: "#contacts",
    cta: "Подробнее →",
  },
] as const;

export const ABOUT_PARAGRAPHS = [
  "Мы делаем свет под конкретный интерьер, а не под каталог. Типовые схемы нам скучны: нужен сценарий, который работает именно в этом пространстве.",
  "Проект ведём сами от эскиза до включения на объекте. Чертежи, расчёт, контроль качества и монтаж не отдаём на сторону. Так быстрее и понятно, кто отвечает за результат.",
  "Материалы выбираем жёстко, технологии - под задачу. Сложные объекты берём спокойно: когда всё в одних руках, сроки обычно короче.",
] as const;

export const BENEFITS = [
  {
    id: "speed-quality",
    keyword: "Скорость",
    title: "Скорость и качество",
    description:
      "Своё производство и тройной контроль на каждом этапе. Без посредников и типичных «ещё неделька».",
    highlight: "Готово через 14 дней",
    metric: { value: "14", suffix: "дней", label: "средний срок" },
    visual: "beams" as const,
  },
  {
    id: "deadline",
    keyword: "Срок",
    title: "Гарантия сроков",
    description:
      "Даты прописываем в договоре и отвечаем за них сами. Срыв дедлайна для нас не вариант.",
    highlight: "100% соблюдение",
    metric: { value: "100", suffix: "%", label: "в срок" },
    visual: "arc" as const,
  },
  {
    id: "install",
    keyword: "Монтаж",
    title: "Монтаж под ключ",
    description:
      "Свои бригады: установка, подключение, настройка сценариев и обучение управлению светом.",
    highlight: "Без сторонних электриков",
    metric: { value: "1", suffix: "команда", label: "от проекта до включения" },
    visual: "grid" as const,
  },
] as const;

export const STYLE_CATALOG = [
  {
    id: "art-deco",
    title: "Ар-деко",
    description: "Геометрия, латунь и симметрия. Роскошь в каждой детали света.",
    icon: "",
    bgClass: "bg-gradient-to-br from-stone-950 via-stone-800 to-amber-800",
    image: "/images/stock/style-artdeco.jpg",
    textTheme: "light" as const,
    accentClass: "style-accent-warm",
  },
  {
    id: "minimalism",
    title: "Минимализм",
    description: "Лаконичность и чистые линии без лишнего.",
    icon: "",
    bgClass: "bg-gradient-to-br from-gray-300 via-gray-100 to-amber-100",
    image: "/images/stock/style-minimal.jpg",
    textTheme: "dark" as const,
    accentClass: "style-accent-cool",
  },
  {
    id: "industrial",
    title: "Индастриал",
    description: "Бетон, металл и подвесной свет. Грубая фактура, открытые конструкции.",
    icon: "",
    bgClass: "bg-gradient-to-br from-gray-800 via-stone-700 to-orange-900",
    image: "/images/stock/style-industrial.jpg",
    textTheme: "light" as const,
    accentClass: "style-accent-bronze",
  },
  {
    id: "classic",
    title: "Классика",
    description: "Люстры, латунь и тёплый рассеянный свет. Симметрия и проверенные формы.",
    icon: "",
    bgClass: "bg-gradient-to-br from-stone-200 via-amber-50 to-yellow-200",
    image: "/images/stock/style-classic.jpg",
    textTheme: "dark" as const,
    accentClass: "style-accent-classic",
  },
] as const;

export const TECHNOLOGIES = [
  {
    id: "cri",
    title: "Светодиоды CRI 95+",
    description: "Цвета как при дневном свете, без желтизны и провалов",
    icon: "led" as const,
  },
  {
    id: "bronze",
    title: "Литьё бронзы и латуни",
    description: "Металл, который держит форму годами",
    icon: "metal" as const,
  },
  {
    id: "smart",
    title: "Умное управление",
    description: "Стыкуем с KNX, Zigbee, DALI",
    icon: "smart" as const,
  },
  {
    id: "quality",
    title: "Контроль качества",
    description: "Каждый узел проверяем до выезда на монтаж",
    icon: "quality" as const,
  },
] as const;

export const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Идея / референс",
    description: "Разбираем задачу, собираем референсы и пишем ТЗ",
    icon: "idea" as const,
    highlight: false,
  },
  {
    id: 2,
    title: "3D-моделирование и согласование",
    description: "Собираем 3D-модель, согласуем материалы, размеры и тип света",
    icon: "model" as const,
    highlight: false,
  },
  {
    id: 3,
    title: "Производство",
    description: "Делаем у себя на производстве с тройным контролем",
    icon: "factory" as const,
    highlight: false,
  },
  {
    id: 4,
    title: "Доставка",
    description: "Упаковываем и везём готовое изделие на объект",
    icon: "delivery" as const,
    highlight: false,
  },
  {
    id: 5,
    title: "МОНТАЖ",
    description: "Бригада ставит, подключает и показывает, как управлять светом",
    icon: "install" as const,
    highlight: true,
  },
] as const;

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Ресторан",
    category: "HoReCa",
    subtitle: "Акцентный свет над зоной гостей",
    image: "/images/stock/restaurant.jpg",
    size: "large" as const,
  },
  {
    id: 2,
    title: "Офис",
    category: "Коммерция",
    subtitle: "Линейные светильники open space",
    image: "/images/stock/office.jpg",
    size: "small" as const,
  },
  {
    id: 3,
    title: "Частный дом",
    category: "Residential",
    subtitle: "Подсветка лестницы и гостиной",
    image: "/images/stock/home.jpg",
    size: "small" as const,
  },
  {
    id: 4,
    title: "Шоурум",
    category: "Retail",
    subtitle: "Трековые системы и акценты",
    image: "/images/stock/showroom.jpg",
    size: "medium" as const,
  },
  {
    id: 5,
    title: "Лобби",
    category: "Public",
    subtitle: "Подвесной светильник-арт-объект",
    image: "/images/stock/lobby.jpg",
    size: "small" as const,
  },
  {
    id: 6,
    title: "Кафе",
    category: "HoReCa",
    subtitle: "Тёплый сценарий вечернего света",
    image: "/images/stock/cafe.jpg",
    size: "small" as const,
  },
  {
    id: 7,
    title: "Отель",
    category: "Hospitality",
    subtitle: "Декоративный свет в зоне ресепшен",
    image: "/images/stock/hotel.jpg",
    size: "small" as const,
  },
  {
    id: 8,
    title: "Квартира",
    category: "Residential",
    subtitle: "Сценарное освещение гостиной и спальни",
    image: "/images/stock/apartment.jpg",
    size: "small" as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Сделали ровно то, что мы нарисовали в голове. Свет стал главным акцентом зала. Сроки совпали, на монтаже без сюрпризов.",
    author: "Анна К.",
    role: "Архитектор",
  },
  {
    id: 2,
    quote:
      "Уже третий объект с LumenArt. Берут странные задачи без торга «а давайте проще», и это экономит нам нервы.",
    author: "Михаил Д.",
    role: "Дизайнер интерьеров",
  },
  {
    id: 3,
    quote:
      "Заказывали свет для загородного дома: от проекта до установки у одной команды. Дома теперь совсем другой вечер.",
    author: "Елена С.",
    role: "Владелец частного дома",
  },
] as const;
