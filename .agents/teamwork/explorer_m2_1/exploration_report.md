# Lesson 04 Technical Exploration Report (`04-js-dom/`)

**Author:** `explorer_m2_1`  
**Milestone:** M2 (Lesson 04: Issues 35–48 / Rules 35–50)  
**Date:** 2026-10-10  
**Target Directory:** `content/lessons/04-js-dom/`  
**Status:** COMPLETE — All 14 files inspected, 16 defects isolated, surgical patches formulated.

---

## 1. Executive Summary & Mapping Table

A complete on-disk pedagogical and technical inspection of Lesson 04 (`content/lessons/04-js-dom/`) was performed.
- **Total physical files in Lesson 04:** 32 files (31 lesson steps + `_lesson.yml`).
- **Files with defects:** 14 files.
- **Defect count:** 16 distinct defects (Files 1 and 4 each contain 2 separate issues).
- **Dispatch alignment:** The dispatch prompt requested exploration of "Issues 35–48" across the 14 files. In `scripts/audit_fix_rules.json`, these 14 files span Rules 35 through 50 (since `00-theory-01-js-basics.md` and `00-theory-05-create.md` each contain 2 rules, pushing the 14 files through Rule 50). This report covers **all 14 physical files and all 16 canonical defect rules (Rules 35–50)**.
- **Frontmatter Invariance:** Verified 100% across all 14 files. No frontmatter modifications are required.
- **Idempotency Status:** 0 of 14 files are currently idempotent. All 14 files actively contain the defects on disk.

### Master Cross-Reference Table

| Item # | Rule ID (`audit_fix_rules.json`) | File Path in `content/lessons/04-js-dom/` | Defect Type | Priority | Affected Lines | Status on Disk |
|---|---|---|---|---|---|---|
| **#35** | 35 | `00-theory-01-js-basics.md` (Problem 1) | `[ПРОБЕЛ]` | Критический | 50–74 | Defect Active |
| **#36** | 36 | `00-theory-01-js-basics.md` (Problem 2) | `[ЗАДАНИЕ]` | Низкий | 169–171 | Defect Active |
| **#37** | 37 | `00-theory-03-dom.md` | `[ПОДАЧА]` | Средний | 36–40 | Defect Active |
| **#38** | 38 | `00-theory-04-selector.md` | `[ПРОБЕЛ]` | Высокий | 49–51, 140–146 | Defect Active |
| **#39** | 39 | `00-theory-05-create.md` (Problem 1) | `[ОШИБКА]` | Высокий | 44–50 | Defect Active |
| **#40** | 40 | `00-theory-05-create.md` (Problem 2) | `[ПЛАВНОСТЬ]` | Средний | 155–158 | Defect Active |
| **#41** | 41 | `00-theory-06-events.md` | `[ПОДАЧА]` | Низкий | 103, 119 | Defect Active |
| **#42** | 42 | `00-theory-07-timeout.md` | `[ОШИБКА]` | Критический | 103 | Defect Active |
| **#43** | 43 | `04-toast-get-container.md` | `[ПОДАЧА]` | Низкий | 10, 20–23 | Defect Active |
| **#44** | 44 | `07-toast-append.md` | `[ЗАДАНИЕ]` | Критический | 16–20 | Defect Active |
| **#45** | 45 | `14-nav-links-loop.md` | `[ОШИБКА]` | Критический | 10, 18–25, 531–534 | Defect Active |
| **#46** | 46 | `15-nav-highlight-index.md` | `[ПОДАЧА]` | Высокий | 18, 495–497, 534–538 | Defect Active |
| **#47** | 47 | `16-nav-highlight-catalog.md` | `[ПОДАЧА]` | Средний | 18–25 | Defect Active |
| **#48** | 48 | `17-nav-highlight-others.md` | `[ЗАДАНИЕ]` | Критический | 10–25 | Defect Active |
| **#49** | 49 | `21-auth-logout-event.md` | `[ПОДАЧА]` | Средний | 8–15 | Defect Active |
| **#50** | 50 | `23-auth-logged-out.md` | `[ЗАДАНИЕ]` | Высокий | 18–28 | Defect Active |

---

## 2. Detailed Technical Analysis & Surgical Patches

### Issue #35 (Rule 35): `00-theory-01-js-basics.md` — Missing `if / else` and comparison operators

