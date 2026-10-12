import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'r', encoding='utf-8') as f:
    m3_text = f.read()

# Let's inspect where lessons start:
# # Урок 07 — Слайдер и интерактивные компоненты (24 файла)
# # Урок 08 — Поиск, фильтрация и бронирование (31 файл)
# # Урок 09 — Финализация проекта и интеграция (13 файлов)
# # Урок 10 — Диагностика и устранение типовых ошибок (5 файлов)

# Split by '# Урок '
lesson_splits = re.split(r'\n#\s+Урок\s+', m3_text)[1:]
print(f"Total M3 lesson blocks: {len(lesson_splits)}")

m3_items = []
for l_idx, block in enumerate(lesson_splits, 7):
    lines = block.splitlines()
    lesson_title = lines[0]
    print(f"Lesson block {l_idx}: {lesson_title}")
    
    # Split items by '### ' where filename is at start of line
    # Note: avoid headers like '## 🛠 Задание' or other subheadings
    # Cut off at '## Рекомендации' if present in lesson 10
    if '## Рекомендации' in block:
        block = block.split('## Рекомендации')[0]
        
    parts = re.split(r'\n###\s+(?=[0-9a-zA-Z_-]+\.md)', block)
    print(f"  Parts found in lesson {l_idx}: {len(parts)-1}")
    
    for p in parts[1:]:
        p_lines = p.strip().splitlines()
        header = p_lines[0]
        # Match filename.md — title
        m = re.match(r'([0-9a-zA-Z_-]+\.md)(?:\s+—\s+(.*))?', header)
        if not m:
            print("  ERROR in M3 header:", header)
            continue
        fname = m.group(1)
        short_title = m.group(2) if m.group(2) else ""
        is_clean = 'Статус:** Без замечаний' in p or ('без замечаний' in p.lower() and '**Тип:**' not in p)
        m3_items.append({
            'lesson_num': l_idx,
            'file': fname,
            'title': short_title,
            'clean': is_clean,
            'raw': p
        })

print(f"Total M3 items parsed: {len(m3_items)}")
print(f"M3 clean: {sum(1 for x in m3_items if x['clean'])}, issues: {sum(1 for x in m3_items if not x['clean'])}")
for x in m3_items[:10]:
    print(f"  {x['file']}: clean={x['clean']}, title={x['title'][:40]}")
