/**
 * codeAnnotator.ts
 * Intelligent line-by-line code annotator for theory code blocks.
 * Analyzes HTML, CSS, and JS lines and returns semantic descriptions,
 * course class explanations, property meanings, and extracted inline comments.
 */

export type LineKind =
  | 'html-doctype'
  | 'html-tag'
  | 'html-close-tag'
  | 'html-attribute'
  | 'html-comment'
  | 'html-text'
  | 'css-selector'
  | 'css-class'
  | 'css-property'
  | 'css-comment'
  | 'css-at-rule'
  | 'js-variable'
  | 'js-function'
  | 'js-arrow'
  | 'js-return'
  | 'js-condition'
  | 'js-loop'
  | 'js-event'
  | 'js-dom-query'
  | 'js-dom-create'
  | 'js-dom-manip'
  | 'js-storage'
  | 'js-timer'
  | 'js-array-method'
  | 'js-comment'
  | 'js-console'
  | 'js-method'
  | 'js-statement';

export interface LineAnnotation {
  badge: string;      // Short badge: "HTML: <div>", "CSS: flex", "JS функция", ".room-card"
  label: string;      // Category label: "HTML тег", "CSS свойство", "JS событие", "Класс"
  detail: string;     // Educational explanation: "display: flex — включает flex-контейнер"
  comment?: string;   // Extracted inline comment from the author if present
  kind: LineKind;
  color: string;      // Theme color for the badge
}

// ─── Course & Semantic Class Dictionary ─────────────────────────────────────────

const COURSE_CLASS_DICTIONARY: Record<string, string> = {
  // Layout & Global
  'container': 'Главный центрирующий контейнер страницы (ограничивает ширину)',
  'grid-container': 'Flexbox/Grid сетка для размещения дочерних карточек',
  'rooms-grid': 'Сетка карточек номеров с переносом строк (flex-wrap)',
  'catalog-toolbar': 'Верхняя панель инструментов каталога (поиск, сортировка)',
  'center-action': 'Блок с кнопкой действия по центру страницы',

  // Header & Nav
  'header': 'Шапка сайта с логотипом и меню навигации',
  'site-header': 'Шапка сайта',
  'logo': 'Логотип сайта или бренда',
  'brand-highlight': 'Цветовое выделение части логотипа/названия',
  'nav': 'Блок навигации по сайту',
  'nav-list': 'Список ссылок меню навигации (ul)',
  'nav-item': 'Пункт навигационного меню (li)',
  'nav-link': 'Ссылка навигации в шапке',
  'active': 'Класс активного/выбранного элемента (подсветка текущей страницы/слайда)',

  // Buttons
  'btn': 'Базовый класс кнопки (размеры, скругление, курсор)',
  'btn-primary': 'Главная акцентная кнопка (синяя заливка)',
  'btn-outline': 'Второстепенная контурная кнопка (прозрачный фон с рамкой)',
  'btn-icon': 'Компактная кнопка с иконкой внутри',

  // Hero Section
  'hero': 'Главный экран первого разворота сайта (Hero-секция)',
  'hero-title': 'Главный заголовок первого экрана (H1)',
  'hero-subtitle': 'Подзаголовок главного экрана с описанием',
  'hero-metrics': 'Блок ключевых числовых показателей (метрик)',
  'metric-item': 'Отдельная карточка метрики/показателя',
  'metric-number': 'Числовое значение показателя',
  'metric-label': 'Подпись к числу метрики',

  // Room Cards
  'card': 'Базовая UI-карточка контента',
  'room-card': 'Карточка номера смарт-офиса',
  'card-img-wrap': 'Ограничивающий контейнер картинки карточки (overflow: hidden)',
  'card-img': 'Изображение номера (object-fit: cover)',
  'card-content': 'Контентная область карточки (текст, описание, удобства)',
  'card-title': 'Заголовок карточки с названием комнаты',
  'card-text': 'Описание номера или карточки',
  'card-equipment': 'Список тегов удобств номера (Wi-Fi, проектор и др.)',
  'equipment-tag': 'Отдельный бейдж удобства',
  'card-footer': 'Нижняя часть карточки (цена и кнопка бронирования)',
  'card-price': 'Блок отображения цены аренды в карточке',
  'card-btns': 'Контейнер кнопок действий в карточке',
  'badge': 'Информационный значок (бейдж)',
  'badge-popular': 'Бейдж «Популярное» для рекомендуемых номеров',

  // Slider
  'slider': 'Контейнер компонента слайдера',
  'slides-wrapper': 'Обертка слайдов для переключения',
  'slide': 'Один слайд с изображением и подписью',
  'slider-btn': 'Кнопка перелистывания слайдера (Назад / Вперед)',
  'prev-btn': 'Кнопка переключения на предыдущий слайд',
  'next-btn': 'Кнопка переключения на следующий слайд',
  'dots-container': 'Контейнер точек-индикаторов слайдов',
  'dot': 'Точка-индикатор отдельного слайда',

  // Forms & Inputs
  'form-card': 'Карточка с формой ввода (вход, регистрация, бронь)',
  'form-group': 'Группа элементов формы: метка + поле ввода + ошибка',
  'form-label': 'Текстовая подпись к полю ввода (label)',
  'form-control': 'Стилизованное поле ввода (input / select / textarea)',
  'form-input': 'Текстовое поле ввода формы',
  'form-select': 'Выпадающий список формы',
  'form-alert': 'Блок системного предупреждения/ошибки внутри формы',
  'error-text': 'Текст сообщения об ошибке валидации',
  'error-message': 'Сообщение об ошибке ввода',
  'search-input': 'Поле поискового запроса',
  'filter-select': 'Селектор фильтрации (по вместимости, цене и т.д.)',

  // Auth & Storage
  'auth-nav': 'Блок авторизации в шапке (кнопка входа или профиль)',
  'auth-user': 'Имя и аватар вошедшего пользователя',
  'user-badge': 'Бейдж с именем пользователя',
  'logout-btn': 'Кнопка выхода из учетной записи',

  // Toast Notifications
  'toast-container': 'Контейнер всплывающих уведомлений в углу экрана',
  'toast': 'Всплывающее уведомление (Toast-сообщение)',
  'toast-success': 'Уведомление об успешном действии (зелёное)',
  'toast-error': 'Уведомление об ошибке (красное)',
  'toast-hide': 'Класс анимации исчезновения уведомления',

  // Bookings & Empty States
  'bookings-list': 'Список забронированных номеров пользователя',
  'booking-item': 'Карточка отдельной брони в списке',
  'calc-summary': 'Сводка стоимости бронирования (часы × тариф)',
  'calc-total': 'Итоговая рассчитанная сумма бронирования',
  'empty-state': 'Блок пустого состояния (когда нет результатов/броней)',
  'empty-state-icon': 'Иконка пустого состояния',
  'empty-state-title': 'Заголовок пустого состояния («Бронирований пока нет»)',
  'empty-state-text': 'Поясняющий текст для пустого экрана',
  'empty-message': 'Сообщение о пустом списке',

  // Footer
  'footer': 'Подвал сайта с контактами и копирайтом',
  'footer-container': 'Контейнер содержимого подвала',
  'footer-info': 'Информационный блок подвала',
  'footer-contacts': 'Блок контактных данных',
};

