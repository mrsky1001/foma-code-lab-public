import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'r', encoding='utf-8') as f:
    m1_text = f.read()

# In M1, sections are marked with:
# ### Урок 01: `content/lessons/01-intro/` (11 файлов)
# ...
# #### 01. `01-welcome.md` — Небезопасный доступ к элементу без выборки из DOM
# ...
# #### 02. `02-what-is-html.md`
# - **Статус:** `без замечаний`
# ...
# Let's inspect each item in M1.

sections = re.split(r'####\s+\d+\.\s+', m1_text)[1:]
# Note: the last item might have trailing text from '## 3. Сводная матрица'
last_sec = sections[-1]
matrix_split = re.split(r'\n##\s+3\.\s+Сводная матрица', last_sec)
sections[-1] = matrix_split[0]

print(f"Total M1 items parsed: {len(sections)}")

m1_items = []
for s in sections:
    lines = s.strip().splitlines()
    header_line = lines[0]
    m = re.search(r'`([^`]+)`(?:\s+—\s+(.*))?', header_line)
    if not m:
        print("ERROR matching header:", header_line)
        continue
    fname = m.group(1)
    short_title = m.group(2) if m.group(2) else ""
    
    # Check if clean
    is_clean = 'без замечаний' in s.lower() and '- **Тип:**' not in s
    m1_items.append({
        'file': fname,
        'title': short_title,
        'clean': is_clean,
        'raw': s
    })

print(f"M1 clean: {sum(1 for x in m1_items if x['clean'])}, issues: {sum(1 for x in m1_items if not x['clean'])}")
for x in m1_items[:10]:
    print(f"  {x['file']}: clean={x['clean']}, title={x['title'][:40]}")
