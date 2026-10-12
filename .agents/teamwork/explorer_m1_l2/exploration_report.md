# Exploration Report: Lesson 02 (Markup) — Issues 9 through 21

**Explorer:** `explorer_m1_l2`  
**Milestone:** M1 (Foundations & Layout)  
**Date:** 2026-10-10  
**Working Directory:** `d:\IEEU International East-European University\foma-code-lab\.agents\teamwork\explorer_m1_l2`  
**Target Scope:** `content/lessons/02-markup/` (13 target files)

---

## 1. Executive Summary & Critical Discrepancy Resolution

### 1.1 Resolution of Filename Discrepancy in PROJECT.md
During initial reconnaissance, an important discrepancy in `PROJECT.md` was identified and confirmed:
- In `PROJECT.md` Feature Inventory (table lines 30–42), placeholder filenames were listed (`00-theory-01-semantics.md`, `00-theory-02-containers.md`, `00-theory-03-classes.md`, etc.). None of these placeholder names exist on disk.
- In `content/AUDIT_REPORT.md` (the authoritative Source of Truth per `ORIGINAL_REQUEST.md`), the 13 actual target files in `content/lessons/02-markup/` are:
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

All 13 physical files were verified to exist on disk and were thoroughly analyzed.

### 1.2 Frontmatter Invariance
All 13 files were verified to contain valid YAML frontmatter between `---` and `---`.
**Rule:** Frontmatter across all 13 files must remain 100% byte-identical. Frontmatter type modifications are strictly prohibited in Lesson 02 (per `PROJECT.md`, frontmatter type edits are limited exclusively to 6 files in Lessons 09 and 10).

### 1.3 Key Technical Findings
1. **Issue #14 (`04-google-fonts.md`):** Line 37 `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` is already physically present in `html:solution` on disk. The defect noted in `AUDIT_REPORT.md` is already satisfied. This issue is **IDEMPOTENT** (verified pass, zero code change required).
2. **Issue #11 (`00-theory-06b-variables.md`):** `css:solution` defines `--brand-color: #0ea5e9;` and `--brand-dark: #0284c7;`. The original task mistakenly mentioned `--brand-radius: 6px` for `.badge` (which does not exist in HTML). The task text and solution must be synchronized to use `h1`, `.btn`, and `.btn:hover` with colors `#0ea5e9` and `#0284c7`.
3. **Issue #15 (`08-flex-body.md`):** The file was completely missing interactive code blocks `css:start` and `css:solution`. It also imposed an unyielding `min-width: 1200px` on `body`. Standard interactive fences and `min-width: 320px` are restored.
4. **Issues #17, #18, #19 (`15-nav-css.md`, `16-nav-links.md`, `17-nav-button.md`):** Premature presence of `nav-btn` ("Войти") leaked into steps 15 and 16, and the task target in step 17 was already present in starter code. Starter HTML blocks have been cleaned to preserve pedagogical progression.
5. **Issues #20, #21 (`21-hero-bottom-css.md`, `24-footer-css.md`):** Missing or degraded starter HTML blocks are restored to match the outputs of preceding steps (`20-hero-bottom-html.md` and `23-footer-html.md`).

---

## 2. Target File Inventory & Defect Summary

