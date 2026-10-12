# Specification Mining Report: Issues 61 to 113

**Author:** spec_miner_survey_2  
**Scope:** `content/AUDIT_REPORT.md` (Issues #61 through #113)  
**Target Lessons:** `06-forms`, `07-slider`, `08-search`, `09-final`, `10-troubleshooting`  
**Status:** Complete specification mined & verified against repository filesystem.

## Executive Summary

- **Total Issues Mined:** 53 issues (#61 – #113)
- **Target Lessons Covered:**
  - `06-forms`: 7 issues (#61 – #67)
  - `07-slider`: 14 issues (#68 – #81)
  - `08-search`: 16 issues (#82 – #97)
  - `09-final`: 11 issues (#98 – #108)
  - `10-troubleshooting`: 5 issues (#109 – #113)
- **File Verification:** **53 out of 53** unique affected files verified to exist on disk in `content/lessons/` (100% existence rate).
- **Issue Types:**
  - `[ОШИБКА]`: 24
  - `[ПОДАЧА]`: 10
  - `[ПЛАВНОСТЬ]`: 9
  - `[ЗАДАНИЕ]`: 7
  - `[ПРОБЕЛ]`: 2
  - `[ДУБЛИРОВАНИЕ]`: 1
- **Priority Breakdown:**
  - `Высокий`: 22
  - `Средний`: 15
  - `Критический`: 13
  - `Низкий`: 3

## Inventory Overview Table (Issues 61–113)

| Issue # | Lesson | File Path | Exists | Type | Priority | Lines | Summary Title |
|---|---|---|---|---|---|---|---|
| #61 | `06-forms` | `content/lessons/06-forms/00-theory-06-modal.md` | ✅ Yes | `[ПОДАЧА]` | `Средний` | `1-151` | Изучение <dialog> без практической интеграции |
| #62 | `06-forms` | `content/lessons/06-forms/01-create-login-page.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `260-282` | Преждевременное включение разметки формы в решение шага 01 |
| #63 | `06-forms` | `content/lessons/06-forms/02-login-html-form.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `1-50, diff пустой` | Нулевой диф — форма входа уже добавлена в предыдущем шаге |
| #64 | `06-forms` | `content/lessons/06-forms/03-create-register-page.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `330-360` | Преждевременное включение полей регистрации в решение шага 03 |
| #65 | `06-forms` | `content/lessons/06-forms/04-register-html-form.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `1-50, diff пустой` | Нулевой диф — форма регистрации уже присутствует в старте |
| #66 | `06-forms` | `content/lessons/06-forms/20-login-error-ui.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `1111–1117` | Ошибка типа уведомления — тост ошибки отображается зеленым цветом успеха |
| #67 | `06-forms` | `content/lessons/06-forms/21-call-form-functions.md` | ✅ Yes | `[ЗАДАНИЕ]` | `Средний` | `13-17, 764-776` | Некорректная инструкция задания о вызове «обеих» функций |
| #68 | `07-slider` | `content/lessons/07-slider/00-theory-01-position.md` | ✅ Yes | `[ПОДАЧА]` | `Средний` | `33-35` | Уточнение правила точки отсчёта для absolute |
| #69 | `07-slider` | `content/lessons/07-slider/00-theory-02-state.md` | ✅ Yes | `[ПОДАЧА]` | `Низкий` | `84-86, 151` | Требование начального вызова render |
| #70 | `07-slider` | `content/lessons/07-slider/00-theory-03-classlist.md` | ✅ Yes | `[ПОДАЧА]` | `Низкий` | `96, 123-125` | Асимметрия текста переключателя темы |
| #71 | `07-slider` | `content/lessons/07-slider/00-theory-04-interval.md` | ✅ Yes | `[ЗАДАНИЕ]` | `Средний` | `100-104, 180-181` | Несоответствие задания и решения (автостарт) |
| #72 | `07-slider` | `content/lessons/07-slider/01-create-slider-html.md` | ✅ Yes | `[ЗАДАНИЕ]` | `Критический` | `18, 68-91, 957-1212` | Слайдер уже присутствует в стартовом HTML, фантомная секция и скрипт в решении |
| #73 | `07-slider` | `content/lessons/07-slider/02-slider-css-container.md` | ✅ Yes | `[ЗАДАНИЕ]` | `Высокий` | `1090-1180` | Преждевременный сброс всех стилей слайдера в решении |
| #74 | `07-slider` | `content/lessons/07-slider/03-slider-css-slides.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Высокий` | `142-698, 1090-1180` | Отсутствие стилей предыдущего шага в css:start |
| #75 | `07-slider` | `content/lessons/07-slider/04-slider-css-active.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Высокий` | `142-698, 1090-1180` | Отсутствие стилей шагов 02-03 в css:start |
| #76 | `07-slider` | `content/lessons/07-slider/05-slider-css-buttons.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Высокий` | `82-83, 142-698` | Рассинхронизация css:start и доступность кнопок |
| #77 | `07-slider` | `content/lessons/07-slider/06-slider-css-dots.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Высокий` | `84-89, 142-698` | Рассинхронизация css:start и интерактивность span-точек |
| #78 | `07-slider` | `content/lessons/07-slider/07-init-slider-skeleton.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Средний` | `1025` | Преждевременный вызов initSlider() в DOMContentLoaded |
| #79 | `07-slider` | `content/lessons/07-slider/15-start-auto-func.md` | ✅ Yes | `[ДУБЛИРОВАНИЕ]` | `Высокий` | `1320-1323` | Преждевременная реализация функции stopAuto() |
| #80 | `07-slider` | `content/lessons/07-slider/16-stop-auto-func.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `14-16, 1061-1341` | Ошибка Zero-Diff (+0 / -0): код уже присутствует в стартере |
| #81 | `07-slider` | `content/lessons/07-slider/20-call-init-slider.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `13-17, 784, 1069` | Ошибка Zero-Diff (+0 / -0): вызов initSlider() уже в стартере |
| #82 | `08-search` | `content/lessons/08-search/00-theory-04-input-event.md` | ✅ Yes | `[ПРОБЕЛ]` | `Средний` | `30-75` | Дидактический пробел: изучение debounce без применения в проекте |
| #83 | `08-search` | `content/lessons/08-search/00-theory-05-select.md` | ✅ Yes | `[ПОДАЧА]` | `Низкий` | `25-60` | Дидактическое расхождение: optgroup vs плоский список |
| #84 | `08-search` | `content/lessons/08-search/00-theory-06-dates.md` | ✅ Yes | `[ПРОБЕЛ]` | `Средний` | `20-55` | Дидактический разрыв: объект Date не используется в калькуляторе проекта |
| #85 | `08-search` | `content/lessons/08-search/01-catalog-toolbar-html.md` | ✅ Yes | `[ОШИБКА]` | `Средний` | `67-68` | Отсутствие доступного лейбла у поля поиска |
| #86 | `08-search` | `content/lessons/08-search/03-init-filters-skeleton.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Средний` | `14-16, 784` | Инструкция по удалению renderCatalog vs повторное появление функции |
| #87 | `08-search` | `content/lessons/08-search/05-displayed-rooms-state.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `930-1140` | Критическая рассинхронизация: код будущих уроков в js:start |
| #88 | `08-search` | `content/lessons/08-search/09-search-event.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `14-16, 1109, 1446` | Ошибка Zero-Diff (+0 / -0): слушатель input уже в стартере |
| #89 | `08-search` | `content/lessons/08-search/11-call-init-filters.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Высокий` | `784, 1180-1280` | Конфликт дублирующих функций в js:start |
| #90 | `08-search` | `content/lessons/08-search/13-booking-form-html.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `14-16, 152, 1412` | Ошибка Zero-Diff (+0 / -0): форма уже вставлена в стартер |
| #91 | `08-search` | `content/lessons/08-search/14-create-mybookings-page.md` | ✅ Yes | `[ЗАДАНИЕ]` | `Высокий` | `15-17, 57 строк diff` | Противоречие в задании («Ничего вписывать не нужно») и скрытый diff |
| #92 | `08-search` | `content/lessons/08-search/16-init-booking-skeleton.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `200-265, 997` | Инвертированный стартер: удаление 66 строк готового кода |
| #93 | `08-search` | `content/lessons/08-search/17-booking-auth-guard.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `200-265` | Инвертированный стартер (шаг 2 из 5) |
| #94 | `08-search` | `content/lessons/08-search/18-populate-select.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `200-265` | Инвертированный стартер (шаг 3 из 5) |
| #95 | `08-search` | `content/lessons/08-search/19-auto-select-room.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `200-265` | Инвертированный стартер (шаг 4 из 5) |
| #96 | `08-search` | `content/lessons/08-search/20-update-price-func.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `200-265` | Инвертированный стартер (шаг 5 из 5) |
| #97 | `08-search` | `content/lessons/08-search/25-booking-redirect.md` | ✅ Yes | `[ЗАДАНИЕ]` | `Средний` | `15-18, 813` | Ложное требование вызова initBookingCalc() |
| #98 | `09-final` | `content/lessons/09-final/00-theory-03-modules.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `119` | Критическая синтаксическая ошибка: отсутствие type="module" в скрипте |
| #99 | `09-final` | `content/lessons/09-final/01-bookings-list-css.md` | ✅ Yes | `[ЗАДАНИЕ]` | `Высокий` | `1090-1264` | Преждевременный сброс всех CSS-классов финала |
| #100 | `09-final` | `content/lessons/09-final/02-booking-item-css.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Высокий` | `142-698` | Отсутствие стилей шага 01 в css:start |
| #101 | `09-final` | `content/lessons/09-final/03-empty-message-css.md` | ✅ Yes | `[ПЛАВНОСТЬ]` | `Высокий` | `142-698` | Отсутствие стилей шагов 01-02 в css:start |
| #102 | `09-final` | `content/lessons/09-final/04-init-mybookings-skeleton.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `1105-1140` | Инвертированный стартер: функция полностью написана в стартере |
| #103 | `09-final` | `content/lessons/09-final/05-mybookings-auth-guard.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `1105-1140` | Инвертированный стартер (шаг 2 из 5) |
| #104 | `09-final` | `content/lessons/09-final/06-check-empty-array.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `1105-1140` | Инвертированный стартер (шаг 3 из 5) |
| #105 | `09-final` | `content/lessons/09-final/07-render-mock-bookings.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `1105-1140` | Инвертированный стартер (шаг 4 из 5) |
| #106 | `09-final` | `content/lessons/09-final/08-booking-card-html.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `1105-1140` | Инвертированный стартер (шаг 5 из 5) |
| #107 | `09-final` | `content/lessons/09-final/09-call-init-mybookings.md` | ✅ Yes | `[ОШИБКА]` | `Критический` | `15-18, 796, 1212` | Ошибка Zero-Diff (+0 / -0): вызов уже добавлен в стартере |
| #108 | `09-final` | `content/lessons/09-final/10-final-congratulations.md` | ✅ Yes | `[ПОДАЧА]` | `Средний` | `2, 55` | type: practice без задания и хардкод видимости в навигации |
| #109 | `10-troubleshooting` | `content/lessons/10-troubleshooting/01-security-error-localstorage.md` | ✅ Yes | `[ПОДАЧА]` | `Средний` | `4, 93, 115-126` | type: theory во frontmatter и статичный вывод |
| #110 | `10-troubleshooting` | `content/lessons/10-troubleshooting/02-type-error-null-dom.md` | ✅ Yes | `[ПОДАЧА]` | `Средний` | `4, 115-124` | type: theory и отсутствие вызова bindSearchEvent |
| #111 | `10-troubleshooting` | `content/lessons/10-troubleshooting/03-syntax-error-tokens.md` | ✅ Yes | `[ПОДАЧА]` | `Средний` | `4, 82, 107-112` | type: theory и вывод распарсенного объекта |
| #112 | `10-troubleshooting` | `content/lessons/10-troubleshooting/04-network-404-paths.md` | ✅ Yes | `[ОШИБКА]` | `Высокий` | `4, 58-64` | type: theory и неполноценный тег head |
| #113 | `10-troubleshooting` | `content/lessons/10-troubleshooting/05-devtools-mastery.md` | ✅ Yes | `[ПОДАЧА]` | `Средний` | `4, 81, 107-122` | type: theory и демонстрационный вызов debugFilterRooms |

---

## Detailed Issue-by-Issue Specification Inventory

### Issue #61: Изучение <dialog> без практической интеграции

- **Target Lesson:** `06-forms` (Урок 06 — Формы и валидация (27 файлов))
- **Affected File Path:** `content/lessons/06-forms/00-theory-06-modal.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 151)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `1-151`

#### Problem Description
Теория описывает тег `<dialog>`, методы `.showModal()` и `.close()`. Но в практических шагах модальные окна не реализуются (авторизация сделана отдельными страницами).

#### Proposed Replacement / Fix Specification
Обозначить в преамбуле файла, что модальные окна — альтернативный паттерн авторизации/подтверждения бронирования, рекомендуемый для самостоятельного расширения проекта.

---

### Issue #62: Преждевременное включение разметки формы в решение шага 01

- **Target Lesson:** `06-forms` (Урок 06 — Формы и валидация (27 файлов))
- **Affected File Path:** `content/lessons/06-forms/01-create-login-page.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 826)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `260-282`

#### Problem Description
В описании шага сказано: `Внутри <main> пока есть только заголовки... Поля будут добавлены на следующем шаге`. Однако в решении `html:solution` уже содержится готовая форма `<form id="loginForm">` с инпутами логина, пароля и кнопкой входа. Из-за этого следующий шаг 02 теряет всякий смысл.

#### Proposed Replacement / Fix Specification
В `html:solution` шага 01 оставить только пустой каркас карточки: `<div class="form-card"><form id="loginForm"><!-- Поля будут добавлены на следующем шаге --></form></div>`.

---

### Issue #63: Нулевой диф — форма входа уже добавлена в предыдущем шаге

- **Target Lesson:** `06-forms` (Урок 06 — Формы и валидация (27 файлов))
- **Affected File Path:** `content/lessons/06-forms/02-login-html-form.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 837)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `1-50, diff пустой`

#### Problem Description
Из-за преждевременного наполнения в шаге 01 стартовый код шага 02 уже полностью содержит форму входа. Изменений между стартом и решением нет. Студенту нечего делать.

#### Proposed Replacement / Fix Specification
В `html:start` передать каркас без инпутов, а в `html:solution` добавить разметку полей ввода.

---

### Issue #64: Преждевременное включение полей регистрации в решение шага 03

- **Target Lesson:** `06-forms` (Урок 06 — Формы и валидация (27 файлов))
- **Affected File Path:** `content/lessons/06-forms/03-create-register-page.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 860)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `330-360`

#### Problem Description
Аналогично шагу 01: каркас страницы регистрации в `html:solution` сразу включает 6 полей ввода с текстами ошибок и кнопкой, что обесценивает следующий шаг 04.

#### Proposed Replacement / Fix Specification
Оставить в `html:solution` шага 03 только заголовок и пустой тег формы без полей.

---

### Issue #65: Нулевой диф — форма регистрации уже присутствует в старте

- **Target Lesson:** `06-forms` (Урок 06 — Формы и валидация (27 файлов))
- **Affected File Path:** `content/lessons/06-forms/04-register-html-form.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 886)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `1-50, diff пустой`

#### Problem Description
Диф равен 0 строк, форма регистрации уже полностью добавлена в стартовый код.

#### Proposed Replacement / Fix Specification
Очистить стартовый код от полей формы, перенеся их добавление в `html:solution` шага 04.

---

### Issue #66: Ошибка типа уведомления — тост ошибки отображается зеленым цветом успеха

- **Target Lesson:** `06-forms` (Урок 06 — Формы и валидация (27 файлов))
- **Affected File Path:** `content/lessons/06-forms/20-login-error-ui.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1120)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `1111–1117`

#### Problem Description
В блоке неуспешного входа вызывается `showNotification('Неверный логин или пароль', 'danger')`. Но функция `showNotification` (созданная в Уроке 04) имеет словарь: `const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8' }` и логику `colors[type] || colors.success`. Ключа `'danger'` в объекте нет! В результате срабатывает fallback на `colors.success`, и сообщение о неверном пароле появляется в ярко-зелёной плашке успеха!

#### Proposed Replacement / Fix Specification
В строке вызова `showNotification` передавать тип `'error'` вместо `'danger'`:
    ```js
    // Было:
    showNotification('Неверный логин или пароль', 'danger');
    // Стало:
    showNotification('Неверный логин или пароль', 'error');
    ```

---

### Issue #67: Некорректная инструкция задания о вызове «обеих» функций

- **Target Lesson:** `06-forms` (Урок 06 — Формы и валидация (27 файлов))
- **Affected File Path:** `content/lessons/06-forms/21-call-form-functions.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1126)
- **Defect Classification:** `[ЗАДАНИЕ]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `13-17, 764-776`

#### Problem Description
Задание сообщает: `найдите слушатель события DOMContentLoaded и добавьте внутрь него вызов обеих новых функций`. Однако вызов функции регистрации `initRegisterForm();` был добавлен ещё в шаге 08 и уже присутствует в стартовом коде. Добавить нужно только одну функцию — `initLoginForm();`. Формулировка вводит учащегося в заблуждение и провоцирует дублирование вызова.

#### Proposed Replacement / Fix Specification
Скорректировать инструкцию: `найдите слушатель события DOMContentLoaded и добавьте внутрь него вызов функции initLoginForm();`.

---

### Issue #68: Уточнение правила точки отсчёта для absolute

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/00-theory-01-position.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 180)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `33-35`

#### Problem Description
В строке 33 утверждается: *«Элемент вырывается из потока и позиционируется относительно ближайшего предка с `position: relative`»*. В таблице выше верно указано `position ≠ static`, но в подзаголовке и тексте создаётся ошибочное впечатление, что absolute работает только в связке с relative, исключая fixed, absolute и sticky предков.

#### Proposed Replacement / Fix Specification
В строке 33 заменить формулировку:
```markdown
Элемент вырывается из потока и позиционируется относительно **ближайшего позиционированного предка** (любого предка с `position`, отличным от `static`: чаще всего это `relative`, но может быть также `absolute`, `fixed` или `sticky`):
```
---

---

### Issue #69: Требование начального вызова render

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/00-theory-02-state.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 152)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Низкий`
- **Affected Lines / Scope:** `84-86, 151`

#### Problem Description
В задании сказано: *«По клику на кнопку — меняйте состояние и обновляйте текст через функцию render»*. В эталонном решении (строка 151) добавлен вызов `render();` для первичной синхронизации DOM при загрузке. Учащиеся часто забывают вызвать функцию при старте, так как в формулировке задания это не упомянуто.

#### Proposed Replacement / Fix Specification
В формулировку задания добавить пункт 3:
```markdown
## 🛠 Задание
Напишите простой переключатель: переменная `isOpen` (true/false).
1. По клику на кнопку — меняйте состояние `isOpen` на противоположное и обновляйте интерфейс через функцию `render()`.
2. В функции `render()` обновляйте текст `#status` и текст кнопки `#toggleBtn`.
3. Обязательно вызовите `render()` один раз при загрузке страницы, чтобы инициализировать интерфейс.
```
---

---

### Issue #70: Асимметрия текста переключателя темы

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/00-theory-03-classlist.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 127)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Низкий`
- **Affected Lines / Scope:** `96, 123-125`

#### Problem Description
Начальный текст кнопки в HTML: `<button id="themeBtn" class="btn">Включить тёмную тему</button>`. Однако в решении тернарный оператор переключает между `'Светлая тема'` и `'Тёмная тема'`, из-за чего исходная надпись никогда больше не возвращается.

#### Proposed Replacement / Fix Specification
В строке 96 скорректировать начальный текст кнопки:
```html
    <button id="themeBtn" class="btn">Тёмная тема</button>
```
Или изменить тернарный оператор в решении (строки 123-125) на симметричный:
```javascript
  themeBtn.textContent = document.body.classList.contains('dark')
    ? 'Включить светлую тему'
    : 'Включить тёмную тему';
```
---

---

### Issue #71: Несоответствие задания и решения (автостарт)

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/00-theory-04-interval.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 182)
- **Defect Classification:** `[ЗАДАНИЕ]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `100-104, 180-181`

#### Problem Description
В задании сформулированы 3 пункта: реализовать `start()`, реализовать `stop()`, привязать слушатели к `#playBtn` и `#pauseBtn`. В решении в конце добавлен не запрошенный вызов `start();` («Запуск по умолчанию»), что может приводить к ошибкам автопроверки тестов тренажёра, если студент точно следовал инструкции.

#### Proposed Replacement / Fix Specification
Добавить в задание пункт 4:
```markdown
4. Запустите счетчик сразу при старте страницы вызовом `start()`.
```
---

---

### Issue #72: Слайдер уже присутствует в стартовом HTML, фантомная секция и скрипт в решении

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/01-create-slider-html.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1213)
- **Defect Classification:** `[ЗАДАНИЕ]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `18, 68-91, 957-1212`

#### Problem Description
1. В `html:start` (строки 68-91) секция слайдера `<section class="slider-section">` УЖЕ присутствует в полном объеме! Студент открывает задание, а делать нечего.
  2. Задание гласит: *«Найдите закрывающий тег `</section>` секции преимуществ (`about-section`) и вставьте под ним новую секцию слайдера»*. В `html:start` секция `about-section` вообще отсутствует (есть только `hero-section` и `popular-section`).
  3. В `html:solution` (строки 957-1065) внедрен посторонний инлайн-скрипт с базой данных `OFFICE_ROOMS`, которого не было в стартовом коде.

#### Proposed Replacement / Fix Specification
1. В `html:start` удалить готовую секцию слайдера (строки 68-91).
  2. Скорректировать текст задания в строке 18:
  ```markdown
  Откройте вкладку `html` (`index.html`). Найдите закрывающий тег `</section>` главного блока (`hero-section`) и вставьте под ним новую секцию слайдера:
  ```
  3. В `html:solution` убрать инлайн-скрипт `const OFFICE_ROOMS` и синхронизировать с чистым HTML страницы.
---

---

### Issue #73: Преждевременный сброс всех стилей слайдера в решении

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/02-slider-css-container.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1732)
- **Defect Classification:** `[ЗАДАНИЕ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `1090-1180`

#### Problem Description
Задание просит добавить в `style.css` только стили контейнера (`.slider-section` и `.slider`). Однако в `css:solution` добавлено сразу 90 строк CSS, покрывающих слайды, активный класс, стрелки и точки (все последующие шаги 03-06).

#### Proposed Replacement / Fix Specification
Ограничить блок `css:solution` только кодом контейнера:
```css:solution
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
```
---

---

### Issue #74: Отсутствие стилей предыдущего шага в css:start

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/03-slider-css-slides.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1582)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `142-698, 1090-1180`

