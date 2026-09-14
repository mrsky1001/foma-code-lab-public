// fix-webinar3-fragments.mjs
// Fixes 6 "fragment without context" steps in content/lessons/03-flexbox
// Run: node scripts/fix-webinar3-fragments.mjs
import { writeFileSync, readFileSync } from 'fs';

const DIR = 'content/lessons/03-flexbox';

const FULL_CSS = `* {
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
.container { width: 1200px; margin: 0 auto; padding: 0 15px; }
.header { border-bottom: 1px solid #dddddd; padding: 18px 0; background-color: #ffffff; }
.header-container { display: flex; justify-content: space-between; align-items: center; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #222222; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
.nav-list { display: flex; list-style: none; gap: 12px; align-items: center; }
.nav-link { text-decoration: none; color: #222222; padding: 8px 14px; border-radius: 4px; font-weight: 500; font-size: 14px; }
.nav-link:hover { color: #007bff; background-color: #eaf2ff; }
.nav-btn { background-color: #007bff; color: #ffffff; font-weight: 600; }
.main { flex: 1; padding: 40px 0; }
.hero-section { padding: 20px 0 50px 0; margin-bottom: 30px; }
.hero-title { font-size: 72px; line-height: 0.95; letter-spacing: -0.04em; font-weight: 800; color: #222222; margin-bottom: 25px; }
.brand-highlight { color: #007bff; }
.hero-bottom { border-top: 2px solid #222222; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
.hero-subtitle { font-size: 17px; color: #555555; max-width: 600px; }
.hero-metrics { display: flex; align-items: center; gap: 25px; }
.metric-item { display: flex; flex-direction: column; }
.metric-val { font-size: 20px; font-weight: 800; color: #007bff; }
.metric-lbl { font-size: 12px; color: #777777; font-weight: 500; }
.page-title { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; text-align: center; }
.page-subtitle { color: #666666; text-align: center; font-size: 15px; }
.footer { background-color: #f8f9fa; border-top: 1px solid #dddddd; color: #444444; padding: 25px 0; margin-top: auto; }
.footer-container { display: flex; justify-content: space-between; align-items: center; }
.footer-contacts p { font-size: 14px; margin-bottom: 4px; }
.footer-contacts a { color: #007bff; text-decoration: none; }
.btn { display: inline-block; padding: 8px 16px; font-size: 14px; font-weight: 600; border-radius: 4px; border: 1px solid transparent; cursor: pointer; text-decoration: none; text-align: center; }
.btn-primary { background-color: #007bff; color: #ffffff; }
.btn-primary:hover { background-color: #0056b3; }
.btn-outline { background-color: transparent; border-color: #007bff; color: #007bff; }
.btn-outline:hover { background-color: #007bff; color: #ffffff; }
.btn-icon { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: 4px; border: 1px solid #007bff; background-color: transparent; color: #007bff; cursor: pointer; text-decoration: none; }
.btn-icon:hover { background-color: #eaf2ff; }
.rooms-grid { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; margin-bottom: 30px; }
.room-card { width: 373px; border: 1px solid #dddddd; border-radius: 6px; overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column; }
.card-img-wrap { width: 100%; height: 200px; overflow: hidden; background-color: #f0f4f8; }
.card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-content { padding: 15px; display: flex; flex-direction: column; flex: 1; }
.card-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.card-equipment { list-style: none; margin-bottom: 15px; flex: 1; }
.card-equipment li { font-size: 13px; color: #555555; margin-bottom: 4px; }
.card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eeeeee; padding-top: 10px; gap: 10px; }
.card-price { font-size: 18px; font-weight: 700; color: #222222; }
.card-price span { font-size: 13px; font-weight: 400; color: #666666; }
.card-btns { display: flex; align-items: center; gap: 8px; }
.center-action { text-align: center; margin-top: 20px; }`;

const HTML_HEAD = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo"><span>СмартОфис</span></a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span></h1>
        <div class="hero-bottom">
          <p class="hero-subtitle">Удобный выбор и быстрое бронирование рабочих пространств в центре города</p>
          <div class="hero-metrics">
            <div class="metric-item"><span class="metric-val">24/7</span><span class="metric-lbl">Доступ</span></div>
            <div class="metric-item"><span class="metric-val">от 250 ₽</span><span class="metric-lbl">Почасовая аренда</span></div>
            <div class="metric-item"><span class="metric-val">0 ₽</span><span class="metric-lbl">Без комиссии</span></div>
          </div>
        </div>
      </section>`;

const HTML_FOOT = `    </div>
  </main>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-info">
        <p><strong>СмартОфис</strong> — Сервис бронирования офисных комнат</p>
        <p>© 2026 СмартОфис. Все права защищены.</p>
      </div>
      <div class="footer-contacts">
        <p>Email: <a href="mailto:info@smartoffice.ru">info@smartoffice.ru</a></p>
        <p>Телефон: <a href="tel:+78005553535">+7 (800) 555-35-35</a></p>
      </div>
    </div>
  </footer>
