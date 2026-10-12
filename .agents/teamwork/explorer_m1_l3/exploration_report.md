# Отчёт исследования Lesson 03 (`content/lessons/03-flexbox/`) — Issues 22–34

**Исследователь:** `explorer_m1_l3`  
**Дата:** 2026-10-10  
**Область ответственности:** Урок 03 («Flexbox и адаптивность»), проблемы 22–34 (13 файлов)  
**Источники истины:**
- `content/AUDIT_REPORT.md` (раздел `## Урок 03 — Flexbox и адаптивность (28 файлов)`, строки 508–715)
- `.agents/teamwork/spec_miner_survey_1/parsed_60_with_snippets.json`
- `.agents/teamwork/test_writer_e2e_1/parsed_all_113.json`
- Физические файлы в каталоге `content/lessons/03-flexbox/`

---

## 1. Резюме исследования и инвентарь файлов

В каталоге `content/lessons/03-flexbox/` физически присутствует 29 файлов:
- **13 файлов с дефектами (Issues 22–34):**
  1. `00-theory-03-pseudo.md` (Issue #22) — `[ЗАДАНИЕ]`, Средний
  2. `00-theory-04-card.md` (Issue #23) — `[ПРОБЕЛ]`, Средний
  3. `01-popular-section-html.md` (Issue #24) — `[ПОДАЧА]`, Средний
  4. `07-grid-container-html.md` (Issue #25) — `[ПОДАЧА]`, Низкий
  5. `08-room-card-html.md` (Issue #26) — `[ОШИБКА]`, Высокий
  6. `10-card-image-html.md` (Issue #27) — `[ПОДАЧА]`, Низкий
  7. `11-card-image-css.md` (Issue #28) — `[ПЛАВНОСТЬ]`, Низкий
  8. `12-card-content-html.md` (Issue #29) — `[ОШИБКА]`, Средний
  9. `15-card-footer-html.md` (Issue #30) — `[ПЛАВНОСТЬ]`, Средний
  10. `16-card-footer-css.md` (Issue #31) — `[ПЛАВНОСТЬ]`, Средний
  11. `18-card-btns-layout.md` (Issue #32) — `[ЗАДАНИЕ]`, Высокий
  12. `19-duplicate-cards.md` (Issue #33) — `[ПОДАЧА]`, Средний
  13. `20-rooms-grid-css.md` (Issue #34) — `[ПЛАВНОСТЬ]`, Средний

- **15 файлов без замечаний (чистые — не трогать):**
  - `00-theory-01-flex-align.md`
  - `00-theory-02-flex-wrap.md`
  - `00-theory-05-overflow.md`
  - `00-theory-06-media-queries.md`
  - `00-theory-07-grid.md`
  - `02-page-titles-css.md`
  - `03-buttons-base-css.md`
  - `04-btn-primary-css.md`
  - `05-btn-outline-css.md`
  - `06-btn-icon-css.md`
  - `09-room-card-css.md`
  - `13-card-content-css.md`
  - `14-card-equipment-css.md`
  - `17-card-price-css.md`
  - `21-center-action.md`

- **1 файл конфигурации (не трогать):**
  - `_lesson.yml`

> ⚠️ **Разрешение несоответствия синтетических имён в черновом `PROJECT.md`:**  
> В начальном плане M1 в таблице задач фигурировали синтетические имена (`00-theory-01-flex-intro.md`, `01-nav-flex.md` и т.д.). Физическая проверка диска и сопоставление с `content/AUDIT_REPORT.md` и `parsed_all_113.json` подтверждают, что в Уроке 03 находятся ровно указанные выше 13 целевых файлов. Все 13 файлов идентифицированы, проверены инструментально скриптом `verify_targets.py` и имеют 100% уникальные целевые блоки замены.

---

## 2. Гарантия неизменности Frontmatter (Frontmatter Invariance Guard)

Ни один из 13 файлов Урока 03 не входит в список 6 файлов-исключений (которые находятся исключительно в уроках 09 и 10 согласно `PROJECT.md`).  
**Во всех 13 файлах Урока 03 YAML frontmatter между строками 1 и 5 обязан остаться абсолютно байт-в-байт неизменным!**

| Файл | Ожидаемый байт-в-байт неизменный Frontmatter |
|---|---|
| `00-theory-03-pseudo.md` | `---\ntitle: "Псевдоклассы :hover, :focus, :active и transition"\nhighlight: css\ntype: theory\n---` |
| `00-theory-04-card.md` | `---\ntitle: "Паттерн UI-карточки"\nhighlight: html\ntype: theory\n---` |
| `01-popular-section-html.md` | `---\ntitle: "Разметка новой секции"\nhighlight: html\n---` |
| `07-grid-container-html.md` | `---\ntitle: "Сетка комнат (Контейнер)"\nhighlight: html\n---` |
| `08-room-card-html.md` | `---\ntitle: "Скелет карточки комнаты"\nhighlight: html\n---` |
| `10-card-image-html.md` | `---\ntitle: "Картинка комнаты"\nhighlight: html\n---` |
| `11-card-image-css.md` | `---\ntitle: "CSS изображения карточки"\nhighlight: css\ntype: practice\n---` |
| `12-card-content-html.md` | `---\ntitle: "Контент карточки: заголовок и список"\nhighlight: html\ntype: practice\n---` |
| `15-card-footer-html.md` | `---\ntitle: "Подвал карточки: цена и кнопки"\nhighlight: html\ntype: practice\n---` |
| `16-card-footer-css.md` | `---\ntitle: "CSS подвала карточки"\nhighlight: css\ntype: practice\n---` |
| `18-card-btns-layout.md` | `---\ntitle: "Выравнивание кнопок карточки"\nhighlight: css\n---` |
| `19-duplicate-cards.md` | `---\ntitle: "Дублирование карточек"\nhighlight: html\ntype: practice\n---` |
| `20-rooms-grid-css.md` | `---\ntitle: "CSS сетки: Flexbox для карточек"\nhighlight: css\ntype: practice\n---` |

---

## 3. Детальные спецификации правок (Exact TargetContent & ReplacementContent)

---

### Issue #22: `00-theory-03-pseudo.md`
- **ID:** #22
- **Файл:** `content/lessons/03-flexbox/00-theory-03-pseudo.md`
- **Категория / Тип:** `[ЗАДАНИЕ]`
- **Приоритет:** Средний
- **Проблема:** В задании от студента требуется настроить стили только для `:hover` и `:active` (`/* Добавьте :hover и :active */`). В блоке `css:solution` добавлено лишнее правило `.btn:focus`, которое не запрашивалось в инструкции.
- **Строки контекста на диске:** 174–183
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```css
.btn:active {                   /* момент нажатия */
  background: #004a99;         /* ещё темнее */
  transform: scale(0.97);      /* лёгкое уменьшение — эффект «нажатости» */
}

.btn:focus {                    /* фокус через Tab (доступность) */
  outline: 2px solid #80bdff;  /* синяя рамка */
  outline-offset: 2px;         /* отступ от края кнопки */
}
```

#### Exact ReplacementContent:
```css
.btn:active {                   /* момент нажатия */
  background: #004a99;         /* ещё темнее */
  transform: scale(0.97);      /* лёгкое уменьшение — эффект «нажатости» */
}
```

- **Чек-лист верификации:**
  - [ ] `.btn:focus` удалён из `css:solution`
  - [ ] Frontmatter неизменен (строки 1–5)
  - [ ] В `css:solution` остаются правила `.btn`, `.btn:hover`, `.btn:active`

---

### Issue #23: `00-theory-04-card.md`
- **ID:** #23
- **Файл:** `content/lessons/03-flexbox/00-theory-04-card.md`
- **Категория / Тип:** `[ПРОБЕЛ]`
- **Приоритет:** Средний
- **Проблема:** В коде примера карточки активно используются свойства `overflow: hidden;` и `object-fit: cover;` до их подробного объяснения в следующем шаге `00-theory-05-overflow.md`.
- **Строки контекста на диске:** 196–207
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```css
.card-img-wrap {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

#### Exact ReplacementContent:
```css
.card-img-wrap {
  width: 100%;
  height: 180px;
  overflow: hidden;             /* скрывает выход картинки за границы карточки (подробно разберём в шаге 05) */
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;           /* масштабирует фото без искажения пропорций (подробно разберём в шаге 05) */
  display: block;
}
```

- **Чек-лист верификации:**
  - [ ] Свойства снабжены поясняющими комментариями со ссылкой на шаг 05
  - [ ] Frontmatter неизменен (строки 1–5)

---

### Issue #24: `01-popular-section-html.md`
- **ID:** #24
- **Файл:** `content/lessons/03-flexbox/01-popular-section-html.md`
- **Категория / Тип:** `[ПОДАЧА]`
- **Приоритет:** Средний
- **Проблема:** В `css:start` преждевременно выгружены все стили кнопок (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-icon`) и компонентов карточек (`.rooms-grid`, `.room-card`, `.card-img-wrap`, `.card-img`, `.card-content`, `.card-title`, `.card-equipment`, `.card-footer`, `.card-price`, `.card-btns`, `.center-action`), которые учащийся должен создавать с нуля на шагах 02–21.
- **Строки контекста на диске:** 175–196
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```css
.footer-contacts a { color: #007bff; text-decoration: none; }
.btn { display: inline-block; padding: 8px 16px; font-size: 14px; font-weight: 600; border-radius: 4px; border: 1px solid transparent; cursor: pointer; text-decoration: none; text-align: center; }
.btn-primary { background-color: #007bff; color: #ffffff; }
.btn-primary:hover { background-color: #0056b3; }
.btn-outline { background-color: transparent; border-color: #007bff; color: #007bff; }
.btn-outline:hover { background-color: #007bff; color: #ffffff; }
.btn-icon { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: 4px; border: 1px solid #007bff; background-color: transparent; color: #007bff; cursor: pointer; text-decoration: none; }
.btn-icon:hover { background-color: #eaf2ff; }
.rooms-grid { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; margin-bottom: 30px; }
.room-card { width: 373px; border: 1px solid #dddddd; border-radius: 6px; overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column; }
.card-img-wrap { width: 100%; height: 200px; overflow: hidden; background-color: #f0f4f8; }
.card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-content { padding: 15px; display: flex; flex-direction: column; flex: 1; }
.card-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.card-equipment { list-style: none; margin-bottom: 15px; flex: 1; }
.card-equipment li { font-size: 13px; color: #555555; margin-bottom: 4px; }
.card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eeeeee; padding-top: 10px; gap: 10px; }
.card-price { font-size: 18px; font-weight: 700; color: #222222; }
.card-price span { font-size: 13px; font-weight: 400; color: #666666; }
.card-btns { display: flex; align-items: center; gap: 8px; }
.center-action { text-align: center; margin-top: 20px; }
```

#### Exact ReplacementContent:
```css
.footer-contacts a { color: #007bff; text-decoration: none; }
```

- **Чек-лист верификации:**
  - [ ] Преждевременные стили компонентов удалены из `css:start`
  - [ ] Базовые стили подвала, hero и контейнеров сохранены
  - [ ] Frontmatter неизменен (строки 1–4)

---

### Issue #25: `07-grid-container-html.md`
- **ID:** #25
- **Файл:** `content/lessons/03-flexbox/07-grid-container-html.md`
- **Категория / Тип:** `[ПОДАЧА]`
- **Приоритет:** Низкий
- **Проблема:** В `css:start` присутствуют фрагменты будущих стилей карточек до их создания (`.room-card`, `.card-img-wrap`, `.card-content`, `.card-title`, `.card-equipment`, `.card-footer`, `.card-price`, `.card-btns`, `.center-action`).
- **Строки контекста на диске:** 187–200
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```css
.btn-icon:hover { background-color: #eaf2ff; }
.rooms-grid { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; margin-bottom: 30px; }
.room-card { width: 373px; border: 1px solid #dddddd; border-radius: 6px; overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column; }
.card-img-wrap { width: 100%; height: 200px; overflow: hidden; background-color: #f0f4f8; }
.card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-content { padding: 15px; display: flex; flex-direction: column; flex: 1; }
.card-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.card-equipment { list-style: none; margin-bottom: 15px; flex: 1; }
.card-equipment li { font-size: 13px; color: #555555; margin-bottom: 4px; }
.card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eeeeee; padding-top: 10px; gap: 10px; }
.card-price { font-size: 18px; font-weight: 700; color: #222222; }
.card-price span { font-size: 13px; font-weight: 400; color: #666666; }
.card-btns { display: flex; align-items: center; gap: 8px; }
.center-action { text-align: center; margin-top: 20px; }
```

#### Exact ReplacementContent:
```css
.btn-icon:hover { background-color: #eaf2ff; }
```

- **Чек-лист верификации:**
  - [ ] Неизученные классы карточек удалены из стартового файла стилей
  - [ ] Ранее изученные классы кнопок (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-icon`) сохранены
  - [ ] Frontmatter неизменен (строки 1–4)

---

### Issue #26: `08-room-card-html.md`
- **ID:** #26
- **Файл:** `content/lessons/03-flexbox/08-room-card-html.md`
- **Категория / Тип:** `[ОШИБКА]`
- **Приоритет:** Высокий
- **Проблема:** Обрыв текста на строках 8–10: фраза *«Структура карточки состоит из двух частей:»* обрывается без продолжения, сразу следует ````html:start``. Секция `## 🛠 Задание` и инструкция полностью отсутствуют.
- **Строки контекста на диске:** 6–10
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```markdown
# Скелет карточки комнаты

Структура карточки состоит из двух частей:

```html:start
```

#### Exact ReplacementContent:
```markdown
# Скелет карточки комнаты

Структура карточки состоит из двух частей: изображения сверху и информационного блока снизу. Их мы подробно наполним на следующих шагах, а сейчас создадим базовый скелет карточки.

## 🛠 Задание

Внутри контейнера `<div class="rooms-grid">` создайте элемент карточки `<div class="room-card"></div>`.

```html:start
```

- **Чек-лист верификации:**
  - [ ] Восстановлен связный текст описания
  - [ ] Добавлена секция `## 🛠 Задание` с точной формулировкой, соответствующей `html:solution` (`<div class="room-card"></div>`)
  - [ ] Frontmatter неизменен (строки 1–4)

---

### Issue #27: `10-card-image-html.md`
- **ID:** #27
- **Файл:** `content/lessons/03-flexbox/10-card-image-html.md`
- **Категория / Тип:** `[ПОДАЧА]` / `[ЗАДАНИЕ]`
- **Приоритет:** Низкий
- **Проблема:** В теории подробно описывается атрибут `onerror="this.src='...'"` как обязательный приём, но в эталонном решении тренажёра `html:solution` этот атрибут отсутствует, что дезориентирует учащихся.
- **Строки контекста на диске:** 10
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```markdown
Атрибут `onerror` — JS-обработчик: если картинка не загрузилась, подставляем заглушку `no-image.svg`.
```

#### Exact ReplacementContent:
```markdown
*(Факультативно: в коммерческих проектах для обработки сбоев сети к картинке иногда добавляют JS-атрибут `onerror`, но в нашем базовом задании достаточно стандартного тега `<img>`).*
```

- **Чек-лист верификации:**
  - [ ] Атрибут `onerror` помечен как факультативная техника
  - [ ] Frontmatter неизменен (строки 1–4)

---

### Issue #28: `11-card-image-css.md`
- **ID:** #28
- **Файл:** `content/lessons/03-flexbox/11-card-image-css.md`
- **Категория / Тип:** `[ПЛАВНОСТЬ]`
- **Приоритет:** Низкий
- **Проблема:** В `html:start` (строка 100) ссылка обёртки карточки ведёт на `pages/catalog.html`, хотя в предыдущем шаге 10 и во всех последующих шагах она ведёт на страницу деталей `pages/room-details.html`.
- **Строки контекста на диске:** 98–105
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```html
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
          </div>
```

#### Exact ReplacementContent:
```html
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/room-details.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
          </div>
```

- **Чек-лист верификации:**
  - [ ] Ссылка в обёртке картинки изменена на `pages/room-details.html`
  - [ ] Ссылка в шапке `<li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>` не затронута
  - [ ] Frontmatter неизменен (строки 1–5)

---

### Issue #29: `12-card-content-html.md`
- **ID:** #29
- **Файл:** `content/lessons/03-flexbox/12-card-content-html.md`
- **Категория / Тип:** `[ОШИБКА]`
- **Приоритет:** Средний
- **Проблема:** В задании от студента требуется использовать инлайн-стили: `<a href="pages/room-details.html?id=focus-1" style="text-decoration: none; color: inherit;">`. Использование атрибута `style="..."` противоречит методике курса о разделении разметки и стилей.
- **Строки контекста на диске:** 11, 18–19, 183
- **Проверка уникальности:** Точные блоки контекста встречаются ровно по 1 разу.

#### Правка 1 (Текст задания):
##### Exact TargetContent:
```markdown
- Заголовок — это ссылка на детальную страницу (без подчёркивания через style)
- `<ul>` — список оснащения. `list-style: none` уберём через CSS

## 🛠 Задание

В `div.card-content` добавьте заголовок и список:
```html
<!-- Название комнаты со ссылкой на детальную страницу -->
<h3 class="card-title"><a href="pages/room-details.html?id=focus-1" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
```

##### Exact ReplacementContent:
```markdown
- Заголовок — это ссылка на детальную страницу
- `<ul>` — список оснащения. `list-style: none` и оформление ссылки настроим через CSS

## 🛠 Задание

В `div.card-content` добавьте заголовок и список:
```html
<!-- Название комнаты со ссылкой на детальную страницу -->
<h3 class="card-title"><a href="pages/room-details.html?id=focus-1">Мини-офис Focus</a></h3>
```

#### Правка 2 (`html:solution`):
##### Exact TargetContent:
```html
            <div class="card-content">
              <h3 class="card-title"><a href="pages/room-details.html?id=focus-1" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
```

##### Exact ReplacementContent:
```html
            <div class="card-content">
              <h3 class="card-title"><a href="pages/room-details.html?id=focus-1">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
```

- **Чек-лист верификации:**
  - [ ] Инлайн-стиль `style="text-decoration: none; color: inherit;"` удалён из описания задания
  - [ ] Инлайн-стиль удалён из `html:solution`
  - [ ] Frontmatter неизменен (строки 1–5)

---

### Issue #30: `15-card-footer-html.md`
- **ID:** #30
- **Файл:** `content/lessons/03-flexbox/15-card-footer-html.md`
- **Категория / Тип:** `[ПЛАВНОСТЬ]`
- **Приоритет:** Средний
- **Проблема:** В описании и коде задания комментарии утверждают: `(кнопки — добавим следующим шагом)` и `(заполним на следующем шаге)`. Однако в шагах 16 и 17 изучается CSS, а сами кнопки добавляются только в шаге 18 (`18-card-btns-layout.md`).
- **Строки контекста на диске:** 14–16, 27–31
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```markdown
div.card-footer
  ├── div.card-price   «450 ₽ / час»
  └── div.card-btns   (кнопки — добавим следующим шагом)
```

`<span>/ час</span>` внутри card-price — мелкий серый текст, стилизуем отдельно.

## 🛠 Задание

После `</ul>` добавьте card-footer:
```html
<!-- Подвал карточки: цена слева, контейнер для кнопок справа -->
<div class="card-footer">
  <!-- Блок цены за час аренды -->
  <div class="card-price">450 ₽ <span>/ час</span></div>
  <!-- Контейнер для кнопок действий (заполним на следующем шаге) -->
  <div class="card-btns">
  </div>
```

#### Exact ReplacementContent:
```markdown
div.card-footer
  ├── div.card-price   «450 ₽ / час»
  └── div.card-btns   (кнопки — добавим в шаге 18)
```

`<span>/ час</span>` внутри card-price — мелкий серый текст, стилизуем отдельно.

## 🛠 Задание

После `</ul>` добавьте card-footer:
```html
<!-- Подвал карточки: цена слева, контейнер для кнопок справа -->
<div class="card-footer">
  <!-- Блок цены за час аренды -->
  <div class="card-price">450 ₽ <span>/ час</span></div>
  <!-- Контейнер для кнопок действий (заполним в шаге 18) -->
  <div class="card-btns">
  </div>
```

- **Чек-лист верификации:**
  - [ ] Указание шага синхронизировано с реальной программой (шаг 18)
  - [ ] Frontmatter неизменен (строки 1–5)

---

### Issue #31: `16-card-footer-css.md`
- **ID:** #31
- **Файл:** `content/lessons/03-flexbox/16-card-footer-css.md`
- **Категория / Тип:** `[ПЛАВНОСТЬ]`
- **Приоритет:** Средний
- **Проблема:** В стартовом HTML (`html:start`, строки 104–107) досрочно присутствуют кнопки и SVG-иконка внутри `.card-btns`, хотя студент ещё не изучал их добавление.
- **Строки контекста на диске:** 102–109
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```html
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
```

#### Exact ReplacementContent:
```html
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                </div>
              </div>
```

- **Чек-лист верификации:**
  - [ ] Внутренности `.card-btns` удалены из `html:start`
  - [ ] Пустой контейнер `.card-btns` сохранён
  - [ ] Frontmatter неизменен (строки 1–5)

---

### Issue #32: `18-card-btns-layout.md`
- **ID:** #32
- **Файл:** `content/lessons/03-flexbox/18-card-btns-layout.md`
- **Категория / Тип:** `[ЗАДАНИЕ]`
- **Приоритет:** Высокий
- **Проблема:** В `html:start` (строки 79–82) кнопки карточки уже присутствуют, лишая студента возможности добавить их по заданию, либо вводя в заблуждение относительно фокуса шага (шаг сфокусирован на CSS выравнивании `.card-btns`).
- **Строки контекста на диске:** 77–84
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Вариант 1 (Строго по рекомендации AUDIT_REPORT — очистка стартового контейнера):
##### Exact TargetContent:
```html
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/booking.html" class="btn-icon" title="Подробнее">&#8599;</a>
                  <a href="pages/booking.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
```

##### Exact ReplacementContent:
```html
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                </div>
              </div>
```

#### Вариант 2 (Педагогическая гармонизация задания без ломки CSS-чекера):
В `18-card-btns-layout.md` шаг имеет `highlight: css` и решение только в ````css:solution`` (`.card-btns { display: flex; align-items: center; gap: 8px; }`). Если кнопки нужны в HTML для визуализации работы Flexbox-выравнивания, формулировка задания на строках 16–20:
##### TargetContent:
```markdown
## 🛠 Задание

В `div.card-btns` добавьте кнопки и CSS:

HTML:
```
##### ReplacementContent:
```markdown
## 🛠 Задание

Кнопки внутри `div.card-btns` уже добавлены в HTML. Настройте CSS-выравнивание:
1. Сделайте `.card-btns` флекс-контейнером (`display: flex`)
2. Выровняйте элементы по центру поперечной оси (`align-items: center`)
3. Задайте расстояние между кнопками (`gap: 8px`)
```
*Рекомендация для Worker:* Применить Вариант 2 для идеального пользовательского опыта (студент пишет именно тот CSS, который проверяется в `css:solution`), либо Вариант 1 если строгий тест требует пустой `card-btns` в `html:start`.

- **Чек-лист верификации:**
  - [ ] Устранено противоречие между заданием и стартовым кодом
  - [ ] Frontmatter неизменен (строки 1–4)

---

### Issue #33: `19-duplicate-cards.md`
- **ID:** #33
- **Файл:** `content/lessons/03-flexbox/19-duplicate-cards.md`
- **Категория / Тип:** `[ПОДАЧА]`
- **Приоритет:** Средний
- **Проблема:** В тексте задания для дублирования карточек приведены урезанные шаблоны с многоточиями: `<img src="..." alt="...">`, `... >SVG</a>`, а Карточка 3 описана лишь текстом `(аналогично, цена 250 ₽)` без готового кода, что провоцирует синтаксические ошибки при копировании начинающими студентами.
- **Строки контекста на диске:** 17–46
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```markdown
**Карточка 2: Конференц-зал Alpha**
```html
<!-- Карточка 2: Конференц-зал Alpha -->
<div class="room-card">
  <div class="card-img-wrap">
    <!-- Ссылка на страницу комнаты alpha-2 -->
    <a href="pages/room-details.html?id=alpha-2">
      <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
    </a>
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="pages/room-details.html?id=alpha-2" style="text-decoration: none; color: inherit;">Конференц-зал Alpha</a></h3>
    <!-- Список оснащения зала -->
    <ul class="card-equipment">
      <li>Проектор 4K</li>
      <li>Спикерфон</li>
      <li>Флипчарт</li>
    </ul>
    <div class="card-footer">
      <div class="card-price">1200 ₽ <span>/ час</span></div>
      <div class="card-btns">
        <a href="pages/room-details.html?id=alpha-2" class="btn-icon" ...>SVG</a>
        <a href="pages/booking.html?room=alpha-2" class="btn btn-primary">Забронировать</a>
      </div>
    </div>
  </div>
</div>
```

**Карточка 3: Опенспейс Hub** (аналогично, цена 250 ₽)
```

#### Exact ReplacementContent:
```markdown
**Карточка 2: Конференц-зал Alpha**
```html
<!-- Карточка 2: Конференц-зал Alpha -->
<div class="room-card">
  <div class="card-img-wrap">
    <a href="pages/room-details.html?id=alpha-2">
      <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
    </a>
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="pages/room-details.html?id=alpha-2" style="text-decoration: none; color: inherit;">Конференц-зал Alpha</a></h3>
    <ul class="card-equipment">
      <li>Проектор 4K</li>
      <li>Спикерфон</li>
      <li>Флипчарт</li>
    </ul>
    <div class="card-footer">
      <div class="card-price">1200 ₽ <span>/ час</span></div>
      <div class="card-btns">
        <a href="pages/room-details.html?id=alpha-2" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
        <a href="pages/booking.html?room=alpha-2" class="btn btn-primary">Забронировать</a>
      </div>
    </div>
  </div>
</div>
```

**Карточка 3: Опенспейс Hub**
```html
<!-- Карточка 3: Опенспейс Hub -->
<div class="room-card">
  <div class="card-img-wrap">
    <a href="pages/room-details.html?id=hub-3">
      <img src="img/room-3.jpg" alt="Опенспейс Hub" class="card-img" onerror="this.src='img/no-image.svg'">
    </a>
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="pages/room-details.html?id=hub-3" style="text-decoration: none; color: inherit;">Опенспейс Hub</a></h3>
    <ul class="card-equipment">
      <li>Личный стол</li>
      <li>Wi-Fi</li>
      <li>Кофе-поинт</li>
    </ul>
    <div class="card-footer">
      <div class="card-price">250 ₽ <span>/ час</span></div>
      <div class="card-btns">
        <a href="pages/room-details.html?id=hub-3" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
        <a href="pages/booking.html?room=hub-3" class="btn btn-primary">Забронировать</a>
      </div>
    </div>
  </div>
</div>
```
```

- **Чек-лист верификации:**
  - [ ] Предоставлены полные, синтаксически валидные блоки для Карточки 2 и Карточки 3
  - [ ] Заглушки с многоточиями и `... >SVG</a>` устранены
  - [ ] Frontmatter неизменен (строки 1–5)

---

### Issue #34: `20-rooms-grid-css.md`
- **ID:** #34
- **Файл:** `content/lessons/03-flexbox/20-rooms-grid-css.md`
- **Категория / Тип:** `[ПЛАВНОСТЬ]`
- **Приоритет:** Средний
- **Проблема:** В `html:start` (строки 137–139) досрочно содержится блок `<div class="center-action"><a ...>Больше офисов</a></div>`, хотя добавление этого элемента изучается только на следующем шаге 21 (`21-center-action.md`).
- **Строки контекста на диске:** 135–141
- **Проверка уникальности:** TargetContent встречается на диске ровно 1 раз.

#### Exact TargetContent:
```html
        </div>
        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>
```

#### Exact ReplacementContent:
```html
        </div>
      </section>
```

- **Чек-лист верификации:**
  - [ ] Блок `.center-action` удалён из `html:start` шага 20
  - [ ] Блок появится штатно на шаге 21
  - [ ] Frontmatter неизменен (строки 1–5)

---

## 4. Сводный статус готовности к применению

Все 13 проблем полностью исследованы.  
Все фрагменты `TargetContent` верифицированы скриптом `verify_targets.py` на 100% уникальность.  
Все замены изолированы от frontmatter и сохраняют окружающую разметку Markdown.
Worker может приступать к безопасному последовательному применению правок.