#### Problem Description
В `css:start` отсутствуют стили `.slider-section` и `.slider`, написанные на шаге 02. В `css:solution` снова вставлены стили всех будущих шагов до 06 включительно.

#### Proposed Replacement / Fix Specification
Добавить в конец `css:start` стили из шага 02 (`.slider-section`, `.slider`), а в `css:solution` включить только инкремент шага 03 (`.slide`, `.slide-img`).
---

---

### Issue #75: Отсутствие стилей шагов 02-03 в css:start

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/04-slider-css-active.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1583)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `142-698, 1090-1180`

#### Problem Description
В `css:start` отсутствуют стили слайдера и слайдов из шагов 02 и 03. В `css:solution` содержится полный монолитный блок стилей шагов 02-06.

#### Proposed Replacement / Fix Specification
Включить в `css:start` стили из шагов 02-03, а в `css:solution` добавить строго селектор `.slide.active { opacity: 1; }`.
---

---

### Issue #76: Рассинхронизация css:start и доступность кнопок

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/05-slider-css-buttons.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1583)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `82-83, 142-698`

#### Problem Description
1. В `css:start` не сохранены стили шагов 02-04.
  2. В HTML кнопки слайдера объявлены как `<button class="slider-btn slider-prev">‹</button>` без `type="button"` и без `aria-label="Предыдущий слайд"` / `aria-label="Следующий слайд"`.

