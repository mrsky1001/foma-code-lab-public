"""
Generates scripts/audit_fix_rules.json with high-precision patterns for all 113 issues.
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Read parsed 113
raw_issues = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

# Custom definitions for each issue: (flawed_patterns, fixed_patterns, frontmatter_expected)
# A flawed_pattern is something that SHOULD BE REMOVED (if found in file, fix is not complete).
# A fixed_pattern is something that MUST BE PRESENT (if NOT found in file, fix is not complete).
# If frontmatter_expected is provided, frontmatter YAML must contain that key-value.

rules = []

for item in raw_issues:
    iid = item['id']
    fpath = item['file_path']
    m_stone = item['milestone']
    lesson = item['lesson']
    clean_type = item['type'].replace('`', '').strip()
    clean_prio = item['priority'].replace('`', '').strip()
    title = item['title']
    
    flawed = []
    fixed = []
    fm_exp = None
    
    # ------------------ M1 (1..34) ------------------
    if iid == 1:
        # 01-welcome.md
        flawed = ["btn.addEventListener('click', () => alert('Забронировано!'));"]
        fixed = ["const btn = document.querySelector('.btn');"]
    elif iid == 2:
        # 04-paragraphs.md
        flawed = ["## Блочные vs строчные элементы"]
        fixed = ["СмартОфис"]
    elif iid == 3:
        # 06-links.md
        flawed = ['target="_blank" rel="noopener"', "target='_blank' rel='noopener'"]
        fixed = ['rel="noopener noreferrer"']
    elif iid == 4:
        # 07-images.md
        flawed = ['<img src="img/logo.svg" alt="СмартОфис" loading="lazy">', '<img src="img/logo.svg" alt="Логотип" loading="lazy">']
        fixed = ['Изображения первого экрана', 'above-the-fold', 'без loading="lazy"']
    elif iid == 5:
        # 08-html-structure.md
        flawed = ["### Шаг 1: Объявление типа документа"]
        fixed = ["Анатоми", "фундамент"]
    elif iid == 6:
        # 09-what-is-css.md
        flawed = ["```html:start\r\n<body>", "```html:start\n<body>"]
        fixed = ["<!DOCTYPE html>", "<style>"]
    elif iid == 7:
        # 10-css-selectors.md
        flawed = []
        fixed = ["border-radius: 4px"]
    elif iid == 8:
        # 11-block-inline.md
        flawed = []
        fixed = ["text-decoration: none;\n    color: #1e293b;", "text-decoration: none;\r\n    color: #1e293b;"]
    elif iid == 9:
        # 00-theory-01-doctype.md
        flawed = ["DOCTYPE сообщает браузеру, по каким стандартам"]
        fixed = ["Quirks Mode", "Standards Mode"]
    elif iid == 10:
        # 00-theory-02-head.md
        flawed = ['<link rel="stylesheet" href="css/style.css">']
        fixed = ["<!-- Без подключения css/style.css -->", "<title>СмартОфис — Коворкинг</title>"]
    elif iid == 11:
        # 00-theory-06b-variables.md
        flawed = []
        fixed = ["--brand-dark"]
    elif iid == 12:
        # 00-theory-07-container.md
        flawed = ["padding: 0 16px;"]
        fixed = ["padding: 0 20px;"]
    elif iid == 13:
        # 00-theory-08-flexbox.md
        flawed = []
        fixed = ["align-items: flex-start;"]
    elif iid == 14:
        # 04-google-fonts.md
        flawed = []
        fixed = ['<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>']
    elif iid == 15:
        # 08-flex-body.md
        flawed = ["min-width: 1200px;"]
        fixed = ["```css:start", "```css:solution"]
    elif iid == 16:
        # 09-container-css.md
        flawed = ["width: 1200px;"]
        fixed = ["max-width: 1200px;"]
    elif iid == 17:
        # 15-nav-css.md
        flawed = ['class="nav-link nav-btn" id="authNavBtn">Войти</a>', 'class="nav-link active"']
        fixed = ['<ul class="nav-list">', '<li class="nav-item"><a href="#" class="nav-link">Главная</a></li>']
    elif iid == 18:
        # 16-nav-links.md
        flawed = ['class="nav-link nav-btn" id="authNavBtn">Войти</a>']
        fixed = ['<a href="#" class="nav-link">Контакты</a>']
    elif iid == 19:
        # 17-nav-button.md
        flawed = ['```html:start\r\n<header class="header">\r\n  <div class="container header-container">\r\n    <a href="#" class="logo">\r\n      <img src="img/logo.svg" alt="СмартОфис" class="logo-img">\r\n      <span class="logo-text">СмартОфис</span>\r\n    </a>\r\n    <nav class="nav">\r\n      <ul class="nav-list">\r\n        <li class="nav-item"><a href="#" class="nav-link active">Главная</a></li>\r\n        <li class="nav-item"><a href="#" class="nav-link">Каталог</a></li>\r\n        <li class="nav-item"><a href="#" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>\r\n      </ul>\r\n    </nav>\r\n  </div>\r\n</header>```']
        fixed = ['id="authNavBtn">Войти</a>']
    elif iid == 20:
        # 21-hero-bottom-css.md
        flawed = []
        fixed = ['<div class="hero-bottom">', 'hero-subtitle']
    elif iid == 21:
        # 24-footer-css.md
        flawed = ['<p class="footer-copy">© 2025 СмартОфис. Все права защищены.</p>']
        fixed = ['<footer class="footer">', 'footer-info', 'footer-contacts']
    elif iid == 22:
        # 00-theory-03-pseudo.md
        flawed = [".btn:focus {\n  outline: 2px solid", ".btn:focus {\r\n  outline: 2px solid"]
        fixed = [":hover", ":active"]
    elif iid == 23:
        # 00-theory-04-card.md
        flawed = []
        fixed = ["overflow: hidden", "object-fit: cover"]
    elif iid == 24:
        # 01-popular-section-html.md
        flawed = [".room-card {", ".rooms-grid {"]
        fixed = [".popular {"]
    elif iid == 25:
        # 07-grid-container-html.md
        flawed = [".card-content {", ".card-image {"]
        fixed = [".rooms-grid {"]
    elif iid == 26:
        # 08-room-card-html.md
        flawed = ["Структура карточки состоит из двух частей:\r\n```html:start", "Структура карточки состоит из двух частей:\n```html:start"]
        fixed = ["## 🛠 Задание\n\n1. Внутри контейнера", "## 🛠 Задание\r\n\r\n1. Внутри контейнера", "room-card"]
    elif iid == 27:
        # 10-card-image-html.md
        flawed = []
        fixed = ["onerror"]
    elif iid == 28:
        # 11-card-image-css.md
        flawed = ['href="pages/catalog.html"']
        fixed = ['href="pages/room-details.html"']
    elif iid == 29:
        # 12-card-content-html.md
        flawed = ['style="text-decoration: none; color: inherit;"']
        fixed = ['class="card-title-link"']
    elif iid == 30:
        # 15-card-footer-html.md
        flawed = ['<div class="card-btns">\r\n        <button class="btn btn-primary">Забронировать</button>', '<div class="card-btns">\n        <button class="btn btn-primary">Забронировать</button>']
        fixed = ['<div class="card-btns"></div>']
    elif iid == 31:
        # 16-card-footer-css.md
        flawed = ['<button class="btn btn-primary">Забронировать</button>', '<button class="btn btn-icon">']
        fixed = ['<div class="card-btns"></div>']
    elif iid == 32:
        # 18-card-btns-layout.md
        flawed = ['```html:start\r\n<article class="room-card">\r\n  <div class="card-image">\r\n    <img src="img/rooms/room-1.jpg" alt="Офис «Панорама»">\r\n  </div>\r\n  <div class="card-content">\r\n    <h3 class="card-title">\r\n      <a href="pages/room-details.html" class="card-title-link">Офис «Панорама»</a>\r\n    </h3>\r\n    <div class="card-footer">\r\n      <span class="card-price"><strong>1 500 ₽</strong> / час</span>\r\n      <div class="card-btns">\r\n        <button class="btn btn-primary">Забронировать</button>\r\n        <button class="btn btn-icon" aria-label="В избранное">\r\n          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r\n            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>\r\n          </svg>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</article>```']
        fixed = ['<div class="card-btns"></div>']
    elif iid == 33:
        # 19-duplicate-cards.md
        flawed = ['<img src="..." alt="...">']
        fixed = ['Офис у метро', 'Конференц-зал «Восток»']
    elif iid == 34:
        # 20-rooms-grid-css.md
        flawed = ['<div class="center-action">\r\n  <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>\r\n</div>', '<div class="center-action">\n  <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>\n</div>']
        fixed = ['.rooms-grid {']

    # ------------------ M2 (35..58) ------------------
    elif iid == 35:
        # 04-js-dom/00-theory-01-js-basics.md (issue 1)
        flawed = []
        fixed = ["## Условные конструкции: if / else"]
    elif iid == 36:
        # 04-js-dom/00-theory-01-js-basics.md (issue 2)
        flawed = ["console.log('Пользователь:', user.name);\r\nconsole.log('В сети:', user.isOnline);", "console.log('Пользователь:', user.name);\nconsole.log('В сети:', user.isOnline);"]
        fixed = ["console.log('В сети:', user.isOnline);"]
    elif iid == 37:
        # 00-theory-03-dom.md
        flawed = []
        fixed = ["querySelector", "Метод `querySelector`"]
    elif iid == 38:
        # 00-theory-04-selector.md
        flawed = []
        fixed = ["querySelectorAll", "for (const", "Array.from"]
    elif iid == 39:
        # 00-theory-05-create.md (issue 1)
        flawed = ["<!-- beforebegin -->\r\n<p>\r\n  <!-- afterbegin -->\r\n  Текст параграфа\r\n  <!-- afterend -->\r\n</p>\r\n<!-- beforeend -->", "<!-- beforebegin -->\n<p>\n  <!-- afterbegin -->\n  Текст параграфа\n  <!-- afterend -->\n</p>\n<!-- beforeend -->"]
        fixed = ["<!-- beforebegin -->\n<p>\n  <!-- afterbegin -->\n  Текст параграфа\n  <!-- beforeend -->\n</p>\n<!-- afterend -->", "<!-- beforebegin -->\r\n<p>\r\n  <!-- afterbegin -->\r\n  Текст параграфа\r\n  <!-- beforeend -->\r\n</p>\r\n<!-- afterend -->"]
    elif iid == 40:
        # 00-theory-05-create.md (issue 2)
        flawed = []
        fixed = ["// Слушатель событий клика", "addEventListener"]
    elif iid == 41:
        # 00-theory-06-events.md
        flawed = ["// HTML: <button id=\"mainBtn\">Забронировать</button>"]
        fixed = ["// HTML: <button id=\"mainBtn\">Нажми меня</button>"]
    elif iid == 42:
        # 00-theory-07-timeout.md
        flawed = ['<div id="alert" class="alert hidden">']
        fixed = ['<div id="alertBox" class="alert hidden">']
    elif iid == 43:
        # 04-toast-get-container.md
        flawed = []
        fixed = ["getElementById('toastContainer')", "getElementById"]
    elif iid == 44:
        # 07-toast-append.md
        flawed = []
        fixed = ["toast-success", "toast-error", "toast-info"]
    elif iid == 45:
        # 14-nav-links-loop.md
        flawed = ["for (let i = 0; i < links.length; i++)"]
        fixed = ["for (let i = 0; i < navLinks.length; i++)", "for (const link of navLinks)"]
    elif iid == 46:
        # 15-nav-highlight-index.md
        flawed = []
        fixed = ["location.pathname", "currentPath"]
    elif iid == 47:
        # 16-nav-highlight-catalog.md
        flawed = []
        fixed = ["catalog.html", "includes('catalog.html')"]
    elif iid == 48:
        # 17-nav-highlight-others.md
        flawed = []
        fixed = ["classList.add('active')", "link.getAttribute('href')"]
    elif iid == 49:
        # 21-auth-logout-event.md
        flawed = []
        fixed = ["authNavBtn.onclick", "authNavBtn.addEventListener"]
    elif iid == 50:
        # 23-auth-logged-out.md
        flawed = []
        fixed = ["if (myBookingsNavItem)", "myBookingsNavItem.style.display = 'none'"]
    elif iid == 51:
        # 00-theory-06-fetch.md
        flawed = []
        fixed = ["js/data.js", "симулируем работу сервера", "OFFICE_ROOMS"]
    elif iid == 52:
        # 00-theory-07-tabs.md
        flawed = []
        fixed = ["факультатив", "Tabs", "компонент"]
    elif iid == 53:
        # 06-create-catalog-page.md
        flawed = ['<script>\r\n    const OFFICE_ROOMS = [', '<script>\n    const OFFICE_ROOMS = [']
        fixed = ['<script src="../js/data.js" defer></script>']
    elif iid == 54:
        # 07-catalog-container.md
        flawed = ['```html:start\r\n<!DOCTYPE html>\r\n<html lang="ru">\r\n<head>', '<div class="rooms-grid" id="catalogContainer"></div>']
        fixed = ['id="catalogContainer"']
    elif iid == 55:
        # 11-render-join.md
        flawed = []
        fixed = [".join('')"]
    elif iid == 56:
        # 13-update-index-links.md
        flawed = ['<title>Каталог офисов — СмартОфис</title>']
        fixed = ['<title>СмартОфис — Коворкинг</title>']
    elif iid == 57:
        # 14-create-details-page.md
        flawed = ['<script>\r\n    const OFFICE_ROOMS = [', '<script>\n    const OFFICE_ROOMS = [']
        fixed = ['<script src="../js/data.js" defer></script>']
    elif iid == 58:
        # 21-data-mock-bookings.md
        flawed = ['document.addEventListener(\'DOMContentLoaded\', () => {']
        fixed = ['const MOCK_BOOKINGS = [', 'OFFICE_ROOMS']

    # ------------------ M3 (59..81) ------------------
    elif iid == 59:
        # 00-theory-02-submit.md
        flawed = []
        fixed = ["FormData", "e.preventDefault()"]
    elif iid == 60:
        # 00-theory-05-storage.md
        flawed = []
        fixed = ["localStorage", "currentUser", "авторизац"]
    elif iid == 61:
        # 00-theory-06-modal.md
        flawed = []
        fixed = ["dialog", "showModal", "альтернатив"]
    elif iid == 62:
        # 01-create-login-page.md
        flawed = ['<input type="text" id="loginUsername"', '<input type="password" id="loginPassword"']
        fixed = ['<div class="form-card">', '<form id="loginForm">']
    elif iid == 63:
        # 02-login-html-form.md
        flawed = ['```html:start\r\n<!DOCTYPE html>\r\n<html lang="ru">\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <title>Вход — СмартОфис</title>\r\n  <link rel="stylesheet" href="../css/style.css">\r\n</head>\r\n<body>\r\n  <main class="container">\r\n    <div class="form-card">\r\n      <h1 class="form-title">Вход в систему</h1>\r\n      <form id="loginForm">\r\n        <div class="form-group">\r\n          <label for="loginUsername">Логин</label>\r\n          <input type="text" id="loginUsername" required>\r\n        </div>']
        fixed = ['<input type="text" id="loginUsername"', '<input type="password" id="loginPassword"']
    elif iid == 64:
        # 03-create-register-page.md
        flawed = ['<input type="text" id="regUsername"', '<input type="password" id="regPassword"']
        fixed = ['<div class="form-card">', '<form id="registerForm">']
    elif iid == 65:
        # 04-register-html-form.md
        flawed = ['```html:start\r\n<!DOCTYPE html>\r\n<html lang="ru">\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <title>Регистрация — СмартОфис</title>\r\n  <link rel="stylesheet" href="../css/style.css">\r\n</head>\r\n<body>\r\n  <main class="container">\r\n    <div class="form-card">\r\n      <h1 class="form-title">Регистрация</h1>\r\n      <form id="registerForm">\r\n        <div class="form-group">\r\n          <label for="regUsername">Логин</label>\r\n          <input type="text" id="regUsername" required>\r\n        </div>']
        fixed = ['<input type="text" id="regUsername"', '<input type="password" id="regPassword"']
    elif iid == 66:
        # 20-login-error-ui.md
        flawed = ["showToast('Неверный логин или пароль', 'success');"]
        fixed = ["showToast('Неверный логин или пароль', 'error');"]
    elif iid == 67:
        # 21-call-form-functions.md
        flawed = ["Вызовите обе функции: initLoginForm() и initRegisterForm()"]
        fixed = ["initLoginForm", "initRegisterForm"]
    elif iid == 68:
        # 00-theory-01-position.md
        flawed = []
        fixed = ["position: relative", "position: absolute"]
    elif iid == 69:
        # 00-theory-02-state.md
        flawed = []
        fixed = ["currentIndex", "renderSlider()"]
    elif iid == 70:
        # 00-theory-03-classlist.md
        flawed = ["Светлая тема", "Тёмная тема"]
        fixed = ["classList.toggle", "theme"]
    elif iid == 71:
        # 00-theory-04-interval.md
        flawed = []
        fixed = ["setInterval", "clearInterval"]
    elif iid == 72:
        # 01-create-slider-html.md
        flawed = ['```html:start\r\n<!DOCTYPE html>\r\n<html lang="ru">\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <title>Главная — СмартОфис</title>\r\n  <link rel="stylesheet" href="css/style.css">\r\n</head>\r\n<body>\r\n  <main class="container">\r\n    <section class="slider-section">\r\n      <div class="slider">']
        fixed = ['<section class="slider-section">', 'slider-prev', 'slider-next']
    elif iid == 73:
        # 02-slider-css-container.md
        flawed = [".slide-img {\n  width: 100%;", ".slide-img {\r\n  width: 100%;"]
        fixed = [".slider-section {", ".slider {"]
    elif iid == 74:
        # 03-slider-css-slides.md
        flawed = []
        fixed = [".slide {", ".slide-img {"]
    elif iid == 75:
        # 04-slider-css-active.md
        flawed = []
        fixed = [".slide.active {", "opacity: 1;"]
    elif iid == 76:
        # 05-slider-css-buttons.md
        flawed = ['<button class="slider-btn slider-prev">‹</button>', '<button class="slider-btn slider-next">›</button>']
        fixed = ['type="button"', 'aria-label="Предыдущий слайд"', 'aria-label="Следующий слайд"']
    elif iid == 77:
        # 06-slider-css-dots.md
        flawed = ['<span class="dot"></span>']
        fixed = ['role="button"', 'tabindex="0"', '<button class="dot"']
    elif iid == 78:
        # 07-init-slider-skeleton.md
        flawed = ["document.addEventListener('DOMContentLoaded', () => {\r\n    initSlider();", "document.addEventListener('DOMContentLoaded', () => {\n    initSlider();"]
        fixed = ["function initSlider() {"]
    elif iid == 79:
        # 15-start-auto-func.md
        flawed = ["function stopAuto() {\r\n    if (timerId) clearInterval(timerId);\r\n  }", "function stopAuto() {\n    if (timerId) clearInterval(timerId);\n  }"]
        fixed = ["function startAuto() {", "timerId = setInterval"]
    elif iid == 80:
        # 16-stop-auto-func.md
        flawed = ["```js:start\r\n  function stopAuto() {\r\n    if (timerId) clearInterval(timerId);\r\n  }", "```js:start\n  function stopAuto() {\n    if (timerId) clearInterval(timerId);\n  }"]
        fixed = ["if (timerId) clearInterval(timerId);"]
    elif iid == 81:
        # 20-call-init-slider.md
        flawed = ["```js:start\r\n// Внутри DOMContentLoaded:\r\ninitSlider();", "```js:start\n// Внутри DOMContentLoaded:\ninitSlider();"]
        fixed = ["initSlider();"]

    # ------------------ M4 (82..113) ------------------
    elif iid == 82:
        # 00-theory-04-input-event.md
        flawed = []
        fixed = ["debounce", "input", "задержк"]
    elif iid == 83:
        # 00-theory-05-select.md
        flawed = []
        fixed = ["<select", "change", "value"]
    elif iid == 84:
        # 00-theory-06-dates.md
        flawed = []
        fixed = ["Date", "getTime", "калькулятор"]
    elif iid == 85:
        # 01-catalog-toolbar-html.md
        flawed = ['<input type="text" id="searchInput" placeholder="Поиск комнат...">']
        fixed = ['aria-label="Поиск комнат"', '<label for="searchInput"']
    elif iid == 86:
        # 03-init-filters-skeleton.md
        flawed = []
        fixed = ["function initFilters() {", "searchInput", "filterSelect"]
    elif iid == 87:
        # 05-displayed-rooms-state.md
        flawed = ["filterSelect.addEventListener('change', () => {"]
        fixed = ["let displayedRooms = [...OFFICE_ROOMS];"]
    elif iid == 88:
        # 09-search-event.md
        flawed = ["```js:start\r\n  searchInput.addEventListener('input', () => {", "```js:start\n  searchInput.addEventListener('input', () => {"]
        fixed = ["searchInput.addEventListener('input'"]
    elif iid == 89:
        # 11-call-init-filters.md
        flawed = ["renderCatalog();\r\n  initFilters();", "renderCatalog();\n  initFilters();"]
        fixed = ["initFilters();"]
    elif iid == 90:
        # 13-booking-form-html.md
        flawed = ['```html:start\r\n<!DOCTYPE html>\r\n<html lang="ru">\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <title>Бронирование — СмартОфис</title>\r\n  <link rel="stylesheet" href="../css/style.css">\r\n</head>\r\n<body>\r\n  <main class="container">\r\n    <div class="form-card">\r\n      <h1 class="form-title">Бронирование офиса</h1>\r\n      <form id="bookingForm">\r\n        <div class="form-group">\r\n          <label for="roomSelect">Выберите офис</label>']
        fixed = ['<form id="bookingForm">', 'roomSelect', 'calcTotal']
    elif iid == 91:
        # 14-create-mybookings-page.md
        flawed = ["Ничего вписывать не нужно"]
        fixed = ["my-bookings.html", "container"]
    elif iid == 92:
        # 16-init-booking-skeleton.md
        flawed = ["```js:start\r\nfunction initBookingCalc() {\r\n  const currentUser = localStorage.getItem('currentUser');", "```js:start\nfunction initBookingCalc() {\n  const currentUser = localStorage.getItem('currentUser');"]
        fixed = ["function initBookingCalc() {"]
    elif iid == 93:
        # 17-booking-auth-guard.md
        flawed = ["populateRoomSelect();", "roomSelect.value = roomId;"]
        fixed = ["if (!currentUser) {", "window.location.href = 'login.html';"]
    elif iid == 94:
        # 18-populate-select.md
        flawed = ["updateBookingTotal();"]
        fixed = ["populateRoomSelect", "OFFICE_ROOMS.forEach"]
    elif iid == 95:
        # 19-auto-select-room.md
        flawed = ["bookingForm.addEventListener('submit'"]
        fixed = ["URLSearchParams", "urlParams.get('room')"]
    elif iid == 96:
        # 20-update-price-func.md
        flawed = ["localStorage.setItem('myBookings'"]
        fixed = ["updateBookingTotal", "daysCount * room.price"]
    elif iid == 97:
        # 25-booking-redirect.md
        flawed = ["И самое главное: не забудьте вызвать initBookingCalc() в самом верху файла"]
        fixed = ["initBookingCalc", "window.location.href = 'my-bookings.html'"]
    elif iid == 98:
        # 00-theory-03-modules.md
        flawed = ['<script src="js/main.js"></script>\r\n<!-- Внутри main.js: import { rooms } from \'./data.js\' -->', '<script src="js/main.js"></script>\n<!-- Внутри main.js: import { rooms } from \'./data.js\' -->']
        fixed = ['<script type="module" src="js/main.js"></script>']
    elif iid == 99:
        # 01-bookings-list-css.md
        flawed = [".booking-card {\n  display: flex;", ".booking-card {\r\n  display: flex;"]
        fixed = [".bookings-list {"]
    elif iid == 100:
        # 02-booking-item-css.md
        flawed = []
        fixed = [".booking-card {", ".booking-info {"]
    elif iid == 101:
        # 03-empty-message-css.md
        flawed = []
        fixed = [".bookings-empty {"]
    elif iid == 102:
        # 04-init-mybookings-skeleton.md
        flawed = ["```js:start\r\nfunction initMyBookings() {\r\n  const currentUser = localStorage.getItem('currentUser');", "```js:start\nfunction initMyBookings() {\n  const currentUser = localStorage.getItem('currentUser');"]
        fixed = ["function initMyBookings() {"]
    elif iid == 103:
        # 05-mybookings-auth-guard.md
        flawed = ["mockBookings.forEach", "renderBookings"]
        fixed = ["if (!currentUser) {", "window.location.href = 'login.html';"]
    elif iid == 104:
        # 06-check-empty-array.md
        flawed = ["card.innerHTML = `<div class=\"booking-card\">"]
        fixed = ["bookings.length === 0", "bookingsList.innerHTML = '<p class=\"bookings-empty\">'"]
    elif iid == 105:
        # 07-render-mock-bookings.md
        flawed = ["<article class=\"booking-card\">"]
        fixed = ["bookings.map(", "bookings.forEach("]
    elif iid == 106:
        # 08-booking-card-html.md
        flawed = ["```js:start\r\n  // Готовая карточка:\r\n  bookingsList.innerHTML = bookings.map(b => `<article class=\"booking-card\">", "```js:start\n  // Готовая карточка:\n  bookingsList.innerHTML = bookings.map(b => `<article class=\"booking-card\">"]
        fixed = ["<article class=\"booking-card\">", "booking-delete-btn", "Отменить бронь"]
    elif iid == 107:
        # 09-call-init-mybookings.md
        flawed = ["```js:start\r\n// В конце файла:\r\ninitMyBookings();", "```js:start\n// В конце файла:\ninitMyBookings();"]
        fixed = ["initMyBookings();"]
    elif iid == 108:
        # 10-final-congratulations.md
        fm_exp = {"type": "theory"}
        flawed = ['style="display: block;"', 'id="myBookingsNavItem" style="display: block;"']
        fixed = ['style="display: none;"', 'id="myBookingsNavItem" style="display: none;"', 'initAuthNav']
    elif iid == 109:
        # 10-troubleshooting/01-security-error-localstorage.md
        fm_exp = {"type": "practice"}
        flawed = []
        fixed = ["safeReadUser('currentUser')", "document.getElementById('output')"]
    elif iid == 110:
        # 10-troubleshooting/02-type-error-null-dom.md
        fm_exp = {"type": "practice"}
        flawed = []
        fixed = ["bindSearchEvent();"]
    elif iid == 111:
        # 10-troubleshooting/03-syntax-error-tokens.md
        fm_exp = {"type": "practice"}
        flawed = []
        fixed = ["document.getElementById('output').textContent = `Объект ${roomData.title}"]
    elif iid == 112:
        # 10-troubleshooting/04-network-404-paths.md
        fm_exp = {"type": "practice"}
        flawed = []
        fixed = ['<meta charset="UTF-8">', '<title>Каталог — Проверка путей</title>', '<link rel="stylesheet" href="../css/style.css">']
    elif iid == 113:
        # 10-troubleshooting/05-devtools-mastery.md
        fm_exp = {"type": "practice"}
        flawed = []
        fixed = ["debugFilterRooms(testRooms, 900);", "Фильтрация завершена"]

    rules.append({
        "id": iid,
        "milestone": m_stone,
        "lesson": lesson,
        "file_path": fpath,
        "defect_type": clean_type,
        "priority": clean_prio,
        "title": title,
        "flawed_patterns": flawed,
        "fixed_patterns": fixed,
        "frontmatter_expected": fm_exp
    })

# Save to scripts/audit_fix_rules.json
os.makedirs("scripts", exist_ok=True)
out_path = "scripts/audit_fix_rules.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(rules, f, ensure_ascii=False, indent=2)

print(f"Generated {len(rules)} rules in {out_path}.")
