# Детальный план: Теория + Практика по каждому вебинару

---

## Вебинар 01 — Вводное занятие (`01-intro`)
**Тема:** HTML + CSS с нуля  
**Структура:** только теория, без практики (нет проекта)

### 📖 Теория (10 шагов — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-welcome.md` | Добро пожаловать в мир веба! |
| 2 | `02-what-is-html.md` | Что такое HTML? Понятие тега |
| 3 | `03-first-tag.md` | Пишем первый тег |
| 4 | `04-paragraphs.md` | Абзацы текста |
| 5 | `05-lists.md` | Маркированные списки |
| 6 | `06-links.md` | Ссылки и атрибуты |
| 7 | `07-images.md` | Картинки |
| 8 | `08-html-structure.md` | Базовая структура документа |
| 9 | `09-what-is-css.md` | Что такое CSS? |
| 10 | `10-css-selectors.md` | CSS-селекторы |

### 🔧 Практика (0 шагов)
*Практики нет — это вводный вебинар*

---

## Вебинар 02 — Разметка сайта (`02-markup`)
**Тема:** HTML-скелет и базовые CSS-стили СмартОфис  
**Структура:** 6 теория + 24 практика

### 📖 Теория (6 шагов — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-doctype.md` | DOCTYPE и структура HTML-документа | `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` — роль каждого | Голый `<!DOCTYPE html>` с пустым body |
| 2 | `00-theory-02-head.md` | Тег `<head>` и мета-теги | charset, viewport, description, title — зачем каждый | head с 3-4 мета-тегами |
| 3 | `00-theory-03-fonts.md` | Подключение шрифтов Google Fonts | `<link rel="preconnect">`, font-family в CSS | Страница с кастомным шрифтом |
| 4 | `00-theory-04-css-link.md` | Подключение CSS-файла | `<link rel="stylesheet">`, каскад, порядок | HTML + отдельный style |
| 5 | `00-theory-05-reset.md` | Сброс стилей браузера (CSS Reset) | `box-sizing: border-box`, `margin: 0`, `padding: 0` | До/после reset сравнение |
| 6 | `00-theory-06-flexbox.md` | Первое знакомство с Flexbox | `display: flex`, `flex-direction`, главная ось | Три div в ряд |

### 🔧 Практика (24 шага — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-doctype.md` | Тип документа и язык |
| 2 | `02-head-meta.md` | Настройки (head и meta) |
| 3 | `03-title-favicon.md` | Вкладка и иконка |
| 4 | `04-google-fonts.md` | Google Fonts |
| 5 | `05-link-css.md` | CSS-файл и тег Body |
| 6 | `06-css-reset.md` | Сброс стилей браузера |
| 7 | `07-body-styles.md` | Стили для тела сайта (body) |
| 8 | `08-flex-body.md` | Flexbox и высота страницы |
| 9 | `09-container-css.md` | Стиль для Контейнера |
| 10 | `10-header-html.md` | Разметка шапки сайта |
| 11 | `11-header-css.md` | Стили для шапки сайта |
| 12 | `12-logo-html.md` | Разметка логотипа |
| 13 | `13-logo-css.md` | Стили логотипа |
| 14 | `14-nav-html.md` | Навигация (Меню) |
| 15 | `15-nav-css.md` | Стили списка навигации |
| 16 | `16-nav-links.md` | Стили ссылок и эффекты наведения |
| 17 | `17-nav-button.md` | Кнопка входа |
| 18 | `18-main-hero-html.md` | Разметка основной части |
| 19 | `19-hero-title.md` | Главный заголовок |
| 20 | `20-hero-bottom-html.md` | Разметка метрик и подзаголовка |
| 21 | `21-hero-bottom-css.md` | Стили нижней части и подзаголовка |
| 22 | `22-hero-metrics-css.md` | Стили метрик |
| 23 | `23-footer-html.md` | Разметка Подвала |
| 24 | `24-footer-css.md` | Стили Подвала и финал |

---

