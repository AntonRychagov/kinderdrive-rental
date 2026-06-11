# KinderDrive landing

Лендинг сервиса проката детских электромобилей на Next.js, TypeScript и Tailwind CSS.

## Контент

Все основные тексты, контакты, карточки машинок, изображения, FAQ и SEO-настройки находятся в:

`data/landing.json`

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Проверки

```bash
npm run typecheck
npm run build
```

Production build экспортируется в директорию `out`.

## GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` автоматически собирает и публикует сайт после push в `master` или `main`.
