---
title: "Получение ссылок навигации"
highlight: js
type: practice
---


# Получение ссылок навигации

`document.querySelectorAll('.nav-link')` — находит **все** элементы с классом `.nav-link`.

`window.location.pathname` — строка с текущим URL-путём. Например: `/`, `/pages/catalog.html`.

Сравниваем `href` каждой ссылки с текущим путём — так определяем активный пункт.

## 🛠 Задание

Внутри `initNavigation` добавьте:
```js
const links = document.querySelectorAll('.nav-link'); // находим все ссылки навигации
const current = window.location.pathname;             // текущий путь страницы из адресной строки браузера
```

```html:start
<!DOCTYPE html>
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
  <script src="js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="СмартОфис" class="logo-icon" onerror="this.style.display='none'">
        СмартОфис
      </a>
      <nav>
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li id="my-bookings-nav" style="display: none;"><a href="pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="auth-nav-btn">Войти</a></li>
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
          <p class="hero-subtitle">Быстро найдите и забронируйте идеальное пространство для работы и переговоров</p>
          <div class="hero-metrics">
            <div class="metric-item">
              <span class="metric-val">120+</span>
              <span class="metric-lbl">Офисных комнат</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">15 мин</span>
              <span class="metric-lbl">Среднее время брони</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">98%</span>
              <span class="metric-lbl">Довольных клиентов</span>
            </div>
          </div>
        </div>
      </section>

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
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Конференц-зал Alpha</a></h3>
              <ul class="card-equipment">
                <li>Проектор 4K</li>
                <li>Спикерфон</li>
                <li>Флипчарт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">1200 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-3.jpg" alt="Опенспейс Hub" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Опенспейс Hub</a></h3>
              <ul class="card-equipment">
                <li>Личный стол</li>
                <li>Wi-Fi</li>
                <li>Кофе-поинт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">250 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>
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
  </footer>
</body>
</html>
```

```css:start
* {
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
}
.nav-list {
  display: flex;
  list-style: none;
  gap: 12px;
  align-items: center;
}
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
}
.nav-btn {
  background-color: #007bff;
  color: #ffffff;
  font-weight: 600;
}
.nav-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}
.main {
  flex: 1;
  padding: 40px 0;
}
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
}
.hero-bottom {
  border-top: 2px solid #222222;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}
.hero-subtitle {
  font-size: 17px;
  color: #555555;
  max-width: 600px;
}
.hero-metrics {
  display: flex;
  align-items: center;
  gap: 25px;
}
.metric-item {
  display: flex;
  flex-direction: column;
}
.metric-val {
  font-size: 20px;
  font-weight: 800;
  color: #007bff;
}
.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}
.page-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  text-align: center;
}
.page-subtitle {
  color: #666666;
  text-align: center;
  font-size: 15px;
}
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dddddd;
  color: #444444;
  padding: 25px 0;
  margin-top: auto;
}
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-contacts p {
  font-size: 14px;
  margin-bottom: 4px;
}
.footer-contacts a {
  color: #007bff;
  text-decoration: none;
}
.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}
.btn-primary {
  background-color: #007bff;
  color: #ffffff;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-outline {
  background-color: transparent;
  border-color: #007bff;
  color: #007bff;
}
.btn-outline:hover {
  background-color: #007bff;
  color: #ffffff;
}
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid #007bff;
  background-color: transparent;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}
.btn-icon:hover {
  background-color: #eaf2ff;
}
.rooms-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.room-card {
  width: 373px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}
.card-img-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f4f8;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}
.card-equipment {
  list-style: none;
  margin-bottom: 15px;
  flex: 1;
}
.card-equipment li {
  font-size: 14px;
  color: #555555;
  padding: 3px 0 3px 14px;
  position: relative;
}
.card-equipment li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #007bff;
  font-size: 12px;
}
.card-footer {
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-price {
  font-size: 20px;
  font-weight: 800;
  color: #007bff;
}
.card-price span {
  font-size: 14px;
  color: #888888;
  font-weight: 400;
}
.card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}
.center-action {
  text-align: center;
  margin-top: 20px;
}
.nav-link.active {
  color: #007bff;
  background-color: #eaf2ff;
}
```

```js:start
// СмартОфис — Скрипт веб-приложения (Вебинар 4)
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

// Функция всплывающих уведомлений (Toast) справа внизу
function showNotification(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.textContent = message;
  const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8' };
  toast.style.cssText = `background-color: ${colors[type] || colors.success}; color: #fff; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 1; transform: translateY(0); transition: none;`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Функция подсветки активного пункта навигации
function initNavigation() {
  
}
```

```js:solution
// СмартОфис — Скрипт веб-приложения (Вебинар 4)
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

// Функция всплывающих уведомлений (Toast) справа внизу
function showNotification(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.textContent = message;
  const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8' };
  toast.style.cssText = `background-color: ${colors[type] || colors.success}; color: #fff; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 1; transform: translateY(0); transition: none;`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Функция подсветки активного пункта навигации
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const current = window.location.pathname.split('/').pop() || 'index.html';
}
```