#### Proposed Replacement / Fix Specification
1. Добавить в `css:start` стили шагов 02-04.
  2. В HTML разметке стартера и решения указать:
```html
<button type="button" class="slider-btn slider-prev" aria-label="Предыдущий слайд">‹</button>
<button type="button" class="slider-btn slider-next" aria-label="Следующий слайд">›</button>
```
---

---

### Issue #77: Рассинхронизация css:start и интерактивность span-точек

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/06-slider-css-dots.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1582)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `84-89, 142-698`

#### Problem Description
1. В `css:start` отсутствуют стили шагов 02-05, из-за чего diff составляет 411 строк с перетасовкой чужих стилей карточек.
  2. Точки-индикаторы объявлены несемантическими тегами `<span class="dot">` без доступности с клавиатуры.

#### Proposed Replacement / Fix Specification
1. Привести `css:start` в соответствие с накопленным CSS шагов 01-05.
  2. В HTML использовать кнопки либо снабдить спаны `role="button"` и `tabindex="0"`, `aria-label="Перейти к слайду N"`.
---

---

### Issue #78: Преждевременный вызов initSlider() в DOMContentLoaded

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/07-init-slider-skeleton.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1268)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `1025`

#### Problem Description
В решении шага 07 в обработчик `DOMContentLoaded` уже вставляется строка `initSlider();`. Из-за этого шаг 20 («Вызов функции слайдера»), где учащемуся даётся задание найти `DOMContentLoaded` и вставить этот вызов, становится шагом с нулевым diff (`+0 / -0`).

