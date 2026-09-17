// fix-foma-continuity.mjs
// Completely fixes the JS continuity and eliminates premature initCatalogFilters leaks
// across Webinars 05 (05-catalog), 06 (06-forms), 07 (07-slider), and 08 (08-search).

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = 'content/lessons';

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

function patchFile(filePath, updates) {
  const content = readFileSync(filePath, 'utf-8');
  const parsed = parseMd(content);
  if (!parsed) throw new Error(`Could not parse ${filePath}`);

  for (const [k, v] of Object.entries(updates)) {
    parsed.blocks[k] = v;
  }

  const newContent = rebuildMd(parsed.frontmatter, parsed.description, parsed.blocks);
  writeFileSync(filePath, newContent, 'utf-8');
  console.log(`  ✓ Patched ${filePath}`);
}

// ─── CANONICAL CODE SNIPPETS ──────────────────────────────────────────────────

function buildMainJs(inits, functions) {
  return `// СмартОфис — Скрипт веб-приложения
document.addEventListener('DOMContentLoaded', () => {
  ${inits.join('\n  ')}
});

${functions.join('\n\n')}
`;
}

const LINK_ICON_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

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

// ─── STEP PROGRESSIONS ────────────────────────────────────────────────────────

// Webinar 4 base
const baseW4Inits = ['initNavigation();'];
const baseW4Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV];

// Webinar 5 step 8-12 states
const jsRenderCatalogSkel = `function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
}`;

const jsRenderCatalogMap = `function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => \`
    <div class="room-card">\${room.title}</div>
  \`).join('');
}`;

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

// Webinar 5 step 15-20 states
const jsInitRoomDetailsSkel = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
}`;

const jsInitRoomDetailsParams = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room') || 'focus-1';
}`;

const jsInitRoomDetailsFind = `function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room') || 'focus-1';
  const room = OFFICE_ROOMS.find(r => r.id === roomId);
}`;

const jsInitRoomDetailsNotFound = `function initRoomDetails() {
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
}`;

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

// Base after Webinar 5
const baseW5Inits = ['initNavigation();', 'renderCatalog();', 'initRoomDetails();'];
const baseW5Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_RENDER_CATALOG_FULL, JS_INIT_ROOM_DETAILS_FULL];

// Webinar 6 step 16 (login skeleton + preventDefault)
const jsLoginSkelWithPreventDefault = `function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}`;

const jsLoginValuesOnly = `function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
  });
}`;

// Base after Webinar 6
const baseW6Inits = ['initNavigation();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'];
const baseW6Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_RENDER_CATALOG_FULL, JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];

// Base after Webinar 7
const baseW7Inits = ['initNavigation();', 'initSlider();', 'renderCatalog();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'];
const baseW7Funcs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_INIT_SLIDER_FULL, JS_RENDER_CATALOG_FULL, JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];

console.log('--- Applying targeted logic and continuity fixes ---');

// 1. Fix Webinar 05 practice steps (06 to 20)
const w5Dir = join(CONTENT_DIR, '05-catalog');

// 06, 07: catalog HTML creation
patchFile(join(w5Dir, '06-create-catalog-page.md'), { 'js:start': buildMainJs(baseW4Inits, baseW4Funcs) });
patchFile(join(w5Dir, '07-catalog-container.md'), { 'js:start': buildMainJs(baseW4Inits, baseW4Funcs) });

// 08-12: renderCatalog progressive steps
patchFile(join(w5Dir, '08-render-function-skeleton.md'), {
  'js:start': buildMainJs(baseW4Inits, baseW4Funcs),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogSkel])
});
patchFile(join(w5Dir, '09-array-map.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogSkel]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogMap])
});
patchFile(join(w5Dir, '10-render-card-html.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogMap]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogTemplate])
});
patchFile(join(w5Dir, '11-render-join.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogTemplate]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogTemplate])
});
patchFile(join(w5Dir, '12-render-nested-map.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, jsRenderCatalogTemplate]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL])
});
patchFile(join(w5Dir, '13-update-index-links.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL])
});
patchFile(join(w5Dir, '14-create-details-page.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL])
});

// 15-20: initRoomDetails progressive steps
patchFile(join(w5Dir, '15-details-function-skeleton.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsSkel])
});
patchFile(join(w5Dir, '16-url-search-params.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsSkel]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsParams])
});
patchFile(join(w5Dir, '17-array-find.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsParams]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsFind])
});
patchFile(join(w5Dir, '18-details-not-found.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsFind]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsNotFound])
});
patchFile(join(w5Dir, '19-details-render.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsNotFound]),
  'js:solution': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsRenderNoTernary])
});
patchFile(join(w5Dir, '20-details-ternary.md'), {
  'js:start': buildMainJs([...baseW4Inits, 'renderCatalog();', 'initRoomDetails();'], [...baseW4Funcs, JS_RENDER_CATALOG_FULL, jsInitRoomDetailsRenderNoTernary]),
  'js:solution': buildMainJs(baseW5Inits, baseW5Funcs)
});

// 2. Fix Webinar 06 practice steps (01 to 21)
const w6Dir = join(CONTENT_DIR, '06-forms');

for (const step of [
  '01-create-login-page.md',
  '02-login-html-form.md',
  '03-create-register-page.md',
  '04-register-html-form.md',
  '05-css-form-card.md',
  '06-css-form-inputs.md',
  '07-css-validation-styles.md',
  '08-init-register-skeleton.md',
]) {
  patchFile(join(w6Dir, step), { 'js:start': buildMainJs(baseW5Inits, baseW5Funcs) });
}