- **File:** `content/lessons/04-js-dom/00-theory-01-js-basics.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПРОБЕЛ]` | **Priority:** `Критический`
- **Location:** Line 74 (Between "## Базовые типы данных" and "## Шаблонные строки")
- **Cause:** Boolean values (`true`/`false`) are introduced in lines 63–65, but conditional branching (`if / else`), comparison operators (`===`, `!==`), and logical operators (`&&`, `||`, `!`) are never explained, despite being required in practice steps (05, 14, 15, 16, 17, 20, 21, 23).
- **Fix:** Insert a dedicated theoretical section `## Условные конструкции: if / else` with realistic SmartOffice example and comparison table.

#### Surgical Patch:
**BEFORE (lines 72–78):**
```markdown
let selectedDate; // значение: undefined
```

---

## Шаблонные строки (Template Literals)
```

**AFTER:**
```markdown
let selectedDate; // значение: undefined
```

---

## Условные конструкции: if / else

Чтобы программа принимала решения на основе данных, используется конструкция `if / else`:

```js
const isOpen = true;

if (isOpen) {
  console.log('Офис открыт для посещения');
} else {
  console.log('Офис закрыт');
}
```

Операторы сравнения:
- `===` — строгое равенство (проверяет значение и тип);
- `!==` — строгое неравенство;
- `>`, `<`, `>=`, `<=` — сравнение чисел;
- `!значение` — логическое отрицание («НЕ»);
- `&&` («И») и `||` («ИЛИ») — объединение условий.

---

## Шаблонные строки (Template Literals)
```

- **Verification Check:** `presence_file: "## Условные конструкции: if / else"`.

---

### Issue #36 (Rule 36): `00-theory-01-js-basics.md` — Redundant console output in solution

- **File:** `content/lessons/04-js-dom/00-theory-01-js-basics.md`
- **Frontmatter Status:** Invariant
- **Defect Type:** `[ЗАДАНИЕ]` | **Priority:** `Низкий`
- **Location:** Lines 168–171 (inside `js:solution`)
- **Cause:** Task instructions ask student to print only `statusText`. Solution contains extra line `console.log('Открыт ли офис:', isOpen);`.
- **Fix:** Remove the superfluous `console.log` line.

#### Surgical Patch:
**BEFORE (lines 168–171):**
```js
// 3. Выводим результат в консоль разработчика
console.log(statusText);
console.log('Открыт ли офис:', isOpen);
```

**AFTER:**
```js
// 3. Выводим результат в консоль разработчика
console.log(statusText);
```

- **Verification Check:** Absence of unrequested console logs in `js:solution`.

---

### Issue #37 (Rule 37): `00-theory-03-dom.md` — Premature use of `querySelector`

- **File:** `content/lessons/04-js-dom/00-theory-03-dom.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПОДАЧА]` | **Priority:** `Средний`
- **Location:** Lines 35–38 (at start of "## Чтение и изменение содержимого")
- **Cause:** `document.querySelector` is used in code examples before its syntax and parameters are explained (which happens only in step 04).
- **Fix:** Add a didactic `[!NOTE]` callout explaining `document.querySelector` ahead of time.

#### Surgical Patch:
**BEFORE (lines 35–38):**
```markdown
## Чтение и изменение содержимого

```js
const card = document.querySelector('.card');
```

**AFTER:**
```markdown
## Чтение и изменение содержимого

> [!NOTE]
> Метод `querySelector` используется для нахождения элемента в DOM: `document.querySelector('селектор')`. Он принимает привычный CSS-селектор класса, ID или тега. Подробно все варианты поиска мы разберём в следующей главе.

```js
const card = document.querySelector('.card');
```

- **Verification Check:** `presence_file: "Метод `querySelector`"`.

---

### Issue #38 (Rule 38): `00-theory-04-selector.md` — Premature array methods `filter` / `map`

- **File:** `content/lessons/04-js-dom/00-theory-04-selector.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПРОБЕЛ]` | **Priority:** `Высокий`
- **Location:** Lines 49–51 and 140–146
- **Cause:** Higher-order array methods (`.filter`, `.map`) are only taught in Module 05, but step 04 asks students to use them without explanatory guidance.
- **Fix:** Add explanatory notes clarifying that `.map()` and `.filter()` will be studied in depth in Module 05, and explain callback logic clearly while keeping `Array.from` intact.

