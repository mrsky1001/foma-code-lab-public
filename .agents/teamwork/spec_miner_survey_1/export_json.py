import re
import os
import json

AUDIT_PATH = r"d:\IEEU International East-European University\foma-code-lab\content\AUDIT_REPORT.md"
REPO_ROOT = r"d:\IEEU International East-European University\foma-code-lab"

with open(AUDIT_PATH, "r", encoding="utf-8") as f:
    text = f.read()

lessons = re.split(r'\n(?=## Урок )', text)

raw_items = []

for l_idx, l_text in enumerate(lessons[1:], 1):
    lines = l_text.strip().split('\n')
    lesson_title = lines[0]
    
    subsections = re.split(r'\n(?=### )', l_text)
    for sub in subsections:
        if not sub.startswith('### '):
            continue
        sub_lines = sub.strip().split('\n')
        h = sub_lines[0]
        if 'без замечаний' in h.lower() or 'Без замечаний' in sub:
            continue
        
        if '#### Проблема' in sub:
            prob_parts = re.split(r'\n(?=#### Проблема \d+)', sub)
            header_part = prob_parts[0]
            for p_part in prob_parts[1:]:
                raw_items.append({
                    'lesson_header': lesson_title,
                    'file_header': h,
                    'is_subproblem': True,
                    'text': p_part,
                    'header_part': header_part
                })
        else:
            raw_items.append({
                'lesson_header': lesson_title,
                'file_header': h,
                'is_subproblem': False,
                'text': sub,
                'header_part': ''
            })

items_1_60 = raw_items[:60]

parsed = []

for idx, it in enumerate(items_1_60, 1):
    full_text = it['header_part'] + "\n" + it['text']
    
    # Title
    if it['is_subproblem']:
        # title is in first line of text
        t_lines = it['text'].strip().split('\n')
        issue_title = t_lines[0].replace('#### ', '').strip()
    else:
        # title is in file_header
        issue_title = it['file_header'].replace('### ', '').strip()
        
    # File path
    m_file = re.search(r'\*\*Файл:\*\*\s*`?([^`\n]+)`?', full_text)
    file_path = m_file.group(1).strip() if m_file else ""
    
    # Target lesson
    les_clean = it['lesson_header'].replace('## ', '').strip()
    # Also extract folder name like 01-intro
    les_folder = file_path.split('/')[2] if len(file_path.split('/')) > 2 else ""

    # Type & Priority & Lines
    m_type = re.search(r'\*\*Тип:\*\*\s*([^\n]+)', full_text)
    issue_type = m_type.group(1).strip() if m_type else ""
    
    m_prio = re.search(r'\*\*Приоритет:\*\*\s*([^\n]+)', full_text)
    priority = m_prio.group(1).strip() if m_prio else ""
    
    m_lines = re.search(r'\*\*Строки:\*\*\s*([^\n]+)', full_text)
    lines_range = m_lines.group(1).strip() if m_lines else ""
    
    # Problem & Fix
    # Problem starts at **Проблема:** until **Правка:**
    prob_match = re.search(r'\*\*Проблема:\*\*\s*(.*?)(?=\*\*Правка:\*\*|\Z)', it['text'], re.DOTALL)
    prob_text = prob_match.group(1).strip() if prob_match else ""
    
    prav_match = re.search(r'\*\*Правка:\*\*\s*(.*)', it['text'], re.DOTALL)
    prav_text = prav_match.group(1).strip() if prav_match else ""
    
    # Check disk existence
    full_disk_path = os.path.join(REPO_ROOT, file_path.replace('/', os.sep))
    exists = os.path.exists(full_disk_path)
    
    parsed.append({
        'id': idx,
        'lesson': les_clean,
        'lesson_folder': les_folder,
        'title': issue_title,
        'file_path': file_path,
        'exists': exists,
        'type': issue_type,
        'priority': priority,
        'lines': lines_range,
        'problem': prob_text,
        'fix': prav_text,
        'raw_text': it['text']
    })

print(f"Parsed {len(parsed)} issues successfully.")

with open(r"d:\IEEU International East-European University\foma-code-lab\.agents\teamwork\spec_miner_survey_1\parsed_60.json", "w", encoding="utf-8") as f:
    json.dump(parsed, f, ensure_ascii=False, indent=2)

print("Saved to parsed_60.json")