// Granular register stages for steps 12-15
const JS_REGISTER_UP_TO_LOOP = `function initRegisterForm() {
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

const JS_REGISTER_UP_TO_PASS_MATCH = `function initRegisterForm() {
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

const JS_REGISTER_UP_TO_TOAST = `function initRegisterForm() {
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

const jsLoginCheckOnly = `function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    if (login === 'admin' && pass === '12345') {
      // success
    } else {
      // error
    }
  });
}`;

const jsLoginSuccessOnly = `function initLoginForm() {
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
      // error
    }
  });
}`;

const baseW5WithRegInits = [...baseW5Inits, 'initRegisterForm();'];

// 13-15: password match, toast, redirect
patchFile(join(w6Dir, '13-password-match.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_REGISTER_UP_TO_LOOP]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_REGISTER_UP_TO_PASS_MATCH])
});
patchFile(join(w6Dir, '14-register-success-toast.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_REGISTER_UP_TO_PASS_MATCH]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_REGISTER_UP_TO_TOAST])
});
patchFile(join(w6Dir, '15-register-redirect.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_REGISTER_UP_TO_TOAST]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL])
});

// 16: login skeleton + preventDefault
patchFile(join(w6Dir, '16-init-login-skeleton.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginSkelWithPreventDefault])
});

// 17: login values
patchFile(join(w6Dir, '17-login-values.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginSkelWithPreventDefault]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginValuesOnly])
});

// 18: login credentials check
patchFile(join(w6Dir, '18-login-credentials-check.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginValuesOnly]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginCheckOnly])
});

// 19: login success & storage
patchFile(join(w6Dir, '19-login-success-storage.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginCheckOnly]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginSuccessOnly])
});

// 20: login error ui
patchFile(join(w6Dir, '20-login-error-ui.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, jsLoginSuccessOnly]),
  'js:solution': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL])
});

// 21: call form functions inside DOMContentLoaded
patchFile(join(w6Dir, '21-call-form-functions.md'), {
  'js:start': buildMainJs(baseW5WithRegInits, [...baseW5Funcs, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL]),
  'js:solution': buildMainJs(baseW6Inits, baseW6Funcs)
});

// 3. Fix Webinar 07 practice steps (01 to 07)
const w7Dir = join(CONTENT_DIR, '07-slider');

for (const step of [
  '01-create-slider-html.md',
  '02-slider-css-container.md',
  '03-slider-css-slides.md',
  '04-slider-css-active.md',
  '05-slider-css-buttons.md',
  '06-slider-css-dots.md',
  '07-init-slider-skeleton.md',
]) {
  patchFile(join(w7Dir, step), { 'js:start': buildMainJs(baseW6Inits, baseW6Funcs) });
}

// 4. Fix Webinar 08 practice steps (03, 04, 20, 21, 22)
const w8Dir = join(CONTENT_DIR, '08-search');

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

const baseW8FilterInits = ['initNavigation();', 'initSlider();', 'initCatalogFilters();', 'initRoomDetails();', 'initRegisterForm();', 'initLoginForm();'];
const baseW8FuncsBeforeFilter = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_INIT_SLIDER_FULL, JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];

patchFile(join(w8Dir, '03-init-filters-skeleton.md'), {
  'js:start': buildMainJs(baseW7Inits, baseW7Funcs),
  'js:solution': buildMainJs(baseW8FilterInits, [...baseW8FuncsBeforeFilter, jsFiltersSkel])
});

patchFile(join(w8Dir, '04-refactor-render.md'), {
  'js:start': buildMainJs(baseW8FilterInits, [...baseW8FuncsBeforeFilter, jsFiltersSkel]),
  'js:solution': buildMainJs(baseW8FilterInits, [...baseW8FuncsBeforeFilter, jsFiltersRender])
});

// Booking calc progressive steps 20, 21, 22
const jsCalcUpdateFuncOnly = `function initBookingCalc() {
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

const jsCalcTotalDom = `function initBookingCalc() {
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

const baseW8FinalFuncs = [JS_SHOW_NOTIFICATION, JS_INIT_NAVIGATION, JS_UPDATE_AUTH_NAV, JS_INIT_SLIDER_FULL, JS_RENDER_CATALOG_FULL.replace('function renderCatalog()', 'function initCatalogFilters()'), JS_INIT_ROOM_DETAILS_FULL, JS_INIT_REGISTER_FORM_FULL, JS_INIT_LOGIN_FORM_FULL];
const baseW8FinalInitsWithCalc = [...baseW8FilterInits, 'initBookingCalc();'];

patchFile(join(w8Dir, '20-update-price-func.md'), {
  'js:solution': buildMainJs(baseW8FinalInitsWithCalc, [...baseW8FinalFuncs, jsCalcUpdateFuncOnly])
});

patchFile(join(w8Dir, '21-calc-total.md'), {
  'js:start': buildMainJs(baseW8FinalInitsWithCalc, [...baseW8FinalFuncs, jsCalcUpdateFuncOnly]),
  'js:solution': buildMainJs(baseW8FinalInitsWithCalc, [...baseW8FinalFuncs, jsCalcTotalDom])
});

patchFile(join(w8Dir, '22-calc-events.md'), {
  'js:start': buildMainJs(baseW8FinalInitsWithCalc, [...baseW8FinalFuncs, jsCalcTotalDom]),
  'js:solution': buildMainJs(baseW8FinalInitsWithCalc, [...baseW8FinalFuncs, jsCalcEvents])
});

console.log('\n✅ All continuity fixes applied successfully!');
