// fix-css-html-context.mjs
// Injects html:start into CSS-only steps in webinars 02-markup and 03-flexbox.
// These steps lack html context, causing the Preview to show a blank page.
// Run: node scripts/fix-css-html-context.mjs

import { writeFileSync, readFileSync } from 'fs';

// ─── SHARED HEAD ─────────────────────────────────────────────────────────────

const HEAD = `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">`;

function page(body) {
  return `<!DOCTYPE html>\n<html lang="ru">\n<head>\n${HEAD}\n</head>\n<body>\n${body}\n</body>\n</html>`;
}

// ─── HTML BODIES AT EACH STAGE ───────────────────────────────────────────────

const BODY_EMPTY = ``;

const BODY_HEADER_SKELETON = `  <header class="header">
    <div class="container header-container">
      
    </div>
  </header>`;

const BODY_HEADER_WITH_LOGO = `  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon" onerror="this.style.display='none'">
        <span>СмартОфис</span>
      </a>
    </div>
  </header>`;

const BODY_HEADER_FULL = `  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon" onerror="this.style.display='none'">
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
  </header>`;

const HERO_H1 = `        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>`;

const HERO_BOTTOM = `        <div class="hero-bottom">
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
        </div>`;

function bodyWithHeroAndFooter(heroContent, includeFooter) {
  const footer = `  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-contacts">
        <p>СмартОфис — умное бронирование</p>
        <p>Email: <a href="mailto:info@smartofis.ru">info@smartofis.ru</a></p>
      </div>
      <p>© 2024 СмартОфис</p>
    </div>
  </footer>`;

  return `${BODY_HEADER_FULL}

  <main class="main">
    <div class="container">
      <section class="hero-section">
${heroContent}
      </section>
    </div>
  </main>${includeFooter ? '\n\n' + footer : ''}`;
}

// ── Webinar 2 hero states ────────────────────────────────────────────────────

const BODY_HERO_H1_ONLY = bodyWithHeroAndFooter(HERO_H1, false);
const BODY_HERO_WITH_BOTTOM = bodyWithHeroAndFooter(HERO_H1 + '\n' + HERO_BOTTOM, false);
const BODY_FULL_WEB2_NO_FOOTER = bodyWithHeroAndFooter(HERO_H1 + '\n' + HERO_BOTTOM, false);
const BODY_FULL_WEB2_WITH_FOOTER = bodyWithHeroAndFooter(HERO_H1 + '\n' + HERO_BOTTOM, true);

// ── Webinar 3 HTML states ────────────────────────────────────────────────────

const POPULAR_SECTION_TITLES_ONLY = `
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
      </section>`;

const POPULAR_SECTION_WITH_GRID_EMPTY = `
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
        </div>
      </section>`;

// One room card skeleton (after step 08)
const POPULAR_SECTION_ONE_CARD_SKELETON = `
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
          <div class="room-card">
          </div>
        </div>
      </section>`;

// After step 10 (card-image-html added)
const POPULAR_SECTION_WITH_IMG = `
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
          </div>
        </div>
      </section>`;

// After step 12 (card-content-html with title and equipment)
const POPULAR_SECTION_WITH_CONTENT = `
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
            </div>
          </div>
        </div>
      </section>`;

// After step 15 (card-footer-html — full single card with footer, price, btns)
const POPULAR_SECTION_FULL_ONE_CARD = `
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;

// After step 19 (all 3 cards)
const POPULAR_SECTION_THREE_CARDS = `
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap"><a href="pages/catalog.html"><img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'"></a></div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration:none;color:inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment"><li>Wi-Fi 500 Мбит/с</li><li>4K Монитор</li><li>Эргономичное кресло</li></ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
          <div class="room-card">
            <div class="card-img-wrap"><a href="pages/catalog.html"><img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'"></a></div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration:none;color:inherit;">Конференц-зал Alpha</a></h3>
              <ul class="card-equipment"><li>Проектор 4K</li><li>Спикерфон</li><li>Флипчарт</li></ul>
              <div class="card-footer">
                <div class="card-price">1200 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
          <div class="room-card">
            <div class="card-img-wrap"><a href="pages/catalog.html"><img src="img/room-3.jpg" alt="Опенспейс Hub" class="card-img" onerror="this.src='img/no-image.svg'"></a></div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration:none;color:inherit;">Опенспейс Hub</a></h3>
              <ul class="card-equipment"><li>Личный стол</li><li>Wi-Fi</li><li>Кофе-поинт</li></ul>
              <div class="card-footer">
                <div class="card-price">250 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>`;

// Helper: build full page with webinar-2 header + main containing hero + given popular section
function web3Page(popularSectionHtml) {
  return page(`${BODY_HEADER_FULL}

  <main class="main">
    <div class="container">
      <section class="hero-section">
${HERO_H1}
${HERO_BOTTOM}
      </section>