#### Proposed Replacement / Fix Specification
В шаге 07 объявить только каркас функции `function initSlider() { ... }`, не вызывая её в `DOMContentLoaded` вплоть до финального шага 20.
---

---

### Issue #79: Преждевременная реализация функции stopAuto()

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/15-start-auto-func.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1333)
- **Defect Classification:** `[ДУБЛИРОВАНИЕ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `1320-1323`

#### Problem Description
В эталонном решении шага 15 добавлены сразу обе функции — `startAuto()` И `stopAuto()`:
```javascript
  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }
```
В результате следующий шаг 16 (`16-stop-auto-func.md`), посвящённый реализации `stopAuto()`, оказывается полностью выполненным заранее.

#### Proposed Replacement / Fix Specification
В шаге 15 объявить `stopAuto` как заглушку:
```javascript
  function stopAuto() {
    // Будет реализовано на следующем шаге
  }
```
---

---

### Issue #80: Ошибка Zero-Diff (+0 / -0): код уже присутствует в стартере

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/16-stop-auto-func.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1341)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `14-16, 1061-1341`

#### Problem Description
В файле `js:start` функция `stopAuto()` уже содержит строку `if (timerId) clearInterval(timerId);`. Дифф между `js:start` и `js:solution` равен строго 0 строк (`+0 / -0`). Ученик видит задание «Заполните внутренности функции stopAuto()», но они уже заполнены.

#### Proposed Replacement / Fix Specification
В `js:start` оставить пустое тело `function stopAuto() {}`, а в `js:solution` оставить добавление проверки `if (timerId) clearInterval(timerId);`.
---

---

### Issue #81: Ошибка Zero-Diff (+0 / -0): вызов initSlider() уже в стартере

- **Target Lesson:** `07-slider` (Урок 07 — Слайдер (24 файла))
- **Affected File Path:** `content/lessons/07-slider/20-call-init-slider.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1348)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `13-17, 784, 1069`

#### Problem Description
Задание просит: *«Найдите DOMContentLoaded в верху файла и добавьте вызов initSlider()»*. Но в `js:start` на строке 784 вызов `initSlider();` уже прописан (он попал туда ещё из шага 07). Diff между стартером и решением равен ровно 0 строк (`+0 / -0`).

#### Proposed Replacement / Fix Specification
В `js:start` удалить строку `initSlider();` из блока `DOMContentLoaded`, чтобы студент выполнил реальное действие для завершения урока.
---