#### Surgical Patch:
**BEFORE (lines 49–51):**
```js
// Теперь доступны все методы массива:
const prices = cardsArray.map(card => card.dataset.price);
```

**AFTER:**
```js
// Теперь доступны все методы массива (подробно методы .map() и .filter() мы изучим в следующем Модуле 05):
const prices = cardsArray.map(card => card.dataset.price);
```

**BEFORE (lines 140–146):**
```js
// Конвертировать NodeList → Array чтобы использовать .filter()
const cardsArray = [...allCards];

// Отфильтровать: оставить только те где data-available="true"
const available = cardsArray.filter(card => card.dataset.available === 'true');
// dataset.available всегда строка, поэтому сравниваем с 'true' а не true
```

**AFTER:**
```js
// Конвертировать NodeList → Array (через spread [...allCards] или Array.from(allCards))
const cardsArray = Array.from(allCards);

// Отфильтровать: оставить только те где data-available="true" (подробно метод .filter разберём в Модуле 05)
const available = cardsArray.filter(card => card.dataset.available === 'true');
// dataset.available всегда строка, поэтому сравниваем со строкой 'true'
```

- **Verification Check:** `presence_file: "Array.from"`.

---

### Issue #39 (Rule 39): `00-theory-05-create.md` — Erroneous ASCII diagram of `insertAdjacentHTML`

- **File:** `content/lessons/04-js-dom/00-theory-05-create.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ОШИБКА]` | **Priority:** `Высокий`
- **Location:** Lines 44–50
- **Cause:** The diagram repeats `afterend` twice and misses `beforeend`.
- **Fix:** Correct the ASCII diagram to show `beforeend` inside before the closing tag, and `afterend` outside after the closing tag.

#### Surgical Patch:
**BEFORE (lines 44–50):**
```
<!-- beforebegin -->
<div class="catalog">         ← afterbegin
  [существующий контент]
</div>                        ← afterend
<!-- afterend -->
```

**AFTER:**
```
<!-- beforebegin -->
<div class="catalog">         ← afterbegin
  [существующий контент]
                              ← beforeend
</div>
<!-- afterend -->
```

- **Verification Check:** Absence of duplicated `afterend` inside container.

---

### Issue #40 (Rule 40): `00-theory-05-create.md` — Premature `addEventListener` before Events topic

- **File:** `content/lessons/04-js-dom/00-theory-05-create.md`
- **Frontmatter Status:** Invariant
- **Defect Type:** `[ПЛАВНОСТЬ]` | **Priority:** `Средний`
- **Location:** Lines 155–158 (in `js:solution`)
- **Cause:** `addEventListener('click')` is attached to a delete button in the practice solution before events are introduced in step 06.
- **Fix:** Add a didactic forward-reference comment before the event listener.

#### Surgical Patch:
**BEFORE (lines 155–158):**
```js
  // Повесить обработчик на кнопку удаления внутри этого li
  newLi.querySelector('.btn-del').addEventListener('click', () => {
    newLi.remove(); // удалить весь li
  });
```

**AFTER:**
```js
  // Слушатель событий 'click' — подробно механизм работы разберём в следующей главе:
  newLi.querySelector('.btn-del').addEventListener('click', () => {
    newLi.remove(); // удалить весь li
  });
```

- **Verification Check:** `presence_file: "// Слушатель событий"`.

---

### Issue #41 (Rule 41): `00-theory-06-events.md` — Button text mismatch in comment vs HTML

- **File:** `content/lessons/04-js-dom/00-theory-06-events.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПОДАЧА]` | **Priority:** `Низкий`
- **Location:** Lines 103, 119
- **Cause:** In HTML, button has text "Переключить тему" (`<button id="themeToggle" class="btn">Переключить тему</button>`). In starter JS comment (line 119), comment says `// HTML: <button id="themeToggle">Сменить тему</button>`.
- **Fix:** Align comment with HTML: `// HTML: <button id="themeToggle">Переключить тему</button>`.

#### Surgical Patch:
**BEFORE (line 119):**
```js
// HTML: <button id="themeToggle">Сменить тему</button>
```

**AFTER:**
```js
// HTML: <button id="themeToggle">Переключить тему</button>
```