${popularSectionHtml}
    </div>
  </main>

  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-contacts">
        <p>СмартОфис — умное бронирование</p>
        <p>Email: <a href="mailto:info@smartofis.ru">info@smartofis.ru</a></p>
      </div>
      <p>© 2024 СмартОфис</p>
    </div>
  </footer>`);
}

// ─── FILE → HTML CONTEXT MAP ─────────────────────────────────────────────────

const HTML_FOR_STEP = {
  // ── Webinar 02-markup ──────────────────────────────────────────────────────
  'content/lessons/02-markup/07-body-styles.md':    page(BODY_EMPTY),
  'content/lessons/02-markup/08-flex-body.md':       page(BODY_EMPTY),
  'content/lessons/02-markup/09-container-css.md':   page(BODY_EMPTY),
  'content/lessons/02-markup/11-header-css.md':      page(BODY_HEADER_SKELETON),
  'content/lessons/02-markup/13-logo-css.md':        page(BODY_HEADER_WITH_LOGO),
  'content/lessons/02-markup/16-nav-links.md':       page(BODY_HEADER_FULL),
  'content/lessons/02-markup/17-nav-button.md':      page(BODY_HEADER_FULL),
  'content/lessons/02-markup/21-hero-bottom-css.md': page(BODY_HERO_H1_ONLY),
  'content/lessons/02-markup/22-hero-metrics-css.md':page(BODY_HERO_WITH_BOTTOM),
  'content/lessons/02-markup/24-footer-css.md':      page(BODY_FULL_WEB2_WITH_FOOTER),

  // ── Webinar 03-flexbox ─────────────────────────────────────────────────────
  'content/lessons/03-flexbox/02-page-titles-css.md':  web3Page(POPULAR_SECTION_TITLES_ONLY),
  'content/lessons/03-flexbox/03-buttons-base-css.md': web3Page(POPULAR_SECTION_TITLES_ONLY),
  'content/lessons/03-flexbox/04-btn-primary-css.md':  web3Page(POPULAR_SECTION_TITLES_ONLY),
  'content/lessons/03-flexbox/05-btn-outline-css.md':  web3Page(POPULAR_SECTION_TITLES_ONLY),
  'content/lessons/03-flexbox/06-btn-icon-css.md':     web3Page(POPULAR_SECTION_TITLES_ONLY),
  'content/lessons/03-flexbox/09-room-card-css.md':    web3Page(POPULAR_SECTION_ONE_CARD_SKELETON),
  'content/lessons/03-flexbox/11-card-image-css.md':   web3Page(POPULAR_SECTION_WITH_IMG),
  'content/lessons/03-flexbox/13-card-content-css.md': web3Page(POPULAR_SECTION_WITH_CONTENT),
  'content/lessons/03-flexbox/14-card-equipment-css.md':web3Page(POPULAR_SECTION_WITH_CONTENT),
  'content/lessons/03-flexbox/16-card-footer-css.md':  web3Page(POPULAR_SECTION_FULL_ONE_CARD),
  'content/lessons/03-flexbox/17-card-price-css.md':   web3Page(POPULAR_SECTION_FULL_ONE_CARD),
  'content/lessons/03-flexbox/18-card-btns-layout.md': web3Page(POPULAR_SECTION_FULL_ONE_CARD),
  'content/lessons/03-flexbox/20-rooms-grid-css.md':   web3Page(POPULAR_SECTION_THREE_CARDS),
  'content/lessons/03-flexbox/21-center-action.md':    web3Page(POPULAR_SECTION_THREE_CARDS),
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: '', body: content };
  return { meta: match[1], body: match[2] };
}

function extractExplanation(body) {
  const firstBlock = body.search(/^```\w+:(start|solution)/m);
  return (firstBlock === -1 ? body : body.slice(0, firstBlock)).trimEnd();
}

function parseCodeBlocks(body) {
  const blocks = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = blockRe.exec(body)) !== null) {
    blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
  }
  return blocks;
}

function buildCodeBlock(lang, variant, code) {
  return `\`\`\`${lang}:${variant}\n${code}\n\`\`\``;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

let updated = 0;

for (const [filePath, htmlContext] of Object.entries(HTML_FOR_STEP)) {
  let raw;
  try {
    raw = readFileSync(filePath, 'utf-8');
  } catch {
    console.warn(`  ⚠️  Not found: ${filePath}`);
    continue;
  }

  const { meta, body } = parseFrontmatter(raw);
  const explanation = extractExplanation(body);
  const blocks = parseCodeBlocks(body);

  // Build ordered output: html:start always first, then css:start/css:solution
  const parts = [];

  // html:start — always inject/replace
  parts.push(buildCodeBlock('html', 'start', htmlContext));

  // Keep existing css blocks
  if (blocks['css:start'] !== undefined) {
    parts.push(buildCodeBlock('css', 'start', blocks['css:start']));
  }
  if (blocks['css:solution'] !== undefined) {
    parts.push(buildCodeBlock('css', 'solution', blocks['css:solution']));
  }

  const newContent = `---\n${meta}\n---\n\n${explanation}\n\n${parts.join('\n\n')}\n`;
  writeFileSync(filePath, newContent, 'utf-8');
  console.log(`  ✅ Injected html:start → ${filePath}`);
  updated++;
}

console.log(`\n--- Done: ${updated} files updated ---`);
