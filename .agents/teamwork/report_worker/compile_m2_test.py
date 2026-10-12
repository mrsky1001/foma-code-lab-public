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

def parse_m2():
    with open('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    sections = re.split(r'###\s+\d+\.\s+', text)[1:]
    results = []

    for s in sections:
        lines = s.strip().splitlines()
        header = lines[0]
        m = re.search(r'`([^`]+)`(?:\s+—\s+(.*))?', header)
        if not m:
            print("M2 ERROR header:", header)
            continue
        fname = m.group(1)
        header_title = m.group(2).strip() if m.group(2) else ""

        info = file_info.get(fname, {})
        lesson = info.get('lesson', '')
        rel_path = info.get('rel_path', f"content/lessons/{lesson}/{fname}")

        is_clean = 'без замечаний' in s.lower() and '**Тип:**' not in s

        if is_clean:
            comment = ""
            cm = re.search(r'\*\*Статус:\*\*\s*без замечаний\.?\s*(.*)', s, re.IGNORECASE)
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
            # Check if there are multiple problems or a single problem
            prob_blocks = re.split(r'\n- \*\*Проблема(?:\s+\d+)?:', s)
            if len(prob_blocks) > 1:
                # First part was header line
                parsed_probs = []
                for pb in prob_blocks[1:]:
                    pb_lines = pb.strip().splitlines()
                    title = pb_lines[0].replace('**', '').strip()
                    pb_text = '\n'.join(pb_lines[1:])
                    
                    t_m = re.search(r'- \*\*Тип:\*\*\s*`?\[?([A-ZА-ЯЁa-zа-яё]+)\]?`?', pb_text)
                    p_m = re.search(r'- \*\*Приоритет:\*\*\s*`?\*?\*?([A-Za-zА-Яа-яЁё]+)\*?\*?`?', pb_text)
                    l_m = re.search(r'- \*\*Строки:\*\*\s*([^\n]+)', pb_text)
                    desc_m = re.search(r'- \*\*(?:Описание|Проблема):\*\*\s*(.*?)(?=\n\s*- \*\*Правка:\*\*|\Z)', pb_text, re.DOTALL)
                    fix_m = re.search(r'- \*\*Правка:\*\*\s*(.*)', pb_text, re.DOTALL)

                    p_type = f"[{t_m.group(1)}]" if t_m else "[ОШИБКА]"
                    p_prio = p_m.group(1).strip() if p_m else "Средний"
                    p_lines = l_m.group(1).strip() if l_m else "—"
                    p_desc = desc_m.group(1).strip() if desc_m else ""
                    p_fix = fix_m.group(1).strip() if fix_m else ""

                    if 'критический' in p_prio.lower():
                        p_prio = 'Критический'
                    elif 'высокий' in p_prio.lower():
                        p_prio = 'Высокий'
                    elif 'средний' in p_prio.lower():
                        p_prio = 'Средний'
                    elif 'низкий' in p_prio.lower():
                        p_prio = 'Низкий'

                    parsed_probs.append({
                        'title': title,
                        'type': p_type,
                        'priority': p_prio,
                        'lines': p_lines,
                        'problem': p_desc,
                        'fix': p_fix
                    })
                results.append({
                    'fname': fname,
                    'lesson': lesson,
                    'rel_path': rel_path,
                    'is_clean': False,
                    'problems': parsed_probs
                })
            else:
                # Fallback if '- **Проблема:' format wasn't used
                print("M2 UNEXPECTED format in issue:", fname, s[:200])

    return results

m2_res = parse_m2()
print(f"Parsed M2 items: {len(m2_res)}")
m2_clean_count = sum(1 for x in m2_res if x['is_clean'])
m2_issue_count = sum(1 for x in m2_res if not x['is_clean'])
m2_prob_count = sum(len(x['problems']) for x in m2_res)
print(f"M2 clean: {m2_clean_count}, issue files: {m2_issue_count}, total problems: {m2_prob_count}")