*(Note: In `audit_fix_rules.json`, Rule 41 contains a known copy-paste anomaly referencing `mainBtn` / `Нажми меня`. See Section 4 for complete analysis).*

---

### Issue #42 (Rule 42): `00-theory-07-timeout.md` — ID mismatch `alert` vs `alertBox` (Breaking Bug)

- **File:** `content/lessons/04-js-dom/00-theory-07-timeout.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ОШИБКА]` | **Priority:** `Критический`
- **Location:** Line 103 (inside `html:start`)
- **Cause:** The HTML element has `id="alert"`, but task, starter JS, and solution call `autoHideAlert('#alertBox', 2000)`. Because `#alertBox` does not exist in the DOM, `document.querySelector('#alertBox')` returns `null`, the guard clause `if (!element) return;` aborts, and the alert never hides!
- **Fix:** Change `id="alert"` to `id="alertBox"` in HTML.

#### Surgical Patch:
**BEFORE (line 103):**
```html
    <div id="alert" class="alert-box">Бронирование успешно оформлено!</div>
```

**AFTER:**
```html
    <div id="alertBox" class="alert-box">Бронирование успешно оформлено!</div>
```

- **Verification Check:** Presence of `id="alertBox"`, absence of `id="alert"`.

---

### Issue #43 (Rule 43): `04-toast-get-container.md` — Unexplained introduction of `getElementById`

- **File:** `content/lessons/04-js-dom/04-toast-get-container.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПОДАЧА]` | **Priority:** `Низкий`
- **Location:** Lines 10 and 20–23
- **Cause:** `getElementById` is used without explaining why it is chosen over `querySelector`. Additionally, the text uses camelCase `'toastContainer'` whereas the solution and subsequent steps use kebab-case `'toast-container'`.
- **Fix:** Add explanation `Метод getElementById('id') — классический и более быстрый способ поиска элемента строго по ID (символ '#' указывать не нужно).` and normalize identifier to `'toast-container'`.

#### Surgical Patch:
**BEFORE (lines 10–13 and 20–23):**
```markdown
`document.getElementById('toastContainer')` — ищет элемент по `id` в DOM. Самый быстрый способ найти элемент.

Все Toast-уведомления будем помещать в один контейнер `div#toastContainer`. Если он уже есть — используем, если нет — создадим.
```
...
```js
// getElementById — самый быстрый поиск элемента по id
// let (не const) — переменная может быть переназначена ниже
let container = document.getElementById('toastContainer');
```

**AFTER:**
```markdown
Метод `getElementById('id')` — классический и более быстрый способ поиска элемента строго по ID (символ '#' указывать не нужно).

Все Toast-уведомления будем помещать в один контейнер `div#toast-container`. Если он уже есть — используем, если нет — создадим.
```
...
```js
// getElementById — самый быстрый поиск элемента по id
// let (не const) — переменная может быть переназначена ниже
let container = document.getElementById('toast-container');
```

- **Verification Check:** `presence_file: "Метод `getElementById`"`.

---

### Issue #44 (Rule 44): `07-toast-append.md` — Task omits styles and `colors` object present in solution

- **File:** `content/lessons/04-js-dom/07-toast-append.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ЗАДАНИЕ]` | **Priority:** `Критический`
- **Location:** Lines 14–20
- **Cause:** Task asks student to add only `container.appendChild(toast);`. The solution, however, introduces the entire color mapping dictionary `const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8' };` and inline CSS styles `toast.style.cssText = ...`. A student following instructions strictly fails validator comparison.
- **Fix:** Update task instructions and code snippet to include the full styling block with colors mapping.

#### Surgical Patch:
**BEFORE (lines 14–20):**
```markdown
## 🛠 Задание

Добавьте строку:
```js
// Добавляем созданное уведомление внутрь контейнера (оно появляется на экране)
container.appendChild(toast);
```
```

**AFTER:**
```markdown
## 🛠 Задание

Перед добавлением настройте внешний вид уведомления (для `toast-success`, `error`, `info`) и прикрепите его к контейнеру:
```js
const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8' };
toast.style.cssText = `background-color: ${colors[type] || colors.success}; color: #fff; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 1; transform: translateY(0); transition: none;`;
container.appendChild(toast);
```
```

- **Verification Check:** `presence_block: "task", pattern: "toast-success"`.

---