## Вебинар 03 — Flexbox и карточки (`03-flexbox`)
**Тема:** Flexbox-сетка, карточки комнат, CSS-компоненты  
**Структура:** 5 теория + 21 практика

### 📖 Теория (5 шагов — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-flex-align.md` | Выравнивание во Flexbox | `justify-content`, `align-items`, `gap` — все значения | Разные варианты выравнивания блоков |
| 2 | `00-theory-02-flex-wrap.md` | Перенос и `flex-wrap` | `flex-wrap: wrap`, `flex: 1`, `min-width` | Сетка карточек с переносом |
| 3 | `00-theory-03-pseudo.md` | Псевдоклассы и transition | `:hover`, `:active`, `transition: all 0.3s` | Кнопка с hover-эффектом |
| 4 | `00-theory-04-card.md` | Паттерн карточки (UI) | Структура: обёртка → картинка → контент → подвал | Простая карточка товара |
| 5 | `00-theory-05-overflow.md` | `overflow` и `object-fit` | `overflow: hidden`, `object-fit: cover` для изображений | Картинка в рамке без растяжения |

### 🔧 Практика (21 шаг — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-popular-section-html.md` | Разметка новой секции |
| 2 | `02-page-titles-css.md` | Стилизация заголовков |
| 3 | `03-buttons-base-css.md` | Базовый класс для кнопок |
| 4 | `04-btn-primary-css.md` | Синяя кнопка (Primary) |
| 5 | `05-btn-outline-css.md` | Прозрачная кнопка с рамкой |
| 6 | `06-btn-icon-css.md` | Кнопка-иконка |
| 7 | `07-grid-container-html.md` | Сетка комнат (Контейнер) |
| 8 | `08-room-card-html.md` | Скелет карточки комнаты |
| 9 | `09-room-card-css.md` | Стили карточки |
| 10 | `10-card-image-html.md` | Картинка комнаты |
| 11 | `11-card-image-css.md` | Стили картинки |
| 12 | `12-card-content-html.md` | Контентная часть |
| 13 | `13-card-content-css.md` | Стили контента карточки |
| 14 | `14-card-equipment-css.md` | Стили списка удобств |
| 15 | `15-card-footer-html.md` | Подвал карточки (HTML) |
| 16 | `16-card-footer-css.md` | Выравнивание подвала карточки |
| 17 | `17-card-price-css.md` | Стили цены |
| 18 | `18-card-btns-layout.md` | Выравнивание кнопок |
| 19 | `19-duplicate-cards.md` | Размножаем карточки! |
| 20 | `20-rooms-grid-css.md` | Включаем сетку Flexbox |
| 21 | `21-center-action.md` | Финальная кнопка |

---

## Вебинар 04 — JavaScript и DOM (`04-js-dom`)
**Тема:** Подключение JS, работа с DOM, toast, nav, auth  
**Структура:** 6 теория + 23 практика

### 📖 Теория (6 шагов — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-js-intro.md` | Что такое JavaScript? | Скриптовый язык, подключение `<script>`, консоль | `console.log('Hello World')` |
| 2 | `00-theory-02-dom.md` | Что такое DOM? | Дерево документа, node, element, как JS видит HTML | Схема дерева + `document.body` |
| 3 | `00-theory-03-selector.md` | querySelector и querySelectorAll | CSS-селекторы в JS, разница .querySelector vs .querySelectorAll | Найти кнопку и изменить текст |
| 4 | `00-theory-04-create.md` | Создание элементов | `createElement`, `textContent`, `classList`, `appendChild` | Создать `<p>` и добавить в div |
| 5 | `00-theory-05-events.md` | События и слушатели | `addEventListener('click')`, `event.preventDefault()` | Кнопка — счётчик кликов |
| 6 | `00-theory-06-timeout.md` | Таймеры и localStorage | `setTimeout`, `setInterval`, `localStorage.setItem/getItem` | Кнопка сохраняет текст в LS |

