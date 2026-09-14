// rebuild-webinars-5-9.mjs
// Полный ребилдинг уроков вебинаров 5-9:
// - Корректные html:start / css:start / js:start для каждого шага
// - Каждый шаг показывает правильную рабочую страницу (catalog.html, booking.html и т.д.)
// - Накопительные CSS и JS — каждый шаг видит всё что написано до него
// - Новые шаги-введения при переходе к новой странице
// Run: node scripts/rebuild-webinars-5-9.mjs

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LESSONS_DIR = join(__dirname, '..', 'content', 'lessons');

// ─── ФИНАЛЬНЫЙ ПРОЕКТ: CSS по слоям (вебинары 2-9) ──────────────────────────

// CSS из вебинара 2 (базовые стили + header + nav + hero + footer)
const CSS_W2 = `* {
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

/* Шапка сайта */
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
  line-height: 1.5;
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
  letter-spacing: -0.02em;
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

/* Подвал сайта */
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
}`;

// CSS из вебинара 3 (кнопки + карточки)
const CSS_W3 = `
/* Кнопки */
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

/* Кнопка-иконка (например, «Подробнее») */
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
  color: #0056b3;
  border-color: #0056b3;
}

/* Сетка карточек комнат */
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
  object-position: center;
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
  font-size: 13px;
  color: #555555;
  margin-bottom: 4px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
  gap: 10px;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
  color: #222222;
}

.card-price span {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}

.card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.center-action {
  text-align: center;
  margin-top: 20px;
}`;

// CSS из вебинара 4 (активная ссылка навигации + toasts)
const CSS_W4 = `
.nav-link.active {
  color: #007bff;
  background-color: #eaf2ff;
}

/* Всплывающие уведомления (Toast) справа внизу */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast {
  min-width: 280px;
  max-width: 380px;
  padding: 14px 18px;
  background-color: #222222;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  animation: toastFadeIn 0.3s ease;
  pointer-events: auto;
}

.toast.toast-success {
  border-left: 4px solid #28a745;
}

.toast.toast-danger {
  border-left: 4px solid #dc3545;
}

.toast.toast-info {
  border-left: 4px solid #007bff;
}

@keyframes toastFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

// CSS из вебинара 5 (страница деталей комнаты)
const CSS_W5 = `
/* Страница описания комнаты (room-details.html) */
.room-details-card {
  display: flex;
  gap: 40px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 30px;
  margin-top: 20px;
}

.room-details-gallery {
  flex: 1;
  max-width: 550px;
  height: 380px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f0f4f8;
}

.room-details-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.room-details-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.room-details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
}

.room-details-title {
  font-size: 26px;
  font-weight: 800;
  color: #222222;
}

.room-details-price {
  font-size: 24px;
  font-weight: 800;
  color: #007bff;
}

.room-details-price span {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.room-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.room-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 13px;
  color: #555555;
  font-weight: 500;
}

.room-badge.badge-popular {
  background-color: #eaf2ff;
  border-color: #007bff;
  color: #007bff;
  font-weight: 600;
}

.room-description {
  font-size: 15px;
  line-height: 1.6;
  color: #555555;
  margin-bottom: 25px;
}

.room-specs {
  margin-bottom: 30px;
}

.room-specs h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.room-details-actions {
  display: flex;
  gap: 15px;
  margin-top: auto;
}`;

// CSS из вебинара 6 (формы)
const CSS_W6 = `
/* Формы регистрации и входа */
.form-card {
  max-width: 480px;
  margin: 30px auto 0 auto;
  padding: 25px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  background-color: #ffffff;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

/* Красная подсветка поля при ошибке валидации */
.form-control.is-invalid {
  border-color: #dc3545;
  background-color: #fff8f8;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: none;
}

.form-control.is-invalid + .error-text {
  display: block;
}

.form-alert {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  display: none;
}

.form-alert.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  display: block;
}`;

// CSS из вебинара 7 (слайдер)
const CSS_W7 = `
/* Слайдер на главной */
.slider-section {
  margin-bottom: 40px;
}

.slider {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid #dddddd;
  background-color: #f8f9fa;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s;
}

