---
type: practice
title: "Контейнер для карточек"
highlight: html
---

# Контейнер для каталога

В прошлом модуле (всплывающие уведомления) мы поняли, что для генерации элементов через JS нам нужен **HTML-контейнер с уникальным ID**, в который мы будем всё складывать.

Для сетки карточек у нас уже есть класс `.rooms-grid` из второго модуля. Нам нужно создать `div` с этим классом и дать ему ID `catalogContainer`.

## 🛠 Задание
Внутри файла `catalog.html` (вкладка HTML), под абзацем с подзаголовком, добавьте пустой `div` для нашего будущего каталога.

```html:start
<!DOCTYPE html>
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

  <script>
// СмартОфис — База данных офисных комнат и бронирований
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
];

  </script>
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
          <li><a href="../index.html" class="nav-link active">Главная</a></li>
          <li><a href="../pages/catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="../pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="../pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
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
}
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
}
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
}
```

```js:start
// СмартОфис — Скрипт веб-приложения
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

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
}

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
}
```

```html:solution
<!DOCTYPE html>
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

  <script>
// СмартОфис — База данных офисных комнат и бронирований
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
];

  </script>
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
          <li><a href="../index.html" class="nav-link active">Главная</a></li>
          <li><a href="../pages/catalog.html" class="nav-link">Каталог</a></li>
          <li id="myBookingsNavItem" style="display: none;"><a href="../pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>
          <li><a href="../pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
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
</html>
```
