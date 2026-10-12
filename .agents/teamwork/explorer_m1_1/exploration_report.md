# Отчёт исследования Lesson 01 (`content/lessons/01-intro/`) — Issues 1–8

**Исследователь:** `explorer_m1_1`  
**Дата:** 2026-10-08  
**Область ответственности:** Урок 01 («Введение»), проблемы 1–8  
**Источники истины:** `content/AUDIT_REPORT.md`, физические файлы репозитория в `content/lessons/01-intro/`

---

## 1. Резюме исследования и инвентарь файлов

В каталоге `content/lessons/01-intro/` физически присутствует 12 файлов:
- **8 файлов с дефектами:**
  1. `01-welcome.md` (Issue #1)
  2. `04-paragraphs.md` (Issue #2)
  3. `06-links.md` (Issue #3)
  4. `07-images.md` (Issue #4)
  5. `08-html-structure.md` (Issue #5)
  6. `09-what-is-css.md` (Issue #6)
  7. `10-css-selectors.md` (Issue #7)
  8. `11-block-inline.md` (Issue #8)
- **3 файла без замечаний (чистые):**
  - `02-what-is-html.md` — статус: без замечаний (не трогать)
  - `03-first-tag.md` — статус: без замечаний (не трогать)
  - `05-lists.md` — статус: без замечаний (не трогать)
- **1 файл конфигурации:**
  - `_lesson.yml` — статус: не трогать

> ⚠️ **Важное разрешение коллизии имён файлов:**  
> В черновом драфте таблицы задач (`PROJECT.md` и начальный шаблон диспатча) для Урока 01 ошибочно фигурировали синтетические имена вида `00-theory-01-web-intro.md`, `00-theory-02-html-basics.md` и т.д.  
> На диске и в `content/AUDIT_REPORT.md` эти файлы физически называются `01-welcome.md`, `04-paragraphs.md`, `06-links.md`, `07-images.md`, `08-html-structure.md`, `09-what-is-css.md`, `10-css-selectors.md`, `11-block-inline.md`.  
> Спецификация изменений составлена строго для реальных файлов на диске на основе `content/AUDIT_REPORT.md` и отчёта `spec_miner_survey_1`.

---

## 2. Гарантия неизменности Frontmatter (Frontmatter Invariance Guard)

Все 8 файлов содержат YAML frontmatter в строках 1–4.  
**Во всех 8 файлах Урока 01 frontmatter обязан остаться на 100% байт-в-байт идентичным!**

| Файл | Ожидаемый неизменный Frontmatter |
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
- **ID:** #1
- **Файл:** `content/lessons/01-intro/01-welcome.md`
- **Категория / Тип:** `[ОШИБКА]`
- **Приоритет:** Низкий
- **Проблема:** Небезопасный доступ к кнопке без выборки из DOM: `btn.addEventListener(...)` при отсутствии id="btn" приводит к `ReferenceError: btn is not defined`.
- **Строки контекста:** 27–30

#### Exact TargetContent:
```js
// JavaScript: поведение
btn.addEventListener('click', () => alert('Забронировано!'));
```

#### Exact ReplacementContent:
```js
// JavaScript: поведение
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
  alert('Добро пожаловать в веб-разработку!');
});
```

*(Примечание для Worker: вариант `const btn = document.querySelector('.btn'); btn.addEventListener('click', () => alert('Забронировано!'));` также устраняет ошибку нехватки querySelector, но вариант выше полностью воспроизводит эталонную правку из `AUDIT_REPORT.md`).*

---

### Issue #2: `04-paragraphs.md`
- **ID:** #2
- **Файл:** `content/lessons/01-intro/04-paragraphs.md`
- **Категория / Тип:** `[ДУБЛИРОВАНИЕ]`
- **Приоритет:** Средний
- **Проблема:** Преждевременная таблица блочных/строчных элементов на шаге 04 дублирует шаг 11 (`11-block-inline.md`) и перегружает ученика неизученными тегами `<a>` и `<strong>`. В задании контекст сбрасывается с проекта «СмартОфис» на абстрактный «Привет, мир!».
- **Строки контекста:** 21–36 (теория) и 66–82 (задание/решение)

#### Блок 1 (Теория — удаление преждевременной таблицы):
**Exact TargetContent:**
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

**Exact ReplacementContent:**
```markdown
```
*(Блок полностью удаляется; теория фокусируется на `<p>` и `<br>`).*

#### Блок 2 (Теория `<br>` — предупреждение о цепочках `<br><br>`):
**Exact TargetContent:**
```markdown
**Разница:** `<p>` создаёт новый абзац с отступом, `<br>` просто переносит строку без отступа.
```

**Exact ReplacementContent:**
```markdown
**Разница:** `<p>` создаёт новый абзац с отступом, `<br>` просто переносит строку без отступа.

> **Важно:** не используйте цепочки `<br><br>` для создания отступов между блоками — для этого служат абзацы `<p>` и свойства отступов в CSS.
```

#### Блок 3 (Задание и стартовый код/решение — возвращение контекста «СмартОфис»):
**Exact TargetContent:**
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

**Exact ReplacementContent:**
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
- **ID:** #3
- **Файл:** `content/lessons/01-intro/06-links.md`
- **Категория / Тип:** `[ОШИБКА]`
- **Приоритет:** Средний
- **Проблема:** Отсутствие `noreferrer` при `target="_blank"`. Без `noreferrer` заголовок Referer передаётся внешнему ресурсу (утечка адреса страницы и уязвимость tabnabbing).
- **Строки контекста:** 55–60, 66, 92–94

#### Блок 1 (Теория):
**Exact TargetContent:**
```markdown
**Важно:** при использовании `target="_blank"` всегда добавляйте `rel="noopener"` для безопасности:

```html
<a href="https://google.com" target="_blank" rel="noopener">Google</a>
<!-- rel="noopener" — защита от уязвимости при открытии в новой вкладке -->
```
```

**Exact ReplacementContent:**
```markdown
**Важно:** при использовании `target="_blank"` всегда добавляйте `rel="noopener noreferrer"` для безопасности:

```html
<a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a>
<!-- rel="noopener noreferrer" — защита от уязвимости при открытии в новой вкладке -->
```

*Атрибут `rel="noopener noreferrer"` защищает от уязвимости tabnabbing и блокирует передачу адреса страницы источника во внешнюю сеть.*
```

#### Блок 2 (Инструкция задания):
**Exact TargetContent:**
```markdown
2. Ту же ссылку, но с `target="_blank"` и `rel="noopener"` — чтобы открывалась в новой вкладке
```

**Exact ReplacementContent:**
```markdown
2. Ту же ссылку, но с `target="_blank"` и `rel="noopener noreferrer"` — чтобы открывалась в новой вкладке
```

#### Блок 3 (Решение `html:solution`):
**Exact TargetContent:**
```html
<a href="https://ru.wikipedia.org/wiki/HTML" target="_blank" rel="noopener">Узнать больше (новая вкладка)</a>
<!-- target="_blank" — новая вкладка; rel="noopener" — безопасность -->
```

**Exact ReplacementContent:**
```html
<a href="https://ru.wikipedia.org/wiki/HTML" target="_blank" rel="noopener noreferrer">Узнать больше (новая вкладка)</a>
<!-- target="_blank" — новая вкладка; rel="noopener noreferrer" — безопасность -->
```

---

### Issue #4: `07-images.md`
- **ID:** #4
- **Файл:** `content/lessons/01-intro/07-images.md`
- **Категория / Тип:** `[ОШИБКА]`
- **Приоритет:** Высокий
- **Проблема:** Атрибут `loading="lazy"` на логотипе первого экрана (выше линии сгиба / above-the-fold) является грубым LCP anti-pattern, задерживающим отображение на 200–500 мс.
- **Строки контекста:** 34–42, 64, 75–81

#### Блок 1 (Теория):
**Exact TargetContent:**
```markdown
## Ленивая загрузка

```html
<!-- loading="lazy" — картинка загружается только когда пользователь доскроллит до неё -->
<img src="photo.jpg" alt="Фото" width="300" height="200" loading="lazy">
```

Это ускоряет начальную загрузку страницы: изображения внизу не загружаются сразу.
```

**Exact ReplacementContent:**
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
**Exact TargetContent:**
```markdown
Добавьте логотип проекта «СмартОфис» сразу после заголовка `<h1>`. Укажите все атрибуты: src, alt, width, height и loading.
```

**Exact ReplacementContent:**
```markdown
Добавьте логотип проекта «СмартОфис» сразу после заголовка `<h1>`. Укажите атрибуты: src, alt, width и height (без loading="lazy", так как это изображение первого экрана).
```

#### Блок 3 (Решение `html:solution`):
**Exact TargetContent:**
```html
<img
  src="https://placehold.co/150x50/007bff/FFF?text=SmartOffice"
  alt="Логотип СмартОфис"   <!-- alt: описание для скринридеров и SEO -->
  width="150"               <!-- width: резервирует место до загрузки -->
  height="50"               <!-- height: вместе с width предотвращает CLS -->
  loading="lazy"            <!-- loading="lazy": загрузить только когда нужно -->
>
```

**Exact ReplacementContent:**
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
- **ID:** #5
- **Файл:** `content/lessons/01-intro/08-html-structure.md`
- **Категория / Тип:** `[ДУБЛИРОВАНИЕ]`
- **Приоритет:** Высокий
- **Проблема:** Пошаговое построение структуры (Шаг 1 .. Шаг 5) дословно дублирует `02-markup/00-theory-01-doctype.md`.
- **Строки контекста:** 42–98

#### Exact TargetContent:
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

#### Exact ReplacementContent:
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
- **ID:** #6
- **Файл:** `content/lessons/01-intro/09-what-is-css.md`
- **Категория / Тип:** `[ПЛАВНОСТЬ]`
- **Приоритет:** Низкий
- **Проблема:** Неполнота стартового HTML-шаблона в `html:start` (голый тег `<body>` без каркаса `<!DOCTYPE html>`, `<html>`, `<head>`).
- **Строки контекста:** 60–65 и 71–76

#### Блок 1 (`html:start`):
**Exact TargetContent:**
```markdown
```html:start
<body>
  <h1>Привет, мир!</h1>
  <p>Это мой первый сайт.</p>
</body>
```
```

**Exact ReplacementContent:**
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
**Exact TargetContent:**
```markdown
```html:solution
<body>
  <h1>Привет, мир!</h1>
  <p>Это мой первый сайт.</p>
</body>
```
```

**Exact ReplacementContent:**
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
- **ID:** #7
- **Файл:** `content/lessons/01-intro/10-css-selectors.md`
- **Категория / Тип:** `[ЗАДАНИЕ]`
- **Приоритет:** Высокий
- **Проблема:** Несогласованность требования и эталона: задание просит только фон `#fff3cd` и отступ `8px`, а в `css:solution` добавлено лишнее свойство `border-radius: 4px;`.
- **Строки контекста:** 112 (комментарий задания) и 129–134 (`css:solution`)

#### Вариант исправления (Синхронизация через удаление лишнего свойства из решения):
**Exact TargetContent:**
```css
.highlight {                /* CSS класс-селектор: элементы с class="highlight" */
  background: #fff3cd;      /* CSS свойство: жёлтый фон выделения */
  padding: 8px;             /* CSS свойство: внутренний отступ */
  border-radius: 4px;       /* CSS свойство: скруглённые углы */
}
```

**Exact ReplacementContent:**
```css
.highlight {                /* CSS класс-селектор: элементы с class="highlight" */
  background: #fff3cd;      /* CSS свойство: жёлтый фон выделения */
  padding: 8px;             /* CSS свойство: внутренний отступ */
}
```

*(Альтернатива, если требуется сохранить скругление: дополнить комментарий задания на строке 112: `/* 2. Стилизуйте .highlight: background: #fff3cd, padding: 8px, border-radius: 4px */`). Рекомендуется удаление `border-radius` из `css:solution`, так как на шаге 10 изучаются основы селекторов, а не скругления.*

---

### Issue #8: `11-block-inline.md`
- **ID:** #8
- **Файл:** `content/lessons/01-intro/11-block-inline.md`
- **Категория / Тип:** `[ЗАДАНИЕ]`
- **Приоритет:** Высокий
- **Проблема:** Необъявленные свойства стилей в решении: `text-decoration: none;` и `color: #1e293b;` присутствуют в `css:solution`, но не запрошены в задании.
- **Строки контекста:** 94–98 (`css:start`) и 110–118 (`css:solution`)

#### Блок 1 (`css:start`):
**Exact TargetContent:**
```css
.menu-link {
  /* Сделайте ссылки строчно-блочными */
  /* Задайте padding: 8px 16px */
  /* Добавьте фон #e2e8f0 и скругление 4px */
}
```

**Exact ReplacementContent:**
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
**Exact TargetContent:**
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

**Exact ReplacementContent:**
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

## 4. Контрольный чеклист для Worker

- [ ] Все 8 файлов находятся строго в `content/lessons/01-intro/`.
- [ ] Во всех 8 файлах YAML frontmatter между `---` и `---` оставлен нетронутым.
- [ ] В файлах 02, 03, 05 и `_lesson.yml` никаких изменений не производится.
- [ ] Замены производятся контекстными блоками без смещения соседних строк.
