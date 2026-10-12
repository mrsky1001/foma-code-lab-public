import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

from compile_complete_dataset import parse_m1
from compile_m2_test import parse_m2
from compile_m3_test import parse_m3

print("Loading audit findings from M1, M2, M3...")
m1_items = parse_m1()
m2_items = parse_m2()
m3_items = parse_m3()

all_items = m1_items + m2_items + m3_items
print(f"Total files in dataset: {len(all_items)}")

# Canonical lesson order and titles
lessons_meta = [
    ("01-intro", "Урок 01 — Введение (11 файлов)"),
    ("02-markup", "Урок 02 — Разметка и структура (33 файла)"),
    ("03-flexbox", "Урок 03 — Flexbox и адаптивность (28 файлов)"),
    ("04-js-dom", "Урок 04 — JavaScript и DOM (31 файл)"),
    ("05-catalog", "Урок 05 — Каталог и карточки (28 файлов)"),
    ("06-forms", "Урок 06 — Формы и валидация (27 файлов)"),
    ("07-slider", "Урок 07 — Слайдер (24 файла)"),
    ("08-search", "Урок 08 — Поиск и фильтрация (31 файл)"),
    ("09-final", "Урок 09 — Финал и сборка проекта (13 файлов)"),
    ("10-troubleshooting", "Урок 10 — Troubleshooting (5 файлов)"),
]

# Ensure sorting of items inside each lesson matches actual directory listing
actual_files = sorted(glob.glob('content/lessons/**/*.md', recursive=True))
file_order = {}
for idx, af in enumerate(actual_files):
    file_order[os.path.basename(af)] = idx

by_lesson = {}
for item in all_items:
    by_lesson.setdefault(item['lesson'], []).append(item)

for l_id in by_lesson:
    by_lesson[l_id].sort(key=lambda x: file_order.get(x['fname'], 9999))

# Calculate stats
tot_files = len(all_items)
tot_clean = sum(1 for x in all_items if x['is_clean'])
tot_issue_files = sum(1 for x in all_items if not x['is_clean'])
tot_problems = sum(len(x['problems']) for x in all_items)

tot_types = {"[ОШИБКА]": 0, "[ПЛАВНОСТЬ]": 0, "[ЗАДАНИЕ]": 0, "[ПОДАЧА]": 0, "[ПРОБЕЛ]": 0, "[ДУБЛИРОВАНИЕ]": 0}
tot_prios = {"Критический": 0, "Высокий": 0, "Средний": 0, "Низкий": 0}

lesson_stats = {}
for l_id, l_title in lessons_meta:
    items = by_lesson[l_id]
    l_clean = sum(1 for x in items if x['is_clean'])
    l_issue_files = sum(1 for x in items if not x['is_clean'])
    l_types = {"[ОШИБКА]": 0, "[ПЛАВНОСТЬ]": 0, "[ЗАДАНИЕ]": 0, "[ПОДАЧА]": 0, "[ПРОБЕЛ]": 0, "[ДУБЛИРОВАНИЕ]": 0}
    l_prios = {"Критический": 0, "Высокий": 0, "Средний": 0, "Низкий": 0}

    for x in items:
        for p in x['problems']:
            t = p['type']
            prio = p['priority']
            l_types[t] = l_types.get(t, 0) + 1
            tot_types[t] = tot_types.get(t, 0) + 1
            l_prios[prio] = l_prios.get(prio, 0) + 1
            tot_prios[prio] = tot_prios.get(prio, 0) + 1

    lesson_stats[l_id] = {
        'total': len(items),
        'clean': l_clean,
        'issue_files': l_issue_files,
        'types': l_types,
        'prios': l_prios
    }

doc = []

# Title
doc.append("# Глубокий педагогический аудит курса foma-code-lab\n")