---

### Issue #82: Дидактический пробел: изучение debounce без применения в проекте

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/00-theory-04-input-event.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 188)
- **Defect Classification:** `[ПРОБЕЛ]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `30-75`

#### Problem Description
В теории подробно разбирается концепция и ручная реализация `debounce(fn, delay)` на таймерах. Однако в практических шагах (07-09) живой поиск вешается напрямую на событие `input` без debounce (`searchInput.addEventListener('input', applyFilter)`). Студенты изучают сложную тему замыканий и таймеров для поиска, но в основном проекте она остаётся невостребованной.

#### Proposed Replacement / Fix Specification
Добавить в теорию пояснение, почему в учебном проекте с локальным массивом из 6 комнат допустим прямой вызов, а в реальных приложениях с бэкенд-запросами обязателен debounce. В качестве бонуса предложить обернуть `applyFilter` в debounce в шаге 09.
---

---

### Issue #83: Дидактическое расхождение: optgroup vs плоский список

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/00-theory-05-select.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 170)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Низкий`
- **Affected Lines / Scope:** `25-60`

#### Problem Description
В теории подробно объясняется группировка через `<optgroup>` и создание элементов через `document.createElement`. Однако в практическом шаге 18 выпадающий список комнат заполняется плоским шаблонным литералом `.map(r => <option ...>).join('')`.

#### Proposed Replacement / Fix Specification
В теории добавить сравнение двух подходов: генерация через шаблонные строки `.map()` для простых списков и `document.createElement + optgroup` для сложных иерархий.
---

---

### Issue #84: Дидактический разрыв: объект Date не используется в калькуляторе проекта

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/00-theory-06-dates.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 141)
- **Defect Classification:** `[ПРОБЕЛ]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `20-55`

#### Problem Description
Урок 06 целиком посвящён объекту `Date`, парсингу ISO-дат и вычислению длительности `(end - start) / (1000 * 60 * 60)`. Однако форма бронирования в проекте (шаги 13, 20-22) содержит только дату заезда и числовое поле `hoursInput` (`<input type="number">`), а итоговая стоимость считается как `price * hours` без участия `Date`.

#### Proposed Replacement / Fix Specification
Явно упомянуть в теории, что на практике бывает два сценария: выбор времени «от и до» (где требуется `Date`) и выбор количества часов (как в нашем MVP «СмартОфис»). Показать в теории оба примера.
---

---

### Issue #85: Отсутствие доступного лейбла у поля поиска

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/01-catalog-toolbar-html.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1185)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `67-68`

#### Problem Description
В разметке тулбара поле ввода имеет только placeholder: `<input type="text" id="searchInput" placeholder="Поиск по названию...">`. Отсутствует тег `<label>` или атрибут `aria-label`, что нарушает стандарты веб-доступности (a11y).

#### Proposed Replacement / Fix Specification
Добавить `aria-label="Поиск офисных комнат"`:
```html
<input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию..." aria-label="Поиск офисных комнат">
```
---

---

### Issue #86: Инструкция по удалению renderCatalog vs повторное появление функции

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/03-init-filters-skeleton.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1324)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `14-16, 784`

#### Problem Description
Задание требует: *«Полностью УДАЛИТЕ вашу старую функцию renderCatalog из файла main.js»*. Но в последующих шагах (вплоть до шага 11) в стартовых файлах `renderCatalog` вновь оказывается на месте.

#### Proposed Replacement / Fix Specification
Убедиться, что в стартовых шаблонах всех последующих шагов (04-10) старая функция `renderCatalog` удалена, чтобы не дезориентировать студента.
---

---

### Issue #87: Критическая рассинхронизация: код будущих уроков в js:start

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/05-displayed-rooms-state.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1482)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `930-1140`

#### Problem Description
В `js:start` вставлена версия `main.js` из конца урока 08 (содержит 210 строк кода: калькулятор бронирования, валидацию формы, генерацию номеров заявок). Задание просит добавить всего одну строчку `let displayedRooms = [...OFFICE_ROOMS];`, а эталонное решение удаляет 210 строк чужого кода!

#### Proposed Replacement / Fix Specification
Заменить `js:start` на актуальное состояние файла по итогам шага 04 (без кода калькулятора бронирования).
---

---

### Issue #88: Ошибка Zero-Diff (+0 / -0): слушатель input уже в стартере

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/09-search-event.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1450)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `14-16, 1109, 1446`

#### Problem Description
Задание: *«Повесьте слушатель input на поисковое поле и передайте ему вашу функцию applyFilter»*. В `js:start` на строке 1109 эта строка уже присутствует: `if (searchInput) searchInput.addEventListener('input', applyFilter);`. Diff равен 0 строк (`+0 / -0`).

#### Proposed Replacement / Fix Specification
Удалить строку 1109 из `js:start`, предоставив учащемуся написать её самостоятельно.
---

---

### Issue #89: Конфликт дублирующих функций в js:start

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/11-call-init-filters.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1448)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `784, 1180-1280`

#### Problem Description
В `js:start` одновременно присутствуют и вызываются обе функции: `renderCatalog()` и `initCatalogFilters()`. Это создает хаос в понимании структуры скрипта.

#### Proposed Replacement / Fix Specification
В `js:start` удалить остатки старой `renderCatalog()`, оставив только задачу по вызову `initCatalogFilters();` в `DOMContentLoaded`.
---

---

### Issue #90: Ошибка Zero-Diff (+0 / -0): форма уже вставлена в стартер

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/13-booking-form-html.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1461)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `14-16, 152, 1412`

#### Problem Description
Задание: *«Вставьте эту форму внутрь вашей карточки .form-card на странице booking.html»*. В `html:start` (строка 152) вся форма `<form id="bookingForm">` уже полностью вставлена. Diff между стартером и решением равен 0 строк (`+0 / -0`).

#### Proposed Replacement / Fix Specification
В `html:start` оставить внутри `.form-card` пустой контейнер или комментарий `<!-- Вставьте форму сюда -->`.
---

---

### Issue #91: Противоречие в задании («Ничего вписывать не нужно») и скрытый diff

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/14-create-mybookings-page.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1430)
- **Defect Classification:** `[ЗАДАНИЕ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `15-17, 57 строк diff`

#### Problem Description
В задании прямо написано: *«Представьте, что вы создали файл my-bookings.html в вашем проекте и скопировали туда стандартный HTML каркас. Идем дальше! Ничего вписывать не нужно»*. Однако в `html:start` загружен файл `booking.html`, а в `html:solution` зашит `my-bookings.html` (diff 57 строк). Студент следует указанию ничего не писать и получает непройденный шаг.

#### Proposed Replacement / Fix Specification
Сформулировать конкретное задание:
```markdown
## 🛠 Задание
Откройте страницу `my-bookings.html`. Замените заголовок на «Мои бронирования» и добавьте пустой контейнер для заявок:
`<div class="bookings-list" id="myBookingsList"></div>`.
```
---

---

### Issue #92: Инвертированный стартер: удаление 66 строк готового кода

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/16-init-booking-skeleton.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1501)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `200-265, 997`

