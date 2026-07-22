export const DIARY_PRELOAD_IMAGES = [
  // Hero stickers
  "/images/stock/hero.jpg",
  "/images/stock/hero-globe.jpg",
  "/images/stock/hero-domes-modern.jpg",
  "/images/stock/hero-sculptural.jpg",
  // Spine entries
  "/images/stock/apartment.jpg",
  "/images/stock/about.jpg",
  "/images/stock/office.jpg",
  "/images/stock/style-artdeco.jpg",
  "/images/stock/style-minimal.jpg",
  "/images/stock/style-industrial.jpg",
  "/images/stock/lobby.jpg",
  "/images/stock/home.jpg",
  // Scrapbook-only
  "/images/stock/restaurant.jpg",
  "/images/stock/hotel.jpg",
  "/images/stock/showroom.jpg",
  "/images/stock/cafe.jpg",
  // Styles-only
  "/images/stock/style-classic.jpg",
] as const;

export type DiaryPreloadImage = (typeof DIARY_PRELOAD_IMAGES)[number];