| Issue ID | File Path | Defect Type | Priority | Disk Status | Frontmatter Status | Action Required |
|---|---|---|---|---|---|---|
| #9 | `content/lessons/02-markup/00-theory-01-doctype.md` | `[ДУБЛИРОВАНИЕ]` | Высокий | Exists (5704 B) | 100% Invariant | Replace duplicate 5-step baby construction with Standards Mode theory |
| #10 | `content/lessons/02-markup/00-theory-02-head.md` | `[ЗАДАНИЕ]` | Высокий | Exists (3531 B) | 100% Invariant | Remove premature CSS link from `html:solution` |
| #11 | `content/lessons/02-markup/00-theory-06b-variables.md` | `[ЗАДАНИЕ]` | Средний | Exists (6136 B) | 100% Invariant | Synchronize task text and add `.btn:hover` to `css:solution` |
| #12 | `content/lessons/02-markup/00-theory-07-container.md` | `[ЗАДАНИЕ]` | Высокий | Exists (6989 B) | 100% Invariant | Fix padding mismatch in `css:solution` (`16px` -> `20px`) |
| #13 | `content/lessons/02-markup/00-theory-08-flexbox.md` | `[ЗАДАНИЕ]` | Средний | Exists (4974 B) | 100% Invariant | Add missing `align-items: flex-start` to `css:solution` |
| #14 | `content/lessons/02-markup/04-google-fonts.md` | `[ОШИБКА]` | Высокий | Exists (2157 B) | 100% Invariant | Verified already present on disk (No change / Idempotent pass) |
| #15 | `content/lessons/02-markup/08-flex-body.md` | `[ОШИБКА]` | Средний | Exists (1799 B) | 100% Invariant | Add missing `css:start` and `css:solution`, fix `min-width` to `320px` |
| #16 | `content/lessons/02-markup/09-container-css.md` | `[ОШИБКА]` | Средний | Exists (2037 B) | 100% Invariant | Replace fixed `width: 1200px` with `max-width: 1200px; width: 100%` |
| #17 | `content/lessons/02-markup/15-nav-css.md` | `[ПЛАВНОСТЬ]` | Высокий | Exists (3835 B) | 100% Invariant | Clean `html:start` (remove premature "Войти" button) |
| #18 | `content/lessons/02-markup/16-nav-links.md` | `[ПЛАВНОСТЬ]` | Средний | Exists (3802 B) | 100% Invariant | Clean `html:start` (remove premature "Войти" button) |
| #19 | `content/lessons/02-markup/17-nav-button.md` | `[ЗАДАНИЕ]` | Высокий | Exists (4028 B) | 100% Invariant | Clean `html:start` (remove solution button from starter HTML) |
| #20 | `content/lessons/02-markup/21-hero-bottom-css.md` | `[ОШИБКА]` | Средний | Exists (5265 B) | 100% Invariant | Restore missing `hero-bottom` markup in `html:start` |
| #21 | `content/lessons/02-markup/24-footer-css.md` | `[ОШИБКА]` | Высокий | Exists (7286 B) | 100% Invariant | Replace degraded footer markup with complete step 23 markup |

---

## 3. Exact TargetContent & ReplacementContent per Issue

### Issue #9: `00-theory-01-doctype.md`
- **File:** `content/lessons/02-markup/00-theory-01-doctype.md`
- **Defect:** `[ДУБЛИРОВАНИЕ]` (Высокий приоритет)
- **Line Range:** 15–73
- **Unique Anchor Before:**
  ```html
  <!DOCTYPE html>  <!-- объявление типа документа, не тег -->
  ```
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
- **Unique Anchor After:**
  ```html
  <!DOCTYPE html>                       <!-- объявление: это HTML5-документ -->
  ```

---

### Issue #10: `00-theory-02-head.md`
- **File:** `content/lessons/02-markup/00-theory-02-head.md`
- **Defect:** `[ЗАДАНИЕ]` (Высокий приоритет)
- **Line Range:** 86–90
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
- **Unique Anchor:** Inside ````html:solution````.

---

### Issue #11: `00-theory-06b-variables.md`
- **File:** `content/lessons/02-markup/00-theory-06b-variables.md`
- **Defect:** `[ЗАДАНИЕ]` / `[ОШИБКА]` (Средний приоритет)

#### Chunk 1: Task text
- **Line Range:** 89–95
- **TargetContent:**
```markdown
## 🛠 Задание

1. В блоке `:root` объявите две переменные:
   - `--brand-color` со значением `#0ea5e9`;
   - `--brand-radius` со значением `6px`.
2. Примените их к классу `.badge`: установите `background-color` через `var(--brand-color)` и `border-radius` через `var(--brand-radius)`.
```
- **ReplacementContent:**
```markdown
## 🛠 Задание

