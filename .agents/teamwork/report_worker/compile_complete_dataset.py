import os
import glob
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Load actual files
lessons_dir = 'content/lessons'
actual_files = sorted(glob.glob(f'{lessons_dir}/**/*.md', recursive=True))

file_info = {}
for af in actual_files:
    norm = os.path.normpath(af).replace('\\', '/')
    parts = norm.split('/')
    lesson = parts[2]
    fname = os.path.basename(af)
    file_info[fname] = {
        'lesson': lesson,
        'rel_path': norm,
        'fname': fname
    }

print(f"Total actual files: {len(file_info)}")

# 1. Parse M1
def parse_m1():
    with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    sections = re.split(r'####\s+\d+\.\s+', text)[1:]
    sections[-1] = re.split(r'\n##\s+3\.\s+Сводная матрица', sections[-1])[0]

    results = []
    for s in sections:
        lines = s.strip().splitlines()
        header = lines[0]
        m = re.search(r'`([^`]+)`(?:\s+—\s+(.*))?', header)
        if not m:
            print("M1 ERROR header:", header)
            continue
        fname = m.group(1)
        header_title = m.group(2).strip() if m.group(2) else ""
        
        info = file_info.get(fname, {})
        lesson = info.get('lesson', '')
        rel_path = info.get('rel_path', f"content/lessons/{lesson}/{fname}")

        is_clean = 'без замечаний' in s.lower() and '- **Тип:**' not in s

        if is_clean:
            # Look for comment
            comment = ""
            cm = re.search(r'- \*\*Комментарий:\*\*\s*(.*)', s)
            if cm:
                comment = cm.group(1).strip()
            results.append({
                'fname': fname,
                'lesson': lesson,
                'rel_path': rel_path,
                'is_clean': True,
                'comment': comment,
                'problems': []
            })
        else:
            # Parse problem
            # Check fields
            t_m = re.search(r'- \*\*Тип:\*\*\s*`?\[?([A-ZА-ЯЁa-zа-яё]+)\]?`?', s)
            p_m = re.search(r'- \*\*Приоритет:\*\*\s*`?\*?\*?([A-Za-zА-Яа-яЁё]+)\*?\*?`?', s)
            l_m = re.search(r'- \*\*Строки:\*\*\s*([^\n]+)', s)
            prob_m = re.search(r'- \*\*Проблема:\*\*\s*(.*?)(?=\n- \*\*Правка:\*\*|\Z)', s, re.DOTALL)
            fix_m = re.search(r'- \*\*Правка:\*\*\s*(.*)', s, re.DOTALL)

            p_type = f"[{t_m.group(1)}]" if t_m else "[ОШИБКА]"
            p_prio = p_m.group(1) if p_m else "Средний"
            p_lines = l_m.group(1).strip() if l_m else "—"
            p_desc = prob_m.group(1).strip() if prob_m else ""
            p_fix = fix_m.group(1).strip() if fix_m else ""

            # Clean up p_prio if it has markdown formatting
            if 'критический' in p_prio.lower():
                p_prio = 'Критический'
            elif 'высокий' in p_prio.lower():
                p_prio = 'Высокий'
            elif 'средний' in p_prio.lower():
                p_prio = 'Средний'
            elif 'низкий' in p_prio.lower():
                p_prio = 'Низкий'

            results.append({
                'fname': fname,
                'lesson': lesson,
                'rel_path': rel_path,
                'is_clean': False,
                'problems': [{
                    'title': header_title,
                    'type': p_type,
                    'priority': p_prio,
                    'lines': p_lines,
                    'problem': p_desc,
                    'fix': p_fix
                }]
            })
    return results

m1_res = parse_m1()
print(f"Parsed M1 items: {len(m1_res)}")
