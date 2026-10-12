# Отчёт исследования Lesson 01 (`content/lessons/01-intro/`) — Issues 1–8

**Исследователь:** `explorer_m1_l1`  
**Дата:** 2026-10-10  
**Область ответственности:** Урок 01 («Введение»), проблемы 1–8 (8 файлов)  
**Источники истины:** `content/AUDIT_REPORT.md` (строки 104–230), физические файлы `content/lessons/01-intro/` на диске, `ORIGINAL_REQUEST.md`, `PROJECT.md`

---

## 1. Резюме исследования и статус файлов

В каталоге `content/lessons/01-intro/` физически присутствует 12 файлов:
- **8 целевых файлов с дефектами (Issues 1–8):**
  1. `01-welcome.md` (Issue #1)
  2. `04-paragraphs.md` (Issue #2)
  3. `06-links.md` (Issue #3)
  4. `07-images.md` (Issue #4)
  5. `08-html-structure.md` (Issue #5)
  6. `09-what-is-css.md` (Issue #6)
  7. `10-css-selectors.md` (Issue #7)
  8. `11-block-inline.md` (Issue #8)
- **3 файла без замечаний (чистые, zero-edit):**
  - `02-what-is-html.md` — статус: без замечаний (не модифицировать)
  - `03-first-tag.md` — статус: без замечаний (не модифицировать)
  - `05-lists.md` — статус: без замечаний (не модифицировать)
- **1 файл метаданных урока:**
  - `_lesson.yml` — статус: не модифицировать

### Разрешение именования файлов
В черновых сводных таблицах (`PROJECT.md` строки 22–29) фигурировали синтетические плейсхолдеры (`00-theory-01-web-intro.md` и т.д.). Физическое исследование подтверждает: реальные имена файлов на диске и в `AUDIT_REPORT.md` — `01-welcome.md`, `04-paragraphs.md`, `06-links.md`, `07-images.md`, `08-html-structure.md`, `09-what-is-css.md`, `10-css-selectors.md`, `11-block-inline.md`.

---

## 2. Гарантия неизменности Frontmatter (Frontmatter Invariance Guard)

Все 8 файлов содержат YAML frontmatter в строках 1–4. Ни один из файлов Урока 01 не входит в список 6 исключений из `PROJECT.md`.
**Во всех 8 файлах frontmatter обязан остаться на 100% байт-в-байт неизменным:**

| Файл | Байтово неизменный Frontmatter (строки 1–4) |
|---|---|
| `01-welcome.md` | `---\ntitle: "Введение в веб-разработку"\nhighlight: html\n---` |
| `04-paragraphs.md` | `---\ntitle: "Абзацы текста"\nhighlight: html\n---` |
| `06-links.md` | `---\ntitle: "Ссылки и атрибуты"\nhighlight: html\n---` |
| `07-images.md` | `---\ntitle: "Картинки"\nhighlight: html\n---` |
| `08-html-structure.md` | `---\ntitle: "Базовая структура документа"\nhighlight: html\n---` |
| `09-what-is-css.md` | `---\ntitle: "Что такое CSS?"\nhighlight: css\n---` |
| `10-css-selectors.md` | `---\ntitle: "CSS-селекторы"\nhighlight: css\n---` |
| `11-block-inline.md` | `---\ntitle: "Блочные и строчные элементы"\nhighlight: css\n---` |

---

## 3. Детальные спецификации правок (Exact TargetContent & ReplacementContent)

---

### Issue #1: `01-welcome.md`
- **Файл:** `content/lessons/01-intro/01-welcome.md`
- **Категория:** `[ОШИБКА]`
- **Приоритет:** Низкий
- **Проблема (`AUDIT_REPORT` строки 106–125):** Небезопасный доступ к элементу без выборки из DOM: прямое обращение `btn.addEventListener(...)` при отсутствии атрибута `id="btn"` приводит к ошибке `ReferenceError: btn is not defined`.
- **Строки контекста:** 27–30

#### Блок замены:
- **Диапазон строк:** 27–30
- **Уникальный якорь:** `// JavaScript: поведение`
- **Exact TargetContent:**
```js
// JavaScript: поведение
btn.addEventListener('click', () => alert('Забронировано!'));
```
- **Exact ReplacementContent:**
```js
// JavaScript: поведение
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
  alert('Добро пожаловать в веб-разработку!');
});
```

---

### Issue #2: `04-paragraphs.md`
- **Файл:** `content/lessons/01-intro/04-paragraphs.md`
- **Категория:** `[ДУБЛИРОВАНИЕ]`
- **Приоритет:** Средний
- **Проблема (`AUDIT_REPORT` строки 136–145):** 
  1. В строках 21–36 вводится таблица блочных и строчных элементов, дублирующая шаг 11 (`11-block-inline.md`) и перегружающая ученика тегами `<a>` и `<strong>`.
  2. В коде задания и решения контекст резко сбрасывается с проекта «СмартОфис» на абстрактный «Привет, мир!».

#### Блок 1 (Теория — удаление преждевременной таблицы):
- **Диапазон строк:** 21–36
- **Уникальный якорь:** `## Блочные vs строчные элементы`
- **Exact TargetContent:**
```markdown
## Блочные vs строчные элементы

Теги в HTML делятся на два типа по поведению:

| Тип | Поведение | Примеры |
|-----|-----------|---------|
| **Блочные** | Занимают всю ширину, начинаются с новой строки | `<p>`, `<h1>`, `<div>`, `<ul>` |
| **Строчные** | Встраиваются в строку текста, не ломают поток | `<a>`, `<strong>`, `<em>`, `<span>` |

```html
<p>
  Это абзац с <strong>жирным словом</strong> и <em>курсивным</em> внутри.
  Они строчные — встроились в текст, не разорвав строку.
</p>
```
```
- **Exact ReplacementContent:**
*(Удаляется полностью — заменяется пустой строкой)*

#### Блок 2 (Теория — пояснение к тегу `<br>`):
- **Диапазон строк:** 60–61
- **Уникальный якорь:** `**Разница:** `<p>` создаёт новый абзац с отступом, `<br>` просто переносит строку без отступа.`
- **Exact TargetContent:**
```markdown
**Разница:** `<p>` создаёт новый абзац с отступом, `<br>` просто переносит строку без отступа.
```
- **Exact ReplacementContent:**
```markdown
**Разница:** `<p>` создаёт новый абзац с отступом, `<br>` просто переносит строку без отступа.

> **Важно:** не используйте цепочки `<br><br>` для создания отступов между блоками — для этого служат абзацы `<p>` и свойства отступов в CSS.
```

#### Блок 3 (Задание и стартовый код/решение — продуктовый контекст «СмартОфис»):
- **Диапазон строк:** 66–82
- **Уникальный якорь:** ````html:start\n<h1>Привет, мир!</h1>````
- **Exact TargetContent:**
```markdown
```html:start
<h1>Привет, мир!</h1>

```

```html:solution
<h1>Привет, мир!</h1>

<p>Это мой <strong>первый сайт</strong>, и я только учусь веб-разработке.</p>
<!-- <strong> выделяет важное слово жирным — остаётся строчным элементом внутри <p> -->

<p>
  Учу HTML каждый день.<br>
  Это интересно!
</p>
<!-- <br> переносит строку внутри абзаца без нового <p> -->
```
```
- **Exact ReplacementContent:**
```markdown
```html:start
<h1>СмартОфис</h1>

```

```html:solution
<h1>СмартОфис</h1>

<p>Коворкинг «СмартОфис» — это <strong>современное пространство</strong> для продуктивной работы и деловых встреч.</p>
<!-- <strong> выделяет важное слово жирным — остаётся строчным элементом внутри <p> -->

<p>
  г. Москва, ул. Ленина, д. 10<br>
  Работаем ежедневно с 8:00 до 22:00
</p>
<!-- <br> переносит строку внутри абзаца без нового <p> -->
```
```

---

### Issue #3: `06-links.md`
- **Файл:** `content/lessons/01-intro/06-links.md`
- **Категория:** `[ОШИБКА]`
- **Приоритет:** Средний
- **Проблема (`AUDIT_REPORT` строки 151–160):** Отсутствие `noreferrer` при `target="_blank"`. Без `noreferrer` заголовок Referer передаётся внешнему ресурсу (утечка адреса страницы и уязвимость tabnabbing).
- **Строки контекста:** 55–60, 66, 92–93

#### Блок 1 (Теория):
- **Диапазон строк:** 55–60
- **Уникальный якорь:** `**Важно:** при использовании `target="_blank"` всегда добавляйте `rel="noopener"` для безопасности:`
- **Exact TargetContent:**
```markdown
**Важно:** при использовании `target="_blank"` всегда добавляйте `rel="noopener"` для безопасности:

```html
<a href="https://google.com" target="_blank" rel="noopener">Google</a>
<!-- rel="noopener" — защита от уязвимости при открытии в новой вкладке -->
```
```
- **Exact ReplacementContent:**
```markdown
**Важно:** при использовании `target="_blank"` всегда добавляйте `rel="noopener noreferrer"` для безопасности:

```html
<a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a>
<!-- rel="noopener noreferrer" — защита от уязвимости при открытии в новой вкладке -->
```

*Атрибут `rel="noopener noreferrer"` защищает от уязвимости tabnabbing и блокирует передачу адреса страницы источника во внешнюю сеть.*
```

#### Блок 2 (Инструкция задания):
- **Диапазон строк:** 66
- **Уникальный якорь:** `2. Ту же ссылку, но с `target="_blank"` и `rel="noopener"` — чтобы открывалась в новой вкладке`
- **Exact TargetContent:**
```markdown
2. Ту же ссылку, но с `target="_blank"` и `rel="noopener"` — чтобы открывалась в новой вкладке
```
- **Exact ReplacementContent:**
```markdown
2. Ту же ссылку, но с `target="_blank"` и `rel="noopener noreferrer"` — чтобы открывалась в новой вкладке
```

#### Блок 3 (Решение `html:solution`):
- **Диапазон строк:** 92–93
- **Уникальный якорь:** `<a href="https://ru.wikipedia.org/wiki/HTML" target="_blank" rel="noopener">Узнать больше (новая вкладка)</a>`
- **Exact TargetContent:**
```html
<a href="https://ru.wikipedia.org/wiki/HTML" target="_blank" rel="noopener">Узнать больше (новая вкладка)</a>
<!-- target="_blank" — новая вкладка; rel="noopener" — безопасность -->
```
- **Exact ReplacementContent:**
```html
<a href="https://ru.wikipedia.org/wiki/HTML" target="_blank" rel="noopener noreferrer">Узнать больше (новая вкладка)</a>
<!-- target="_blank" — новая вкладка; rel="noopener noreferrer" — безопасность -->
```

---

### Issue #4: `07-images.md`
- **Файл:** `content/lessons/01-intro/07-images.md`
- **Категория:** `[ОШИБКА]`
- **Приоритет:** Высокий
- **Проблема (`AUDIT_REPORT` строки 161–170):** Атрибут `loading="lazy"` на логотипе первого экрана (above-the-fold) является LCP anti-pattern, задерживающим отображение первого экрана на 200–500 мс.
- **Строки контекста:** 34–42, 64, 75–81

#### Блок 1 (Теория):
- **Диапазон строк:** 34–42
- **Уникальный якорь:** `## Ленивая загрузка`
- **Exact TargetContent:**
```markdown
## Ленивая загрузка

```html
<!-- loading="lazy" — картинка загружается только когда пользователь доскроллит до неё -->
<img src="photo.jpg" alt="Фото" width="300" height="200" loading="lazy">
```

Это ускоряет начальную загрузку страницы: изображения внизу не загружаются сразу.
```
- **Exact ReplacementContent:**
```markdown
## Ленивая загрузка

```html
<!-- loading="lazy" — картинка загружается только когда пользователь доскроллит до неё -->
<img src="photo.jpg" alt="Фото" width="300" height="200" loading="lazy">
```

Это ускоряет начальную загрузку страницы: изображения внизу не загружаются сразу.

> **Важно (производительность и LCP):** Изображения первого экрана (логотип, главный баннер) должны загружаться сразу, без `loading="lazy"`. Атрибут `loading="lazy"` применяется только для изображений ниже линии первого экрана (карточки каталога, отзывы, подвал), чтобы не замедлять начальную отрисовку страницы (LCP — Largest Contentful Paint).
```

#### Блок 2 (Инструкция задания):
- **Диапазон строк:** 64
- **Уникальный якорь:** `Добавьте логотип проекта «СмартОфис» сразу после заголовка `<h1>`.`
- **Exact TargetContent:**
```markdown
Добавьте логотип проекта «СмартОфис» сразу после заголовка `<h1>`. Укажите все атрибуты: src, alt, width, height и loading.
```
- **Exact ReplacementContent:**
```markdown
Добавьте логотип проекта «СмартОфис» сразу после заголовка `<h1>`. Укажите атрибуты: src, alt, width и height (без loading="lazy", так как это изображение первого экрана).
```

#### Блок 3 (Решение `html:solution`):
- **Диапазон строк:** 75–81
- **Уникальный якорь:** `src="https://placehold.co/150x50/007bff/FFF?text=SmartOffice"`
- **Exact TargetContent:**
```html
<img
  src="https://placehold.co/150x50/007bff/FFF?text=SmartOffice"
  alt="Логотип СмартОфис"   <!-- alt: описание для скринридеров и SEO -->
  width="150"               <!-- width: резервирует место до загрузки -->
  height="50"               <!-- height: вместе с width предотвращает CLS -->
  loading="lazy"            <!-- loading="lazy": загрузить только когда нужно -->
>
```
- **Exact ReplacementContent:**
```html
<img
  src="https://placehold.co/150x50/007bff/FFF?text=SmartOffice"
  alt="Логотип СмартОфис"   <!-- alt: описание для скринридеров и SEO -->
  width="150"               <!-- width: резервирует место до загрузки -->
  height="50"               <!-- height: вместе с width предотвращает CLS -->
>
```

---

### Issue #5: `08-html-structure.md`
- **Файл:** `content/lessons/01-intro/08-html-structure.md`
- **Категория:** `[ДУБЛИРОВАНИЕ]`
- **Приоритет:** Высокий
- **Проблема (`AUDIT_REPORT` строки 171–179):** Пошаговое построение структуры («Шаг 1» .. «Шаг 5») полностью дублирует материал следующего урока `02-markup/00-theory-01-doctype.md`.
- **Строки контекста:** 42–98

#### Блок замены:
- **Диапазон строк:** 42–98
- **Уникальный якорь:** `## Пошаговое построение структуры`
- **Exact TargetContent:**
```markdown
## Пошаговое построение структуры

Строим каркас шаг за шагом — каждый новый тег идёт **внутрь** предыдущего:

**Шаг 1** — объявление типа документа, всегда первая строка:
```html
<!DOCTYPE html>
```

**Шаг 2** — корневой тег `<html>`, в него оборачивается абсолютно всё. Атрибут `lang="ru"` говорит поисковику язык страницы:
```html
<!DOCTYPE html>
<html lang="ru">
</html>
```

**Шаг 3** — внутри `<html>` добавляем два главных блока: `<head>` (настройки) и `<body>` (содержимое):
```html
<!DOCTYPE html>
<html lang="ru">
  <head>
  </head>
  <body>
  </body>
</html>
```

**Шаг 4** — внутри `<head>` добавляем обязательные мета-теги:
```html
<head>
  <meta charset="UTF-8">          <!-- кодировка: без неё кириллица → кракозябры -->
  <title>Моя страница</title>     <!-- текст на вкладке браузера -->
</head>
```

**Шаг 5** — в `<body>` помещаем весь видимый контент:
```html
<body>
  <h1>Привет!</h1>
  <p>Мой первый сайт.</p>
</body>
```

**Итог — полный каркас:**
```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Моя страница</title>
  </head>
  <body>
    <h1>Привет!</h1>
    <p>Мой первый сайт.</p>
  </body>
</html>
```
```
- **Exact ReplacementContent:**
```markdown
## Анатомия полной веб-страницы

Вместо изолированных фрагментов рассмотрим целостную конструкцию. Стандартная страница состоит из корневого контейнера `<html>`, служебной части `<head>` и видимой части `<body>`:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Моя страница</title>
  </head>
  <body>
    <h1>Привет!</h1>
    <p>Мой первый сайт.</p>
  </body>
</html>
```

Здесь чётко разделены две зоны ответственности:
- `<head>` — настройки документа, которые не видны пользователю (кодировка, заголовок вкладки, подключение стилей).
- `<body>` — всё видимое содержимое страницы.

*Подробные стандарты HTML5, директиву DOCTYPE и расширенные метатеги мы детально разберём в начале следующего урока.*
```

---

### Issue #6: `09-what-is-css.md`
- **Файл:** `content/lessons/01-intro/09-what-is-css.md`
- **Категория:** `[ПЛАВНОСТЬ]`
- **Приоритет:** Низкий
- **Проблема (`AUDIT_REPORT` строки 180–188):** Неполнота стартового HTML-шаблона в `html:start` и `html:solution`: голый тег `<body>` без каркаса `<!DOCTYPE html>`, `<html>`, `<head>`, обязательность которого утверждалась на предыдущем шаге 08.
- **Строки контекста:** 60–65 и 71–76

#### Блок 1 (`html:start`):
- **Диапазон строк:** 60–65
- **Уникальный якорь:** ````html:start\n<body>\n  <h1>Привет, мир!</h1>````
- **Exact TargetContent:**
```markdown
```html:start
<body>
  <h1>Привет, мир!</h1>
  <p>Это мой первый сайт.</p>
</body>
```
```
- **Exact ReplacementContent:**
```markdown
```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Моя страница</title>
</head>
<body>
  <h1>Привет, мир!</h1>
  <p>Это мой первый сайт.</p>
</body>
</html>
```
```

#### Блок 2 (`html:solution`):
- **Диапазон строк:** 71–76
- **Уникальный якорь:** ````html:solution\n<body>\n  <h1>Привет, мир!</h1>````
- **Exact TargetContent:**
```markdown
```html:solution
<body>
  <h1>Привет, мир!</h1>
  <p>Это мой первый сайт.</p>
</body>
```
```
- **Exact ReplacementContent:**
```markdown
```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Моя страница</title>
</head>
<body>
  <h1>Привет, мир!</h1>
  <p>Это мой первый сайт.</p>
</body>
</html>
```
```

---

### Issue #7: `10-css-selectors.md`
- **Файл:** `content/lessons/01-intro/10-css-selectors.md`
- **Категория:** `[ЗАДАНИЕ]`
- **Приоритет:** Высокий
- **Проблема (`AUDIT_REPORT` строки 189–201):** Несогласованность требования задания и эталонного решения: в задании требуется только цвет фона `#fff3cd` и отступ `8px`, а в `css:solution` добавлено лишнее необъявленное свойство `border-radius: 4px;`.
- **Строки контекста:** 129–133

#### Блок замены:
- **Диапазон строк:** 129–133
- **Уникальный якорь:** `.highlight {                /* CSS класс-селектор:`
- **Exact TargetContent:**
```css
.highlight {                /* CSS класс-селектор: элементы с class="highlight" */
  background: #fff3cd;      /* CSS свойство: жёлтый фон выделения */
  padding: 8px;             /* CSS свойство: внутренний отступ */
  border-radius: 4px;       /* CSS свойство: скруглённые углы */
}
```
- **Exact ReplacementContent:**
```css
.highlight {                /* CSS класс-селектор: элементы с class="highlight" */
  background: #fff3cd;      /* CSS свойство: жёлтый фон выделения */
  padding: 8px;             /* CSS свойство: внутренний отступ */
}
```

---

### Issue #8: `11-block-inline.md`
- **Файл:** `content/lessons/01-intro/11-block-inline.md`
- **Категория:** `[ЗАДАНИЕ]`
- **Приоритет:** Высокий
- **Проблема (`AUDIT_REPORT` строки 202–228):** Необъявленные свойства стилей в решении: `text-decoration: none;` и `color: #1e293b;` присутствуют в `css:solution`, но не запрошены в задании и отсутствуют в `css:start`.
- **Строки контекста:** 94–98 (`css:start`) и 110–118 (`css:solution`)

#### Блок 1 (`css:start`):
- **Диапазон строк:** 94–98
- **Уникальный якорь:** ````css:start\n.menu-link {````
- **Exact TargetContent:**
```css
.menu-link {
  /* Сделайте ссылки строчно-блочными */
  /* Задайте padding: 8px 16px */
  /* Добавьте фон #e2e8f0 и скругление 4px */
}
```
- **Exact ReplacementContent:**
```css
.menu-link {
  text-decoration: none;
  color: #1e293b;
  /* Сделайте ссылки строчно-блочными */
  /* Задайте padding: 8px 16px */
  /* Добавьте фон #e2e8f0 и скругление 4px */
}
```

#### Блок 2 (`css:solution`):
- **Диапазон строк:** 110–118
- **Уникальный якорь:** ````css:solution\n.menu-link {````
- **Exact TargetContent:**
```css
.menu-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #e2e8f0;
  border-radius: 4px;
  text-decoration: none;
  color: #1e293b;
}
```
- **Exact ReplacementContent:**
```css
.menu-link {
  text-decoration: none;
  color: #1e293b;
  display: inline-block;
  padding: 8px 16px;
  background-color: #e2e8f0;
  border-radius: 4px;
}
```

---

## 4. Контрольный чеклист верификации для Worker

- [ ] **Затронутые файлы:** Ровно 8 файлов модифицируются в `content/lessons/01-intro/`.
- [ ] **Чистые файлы:** Файлы `02-what-is-html.md`, `03-first-tag.md`, `05-lists.md` и `_lesson.yml` остаются без изменений.
- [ ] **Frontmatter Invariance:** В строках 1–4 всех 8 файлов YAML frontmatter сохраняется байт-в-байт.
- [ ] **Отсутствие коллизий:** Все замены выполняются через уникальные многострочные контекстные блоки.
