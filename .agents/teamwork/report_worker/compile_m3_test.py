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

def parse_m3():
    with open('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    # Cut off recommendations
    if '## Рекомендации' in text:
        text = text.split('## Рекомендации')[0]

    lesson_splits = re.split(r'\n#\s+Урок\s+', text)[1:]
    results = []

    for l_idx, block in enumerate(lesson_splits, 7):
        parts = re.split(r'\n###\s+(?=[0-9a-zA-Z_-]+\.md)', block)
        for p in parts[1:]:
            lines = p.strip().splitlines()
            header = lines[0]
            m = re.match(r'([0-9a-zA-Z_-]+\.md)(?:\s+—\s+(.*))?', header)
            if not m:
                print("M3 ERROR header:", header)
                continue
            fname = m.group(1)
            header_title = m.group(2).strip() if m.group(2) else ""

            info = file_info.get(fname, {})
            lesson = info.get('lesson', '')
            rel_path = info.get('rel_path', f"content/lessons/{lesson}/{fname}")

            is_clean = 'Статус:** Без замечаний' in p or ('без замечаний' in p.lower() and '**Тип:**' not in p)

            if is_clean:
                comment = ""
                # Search for comment or description
                cm = re.search(r'- \*\*Комментарий:\*\*\s*(.*)', p)
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
                t_m = re.search(r'- \*\*Тип:\*\*\s*([^\n]+)', p)
                p_m = re.search(r'- \*\*Приоритет:\*\*\s*([^\n]+)', p)
                l_m = re.search(r'- \*\*Строки:\*\*\s*([^\n]+)', p)
                prob_m = re.search(r'- \*\*Проблема:\*\*\s*(.*?)(?=\n- \*\*Правка:\*\*|\Z)', p, re.DOTALL)
                fix_m = re.search(r'- \*\*Правка:\*\*\s*(.*)', p, re.DOTALL)

                p_type_raw = t_m.group(1).strip() if t_m else "[ОШИБКА]"
                # In M3, type raw might be `[ЗАДАНИЕ] / [ОШИБКА]` or `[ПОДАЧА]`
                # Let's extract first or primary tag, or keep tag
                # To conform to standard, let's keep the tag
                tag_match = re.search(r'\[([A-ZА-ЯЁa-zа-яё]+)\]', p_type_raw)
                p_type = f"[{tag_match.group(1)}]" if tag_match else "[ОШИБКА]"

                p_prio_raw = p_m.group(1).strip() if p_m else "Средний"
                p_prio = "Средний"
                if 'критический' in p_prio_raw.lower():
                    p_prio = 'Критический'
                elif 'высокий' in p_prio_raw.lower():
                    p_prio = 'Высокий'
                elif 'средний' in p_prio_raw.lower():
                    p_prio = 'Средний'
                elif 'низкий' in p_prio_raw.lower():
                    p_prio = 'Низкий'

                p_lines = l_m.group(1).strip() if l_m else "—"
                p_desc = prob_m.group(1).strip() if prob_m else ""
                p_fix = fix_m.group(1).strip() if fix_m else ""

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

m3_res = parse_m3()
print(f"Parsed M3 items: {len(m3_res)}")
m3_clean_count = sum(1 for x in m3_res if x['is_clean'])
m3_issue_count = sum(1 for x in m3_res if not x['is_clean'])
m3_prob_count = sum(len(x['problems']) for x in m3_res)
print(f"M3 clean: {m3_clean_count}, issue files: {m3_issue_count}, total problems: {m3_prob_count}")
