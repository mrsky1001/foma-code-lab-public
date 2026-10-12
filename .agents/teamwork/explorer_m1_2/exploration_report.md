# Exploration Report: Lesson 02 (Markup) — Issues 9 through 21

**Explorer:** `explorer_m1_2`  
**Milestone:** M1 (Foundations & Layout)  
**Date:** 2026-10-08  
**Working Directory:** `d:\IEEU International East-European University\foma-code-lab\.agents\teamwork\explorer_m1_2`  
**Target Scope:** `content/lessons/02-markup/` (13 target files)

---

## 1. Executive Summary & Critical Discrepancy Resolution

### 1.1 Resolution of Filename Discrepancy in PROJECT.md
During initial reconnaissance, a critical discrepancy was identified:
- In `orchestrator_1/PROJECT.md` (and initial dispatch notes), the table for Issues 9–21 listed placeholder filenames:
  `00-theory-01-semantics.md`, `00-theory-02-containers.md`, `00-theory-03-classes.md`, `00-theory-04-buttons-links.md`, `01-page-structure.md`, `02-header-markup.md`, `03-hero-markup.md`, `04-cards-markup.md`, `05-footer-markup.md`, `06-full-skeleton.md`, `07-normalize-css.md`, `08-typography-css.md`, `09-header-css.md`.
  **None of these placeholder filenames exist on disk.**
- In `content/AUDIT_REPORT.md` (the canonical Source of Truth per `ORIGINAL_REQUEST.md`) and in `spec_miner_survey_1/survey_report.md`, the true physical files in `content/lessons/02-markup/` are:
  1. Issue #9: `00-theory-01-doctype.md`
  2. Issue #10: `00-theory-02-head.md`
  3. Issue #11: `00-theory-06b-variables.md`
  4. Issue #12: `00-theory-07-container.md`
  5. Issue #13: `00-theory-08-flexbox.md`
  6. Issue #14: `04-google-fonts.md`
  7. Issue #15: `08-flex-body.md`
  8. Issue #16: `09-container-css.md`
  9. Issue #17: `15-nav-css.md`
  10. Issue #18: `16-nav-links.md`
  11. Issue #19: `17-nav-button.md`
  12. Issue #20: `21-hero-bottom-css.md`
  13. Issue #21: `24-footer-css.md`

All 13 true physical files were confirmed present on disk and thoroughly inspected.

### 1.2 Frontmatter Invariance
All 13 target files have their YAML frontmatter between `---` and `---` strictly verified. **Frontmatter in all 13 files MUST remain 100% byte-identical.** No `type` change applies to Lesson 02 (frontmatter type changes are strictly restricted to 6 specific files in Lessons 09 and 10 per `PROJECT.md`).

### 1.3 Key Technical Findings
- **Issue #14 (`04-google-fonts.md`):** Line 37 `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` is ALREADY physically present in `html:solution` on disk. The defect claimed in `AUDIT_REPORT.md` was either addressed in the initial commit or was a false claim. No modification to `html:solution` is needed (zero-diff / idempotent).
- **Issue #11 (`00-theory-06b-variables.md`):** The file uses `--brand-color: #0ea5e9;` and `--brand-dark: #0284c7;` in `css:solution`. The task instructions mistakenly ask for `--brand-radius` on `.badge`, which doesn't exist in HTML. The task must be synchronized with the actual HTML elements (`h1`, `.btn`, `.btn:hover`) and colors (`#0ea5e9`, `#0284c7`).
- **Issue #15 (`08-flex-body.md`):** The file was completely missing `css:start` and `css:solution` code fences, and imposed an unyielding `min-width: 1200px` on `body`. Standard interactive fences and `min-width: 320px` are provided.
- **Issues #17, #18, #19 (`15-nav-css.md`, `16-nav-links.md`, `17-nav-button.md`):** Premature presence of `nav-btn` ("Войти") and active state leaked into steps 15 and 16, and the task target in step 17 was already present in starter code. Starter HTML codes have been cleaned to guarantee progressive disclosure.
- **Issues #20, #21 (`21-hero-bottom-css.md`, `24-footer-css.md`):** Missing or corrupted HTML blocks in starter code restored to match preceding step solutions (`20-hero-bottom-html.md` and `23-footer-html.md`).