# Executive Summary
doc.append("## Сводка аудита\n")
doc.append(f"- Всего файлов проверено: **{tot_files}** (100% покрытие, все 10 уроков)")
doc.append(f"- Файлов без замечаний: **{tot_clean}**")
doc.append(f"- Файлов с замечаниями: **{tot_issue_files}**")
doc.append(f"- Общее количество выявленных проблем: **{tot_problems}**")
doc.append("- Распределение по типам:")
doc.append(f"  - `[ОШИБКА]`: {tot_types['[ОШИБКА]']}")
doc.append(f"  - `[ПЛАВНОСТЬ]`: {tot_types['[ПЛАВНОСТЬ]']}")
doc.append(f"  - `[ЗАДАНИЕ]`: {tot_types['[ЗАДАНИЕ]']}")
doc.append(f"  - `[ПОДАЧА]`: {tot_types['[ПОДАЧА]']}")
doc.append(f"  - `[ПРОБЕЛ]`: {tot_types['[ПРОБЕЛ]']}")
doc.append(f"  - `[ДУБЛИРОВАНИЕ]`: {tot_types['[ДУБЛИРОВАНИЕ]']}")
doc.append("- Распределение по приоритетам:")
doc.append(f"  - Критический: {tot_prios['Критический']}")
doc.append(f"  - Высокий: {tot_prios['Высокий']}")
doc.append(f"  - Средний: {tot_prios['Средний']}")
doc.append(f"  - Низкий: {tot_prios['Низкий']}\n")

# Summary Table
doc.append("### Сводная таблица по всем 10 урокам\n")
headers = [
    "Урок", "Всего файлов", "Без замечаний", "С замечаниями",
    "ОШИБКА", "ПЛАВНОСТЬ", "ЗАДАНИЕ", "ПОДАЧА", "ПРОБЕЛ", "ДУБЛИРОВАНИЕ",
    "Критический", "Высокий", "Средний", "Низкий"
]
doc.append("| " + " | ".join(headers) + " |")
doc.append("| " + " | ".join(["---"] * len(headers)) + " |")

for l_id, l_title in lessons_meta:
    st = lesson_stats[l_id]
    t = st['types']
    p = st['prios']
    row = [
        f"**{l_id}**",
        str(st['total']),
        str(st['clean']),
        str(st['issue_files']),
        str(t["[ОШИБКА]"]),
        str(t["[ПЛАВНОСТЬ]"]),
        str(t["[ЗАДАНИЕ]"]),
        str(t["[ПОДАЧА]"]),
        str(t["[ПРОБЕЛ]"]),
        str(t["[ДУБЛИРОВАНИЕ]"]),
        str(p["Критический"]),
        str(p["Высокий"]),
        str(p["Средний"]),
        str(p["Низкий"])
    ]
    doc.append("| " + " | ".join(row) + " |")

tot_row = [
    "**ИТОГО**",
    str(tot_files),
    str(tot_clean),
    str(tot_issue_files),
    str(tot_types["[ОШИБКА]"]),
    str(tot_types["[ПЛАВНОСТЬ]"]),
    str(tot_types["[ЗАДАНИЕ]"]),
    str(tot_types["[ПОДАЧА]"]),
    str(tot_types["[ПРОБЕЛ]"]),
    str(tot_types["[ДУБЛИРОВАНИЕ]"]),
    str(tot_prios["Критический"]),
    str(tot_prios["Высокий"]),
    str(tot_prios["Средний"]),
    str(tot_prios["Низкий"])
]
doc.append("| " + " | ".join(tot_row) + " |\n")