### 🔧 Практика (23 шага — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-create-js-file.md` | Подключение JavaScript |
| 2 | `02-dom-content-loaded.md` | Ждем загрузку DOM |
| 3 | `03-toast-function-skeleton.md` | Скелет функции уведомлений |
| 4 | `04-toast-get-container.md` | Поиск контейнера |
| 5 | `05-toast-create-container.md` | Создание контейнера |
| 6 | `06-toast-create-element.md` | Создаем тост (уведомление) |
| 7 | `07-toast-append.md` | Показываем тост на экране |
| 8 | `08-toast-timeout-skeleton.md` | Таймер (setTimeout) |
| 9 | `09-toast-animation-out.md` | Анимация исчезновения |
| 10 | `10-toast-remove.md` | Удаление из памяти |
| 11 | `11-nav-css-active.md` | Стили активной ссылки |
| 12 | `12-init-nav-function.md` | Скелет инициализации |
| 13 | `13-get-nav-links.md` | Поиск всех ссылок |
| 14 | `14-nav-links-loop.md` | Цикл по ссылкам |
| 15 | `15-nav-highlight-index.md` | Подсветка Главной страницы |
| 16 | `16-nav-highlight-catalog.md` | Подсветка Каталога и Комнаты |
| 17 | `17-nav-highlight-others.md` | Подсветка остальных страниц |
| 18 | `18-auth-nav-function.md` | Функция авторизации |
| 19 | `19-local-storage-check.md` | Изучаем localStorage |
| 20 | `20-auth-logged-in-ui.md` | UI авторизованного пользователя |
| 21 | `21-auth-logout-event.md` | Событие выхода |
| 22 | `22-auth-logout-redirect.md` | Редирект после выхода |
| 23 | `23-auth-logged-out.md` | UI неавторизованного пользователя |

---

## Вебинар 05 — Каталог и данные (`05-catalog`)
**Тема:** Массивы объектов, `.map()`, `.find()`, URLSearchParams  
**Структура:** 5 теория + 21 практика

### 📖 Теория (5 шагов — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-objects.md` | Объекты в JavaScript | `{}`, свойства, обращение через `.` и `[]` | Объект «комната» с 4 свойствами |
| 2 | `00-theory-02-arrays.md` | Массивы объектов | `[]`, индексы, вложенные массивы | Массив из 3 объектов-комнат |
| 3 | `00-theory-03-map.md` | Метод `.map()` и шаблонные строки | `.map()`, backtick-строки, `${}` | Список имён → список `<li>` |
| 4 | `00-theory-04-find.md` | Метод `.find()` | Поиск объекта по условию, возврат `undefined` | Найти комнату по id |
| 5 | `00-theory-05-url.md` | URLSearchParams | `new URLSearchParams(location.search)`, `.get()` | Прочитать `?id=3` из URL |

### 🔧 Практика (21 шаг — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-create-catalog-html.md` | Страница Каталога |
| 2 | `02-data-objects.md` | Объекты в JavaScript |
| 3 | `03-data-arrays-inside.md` | Массив внутри объекта |
| 4 | `04-data-full-list.md` | Заполнение базы данных |
| 5 | `05-data-include-html.md` | Подключение данных |
| 6 | `06-create-catalog-page.md` | Страница Каталога |
| 7 | `07-catalog-container.md` | Контейнер для карточек |
| 8 | `08-render-function-skeleton.md` | Функция рендеринга |
| 9 | `09-array-map.md` | Метод массива map() |
| 10 | `10-render-card-html.md` | Шаблонные строки (Backticks) |
| 11 | `11-render-join.md` | Склеивание массива (join) |
| 12 | `12-render-nested-map.md` | Вложенный map для списка |
| 13 | `13-update-index-links.md` | Обновление ссылок на Главной |
| 14 | `14-create-details-page.md` | Страница одной комнаты |
| 15 | `15-details-function-skeleton.md` | Инициализация карточки |
| 16 | `16-url-search-params.md` | Чтение параметров URL |
| 17 | `17-array-find.md` | Метод массива find() |
| 18 | `18-details-not-found.md` | Обработка ошибки (Not Found) |
| 19 | `19-details-render.md` | Отрисовка контента |
| 20 | `20-details-ternary.md` | Условный рендеринг (Тернарный оператор) |
| 21 | `21-data-mock-bookings.md` | Массив бронирований |