---

## 2. Inventory of Target Files (Issues 9–21)

| Issue ID | File Path | Defect Type | Priority | Disk Status | Frontmatter Verified | Action Required |
|---|---|---|---|---|---|---|
| #9 | `content/lessons/02-markup/00-theory-01-doctype.md` | `[ДУБЛИРОВАНИЕ]` | Высокий | Exists (5704 B) | Invariant | Replace duplicate baby steps with standards theory |
| #10 | `content/lessons/02-markup/00-theory-02-head.md` | `[ЗАДАНИЕ]` | Высокий | Exists (3531 B) | Invariant | Remove premature CSS link from `html:solution` |
| #11 | `content/lessons/02-markup/00-theory-06b-variables.md` | `[ЗАДАНИЕ]` | Средний | Exists (6136 B) | Invariant | Synchronize task text and add `.btn:hover` to solution |
| #12 | `content/lessons/02-markup/00-theory-07-container.md` | `[ЗАДАНИЕ]` | Высокий | Exists (6989 B) | Invariant | Fix padding mismatch in `css:solution` (`16px` -> `20px`) |
| #13 | `content/lessons/02-markup/00-theory-08-flexbox.md` | `[ЗАДАНИЕ]` | Средний | Exists (4974 B) | Invariant | Add missing `align-items: flex-start` to `css:solution` |
| #14 | `content/lessons/02-markup/04-google-fonts.md` | `[ОШИБКА]` | Высокий | Exists (2157 B) | Invariant | Verified already present on disk (No change needed) |
| #15 | `content/lessons/02-markup/08-flex-body.md` | `[ОШИБКА]` | Средний | Exists (1799 B) | Invariant | Add missing `css:start` and `css:solution`, fix `min-width` |
| #16 | `content/lessons/02-markup/09-container-css.md` | `[ОШИБКА]` | Средний | Exists (2037 B) | Invariant | Replace fixed `width: 1200px` with `max-width: 1200px; width: 100%` |
| #17 | `content/lessons/02-markup/15-nav-css.md` | `[ПЛАВНОСТЬ]` | Высокий | Exists (3835 B) | Invariant | Clean `html:start` (remove premature "Войти" button) |
| #18 | `content/lessons/02-markup/16-nav-links.md` | `[ПЛАВНОСТЬ]` | Средний | Exists (3802 B) | Invariant | Clean `html:start` (remove premature "Войти" button) |
| #19 | `content/lessons/02-markup/17-nav-button.md` | `[ЗАДАНИЕ]` | Высокий | Exists (4028 B) | Invariant | Clean `html:start` (remove solution button from starter HTML) |
| #20 | `content/lessons/02-markup/21-hero-bottom-css.md` | `[ОШИБКА]` | Средний | Exists (5265 B) | Invariant | Restore missing `hero-bottom` markup in `html:start` |
| #21 | `content/lessons/02-markup/24-footer-css.md` | `[ОШИБКА]` | Высокий | Exists (7286 B) | Invariant | Replace degraded footer markup with complete step 23 markup |

---

## 3. Detailed Per-Issue Specifications & Safe Edit Blocks