.slide.active {
  opacity: 1;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-btn:hover {
  background-color: #007bff;
}

.slider-prev { left: 15px; }
.slider-next { right: 15px; }

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.dot.active {
  background-color: #007bff;
}`;

// CSS из вебинара 8 (каталог toolbar + бронирование)
const CSS_W8 = `
/* Панель поиска и сортировки в каталоге */
.catalog-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  border-radius: 6px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.sort-actions {
  display: flex;
  gap: 10px;
}

/* Калькулятор стоимости на странице бронирования */
.calc-summary {
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  padding: 15px;
  border-radius: 4px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calc-total {
  font-size: 20px;
  font-weight: 700;
  color: #007bff;
}

.empty-message {
  text-align: center;
  padding: 30px;
  color: #666666;
  border: 1px dashed #dddddd;
  border-radius: 6px;
  max-width: 600px;
  margin: 30px auto 0 auto;
}`;

// CSS из вебинара 9 (мои бронирования)
const CSS_W9 = `
/* Мои бронирования */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  margin: 30px auto 0 auto;
}

.booking-item {
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 15px 20px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`;

// ─── НАКОПИТЕЛЬНЫЕ CSS-СНИМКИ ─────────────────────────────────────────────────
const CSS = {
  w2: CSS_W2,
  w3: CSS_W2 + CSS_W3,
  w4: CSS_W2 + CSS_W3 + CSS_W4,
  w5: CSS_W2 + CSS_W3 + CSS_W4 + CSS_W5,
  w6: CSS_W2 + CSS_W3 + CSS_W4 + CSS_W5 + CSS_W6,
  w7: CSS_W2 + CSS_W3 + CSS_W4 + CSS_W5 + CSS_W6 + CSS_W7,
  w8: CSS_W2 + CSS_W3 + CSS_W4 + CSS_W5 + CSS_W6 + CSS_W7 + CSS_W8,
  w9: CSS_W2 + CSS_W3 + CSS_W4 + CSS_W5 + CSS_W6 + CSS_W7 + CSS_W8 + CSS_W9,
};

// ─── DATA.JS (накопленный) ────────────────────────────────────────────────────
const DATA_JS_EMPTY = `// СмартОфис — База данных офисных комнат
const OFFICE_ROOMS = [];`;

const DATA_JS_PARTIAL = `// СмартОфис — База данных офисных комнат
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    capacity: '1-2 человека',
    area: '12 м²',
    description: 'Идеальное тихое пространство для индивидуальной работы, важных звонков и глубокой концентрации.',
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло', 'Климат-контроль'],
    image: '../img/room-1.jpg',
    isPopular: true
  }
];`;

const DATA_JS_FULL = `// СмартОфис — База данных офисных комнат и бронирований
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    capacity: '1-2 человека',
    area: '12 м²',
    description: 'Идеальное тихое пространство для индивидуальной работы, важных звонков и глубокой концентрации. Оснащено эргономичной мебелью и монитором высокой четкости.',
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло', 'Климат-контроль'],
    image: '../img/room-1.jpg',
    isPopular: true
  },
  {
    id: 'alpha-2',
    title: 'Конференц-зал Alpha',
    pricePerHour: 1200,
    capacity: 'до 15 человек',
    area: '45 м²',
    description: 'Просторный зал для проведения презентаций, совещаний с партнерами и командных брейнштормов с современным мультимедиа-оборудованием.',
    equipment: ['Проектор 4K', 'Спикерфон', 'Флипчарт', 'Аудиосистема'],
    image: '../img/room-2.jpg',
    isPopular: true
  },
  {
    id: 'hub-3',
    title: 'Опенспейс Hub',
    pricePerHour: 250,
    capacity: '1 человек',
    area: 'Рабочее место',
    description: 'Удобное выделенное рабочее место в современном открытом пространстве с доступом к зоне отдыха и кофе-поинту.',
    equipment: ['Личный стол', 'Wi-Fi 500 Мбит/с', 'Розетки 220V и USB', 'Кофе-поинт'],
    image: '../img/room-3.jpg',
    isPopular: true
  },
  {
    id: 'solo-4',
    title: 'Переговорная Solo',
    pricePerHour: 600,
    capacity: 'до 4 человек',
    area: '16 м²',
    description: 'Компактная переговорная комната для встреч тет-а-тет или работы мини-команды. Оснащена Smart TV и удобной маркерной доской.',
    equipment: ['Звукоизоляция', 'Smart TV 55"', 'Маркерная доска', 'Кулер с водой'],
    image: '../img/room-4.jpg',
    isPopular: false
  },
  {
    id: 'exec-5',
    title: 'Премиум Сьют Executive',
    pricePerHour: 1800,
    capacity: 'до 6 человек',
    area: '35 м²',
    description: 'Представительский офис повышенной комфортности с отдельной лаунж-зоной, кофемашиной и панорамным видом на город.',
    equipment: ['Лаунж-зона', 'Кофемашина Nespresso', 'Панорамный вид', 'Сейф'],
    image: '../img/room-5.jpg',
    isPopular: false
  },
  {
    id: 'studio-6',
    title: 'Творческая студия Design',
    pricePerHour: 850,
    capacity: 'до 8 человек',
    area: '28 м²',
    description: 'Креативная мастерская для дизайнеров, архитекторов и разработчиков со студийным светом и большой магнитно-маркерной стеной.',
    equipment: ['Студийный свет', 'Цветной принтер A3', 'Маркерная стена', 'Высокие столы'],
    image: '../img/room-6.jpg',
    isPopular: false
  }
];

const MOCK_BOOKINGS = [
  {
    id: '74829',
    roomTitle: 'Мини-офис Focus',
    date: '2026-09-01',
    hours: 3,
    totalPrice: 1350
  },
  {
    id: '74830',
    roomTitle: 'Конференц-зал Alpha',
    date: '2026-09-03',
    hours: 2,
    totalPrice: 2400
  }
];`;

// ─── JS ФУНКЦИИ (накопительные) ───────────────────────────────────────────────

const JS_SHOW_NOTIFICATION = `// Функция всплывающих уведомлений (Toast) справа внизу
function showNotification(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}`;

const JS_INIT_NAVIGATION = `
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');

    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'))) {
      link.classList.add('active');
    } else if (href.includes('booking.html') && current.includes('booking.html')) {
      link.classList.add('active');
    } else if (href.includes('my-bookings.html') && current.includes('my-bookings.html')) {
      link.classList.add('active');
    } else if (href.includes('login.html') && current.includes('login.html')) {
      link.classList.add('active');
    } else if (href.includes('register.html') && current.includes('register.html')) {
      link.classList.add('active');
    }
  });

  updateAuthNav();
}

