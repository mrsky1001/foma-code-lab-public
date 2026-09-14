// fix-webinar2-fragments.mjs
// Fixes 4 "fragment without context" steps in content/lessons/02-markup:
//   - 06-css-reset.md       (css:start is empty, html:start missing)
//   - 15-nav-css.md         (css:start is 2 lines only, html:start missing)
//   - 18-main-hero-html.md  (html:start is 3-line fragment)
//   - 19-hero-title.md      (html:start is 6-line fragment + css:start is 4 lines)
// Run: node scripts/fix-webinar2-fragments.mjs

import { writeFileSync, readFileSync } from 'fs';

const DIR = 'content/lessons/02-markup';

// ─── HTML SNAPSHOTS AT EACH STEP ─────────────────────────────────────────────

// HTML after step 05 (link-css added, body opened — empty body)
const HTML_STEP05 = `<!DOCTYPE html>
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

// HTML after step 14 (nav added, header complete)
const HTML_AFTER_STEP14 = `<!DOCTYPE html>
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
</body>
</html>`;

// HTML after step 17 (header fully complete, before main added)
// Same as after step 14 for our purposes
const HTML_BEFORE_MAIN = HTML_AFTER_STEP14;

// HTML after step 18 (main + hero-section skeleton added)
const HTML_AFTER_STEP18 = `<!DOCTYPE html>
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
        
      </section>
    </div>
  </main>
</body>
</html>`;

// HTML after step 19 (h1 added inside hero-section — solution of step 19)
const HTML_AFTER_STEP19 = `<!DOCTYPE html>
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

// ─── CSS SNAPSHOTS ────────────────────────────────────────────────────────────

// CSS after step 05 (empty — just reset comment)
const CSS_STEP06_START = `/* Наш CSS пока пуст */`;

// CSS after step 06 (reset added)
const CSS_AFTER_STEP06 = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`;

// CSS after step 14 (nav html added — CSS is through step 13 logo-icon styles)
const CSS_AFTER_STEP13 = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Inter', sans-serif;
  color: #222222;
  background-color: #ffffff;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 1200px;
}
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
.header {
  border-bottom: 1px solid #dddddd;
  padding: 18px 0;
  background-color: #ffffff;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #222222;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.logo-icon {
  width: 32px;
  height: 32px;
}`;

// CSS after step 14 (same as 13 — step 14 is HTML only)
const CSS_STEP15_START = CSS_AFTER_STEP13;

// CSS after step 15 (nav-list added)
const CSS_AFTER_STEP15 = CSS_AFTER_STEP13 + `
.nav-list {
  display: flex;
  list-style: none;
  gap: 12px;
  align-items: center;
}`;

// CSS after step 16 (nav-links added)
const CSS_AFTER_STEP16 = CSS_AFTER_STEP15 + `
.nav-link {
  text-decoration: none;
  color: #222222;
  padding: 8px 14px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
}
.nav-link:hover {
  color: #007bff;
  background-color: #eaf2ff;
}`;

// CSS after step 17 (nav-btn added — header CSS complete)
const CSS_AFTER_STEP17 = CSS_AFTER_STEP16 + `
.nav-btn {
  background-color: #007bff;
  color: #ffffff;
  font-weight: 600;
}
.nav-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}`;

// CSS after step 19 (hero styles: .main, .hero-section, .hero-title, .brand-highlight)
const CSS_AFTER_STEP19 = CSS_AFTER_STEP17 + `
/* Основной блок */
.main {
  flex: 1;
  padding: 40px 0;
}

/* Главный баннер (Hero) */
.hero-section {
  padding: 20px 0 50px 0;
  margin-bottom: 30px;
}

.hero-title {
  font-size: 108px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: #222222;
  margin-bottom: 25px;
}

.brand-highlight {
  color: #007bff;
}`;

// ─── STEP DEFINITIONS ─────────────────────────────────────────────────────────

const FIXES = [
  {
    file: '06-css-reset.md',
    highlight: 'css',
    htmlStart: HTML_STEP05,
    htmlSolution: null, // HTML doesn't change in this step
    cssStart: CSS_STEP06_START,
    cssSolution: CSS_AFTER_STEP06,
  },
  {
    file: '15-nav-css.md',
    highlight: 'css',
    htmlStart: HTML_AFTER_STEP14,
    htmlSolution: null, // HTML doesn't change
    cssStart: CSS_STEP15_START,
    cssSolution: CSS_AFTER_STEP15,
  },
  {
    file: '18-main-hero-html.md',
    highlight: 'html',
    htmlStart: HTML_BEFORE_MAIN,
    htmlSolution: HTML_AFTER_STEP18,
    cssStart: CSS_AFTER_STEP17,
    cssSolution: null, // CSS doesn't change
  },
  {
    file: '19-hero-title.md',
    highlight: 'html',
    htmlStart: HTML_AFTER_STEP18,
    htmlSolution: HTML_AFTER_STEP19,
    cssStart: CSS_AFTER_STEP17,
    cssSolution: CSS_AFTER_STEP19,
  },
];

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

function buildCodeBlock(lang, variant, code) {
  return `\`\`\`${lang}:${variant}\n${code}\n\`\`\``;
}

function buildStep(fix, existingContent) {
  const { meta, body } = parseFrontmatter(existingContent);
  const explanation = extractExplanation(body);

  const blocks = [];

  if (fix.htmlStart !== null) blocks.push(buildCodeBlock('html', 'start', fix.htmlStart));
  if (fix.htmlSolution !== null) blocks.push(buildCodeBlock('html', 'solution', fix.htmlSolution));
  if (fix.cssStart !== null) blocks.push(buildCodeBlock('css', 'start', fix.cssStart));
  if (fix.cssSolution !== null) blocks.push(buildCodeBlock('css', 'solution', fix.cssSolution));

  return `---\n${meta}\n---\n\n${explanation}\n\n${blocks.join('\n\n')}\n`;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

let updated = 0;

for (const fix of FIXES) {
  const filePath = `${DIR}/${fix.file}`;
  let existing;
  try {
    existing = readFileSync(filePath, 'utf-8');
  } catch {
    console.warn(`  ⚠️  File not found: ${filePath}`);
    continue;
  }
  const newContent = buildStep(fix, existing);
  writeFileSync(filePath, newContent, 'utf-8');
  console.log(`  ✅ Fixed: ${fix.file}`);
  updated++;
}

console.log(`\n--- Done: ${updated} files fixed ---`);