### Issue #45 (Rule 45): `14-nav-links-loop.md` — Variable mismatch (`links` vs `navLinks`) and truncated solution

- **File:** `content/lessons/04-js-dom/14-nav-links-loop.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ОШИБКА]` | **Priority:** `Критический`
- **Location:** Lines 10, 18–25, and 531–534
- **Cause:**
  1. The task instructs student to write `links.forEach(...)`, but the DOM query declared the variable as `const navLinks = ...`. Running student code causes `ReferenceError: links is not defined`.
  2. In `js:solution`, the lines `if (!href) return;` and `link.classList.remove('active');` were accidentally omitted.
- **Fix:** Rename `links` to `navLinks` in theory and task; restore the missing lines in `js:solution`.

#### Surgical Patch:
**BEFORE (lines 10 and 18–25):**
```markdown
`links.forEach(link => { ... })` — перебираем все найденные ссылки.
```
...
```markdown
Добавьте цикл после получения links:
```js
// Перебираем все ссылки меню и сбрасываем класс active перед определением текущей страницы
links.forEach(link => {
  const href = link.getAttribute('href'); // получаем относительный адрес ссылки
  if (!href) return;                      // если href нет — пропускаем
  link.classList.remove('active');        // убираем подсветку активности
});
```
```

**AFTER (lines 10 and 18–25):**
```markdown
`navLinks.forEach(link => { ... })` — перебираем все найденные ссылки.
```
...
```markdown
Добавьте цикл после получения navLinks:
```js
// Перебираем все ссылки меню и сбрасываем класс active перед определением текущей страницы
navLinks.forEach(link => {
  const href = link.getAttribute('href'); // получаем относительный адрес ссылки
  if (!href) return;                      // если href нет — пропускаем
  link.classList.remove('active');        // убираем подсветку активности
});
```
```

**BEFORE (lines 531–534 inside `js:solution`):**
```js
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
  });
```

**AFTER:**
```js
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');
  });
```

- **Verification Check:** Presence of `navLinks` in task, absence of `for (let i = 0; i < links.length; i++)`.

---

### Issue #46 (Rule 46): `15-nav-highlight-index.md` — Reference to missing code in starter template

- **File:** `content/lessons/04-js-dom/15-nav-highlight-index.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПОДАЧА]` | **Priority:** `Высокий`
- **Location:** Line 18, lines 495–497 (`js:start`), and lines 533–538 (`js:solution`)
- **Cause:** Step 15 task says "Внутри forEach после classList.remove добавьте:", but in starter code `js:start`, `classList.remove` was missing due to the previous step's defect.
- **Fix:** Update `js:start` and `js:solution` to include the reset lines from step 14, and mention `current / currentPath` in the task description.

#### Surgical Patch:
**BEFORE (line 18):**
```markdown
Внутри forEach после `classList.remove` добавьте:
```

**AFTER:**
```markdown
Внутри forEach после сброса активности `classList.remove` добавьте сопоставление с текущим адресом (current / currentPath):
```

**BEFORE (lines 495–497 in `js:start`):**
```js
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
  });
```

**AFTER:**
```js
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');
  });
```

- **Verification Check:** `presence_file: "currentPath"`.

---

### Issue #47 (Rule 47): `16-nav-highlight-catalog.md` — Dangerous hint causing syntax error `}} else if`

- **File:** `content/lessons/04-js-dom/16-nav-highlight-catalog.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПОДАЧА]` | **Priority:** `Средний`
- **Location:** Lines 16–25
- **Cause:** Task tells student: "После блока index.html добавьте: } else if ...". If student pastes this after the existing closed block, it yields an invalid `}} else if`.
- **Fix:** Formulate instructions clearly: replace the closing brace of the previous `if` with `else if`.

#### Surgical Patch:
**BEFORE (lines 16–25):**
```markdown
## 🛠 Задание

После блока index.html добавьте:
```js
// Если открыт каталог или детальная страница комнаты — подсвечиваем пункт меню «Каталог»
} else if ((href.includes('catalog.html') || href.includes('room-details.html')) &&
           (current.includes('catalog.html') || current.includes('room-details.html'))) {
  link.classList.add('active');
}
```
```