---

## Вебинар 06 — Формы и валидация (`06-forms`)
**Тема:** HTML-формы, события submit, валидация, localStorage  
**Структура:** 5 теория + 21 практика

### 📖 Теория (5 шагов — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-forms.md` | HTML-формы | `<form>`, `<input>`, `<label>`, типы: text, email, password | Форма входа без CSS |
| 2 | `00-theory-02-submit.md` | Событие submit | `form.addEventListener('submit')`, `event.preventDefault()` | Форма, которая не перезагружает страницу |
| 3 | `00-theory-03-values.md` | Получение значений полей | `input.value`, `.trim()`, проверка на пустоту | Читаем значение input при submit |
| 4 | `00-theory-04-validation.md` | Валидация форм | Флаг валидации, цикл по полям, показ ошибок через classList | Подсветка незаполненного поля |
| 5 | `00-theory-05-storage.md` | localStorage для авторизации | `JSON.stringify`, `JSON.parse`, хранение объекта пользователя | Сохранить и прочитать объект |

### 🔧 Практика (21 шаг — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-create-login-page.md` | Страница авторизации |
| 2 | `02-login-html-form.md` | Форма входа (HTML) |
| 3 | `03-create-register-page.md` | Страница регистрации |
| 4 | `04-register-html-form.md` | Форма регистрации (HTML) |
| 5 | `05-css-form-card.md` | Стили каркаса формы |
| 6 | `06-css-form-inputs.md` | Стилизация инпутов |
| 7 | `07-css-validation-styles.md` | Стили валидации (Ошибки) |
| 8 | `08-init-register-skeleton.md` | Скелет логики регистрации |
| 9 | `09-form-submit-event.md` | Событие отправки (submit) |
| 10 | `10-validation-flag.md` | Флаг валидации |
| 11 | `11-fields-array.md` | Массив полей |
| 12 | `12-validation-loop.md` | Цикл валидации |
| 13 | `13-password-match.md` | Проверка совпадения паролей |
| 14 | `14-register-success-toast.md` | Уведомление об успехе |
| 15 | `15-register-redirect.md` | Очистка формы и редирект |
| 16 | `16-init-login-skeleton.md` | Скелет логики входа |
| 17 | `17-login-values.md` | Получение данных логина |
| 18 | `18-login-credentials-check.md` | Проверка доступов (Хардкод) |
| 19 | `19-login-success-storage.md` | Локальное хранилище (Успех) |
| 20 | `20-login-error-ui.md` | Вывод ошибки в интерфейс |
| 21 | `21-call-form-functions.md` | Запуск функций при загрузке |

---

## Вебинар 07 — Слайдер (`07-slider`)
**Тема:** CSS позиционирование, состояние программы, таймеры  
**Структура:** 4 теория + 20 практика

### 📖 Теория (4 шага — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-position.md` | CSS position | `relative`, `absolute`, `z-index`, как они работают вместе | Карточка с бейджем в углу |
| 2 | `00-theory-02-state.md` | Состояние программы | Переменная как «память» программы, изменение при событии | Счётчик: переменная + кнопки |
| 3 | `00-theory-03-classlist.md` | classList и переключение классов | `.add()`, `.remove()`, `.toggle()`, `.contains()` | Переключение active-класса |
| 4 | `00-theory-04-interval.md` | setInterval и clearInterval | Цикличный таймер, остановка, reset при клике | Секундомер с запуском и стопом |