# Known Issues Analysis
doc.append("""## Анализ и статус Known Issues (1–7)

Перед проведением сплошного аудита были выдвинуты семь гипотез о системных педагогических и кодовых дефектах. Ниже представлены результаты их детальной инструментальной проверки и статус устранения:

### 1. Дублирование HTML-каркаса (`01-intro/08-html-structure.md` vs `02-markup/00-theory-01-doctype.md`)
- **Статус:** **Подтверждено**
- **Тип:** `[ДУБЛИРОВАНИЕ]`
- **Приоритет:** Высокий
- **Анализ:** В уроке 01 (шаг `08-html-structure.md`) учащемуся даётся полное пошаговое конструирование скелета страницы: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, метатеги `charset` и `viewport`. Ровно через два файла, в начале урока 02 (`00-theory-01-doctype.md`), тот же самый материал объясняется повторно практически теми же словами и блоками кода. Это рассеивает внимание студента и создаёт ложное ощущение топтания на месте.
- **Решение:** В шаге `01-intro/08-html-structure.md` сосредоточиться на концептуальной модели документа (контейнеры, дерево DOM, разделение метаданных и контента). Всю строгую теорию стандартов HTML5, директивы DOCTYPE и тегов `<head>` сконцентрировать в уроке 02 (`00-theory-01-doctype.md`), сделав в нём отсылку к первичному знакомству.

---

### 2. Рассогласование задания и решения в `02-markup/00-theory-06b-variables.md`
- **Статус:** **Подтверждено**
- **Тип:** `[ЗАДАНИЕ]` / `[ОШИБКА]`
- **Приоритет:** **Критический** (блокирует прохождение шага)
- **Анализ:** Текст инструкции к практическому заданию требует объявить ровно две переменные: `--brand-color: #2b6cb0;` и `--brand-radius: 8px;`. При этом в эталонном решении тренажёра (`css:solution`) и проверочных тестах неявно требуется третья переменная: `--brand-dark: #1a4971;`. Студент, выполнивший инструкцию на 100% точно, получает ошибку проверки.
- **Решение:** В строках 80–87 файла `00-theory-06b-variables.md` явно дополнить формулировку задания пунктом о необходимости объявить `--brand-dark: #1a4971;` в селекторе `:root`.

---

### 3. Anti-pattern в `01-intro/07-images.md`: атрибут `loading="lazy"` на первом экране
- **Статус:** **Подтверждено**
- **Тип:** `[ОШИБКА]`
- **Приоритет:** Высокий
- **Анализ:** В демонстрационном коде главного изображения первого экрана (hero banner) установлен атрибут `loading="lazy"`. Согласно рекомендациям Google Chrome DevTools и метрикам Core Web Vitals (Largest Contentful Paint — LCP), установка `loading="lazy"` на изображения первого экрана (above-the-fold) приводит к искусственной задержке сетевой выборки и деградации LCP на 200–500 мс.
- **Решение:** Исключить `loading="lazy"` из разметки главного баннера в `01-intro/07-images.md` (строка 45) и добавить дидактический блок с правилом: ленивая загрузка применяется исключительно для изображений, находящихся ниже границы первого экрана (below-the-fold).

---

### 4. Тема тега `<br>` раскрыта дважды (`01-intro/04-paragraphs.md`)
- **Статус:** **Подтверждено**
- **Тип:** `[ДУБЛИРОВАНИЕ]`
- **Приоритет:** Средний
- **Анализ:** В файле `01-intro/04-paragraphs.md` тег принудительного переноса строки `<br>` объясняется два раза: сначала в базовом тексте о параграфах, а затем повторно в сравнительной таблице блочных и строчных элементов (строки 60–75). Сравнительная таблица здесь преждевременна, так как отдельный шаг `11-block-inline.md` посвящён именно этой теме.
- **Решение:** Удалить преждевременную таблицу блочных/строчных элементов из `01-intro/04-paragraphs.md`, а упоминание `<br>` оставить как краткое предупреждение о недопустимости создания отступов с помощью цепочек `<br><br>`.

---

### 5. Отсутствие объяснения условных операторов `if / else` в уроке 04-js-dom
- **Статус:** **Подтверждено**
- **Тип:** `[ПРОБЕЛ]`
- **Приоритет:** **Критический**
- **Анализ:** В теоретическом введении `00-theory-01-js-basics.md` кратко упоминается логический тип данных (`true`/`false`), однако конструкция `if / else`, логические операторы (`&&`, `||`, `!`) и операторы строгого сравнения (`===`, `!==`) не объясняются вообще. При этом в практических шагах урока 04 (шаги 05, 14, 15, 16, 17, 20, 21, 23) студент обязан писать разветвлённую логику проверки условий.
- **Решение:** Внедрить полноценный параграф `## Условный оператор: if / else` в `04-js-dom/00-theory-01-js-basics.md` с наглядным жизненным примером проверки статуса офиса (`isOpen`) и таблицей операторов сравнения.

---

### 6. Использование `rel="noopener"` без `noreferrer` в `01-intro/06-links.md`
- **Статус:** **Подтверждено**
- **Тип:** `[ОШИБКА]`
- **Приоритет:** Высокий
- **Анализ:** Для ссылок с атрибутом `target="_blank"` приводится только директива `rel="noopener"`. Современный стандарт безопасности и приватности (MDN, OWASP) предписывает использование парной связки `rel="noopener noreferrer"` для полного предотвращения утечки заголовка `Referer` и изоляции контекста выполнения в устаревших версиях браузеров.
- **Решение:** Обновить примеры в строках 35–42 и 85–88 файла `01-intro/06-links.md`, заменив `rel="noopener"` на `rel="noopener noreferrer"`, и объяснить студентам разницу между изоляцией процесса (`noopener`) и защитой приватности адреса перехода (`noreferrer`).

---

### 7. Использование свойств `overflow` и `object-fit` до их теоретического введения
- **Статус:** **Подтверждено**
- **Тип:** `[ПРОБЕЛ]` / `[ПОДАЧА]`
- **Приоритет:** Средний
- **Анализ:** Свойства `overflow: hidden` и `object-fit: cover` теоретически объясняются только в уроке 03 (`00-theory-04-card.md`, `00-theory-05-overflow.md`). Однако вёрстка карточек комнат с изображениями начинается уже в конце урока 02, где эти CSS-правила появляются в стартовых стилях без малейших пояснений, вызывая недоумение у новичков.
- **Решение:** В стилях карточек урока 02 снабдить правила `overflow: hidden` и `object-fit: cover` опережающим комментарием («Подробно механику кадрирования и скрытия переполнения разберём в уроке 03»), а в теоретическом блоке урока 03 сделать явную дидактическую отсылку к вёрстке из урока 02.
\n""")