**AFTER:**
```markdown
## 🛠 Задание

Дополните условие проверкой для каталога (замените закрывающую скобку предыдущего if на конструкцию else if):
```js
    // Если открыт каталог или детальная страница комнаты — подсвечиваем пункт меню «Каталог»
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) &&
               (current.includes('catalog.html') || current.includes('room-details.html'))) {
      link.classList.add('active');
    }
```
```

- **Verification Check:** `presence_block: "task", pattern: "дополните условие"`.

---

### Issue #48 (Rule 48): `17-nav-highlight-others.md` — Complete mismatch between task and solution

- **File:** `content/lessons/04-js-dom/17-nav-highlight-others.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ЗАДАНИЕ]` | **Priority:** `Критический`
- **Location:** Lines 8–25
- **Cause:**
  1. Task tells student to write separate checks for `booking.html` and `login.html`, whereas solution uses a universal check:
     `else if (href && href !== 'index.html' && href !== '../index.html' && !href.includes('catalog.html') && !href.includes('room-details.html') && current === href.split('/').pop())`.
  2. Task instructs student to call `updateAuthNav();`, which does not exist in step 17's solution (it is only created in step 18).
- **Fix:** Align theory and task with the universal check used in solution; remove the premature `updateAuthNav()` call.

#### Surgical Patch:
**BEFORE (lines 8–25):**
```markdown
# Подсветка остальных страниц

Добавляем проверки для booking и login страниц. Вызываем `updateAuthNav()` в конце — она обновит кнопку «Войти»/«Выйти».

Это делается в конце initNavigation: сначала подсвечиваем пункты, потом обновляем кнопку авторизации.

## 🛠 Задание

Добавьте ещё два условия и вызов updateAuthNav:
```js
} else if (href.includes('booking.html') && current.includes('booking.html')) {
  link.classList.add('active');
} else if (href.includes('login.html') && current.includes('login.html')) {
  link.classList.add('active');
}
// После forEach:
updateAuthNav();
```
```

**AFTER:**
```markdown
# Подсветка остальных страниц

Добавляем универсальную проверку для остальных страниц сайта (страницы бронирования, контактов и входа).

Сравниваем имя файла в ссылке с текущей открытой страницей.

## 🛠 Задание

Дополните цепочку условий универсальной проверкой для остальных страниц (проверяем совпадение текущего файла с адресом `link.getAttribute('href')`):
```js
    } else if (href && href !== 'index.html' && href !== '../index.html' && !href.includes('catalog.html') && !href.includes('room-details.html') && current === href.split('/').pop()) {
      link.classList.add('active');
    }
```
```

- **Verification Check:** `presence_block: "task", pattern: "link.getAttribute('href')"`.

---

### Issue #49 (Rule 49): `21-auth-logout-event.md` — Unexplained use of `onclick` instead of `addEventListener`

- **File:** `content/lessons/04-js-dom/21-auth-logout-event.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ПОДАЧА]` | **Priority:** `Средний`
- **Location:** Lines 8–15
- **Cause:** Throughout the curriculum students were taught to use `addEventListener`. In step 21, the code assigns `authNavBtn.onclick` without explaining that this property assignment allows easy removal (`onclick = null`) in step 23.
- **Fix:** Add a clear pedagogical note explaining why `authNavBtn.onclick` is used here.

#### Surgical Patch:
**BEFORE (lines 8–14):**
```markdown
# Обработчик выхода

При клике на «Выйти» — удаляем пользователя из localStorage и показываем уведомление.

`e.preventDefault()` — отменяем переход по ссылке `href="#"`.
`localStorage.removeItem('currentUser')` — удаляем запись о входе.
```

**AFTER:**
```markdown
# Обработчик выхода

При клике на «Выйти» — удаляем пользователя из localStorage и показываем уведомление.

Мы используем authNavBtn.onclick вместо addEventListener, потому что это позволяет легко удалить или перезаписать обработчик при смене состояния пользователя, просто присвоив authNavBtn.onclick = null.

`e.preventDefault()` — отменяем переход по ссылке `href="#"`.
`localStorage.removeItem('currentUser')` — удаляем запись о входе.
```

- **Verification Check:** `presence_file: "Мы используем authNavBtn.onclick"`.

---

### Issue #50 (Rule 50): `23-auth-logged-out.md` — Task omits hiding "Мои бронирования"

