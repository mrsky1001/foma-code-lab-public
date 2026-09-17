// scripts/fix-theory-lessons.mjs
// Fills missing html:start / css:start / js:start in theoretical lessons
// where context is needed (CSS lessons, JS DOM lessons, interactive steps),
// without touching lessons that don't need other files (e.g. Module 1 intro).

import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

// Helper to wrap body content into standard standalone HTML5 document
export function createHtmlDoc(title, bodyContent) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
${bodyContent}
  <script src="js/main.js"></script>
</body>
</html>`;
}

// ─── DEFINITIONS PER STEP ───────────────────────────────────────────────────

export const STEP_CONFIGS = {
  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 02: MARKUP (CSS steps)
  // ══════════════════════════════════════════════════════════════════════════
  '02-markup/00-theory-06-reset.md': {
    htmlStart: createHtmlDoc('CSS Reset', `  <div class="preview-box">
    <h1>Заголовок h1</h1>
    <p>Параграф текста с базовыми отступами.</p>
    <div style="margin: 16px 0;">
      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80" alt="Офис">
    </div>
    <div style="display: flex; gap: 8px;">
      <input type="text" placeholder="Поле ввода">
      <button>Кнопка</button>
    </div>
  </div>`),
    cssStart: `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  line-height: 1.5;
  padding: 24px;
  background: #f8fafc;
}

.preview-box {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Добавьте правила для img и input/button ниже */`,
    cssSolution: `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  line-height: 1.5;
  padding: 24px;
  background: #f8fafc;
}

