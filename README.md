# LumenArt — лендинг

Одностраничный адаптивный сайт для компании **LumenArt** — изготовление индивидуального дизайнерского освещения и монтаж под ключ.

## Стек

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- React Hook Form

## Быстрый старт

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте [http://localhost:3000/LumenArt](http://localhost:3000/LumenArt) (с учётом `basePath`).

## Переменные окружения

| Переменная | Описание |
|---|---|
| `NEXT_PUBLIC_WEBHOOK_URL` | URL для POST-запросов формы заявки |
| `NEXT_PUBLIC_BASE_PATH` | Подпуть на GitHub Pages (по умолчанию `/LumenArt`) |
| `NEXT_PUBLIC_SITE_URL` | Полный URL сайта для SEO |

Пример `.env.local`:

```env
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.example.com/your-webhook
NEXT_PUBLIC_BASE_PATH=/LumenArt
NEXT_PUBLIC_SITE_URL=https://username.github.io/LumenArt
```

## Сборка

```bash
npm run build
```

Результат — папка `out/` со статическими файлами (HTML, CSS, JS, изображения). После сборки автоматически генерируются `sitemap.xml` и `robots.txt`.

## Деплой на GitHub Pages

### Первый запуск (обязательно один раз)

1. Запушьте код в репозиторий на GitHub.
2. Откройте **Settings → Pages → Build and deployment**.
3. В поле **Source** выберите **GitHub Actions** (не «Deploy from a branch»).
4. Сохраните настройки.
5. В **Settings → Secrets → Actions** добавьте `NEXT_PUBLIC_WEBHOOK_URL` (можно пустую строку, если webhook пока не нужен).
6. Запустите workflow вручную: **Actions → Deploy to GitHub Pages → Run workflow**  
   или сделайте push в `main`/`master`.

> Если шаг «Setup Pages» падает с `Not Found`, значит пункт 3 ещё не выполнен — GitHub Pages нужно включить вручную.

### Автоматический деплой

При каждом push в `main`/`master` workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

- собирает статику в `out/`
- публикует через GitHub Actions
- `basePath` берётся из имени репозитория автоматически

Сайт будет доступен по адресу: `https://<username>.github.io/<имя-репозитория>/`

### Ручной деплой (альтернатива)

```bash
npm run build
touch out/.nojekyll
# Залейте содержимое out/ в ветку gh-pages
```

Затем в **Settings → Pages** укажите ветку `gh-pages`, папку `/ (root)`.

## Замена контактов

Все контактные данные находятся в [`lib/constants.ts`](lib/constants.ts) — измените телефон, email, адрес и ссылки на соцсети в одном месте.

## Структура лендинга

1. **Hero** — заголовок, CTA
2. **Benefits** — Bento-сетка преимуществ
3. **Timeline** — этапы работы
4. **Portfolio** — заглушки проектов
5. **ContactForm** — форма заявки со скидкой 5%
6. **Footer** — контакты, политика конфиденциальности

## Лицензия

Private. Все права защищены © LumenArt.