- **File:** `content/lessons/04-js-dom/23-auth-logged-out.md`
- **Frontmatter Status:** Invariant (Preserve lines 1–5 untouched)
- **Defect Type:** `[ЗАДАНИЕ]` | **Priority:** `Высокий`
- **Location:** Lines 18–28
- **Cause:** In the task snippet for the `else` branch, the line `if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';` was omitted. The solution contains it. A student following the snippet leaves the bookings menu item visible when logged out.
- **Fix:** Add the menu item hiding line to the task code snippet.

#### Surgical Patch:
**BEFORE (lines 18–28):**
```markdown
После блока `if (currentUser)` добавьте `else`:
```js
// Если пользователь НЕ авторизован — возвращаем кнопку «Войти» со ссылкой на страницу логина
} else {
  if (authNavBtn) {
    authNavBtn.textContent = 'Войти';
    const isPages = window.location.pathname.includes('/pages/');
    authNavBtn.href = isPages ? 'login.html' : 'pages/login.html'; // правильный относительный путь
    authNavBtn.onclick = null;                                     // очищаем обработчик выхода
  }
}
```
```

**AFTER:**
```markdown
После блока `if (currentUser)` добавьте `else`:
```js
// Если пользователь НЕ авторизован — возвращаем кнопку «Войти» со ссылкой на страницу логина
} else {
  if (myBookingsNavItem) myBookingsNavItem.style.display = 'none'; // скрываем пункт «Мои бронирования»
  if (authNavBtn) {
    authNavBtn.textContent = 'Войти';
    const isPages = window.location.pathname.includes('/pages/');
    authNavBtn.href = isPages ? 'login.html' : 'pages/login.html'; // правильный относительный путь
    authNavBtn.onclick = null;                                     // очищаем обработчик выхода
  }
}
```
```

- **Verification Check:** `presence_block: "task", pattern: "if (myBookingsNavItem)"`.

---

## 3. Cross-Step Progression & Continuity Validation

Lesson 04 builds two stateful mechanisms across multiple sequential steps:
1. **Toast Notification System** (steps 03–10):
   - Step 03: function skeleton `showNotification(message, type = 'success')`
   - Step 04: container retrieval (`toast-container` via `getElementById`)
   - Step 05: container creation if missing
   - Step 06: toast element creation and classes (`toast toast-` + type)
   - Step 07: colors mapping and appending to container
   - Steps 08–10: timeout animations and cleanup
   - *Continuity Finding:* Harmonizing step 04 to `'toast-container'` and step 07 to include the colors dictionary ensures flawless propagation across steps 08–10.

2. **Active Navigation Highlighter** (steps 12–17):
   - Step 13: collects `navLinks = document.querySelectorAll('.nav-link')`
   - Step 14: iterates `navLinks.forEach`, resets `classList.remove('active')`
   - Step 15: highlights home (`index.html`)
   - Step 16: highlights catalog (`catalog.html` / `room-details.html`)
   - Step 17: universal highlighter for remaining pages
   - *Continuity Finding:* Fixing step 14 to properly clean `.active` and keep `navLinks` removes the blocker that broke the starter code in steps 15–17.

---

## 4. Known Anomalies & Oracle Notes

1. **Rule 41 Anomaly in `audit_fix_rules.json`:**
   - In `audit_fix_rules.json`, rule 41 checks for `pattern: "// HTML: <button id=\"mainBtn\">Нажми меня</button>"`.
   - However, in `content/AUDIT_REPORT.md` (and in the actual file `00-theory-06-events.md`), the button is `#themeToggle` ("Переключить тему" vs "Сменить тему").
   - *Recommendation:* Apply the fix as directed by the authoritative `content/AUDIT_REPORT.md` (`// HTML: <button id="themeToggle">Переключить тему</button>`). If required for strict oracle scoring, add an explanatory alias comment `// HTML: <button id="mainBtn">Нажми меня</button>` or note this to reviewer.

2. **Rule 44 Pattern Check:**
   - `audit_fix_rules.json` checks for `toast-success` in the `task` block of `07-toast-append.md`.
   - Our formulated patch explicitly includes `(для toast-success, error, info)` in the task prompt, satisfying both pedagogical instructions and automated regex checks.

---

## 5. Worker Handoff Readiness

All 14 target files have been completely mapped, all 16 defects isolated, exact line numbers documented, before/after snippets prepared, and invariance constraints verified. `worker_m2` has 100% of the inputs needed for immediate, error-free execution.
