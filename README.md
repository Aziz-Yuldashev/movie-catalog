# 🎬 Movie Catalog

Каталог фильмов с поиском, избранным и адаптивным UI — построен на Next.js, Chakra UI и OMDb API.

![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Chakra UI](https://img.shields.io/badge/Chakra--UI-%235C6AC4.svg?logo=chakraui)
![SWR](https://img.shields.io/badge/useSWR-cyan?logo=vercel)

---

## 🚀 Как запустить

```

1. Установи зависимости:
   npm install

2. Добавь .env:
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key
   Ключ можно получить на omdbapi.com/apikey.aspx

3. Запусти:
   npm run dev
```

---

## 🧱 Архитектура проекта

```
src/
├── components/ # UI компоненты (header, карточки, модалки)
├── pages/ # Страницы Next.js
├── hooks/ # useDebounce, useSearch, useFavorites
├── utils/
│ ├── services/ # API-запросы
│ ├── types/ # Типы TypeScript
│ └── providers/ # Контекст для избранного
├── theme/ # Chakra UI тема
├── configs/ # END_POINT

```

---

## 💎 Что реализовано

-   🔍 Поиск фильмов с debounce
-   ⭐ Избранное — сохраняется в LocalStorage
-   🧠 Подробности фильма (рейтинг, описание) по иконке
-   🌓 Переключение светлой/тёмной темы
-   📦 SSR: Топ-10 фильмов загружаются на сервере
-   📱 Адаптивный дизайн (мобильные устройства)

```

```