// ─── CSS Properties Dictionary ──────────────────────────────────────────────────

const CSS_PROP_DICTIONARY: Record<string, { badge: string; desc: string }> = {
  'display': { badge: 'display', desc: 'режим раскладки (flex, block, inline-block, none, grid)' },
  'flex-direction': { badge: 'flex-dir', desc: 'направление главной оси Flexbox (row — ряд, column — колонка)' },
  'justify-content': { badge: 'justify', desc: 'выравнивание элементов по главной оси (center, space-between...)' },
  'align-items': { badge: 'align-items', desc: 'выравнивание элементов по поперечной оси (center, stretch...)' },
  'align-self': { badge: 'align-self', desc: 'индивидуальное выравнивание конкретного flex-элемента' },
  'flex-wrap': { badge: 'flex-wrap', desc: 'перенос flex-элементов на новую строку (wrap / nowrap)' },
  'flex': { badge: 'flex', desc: 'пропорция растяжения и сжатия flex-элемента (flex: 1)' },
  'gap': { badge: 'gap', desc: 'отступ между flex- или grid-элементами' },
  'width': { badge: 'width', desc: 'ширина элемента (px, %, vvw)' },
  'max-width': { badge: 'max-width', desc: 'максимальная ширина (не дает элементу растягиваться шире)' },
  'min-width': { badge: 'min-width', desc: 'минимальная ширина элемента' },
  'height': { badge: 'height', desc: 'высота элемента (px, vh, %)' },
  'max-height': { badge: 'max-height', desc: 'максимальная высота элемента' },
  'min-height': { badge: 'min-height', desc: 'минимальная высота элемента (часто min-height: 100vh)' },
  'padding': { badge: 'padding', desc: 'внутренний отступ от содержимого до границы элемента' },
  'padding-top': { badge: 'pad-top', desc: 'внутренний отступ сверху' },
  'padding-bottom': { badge: 'pad-bot', desc: 'внутренний отступ снизу' },
  'padding-left': { badge: 'pad-left', desc: 'внутренний отступ слева' },
  'padding-right': { badge: 'pad-right', desc: 'внутренний отступ справа' },
  'margin': { badge: 'margin', desc: 'внешний отступ между блоками (margin: 0 auto центрирует)' },
  'margin-top': { badge: 'mar-top', desc: 'внешний отступ сверху' },
  'margin-bottom': { badge: 'mar-bot', desc: 'внешний отступ снизу' },
  'margin-left': { badge: 'mar-left', desc: 'внешний отступ слева' },
  'margin-right': { badge: 'mar-right', desc: 'внешний отступ справа' },
  'background': { badge: 'background', desc: 'цвет фона или фоновое изображение элемента' },
  'background-color': { badge: 'bg-color', desc: 'цвет фона элемента' },
  'color': { badge: 'color', desc: 'цвет текста' },
  'font-size': { badge: 'font-size', desc: 'размер шрифта (px, rem, em)' },
  'font-weight': { badge: 'font-weight', desc: 'жирность шрифта (400 обычный, 600 полужирный, 700 жирный)' },
  'font-family': { badge: 'font-family', desc: 'семейство шрифтов (подключение Inter, sans-serif и др.)' },
  'line-height': { badge: 'line-height', desc: 'межстрочный интервал текста' },
  'letter-spacing': { badge: 'letter-spacing', desc: 'расстояние между буквами текста' },
  'text-align': { badge: 'text-align', desc: 'горизонтальное выравнивание текста (left, center, right)' },
  'text-decoration': { badge: 'text-decor', desc: 'оформление текста (none — убрать подчеркивание у ссылок)' },
  'border': { badge: 'border', desc: 'рамка элемента (толщина, тип линии, цвет: 1px solid #ddd)' },
  'border-radius': { badge: 'border-radius', desc: 'скругление углов блока (в px или %)' },
  'border-color': { badge: 'border-col', desc: 'цвет рамки' },
  'border-top': { badge: 'border-top', desc: 'верхняя рамка' },
  'border-bottom': { badge: 'border-bot', desc: 'нижняя рамка' },
  'border-left': { badge: 'border-left', desc: 'левая рамка' },
  'border-right': { badge: 'border-right', desc: 'правая рамка' },
  'box-shadow': { badge: 'box-shadow', desc: 'тень элемента (смещение X, Y, размытие, цвет)' },
  'box-sizing': { badge: 'box-sizing', desc: 'расчет размеров: border-box включает padding и border в ширину' },
  'overflow': { badge: 'overflow', desc: 'поведение при переполнении: hidden обрезает выходящий контент' },
  'overflow-x': { badge: 'overflow-x', desc: 'горизонтальная прокрутка или обрезка' },
  'overflow-y': { badge: 'overflow-y', desc: 'вертикальная прокрутка (auto) или обрезка' },
  'object-fit': { badge: 'object-fit', desc: 'подгонка изображения: cover заполняет блок без искажения пропорций' },
  'object-position': { badge: 'object-pos', desc: 'позиционирование изображения внутри блока' },
  'position': { badge: 'position', desc: 'тип позиционирования: relative (относительное), absolute (абсолютное), fixed' },
  'top': { badge: 'top', desc: 'смещение позиционированного элемента сверху' },
  'bottom': { badge: 'bottom', desc: 'смещение позиционированного элемента снизу' },
  'left': { badge: 'left', desc: 'смещение позиционированного элемента слева' },
  'right': { badge: 'right', desc: 'смещение позиционированного элемента справа' },
  'z-index': { badge: 'z-index', desc: 'порядок наложения слоев по оси Z (выше число — слой ближе к зрителю)' },
  'opacity': { badge: 'opacity', desc: 'прозрачность элемента (от 0 полностью прозрачный до 1 непрозрачный)' },
  'transition': { badge: 'transition', desc: 'плавный переход свойств при анимации/hover (например, all 0.3s ease)' },
  'transform': { badge: 'transform', desc: 'трансформация элемента: translateY(-4px), scale(1.05)' },
  'cursor': { badge: 'cursor', desc: 'вид курсора мыши: pointer показывает «палец» при наведении' },
  'list-style': { badge: 'list-style', desc: 'маркер списка: none убирает стандартные точки у ul' },
  'pointer-events': { badge: 'pointer-events', desc: 'реакция элемента на события мыши (none отключает клики)' },
};