function updateAuthNav() {
  const currentUser = localStorage.getItem('currentUser');
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');

  if (currentUser) {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'block';
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showNotification('Вы вышли из системы', 'info');
        const isPages = window.location.pathname.includes('/pages/');
        setTimeout(() => {
          window.location.href = isPages ? '../index.html' : 'index.html';
        }, 1000);
      };
    }
  } else {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';
    if (authNavBtn) {
      authNavBtn.textContent = 'Войти';
      const isPages = window.location.pathname.includes('/pages/');
      authNavBtn.href = isPages ? 'login.html' : 'pages/login.html';
      authNavBtn.onclick = null;
    }
  }
}`;

const JS_INIT_SLIDER = `
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

  let currentSlide = 0;
  let timerId = null;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  function startAuto() {
    stopAuto();
    timerId = setInterval(next, 3000);
  }

  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  startAuto();
}`;

const JS_INIT_CATALOG_FILTERS = `

function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  let displayedRooms = [...OFFICE_ROOMS];

  function render(rooms) {
    if (!rooms.length) {
      container.innerHTML = '<p class="empty-message">Комнаты не найдены</p>';
      return;
    }
    container.innerHTML = rooms.map(room => \`
      <div class="room-card">
        <div class="card-img-wrap">
          <a href="room-details.html?id=\${room.id}">
            <img src="\${room.image}" alt="\${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
          </a>
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <a href="room-details.html?id=\${room.id}" style="text-decoration: none; color: inherit;">\${room.title}</a>
          </h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
            <div class="card-btns">
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
              <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }

  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    displayedRooms = OFFICE_ROOMS.filter(r => r.title.toLowerCase().includes(q));
    render(displayedRooms);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => a.pricePerHour - b.pricePerHour);
      render(displayedRooms);
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }

  render(displayedRooms);
}`;

const JS_INIT_ROOM_DETAILS = `
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) {
    container.innerHTML = \`
      <div class="empty-message">
        <h2>Комната не найдена</h2>
        <p style="margin: 10px 0 20px 0;">Возможно, ссылка устарела или комната была удалена.</p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    \`;
    return;
  }

  container.innerHTML = \`
    <div class="room-details-card">
      <div class="room-details-gallery">
        <img src="\${room.image}" alt="\${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="room-details-info">
        <div class="room-details-header">
          <h1 class="room-details-title">\${room.title}</h1>
          <div class="room-details-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>

        <div class="room-badges">
          <span class="room-badge">\${room.capacity}</span>
          <span class="room-badge">\${room.area}</span>
          \${room.isPopular ? '<span class="room-badge badge-popular">Популярное</span>' : ''}
        </div>

        <p class="room-description">\${room.description}</p>

        <div class="room-specs">
          <h3>Оснащение и удобства:</h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
        </div>

        <div class="room-details-actions">
          <a href="booking.html?room=\${room.id}" class="btn btn-primary" style="padding: 10px 20px; font-size: 15px;">Забронировать эту комнату</a>
          <a href="catalog.html" class="btn btn-outline" style="padding: 10px 18px; font-size: 15px;">← Назад в каталог</a>
        </div>
      </div>
    </div>
  \`;
}`;

const JS_INIT_REGISTER_FORM = `
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      showNotification('Пользователь зарегистрирован успешно!', 'success');
      form.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    }
  });
}`;

const JS_INIT_LOGIN_FORM = `
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    if (login === 'admin' && pass === '12345') {
      localStorage.setItem('currentUser', login);
      if (alertBox) alertBox.style.display = 'none';
      showNotification('Успешный вход в систему!', 'success');
      setTimeout(() => {
        window.location.href = 'my-bookings.html';
      }, 1000);
    } else {
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
      showNotification('Неверный логин или пароль', 'danger');
    }
  });
}`;

const JS_INIT_BOOKING_CALC = `
function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  // Если пользователь не вошел в систему — перенаправляем на страницу входа
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const roomSelect = document.getElementById('roomSelect');
  const hoursInput = document.getElementById('hoursInput');
  const pricePerHourSpan = document.getElementById('pricePerHour');
  const totalPriceSpan = document.getElementById('totalPrice');

  roomSelect.innerHTML = OFFICE_ROOMS.map(r => \`
    <option value="\${r.id}" data-price="\${r.pricePerHour}">\${r.title} (\${r.pricePerHour} ₽/час)</option>
  \`).join('');

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;

  function updatePrice() {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption ? Number(selectedOption.dataset.price || 0) : 0;
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = price * hours;

    if (pricePerHourSpan) pricePerHourSpan.textContent = price + ' ₽';
    if (totalPriceSpan) totalPriceSpan.textContent = total + ' ₽';
  }

  roomSelect.addEventListener('change', updatePrice);
  hoursInput.addEventListener('input', updatePrice);
  updatePrice();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const appNumber = Math.floor(10000 + Math.random() * 90000);
    const selectedRoom = OFFICE_ROOMS.find(r => r.id === roomSelect.value);
    const bookingDate = document.getElementById('bookingDate').value || '2026-09-01';
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = (selectedRoom ? selectedRoom.pricePerHour : 450) * hours;

    if (typeof MOCK_BOOKINGS !== 'undefined') {
      MOCK_BOOKINGS.unshift({
        id: String(appNumber),
        roomTitle: selectedRoom ? selectedRoom.title : 'Офис',
        date: bookingDate,
        hours: hours,
        totalPrice: total
      });
    }

    showNotification('Бронирование создано! Номер заявки: №' + appNumber, 'success');
    form.reset();
    setTimeout(() => {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });
}`;

const JS_INIT_MY_BOOKINGS = `
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  // Если пользователь не вошел в систему — перенаправляем на страницу входа
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    container.innerHTML = '<div class="empty-message">У вас пока нет бронирований</div>';
    return;
  }

  container.innerHTML = MOCK_BOOKINGS.map(item => \`
    <div class="booking-item">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 5px;">\${item.roomTitle}</h3>
        <div style="font-size: 13px; color: #666;">
          Дата: <strong>\${item.date}</strong> | Длительность: <strong>\${item.hours} ч.</strong> | Заявка №\${item.id}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 16px; font-weight: 700; color: #007bff;">\${item.totalPrice} ₽</div>
        <span style="font-size: 12px; color: #28a745;">Подтверждено</span>
      </div>
    </div>
  \`).join('');
}`;

// ─── НАКОПИТЕЛЬНЫЕ JS-СНИМКИ ──────────────────────────────────────────────────
// Каждый вебинар накапливает функции предыдущих

function makeJsEntry(funcs, init) {
  return `// СмартОфис — Скрипт веб-приложения
document.addEventListener('DOMContentLoaded', () => {
${init}
});

${funcs}`;
}

// Вебинар 4: showNotification + initNavigation + updateAuthNav
const JS_W4_BASE = makeJsEntry(
  JS_SHOW_NOTIFICATION + JS_INIT_NAVIGATION,
  `  initNavigation();`
);

// Вебинар 5: добавляем initCatalogFilters (рендер без toolbar) + initRoomDetails
const JS_W5_BASE = makeJsEntry(
  JS_SHOW_NOTIFICATION + JS_INIT_NAVIGATION + JS_INIT_CATALOG_FILTERS + JS_INIT_ROOM_DETAILS,
  `  initNavigation();\n  initCatalogFilters();\n  initRoomDetails();`
);

// Вебинар 6: добавляем initRegisterForm + initLoginForm
const JS_W6_BASE = makeJsEntry(
  JS_SHOW_NOTIFICATION + JS_INIT_NAVIGATION + JS_INIT_CATALOG_FILTERS + JS_INIT_ROOM_DETAILS + JS_INIT_REGISTER_FORM + JS_INIT_LOGIN_FORM,
  `  initNavigation();\n  initCatalogFilters();\n  initRoomDetails();\n  initRegisterForm();\n  initLoginForm();`
);

// Вебинар 7: добавляем initSlider
const JS_W7_BASE = makeJsEntry(
  JS_SHOW_NOTIFICATION + JS_INIT_NAVIGATION + JS_INIT_SLIDER + JS_INIT_CATALOG_FILTERS + JS_INIT_ROOM_DETAILS + JS_INIT_REGISTER_FORM + JS_INIT_LOGIN_FORM,
  `  initNavigation();\n  initSlider();\n  initCatalogFilters();\n  initRoomDetails();\n  initRegisterForm();\n  initLoginForm();`
);

// Вебинар 8: добавляем initBookingCalc
const JS_W8_BASE = makeJsEntry(
  JS_SHOW_NOTIFICATION + JS_INIT_NAVIGATION + JS_INIT_SLIDER + JS_INIT_CATALOG_FILTERS + JS_INIT_BOOKING_CALC + JS_INIT_ROOM_DETAILS + JS_INIT_REGISTER_FORM + JS_INIT_LOGIN_FORM,
  `  initNavigation();\n  initSlider();\n  initCatalogFilters();\n  initBookingCalc();\n  initRoomDetails();\n  initRegisterForm();\n  initLoginForm();`
);

// Вебинар 9: добавляем initMyBookings (финальный)
const JS_W9_BASE = makeJsEntry(
  JS_SHOW_NOTIFICATION + JS_INIT_NAVIGATION + JS_INIT_SLIDER + JS_INIT_CATALOG_FILTERS + JS_INIT_BOOKING_CALC + JS_INIT_ROOM_DETAILS + JS_INIT_MY_BOOKINGS + JS_INIT_REGISTER_FORM + JS_INIT_LOGIN_FORM,
  `  initNavigation();\n  initSlider();\n  initCatalogFilters();\n  initBookingCalc();\n  initRoomDetails();\n  initMyBookings();\n  initRegisterForm();\n  initLoginForm();`
);

// ─── HTML ШАБЛОНЫ ─────────────────────────────────────────────────────────────

function makeHtmlHead(title, scriptPrefix = '') {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${scriptPrefix}css/style.css">
  <link rel="icon" type="image/svg+xml" href="${scriptPrefix}img/logo.svg">
  <script src="${scriptPrefix}js/data.js" defer></script>
  <script src="${scriptPrefix}js/main.js" defer></script>`;
}

function makeNav(prefix = '') {
  return `  <header class="header">
    <div class="container header-container">
      <a href="${prefix}index.html" class="logo">
        <img src="${prefix}img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="${prefix}index.html" class="nav-link active">Главная</a></li>
          <li><a href="${prefix}pages/catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="${prefix}pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="${prefix}pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function makeNavPages() {
  return `  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link active">Главная</a></li>
          <li><a href="../pages/catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="../pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="../pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function makeFooter() {
  return `  <footer class="footer">
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
  </footer>`;
}

// HTML финальных страниц для вставки в html:start блоки
const HTML_CATALOG_FINAL = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог офисов — СмартОфис</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="catalog.html" class="nav-link active">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Каталог офисных пространств</h1>
      <p class="page-subtitle">Выберите подходящее помещение для индивидуальной работы или командных встреч</p>

      <div class="rooms-grid" id="catalogContainer"></div>
    </div>
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

const HTML_CATALOG_WITH_TOOLBAR = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог офисов — СмартОфис</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="catalog.html" class="nav-link active">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Каталог офисных пространств</h1>
      <p class="page-subtitle">Выберите подходящее помещение для индивидуальной работы или командных встреч</p>

      <div class="catalog-toolbar">
        <input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию офиса...">
        <div class="sort-actions">
          <button id="sortAsc" class="btn btn-outline">Цена: по возрастанию ↑</button>
          <button id="sortDesc" class="btn btn-outline">Цена: по убыванию ↓</button>
        </div>
      </div>

      <div class="rooms-grid" id="catalogContainer"></div>
    </div>
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

const HTML_ROOM_DETAILS = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Описание комнаты — СмартОфис</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="catalog.html" class="nav-link active">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container" id="roomDetailsContainer">
      <!-- Контент формируется динамически через initRoomDetails() на основе ?id=... -->
    </div>
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

const HTML_LOGIN = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Вход — СмартОфис</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="login.html" class="nav-link nav-btn active" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Авторизация</h1>
      <p class="page-subtitle">Войдите в личный кабинет (тестовые данные: admin / 12345)</p>

      <div class="form-card">
        <div id="loginAlert" class="form-alert"></div>
        <form id="loginForm" novalidate>
          <div class="form-group">
            <label class="form-label" for="login">Логин</label>
            <input type="text" id="login" class="form-control" placeholder="admin" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input type="password" id="password" class="form-control" placeholder="12345" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Войти</button>
        </form>
      </div>
    </div>
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

const HTML_REGISTER = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Регистрация — СмартОфис</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Регистрация в СмартОфис</h1>
      <p class="page-subtitle">Создайте аккаунт для быстрого бронирования рабочих мест</p>

      <div class="form-card">
        <form id="registerForm" novalidate>
          <div class="form-group">
            <label class="form-label" for="login">Логин</label>
            <input type="text" id="login" class="form-control" placeholder="Введите логин" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input type="password" id="password" class="form-control" placeholder="Минимум 6 символов" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="confirmPassword">Подтверждение пароля</label>
            <input type="password" id="confirmPassword" class="form-control" placeholder="Повторите пароль" required>
            <div class="error-text">Пароли не совпадают</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="fullName">ФИО</label>
            <input type="text" id="fullName" class="form-control" placeholder="Иванов Иван Иванович" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" class="form-control" placeholder="example@mail.ru" required>
            <div class="error-text">Введите корректный email</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="phone">Телефон</label>
            <input type="tel" id="phone" class="form-control" placeholder="+7 (999) 000-00-00" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Зарегистрироваться</button>
        </form>
      </div>
    </div>
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

const HTML_BOOKING = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Бронирование — СмартОфис</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Оформление бронирования</h1>
      <p class="page-subtitle">Заполните параметры аренды для мгновенного бронирования</p>

      <div class="form-card">
        <form id="bookingForm">
          <div class="form-group">
            <label class="form-label" for="roomSelect">Выберите комнату</label>
            <select id="roomSelect" class="form-control" required></select>
          </div>

          <div class="form-group">
            <label class="form-label" for="bookingDate">Дата бронирования</label>
            <input type="date" id="bookingDate" class="form-control" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="hoursInput">Количество часов</label>
            <input type="number" id="hoursInput" class="form-control" min="1" max="24" value="2" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="commentInput">Комментарий (необязательно)</label>
            <textarea id="commentInput" class="form-control" rows="3" placeholder="Пожелания к рассадке, оборудованию..."></textarea>
          </div>

          <div class="calc-summary">
            <div>
              <div>Тариф: <span id="pricePerHour">0 ₽</span>/час</div>
              <div style="font-size: 12px; color: #666;">Без скрытых комиссий</div>
            </div>
            <div class="calc-total" id="totalPrice">0 ₽</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">Забронировать</button>
        </form>
      </div>
    </div>
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

const HTML_MY_BOOKINGS = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Мои бронирования — СмартОфис</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: block;"><a href="my-bookings.html" class="nav-link active">Мои бронирования</a></li>
          <li><a href="login.html" class="nav-link nav-btn" id="authNavBtn">Выйти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Мои бронирования</h1>
      <p class="page-subtitle">История ваших заявок на аренду рабочих пространств</p>

      <div class="bookings-list" id="myBookingsList"></div>
    </div>
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

// ─── ПАРСЕР И ПАТЧЕР MARKDOWN ─────────────────────────────────────────────────

function parseMd(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return null;
  return { frontmatter: fmMatch[1], body: fmMatch[2] };
}

function extractBlocks(body) {
  const blocks = {};
  const re = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = re.exec(body)) !== null) {
    blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
  }
  return blocks;
}

function getExplanation(body) {
  const firstBlock = body.search(/^```\w+:(start|solution)/m);
  return (firstBlock === -1 ? body : body.slice(0, firstBlock)).trim();
}

function rebuildMd(frontmatter, explanation, blocks) {
  let out = `---\n${frontmatter}\n---\n\n${explanation}\n\n`;
  const order = ['html:start', 'css:start', 'js:start', 'html:solution', 'css:solution', 'js:solution'];
  for (const key of order) {
    if (blocks[key] !== undefined) {
      const [lang, variant] = key.split(':');
      out += `\`\`\`${lang}:${variant}\n${blocks[key]}\n\`\`\`\n\n`;
    }
  }
  return out.trimEnd() + '\n';
}

function patchFile(filePath, patches) {
  if (!existsSync(filePath)) {
    console.warn(`  [SKIP] File not found: ${filePath}`);
    return;
  }
  const content = readFileSync(filePath, 'utf-8');
  const parsed = parseMd(content);
  if (!parsed) {
    console.warn(`  [SKIP] No frontmatter: ${filePath}`);
    return;
  }
  const { frontmatter, body } = parsed;
  const explanation = getExplanation(body);
  const blocks = extractBlocks(body);

  // Apply patches
  for (const [key, value] of Object.entries(patches)) {
    blocks[key] = value;
  }

  const newContent = rebuildMd(frontmatter, explanation, blocks);
  writeFileSync(filePath, newContent, 'utf-8');
  console.log(`  ✓ ${filePath.split('\\').slice(-2).join('/')}`);
}

function lessonFile(webinar, filename) {
  return join(LESSONS_DIR, webinar, filename);
}

// ─── ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: добавить новый шаг-введение ────────────────────
function createIntroStep(filePath, title, highlight, explanation, htmlStart, cssStart, jsStart, htmlSolution, cssSolution, jsSolution) {
  const blocks = [];
  if (htmlStart !== undefined) blocks.push(`\`\`\`html:start\n${htmlStart}\n\`\`\``);
  if (cssStart !== undefined) blocks.push(`\`\`\`css:start\n${cssStart}\n\`\`\``);
  if (jsStart !== undefined) blocks.push(`\`\`\`js:start\n${jsStart}\n\`\`\``);
  if (htmlSolution !== undefined) blocks.push(`\`\`\`html:solution\n${htmlSolution}\n\`\`\``);
  if (cssSolution !== undefined) blocks.push(`\`\`\`css:solution\n${cssSolution}\n\`\`\``);
  if (jsSolution !== undefined) blocks.push(`\`\`\`js:solution\n${jsSolution}\n\`\`\``);

  const content = `---\ntitle: "${title}"\nhighlight: ${highlight}\n---\n\n${explanation}\n\n${blocks.join('\n\n')}\n`;
  writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✨ Created: ${filePath.split('\\').slice(-2).join('/')}`);
}

// ─── ВЕБИНАР 5: Динамический каталог ─────────────────────────────────────────
console.log('\n=== Webinar 05: Динамический каталог ===');

const W5 = '05-catalog';
const CSS_START_W5 = CSS.w4; // CSS который уже есть к началу вебинара 5
const JS_START_W5 = JS_W4_BASE; // JS который уже есть к началу вебинара 5

// Шаги 1-4: работа с data.js (js вкладка, html=index.html)
// Шаги 5-6: подключение data.js в index.html (html вкладка)
// Шаги 7-13: создание catalog.html + рендер функция
// Шаги 14-21: создание room-details.html

// Шаги 1-4: data.js работа — js:start нарастает, html:start = index.html
const INDEX_HTML_W5 = readFileSync(
  join(LESSONS_DIR, '04-js-dom', '23-auth-logged-out.md'), 'utf-8'
).match(/```html:solution\n([\s\S]*?)^```/m)?.[1]?.trimEnd() || '';

// Читаем финальный index.html из вебинара 4 как основу
const INDEX_SNAPSHOT_W5 = INDEX_HTML_W5 || `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
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
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
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
      </section>
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
          <!-- карточки комнат -->
        </div>
        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>
    </div>
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

// Шаги 1-4: data.js (js вкладка, html=index.html со ссылкой на data.js)
const INDEX_WITH_DATASCRIPT = INDEX_SNAPSHOT_W5.replace(
  '<script src="js/main.js" defer></script>',
  '<script src="js/data.js" defer></script>\n  <script src="js/main.js" defer></script>'
);

// Обновляем шаги 01-04 (data.js работа)
for (const [step, jsContent] of [
  ['01-create-data-file.md', DATA_JS_EMPTY],
  ['02-data-objects.md', DATA_JS_PARTIAL],
  ['03-data-arrays-inside.md', DATA_JS_PARTIAL],
  ['04-data-full-list.md', DATA_JS_FULL],
]) {
  patchFile(lessonFile(W5, step), {
    'html:start': INDEX_SNAPSHOT_W5,
    'css:start': CSS_START_W5,
    'js:start': jsContent,
  });
}

// Шаг 05: подключение data.js в index.html
patchFile(lessonFile(W5, '05-data-include-html.md'), {
  'html:start': INDEX_SNAPSHOT_W5,
  'css:start': CSS_START_W5,
  'js:start': DATA_JS_FULL,
  'html:solution': INDEX_WITH_DATASCRIPT,
});

// Шаги 06-13: catalog.html — рендер карточек
// Начинаем с пустого catalog.html без toolbar
const CATALOG_SIMPLE = HTML_CATALOG_FINAL.replace(
  '<div class="catalog-toolbar">\n        <input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию офиса...">\n        <div class="sort-actions">\n          <button id="sortAsc" class="btn btn-outline">Цена: по возрастанию ↑</button>\n          <button id="sortDesc" class="btn btn-outline">Цена: по убыванию ↓</button>\n        </div>\n      </div>\n\n      ', ''
);

for (const step of [
  '06-create-catalog-page.md',
  '07-catalog-container.md',
  '08-render-function-skeleton.md',
  '09-array-map.md',
  '10-render-card-html.md',
  '11-render-join.md',
  '12-render-nested-map.md',
  '13-update-index-links.md',
]) {
  patchFile(lessonFile(W5, step), {
    'html:start': HTML_CATALOG_FINAL,
    'css:start': CSS_START_W5,
    'js:start': JS_W5_BASE,
  });
}

// Шаги 14-20: room-details.html
for (const step of [
  '14-create-details-page.md',
  '15-details-function-skeleton.md',
  '16-url-search-params.md',
  '17-array-find.md',
  '18-details-not-found.md',
  '19-details-render.md',
  '20-details-ternary.md',
]) {
  patchFile(lessonFile(W5, step), {
    'html:start': HTML_ROOM_DETAILS,
    'css:start': CSS_START_W5,
    'js:start': JS_W5_BASE,
  });
}

// Шаг 21: mock bookings
patchFile(lessonFile(W5, '21-data-mock-bookings.md'), {
  'html:start': HTML_CATALOG_FINAL,
  'css:start': CSS_START_W5,
  'js:start': JS_W5_BASE,
});

console.log('\n=== Webinar 06: Формы и валидация ===');

const W6 = '06-forms';
const CSS_START_W6 = CSS.w5;
const JS_START_W6 = JS_W5_BASE;

// Шаги 01-04: создание login.html + register.html (html вкладка)
patchFile(lessonFile(W6, '01-create-login-page.md'), {
  'html:start': HTML_LOGIN.replace(
    '<form id="loginForm" novalidate>',
    '<form id="loginForm" novalidate>\n          <!-- Поля будут добавлены на следующем шаге -->'
  ).replace(/<div class="form-group">[\s\S]*?<\/form>/, '<form id="loginForm" novalidate>\n        </form>'),
  'css:start': CSS_START_W6,
  'js:start': JS_START_W6,
  'html:solution': HTML_LOGIN,
});

patchFile(lessonFile(W6, '02-login-html-form.md'), {
  'html:start': HTML_LOGIN,
  'css:start': CSS_START_W6,
  'js:start': JS_START_W6,
  'html:solution': HTML_LOGIN,
});

patchFile(lessonFile(W6, '03-create-register-page.md'), {
  'html:start': HTML_REGISTER,
  'css:start': CSS_START_W6,
  'js:start': JS_START_W6,
  'html:solution': HTML_REGISTER,
});

patchFile(lessonFile(W6, '04-register-html-form.md'), {
  'html:start': HTML_REGISTER,
  'css:start': CSS_START_W6,
  'js:start': JS_START_W6,
  'html:solution': HTML_REGISTER,
});

// Шаги 05-07: CSS форм
for (const step of ['05-css-form-card.md', '06-css-form-inputs.md', '07-css-validation-styles.md']) {
  patchFile(lessonFile(W6, step), {
    'html:start': HTML_LOGIN,
    'css:start': CSS_START_W6,
    'js:start': JS_START_W6,
  });
}

// Шаги 08-15: initRegisterForm
for (const step of [
  '08-init-register-skeleton.md',
  '09-form-submit-event.md',
  '10-validation-flag.md',
  '11-fields-array.md',
  '12-validation-loop.md',
  '13-password-match.md',
  '14-register-success-toast.md',
  '15-register-redirect.md',
]) {
  patchFile(lessonFile(W6, step), {
    'html:start': HTML_REGISTER,
    'css:start': CSS.w6,
    'js:start': JS_START_W6,
  });
}

// Шаги 16-21: initLoginForm
for (const step of [
  '16-init-login-skeleton.md',
  '17-login-values.md',
  '18-login-credentials-check.md',
  '19-login-success-storage.md',
  '20-login-error-ui.md',
  '21-call-form-functions.md',
]) {
  patchFile(lessonFile(W6, step), {
    'html:start': HTML_LOGIN,
    'css:start': CSS.w6,
    'js:start': JS_W6_BASE,
  });
}

console.log('\n=== Webinar 07: Слайдер и таймеры ===');

const W7 = '07-slider';
// Читаем финальный index.html (с слайдером из вебинара 3 и полной nav из вебинара 4)
const INDEX_W7_HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  <script src="js/data.js" defer></script>
  <script src="js/main.js" defer></script>
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
          <li id="myBookingsNavItem" style="display: none;"><a href="pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
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
      </section>

      <section class="slider-section">
        <div class="slider">
          <div class="slide active">
            <img src="img/slider-1.jpg" alt="Слайд 1" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-2.jpg" alt="Слайд 2" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-3.jpg" alt="Слайд 3" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-4.jpg" alt="Слайд 4" class="slide-img">
          </div>
          <button class="slider-btn slider-prev">‹</button>
          <button class="slider-btn slider-next">›</button>
          <div class="slider-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </section>

      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/room-details.html?id=focus-1">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/room-details.html?id=focus-1" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/room-details.html?id=focus-1" class="btn-icon" title="Подробнее" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/booking.html?room=focus-1" class="btn btn-primary">Забронировать</a>
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

const CSS_W6_FULL = CSS.w6;
const JS_W6_FULL = JS_W6_BASE;

// Шаги 01-06: HTML слайдера + CSS слайдера
for (const step of [
  '01-create-slider-html.md',
  '02-slider-css-container.md',
  '03-slider-css-slides.md',
  '04-slider-css-active.md',
  '05-slider-css-buttons.md',
  '06-slider-css-dots.md',
]) {
  patchFile(lessonFile(W7, step), {
    'html:start': INDEX_W7_HTML,
    'css:start': CSS_W6_FULL,
    'js:start': JS_W6_FULL,
  });
}

// Шаги 07-20: initSlider функция
for (const step of [
  '07-init-slider-skeleton.md',
  '08-slider-state.md',
  '09-show-slide-func.md',
  '10-show-slide-logic.md',
  '11-toggle-classes.md',
  '12-next-prev-funcs.md',
  '13-button-listeners.md',
  '14-dots-listeners.md',
  '15-start-auto-func.md',
  '16-stop-auto-func.md',
  '17-reset-timer-on-click-btns.md',
  '18-reset-timer-on-click-dots.md',
  '19-start-on-init.md',
  '20-call-init-slider.md',
]) {
  patchFile(lessonFile(W7, step), {
    'html:start': INDEX_W7_HTML,
    'css:start': CSS.w7,
    'js:start': JS_W7_BASE,
  });
}

console.log('\n=== Webinar 08: Фильтры и калькулятор ===');

const W8 = '08-search';
const CSS_W7_FULL = CSS.w7;

// Шаги 01-02: toolbar HTML + CSS (работаем на catalog.html)
for (const step of ['01-catalog-toolbar-html.md', '02-catalog-toolbar-css.md']) {
  patchFile(lessonFile(W8, step), {
    'html:start': HTML_CATALOG_FINAL,
    'css:start': CSS_W7_FULL,
    'js:start': JS_W7_BASE,
  });
}

// Шаги 03-11: initCatalogFilters — filter/search/sort
for (const step of [
  '03-init-filters-skeleton.md',
  '04-refactor-render.md',
  '05-displayed-rooms-state.md',
  '06-empty-search-result.md',
  '07-apply-filter-func.md',
  '08-array-filter.md',
  '09-search-event.md',
  '10-array-sort.md',
  '11-call-init-filters.md',
]) {
  patchFile(lessonFile(W8, step), {
    'html:start': HTML_CATALOG_WITH_TOOLBAR,
    'css:start': CSS.w8,
    'js:start': JS_W8_BASE,
  });
}

// Шаги 12-13: booking.html
for (const step of ['12-create-booking-page.md', '13-booking-form-html.md']) {
  patchFile(lessonFile(W8, step), {
    'html:start': HTML_BOOKING,
    'css:start': CSS.w8,
    'js:start': JS_W8_BASE,
  });
}

// Шаг 14: my-bookings.html (пустая версия без стилей bookings-list)
patchFile(lessonFile(W8, '14-create-mybookings-page.md'), {
  'html:start': HTML_MY_BOOKINGS,
  'css:start': CSS.w8,
  'js:start': JS_W8_BASE,
});

// Шаг 15: booking CSS (на странице booking.html)
patchFile(lessonFile(W8, '15-booking-css.md'), {
  'html:start': HTML_BOOKING,
  'css:start': CSS.w8,
  'js:start': JS_W8_BASE,
});

// Шаги 16-25: initBookingCalc
for (const step of [
  '16-init-booking-skeleton.md',
  '17-booking-auth-guard.md',
  '18-populate-select.md',
  '19-auto-select-room.md',
  '20-update-price-func.md',
  '21-calc-total.md',
  '22-calc-events.md',
  '23-booking-submit.md',
  '24-push-mock-booking.md',
  '25-booking-redirect.md',
]) {
  patchFile(lessonFile(W8, step), {
    'html:start': HTML_BOOKING,
    'css:start': CSS.w8,
    'js:start': JS_W8_BASE,
  });
}

console.log('\n=== Webinar 09: Финализация — Мои бронирования ===');

const W9 = '09-final';
const CSS_W8_FULL = CSS.w8;

// Шаги 01-03: CSS для bookings-list/booking-item/empty-message (работаем на my-bookings.html)
for (const step of [
  '01-bookings-list-css.md',
  '02-booking-item-css.md',
  '03-empty-message-css.md',
]) {
  patchFile(lessonFile(W9, step), {
    'html:start': HTML_MY_BOOKINGS,
    'css:start': CSS_W8_FULL,
    'js:start': JS_W8_BASE,
  });
}

// Шаги 04-09: initMyBookings
for (const step of [
  '04-init-mybookings-skeleton.md',
  '05-mybookings-auth-guard.md',
  '06-check-empty-array.md',
  '07-render-mock-bookings.md',
  '08-booking-card-html.md',
  '09-call-init-mybookings.md',
]) {
  patchFile(lessonFile(W9, step), {
    'html:start': HTML_MY_BOOKINGS,
    'css:start': CSS.w9,
    'js:start': JS_W9_BASE,
  });
}

// Шаг 10: финальное поздравление
patchFile(lessonFile(W9, '10-final-congratulations.md'), {
  'html:start': HTML_MY_BOOKINGS,
  'css:start': CSS.w9,
  'js:start': JS_W9_BASE,
});

console.log('\n✅ Ребилдинг вебинаров 5-9 завершён!');
console.log('Запускайте: node scripts/verify-all-lessons.mjs');