### 🔧 Практика (20 шагов — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-create-slider-html.md` | HTML разметка слайдера |
| 2 | `02-slider-css-container.md` | Стили контейнера (slider) |
| 3 | `03-slider-css-slides.md` | Стили слайдов (absolute) |
| 4 | `04-slider-css-active.md` | Активный слайд |
| 5 | `05-slider-css-buttons.md` | Кнопки Вперед / Назад |
| 6 | `06-slider-css-dots.md` | Стиль индикаторов (Точки) |
| 7 | `07-init-slider-skeleton.md` | Инициализация слайдера |
| 8 | `08-slider-state.md` | Состояние слайдера |
| 9 | `09-show-slide-func.md` | Функция отрисовки |
| 10 | `10-show-slide-logic.md` | Логика зацикливания |
| 11 | `11-toggle-classes.md` | Переключение классов |
| 12 | `12-next-prev-funcs.md` | Функции Вперед и Назад |
| 13 | `13-button-listeners.md` | Слушатели кликов (Кнопки) |
| 14 | `14-dots-listeners.md` | Слушатели кликов (Точки) |
| 15 | `15-start-auto-func.md` | Запуск таймера (setInterval) |
| 16 | `16-stop-auto-func.md` | Остановка таймера (clearInterval) |
| 17 | `17-reset-timer-on-click-btns.md` | Сброс таймера (Кнопки) |
| 18 | `18-reset-timer-on-click-dots.md` | Сброс таймера (Точки) |
| 19 | `19-start-on-init.md` | Запуск при старте |
| 20 | `20-call-init-slider.md` | Вызов функции слайдера |

---

## Вебинар 08 — Поиск и бронирование (`08-search`)
**Тема:** `.filter()`, `.sort()`, live search, калькулятор стоимости  
**Структура:** 4 теория + 25 практика

### 📖 Теория (4 шага — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-filter.md` | Метод `.filter()` | Предикат, возврат true/false, создание нового массива | Фильтр массива чисел по условию |
| 2 | `00-theory-02-sort.md` | Метод `.sort()` | `compareFunction`, числовая и строковая сортировка | Сортировка товаров по цене |
| 3 | `00-theory-03-input-event.md` | Событие `input` (живой поиск) | Разница `input` vs `change`, `value` при каждом символе | Live-фильтр списка |
| 4 | `00-theory-04-select.md` | Элемент `<select>` | `<option>`, `select.value`, динамическое заполнение | Заполнение select через JS |

### 🔧 Практика (25 шагов — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-catalog-toolbar-html.md` | Панель поиска (HTML) |
| 2 | `02-catalog-toolbar-css.md` | Панель поиска (CSS) |
| 3 | `03-init-filters-skeleton.md` | Функция фильтрации |
| 4 | `04-refactor-render.md` | Перенос функции рендера |
| 5 | `05-displayed-rooms-state.md` | Массив отображаемых комнат |
| 6 | `06-empty-search-result.md` | Пустой результат поиска |
| 7 | `07-apply-filter-func.md` | Функция обработки фильтра |
| 8 | `08-array-filter.md` | Метод массива filter() |
| 9 | `09-search-event.md` | Событие input (Живой поиск) |
| 10 | `10-array-sort.md` | Сортировка массива (sort) |
| 11 | `11-call-init-filters.md` | Запуск фильтров |
| 12 | `12-create-booking-page.md` | Страница бронирования |
| 13 | `13-booking-form-html.md` | Форма калькулятора (HTML) |
| 14 | `14-create-mybookings-page.md` | Страница Мои Бронирования |
| 15 | `15-booking-css.md` | Стили калькулятора (CSS) |
| 16 | `16-init-booking-skeleton.md` | Инициализация калькулятора |
| 17 | `17-booking-auth-guard.md` | Защита маршрута (Auth Guard) |
| 18 | `18-populate-select.md` | Заполнение списка комнат |
| 19 | `19-auto-select-room.md` | Чтение параметров из URL |
| 20 | `20-update-price-func.md` | Функция перерасчета |
| 21 | `21-calc-total.md` | Итоговая стоимость |
| 22 | `22-calc-events.md` | Слушатели калькулятора |
| 23 | `23-booking-submit.md` | Оформление заявки |
| 24 | `24-push-mock-booking.md` | Сохранение в базу |
| 25 | `25-booking-redirect.md` | Завершение и редирект |