</body>
</html>`;

function page(inner) { return HTML_HEAD + '\n' + inner + '\n' + HTML_FOOT; }

function md(title, hl, explanation, startHtml, solHtml, startCss, solCss) {
  let out = '---\ntitle: "' + title + '"\nhighlight: ' + hl + '\n---\n\n' + explanation + '\n';
  if (startHtml) out += '\n```html:start\n' + startHtml + '\n```\n';
  if (solHtml)   out += '\n```html:solution\n' + solHtml + '\n```\n';
  if (startCss)  out += '\n```css:start\n' + startCss + '\n```\n';
  if (solCss)    out += '\n```css:solution\n' + solCss + '\n```\n';
  return out;
}

function readExplanation(filename) {
  const content = readFileSync(DIR + '/' + filename, 'utf-8');
  const fmMatch = content.match(/^---[\s\S]*?---\r?\n([\s\S]*?)(?=\n```|$)/);
  if (!fmMatch) return '';
  return fmMatch[1].trim();
}

const SEC_HERO_ONLY = `      <!-- Здесь добавьте новую секцию .popular-section -->`;

const SEC_TITLES = `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

      </section>`;

const SEC_GRID = `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <div class="rooms-grid">

        </div>
      </section>`;

const SEC_EMPTY_CARD = `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <div class="rooms-grid">
          <div class="room-card">

          </div>
        </div>
      </section>`;

const SEC_CARD_NO_IMG = `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <div class="rooms-grid">
          <div class="room-card">
            <!-- Здесь добавьте .card-img-wrap -->
          </div>
        </div>
      </section>`;

const SEC_CARD_WITH_IMG = `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/room-details.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img">
              </a>
            </div>
          </div>
        </div>
      </section>`;

const SEC_FULL_CARD = `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/room-details.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/room-details.html" style="text-decoration:none;color:inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/booking.html" class="btn-icon" title="Подробнее">&#8599;</a>
                  <a href="pages/booking.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;

const SEC_FULL_CARD_WITH_ACTION = SEC_FULL_CARD.replace(
  '      </section>',
  `        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>`
);

const CSS_NO_BTNS = FULL_CSS.replace(
  '.card-btns { display: flex; align-items: center; gap: 8px; }',
  '/* Задание: добавьте стили для .card-btns */'
);

const CSS_NO_ACTION = FULL_CSS.replace(
  '.center-action { text-align: center; margin-top: 20px; }',
  '/* Задание: добавьте стили для .center-action */'
);

// Fix step 01
writeFileSync(DIR + '/01-popular-section-html.md',
  md('Разметка новой секции', 'html', readExplanation('01-popular-section-html.md'),
    page(SEC_HERO_ONLY), page(SEC_TITLES), FULL_CSS, null));
console.log('Fixed 01');

// Fix step 07
writeFileSync(DIR + '/07-grid-container-html.md',
  md('Сетка комнат (Контейнер)', 'html', readExplanation('07-grid-container-html.md'),
    page(SEC_TITLES), page(SEC_GRID), FULL_CSS, null));
console.log('Fixed 07');

// Fix step 08
writeFileSync(DIR + '/08-room-card-html.md',
  md('Скелет карточки комнаты', 'html', readExplanation('08-room-card-html.md'),
    page(SEC_GRID), page(SEC_EMPTY_CARD), FULL_CSS, null));
console.log('Fixed 08');

// Fix step 10
writeFileSync(DIR + '/10-card-image-html.md',
  md('Картинка комнаты', 'html', readExplanation('10-card-image-html.md'),
    page(SEC_CARD_NO_IMG), page(SEC_CARD_WITH_IMG), FULL_CSS, null));
console.log('Fixed 10');

// Fix step 18
writeFileSync(DIR + '/18-card-btns-layout.md',
  md('Выравнивание кнопок карточки', 'css', readExplanation('18-card-btns-layout.md'),
    page(SEC_FULL_CARD), null, CSS_NO_BTNS, FULL_CSS));
console.log('Fixed 18');

// Fix step 21
writeFileSync(DIR + '/21-center-action.md',
  md('Финальная кнопка «Больше офисов»', 'html', readExplanation('21-center-action.md'),
    page(SEC_FULL_CARD), page(SEC_FULL_CARD_WITH_ACTION), CSS_NO_ACTION, FULL_CSS));
console.log('Fixed 21');

console.log('Done! 6 steps fixed.');
