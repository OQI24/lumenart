# Шрифт Magistral (ParaType)

Положите сюда файлы **web-лицензии** после покупки на [paratype.com](https://www.paratype.com/) или [MyFonts](https://www.myfonts.com/collections/magistral-font-paratype):

- `Magistral-Book.woff2` — обычный (400)
- `Magistral-Medium.woff2` — средний (500)
- `Magistral-Bold.woff2` — жирный (700)

Затем в `app/globals.css` в каждом `@font-face` для Magistral добавьте `url` **после** `local(...)`, например:

```css
src:
  local("Magistral Book"),
  local("Magistral-Book"),
  url("/fonts/Magistral-Book.woff2") format("woff2");
```

Пока файлов нет, `url(...)` намеренно отсутствует — иначе браузер запрашивает несуществующие файлы (HTTP 404 / Broken Assets в аудитах). В стеке остаётся запасной **Exo 2** (`next/font` в `app/layout.tsx`).

После добавления файлов и `url`: `npm run build` и деплой.