---

## Вебинар 09 — Финал: Мои бронирования (`09-final`)
**Тема:** Финальная страница, защита маршрута, рендер списка  
**Структура:** 2 теория + 10 практика

### 📖 Теория (2 шага — НОВЫЕ)
| # | Файл | Заголовок | Что объяснить | startCode пример |
|---|------|-----------|---------------|-----------------|
| 1 | `00-theory-01-refactor.md` | Рефакторинг и DRY | Не повторяй себя, выносить повторяющийся код в функции | До/после рефакторинга |
| 2 | `00-theory-02-empty-state.md` | Пустые состояния (Empty State) | Что показывать когда данных нет, UX паттерн | Блок с иконкой и текстом |

### 🔧 Практика (10 шагов — существующие)
| # | Файл | Заголовок |
|---|------|-----------|
| 1 | `01-bookings-list-css.md` | Стили контейнера списка |
| 2 | `02-booking-item-css.md` | Карточка брони (CSS) |
| 3 | `03-empty-message-css.md` | Пустое состояние (CSS) |
| 4 | `04-init-mybookings-skeleton.md` | Скелет JS функции |
| 5 | `05-mybookings-auth-guard.md` | Защита от незваных гостей |
| 6 | `06-check-empty-array.md` | Проверка на пустоту |
| 7 | `07-render-mock-bookings.md` | Рендер заявок (.map) |
| 8 | `08-booking-card-html.md` | HTML Карточки брони |
| 9 | `09-call-init-mybookings.md` | Вызов функции |
| 10 | `10-final-congratulations.md` | ФИНАЛ! |

---

## Вебинар 10 — Типичные ошибки и отладка (`10-troubleshooting`)
**Тема:** Разбор типичных ошибок консоли, работа с SecurityError, путями и инструментами DevTools  
**Структура:** 5 практико-ориентированных уроков

### 📖 Уроки по устранению ошибок
| # | Файл | Заголовок | Что объясняется |
|---|------|-----------|-----------------|
| 1 | `01-security-error-localstorage.md` | SecurityError и безопасный localStorage | `Uncaught SecurityError: Failed to read 'localStorage'` — флаг `allow-same-origin` в `sandbox`, `try...catch` и In-Memory fallback |
| 2 | `02-type-error-null-dom.md` | TypeError: Cannot read properties of null | Ошибки раннего выполнения скрипта без `defer`, опечатки в селекторах, опциональная цепочка `?.` |
| 3 | `03-syntax-error-tokens.md` | SyntaxError: Unexpected token | Пропущенные скобки `{}`, запятые в объектах и массивах, навигация по строкам ошибок в DevTools |
| 4 | `04-network-404-paths.md` | Ошибки путей и 404 Not Found | Разница между `./` и `../` из вложенных папок, регистр символов на Linux/Windows |
| 5 | `05-devtools-mastery.md` | Мастерство отладки через DevTools | `console.table`, оператор `debugger;`, замер времени `console.time`, инспектор Flexbox |

---

## Итого

| Вебинар | Теория (новых) | Практика (существующих) | Всего |
|---------|---------------|------------------------|-------|
| 01-intro | 10 (уже есть) | 0 | 10 |
| 02-markup | **6 новых** | 24 | 30 |
| 03-flexbox | **5 новых** | 21 | 26 |
| 04-js-dom | **6 новых** | 23 | 29 |
| 05-catalog | **5 новых** | 21 | 26 |
| 06-forms | **5 новых** | 21 | 26 |
| 07-slider | **4 новых** | 20 | 24 |
| 08-search | **4 новых** | 25 | 29 |
| 09-final | **2 новых** | 10 | 12 |
| 10-troubleshooting | **5 новых** | 0 | 5 |
| **ИТОГО** | **42 новых** | 175 | **217** |