#### Problem Description
В `js:start` функция `initBookingCalc()` УЖЕ ПОЛНОСТЬЮ НАПИСАНА (66 строк, включая сабмит и сохранение в `MOCK_BOOKINGS`). Задание просит объявить пустой скелет, а эталонное решение удаляет весь рабочий код.

#### Proposed Replacement / Fix Specification
Очистить `js:start` от будущей реализации `initBookingCalc()`, оставив место для написания скелета с нуля.
---

---

### Issue #93: Инвертированный стартер (шаг 2 из 5)

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/17-booking-auth-guard.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1512)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `200-265`

#### Problem Description
Аналогично шагу 16, в `js:start` находится финальный код шага 25.

#### Proposed Replacement / Fix Specification
Синхронизировать `js:start` строго с результатом шага 16.
---

---

### Issue #94: Инвертированный стартер (шаг 3 из 5)

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/18-populate-select.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1522)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `200-265`

#### Problem Description
В `js:start` находится финальный код шага 25.

#### Proposed Replacement / Fix Specification
Синхронизировать `js:start` строго с результатом шага 17.
---

---

### Issue #95: Инвертированный стартер (шаг 4 из 5)

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/19-auto-select-room.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1526)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `200-265`

#### Problem Description
В `js:start` находится финальный код шага 25.

#### Proposed Replacement / Fix Specification
Синхронизировать `js:start` строго с результатом шага 18.
---

---

### Issue #96: Инвертированный стартер (шаг 5 из 5)

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/20-update-price-func.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1499)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `200-265`

#### Problem Description
В `js:start` находится финальный код шага 25, решение удаляет 122 строки.

#### Proposed Replacement / Fix Specification
Синхронизировать `js:start` строго с результатом шага 19.
---

---

### Issue #97: Ложное требование вызова initBookingCalc()

- **Target Lesson:** `08-search` (Урок 08 — Поиск и фильтрация (31 файл))
- **Affected File Path:** `content/lessons/08-search/25-booking-redirect.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1564)
- **Defect Classification:** `[ЗАДАНИЕ]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `15-18, 813`

#### Problem Description
Задание гласит: *«И самое главное: не забудьте вызвать initBookingCalc() в самом верху файла в DOMContentLoaded!»*. Однако на строке 813 в `js:start` этот вызов уже присутствует. Дифф шага добавляет только уведомление и редирект, вызывая путаницу у студента.

#### Proposed Replacement / Fix Specification
Либо удалить строку 813 из `js:start`, либо убрать из текста задания требование добавить вызов, пояснив, что он уже настроен.
---

---

### Issue #98: Критическая синтаксическая ошибка: отсутствие type="module" в скрипте

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/00-theory-03-modules.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 142)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `119`

#### Problem Description
В теории подробно разъясняется, что без `type="module"` ключевые слова `export` и `import` вызывают фатальную ошибку браузера. Но в собственном тренажёре теории в `html:start` (строка 119) подключение скрипта написано без атрибута модуля: `<script src="js/main.js"></script>`. При исполнении решения браузер падает с ошибкой `Uncaught SyntaxError: Cannot use export statement outside a module`.

#### Proposed Replacement / Fix Specification
В строке 119 заменить на:
```html
  <script type="module" src="js/main.js"></script>
```
---

---

### Issue #99: Преждевременный сброс всех CSS-классов финала

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/01-bookings-list-css.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1869)
- **Defect Classification:** `[ЗАДАНИЕ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `1090-1264`

#### Problem Description
Задание требует добавить стили только для контейнера `.bookings-list`. В `css:solution` добавляются стили сразу для трех сущностей (`.bookings-list`, `.booking-item`, `.empty-message`), опережая шаги 02 и 03.

#### Proposed Replacement / Fix Specification
В `css:solution` оставить только класс `.bookings-list`.
---

---

### Issue #100: Отсутствие стилей шага 01 в css:start

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/02-booking-item-css.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1865)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `142-698`

#### Problem Description
В `css:start` отсутствует класс `.bookings-list`, написанный на шаге 01.

#### Proposed Replacement / Fix Specification
Включить стили шага 01 в `css:start`.
---

---

### Issue #101: Отсутствие стилей шагов 01-02 в css:start

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/03-empty-message-css.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1866)
- **Defect Classification:** `[ПЛАВНОСТЬ]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `142-698`

#### Problem Description
В `css:start` отсутствуют стили `.bookings-list` и `.booking-item`.

#### Proposed Replacement / Fix Specification
Включить стили шагов 01-02 в `css:start`.
---

---

### Issue #102: Инвертированный стартер: функция полностью написана в стартере

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/04-init-mybookings-skeleton.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1588)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `1105-1140`

#### Problem Description
В `js:start` функция `initMyBookings()` уже содержит всю финальную логику шагов 04-08 (auth guard, empty state, `.map`, верстку карточек бронирования). Решение удаляет 35 строк готового кода, чтобы оставить один скелет.

#### Proposed Replacement / Fix Specification
Очистить `js:start` от будущей реализации, оставив пустой каркас функции `function initMyBookings() { ... }`.
---

---

### Issue #103: Инвертированный стартер (шаг 2 из 5)

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/05-mybookings-auth-guard.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1594)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `1105-1140`

#### Problem Description
В `js:start` функция содержит код шагов 06-08.

#### Proposed Replacement / Fix Specification
Синхронизировать `js:start` строго с результатом шага 04.
---

---

### Issue #104: Инвертированный стартер (шаг 3 из 5)

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/06-check-empty-array.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1598)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `1105-1140`

#### Problem Description
В `js:start` функция содержит код шагов 07-08.

#### Proposed Replacement / Fix Specification
Синхронизировать `js:start` строго с результатом шага 05.
---

---

### Issue #105: Инвертированный стартер (шаг 4 из 5)

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/07-render-mock-bookings.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1603)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `1105-1140`

#### Problem Description
В `js:start` функция содержит готовый шаблон карточки из шага 08.

#### Proposed Replacement / Fix Specification
Синхронизировать `js:start` строго с результатом шага 06.
---

---

### Issue #106: Инвертированный стартер (шаг 5 из 5)

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/08-booking-card-html.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1617)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `1105-1140`

#### Problem Description
В `js:start` верстка карточки уже полностью написана.

#### Proposed Replacement / Fix Specification
В `js:start` оставить схематичный вывод `${item.roomTitle} - ${item.totalPrice} ₽` из шага 07, чтобы студент вставил детальную верстку в шаге 08.
---

---

### Issue #107: Ошибка Zero-Diff (+0 / -0): вызов уже добавлен в стартере

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/09-call-init-mybookings.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1616)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Критический`
- **Affected Lines / Scope:** `15-18, 796, 1212`

#### Problem Description
Задание торжественно объявляет: *«Добавьте этот вызов! Это последняя строчка кода, которую вы напишете в этом курсе по фронтенду. Найдите DOMContentLoaded... и вызовите initMyBookings()»*. Но на строке 796 в `js:start` этот вызов УЖЕ НАПИСАН! Diff равен строго 0 строк (`+0 / -0`). Финальный триумфальный шаг курса оказывается сломанным.

#### Proposed Replacement / Fix Specification
Удалить строку 796 `initMyBookings();` из `js:start`.
---

---

### Issue #108: type: practice без задания и хардкод видимости в навигации

- **Target Lesson:** `09-final` (Урок 09 — Финал и сборка проекта (13 файлов))
- **Affected File Path:** `content/lessons/09-final/10-final-congratulations.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 1213)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `2, 55`

