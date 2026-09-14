/**
 * Rebuild lessons 5-9 with full cumulative HTML, CSS, and JS context.
 * Run: node scripts/rebuild-lessons-5-9.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const LESSONS_DIR = path.join(ROOT, 'content', 'lessons');
const FRONTEND_DIR = path.resolve(ROOT, '..', '05. step by step 2026 & 2027', '01. frontend');

console.log('--- Rebuilding lessons 5-9 with full context ---');

// =============================================================================
// 1. ASSETS & SOURCE CODE
// =============================================================================

// Read style.css and data.js from webinar-09 basic (the canonical complete versions)
const basicW9Dir = path.join(FRONTEND_DIR, 'webinar-09-final-assembly-my-bookings', 'basic');
const FINAL_STYLE_CSS = fs.readFileSync(path.join(basicW9Dir, 'css', 'style.css'), 'utf8');
const DATA_JS = fs.readFileSync(path.join(basicW9Dir, 'js', 'data.js'), 'utf8');

// Read HTML pages from webinar-09 basic
const HTML_INDEX_FINAL = fs.readFileSync(path.join(basicW9Dir, 'index.html'), 'utf8');
const HTML_CATALOG_FINAL = fs.readFileSync(path.join(basicW9Dir, 'pages', 'catalog.html'), 'utf8');
const HTML_ROOM_DETAILS_FINAL = fs.readFileSync(path.join(basicW9Dir, 'pages', 'room-details.html'), 'utf8');
const HTML_LOGIN_FINAL = fs.readFileSync(path.join(basicW9Dir, 'pages', 'login.html'), 'utf8');
const HTML_REGISTER_FINAL = fs.readFileSync(path.join(basicW9Dir, 'pages', 'register.html'), 'utf8');
const HTML_BOOKING_FINAL = fs.readFileSync(path.join(basicW9Dir, 'pages', 'booking.html'), 'utf8');
const HTML_MY_BOOKINGS_FINAL = fs.readFileSync(path.join(basicW9Dir, 'pages', 'my-bookings.html'), 'utf8');

// Webinar 5 index.html (without slider)
const basicW5Dir = path.join(FRONTEND_DIR, 'webinar-05-dynamic-catalog-data', 'basic');
const HTML_INDEX_W5 = fs.readFileSync(path.join(basicW5Dir, 'index.html'), 'utf8');
const CSS_W5 = fs.readFileSync(path.join(basicW5Dir, 'css', 'style.css'), 'utf8');

// Webinar 6
const basicW6Dir = path.join(FRONTEND_DIR, 'webinar-06-forms-validation', 'basic');
const CSS_W6 = fs.readFileSync(path.join(basicW6Dir, 'css', 'style.css'), 'utf8');

// Webinar 7
const basicW7Dir = path.join(FRONTEND_DIR, 'webinar-07-slider-timers', 'basic');
const CSS_W7 = fs.readFileSync(path.join(basicW7Dir, 'css', 'style.css'), 'utf8');

// Webinar 8
const basicW8Dir = path.join(FRONTEND_DIR, 'webinar-08-filters-and-booking-calc', 'basic');
const CSS_W8 = fs.readFileSync(path.join(basicW8Dir, 'css', 'style.css'), 'utf8');

// Webinar 9 CSS
const CSS_W9 = FINAL_STYLE_CSS;

// Helper to inject data and mock auth into HTML head for live preview
function prepareHtmlForPreview(html, options = {}) {
  const { includeData = true, mockAuth = false, defaultRoom = false } = options;
  let res = html;

  let headInjections = '';
  if (includeData && !res.includes('OFFICE_ROOMS')) {
    headInjections += `\n  <script>\n${DATA_JS}\n  </script>`;
  }
  if (mockAuth) {
    headInjections += `\n  <script>\n  if (!localStorage.getItem('currentUser')) {\n    localStorage.setItem('currentUser', 'admin');\n  }\n  </script>`;
  }
  if (defaultRoom) {
    headInjections += `\n  <script>\n  // Fallback default room for room-details preview\n  if (!window.location.search) {\n    try {\n      history.replaceState(null, '', '?id=focus-1');\n    } catch(e) {}\n  }\n  </script>`;
  }

  if (headInjections && res.includes('</head>')) {
    res = res.replace('</head>', `${headInjections}\n</head>`);
  }
  return res;
}

// 16px/18px monochrome SVG open-link icon for details button
const LINK_ICON_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

// =============================================================================
// 2. MODULAR JAVASCRIPT FUNCTIONS
// =============================================================================

const JS_SHOW_NOTIFICATION = `function showNotification(message, type = 'success') {
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

const JS_INIT_NAVIGATION = `function initNavigation() {
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
}`;

const JS_UPDATE_AUTH_NAV = `function updateAuthNav() {
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

const JS_RENDER_CATALOG_FULL = `function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => \`
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
            <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
            <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    </div>
  \`).join('');
}`;

const JS_INIT_ROOM_DETAILS_FULL = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room') || 'focus-1';
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

const JS_INIT_REGISTER_FORM_FULL = `function initRegisterForm() {
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

const JS_INIT_LOGIN_FORM_FULL = `function initLoginForm() {
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

const JS_INIT_SLIDER_FULL = `function initSlider() {
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

const JS_INIT_CATALOG_FILTERS_FULL = `function initCatalogFilters() {
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
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
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

const JS_INIT_BOOKING_CALC_FULL = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

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

const JS_INIT_MY_BOOKINGS_FULL = `function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

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

// Helper to construct full main.js with given inits and functions
function buildMainJs(inits, functions) {
  return `// СмартОфис — Скрипт веб-приложения
document.addEventListener('DOMContentLoaded', () => {
  ${inits.join('\n  ')}
});

${functions.join('\n\n')}
`;
}

// Helper to extract frontmatter & markdown description from existing file
function parseLessonMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    throw new Error(`No YAML front-matter in ${filePath}`);
  }
  const frontmatter = fmMatch[1].trim();
  const body = fmMatch[2].trim();
  
  // Text after frontmatter up to the first code block (```)
  const codeIdx = body.search(/```[a-zA-Z0-9_\.\-]+:(start|solution)/);
  const description = (codeIdx !== -1 ? body.slice(0, codeIdx) : body).trim();

  return { frontmatter, description };
}

// Helper to assemble and write new markdown file
function writeLessonMarkdown(filePath, frontmatter, description, codeBlocks) {
  let out = `---\n${frontmatter.trim()}\n---\n\n${description.trim()}\n\n`;
  for (const block of codeBlocks) {
    if (block.code !== undefined && block.code !== null) {
      out += `\`\`\`${block.lang}:${block.variant}\n${block.code.trim()}\n\`\`\`\n\n`;
    }
  }
  fs.writeFileSync(filePath, out.trim() + '\n', 'utf8');
}

// =============================================================================
// 3. GENERATE WEBINAR 5 (`05-catalog`)
// =============================================================================
console.log('Generating Webinar 5 (05-catalog)...');
const w5Dir = path.join(LESSONS_DIR, '05-catalog');

const officeRoomsStep1 = `// СмартОфис — База данных офисных комнат и бронирований
const OFFICE_ROOMS = [

];`;

const officeRoomsStep2 = `// СмартОфис — База данных офисных комнат и бронирований
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    capacity: '1-2 человека',
    area: '12 м²',
    description: 'Идеальное тихое пространство для индивидуальной работы, важных звонков и глубокой концентрации.',
    image: '../img/room-1.jpg',
    isPopular: true
  }
];`;

const officeRoomsStep3 = `// СмартОфис — База данных офисных комнат и бронирований
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

const officeRoomsStep4 = DATA_JS.split('const MOCK_BOOKINGS')[0].trim();

// Base functions before Webinar 5
const baseW4Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV];
const baseW4Inits = ['initNavigation();'];

// Step 8: renderCatalog skeleton
const jsRenderCatalogSkel = `function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
}`;

// Step 9: map
const jsRenderCatalogMap = `function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => \`
    <div class="room-card">\${room.title}</div>
  \`).join('');
}`;

// Step 10: template literal
const jsRenderCatalogTemplate = `function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => \`
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
        <div class="card-footer">
          <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
          <a href="room-details.html?id=\${room.id}" class="btn btn-primary">Подробнее</a>
        </div>
      </div>
    </div>
  \`).join('');
}`;

// Step 11: join
const jsRenderCatalogNoJoin = `function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => \`
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
        <div class="card-footer">
          <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
          <a href="room-details.html?id=\${room.id}" class="btn btn-primary">Подробнее</a>
        </div>
      </div>
    </div>
  \`);
}`;

// Step 15: initRoomDetails skeleton
const jsInitRoomDetailsSkel = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
}`;

// Step 16: urlParams
const jsInitRoomDetailsParams = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room') || 'focus-1';
}`;

// Step 17: array find
const jsInitRoomDetailsFind = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room') || 'focus-1';
  const room = OFFICE_ROOMS.find(r => r.id === roomId);
}`;

// Step 18: not found check
const jsInitRoomDetailsNotFound = `function initRoomDetails() {
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
}`;

// Step 19: render without ternary
const jsInitRoomDetailsRenderNoTernary = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room') || 'focus-1';
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

// Processing Webinar 5 steps
const w5StepsConfig = [
  // 01: Create data file
  { file: '01-create-data-file.md', html: prepareHtmlForPreview(HTML_INDEX_W5), css: CSS_W5, jsStart: '// СмартОфис — База данных офисных комнат и бронирований\n', jsSolution: officeRoomsStep1 },
  // 02: Data objects
  { file: '02-data-objects.md', html: prepareHtmlForPreview(HTML_INDEX_W5), css: CSS_W5, jsStart: officeRoomsStep1, jsSolution: officeRoomsStep2 },
  // 03: Arrays inside object
  { file: '03-data-arrays-inside.md', html: prepareHtmlForPreview(HTML_INDEX_W5), css: CSS_W5, jsStart: officeRoomsStep2, jsSolution: officeRoomsStep3 },
  // 04: Full list
  { file: '04-data-full-list.md', html: prepareHtmlForPreview(HTML_INDEX_W5), css: CSS_W5, jsStart: officeRoomsStep3, jsSolution: officeRoomsStep4 },
  // 05: Include data in HTML
  { file: '05-data-include-html.md', htmlStart: prepareHtmlForPreview(HTML_INDEX_W5.replace('<script src="js/data.js" defer></script>', '')), htmlSolution: prepareHtmlForPreview(HTML_INDEX_W5), css: CSS_W5, jsStart: buildMainJs(baseW4Inits, baseW4Funcs) },
  // 06: Create catalog page
  { file: '06-create-catalog-page.md', htmlStart: prepareHtmlForPreview(HTML_CATALOG_FINAL.replace('<div class="rooms-grid" id="catalogContainer"></div>', '')), htmlSolution: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W5, jsStart: buildMainJs(baseW4Inits, baseW4Funcs) },
  // 07: Catalog container
  { file: '07-catalog-container.md', htmlStart: prepareHtmlForPreview(HTML_CATALOG_FINAL.replace('<div class="rooms-grid" id="catalogContainer"></div>', '')), htmlSolution: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W5, jsStart: buildMainJs(baseW4Inits, baseW4Funcs) },
  // 08: Render function skeleton
  { file: '08-render-function-skeleton.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W5, jsStart: buildMainJs(baseW4Inits, baseW4Funcs), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogSkel]) },
  // 09: Array map
  { file: '09-array-map.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogSkel]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogMap]) },
  // 10: Render card HTML
  { file: '10-render-card-html.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogMap]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogTemplate]) },
  // 11: Render join
  { file: '11-render-join.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogNoJoin]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogTemplate]) },
  // 12: Render nested map
  { file: '12-render-nested-map.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogTemplate]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL]) },
  // 13: Update index links
  { file: '13-update-index-links.md', htmlStart: prepareHtmlForPreview(HTML_INDEX_W5.replace(/href="pages\/catalog\.html"/g, 'href="#"')), htmlSolution: prepareHtmlForPreview(HTML_INDEX_W5), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL]) },
  // 14: Create details page
  { file: '14-create-details-page.md', htmlStart: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL.replace('<div class="container" id="roomDetailsContainer">', '<div class="container" id="roomDetailsContainer">\n      <!-- Контент комнат -->'), { defaultRoom: true }), htmlSolution: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL, { defaultRoom: true }), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL]) },
  // 15: Details function skeleton
  { file: '15-details-function-skeleton.md', html: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL, { defaultRoom: true }), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsSkel]) },
  // 16: URL search params
  { file: '16-url-search-params.md', html: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL, { defaultRoom: true }), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsSkel]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsParams]) },
  // 17: Array find
  { file: '17-array-find.md', html: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL, { defaultRoom: true }), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsParams]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsFind]) },
  // 18: Details not found
  { file: '18-details-not-found.md', html: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsFind]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsNotFound]) },
  // 19: Details render
  { file: '19-details-render.md', html: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL, { defaultRoom: true }), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsNotFound]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsRenderNoTernary]) },
  // 20: Details ternary
  { file: '20-details-ternary.md', html: prepareHtmlForPreview(HTML_ROOM_DETAILS_FINAL, { defaultRoom: true }), css: CSS_W5, jsStart: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsRenderNoTernary]), jsSolution: buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, JS_INIT_ROOM_DETAILS_FULL]) },
  // 21: Data mock bookings
  { file: '21-data-mock-bookings.md', html: prepareHtmlForPreview(HTML_INDEX_W5), css: CSS_W5, jsStart: officeRoomsStep4, jsSolution: DATA_JS },
];

for (const cfg of w5StepsConfig) {
  const filePath = path.join(w5Dir, cfg.file);
  const { frontmatter, description } = parseLessonMarkdown(filePath);
  const blocks = [];

  if (cfg.html) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.html });
  } else if (cfg.htmlStart) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.htmlStart });
    if (cfg.htmlSolution) blocks.push({ lang: 'html', variant: 'solution', code: cfg.htmlSolution });
  }

  if (cfg.css) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.css });
  } else if (cfg.cssStart) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.cssStart });
    if (cfg.cssSolution) blocks.push({ lang: 'css', variant: 'solution', code: cfg.cssSolution });
  }

  if (cfg.jsStart) {
    blocks.push({ lang: 'js', variant: 'start', code: cfg.jsStart });
  }
  if (cfg.jsSolution) {
    blocks.push({ lang: 'js', variant: 'solution', code: cfg.jsSolution });
  }

  writeLessonMarkdown(filePath, frontmatter, description, blocks);
}

// =============================================================================
// 4. GENERATE WEBINAR 6 (`06-forms`)
// =============================================================================
console.log('Generating Webinar 6 (06-forms)...');
const w6Dir = path.join(LESSONS_DIR, '06-forms');

// Webinar 5 final JS
const baseW5Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_RENDER_CATALOG_FULL, JS_INIT_ROOM_DETAILS_FULL];
const baseW5Inits = ['initNavigation();', 'renderCatalog();', 'initRoomDetails();'];

// Register form progressive states
const jsRegisterSkel = `function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;
}`;

const jsRegisterSubmit = `function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}`;

const jsRegisterFlag = `function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
  });
}`;

const jsRegisterFields = `function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
  });
}`;

const jsRegisterLoop = `function initRegisterForm() {
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
  });
}`;

const jsRegisterPassMatch = `function initRegisterForm() {
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
  });
}`;

const jsRegisterToast = `function initRegisterForm() {
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
    }
  });
}`;

// Login form progressive states
const jsLoginSkel = `function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;
}`;

const jsLoginValues = `function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
  });
}`;

const jsLoginCheck = `function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    if (login === 'admin' && pass === '12345') {
      // Успешный вход
    }
  });
}`;

const jsLoginStorage = `function initLoginForm() {
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
    }
  });
}`;

const w6StepsConfig = [
  // 01: Create login page
  { file: '01-create-login-page.md', htmlStart: prepareHtmlForPreview(HTML_LOGIN_FINAL.replace('<div class="form-card">', '<div class="form-card">\n      <!-- Форма входа -->')), htmlSolution: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs) },
  // 02: Login HTML form
  { file: '02-login-html-form.md', htmlStart: prepareHtmlForPreview(HTML_LOGIN_FINAL.replace('<form id="loginForm" novalidate>', '<form id="loginForm" novalidate>\n          <!-- Поля ввода -->')), htmlSolution: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs) },
  // 03: Create register page
  { file: '03-create-register-page.md', htmlStart: prepareHtmlForPreview(HTML_REGISTER_FINAL.replace('<div class="form-card">', '<div class="form-card">\n      <!-- Форма регистрации -->')), htmlSolution: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs) },
  // 04: Register HTML form
  { file: '04-register-html-form.md', htmlStart: prepareHtmlForPreview(HTML_REGISTER_FINAL.replace('<form id="registerForm" novalidate>', '<form id="registerForm" novalidate>\n          <!-- Поля ввода -->')), htmlSolution: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs) },
  // 05: CSS form card
  { file: '05-css-form-card.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), cssStart: CSS_W5, cssSolution: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs) },
  // 06: CSS form inputs
  { file: '06-css-form-inputs.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), cssStart: CSS_W5, cssSolution: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs) },
  // 07: CSS validation styles
  { file: '07-css-validation-styles.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), cssStart: CSS_W5, cssSolution: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs) },
  // 08: Register skeleton
  { file: '08-init-register-skeleton.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs(baseW5Inits, baseW5Funcs), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterSkel]) },
  // 09: Form submit event
  { file: '09-form-submit-event.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterSkel]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterSubmit]) },
  // 10: Validation flag
  { file: '10-validation-flag.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterSubmit]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterFlag]) },
  // 11: Fields array
  { file: '11-fields-array.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterFlag]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterFields]) },
  // 12: Validation loop
  { file: '12-validation-loop.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterFields]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterLoop]) },
  // 13: Password match
  { file: '13-password-match.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterLoop]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterPassMatch]) },
  // 14: Success toast
  { file: '14-register-success-toast.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterPassMatch]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterToast]) },
  // 15: Register redirect
  { file: '15-register-redirect.md', html: prepareHtmlForPreview(HTML_REGISTER_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, jsRegisterToast]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL]) },
  // 16: Login skeleton
  { file: '16-init-login-skeleton.md', html: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginSkel]) },
  // 17: Login values
  { file: '17-login-values.md', html: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginSkel]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginValues]) },
  // 18: Login credentials check
  { file: '18-login-credentials-check.md', html: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginValues]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginCheck]) },
  // 19: Login storage
  { file: '19-login-success-storage.md', html: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginCheck]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginStorage]) },
  // 20: Login error UI
  { file: '20-login-error-ui.md', html: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginStorage]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL]) },
  // 21: Call form functions
  { file: '21-call-form-functions.md', html: prepareHtmlForPreview(HTML_LOGIN_FINAL), css: CSS_W6, jsStart: buildMainJs(baseW5Inits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL]), jsSolution: buildMainJs([...baseW5Inits, 'initRegisterForm();', 'initLoginForm();'], [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL]) },
];

for (const cfg of w6StepsConfig) {
  const filePath = path.join(w6Dir, cfg.file);
  const { frontmatter, description } = parseLessonMarkdown(filePath);
  const blocks = [];

  if (cfg.html) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.html });
  } else if (cfg.htmlStart) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.htmlStart });
    if (cfg.htmlSolution) blocks.push({ lang: 'html', variant: 'solution', code: cfg.htmlSolution });
  }

  if (cfg.css) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.css });
  } else if (cfg.cssStart) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.cssStart });
    if (cfg.cssSolution) blocks.push({ lang: 'css', variant: 'solution', code: cfg.cssSolution });
  }

  if (cfg.jsStart) {
    blocks.push({ lang: 'js', variant: 'start', code: cfg.jsStart });
  }
  if (cfg.jsSolution) {
    blocks.push({ lang: 'js', variant: 'solution', code: cfg.jsSolution });
  }

  writeLessonMarkdown(filePath, frontmatter, description, blocks);
}

// =============================================================================
// 5. GENERATE WEBINAR 7 (`07-slider`)
// =============================================================================
console.log('Generating Webinar 7 (07-slider)...');
const w7Dir = path.join(LESSONS_DIR, '07-slider');

// Webinar 6 final JS
const baseW6Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_RENDER_CATALOG_FULL, JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];
const baseW6Inits = ['initNavigation();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'];

// Slider progressive states
const jsSliderSkel = `function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;
}`;

const jsSliderState = `function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

  let currentSlide = 0;
  let timerId = null;
}`;

const jsSliderShowFunc = `function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

  let currentSlide = 0;
  let timerId = null;

  function showSlide(index) {
    // Логика переключения слайда
  }
}`;

const jsSliderShowLogic = `function initSlider() {
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
  }
}`;

const jsSliderToggleClasses = `function initSlider() {
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
}`;

const jsSliderNextPrev = `function initSlider() {
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
}`;

const jsSliderBtnListeners = `function initSlider() {
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

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); });
}`;

const jsSliderDotListeners = `function initSlider() {
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

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
    });
  });
}`;

const jsSliderStartAuto = `function initSlider() {
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

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
    });
  });
}`;

const jsSliderResetBtn = `function initSlider() {
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
    });
  });
}`;

const jsSliderResetDots = `function initSlider() {
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
}`;

const w7StepsConfig = [
  // 01: Create slider HTML
  { file: '01-create-slider-html.md', htmlStart: prepareHtmlForPreview(HTML_INDEX_W5), htmlSolution: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(baseW6Inits, baseW6Funcs) },
  // 02: Slider container CSS
  { file: '02-slider-css-container.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), cssStart: CSS_W6, cssSolution: CSS_W7, jsStart: buildMainJs(baseW6Inits, baseW6Funcs) },
  // 03: Slider slides CSS
  { file: '03-slider-css-slides.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), cssStart: CSS_W6, cssSolution: CSS_W7, jsStart: buildMainJs(baseW6Inits, baseW6Funcs) },
  // 04: Slider active CSS
  { file: '04-slider-css-active.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), cssStart: CSS_W6, cssSolution: CSS_W7, jsStart: buildMainJs(baseW6Inits, baseW6Funcs) },
  // 05: Slider buttons CSS
  { file: '05-slider-css-buttons.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), cssStart: CSS_W6, cssSolution: CSS_W7, jsStart: buildMainJs(baseW6Inits, baseW6Funcs) },
  // 06: Slider dots CSS
  { file: '06-slider-css-dots.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), cssStart: CSS_W6, cssSolution: CSS_W7, jsStart: buildMainJs(baseW6Inits, baseW6Funcs) },
  // 07: Init slider skeleton
  { file: '07-init-slider-skeleton.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(baseW6Inits, baseW6Funcs), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderSkel]) },
  // 08: Slider state
  { file: '08-slider-state.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderSkel]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderState]) },
  // 09: Show slide func
  { file: '09-show-slide-func.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderState]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderShowFunc]) },
  // 10: Show slide logic
  { file: '10-show-slide-logic.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderShowFunc]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderShowLogic]) },
  // 11: Toggle classes
  { file: '11-toggle-classes.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderShowLogic]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderToggleClasses]) },
  // 12: Next prev funcs
  { file: '12-next-prev-funcs.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderToggleClasses]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderNextPrev]) },
  // 13: Button listeners
  { file: '13-button-listeners.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderNextPrev]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderBtnListeners]) },
  // 14: Dots listeners
  { file: '14-dots-listeners.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderBtnListeners]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderDotListeners]) },
  // 15: Start auto func
  { file: '15-start-auto-func.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderDotListeners]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderStartAuto]) },
  // 16: Stop auto func
  { file: '16-stop-auto-func.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderStartAuto]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderStartAuto]) },
  // 17: Reset timer on buttons
  { file: '17-reset-timer-on-click-btns.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderStartAuto]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderResetBtn]) },
  // 18: Reset timer on dots
  { file: '18-reset-timer-on-click-dots.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderResetBtn]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderResetDots]) },
  // 19: Start on init
  { file: '19-start-on-init.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, jsSliderResetDots]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, JS_INIT_SLIDER_FULL]) },
  // 20: Call init slider
  { file: '20-call-init-slider.md', html: prepareHtmlForPreview(HTML_INDEX_FINAL), css: CSS_W7, jsStart: buildMainJs(baseW6Inits, [...baseW6Funcs, JS_INIT_SLIDER_FULL]), jsSolution: buildMainJs(['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'], [...baseW6Funcs, JS_INIT_SLIDER_FULL]) },
];

for (const cfg of w7StepsConfig) {
  const filePath = path.join(w7Dir, cfg.file);
  const { frontmatter, description } = parseLessonMarkdown(filePath);
  const blocks = [];

  if (cfg.html) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.html });
  } else if (cfg.htmlStart) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.htmlStart });
    if (cfg.htmlSolution) blocks.push({ lang: 'html', variant: 'solution', code: cfg.htmlSolution });
  }

  if (cfg.css) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.css });
  } else if (cfg.cssStart) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.cssStart });
    if (cfg.cssSolution) blocks.push({ lang: 'css', variant: 'solution', code: cfg.cssSolution });
  }

  if (cfg.jsStart) {
    blocks.push({ lang: 'js', variant: 'start', code: cfg.jsStart });
  }
  if (cfg.jsSolution) {
    blocks.push({ lang: 'js', variant: 'solution', code: cfg.jsSolution });
  }

  writeLessonMarkdown(filePath, frontmatter, description, blocks);
}

// =============================================================================
// 6. GENERATE WEBINAR 8 (`08-search`)
// =============================================================================
console.log('Generating Webinar 8 (08-search)...');
const w8Dir = path.join(LESSONS_DIR, '08-search');

// Webinar 7 final JS
const baseW7Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_INIT_SLIDER_FULL, JS_RENDER_CATALOG_FULL, JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];
const baseW7Inits = ['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'];

// Filter progressive states
const jsFiltersSkel = `function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
}`;

const jsFiltersRender = `function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  function render(rooms) {
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
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
              <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }
}`;

const jsFiltersState = `function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  let displayedRooms = [...OFFICE_ROOMS];

  function render(rooms) {
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
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
              <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }
}`;

const jsFiltersEmpty = `function initCatalogFilters() {
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
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
              <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }
}`;

const jsFiltersApplyFunc = `function initCatalogFilters() {
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
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
              <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }

  function applyFilter() {
    // Фильтрация
  }
}`;

const jsFiltersInput = `function initCatalogFilters() {
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
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
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

  render(displayedRooms);
}`;

// Booking calculator progressive states
const jsCalcSkel = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;
}`;

const jsCalcGuard = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
}`;

const jsCalcSelect = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

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
}`;

const jsCalcUrl = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

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
}`;

const jsCalcUpdateFunc = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

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
  }
}`;

const jsCalcEvents = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

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
}`;

const jsCalcSubmit = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

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
  });
}`;

const jsCalcPush = `function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

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
  });
}`;

// Functions without old renderCatalog (filters replaces it)
const baseW8FilterFuncs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_INIT_SLIDER_FULL, JS_INIT_CATALOG_FILTERS_FULL, JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];
const baseW8FilterInits = ['initNavigation();', 'initSlider();', 'initCatalogFilters();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'];

const w8StepsConfig = [
  // 01: Toolbar HTML
  { file: '01-catalog-toolbar-html.md', htmlStart: prepareHtmlForPreview(HTML_CATALOG_FINAL.replace(/<div class="catalog-toolbar">[\s\S]*?<\/div>\s*<\/div>/, '')), htmlSolution: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs(baseW7Inits, baseW7Funcs) },
  // 02: Toolbar CSS
  { file: '02-catalog-toolbar-css.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), cssStart: CSS_W7, cssSolution: CSS_W8, jsStart: buildMainJs(baseW7Inits, baseW7Funcs) },
  // 03: Init filters skeleton
  { file: '03-init-filters-skeleton.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs(baseW7Inits, baseW7Funcs), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersSkel]) },
  // 04: Refactor render inside filters
  { file: '04-refactor-render.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersSkel]), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersRender]) },
  // 05: Displayed rooms state
  { file: '05-displayed-rooms-state.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersRender]), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersState]) },
  // 06: Empty search result
  { file: '06-empty-search-result.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersState]), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersEmpty]) },
  // 07: Apply filter func
  { file: '07-apply-filter-func.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersEmpty]), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersApplyFunc]) },
  // 08: Array filter
  { file: '08-array-filter.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersApplyFunc]), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersInput]) },
  // 09: Search event
  { file: '09-search-event.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersApplyFunc]), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersInput]) },
  // 10: Array sort
  { file: '10-array-sort.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, jsFiltersInput]), jsSolution: buildMainJs([...baseW7Inits, 'initCatalogFilters();'], [...baseW7Funcs, JS_INIT_CATALOG_FILTERS_FULL]) },
  // 11: Call init filters
  { file: '11-call-init-filters.md', html: prepareHtmlForPreview(HTML_CATALOG_FINAL), css: CSS_W8, jsStart: buildMainJs(baseW7Inits, baseW8FilterFuncs), jsSolution: buildMainJs(baseW8FilterInits, baseW8FilterFuncs) },
  // 12: Create booking page
  { file: '12-create-booking-page.md', htmlStart: prepareHtmlForPreview(HTML_BOOKING_FINAL.replace('<div class="form-card">', '<div class="form-card">\n      <!-- Форма бронирования -->'), { mockAuth: true }), htmlSolution: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs(baseW8FilterInits, baseW8FilterFuncs) },
  // 13: Booking form HTML
  { file: '13-booking-form-html.md', htmlStart: prepareHtmlForPreview(HTML_BOOKING_FINAL.replace('<form id="bookingForm">', '<form id="bookingForm">\n          <!-- Поля формы -->'), { mockAuth: true }), htmlSolution: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs(baseW8FilterInits, baseW8FilterFuncs) },
  // 14: Create mybookings page
  { file: '14-create-mybookings-page.md', htmlStart: prepareHtmlForPreview(HTML_MY_BOOKINGS_FINAL.replace('<div class="bookings-list" id="myBookingsList"></div>', '<div class="bookings-list" id="myBookingsList"><!-- Список заявок --></div>'), { mockAuth: true }), htmlSolution: prepareHtmlForPreview(HTML_MY_BOOKINGS_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs(baseW8FilterInits, baseW8FilterFuncs) },
  // 15: Booking CSS
  { file: '15-booking-css.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), cssStart: CSS_W7, cssSolution: CSS_W8, jsStart: buildMainJs(baseW8FilterInits, baseW8FilterFuncs) },
  // 16: Init booking skeleton
  { file: '16-init-booking-skeleton.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs(baseW8FilterInits, baseW8FilterFuncs), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcSkel]) },
  // 17: Booking auth guard
  { file: '17-booking-auth-guard.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcSkel]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcGuard]) },
  // 18: Populate select
  { file: '18-populate-select.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcGuard]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcSelect]) },
  // 19: Auto select room
  { file: '19-auto-select-room.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcSelect]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcUrl]) },
  // 20: Update price func
  { file: '20-update-price-func.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcUrl]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcUpdateFunc]) },
  // 21: Calc total
  { file: '21-calc-total.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcUpdateFunc]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcEvents]) },
  // 22: Calc events
  { file: '22-calc-events.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcUpdateFunc]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcEvents]) },
  // 23: Booking submit
  { file: '23-booking-submit.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcEvents]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcSubmit]) },
  // 24: Push mock booking
  { file: '24-push-mock-booking.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcSubmit]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcPush]) },
  // 25: Booking redirect
  { file: '25-booking-redirect.md', html: prepareHtmlForPreview(HTML_BOOKING_FINAL, { mockAuth: true }), css: CSS_W8, jsStart: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, jsCalcPush]), jsSolution: buildMainJs([...baseW8FilterInits, 'initBookingCalc();'], [...baseW8FilterFuncs, JS_INIT_BOOKING_CALC_FULL]) },
];

for (const cfg of w8StepsConfig) {
  const filePath = path.join(w8Dir, cfg.file);
  const { frontmatter, description } = parseLessonMarkdown(filePath);
  const blocks = [];

  if (cfg.html) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.html });
  } else if (cfg.htmlStart) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.htmlStart });
    if (cfg.htmlSolution) blocks.push({ lang: 'html', variant: 'solution', code: cfg.htmlSolution });
  }

  if (cfg.css) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.css });
  } else if (cfg.cssStart) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.cssStart });
    if (cfg.cssSolution) blocks.push({ lang: 'css', variant: 'solution', code: cfg.cssSolution });
  }

  if (cfg.jsStart) {
    blocks.push({ lang: 'js', variant: 'start', code: cfg.jsStart });
  }
  if (cfg.jsSolution) {
    blocks.push({ lang: 'js', variant: 'solution', code: cfg.jsSolution });
  }

  writeLessonMarkdown(filePath, frontmatter, description, blocks);
}

// =============================================================================
// 7. GENERATE WEBINAR 9 (`09-final`)
// =============================================================================
console.log('Generating Webinar 9 (09-final)...');
const w9Dir = path.join(LESSONS_DIR, '09-final');

// Webinar 8 final JS
const baseW8FinalFuncs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_INIT_SLIDER_FULL, JS_INIT_CATALOG_FILTERS_FULL, JS_INIT_BOOKING_CALC_FULL, JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];
const baseW8FinalInits = ['initNavigation();', 'initSlider();', 'initCatalogFilters();', 'initBookingCalc();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'];

// MyBookings progressive states
const jsMyBookingsSkel = `function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;
}`;

const jsMyBookingsGuard = `function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
}`;

const jsMyBookingsEmpty = `function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    container.innerHTML = '<div class="empty-message">У вас пока нет бронирований</div>';
    return;
  }
}`;

const jsMyBookingsMap = `function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

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
    <div class="booking-item">\${item.roomTitle} - \${item.totalPrice} ₽</div>
  \`).join('');
}`;

const htmlMyBookingsReady = prepareHtmlForPreview(HTML_MY_BOOKINGS_FINAL, { mockAuth: true });

const w9StepsConfig = [
  // 01: Bookings list CSS
  { file: '01-bookings-list-css.md', html: htmlMyBookingsReady, cssStart: CSS_W8, cssSolution: CSS_W9, jsStart: buildMainJs(baseW8FinalInits, baseW8FinalFuncs) },
  // 02: Booking item CSS
  { file: '02-booking-item-css.md', html: htmlMyBookingsReady, cssStart: CSS_W8, cssSolution: CSS_W9, jsStart: buildMainJs(baseW8FinalInits, baseW8FinalFuncs) },
  // 03: Empty message CSS
  { file: '03-empty-message-css.md', html: htmlMyBookingsReady, cssStart: CSS_W8, cssSolution: CSS_W9, jsStart: buildMainJs(baseW8FinalInits, baseW8FinalFuncs) },
  // 04: Init mybookings skeleton
  { file: '04-init-mybookings-skeleton.md', html: htmlMyBookingsReady, css: CSS_W9, jsStart: buildMainJs(baseW8FinalInits, baseW8FinalFuncs), jsSolution: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsSkel]) },
  // 05: Mybookings auth guard
  { file: '05-mybookings-auth-guard.md', html: htmlMyBookingsReady, css: CSS_W9, jsStart: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsSkel]), jsSolution: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsGuard]) },
  // 06: Check empty array
  { file: '06-check-empty-array.md', html: htmlMyBookingsReady, css: CSS_W9, jsStart: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsGuard]), jsSolution: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsEmpty]) },
  // 07: Render mock bookings
  { file: '07-render-mock-bookings.md', html: htmlMyBookingsReady, css: CSS_W9, jsStart: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsEmpty]), jsSolution: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsMap]) },
  // 08: Booking card HTML
  { file: '08-booking-card-html.md', html: htmlMyBookingsReady, css: CSS_W9, jsStart: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, jsMyBookingsMap]), jsSolution: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, JS_INIT_MY_BOOKINGS_FULL]) },
  // 09: Call init mybookings
  { file: '09-call-init-mybookings.md', html: htmlMyBookingsReady, css: CSS_W9, jsStart: buildMainJs(baseW8FinalInits, [...baseW8FinalFuncs, JS_INIT_MY_BOOKINGS_FULL]), jsSolution: buildMainJs([...baseW8FinalInits, 'initMyBookings();'], [...baseW8FinalFuncs, JS_INIT_MY_BOOKINGS_FULL]) },
  // 10: Final congratulations
  { file: '10-final-congratulations.md', html: htmlMyBookingsReady, css: CSS_W9, jsStart: buildMainJs(['initNavigation();', 'initSlider();', 'initCatalogFilters();', 'initBookingCalc();', 'initRoomDetails();', 'initMyBookings();', 'initRegisterForm();', 'initLoginForm();'], [...baseW8FinalFuncs, JS_INIT_MY_BOOKINGS_FULL]) },
];

for (const cfg of w9StepsConfig) {
  const filePath = path.join(w9Dir, cfg.file);
  const { frontmatter, description } = parseLessonMarkdown(filePath);
  const blocks = [];

  if (cfg.html) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.html });
  } else if (cfg.htmlStart) {
    blocks.push({ lang: 'html', variant: 'start', code: cfg.htmlStart });
    if (cfg.htmlSolution) blocks.push({ lang: 'html', variant: 'solution', code: cfg.htmlSolution });
  }

  if (cfg.css) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.css });
  } else if (cfg.cssStart) {
    blocks.push({ lang: 'css', variant: 'start', code: cfg.cssStart });
    if (cfg.cssSolution) blocks.push({ lang: 'css', variant: 'solution', code: cfg.cssSolution });
  }

  if (cfg.jsStart) {
    blocks.push({ lang: 'js', variant: 'start', code: cfg.jsStart });
  }
  if (cfg.jsSolution) {
    blocks.push({ lang: 'js', variant: 'solution', code: cfg.jsSolution });
  }

  writeLessonMarkdown(filePath, frontmatter, description, blocks);
}

console.log('--- Successfully rebuilt all lessons in webinars 5-9! ---');