// ─── HTML Tags Dictionary ───────────────────────────────────────────────────────

const HTML_TAG_DICTIONARY: Record<string, { badge: string; desc: string; category: string }> = {
  'html': { badge: '<html>', desc: 'корневой тег страницы, внутри которого находится весь документ', category: 'структура' },
  'head': { badge: '<head>', desc: '«невидимая голова» страницы: настройки, мета-теги, подключение стилей', category: 'мета' },
  'body': { badge: '<body>', desc: 'видимое тело страницы: все элементы, которые отображаются пользователю', category: 'структура' },
  'meta': { badge: '<meta>', desc: 'мета-информация страницы (кодировка utf-8, адаптивность viewport)', category: 'мета' },
  'title': { badge: '<title>', desc: 'заголовок вкладки страницы в браузере', category: 'мета' },
  'link': { badge: '<link>', desc: 'подключение внешних ресурсов: CSS-файлов, веб-шрифтов Google Fonts, фавиконки', category: 'мета' },
  'script': { badge: '<script>', desc: 'подключение JavaScript-файла к странице', category: 'скрипт' },
  'style': { badge: '<style>', desc: 'блок встроенных CSS-стилей внутри HTML', category: 'стили' },
  'header': { badge: '<header>', desc: 'семантическая шапка сайта (логотип, навигация, кнопка входа)', category: 'структура' },
  'nav': { badge: '<nav>', desc: 'семантический блок навигации со ссылками меню', category: 'структура' },
  'main': { badge: '<main>', desc: 'основное уникальное содержимое страницы', category: 'структура' },
  'section': { badge: '<section>', desc: 'тематический раздел страницы (секция каталога, отзывов и др.)', category: 'структура' },
  'article': { badge: '<article>', desc: 'самостоятельный блок контента (карточка, статья, новость)', category: 'структура' },
  'footer': { badge: '<footer>', desc: 'семантический подвал сайта (копирайт, контакты, ссылки)', category: 'структура' },
  'div': { badge: '<div>', desc: 'универсальный блочный контейнер для группировки и стилизации', category: 'структура' },
  'span': { badge: '<span>', desc: 'строчный элемент для стилизации фрагмента текста внутри строки', category: 'контент' },
  'h1': { badge: '<h1>', desc: 'главный заголовок первого уровня (должен быть один на странице)', category: 'заголовок' },
  'h2': { badge: '<h2>', desc: 'заголовок второго уровня (название секции сайта)', category: 'заголовок' },
  'h3': { badge: '<h3>', desc: 'заголовок третьего уровня (название карточки, подраздела)', category: 'заголовок' },
  'h4': { badge: '<h4>', desc: 'заголовок четвертого уровня', category: 'заголовок' },
  'p': { badge: '<p>', desc: 'абзац текста с автоматическими вертикальными отступами', category: 'контент' },
  'ul': { badge: '<ul>', desc: 'маркированный список (список пунктов меню, удобств и др.)', category: 'список' },
  'ol': { badge: '<ol>', desc: 'нумерованный список по порядку', category: 'список' },
  'li': { badge: '<li>', desc: 'отдельный пункт списка внутри ul или ol', category: 'список' },
  'a': { badge: '<a>', desc: 'гиперссылка для перехода на другую страницу или якорь (атрибут href)', category: 'ссылка' },
  'img': { badge: '<img>', desc: 'вставка изображения на страницу (атрибуты src и alt)', category: 'медиа' },
  'button': { badge: '<button>', desc: 'интерактивная кнопка для кликов и отправки действий', category: 'форма' },
  'form': { badge: '<form>', desc: 'форма сбора данных от пользователя для отправки или обработки в JS', category: 'форма' },
  'input': { badge: '<input>', desc: 'однострочное поле ввода (type="text", "email", "password" и др.)', category: 'форма' },
  'label': { badge: '<label>', desc: 'текстовая подпись к полю формы (связывается через for или вложенность)', category: 'форма' },
  'select': { badge: '<select>', desc: 'выпадающий список вариантов для выбора пользователем', category: 'форма' },
  'option': { badge: '<option>', desc: 'пункт выбора внутри выпадающего списка select', category: 'форма' },
  'textarea': { badge: '<textarea>', desc: 'многострочное поле текстового ввода', category: 'форма' },
};

