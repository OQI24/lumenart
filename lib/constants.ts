export const SITE = {
  name: "LumenArt",
  phone: "+7 (999) 000-00-00",
  phoneRaw: "+79990000000",
  email: "info@lumenart.ru",
  address: "г. Москва, ул. Примерная, 1",
  social: {
    telegram: "#",
    vk: "#",
    instagram: "#",
  },
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://username.github.io/LumenArt";

export const SITE_DESCRIPTION =
  "Разработка, производство и монтаж индивидуального дизайнерского освещения. Соблюдение сроков, гарантия качества. Рассчитайте проект со скидкой 5%.";

export const ABOUT_PARAGRAPHS = [
  "Мы — команда профессионалов, объединённая желанием делать сложный свет простым и доступным. Нас не интересуют типовые решения — мы создаём индивидуальные световые сценарии, которые подчёркивают уникальность каждого пространства.",
  "Каждый проект проходит через полный цикл личного контроля: от первой идеи до финального монтажа. Мы не передаём задачи сторонним подрядчикам — мы сами проектируем, рассчитываем, контролируем качество и лично выезжаем на установку. Это позволяет нам быть гибкими, быстрыми и нести полную ответственность за результат.",
  "Наша философия — в деталях. Мы выбираем лучшие материалы, используем современные технологии и всегда ищем нестандартные решения. Мы не боимся сложных задач и делаем хорошо и быстро.",
] as const;

export const BENEFITS = [
  {
    id: "speed-quality",
    title: "Скорость + Качество",
    description:
      "Сокращаем сроки за счёт собственного производства, тройной контроль качества. Готово через 14 дней",
    icon: "rocket" as const,
    size: "large" as const,
  },
  {
    id: "deadline",
    title: "Гарантия сроков",
    description: "Мы отвечаем за обещанные даты. Срыв дедлайна исключён",
    icon: "calendar" as const,
    size: "small" as const,
  },
  {
    id: "install",
    title: "Монтаж под ключ",
    description:
      "Не ищите электриков. Наши бригады выезжают, устанавливают, подключают и обучают управлению светом",
    icon: "key" as const,
    size: "medium" as const,
  },
] as const;

export const STYLE_CATALOG = [
  {
    id: "art-deco",
    title: "Ар-деко",
    description: "Геометрия, роскошь, симметрия",
    icon: "✨",
    bgClass: "bg-gradient-to-br from-gray-900 via-indigo-900 to-amber-700",
    textTheme: "light" as const,
    // imageSrc: "/styles/art-deco.jpg" — для будущей замены на next/image
  },
  {
    id: "minimalism",
    title: "Минимализм",
    description: "Лаконичность, чистота линий",
    icon: "◻️",
    bgClass: "bg-gradient-to-br from-gray-300 via-gray-100 to-amber-100",
    textTheme: "dark" as const,
  },
  {
    id: "industrial",
    title: "Индастриал",
    description: "Брутальность, открытые конструкции",
    icon: "🏗️",
    bgClass: "bg-gradient-to-br from-gray-800 via-stone-700 to-orange-900",
    textTheme: "light" as const,
  },
  {
    id: "classic",
    title: "Классика",
    description: "Элегантность, проверенные формы",
    icon: "🏛️",
    bgClass: "bg-gradient-to-br from-stone-200 via-amber-50 to-yellow-200",
    textTheme: "dark" as const,
  },
] as const;

export const TECHNOLOGIES = [
  {
    id: "cri",
    title: "Светодиоды CRI 95+",
    description: "Естественная цветопередача без искажений",
    icon: "led" as const,
  },
  {
    id: "bronze",
    title: "Литьё бронзы и латуни",
    description: "Надёжность и долговечность",
    icon: "metal" as const,
  },
  {
    id: "smart",
    title: "Умное управление",
    description: "Интеграция с KNX, Zigbee, DALI",
    icon: "smart" as const,
  },
  {
    id: "quality",
    title: "Контроль качества",
    description: "Каждый узел проверяется перед монтажом",
    icon: "quality" as const,
  },
] as const;

export const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Идея / референс",
    description: "Обсуждаем задачу, собираем референсы и формируем техническое задание",
    icon: "idea" as const,
    highlight: false,
  },
  {
    id: 2,
    title: "3D-моделирование и согласование",
    description: "Создаём 3D-модель, согласуем материалы, размеры и тип освещения",
    icon: "model" as const,
    highlight: false,
  },
  {
    id: 3,
    title: "Производство",
    description: "Изготавливаем на собственном производстве с тройным контролем качества",
    icon: "factory" as const,
    highlight: false,
  },
  {
    id: 4,
    title: "Доставка",
    description: "Бережно упаковываем и доставляем готовое изделие на объект",
    icon: "delivery" as const,
    highlight: false,
  },
  {
    id: 5,
    title: "МОНТАЖ",
    description: "Бригада выезжает, устанавливает, подключает и обучает управлению светом",
    icon: "install" as const,
    highlight: true,
  },
] as const;

export const PORTFOLIO_ITEMS = [
  { id: 1, title: "Проект #1", size: "large" as const },
  { id: 2, title: "Проект #2", size: "small" as const },
  { id: 3, title: "Проект #3", size: "small" as const },
  { id: 4, title: "Проект #4", size: "medium" as const },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "LumenArt воплотили нашу идею в точности — свет стал главным акцентом интерьера. Сроки выдержали, монтаж прошёл без единой замечания.",
    author: "Анна К.",
    role: "Архитектор",
  },
  {
    id: 2,
    quote:
      "Работаем с LumenArt уже на третьем объекте. Ценим индивидуальный подход и готовность браться за нестандартные задачи.",
    author: "Михаил Д.",
    role: "Дизайнер интерьеров",
  },
  {
    id: 3,
    quote:
      "Заказывали освещение для загородного дома — от проекта до установки всё под ключ. Результат превзошёл ожидания.",
    author: "Елена С.",
    role: "Владелец частного дома",
  },
] as const;
