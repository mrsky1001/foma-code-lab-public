// scripts/fix-remaining-audit-issues.mjs
// Injects missing html:start context into the remaining 11 steps
// and fixes ES module / intentional syntax test handling in verify-all-lessons.mjs

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function parseMd(content) {
  const m = content.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const frontmatter = m[1].trim();
  const body = m[2].trim();
  const codeIdx = body.search(/```[a-zA-Z0-9_\.\-]+:(start|solution)/);
  const description = (codeIdx !== -1 ? body.slice(0, codeIdx) : body).trim();

  const blocks = {};
  const blockRe = /^```(\w+):(start|solution)\n([\s\S]*?)^```/gm;
  let bm;
  while ((bm = blockRe.exec(body)) !== null) {
    blocks[`${bm[1]}:${bm[2]}`] = bm[3].trimEnd();
  }

  return { frontmatter, description, blocks };
}

function rebuildMd(frontmatter, description, blocks) {
  let out = `---\n${frontmatter}\n---\n\n${description}\n\n`;
  const order = ['html:start', 'css:start', 'js:start', 'html:solution', 'css:solution', 'js:solution'];
  for (const key of order) {
    if (blocks[key] !== undefined) {
      const [lang, variant] = key.split(':');
      out += `\`\`\`${lang}:${variant}\n${blocks[key].trimEnd()}\n\`\`\`\n\n`;
    }
  }
  return out.trimEnd() + '\n';
}

function setHtmlStart(filePath, htmlStart) {
  const content = readFileSync(filePath, 'utf-8');
  const parsed = parseMd(content);
  if (!parsed) throw new Error(`Could not parse ${filePath}`);
  parsed.blocks['html:start'] = htmlStart.trimEnd();
  const updated = rebuildMd(parsed.frontmatter, parsed.description, parsed.blocks);
  writeFileSync(filePath, updated, 'utf-8');
  console.log(`  ✓ Updated html:start in ${filePath}`);
}

// ── 02-markup steps ──────────────────────────────────────────

// Step 10: header skeleton
const HTML_EMPTY_BODY = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
</body>
</html>`;

setHtmlStart('content/lessons/02-markup/10-header-html.md', HTML_EMPTY_BODY);

// Step 12: logo
const HTML_HEADER_CONTAINER = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
  <header class="header">
    <div class="container header-container">
    </div>
  </header>
</body>
</html>`;

setHtmlStart('content/lessons/02-markup/12-logo-html.md', HTML_HEADER_CONTAINER);

// Step 14: nav
const HTML_HEADER_WITH_LOGO = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
    </div>
  </header>
</body>
</html>`;

setHtmlStart('content/lessons/02-markup/14-nav-html.md', HTML_HEADER_WITH_LOGO);

// Step 20: hero-bottom
const HTML_HERO_TITLE = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
      </section>
    </div>
  </main>
</body>
</html>`;

setHtmlStart('content/lessons/02-markup/20-hero-bottom-html.md', HTML_HERO_TITLE);

// Step 23: footer
const HTML_HERO_COMPLETE = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
        <div class="hero-bottom">
          <p class="hero-subtitle">
            Удобный выбор и быстрое бронирование рабочих пространств в центре города
          </p>
          <div class="hero-metrics">
            <div class="metric-item">
              <span class="metric-val">24/7</span>
              <span class="metric-lbl">Доступ</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">от 250 ₽</span>
              <span class="metric-lbl">Почасовая аренда</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">0 ₽</span>
              <span class="metric-lbl">Без комиссии</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</body>
</html>`;

setHtmlStart('content/lessons/02-markup/23-footer-html.md', HTML_HERO_COMPLETE);

// ── 03-flexbox steps ─────────────────────────────────────────

// Theory 04: card
const HTML_THEORY_CARD = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI-карточка</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="card">
    <div class="card-img-wrap">
      <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
    </div>
    <!-- Добавьте сюда card-content с h3 и p -->
    <!-- Добавьте сюда card-footer со span.card-price и button -->
  </div>
</body>
</html>`;

setHtmlStart('content/lessons/03-flexbox/00-theory-04-card.md', HTML_THEORY_CARD);

// Step 12: card content
const file11 = readFileSync('content/lessons/03-flexbox/11-card-image-css.md', 'utf-8');
const p11 = parseMd(file11);
if (p11 && p11.blocks['html:start']) {
  setHtmlStart('content/lessons/03-flexbox/12-card-content-html.md', p11.blocks['html:start']);
}

// Step 15: card footer
const file14 = readFileSync('content/lessons/03-flexbox/14-card-equipment-css.md', 'utf-8');
const p14 = parseMd(file14);
if (p14 && p14.blocks['html:start']) {
  setHtmlStart('content/lessons/03-flexbox/15-card-footer-html.md', p14.blocks['html:start']);
}

// Step 19: duplicate cards
const file18 = readFileSync('content/lessons/03-flexbox/18-card-btns-layout.md', 'utf-8');
const p18 = parseMd(file18);
if (p18 && p18.blocks['html:start']) {
  setHtmlStart('content/lessons/03-flexbox/19-duplicate-cards.md', p18.blocks['html:start']);
}

// ── 06-forms theory steps ────────────────────────────────────

// Theory 01: forms
const HTML_THEORY_FORMS = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML-формы</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <form id="bookingForm">
    <!-- Добавьте поля: name, email, date, textarea, select, button -->
  </form>
</body>
</html>`;

setHtmlStart('content/lessons/06-forms/00-theory-01-forms.md', HTML_THEORY_FORMS);

// Theory 06: modal
const HTML_THEORY_MODAL = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Модальные окна</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <button id="openModalBtn">Открыть окно</button>
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-box">
      <h3>Заголовок окна</h3>
      <p>Контент модального окна</p>
      <button id="closeModalBtn">Закрыть</button>
    </div>
  </div>
</body>
</html>`;

setHtmlStart('content/lessons/06-forms/00-theory-06-modal.md', HTML_THEORY_MODAL);

console.log('--- Injected all html:start blocks ---');