1. В псевдоклассе `:root` объявите две CSS-переменные:
   - `--brand-color`: значение `#0ea5e9` (основной цвет)
   - `--brand-dark`: значение `#0284c7` (тёмный оттенок для наведения)
2. Задайте для заголовка `h1` цвет текста через переменную `--brand-color`.
3. Для кнопки `.btn` задайте цвет фона через переменную `--brand-color`.
4. Для состояния наведения кнопки `.btn:hover` задайте цвет фона через переменную `--brand-dark`.
```

#### Chunk 2: `css:solution`
- **Line Range:** 193–202
- **TargetContent:**
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
- **ReplacementContent:**
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
- **Line Range:** 173–178
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
- **Unique Anchor:** Inside ````css:solution````.

---

### Issue #13: `00-theory-08-flexbox.md`
- **File:** `content/lessons/02-markup/00-theory-08-flexbox.md`
- **Defect:** `[ЗАДАНИЕ]` (Средний приоритет)
- **Line Range:** 172–177
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
- **Unique Anchor:** Inside ````css:solution````.

---

### Issue #14: `04-google-fonts.md`
- **File:** `content/lessons/02-markup/04-google-fonts.md`
- **Defect:** `[ОШИБКА]` (Высокий приоритет)
- **Status:** **IDEMPOTENT / VERIFIED**
- Line 37 already physically contains:
  ```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```
- **Action:** No edit required. Verified pass.

---

### Issue #15: `08-flex-body.md`
- **File:** `content/lessons/02-markup/08-flex-body.md`
- **Defect:** `[ОШИБКА]` (Средний приоритет)
- **Line Range:** 18–44
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

#### Chunk 1: Theory and Task
- **Line Range:** 12–26
- **TargetContent:**
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
- **ReplacementContent:**
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

#### Chunk 2: `css:solution`
- **Line Range:** 59–70
- **TargetContent:**
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
- **ReplacementContent:**
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
- **Line Range:** 50–55 (in `html:start`)
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
- **Line Range:** 56–61 (in `html:start`)
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
- **Line Range:** 61–66 (in `html:start`)
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
- **Line Range:** 66–74 (in `html:start`)
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
- **Line Range:** 106–114 (in `html:start`)
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

## 4. Verification Checklist for the Worker

| Issue | Target File | Verification Check |
|---|---|---|
| #9 | `00-theory-01-doctype.md` | Contains Standards Mode, Quirks Mode, `lang="ru"` a11y & SEO details; 5-step baby construction removed. |
| #10 | `00-theory-02-head.md` | `<link rel="stylesheet" href="css/style.css">` is removed from `html:solution`. |
| #11 | `00-theory-06b-variables.md` | Task text mentions `--brand-color`, `--brand-dark`, `h1`, `.btn`, and `.btn:hover`. `css:solution` contains `.btn:hover`. |
| #12 | `00-theory-07-container.md` | `css:solution` has `padding: 0 20px;`. |
| #13 | `00-theory-08-flexbox.md` | `css:solution` contains `align-items: flex-start;` in `.catalog`. |
| #14 | `04-google-fonts.md` | Idempotent check: line `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` present. |
| #15 | `08-flex-body.md` | `css:start` and `css:solution` fences exist; `min-width: 320px` used. |
| #16 | `09-container-css.md` | `.container` has `max-width: 1200px; width: 100%;` in task and solution; `body` has `min-width: 320px`. |
| #17 | `15-nav-css.md` | `html:start` has 2 items in `.nav-list` without `active` and without `nav-btn`. |
| #18 | `16-nav-links.md` | `html:start` has 2 items in `.nav-list` with `active` on "Главная", no `nav-btn`. |
| #19 | `17-nav-button.md` | `html:start` has 2 items in `.nav-list`, `nav-btn` is absent. |
| #20 | `21-hero-bottom-css.md` | `html:start` has `.hero-bottom` div with subtitle inside `.hero-section`. |
| #21 | `24-footer-css.md` | `html:start` has full footer with `.footer-info`, `.footer-contacts`, and 2026 copyright. |