#### Problem Description
1. Во frontmatter указано `type: practice`, однако в файле нет ни задания (`## 🛠 Задание`), ни блока решения (`:solution`). Это чисто информационный поздравительный экран.
  2. В `html:start` на строке 55 прописан инлайн-стиль: `<li id="myBookingsNavItem" style="display: block;">`. На протяжении всего курса этот пункт меню был скрыт `display: none;` и открывался динамически через JS при авторизации пользователя. Инлайн `display: block;` ломает логику авторизации.

#### Proposed Replacement / Fix Specification
1. Изменить frontmatter на `type: theory` (или `type: final`).
  2. В строке 55 вернуть `style="display: none;"`, чтобы навигация управлялась скриптом `initAuthNav()`.
---

---

### Issue #109: type: theory во frontmatter и статичный вывод

- **Target Lesson:** `10-troubleshooting` (Урок 10 — Troubleshooting (5 файлов))
- **Affected File Path:** `content/lessons/10-troubleshooting/01-security-error-localstorage.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 127)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `4, 93, 115-126`

#### Problem Description
1. Во frontmatter указано `type: theory`, хотя урок 10 заявлен в учебном плане как чисто практический тренажёр решения багов.
  2. В решении функция `safeReadUser` объявляется, но не вызывается, а элемент `<div id="output">Результат выводится в консоль...</div>` остаётся статичным.

#### Proposed Replacement / Fix Specification
1. Заменить frontmatter на `type: practice`.
  2. В `js:solution` добавить вызов и вывод в DOM:
```javascript
const user = safeReadUser('currentUser');
document.getElementById('output').textContent = 'Текущий пользователь: ' + user;
```
---

---

### Issue #110: type: theory и отсутствие вызова bindSearchEvent

- **Target Lesson:** `10-troubleshooting` (Урок 10 — Troubleshooting (5 файлов))
- **Affected File Path:** `content/lessons/10-troubleshooting/02-type-error-null-dom.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 125)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `4, 115-124`

#### Problem Description
1. Frontmatter содержит `type: theory` вместо `type: practice`.
  2. Функция `bindSearchEvent()` объявляется, но нигде не вызывается. Без вызова функции ошибка `TypeError` даже не воспроизведётся в стартовом коде, а студент не увидит работу своего исправления.

#### Proposed Replacement / Fix Specification
1. Заменить frontmatter на `type: practice`.
  2. В конце `js:start` и `js:solution` добавить вызов:
```javascript
bindSearchEvent();
```
---

---

### Issue #111: type: theory и вывод распарсенного объекта

- **Target Lesson:** `10-troubleshooting` (Урок 10 — Troubleshooting (5 файлов))
- **Affected File Path:** `content/lessons/10-troubleshooting/03-syntax-error-tokens.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 113)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `4, 82, 107-112`

#### Problem Description
1. Frontmatter содержит `type: theory` вместо `type: practice`.
  2. В песочнице блок `#output` гласит «Объект компилируется...». При исправлении синтаксиса полезно визуализировать успешный результат.

#### Proposed Replacement / Fix Specification
1. Заменить frontmatter на `type: practice`.
  2. В `js:solution` добавить отображение созданного объекта:
```javascript
document.getElementById('output').textContent = `Объект ${roomData.title} успешно инициализирован (цена: ${roomData.price} ₽)`;
```
---

---

### Issue #112: type: theory и неполноценный тег head

- **Target Lesson:** `10-troubleshooting` (Урок 10 — Troubleshooting (5 файлов))
- **Affected File Path:** `content/lessons/10-troubleshooting/04-network-404-paths.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 104)
- **Defect Classification:** `[ОШИБКА]`
- **Priority:** `Высокий`
- **Affected Lines / Scope:** `4, 58-64`

#### Problem Description
1. Frontmatter содержит `type: theory` вместо `type: practice`.
  2. В `html:start` и `html:solution` внутри тега `<head>` отсутствуют обязательные метатеги `<meta charset="UTF-8">`, `<meta name="viewport" ...>` и `<title>`, хотя в уроках 01 и 02 декларировалась обязательность валидного HTML-каркаса.

#### Proposed Replacement / Fix Specification
1. Заменить frontmatter на `type: practice`.
  2. В тег `<head>` добавить стандартные метатеги и заголовок:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог — Проверка путей</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
</head>
```
---

---

### Issue #113: type: theory и демонстрационный вызов debugFilterRooms

- **Target Lesson:** `10-troubleshooting` (Урок 10 — Troubleshooting (5 файлов))
- **Affected File Path:** `content/lessons/10-troubleshooting/05-devtools-mastery.md`
- **File Exists on Disk:** ✅ Verified (Total file lines: 123)
- **Defect Classification:** `[ПОДАЧА]`
- **Priority:** `Средний`
- **Affected Lines / Scope:** `4, 81, 107-122`

#### Problem Description
1. Frontmatter содержит `type: theory` вместо `type: practice`.
  2. Функция `debugFilterRooms` не вызывается с тестовыми данными. Консоль DevTools остаётся пустой, и замер `console.time` не демонстрируется.

#### Proposed Replacement / Fix Specification
1. Заменить frontmatter на `type: practice`.
  2. В `js:solution` добавить тестовый запуск:
```javascript
const testRooms = [
  { name: 'Фокус', price: 450 },
  { name: 'Альфа', price: 1200 },
  { name: 'Бета', price: 800 }
];
debugFilterRooms(testRooms, 900);
document.getElementById('output').textContent = 'Фильтрация завершена. Откройте вкладку Console в DevTools.';
```
---

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 61 | `06-forms` | Dialog Modal Contextualization | Clarify that <dialog> modal is an alternative pattern for extension, not directly wired in practice | `Theory lesson 00-theory-06-modal.md` | `Clear disclaimer in preamble` | Confusion over unused <dialog> in subsequent practice steps | `content/AUDIT_REPORT.md` |
| 62-65 | `06-forms` | Login/Register Step Sequencing & Non-Zero Diff | Step 01 and 03 should only provide form cards/containers; steps 02 and 04 introduce inputs/labels to ensure non-zero diff | `Lesson 01 & 03 solution; Lesson 02 & 04 starter` | `Meaningful diff in practice steps (+inputs)` | Zero-diff error where students have nothing to edit | `content/AUDIT_REPORT.md` |
| 66 | `06-forms` | Toast Notification Error Palette | Login failure toast notification must use error type rather than nonexistent danger type | `showNotification call in 20-login-error-ui.md` | `Red/error notification toast (#dc3545)` | Green success toast displayed on login error due to fallback | `content/AUDIT_REPORT.md` |
| 67 | `06-forms` | Form Functions Call Instruction | Instruction should clearly state which function to invoke depending on current form context (initLogin vs initRegister) | `Task instruction in 21-call-form-functions.md` | `Accurate task directive matching current page` | Misleading prompt asking to call both functions on same page | `content/AUDIT_REPORT.md` |
| 68-71 | `07-slider` | Slider Theory Fundamentals | Accurate absolute positioning parent rule, mandatory initial render call, theme toggle symmetry, and interval timer setup | `Theory steps 00-theory-01 to 04` | `Precise didactic definitions and consistent demo scripts` | Didactic misalignment between theory, tasks, and project code | `content/AUDIT_REPORT.md` |
| 72-78 | `07-slider` | Slider HTML/CSS Step Progression | Sequential styling of slider container, slides, active states, buttons (with accessible aria-labels), dots, and JS skeleton | `CSS & HTML blocks in steps 01-07` | `Progressive cumulative styles retained across steps` | Lost CSS styles in starter blocks (desynchronization) | `content/AUDIT_REPORT.md` |
| 79-81 | `07-slider` | Auto-slider Control & Zero-Diff Elimination | Encapsulate stopAuto() in its own step; ensure starter in 16 does not pre-populate code; ensure step 20 has non-zero diff for initSlider() | `JS functions in steps 15, 16, 20` | `Distinct step boundaries for timer management and initialization` | Zero-diff and premature implementation bugs | `content/AUDIT_REPORT.md` |
| 82-84 | `08-search` | Search/Filter Theory Alignment | Connect input event debounce, select/optgroup, and Date object to practical project relevance | `Theory steps 00-theory-04 to 06` | `Grounding theoretical concepts into project reality` | Didactic gaps where introduced concepts are never applied | `content/AUDIT_REPORT.md` |
| 85 | `08-search` | Accessible Search Input | Add aria-label to search input in catalog toolbar for screen reader accessibility | `HTML input tag in 01-catalog-toolbar-html.md` | `<input aria-label='Поиск офисных комнат'>` | Accessibility violation (missing label/aria-label) | `content/AUDIT_REPORT.md` |
| 86-91 | `08-search` | Catalog Filtering & Booking Page Sequencing | Clean up renderCatalog instructions, sync displayedRooms state, eliminate duplicate functions, fix Zero-Diff in booking form and page creation | `Steps 03, 05, 09, 11, 13, 14` | `Synchronized filter states and clean task transitions` | Zero-diff, duplicate function definitions, inverted diff | `content/AUDIT_REPORT.md` |
| 92-96 | `08-search` | Booking Calculator Inverted Starter Fix | Eliminate inverted starter pattern across 5 steps (16-20) where starter already has 66 lines of completed code | `js:start and js:solution in steps 16-20` | `Empty initial function in step 16; incremental additions in 17-20` | Inverted starter bug forcing user to delete existing solution | `content/AUDIT_REPORT.md` |
| 97 | `08-search` | Booking Redirect Init Call Removal | Remove redundant initBookingCalc() call requirement from step 25 since calc is already initialized in step 22 | `Task text and solution in step 25` | `Single init call on DOMContentLoaded` | Double initialization of booking calculator | `content/AUDIT_REPORT.md` |
| 98 | `09-final` | ES Module Script Type Specifier | Add type='module' attribute to <script src='main.js'> in theoretical explanation of ES modules | `HTML script tag in 00-theory-03-modules.md` | `<script type='module' src='main.js'></script>` | SyntaxError: Cannot use import statement outside a module | `content/AUDIT_REPORT.md` |
| 99-101 | `09-final` | My Bookings CSS Styling Progression | Retain previous CSS rules across bookings list, booking item, and empty message styling steps | `CSS starters in steps 01-03` | `Cumulative CSS styling without resetting previous rules` | Premature reset of styling classes in starter code | `content/AUDIT_REPORT.md` |
| 102-106 | `09-final` | My Bookings Inverted Starter Resolution | Step 04 must provide empty function skeleton; steps 05-08 incrementally implement auth guard, empty check, and rendering | `js:start in steps 04-08` | `Clean skeleton in 04, incremental diffs in 05-08` | Inverted starter where function is fully implemented at step 04 | `content/AUDIT_REPORT.md` |
| 107-108 | `09-final` | Final Assembly Zero-Diff & Frontmatter Practice Type | Eliminate Zero-diff in call-init-mybookings; configure step 10 as theory/congratulations or proper practice task with dynamic UI toggle | `Steps 09 and 10 in 09-final` | `Clear final congratulations and clean call diff` | Zero-diff and empty practice task without instructions | `content/AUDIT_REPORT.md` |
| 109-113 | `10-troubleshooting` | Troubleshooting Frontmatter & Live Exercise Validation | Fix frontmatter type (practice vs theory) and ensure diagnostic scripts actually execute with sample data in DevTools | `Steps 01-05 in 10-troubleshooting` | `Interactive runnable troubleshooting sessions with visible DevTools output` | Passive theory-labeled files with static uninvoked debugging functions | `content/AUDIT_REPORT.md` |

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Zero-Diff in Practice Steps | Step 02 (login form), Step 04 (register form), Step 16 (stop-auto), Step 20 (init-slider), Step 09 (search-event), Step 13 (booking-form), Step 09 (mybookings-init) | Diff is 0 lines (+0 / -0). The solution code is already present in starter code, leaving student with no executable task. |
| 2 | Inverted Starter Pattern | Lesson 08 Steps 16-20 (initBookingCalc) & Lesson 09 Steps 04-08 (initMyBookings) | The starter code contains the entire completed function (66+ lines), and each subsequent step effectively deletes or rewrites pre-existing code rather than building it up. |
| 3 | Toast Notification Fallback Collision | 20-login-error-ui.md calling showNotification('...', 'danger') | Dictionary only defines 'success', 'error', 'info'. When passed 'danger', it falls back to 'success', displaying error messages in green. |
| 4 | Missing type='module' in ES Script Tag | 00-theory-03-modules.md explaining import/export with standard <script src='main.js'> | Browser throws SyntaxError: Cannot use import statement outside a module because script tag lacks type='module' attribute. |
| 5 | Frontmatter Type Mismatch in Troubleshooting | 10-troubleshooting steps 01-05 marked as type: theory | Steps are designed as hands-on debugging exercises with interactive starter and solution codes, but UI renders them as static reading pages. |
| 6 | HTML Button Accessibility Without Type or Labels | 07-slider/05-slider-css-buttons.md & 08-search/01-catalog-toolbar-html.md | Slider buttons omit type='button' (defaulting to submit if wrapped in form) and lack aria-label. Search input lacks accessible label or aria-label. |
| 7 | Double Function Initialization Conflict | 08-search/11-call-init-filters.md and 08-search/25-booking-redirect.md | Starter code contains duplicate definitions of helper functions or requests calling functions that are already invoked on DOMContentLoaded. |
| 8 | Premature Implementation in Earlier Step Solution | 06-forms/01-create-login-page.md & 07-slider/15-start-auto-func.md | Solution of earlier step contains full code of subsequent step (e.g. step 01 solution has inputs of step 02; step 15 has stopAuto() of step 16). |

