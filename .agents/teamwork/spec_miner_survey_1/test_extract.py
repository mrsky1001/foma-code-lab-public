import re
import os

AUDIT_PATH = r"d:\IEEU International East-European University\foma-code-lab\content\AUDIT_REPORT.md"
REPO_ROOT = r"d:\IEEU International East-European University\foma-code-lab"

with open(AUDIT_PATH, "r", encoding="utf-8") as f:
    text = f.read()

lessons = re.split(r'\n(?=## Урок )', text)

raw_items = []

for l_idx, l_text in enumerate(lessons[1:], 1):
    lines = l_text.strip().split('\n')
    lesson_title = lines[0] # e.g. "## Урок 01 — Введение (11 файлов)"
    
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

print(f"Total raw items: {len(raw_items)}")

# We only care about items 0 to 59 (Issues 1 to 60)
items_1_60 = raw_items[:60]

for idx, it in enumerate(items_1_60, 1):
    full_text = it['header_part'] + "\n" + it['text']
    
    # Extract file path
    m_file = re.search(r'\*\*Файл:\*\*\s*`?([^`\n]+)`?', full_text)
    file_path = m_file.group(1).strip() if m_file else None
    
    # If not found via **Файл:**, try header `filename`
    if not file_path:
        m_head = re.search(r'###\s+`([^`]+)`', it['file_header'])
        if m_head:
            # derive from lesson
            les_match = re.search(r'Урок\s+(\d+)', it['lesson_header'])
            les_num = les_match.group(1) if les_match else ""
            file_path = f"content/lessons/{les_num}.../{m_head.group(1)}"
            
    # Check file exists
    full_disk_path = os.path.join(REPO_ROOT, file_path.replace('/', os.sep)) if file_path else ""
    exists = os.path.exists(full_disk_path)
    
    # Extract type, priority, lines
    m_type = re.search(r'\*\*Тип:\*\*\s*([^\n]+)', full_text)
    m_prio = re.search(r'\*\*Приоритет:\*\*\s*([^\n]+)', full_text)
    m_lines = re.search(r'\*\*Строки:\*\*\s*([^\n]+)', full_text)
    
    # Check problem and fix
    has_prob = "**Проблема:**" in full_text
    has_prav = "**Правка:**" in full_text
    
    if not exists or not has_prob or not has_prav or not file_path:
        print(f"Issue {idx}: file={file_path}, exists={exists}, prob={has_prob}, prav={has_prav}")

print("Verification check done.")