.preview-box {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Добавьте правила для img и input/button ниже */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

input, button {
  font-family: inherit;
  font-size: inherit;
}`
  },

  '02-markup/00-theory-06b-variables.md': {
    htmlStart: createHtmlDoc('CSS-переменные', `  <div class="container">
    <h1>СмартОфис: рабочие пространства</h1>
    <p>Аренда комфортных рабочих мест и переговорных комнат.</p>
    <button class="btn">Забронировать</button>
  </div>`),
    cssStart: `:root {
  /* Объявите --brand-color и --brand-dark */
}

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 32px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

h1 {
  /* Используйте var(--brand-color) */
  margin-bottom: 12px;
}

p {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
}

.btn {
  /* Используйте var(--brand-color) */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`,
    cssSolution: `:root {
  --brand-color: #0ea5e9;
  --brand-dark: #0284c7;
}

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 32px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

h1 {
  color: var(--brand-color);
  margin-bottom: 12px;
}

p {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
}

.btn {
  background: var(--brand-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`
  },

  '02-markup/00-theory-07-container.md': {
    htmlStart: createHtmlDoc('Паттерн Container', `  <header class="header">
    <div class="container">
      <strong>СмартОфис</strong>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="content-box">
        <h1>Контент страницы</h1>
        <p>Этот блок ограничен по ширине и отцентрирован внутри окна браузера.</p>
      </div>
    </div>
  </main>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background: #f1f5f9;
}

.header {
  background: #0f172a;
  color: #ffffff;
  padding: 16px 0;
}

.container {
  /* Задайте max-width, margin и padding */
}

.content-box {
  background: #ffffff;
  padding: 24px;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h1 {
  margin: 0 0 12px 0;
  font-size: 24px;
}

p {
  margin: 0;
  color: #64748b;
}`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background: #f1f5f9;
}

.header {
  background: #0f172a;
  color: #ffffff;
  padding: 16px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.content-box {
  background: #ffffff;
  padding: 24px;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h1 {
  margin: 0 0 12px 0;
  font-size: 24px;
}

p {
  margin: 0;
  color: #64748b;
}`
  },

  '02-markup/00-theory-08-flexbox.md': {
    htmlStart: createHtmlDoc('Подключение Flexbox', `  <div class="wrapper">
    <div class="catalog">
      <div class="catalog-item">
        <h3>Мини-офис Focus</h3>
        <p>450 ₽/час</p>
      </div>
      <div class="catalog-item">
        <h3>Конференц-зал Alpha</h3>
        <p>1200 ₽/час</p>
      </div>
      <div class="catalog-item">
        <h3>Опенспейс Hub</h3>
        <p>250 ₽/час</p>
      </div>
    </div>
  </div>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 24px;
  margin: 0;
}

.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.catalog {
  /* Сделайте flex-контейнером */
}

.catalog-item {
  flex: 1;
  min-width: 200px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.catalog-item h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.catalog-item p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 24px;
  margin: 0;
}

.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.catalog {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.catalog-item {
  flex: 1;
  min-width: 200px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.catalog-item h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.catalog-item p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 03: FLEXBOX & LAYOUT (All steps)
  // ══════════════════════════════════════════════════════════════════════════
  '03-flexbox/00-theory-01-flex-align.md': {
    htmlStart: createHtmlDoc('Выравнивание во Flexbox', `  <div class="sandbox">
    <div class="container">
      <div class="card">1</div>
      <div class="card">2</div>
      <div class="card">3</div>
    </div>
  </div>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
  padding: 30px;
}

.sandbox {
  max-width: 700px;
  margin: 0 auto;
}

.container {
  display: flex;
  min-height: 180px;
  padding: 16px;
  background: #ffffff;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  /* Добавьте justify-content и align-items */
}

.card {
  width: 100px;
  height: 80px;
  background: #007bff;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
}`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
  padding: 30px;
}

.sandbox {
  max-width: 700px;
  margin: 0 auto;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 180px;
  padding: 16px;
  background: #ffffff;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
}

.card {
  width: 100px;
  height: 80px;
  background: #007bff;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
}`
  },

  '03-flexbox/00-theory-02-flex-wrap.md': {
    htmlStart: createHtmlDoc('flex-wrap и сетка', `  <div class="sandbox">
    <div class="catalog">
      <div class="card">Мини-офис Focus</div>
      <div class="card">Конференц-зал Alpha</div>
      <div class="card">Опенспейс Hub</div>
      <div class="card">Переговорная Solo</div>
    </div>
  </div>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
  padding: 24px;
}

.sandbox {
  max-width: 900px;
  margin: 0 auto;
}

.catalog {
  display: flex;
  /* Добавьте flex-wrap и gap */
}

.card {
  /* Задайте flex: 1 1 220px и min-width */
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  font-weight: 500;
}`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
  padding: 24px;
}

.sandbox {
  max-width: 900px;
  margin: 0 auto;
}

.catalog {
  display: flex;
  flex-wrap: wrap;     /* переносить карточки на следующую строку */
  gap: 16px;           /* промежутки между карточками */
}

.card {
  flex: 1 1 220px;     /* базовая ширина 220px, растягиваться/сжиматься */
  min-width: 160px;    /* не сжимать меньше 160px */
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  font-weight: 500;
}`
  },

  '03-flexbox/00-theory-03-pseudo.md': {
    htmlStart: createHtmlDoc('Псевдоклассы', `  <div style="display: flex; justify-content: center; align-items: center; min-height: 200px;">
    <button class="btn">Забронировать офис</button>
  </div>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
}

.btn {
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  /* Добавьте transition */
}

/* Добавьте :hover и :active */`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
}

.btn {
  background: #007bff;          /* синий фон по умолчанию */
  color: white;                 /* белый текст */
  padding: 12px 24px;           /* отступы */
  border: none;                 /* убрать рамку */
  border-radius: 6px;           /* скруглённые углы */
  font-size: 16px;              /* размер шрифта */
  font-weight: 600;
  cursor: pointer;              /* курсор-рука */
  transition: background 0.2s ease,   /* плавная смена фона */
              transform 0.1s ease;     /* плавная смена масштаба */
}

.btn:hover {                    /* наведение мыши */
  background: #0056b3;         /* темнее синий */
  transform: translateY(-2px); /* приподнять на 2px */
}

.btn:active {                   /* момент нажатия */
  background: #004a99;         /* ещё темнее */
  transform: scale(0.97);      /* лёгкое уменьшение — эффект «нажатости» */
}

.btn:focus {                    /* фокус через Tab (доступность) */
  outline: 2px solid #80bdff;  /* синяя рамка */
  outline-offset: 2px;         /* отступ от края кнопки */
}`
  },

  '03-flexbox/00-theory-04-card.md': {
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.card {
  width: 320px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-img-wrap {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #1e293b;
}

.card-text {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 16px;
  border-top: 1px solid #f1f5f9;
}

.card-price {
  font-weight: 700;
  font-size: 16px;
  color: #0ea5e9;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background: #0ea5e9;
  color: #ffffff;
}`
  },

  '03-flexbox/00-theory-05-overflow.md': {
    htmlStart: createHtmlDoc('overflow и object-fit', `  <div class="card">
    <div class="card-img-wrap">
      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80" alt="Офис" class="card-img">
    </div>
    <div class="card-body">
      <h3>Офис Focus</h3>
      <p>Просторное рабочее место</p>
    </div>
  </div>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.card {
  width: 320px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 16px;
}

.card-body h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card-body p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.card-img-wrap {
  /* Задайте соотношение 16:9 и скройте выход за границы */
}

.card-img {
  width: 100%;
  height: 100%;
  /* Задайте object-fit чтобы не деформировать */
}`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.card {
  width: 320px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 16px;
}

.card-body h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card-body p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.card-img-wrap {
  aspect-ratio: 16 / 9;  /* соотношение сторон блока */
  overflow: hidden;       /* обрезать картинку по границам */
  border-radius: 8px 8px 0 0; /* скругление только сверху */
}

.card-img {
  width: 100%;            /* занять всю ширину обёртки */
  height: 100%;           /* занять всю высоту обёртки */
  object-fit: cover;      /* заполнить пропорционально, обрезав лишнее */
  display: block;         /* убрать baseline gap (пространство снизу) */
}`
  },

  '03-flexbox/00-theory-06-media-queries.md': {
    htmlStart: createHtmlDoc('Медиа-запросы', `  <div class="room-grid">
    <div class="card">
      <h3>Мини-офис Focus</h3>
      <p>Тихое место для 1-2 человек</p>
    </div>
    <div class="card">
      <h3>Конференц-зал Alpha</h3>
      <p>Просторный зал до 15 человек</p>
    </div>
    <div class="card">
      <h3>Опенспейс Hub</h3>
      <p>Выделенный стол в open-space</p>
    </div>
  </div>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 24px;
}

.room-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 300px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

/* Добавьте медиа-запрос для max-width: 768px ниже */`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 24px;
}

.room-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 300px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

/* Адаптивные стили для мобильных экранов */
@media (max-width: 768px) {
  .room-grid {
    flex-direction: column;
    gap: 12px;
  }

  .card {
    width: 100%;
  }
}`
  },

  '03-flexbox/00-theory-07-grid.md': {
    htmlStart: createHtmlDoc('CSS Grid', `  <div class="rooms-grid">
    <div class="room-card">
      <h3>Мини-офис Focus</h3>
      <p>450 ₽/час</p>
    </div>
    <div class="room-card">
      <h3>Конференц-зал Alpha</h3>
      <p>1200 ₽/час</p>
    </div>
    <div class="room-card">
      <h3>Опенспейс Hub</h3>
      <p>250 ₽/час</p>
    </div>
    <div class="room-card">
      <h3>Переговорная Solo</h3>
      <p>600 ₽/час</p>
    </div>
  </div>`),
    cssStart: `body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 24px;
}

.rooms-grid {
  /* Включите CSS Grid */
  /* Задайте отступы gap */
  /* Настройте адаптивные колонки */
}

.room-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.room-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.room-card p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}`,
    cssSolution: `body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 24px;
}

.rooms-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.room-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.room-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.room-card p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 04: JS DOM
  // ══════════════════════════════════════════════════════════════════════════
  '04-js-dom/00-theory-01-js-basics.md': {
    htmlStart: createHtmlDoc('Основы JavaScript', `  <div class="sandbox">
    <h2>Основы JavaScript: переменные</h2>
    <div class="info-card">
      <div class="info-row"><span>Сервис:</span> <strong id="nameEl">—</strong></div>
      <div class="info-row"><span>Комнат:</span> <strong id="countEl">—</strong></div>
      <div class="info-row"><span>Доступен:</span> <strong id="availEl">—</strong></div>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
h2 { margin-bottom: 16px; font-size: 20px; }
.info-card { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
.info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
.info-row:last-child { border-bottom: none; }`
  },

  '04-js-dom/00-theory-02-functions.md': {
    htmlStart: createHtmlDoc('Функции в JavaScript', `  <div class="sandbox">
    <h2>Калькулятор бронирования</h2>
    <div class="calc-card">
      <p>Тариф: <strong>450 ₽/час</strong>, Длительность: <strong>4 часа</strong></p>
      <div class="calc-result" id="calcOutput">Итог: рассчитывается...</div>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.calc-card { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
.calc-result { margin-top: 16px; font-size: 18px; font-weight: 700; color: #0ea5e9; }`
  },

  '04-js-dom/00-theory-03-dom.md': {
    htmlStart: createHtmlDoc('DOM — дерево документа', `  <div class="sandbox">
    <div class="card" data-id="1">
      <h3>Старый заголовок</h3>
      <p>800 ₽/час</p>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 30px; }
.sandbox { max-width: 400px; margin: 0 auto; }
.card { background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.card h3 { margin: 0 0 8px 0; font-size: 18px; color: #0ea5e9; }
.card p { margin: 0; color: #64748b; }`
  },

  '04-js-dom/00-theory-04-selector.md': {
    htmlStart: createHtmlDoc('querySelector и querySelectorAll', `  <div class="sandbox">
    <div class="cards-list">
      <div class="card" data-available="true">
        <h3>Мини-офис Focus</h3>
        <span class="status available">Свободно</span>
      </div>
      <div class="card" data-available="false">
        <h3>Конференц-зал Alpha</h3>
        <span class="status occupied">Занято</span>
      </div>
      <div class="card" data-available="true">
        <h3>Опенспейс Hub</h3>
        <span class="status available">Свободно</span>
      </div>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.cards-list { display: flex; flex-direction: column; gap: 12px; }
.card { display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
.card h3 { margin: 0; font-size: 16px; }
.status { font-size: 12px; padding: 4px 8px; border-radius: 4px; font-weight: 600; }
.status.available { background: #dcfce7; color: #16a34a; }
.status.occupied { background: #fee2e2; color: #dc2626; }`
  },

  '04-js-dom/00-theory-05-create.md': {
    htmlStart: createHtmlDoc('Создание элементов через JS', `  <div class="sandbox">
    <h2>Список задач</h2>
    <ul id="list" class="todo-list">
      <li><span>Подготовить договор аренды</span> <button class="btn-del">Удалить</button></li>
    </ul>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.todo-list { list-style: none; padding: 0; margin-top: 16px; }
.todo-list li { display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 12px 16px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 8px; }
.btn-del { background: #fee2e2; color: #dc2626; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: 500; }
.btn-del:hover { background: #fecaca; }`
  },

  '04-js-dom/00-theory-06-events.md': {
    htmlStart: createHtmlDoc('События и слушатели', `  <div class="sandbox">
    <h2>Переключение темы</h2>
    <p>Нажмите кнопку для переключения класса <code>dark-theme</code> на странице.</p>
    <button id="themeToggle" class="btn">Переключить тему</button>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; padding: 30px; transition: background 0.3s, color 0.3s; }
body.dark-theme { background: #0f172a; color: #f8fafc; }
body.dark-theme .btn { background: #38bdf8; color: #0f172a; }
.sandbox { max-width: 500px; margin: 0 auto; text-align: center; }
.btn { background: #0ea5e9; color: #ffffff; border: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; }`
  },

  '04-js-dom/00-theory-07-timeout.md': {
    htmlStart: createHtmlDoc('Асинхронность и setTimeout', `  <div class="sandbox">
    <h2>Уведомление</h2>
    <div id="alert" class="alert-box">Бронирование успешно оформлено!</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 30px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.alert-box { background: #dcfce7; color: #166534; padding: 16px 20px; border-radius: 8px; border: 1px solid #bbf7d0; font-weight: 500; transition: opacity 0.5s; }`
  },

  '04-js-dom/00-theory-08-localstorage.md': {
    htmlStart: createHtmlDoc('localStorage', `  <div class="sandbox">
    <h2>Профиль пользователя</h2>
    <div class="profile-card">
      <p>Данные сохраняются в хранилище браузера (localStorage).</p>
      <div id="userDisplay" style="margin-top: 12px; font-weight: 600; color: #0ea5e9;"></div>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 30px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.profile-card { background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 05: CATALOG
  // ══════════════════════════════════════════════════════════════════════════
  '05-catalog/00-theory-01-objects.md': {
    htmlStart: createHtmlDoc('Объекты в JavaScript', `  <div class="sandbox">
    <h2>Объект комнаты</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '05-catalog/00-theory-02-arrays.md': {
    htmlStart: createHtmlDoc('Массивы объектов', `  <div class="sandbox">
    <h2>Массив комнат</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '05-catalog/00-theory-03-map.md': {
    htmlStart: createHtmlDoc('.map() и рендер HTML', `  <div class="sandbox">
    <h2>Каталог комнат</h2>
    <div id="catalog" class="rooms-grid"></div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 700px; margin: 0 auto; }
.rooms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px; }
.room-card { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
.room-card h3 { margin: 0 0 8px 0; font-size: 16px; }
.room-card p { margin: 0; color: #0ea5e9; font-weight: 600; }`
  },

  '05-catalog/00-theory-04-find.md': {
    htmlStart: createHtmlDoc('.find() и поиск', `  <div class="sandbox">
    <h2>Поиск комнат</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '05-catalog/00-theory-05-url.md': {
    htmlStart: createHtmlDoc('URLSearchParams', `  <div class="sandbox">
    <h2>Параметры URL</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '05-catalog/00-theory-06-fetch.md': {
    htmlStart: createHtmlDoc('fetch и async/await', `  <div class="sandbox">
    <h2>Сетевые запросы</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '05-catalog/00-theory-07-tabs.md': {
    htmlStart: createHtmlDoc('Интерактивные вкладки', `  <div class="sandbox">
    <div class="tabs-nav">
      <button class="tab-btn active" data-tab="tab1">Мини-офисы</button>
      <button class="tab-btn" data-tab="tab2">Конференц-залы</button>
      <button class="tab-btn" data-tab="tab3">Опенспейс</button>
    </div>
    <div class="tabs-content">
      <div id="tab1" class="tab-pane active">Индивидуальные пространства Focus</div>
      <div id="tab2" class="tab-pane">Презентационные залы Alpha и Beta</div>
      <div id="tab3" class="tab-pane">Рабочие места в общем пространстве Hub</div>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 600px; margin: 0 auto; }
.tabs-nav { display: flex; gap: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
.tab-btn { background: none; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer; color: #64748b; }
.tab-btn.active { background: #e0f2fe; color: #0369a1; font-weight: 600; }
.tabs-content { margin-top: 16px; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
.tab-pane { display: none; font-size: 15px; }
.tab-pane.active { display: block; }`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 06: FORMS
  // ══════════════════════════════════════════════════════════════════════════
  '06-forms/00-theory-01-forms.md': {
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
form { max-width: 460px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; }
label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #334155; }
input, select, textarea { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 14px; margin-bottom: 14px; }
button[type="submit"] { background: #0ea5e9; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; cursor: pointer; width: 100%; }`
  },

  '06-forms/00-theory-02-submit.md': {
    htmlStart: createHtmlDoc('Событие submit', `  <div class="sandbox">
    <form id="bookingForm" class="form-card">
      <div class="field">
        <label>Имя</label>
        <input type="text" name="name" value="Иван Иванов" required>
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" name="email" value="ivan@mail.ru" required>
      </div>
      <button type="submit" class="btn">Отправить заявку</button>
    </form>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 440px; margin: 0 auto; }
.form-card { background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; }
.field { margin-bottom: 14px; }
label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
input { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; }
.btn { width: 100%; background: #0ea5e9; color: #ffffff; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; }`
  },

  '06-forms/00-theory-03-values.md': {
    htmlStart: createHtmlDoc('Валидация значений', `  <div class="sandbox">
    <form id="validateForm" class="form-card">
      <div class="field">
        <label>Имя</label>
        <input type="text" id="nameInput" placeholder="Иван">
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" id="emailInput" placeholder="example@mail.ru">
      </div>
      <button type="button" class="btn" id="checkBtn">Проверить</button>
      <div id="errorsList" style="margin-top: 12px; color: #dc2626; font-size: 13px;"></div>
    </form>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 440px; margin: 0 auto; }
.form-card { background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; }
.field { margin-bottom: 14px; }
label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
input { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; }
.btn { width: 100%; background: #0ea5e9; color: #ffffff; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; }`
  },

  '06-forms/00-theory-04-validation.md': {
    htmlStart: createHtmlDoc('Визуальная валидация', `  <div class="sandbox">
    <form id="testForm" class="form-card">
      <div class="field-wrap">
        <label>Имя</label>
        <input type="text" id="nameField" placeholder="Введите имя">
        <span class="error-text"></span>
      </div>
      <button type="submit" class="btn">Сохранить</button>
    </form>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 440px; margin: 0 auto; }
.form-card { background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; }
.field-wrap { margin-bottom: 16px; }
label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
input { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; }
.field-wrap.error input { border-color: #ef4444; }
.error-text { display: none; color: #ef4444; font-size: 12px; margin-top: 4px; }
.field-wrap.error .error-text { display: block; }
.btn { width: 100%; background: #0ea5e9; color: #ffffff; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; }`
  },

  '06-forms/00-theory-05-storage.md': {
    htmlStart: createHtmlDoc('localStorage пользователя', `  <div class="sandbox">
    <div class="form-card">
      <h2>Данные бронирования</h2>
      <p id="statusMsg" style="color: #0ea5e9; margin-top: 8px;"></p>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 440px; margin: 0 auto; }
.form-card { background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; }`
  },

  '06-forms/00-theory-06-modal.md': {
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; text-align: center; }
dialog { border: none; border-radius: 12px; padding: 24px; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
dialog::backdrop { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(2px); }
.btn { background: #0ea5e9; color: #ffffff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 07: SLIDER
  // ══════════════════════════════════════════════════════════════════════════
  '07-slider/00-theory-01-position.md': {
    htmlStart: createHtmlDoc('CSS position', `  <div class="sandbox">
    <div class="card">
      <span class="badge">Новинка</span>
      <h3>Мини-офис Focus</h3>
      <p>Идеальное пространство для концентрации.</p>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; }
.sandbox { max-width: 380px; margin: 0 auto; }
.card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  /* Сделайте карточку точкой отсчёта для абсолютного позиционирования */
}

.badge {
  background: #ef4444;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  /* Позиционируйте абсолютно в правом верхнем углу */
}

h3 { margin: 0 0 8px 0; font-size: 18px; }
p { margin: 0; color: #64748b; font-size: 14px; }`,
    cssSolution: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; }
.sandbox { max-width: 380px; margin: 0 auto; }
.card {
  position: relative;  /* точка отсчёта для абсолютно позиционированных детей */
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.badge {
  position: absolute;  /* вынуть из потока */
  top: 12px;           /* 12px от верхнего края card */
  right: 12px;         /* 12px от правого края card */
  background: #ef4444;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

h3 { margin: 0 0 8px 0; font-size: 18px; }
p { margin: 0; color: #64748b; font-size: 14px; }`
  },

  '07-slider/00-theory-02-state.md': {
    htmlStart: createHtmlDoc('Состояние программы', `  <div class="sandbox">
    <button id="toggleBtn" class="btn">Открыть описание</button>
    <div id="panel" class="panel" style="display: none; margin-top: 12px;">
      Подробная информация о тарифах и бронировании комнат.
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 30px; }
.sandbox { max-width: 440px; margin: 0 auto; text-align: center; }
.btn { background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
.panel { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }`
  },

  '07-slider/00-theory-03-classlist.md': {
    htmlStart: createHtmlDoc('Управление classList', `  <div class="sandbox">
    <h2>Тёмная и светлая тема</h2>
    <button id="themeBtn" class="btn">Включить тёмную тему</button>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; padding: 40px; text-align: center; transition: all 0.3s; }
body.dark { background: #0f172a; color: #f8fafc; }
body.dark .btn { background: #38bdf8; color: #0f172a; }
.btn { background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }`
  },

  '07-slider/00-theory-04-interval.md': {
    htmlStart: createHtmlDoc('setInterval автослайдер', `  <div class="sandbox">
    <h2>Слайдер: <span id="slideCounter" style="color: #0ea5e9;">1</span></h2>
    <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: center;">
      <button id="startBtn" class="btn">Старт</button>
      <button id="stopBtn" class="btn btn-stop">Стоп</button>
    </div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; text-align: center; }
.btn { background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
.btn-stop { background: #ef4444; }`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 08: SEARCH & FILTER
  // ══════════════════════════════════════════════════════════════════════════
  '08-search/00-theory-01-filter.md': {
    htmlStart: createHtmlDoc('Метод .filter()', `  <div class="sandbox">
    <h2>Фильтрация комнат</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 600px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '08-search/00-theory-02-sort.md': {
    htmlStart: createHtmlDoc('Метод .sort()', `  <div class="sandbox">
    <h2>Сортировка комнат</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 600px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '08-search/00-theory-03-pipeline.md': {
    htmlStart: createHtmlDoc('Конвейер данных', `  <div class="sandbox">
    <h2>Фильтрация и сортировка</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 600px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '08-search/00-theory-04-input-event.md': {
    htmlStart: createHtmlDoc('Событие input: живой поиск', `  <div class="sandbox">
    <h2>Живой поиск</h2>
    <input type="text" id="searchInput" class="search-input" placeholder="Введите название...">
    <ul id="results" class="results-list"></ul>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.search-input { width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 15px; }
.results-list { list-style: none; padding: 0; margin-top: 12px; }
.results-list li { background: #ffffff; padding: 10px 14px; border-radius: 4px; border: 1px solid #e2e8f0; margin-bottom: 6px; }`
  },

  '08-search/00-theory-05-select.md': {
    htmlStart: createHtmlDoc('Элемент select', `  <div class="sandbox">
    <h2>Выбор категории</h2>
    <select id="roomSelect" class="select-box">
      <option value="">Выберите категорию...</option>
    </select>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 440px; margin: 0 auto; }
.select-box { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }`
  },

  '08-search/00-theory-06-dates.md': {
    htmlStart: createHtmlDoc('Объект Date', `  <div class="sandbox">
    <h2>Расчёт бронирования по датам</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 600px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 09: FINAL
  // ══════════════════════════════════════════════════════════════════════════
  '09-final/00-theory-01-refactor.md': {
    htmlStart: createHtmlDoc('Рефакторинг и DRY', `  <div class="sandbox">
    <h2>Рефакторинг стилей</h2>
    <div id="output" class="output-box">Код оптимизирован.</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }`
  },

  '09-final/00-theory-02-empty-state.md': {
    htmlStart: createHtmlDoc('Пустые состояния', `  <div class="sandbox">
    <h2>Каталог бронирований</h2>
    <div id="listContainer"></div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.empty-state { text-align: center; padding: 32px 16px; background: #ffffff; border-radius: 8px; border: 1px dashed #cbd5e1; color: #64748b; }
.empty-icon { font-size: 32px; margin-bottom: 8px; }`
  },

  '09-final/00-theory-03-modules.md': {
    htmlStart: createHtmlDoc('ES-модули', `  <div class="sandbox">
    <h2>ES-модули: import и export</h2>
    <div id="output" class="output-box">Модули готовы к экспорту.</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 10: TROUBLESHOOTING
  // ══════════════════════════════════════════════════════════════════════════
  '10-troubleshooting/01-security-error-localstorage.md': {
    htmlStart: createHtmlDoc('SecurityError localStorage', `  <div class="sandbox">
    <h2>Безопасный доступ к localStorage</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }`
  },

  '10-troubleshooting/02-type-error-null-dom.md': {
    htmlStart: createHtmlDoc('TypeError: null DOM', `  <div class="sandbox">
    <h2>Безопасный поиск элементов</h2>
    <p>На этой странице нет поля <code>#searchInput</code>. Скрипт должен безопасно проверить наличие элемента перед добавлением слушателя.</p>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }`
  },

  '10-troubleshooting/03-syntax-error-tokens.md': {
    htmlStart: createHtmlDoc('Синтаксические ошибки', `  <div class="sandbox">
    <h2>Проверка синтаксиса объекта</h2>
    <div id="output" class="output-box">Объект компилируется...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }`
  },

  '10-troubleshooting/04-network-404-paths.md': {
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; margin: 0; }
header { background: #0f172a; color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-radius: 8px; }
.logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: white; font-weight: 700; }
.logo img { width: 24px; height: 24px; }`
  },

  '10-troubleshooting/05-devtools-mastery.md': {
    htmlStart: createHtmlDoc('Мастерство DevTools', `  <div class="sandbox">
    <h2>Отладка производительности</h2>
    <div id="output" class="output-box">Замеры времени выводятся в DevTools Console...</div>
  </div>`),
    cssStart: `body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }`
  }
};

// ─── RUN UPDATE ─────────────────────────────────────────────────────────────

export function applyUpdates() {
  const baseDir = path.resolve('content/lessons');
  let updatedCount = 0;

  for (const [relPath, config] of Object.entries(STEP_CONFIGS)) {
    const fullPath = path.join(baseDir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`[WARN] File not found: ${fullPath}`);
      continue;
    }

    const raw = fs.readFileSync(fullPath, 'utf-8').replace(/^\uFEFF/, '');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!fmMatch) {
      console.error(`[ERROR] Invalid frontmatter in ${fullPath}`);
      continue;
    }

    const meta = fmMatch[1];
    const body = fmMatch[2];

    const firstBlockIdx = body.search(/^```\w+:(start|solution)/m);
    const explanation = (firstBlockIdx === -1 ? body : body.slice(0, firstBlockIdx)).trim();

    // Parse existing blocks
    const blocks = {};
    const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
    let m;
    while ((m = blockRe.exec(body)) !== null) {
      blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
    }

    // Merge in new blocks from config
    if (config.htmlStart !== undefined) blocks['html:start'] = config.htmlStart.trimEnd();
    if (config.htmlSolution !== undefined) blocks['html:solution'] = config.htmlSolution.trimEnd();

    if (config.cssStart !== undefined) blocks['css:start'] = config.cssStart.trimEnd();
    if (config.cssSolution !== undefined) blocks['css:solution'] = config.cssSolution.trimEnd();

    if (config.jsStart !== undefined) blocks['js:start'] = config.jsStart.trimEnd();
    if (config.jsSolution !== undefined) blocks['js:solution'] = config.jsSolution.trimEnd();

    // Build ordered list of blocks
    const order = [
      'html:start',
      'css:start',
      'js:start',
      'html:solution',
      'css:solution',
      'js:solution'
    ];

    const codeParts = [];
    for (const key of order) {
      if (blocks[key] !== undefined && blocks[key].trim() !== '') {
        codeParts.push(`\`\`\`${key}\n${blocks[key]}\n\`\`\``);
      }
    }

    const newContent = `---\n${meta}\n---\n\n${explanation}\n\n${codeParts.join('\n\n')}\n`;
    fs.writeFileSync(fullPath, newContent, 'utf-8');
    console.log(`✅ Updated: ${relPath}`);
    updatedCount++;
  }

  console.log(`\n🎉 Successfully updated ${updatedCount} theoretical lessons!`);
}

if (process.argv[1] && process.argv[1].endsWith('fix-theory-lessons.mjs')) {
  applyUpdates();
}