### Issue #9: `00-theory-01-doctype.md`
- **File:** `content/lessons/02-markup/00-theory-01-doctype.md`
- **Defect:** `[ДУБЛИРОВАНИЕ]` (Высокий приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "DOCTYPE и структура HTML-документа"
  highlight: html
  type: theory
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** Lines 15–73 contain a verbatim duplicate of the 5-step baby construction from `01-intro/08-html-structure.md`. Per `AUDIT_REPORT.md`, replace the duplicate with an explanation of standards (Quirks Mode vs Standards Mode), the importance of `lang="ru"` for screen readers (accessibility / a11y) and search engines (SEO), and production conventions of «СмартОфис».
- **Target Line Range:** Lines 15–73
- **TargetContent:**
```markdown
Это **не тег** — это объявление. Оно говорит браузеру: «Эй, здесь HTML5!» Без него браузер включает режим совместимости со старыми сайтами 2000-х годов, и верстка может сломаться.

## Базовая структура любого HTML-файла

Вся страница состоит из четырёх обязательных частей:

| Тег | Роль |
|-----|------|
| `<!DOCTYPE html>` | Объявление типа документа |
| `<html lang="ru">` | Корневой элемент, атрибут lang — язык страницы |
| `<head>` | «Невидимая» голова: настройки, мета-теги, подключения |
| `<body>` | Всё что видит пользователь |

## Как вложить теги — пошагово

Теги в HTML вкладываются как матрёшки. Вот как строить структуру шаг за шагом:

**Шаг 1** — всегда начинаем с DOCTYPE:
```html
<!DOCTYPE html>
```

**Шаг 2** — открываем корневой тег `<html>`. В него войдёт абсолютно всё остальное:
```html
<!DOCTYPE html>
<html lang="ru">

</html>
```

**Шаг 3** — внутри `<html>` добавляем `<head>` (настройки) **и** `<body>` (контент). Важно: сначала head, потом body:
```html
<!DOCTYPE html>
<html lang="ru">
  <head>

  </head>
  <body>

  </body>
</html>
```

**Шаг 4** — заполняем `<head>`. Минимум — кодировка и заголовок вкладки:
```html
<head>
  <meta charset="UTF-8">          <!-- кодировка: поддержка кириллицы -->
  <title>Моя страница</title>     <!-- текст на вкладке браузера -->
</head>
```

**Шаг 5** — в `<body>` помещаем видимый контент:
```html
<body>
  <h1>Привет!</h1>
</body>
```

**Результат — полный скелет:**
```
- **ReplacementContent:**
```markdown
Это **не тег** — это объявление стандарта. Оно указывает современному браузеру отображать страницу в **Standards Mode** (режиме стандартов HTML5). Без объявления `<!DOCTYPE html>` браузер откатится в режим совместимости (**Quirks Mode**), эмулируя старые ошибки рендеринга начала 2000-х годов, что непредсказуемо сломает блочную модель и отступы.

## Базовая структура и стандарты HTML5

Как мы выяснили при знакомстве с анатомией документа в уроке 01, любая промышленная страница состоит из четырёх фундаментальных уровней:

| Элемент / Тег | Назначение и стандарты |
|-----|------|
| `<!DOCTYPE html>` | Директива Standards Mode (отключает Quirks Mode) |
| `<html lang="ru">` | Корневой элемент. Атрибут `lang` критичен для скринридеров (a11y) и поисковых систем (SEO) |
| `<head>` | Метаданные: кодировка, параметры viewport, шрифты и заголовки страницы |
| `<body>` | Семантическое визуальное содержимое интерфейса |

## Стандарты верстки многостраничного проекта «СмартОфис»

В боевом проекте «СмартОфис» все страницы (`index.html`, страницы каталога в `pages/` и личного кабинета) делят одинаковый надежный фундамент.

Обратите особое внимание на атрибут `lang="ru"` в теге `<html>`:
- **Скринридеры (доступность/a11y):** программы чтения с экрана для слабовидящих выбирают правильный языковой синтезатор речи только при наличии атрибута `lang`.
- **Поисковые роботы:** поисковики определяют целевую аудиторию и язык индексации.

**Производственный каркас веб-страницы:**
```

---

### Issue #10: `00-theory-02-head.md`
- **File:** `content/lessons/02-markup/00-theory-02-head.md`
- **Defect:** `[ЗАДАНИЕ]` (Высокий приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Тег <head> и мета-теги"
  highlight: html
  type: theory
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** In `html:solution` line 88, `<link rel="stylesheet" href="css/style.css">` is included, but CSS linking is not part of the task prompt and has not been introduced yet.
- **Target Line Range:** Lines 86–90
- **TargetContent:**
```html
    <title>СмартОфис — аренда переговорных</title>  <!-- вкладка браузера -->
    <link rel="icon" href="favicon.svg" type="image/svg+xml">  <!-- иконка вкладки -->
    <link rel="stylesheet" href="css/style.css">               <!-- стили -->
  </head>
```
- **ReplacementContent:**
```html
    <title>СмартОфис — аренда переговорных</title>  <!-- вкладка браузера -->
    <link rel="icon" href="favicon.svg" type="image/svg+xml">  <!-- иконка вкладки -->
  </head>
```

---

### Issue #11: `00-theory-06b-variables.md`
- **File:** `content/lessons/02-markup/00-theory-06b-variables.md`
- **Defect:** `[ЗАДАНИЕ]` / `[ОШИБКА]` (Средний / Критический приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "CSS-переменные (Custom Properties)"
  highlight: css
  type: theory
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:**
  1. Lines 89–95: Task instructs styling `.badge` with `--brand-radius: 6px`, but `.badge` does not exist in `html:start`, while `css:start` asks for `--brand-color` and `--brand-dark`.
  2. `css:solution` defines `--brand-color: #0ea5e9;` and `--brand-dark: #0284c7;`, applies `--brand-color` to `h1` and `.btn`, but omits `.btn:hover`.
- **Target Line Range 1 (Task Text):** Lines 89–95
- **TargetContent 1:**
```markdown
## 🛠 Задание

1. В блоке `:root` объявите две переменные:
   - `--brand-color` со значением `#0ea5e9`;
   - `--brand-radius` со значением `6px`.
2. Примените их к классу `.badge`: установите `background-color` через `var(--brand-color)` и `border-radius` через `var(--brand-radius)`.
```
- **ReplacementContent 1:**
```markdown
## 🛠 Задание

1. В псевдоклассе `:root` объявите две CSS-переменные:
   - `--brand-color`: значение `#0ea5e9` (основной цвет)
   - `--brand-dark`: значение `#0284c7` (тёмный оттенок для наведения)
2. Задайте для заголовка `h1` цвет текста через переменную `--brand-color`.
3. Для кнопки `.btn` задайте цвет фона через переменную `--brand-color`.
4. Для состояния наведения кнопки `.btn:hover` задайте цвет фона через переменную `--brand-dark`.
```
- **Target Line Range 2 (`css:solution`):** Lines 193–202
- **TargetContent 2:**
```css
.btn {
  background: var(--brand-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
```
- **ReplacementContent 2:**
```css
.btn {
  background: var(--brand-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background: var(--brand-dark);
}
```

---

### Issue #12: `00-theory-07-container.md`
- **File:** `content/lessons/02-markup/00-theory-07-container.md`
- **Defect:** `[ЗАДАНИЕ]` (Высокий приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Паттерн Container"
  highlight: css
  type: theory
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** Task line 91 requires: `padding: 0 20px`. Solution line 176 has `padding: 0 16px;`.
- **Target Line Range:** Lines 173–178
- **TargetContent:**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
```
- **ReplacementContent:**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

---

### Issue #13: `00-theory-08-flexbox.md`
- **File:** `content/lessons/02-markup/00-theory-08-flexbox.md`
- **Defect:** `[ЗАДАНИЕ]` (Средний приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Подключение Flexbox"
  highlight: css
  type: theory
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** Task lines 84–85 require: `align-items: flex-start;` for the container `.catalog`. Solution lines 172–176 omitted this property.
- **Target Line Range:** Lines 172–177
- **TargetContent:**
```css
.catalog {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
```
- **ReplacementContent:**
```css
.catalog {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}
```

---

### Issue #14: `04-google-fonts.md`
- **File:** `content/lessons/02-markup/04-google-fonts.md`
- **Defect:** `[ОШИБКА]` (Высокий приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Подключение Google Fonts"
  highlight: html
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis & Verification:**
  Inspection of lines 36–39 on disk:
  ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  ```
  The `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` tag reported as missing is **already present** in the repository at line 37.
- **Action:** No edit needed (Idempotent verification pass).

---

### Issue #15: `08-flex-body.md`
- **File:** `content/lessons/02-markup/08-flex-body.md`
- **Defect:** `[ОШИБКА]` (Средний приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Flexbox на body для прижатия footer"
  highlight: css
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:**
  1. Code block in lines 26–43 is only `html:start`. Interactive blocks `css:start` and `css:solution` were completely absent!
  2. Task and styles had non-adaptive `min-width: 1200px;` on `body`. Changed to `min-width: 320px;`.
- **Target Line Range:** Lines 18–44
- **TargetContent:**
```markdown
К стилям `body` добавьте:
```css
display: flex;           /* body — flex-контейнер, дети (header, main, footer) встают в колонку */
flex-direction: column;  /* направление — сверху вниз */
min-height: 100vh;       /* минимальная высота — весь экран (viewport height) */
min-width: 1200px;       /* минимальная ширина — не сжиматься ниже 1200px */
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
</head>
<body>

</body>
</html>
```
```
- **ReplacementContent:**
```markdown
К стилям `body` добавьте:
```css
display: flex;           /* body — flex-контейнер, дети (header, main, footer) встают в колонку */
flex-direction: column;  /* направление — сверху вниз */
min-height: 100vh;       /* минимальная высота — весь экран (viewport height) */
min-width: 320px;        /* минимальная ширина страницы */
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
</head>
<body>

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
}
```

```css:solution
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
  min-width: 320px;
}
```
```

---

### Issue #16: `09-container-css.md`
- **File:** `content/lessons/02-markup/09-container-css.md`
- **Defect:** `[ОШИБКА]` (Средний приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Класс .container"
  highlight: css
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:**
  1. Theory & Task (lines 12–26): change fixed `width: 1200px` to `max-width: 1200px; width: 100%`.
  2. Solution (lines 59–70): replace fixed `width: 1200px;` with `max-width: 1200px; width: 100%;` and update `min-width` on `body` from `1200px` to `320px`.
- **Target Line Range 1 (Theory & Task):** Lines 12–26
- **TargetContent 1:**
```markdown
`.container` — универсальный класс-обёртка:
- `width: 1200px` — фиксированная ширина
- `margin: 0 auto` — центрирует блок горизонтально
- `padding: 0 15px` — небольшие поля по бокам

## 🛠 Задание

Добавьте класс .container:
```css
.container {
  width: 1200px;    /* фиксированная ширина контейнера — 1200px */
  margin: 0 auto;   /* 0 сверху/снизу, auto слева/справа — центрирует блок по горизонтали */
  padding: 0 15px;  /* горизонтальные поля 15px — контент не прилипает к краям */
}
```
```
- **ReplacementContent 1:**
```markdown
`.container` — универсальный класс-обёртка:
- `max-width: 1200px; width: 100%` — адаптивная ширина (не шире 1200px, но сжимается на смартфонах)
- `margin: 0 auto` — центрирует блок горизонтально
- `padding: 0 15px` — небольшие поля по бокам

## 🛠 Задание

Добавьте класс .container:
```css
.container {
  max-width: 1200px; /* максимальная ширина контейнера */
  width: 100%;       /* занимает всю ширину экрана на мобильных устройствах */
  margin: 0 auto;    /* 0 сверху/снизу, auto слева/справа — центрирует блок по горизонтали */
  padding: 0 15px;   /* горизонтальные поля 15px — контент не прилипает к краям */
}
```
```
- **Target Line Range 2 (`css:solution`):** Lines 59–70
- **TargetContent 2:**
```css
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
```
- **ReplacementContent 2:**
```css
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 320px;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}
```

---

### Issue #17: `15-nav-css.md`
- **File:** `content/lessons/02-markup/15-nav-css.md`
- **Defect:** `[ПЛАВНОСТЬ]` (Высокий приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Стили меню навигации"
  highlight: css
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** `html:start` lines 50–54 prematurely contains the third list item `<li ... class="nav-btn" ...>Войти</a></li>` and `class="nav-link active"`. Must match step 14 result.
- **Target Line Range:** Lines 50–55
- **TargetContent:**
```html
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
```
- **ReplacementContent:**
```html
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
        </ul>
```

---

### Issue #18: `16-nav-links.md`
- **File:** `content/lessons/02-markup/16-nav-links.md`
- **Defect:** `[ПЛАВНОСТЬ]` (Средний приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "CSS ссылок навигации"
  highlight: css
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** `html:start` lines 56–61 contains the button item `<li ... class="nav-btn" ...>Войти</a></li>` before step 17.
- **Target Line Range:** Lines 56–61
- **TargetContent:**
```html
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
```
- **ReplacementContent:**
```html
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
        </ul>
```

---

### Issue #19: `17-nav-button.md`
- **File:** `content/lessons/02-markup/17-nav-button.md`
- **Defect:** `[ЗАДАНИЕ]` (Высокий приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "Кнопка «Войти» в шапке"
  highlight: html
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** The assignment asks the student to add the third list item `<li ... class="nav-btn" ...>Войти</a></li>`. However, it was already present in `html:start` lines 61–66!
- **Target Line Range:** Lines 61–66
- **TargetContent:**
```html
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
```
- **ReplacementContent:**
```html
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
        </ul>
```

---

### Issue #20: `21-hero-bottom-css.md`
- **File:** `content/lessons/02-markup/21-hero-bottom-css.md`
- **Defect:** `[ОШИБКА]` (Средний приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "CSS hero-bottom"
  highlight: css
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** `html:start` lines 66–74 is missing the `<div class="hero-bottom">` created in step 20 (`20-hero-bottom-html.md`).
- **Target Line Range:** Lines 66–74
- **TargetContent:**
```html
  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
      </section>
    </div>
  </main>
```
- **ReplacementContent:**
```html
  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
        <div class="hero-bottom">
          <p class="hero-subtitle">
            Удобный выбор и быстрое бронирование рабочих пространств в центре города
          </p>
        </div>
      </section>
    </div>
  </main>
```

---

### Issue #21: `24-footer-css.md`
- **File:** `content/lessons/02-markup/24-footer-css.md`
- **Defect:** `[ОШИБКА]` (Высокий приоритет)
- **Frontmatter Verification:**
  ```yaml
  ---
  title: "CSS подвала"
  highlight: css
  type: practice
  ---
  ```
  *(Must remain unchanged)*
- **Analysis:** `html:start` lines 106–114 contains an obsolete and degraded footer structure: `.footer-info` missing, phone number missing, 2024 instead of 2026, and misspelled domain `smartofis.ru`. Must be replaced with the exact footer markup created in step 23 (`23-footer-html.md`).
- **Target Line Range:** Lines 106–114
- **TargetContent:**
```html
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-contacts">
        <p>СмартОфис — умное бронирование</p>
        <p>Email: <a href="mailto:info@smartofis.ru">info@smartofis.ru</a></p>
      </div>
      <p>© 2024 СмартОфис</p>
    </div>
  </footer>
```
- **ReplacementContent:**
```html
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
```

---

## 4. Verification and Safety Guidelines for the Worker

1. **Frontmatter Invariance**: Verify via regex or diff that `^---[\s\S]*?^---` in all 13 files remains 100% byte-identical.
2. **Context-Aware Replacement**: The Worker must use `replace_file_content` targeting the specific unique blocks given above.
3. **No Unintended Side-Effects**: Only the targeted code fences or markdown blocks must be modified.
4. **Git Diff Inspection**: Following application by the Worker, `git diff --stat content/lessons/02-markup/` should show exactly 12 files changed (as `04-google-fonts.md` already contains the correct line).