# Detailed sections for each lesson
for l_id, l_title in lessons_meta:
    doc.append(f"## {l_title}\n")
    items = by_lesson[l_id]
    for item in items:
        fname = item['fname']
        rel_path = item['rel_path']
        if item['is_clean']:
            doc.append(f"### `{fname}` — без замечаний")
            doc.append(f"**Файл:** `{rel_path}`")
            doc.append("**Статус:** Без замечаний")
            if item.get('comment'):
                doc.append(f"**Примечание:** {item['comment']}")
            doc.append("")
        else:
            probs = item['problems']
            if len(probs) == 1:
                p = probs[0]
                title = p['title'] if p['title'] else "Обнаружено замечание"
                doc.append(f"### `{fname}` — {title}")
                doc.append(f"**Тип:** `{p['type']}`")
                doc.append(f"**Приоритет:** `{p['priority']}`")
                doc.append(f"**Файл:** `{rel_path}`")
                doc.append(f"**Строки:** `{p['lines']}`")
                doc.append(f"**Проблема:** {p['problem']}")
                doc.append(f"**Правка:**\n{p['fix']}")
                doc.append("")
            else:
                doc.append(f"### `{fname}` — Комплексные замечания ({len(probs)} проблемы)")
                doc.append(f"**Файл:** `{rel_path}`")
                doc.append(f"**Статус:** С замечаниями ({len(probs)} проблемы)")
                doc.append("")
                for idx, p in enumerate(probs, 1):
                    title = p['title'] if p['title'] else f"Проблема {idx}"
                    doc.append(f"#### Проблема {idx}: {title}")
                    doc.append(f"**Тип:** `{p['type']}`")
                    doc.append(f"**Приоритет:** `{p['priority']}`")
                    doc.append(f"**Файл:** `{rel_path}`")
                    doc.append(f"**Строки:** `{p['lines']}`")
                    doc.append(f"**Проблема:** {p['problem']}")
                    doc.append(f"**Правка:**\n{p['fix']}")
                    doc.append("")

final_text = "\n".join(doc)
out_path = 'content/AUDIT_REPORT.md'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(final_text)

print(f"Generated {out_path}: {len(final_text)} characters, {len(final_text.splitlines())} lines.")