// ─── Comment Extraction Helper ──────────────────────────────────────────────────

function extractComment(line: string): { cleanLine: string; comment?: string } {
  // HTML comment <!-- ... -->
  const htmlMatch = /<!--\s*(.*?)\s*-->/.exec(line);
  if (htmlMatch) {
    return {
      cleanLine: line.replace(/<!--\s*.*?\s*-->/, '').trim(),
      comment: htmlMatch[1],
    };
  }

  // CSS comment /* ... */
  const cssMatch = /\/\*\s*(.*?)\s*\*\//.exec(line);
  if (cssMatch) {
    return {
      cleanLine: line.replace(/\/\*\s*.*?\s*\*\//, '').trim(),
      comment: cssMatch[1],
    };
  }

  // JS line comment // ...
  const jsMatch = /\/\/\s*(.*)$/.exec(line);
  if (jsMatch) {
    return {
      cleanLine: line.replace(/\/\/\s*.*$/, '').trim(),
      comment: jsMatch[1],
    };
  }

  return { cleanLine: line.trim() };
}

// ─── Main Annotate Function ─────────────────────────────────────────────────────

export function annotateCodeLine(rawLine: string, lang: string): LineAnnotation | null {
  const line = rawLine.trim();
  if (!line || line === '{' || line === '}' || line === '});' || line === '})' || line === ');' || line === '};') {
    return null;
  }

  const { cleanLine, comment } = extractComment(rawLine);
  const normalizedLang = lang.toLowerCase();

  // 1. HTML Handling
  if (normalizedLang === 'html') {
    // Pure Comment line
    if (/^\s*<!--.*-->\s*$/.test(rawLine)) {
      return {
        badge: 'HTML <!-- -->',
        label: 'HTML комментарий',
        detail: comment || 'Поясняющий комментарий разработчика в разметке',
        comment,
        kind: 'html-comment',
        color: '#6b7280',
      };
    }

    // DOCTYPE
    if (/<!DOCTYPE\s+html>/i.test(line)) {
      return {
        badge: 'DOCTYPE',
        label: 'Объявление HTML5',
        detail: comment || '<!DOCTYPE html> сообщает браузеру, что документ написан по современному стандарту HTML5',
        comment,
        kind: 'html-doctype',
        color: '#38bdf8',
      };
    }

    // Close Tag </tag>
    const closeMatch = /<\/([a-zA-Z0-9-]+)>/.exec(line);
    if (closeMatch && !/<[a-zA-Z0-9-]+[^>]*>.*<\/[a-zA-Z0-9-]+>/.test(line)) {
      const tagName = closeMatch[1].toLowerCase();
      const tagInfo = HTML_TAG_DICTIONARY[tagName];
      return {
        badge: `</${tagName}>`,
        label: 'Закрывающий тег',
        detail: `Закрывает элемент <${tagName}>${tagInfo ? ` (${tagInfo.desc})` : ''}`,
        comment,
        kind: 'html-close-tag',
        color: '#94a3b8',
      };
    }

    // Open or Self-Closing Tag <tag>
    const tagMatch = /<([a-zA-Z0-9-]+)([^>]*)>/.exec(line);
    if (tagMatch) {
      const tagName = tagMatch[1].toLowerCase();
      const tagAttrs = tagMatch[2];
      const tagInfo = HTML_TAG_DICTIONARY[tagName];

      // Check if tag has class="room-card" or id="..."
      let classDetail = '';
      const classMatch = /class=["']([^"']+)["']/.exec(tagAttrs);
      if (classMatch) {
        const firstClass = classMatch[1].split(' ')[0];
        if (COURSE_CLASS_DICTIONARY[firstClass]) {
          classDetail = ` • класс .${firstClass}: ${COURSE_CLASS_DICTIONARY[firstClass]}`;
        }
      }

      return {
        badge: `<${tagName}>`,
        label: tagInfo ? `HTML ${tagInfo.category}` : 'HTML тег',
        detail: comment || `${tagInfo ? tagInfo.desc : `Тег <${tagName}>`}${classDetail}`,
        comment,
        kind: 'html-tag',
        color: '#f472b6',
      };
    }

    // Multi-line Tag opening: e.g. "<input"
    const openTagStartMatch = /^<([a-zA-Z0-9-]+)\s*$/.exec(line);
    if (openTagStartMatch) {
      const tagName = openTagStartMatch[1].toLowerCase();
      const tagInfo = HTML_TAG_DICTIONARY[tagName];
      return {
        badge: `<${tagName}`,
        label: 'Открытие тега',
        detail: comment || `Начало тега <${tagName}>${tagInfo ? `: ${tagInfo.desc}` : ''}`,
        comment,
        kind: 'html-tag',
        color: '#f472b6',
      };
    }

    // Multi-line Tag closing bracket: ">" or "/>"
    if (/^\/?>\s*$/.test(line)) {
      return {
        badge: 'HTML >',
        label: 'Закрытие тега',
        detail: comment || 'Завершение открывающего тега',
        comment,
        kind: 'html-tag',
        color: '#94a3b8',
      };
    }

    // Multi-line Attribute: e.g. type="text", placeholder="...", required
    const attrMatch = /^([a-zA-Z0-9_-]+)(?:=["']([^"']*)["'])?\s*>?$/.exec(line);
    if (attrMatch) {
      const attr = attrMatch[1];
      const val = attrMatch[2];
      return {
        badge: `attr: ${attr}`,
        label: 'HTML атрибут',
        detail: comment || (val !== undefined ? `Атрибут ${attr}="${val}"` : `Логический атрибут ${attr}`),
        comment,
        kind: 'html-attribute',
        color: '#a78bfa',
      };
    }

    // Plain text content inside HTML (longer text without brackets)
    if (/^[А-Яа-яЁёA-Za-z0-9\s.,!?:«»()—-]{3,}$/.test(line) && !line.includes('{') && !line.includes(';')) {
      return {
        badge: 'HTML текст',
        label: 'Текст элемента',
        detail: comment || `Текстовое содержимое: «${line.slice(0, 45)}${line.length > 45 ? '…' : ''}»`,
        comment,
        kind: 'html-text',
        color: '#e2e8f0',
      };
    }
  }

  // 2. CSS Handling
  if (normalizedLang === 'css') {
    // Pure Comment line
    if (/^\s*\/\*.*?\*\/\s*$/.test(rawLine)) {
      return {
        badge: 'CSS /* */',
        label: 'CSS комментарий',
        detail: comment || 'Поясняющий комментарий к стилям',
        comment,
        kind: 'css-comment',
        color: '#6b7280',
      };
    }

    // CSS Property: e.g. "display: flex;"
    const propMatch = /^\s*([a-zA-Z-]+)\s*:\s*([^;]+);?/.exec(cleanLine || line);
    if (propMatch) {
      const prop = propMatch[1].toLowerCase();
      const val = propMatch[2].trim();
      const propInfo = CSS_PROP_DICTIONARY[prop];

      let smartDetail = comment;
      if (!smartDetail) {
        if (prop === 'display' && val === 'flex') {
          smartDetail = 'Включает Flexbox-контейнер: дочерние элементы выстраиваются в ряд';
        } else if (prop === 'justify-content') {
          smartDetail = `Выравнивание по главной оси: ${val}`;
        } else if (prop === 'align-items') {
          smartDetail = `Выравнивание по поперечной оси: ${val}`;
        } else if (prop === 'overflow' && val === 'hidden') {
          smartDetail = 'Обрезает контент, выходящий за границы блока';
        } else if (prop === 'object-fit' && val === 'cover') {
          smartDetail = 'Масштабирует картинку с сохранением пропорций, заполняя блок целиком';
        } else if (propInfo) {
          smartDetail = `${prop}: ${val} — ${propInfo.desc}`;
        } else {
          smartDetail = `CSS свойство ${prop} со значением ${val}`;
        }
      }

      return {
        badge: propInfo ? `CSS: ${propInfo.badge}` : `CSS: ${prop}`,
        label: 'CSS свойство',
        detail: smartDetail,
        comment,
        kind: 'css-property',
        color: '#a78bfa',
      };
    }

    // CSS At-Rule: @import, @media, @keyframes
    if (/^@/.test(line)) {
      return {
        badge: 'CSS @правило',
        label: 'CSS директива',
        detail: comment || line.startsWith('@media') ? 'Медиа-запрос для адаптивной верстки' : 'Специальное правило CSS',
        comment,
        kind: 'css-at-rule',
        color: '#38bdf8',
      };
    }

    // CSS Selector (e.g. .room-card {, .btn:hover {, h1 {)
    if (/[{,]$/.test(cleanLine || line) || /^[.#a-zA-Z]/.test(cleanLine || line)) {
      const selectorClean = (cleanLine || line).replace(/[{,]/g, '').trim();

      // Check if it's a class selector: .class-name
      const classMatch = /^\.([a-zA-Z0-9_-]+)/.exec(selectorClean);
      if (classMatch) {
        const className = classMatch[1];
        const classExplanation = COURSE_CLASS_DICTIONARY[className];
        return {
          badge: `.${className}`,
          label: 'CSS класс',
          detail: comment || (classExplanation ? `.${className} — ${classExplanation}` : `Селектор класса .${className}`),
          comment,
          kind: 'css-class',
          color: '#38bdf8',
        };
      }

      // Check tag selector: e.g. body {, p {, h1 {
      const tagMatch = /^([a-zA-Z0-9]+)/.exec(selectorClean);
      if (tagMatch && HTML_TAG_DICTIONARY[tagMatch[1].toLowerCase()]) {
        const t = tagMatch[1].toLowerCase();
        return {
          badge: t,
          label: 'CSS селектор тега',
          detail: comment || `Стилизует все теги <${t}> на странице (${HTML_TAG_DICTIONARY[t].desc})`,
          comment,
          kind: 'css-selector',
          color: '#38bdf8',
        };
      }

      return {
        badge: selectorClean.slice(0, 16),
        label: 'CSS селектор',
        detail: comment || `CSS селектор: ${selectorClean}`,
        comment,
        kind: 'css-selector',
        color: '#38bdf8',
      };
    }
  }

  // 3. JavaScript Handling
  if (normalizedLang === 'js' || normalizedLang === 'javascript' || normalizedLang === 'ts' || normalizedLang === 'typescript') {
    // Pure Comment line
    if (/^\s*(\/\/|\/\*)/.test(rawLine)) {
      return {
        badge: 'JS //',
        label: 'JS комментарий',
        detail: comment || 'Поясняющий комментарий к логике кода',
        comment,
        kind: 'js-comment',
        color: '#6b7280',
      };
    }

    // Event Listener: e.g. element.addEventListener('click', ...)
    if (/\.addEventListener\s*\(/.test(cleanLine || line)) {
      const evMatch = /addEventListener\s*\(\s*['"]([a-zA-Z0-9_-]+)['"]/.exec(cleanLine || line);
      const evName = evMatch ? evMatch[1] : 'event';
      const evDesc: Record<string, string> = {
        'click': 'клик мышью по элементу',
        'submit': 'отправка формы пользователем',
        'input': 'ввод символа в текстовое поле',
        'change': 'изменение выбранного значения (например, в select)',
        'DOMContentLoaded': 'завершение построения DOM-дерева браузером',
      };
      return {
        badge: `JS событие: ${evName}`,
        label: 'Слушатель события',
        detail: comment || `addEventListener('${evName}') — подписка на ${evDesc[evName] || `событие "${evName}"`}`,
        comment,
        kind: 'js-event',
        color: '#fcd34d',
      };
    }

    // DOM Query: document.querySelector or querySelectorAll
    if (/document\.(querySelector|querySelectorAll|getElementById)/.test(cleanLine || line)) {
      const isAll = /\.querySelectorAll/.test(cleanLine || line);
      const selMatch = /querySelector(?:All)?\s*\(\s*['"]([^'"]+)['"]/.exec(cleanLine || line);
      const sel = selMatch ? selMatch[1] : '';
      return {
        badge: isAll ? 'JS DOM: все' : 'JS DOM: поиск',
        label: 'DOM запрос',
        detail: comment || (isAll
          ? `Находит ВСЕ элементы по селектору "${sel}" и возвращает коллекцию (NodeList)`
          : `Находит ПЕРВЫЙ элемент по селектору "${sel}" на странице`),
        comment,
        kind: 'js-dom-query',
        color: '#60a5fa',
      };
    }

    // DOM Creation: document.createElement
    if (/document\.createElement\s*\(/.test(cleanLine || line)) {
      const tagMatch = /createElement\s*\(\s*['"]([a-zA-Z0-9-]+)['"]/.exec(cleanLine || line);
      const tag = tagMatch ? tagMatch[1] : 'element';
      return {
        badge: `JS: <${tag}>`,
        label: 'DOM создание',
        detail: comment || `Создает новый HTML-элемент <${tag}> в оперативной памяти`,
        comment,
        kind: 'js-dom-create',
        color: '#4ade80',
      };
    }

    // DOM Append / Remove
    if (/\.(appendChild|append|remove\(\)|removeChild)/.test(cleanLine || line)) {
      const isRemove = /\.remove/.test(cleanLine || line);
      return {
        badge: isRemove ? 'JS DOM: удалить' : 'JS DOM: вставка',
        label: isRemove ? 'DOM удаление' : 'DOM вставка',
        detail: comment || (isRemove ? 'Удаляет элемент из DOM-дерева страницы' : 'Вставляет дочерний элемент в структуру страницы'),
        comment,
        kind: 'js-dom-manip',
        color: '#4ade80',
      };
    }

    // DOM Relative Insertion: input.after(errorEl), before()
    if (/\.(after|before|prepend)\s*\(/.test(cleanLine || line)) {
      return {
        badge: 'DOM вставка',
        label: 'Вставка в DOM',
        detail: comment || 'Вставляет новый элемент в DOM рядом с указанным узлом',
        comment,
        kind: 'js-dom-manip',
        color: '#4ade80',
      };
    }

    // DOM Style assignment: element.style.display = 'none', toast.style.opacity = '0'
    const stylePropMatch = /^\s*([a-zA-Z0-9_$.]+)\.style\.([a-zA-Z0-9]+)\s*=\s*(.*)$/.exec(cleanLine || line);
    if (stylePropMatch) {
      const prop = stylePropMatch[2];
      const val = stylePropMatch[3].replace(/;$/, '').trim();
      return {
        badge: `style.${prop}`,
        label: 'CSS стиль через JS',
        detail: comment || `Динамически изменяет inline-стиль .${prop} = ${val}`,
        comment,
        kind: 'js-dom-manip',
        color: '#a78bfa',
      };
    }

    // DOM Property assignment: textContent, innerHTML, className, id, value, href, onclick
    const domPropMatch = /^\s*([a-zA-Z0-9_$.]+)\.(className|id|textContent|innerHTML|value|href|onclick)\s*=\s*(.*)$/.exec(cleanLine || line);
    if (domPropMatch) {
      const prop = domPropMatch[2];
      const val = domPropMatch[3].replace(/;$/, '').trim();
      const propDescriptions: Record<string, string> = {
        'className': 'установка CSS-классов элемента',
        'id': 'установка уникального ID элемента',
        'textContent': 'запись текстового содержимого в элемент',
        'innerHTML': 'вставка HTML-разметки внутрь элемента',
        'value': 'установка значения поля ввода',
        'href': 'установка адреса перехода ссылки',
        'onclick': 'назначение обработчика клика мыши',
      };
      return {
        badge: `.${prop}`,
        label: 'Свойство DOM',
        detail: comment || (propDescriptions[prop] ? `${propDescriptions[prop]}: ${val}` : `Установка .${prop} = ${val}`),
        comment,
        kind: 'js-dom-manip',
        color: '#38bdf8',
      };
    }

    // classList manipulation: classList.add / remove / toggle
    if (/\.classList\.(add|remove|toggle|contains)/.test(cleanLine || line)) {
      const actionMatch = /\.classList\.(add|remove|toggle|contains)\s*\(\s*['"]([^'"]+)['"]/.exec(cleanLine || line);
      const action = actionMatch ? actionMatch[1] : 'classList';
      const cls = actionMatch ? actionMatch[2] : '';
      const actionText: Record<string, string> = {
        'add': `добавляет CSS-класс "${cls}" элементу`,
        'remove': `удаляет CSS-класс "${cls}" у элемента`,
        'toggle': `переключает CSS-класс "${cls}" (включает/выключает)`,
        'contains': `проверяет наличие CSS-класса "${cls}"`,
      };
      return {
        badge: `classList.${action}`,
        label: 'Управление классами',
        detail: comment || (actionText[action] || `Операция с classList: ${action}`),
        comment,
        kind: 'js-dom-manip',
        color: '#38bdf8',
      };
    }

    // Storage: localStorage.getItem / setItem / removeItem
    if (/localStorage\.(getItem|setItem|removeItem|clear)/.test(cleanLine || line)) {
      const isSet = /\.setItem/.test(cleanLine || line);
      const isGet = /\.getItem/.test(cleanLine || line);
      return {
        badge: isSet ? 'localStorage: запись' : isGet ? 'localStorage: чтение' : 'localStorage',
        label: 'Хранилище браузера',
        detail: comment || (isSet
          ? 'Сохраняет данные в постоянное хранилище браузера (не стирается при перезагрузке)'
          : 'Считывает сохраненные данные из памяти браузера'),
        comment,
        kind: 'js-storage',
        color: '#fb923c',
      };
    }

    // Timers: setTimeout / setInterval / clearTimeout / clearInterval
    if (/(setTimeout|setInterval|clearTimeout|clearInterval)\s*\(/.test(cleanLine || line)) {
      const isInterval = /setInterval/.test(cleanLine || line);
      return {
        badge: isInterval ? 'JS setInterval' : 'JS setTimeout',
        label: 'Таймер JS',
        detail: comment || (isInterval
          ? 'Периодически повторяет вызов функции через заданный интервал миллисекунд'
          : 'Вызывает функцию один раз с задержкой по таймеру'),
        comment,
        kind: 'js-timer',
        color: '#fb923c',
      };
    }

    // Timer delay argument: e.g. "}, 500);" or "}, 3500);"
    const timerDelayMatch = /^\s*\},?\s*(\d+)\s*\);?$/.exec(cleanLine || line);
    if (timerDelayMatch) {
      const ms = timerDelayMatch[1];
      return {
        badge: `${ms} мс`,
        label: 'Задержка таймера',
        detail: comment || `Время задержки таймера: ${ms} миллисекунд (${Number(ms) / 1000} сек)`,
        comment,
        kind: 'js-timer',
        color: '#fb923c',
      };
    }

    // Array methods: .map, .filter, .find, .forEach, .sort
    if (/\.(map|filter|find|forEach|sort|reduce|some|every)\s*\(/.test(cleanLine || line)) {
      const mMatch = /\.(map|filter|find|forEach|sort|reduce|some|every)\s*\(/.exec(cleanLine || line);
      const mName = mMatch ? mMatch[1] : 'arrayMethod';
      const mDesc: Record<string, string> = {
        'map': 'преобразует каждый элемент массива и создает новый массив такой же длины',
        'filter': 'фильтрует массив, оставляя только элементы, подходящие под условие',
        'find': 'находит и возвращает первый подходящий элемент массива',
        'forEach': 'выполняет указанное действие для каждого элемента массива',
        'sort': 'сортирует элементы массива по заданному правилу',
      };
      return {
        badge: `Array.${mName}()`,
        label: 'Метод массива',
        detail: comment || (mDesc[mName] || `Вызов метода массива .${mName}()`),
        comment,
        kind: 'js-array-method',
        color: '#a78bfa',
      };
    }

    // Window redirection: window.location.href = ...
    if (/window\.location(\.href)?\s*=/.test(cleanLine || line)) {
      return {
        badge: 'location.href',
        label: 'Редирект',
        detail: comment || 'Перенаправляет браузер на другую страницу сайта',
        comment,
        kind: 'js-statement',
        color: '#38bdf8',
      };
    }

    // Alert notification: alert('...')
    if (/^\s*alert\s*\(/.test(cleanLine || line)) {
      return {
        badge: 'alert()',
        label: 'Уведомление',
        detail: comment || 'Показывает системное всплывающее сообщение браузера',
        comment,
        kind: 'js-statement',
        color: '#fcd34d',
      };
    }

    // Prevent Default: e.preventDefault()
    if (/preventDefault\s*\(/.test(cleanLine || line)) {
      return {
        badge: 'preventDefault',
        label: 'Отмена поведения',
        detail: comment || 'Отменяет стандартное поведение браузера (например, перезагрузку страницы при submit формы)',
        comment,
        kind: 'js-statement',
        color: '#f87171',
      };
    }

    // Nested object property: e.g. equipment: {
    const nestedObjMatch = /^\s*([a-zA-Z0-9_$]+)\s*:\s*\{/.exec(cleanLine || line);
    if (nestedObjMatch) {
      const k = nestedObjMatch[1];
      return {
        badge: `${k}: { }`,
        label: 'Вложенный объект',
        detail: comment || `Вложенный объект со свойствами «${k}»`,
        comment,
        kind: 'js-statement',
        color: '#e2e8f0',
      };
    }

    // HTML template string inside JS (e.g. inside .map() return `<div>...</div>`)
    if (/^\s*<\/?[a-zA-Z0-9-]+/.test(cleanLine || line) || /^\s*<[a-zA-Z0-9-]+[^>]*>.*<\/[a-zA-Z0-9-]+>/.test(cleanLine || line)) {
      return {
        badge: 'HTML шаблон',
        label: 'Шаблонная строка',
        detail: comment || 'HTML-разметка внутри шаблонной строки JavaScript (`...`)',
        comment,
        kind: 'html-tag',
        color: '#f472b6',
      };
    }

    // Template join chaining: e.g. `).join('');
    if (/\.join\s*\(/.test(cleanLine || line)) {
      return {
        badge: '.join()',
        label: 'Метод массива',
        detail: comment || 'Объединяет элементы массива строк в одну сплошную HTML-строку',
        comment,
        kind: 'js-array-method',
        color: '#a78bfa',
      };
    }

    // URLSearchParams
    if (/new\s+URLSearchParams/.test(cleanLine || line)) {
      return {
        badge: 'URLSearchParams',
        label: 'Параметры URL',
        detail: comment || 'Считывает параметры запроса из адресной строки (например, ?id=5)',
        comment,
        kind: 'js-statement',
        color: '#38bdf8',
      };
    }

    // JSON.stringify / JSON.parse
    if (/JSON\.(stringify|parse)/.test(cleanLine || line)) {
      const isParse = /JSON\.parse/.test(cleanLine || line);
      return {
        badge: isParse ? 'JSON.parse' : 'JSON.stringify',
        label: 'Работа с JSON',
        detail: comment || (isParse
          ? 'Преобразует строку формата JSON обратно в объект JavaScript'
          : 'Преобразует объект JavaScript в текстовую строку JSON для хранения'),
        comment,
        kind: 'js-statement',
        color: '#a78bfa',
      };
    }

    // Variable Declaration: const, let, var
    const varMatch = /^\s*(const|let|var)\s+([a-zA-Z0-9_$]+)/.exec(cleanLine || line);
    if (varMatch) {
      const keyword = varMatch[1];
      const varName = varMatch[2];
      const isFunction = /=\s*(function|\([^)]*\)\s*=>)/.test(cleanLine || line);
      if (isFunction) {
        return {
          badge: `fn: ${varName}`,
          label: 'JS функция',
          detail: comment || `Объявление стрелочной функции ${varName}`,
          comment,
          kind: 'js-function',
          color: '#4ade80',
        };
      }
      return {
        badge: `${keyword} ${varName}`,
        label: keyword === 'const' ? 'Константа' : 'Переменная',
        detail: comment || `Объявление ${keyword === 'const' ? 'неизменяемой константы' : 'переменной'} ${varName}`,
        comment,
        kind: 'js-variable',
        color: '#e2e8f0',
      };
    }

    // Function Declaration: function name(...)
    const fnMatch = /^\s*function\s+([a-zA-Z0-9_$]+)/.exec(cleanLine || line);
    if (fnMatch) {
      const fnName = fnMatch[1];
      return {
        badge: `fn: ${fnName}()`,
        label: 'JS функция',
        detail: comment || `Объявление именованной функции ${fnName}`,
        comment,
        kind: 'js-function',
        color: '#4ade80',
      };
    }

    // Return statement
    if (/^\s*return\b/.test(cleanLine || line)) {
      return {
        badge: 'return',
        label: 'Возврат значения',
        detail: comment || 'Завершает выполнение функции и возвращает результат',
        comment,
        kind: 'js-return',
        color: '#a78bfa',
      };
    }

    // Condition: if, else if, else
    if (/^\s*(if\b|else\s+if\b|else\b|\}\s*else)/.test(cleanLine || line)) {
      const isElseIf = /else\s+if/.test(cleanLine || line);
      const isElse = !isElseIf && /else/.test(cleanLine || line);
      return {
        badge: isElseIf ? 'else if' : isElse ? 'else' : 'if ()',
        label: 'Условный оператор',
        detail: comment || (isElseIf
          ? 'Ветка else if: проверка дополнительного условия'
          : isElse
          ? 'Ветка else: выполняется, когда условие if оказалось ложным'
          : 'Проверяет логическое условие и выполняет нужную ветку кода'),
        comment,
        kind: 'js-condition',
        color: '#38bdf8',
      };
    }

    // Loop: for, while
    if (/^\s*(for|while)\b/.test(cleanLine || line)) {
      return {
        badge: 'JS цикл',
        label: 'Цикл',
        detail: comment || 'Цикл повторения блока инструкций',
        comment,
        kind: 'js-loop',
        color: '#38bdf8',
      };
    }

    // Console: console.log
    if (/^\s*console\.(log|warn|error|info)/.test(cleanLine || line)) {
      return {
        badge: 'console.log',
        label: 'Вывод в консоль',
        detail: comment || 'Выводит отладочную информацию в панель разработчика браузера (F12)',
        comment,
        kind: 'js-console',
        color: '#94a3b8',
      };
    }

    // Standalone function call: funcName();
    const callMatch = /^\s*([a-zA-Z0-9_$]+)\s*\([^)]*\);?\s*$/.exec(cleanLine || line);
    if (callMatch) {
      const fn = callMatch[1];
      return {
        badge: `${fn}()`,
        label: 'Вызов функции',
        detail: comment || `Вызов функции ${fn}()`,
        comment,
        kind: 'js-statement',
        color: '#4ade80',
      };
    }

    // Object property: name: 'Focus', price: 450,
    const objPropMatch = /^\s*([a-zA-Z0-9_$]+)\s*:\s*([^,{]+),?$/.exec(cleanLine || line);
    if (objPropMatch) {
      const k = objPropMatch[1];
      const v = objPropMatch[2].trim();
      return {
        badge: `${k}:`,
        label: 'Свойство объекта',
        detail: comment || `Поле объекта "${k}" со значением ${v}`,
        comment,
        kind: 'js-statement',
        color: '#e2e8f0',
      };
    }

    // Array item literal: { id: 1, name: '...', price: 450 },
    if (/^\s*\{\s*[a-zA-Z0-9_$]+\s*:/.test(cleanLine || line)) {
      return {
        badge: '{ объект }',
        label: 'Элемент массива',
        detail: comment || 'Объект с данными записи в массиве',
        comment,
        kind: 'js-statement',
        color: '#a78bfa',
      };
    }

    // Closing array bracket: ];
    if (/^\s*\];?\s*$/.test(cleanLine || line)) {
      return {
        badge: '];',
        label: 'Конец массива',
        detail: comment || 'Закрывающая квадратная скобка массива',
        comment,
        kind: 'js-statement',
        color: '#94a3b8',
      };
    }

    // Logic condition check expressions: e.g. room.name.includes(...) or (href === ...)
    if (/(===|!==|&&|\|\||\.includes\(|\.toLowerCase\()/.test(cleanLine || line)) {
      return {
        badge: 'JS логика',
        label: 'Проверка условия',
        detail: comment || 'Логическое выражение для фильтрации или сравнения значений',
        comment,
        kind: 'js-condition',
        color: '#38bdf8',
      };
    }
  }

  // Fallback: If there's an author comment on the line, return it!
  if (comment) {
    return {
      badge: 'Пояснение',
      label: 'Комментарий',
      detail: comment,
      comment,
      kind: 'js-comment',
      color: '#6b7280',
    };
  }

  return null;
}
