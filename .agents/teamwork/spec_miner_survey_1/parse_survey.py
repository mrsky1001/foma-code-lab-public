import re
import os

AUDIT_PATH = r"d:\IEEU International East-European University\foma-code-lab\content\AUDIT_REPORT.md"
REPO_ROOT = r"d:\IEEU International East-European University\foma-code-lab"

with open(AUDIT_PATH, "r", encoding="utf-8") as f:
    text = f.read()

# Let's split into lessons
lessons = re.split(r'\n(?=## Урок )', text)

# First part is intro and known issues.
# Lessons 1 to 10 are lessons[1:]

items = []

for l_idx, l_text in enumerate(lessons[1:], 1):
    lines = l_text.strip().split('\n')
    lesson_title = lines[0] # e.g. "## Урок 01 — Введение (11 файлов)"
    
    # Split by ### headers
    subsections = re.split(r'\n(?=### )', l_text)
    for sub in subsections:
        if not sub.startswith('### '):
            continue
        sub_lines = sub.strip().split('\n')
        h = sub_lines[0]
        if 'без замечаний' in h.lower() or 'Без замечаний' in sub:
            # Skip clean files
            continue
        
        # Check if this subsection has sub-problems (#### Проблема 1, #### Проблема 2, etc.)
        if '#### Проблема' in sub:
            prob_parts = re.split(r'\n(?=#### Проблема \d+)', sub)
            # prob_parts[0] is the header of the file
            header_part = prob_parts[0]
            for p_part in prob_parts[1:]:
                items.append({
                    'lesson_header': lesson_title,
                    'file_header': h,
                    'is_subproblem': True,
                    'text': p_part,
                    'header_part': header_part
                })
        else:
            items.append({
                'lesson_header': lesson_title,
                'file_header': h,
                'is_subproblem': False,
                'text': sub,
                'header_part': ''
            })

print(f"Total extracted items: {len(items)}")

with open(r"d:\IEEU International East-European University\foma-code-lab\.agents\teamwork\spec_miner_survey_1\items_summary.txt", "w", encoding="utf-8") as out:
    for idx, it in enumerate(items, 1):
        out.write(f"Issue {idx}: {it['lesson_header']} | {it['file_header']}\n")
        if it['is_subproblem']:
            sub_title = it['text'].split('\n')[0]
            out.write(f"   Subproblem: {sub_title}\n")
