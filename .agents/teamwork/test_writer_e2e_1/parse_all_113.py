import os
import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

AUDIT_PATH = "content/AUDIT_REPORT.md"
with open(AUDIT_PATH, "r", encoding="utf-8") as f:
    text = f.read()

# Match each lesson section
lesson_sections = re.findall(r'(## Урок (\d+) — ([^\n]+)\n[\s\S]*?)(?=(?:## Урок \d+)|\Z)', text)

lesson_folder_map = {
    "01": ("01-intro", "M1"),
    "02": ("02-markup", "M1"),
    "03": ("03-flexbox", "M1"),
    "04": ("04-js-dom", "M2"),
    "05": ("05-catalog", "M2"),
    "06": ("06-forms", "M3"),
    "07": ("07-slider", "M3"),
    "08": ("08-search", "M4"),
    "09": ("09-final", "M4"),
    "10": ("10-troubleshooting", "M4"),
}

all_issues = []
issue_counter = 0

item_re = re.compile(r'^###\s+`([^`]+)`\s+—\s+(.*)')

for full_sec, num_str, lesson_title in lesson_sections:
    folder, milestone = lesson_folder_map.get(num_str, ("unknown", "unknown"))
    entries = re.split(r'\n(?=### )', full_sec)
    
    for entry in entries:
        lines = entry.strip().splitlines()
        if not lines:
            continue
        first_line = lines[0]
        m_item = item_re.match(first_line)
        if not m_item:
            continue
        fname = m_item.group(1).strip()
        title = m_item.group(2).strip()

        is_clean = ("без замечаний" in title.lower()) or ("**Статус:** Без замечаний" in entry)
        if is_clean:
            continue

        default_fpath = f"content/lessons/{folder}/{fname}"

        if "#### Проблема " in entry:
            sub_sections = re.split(r'\n(?=#### Проблема \d+:)', entry)
            for sub in sub_sections[1:]:
                issue_counter += 1
                m_sub_title = re.search(r'#### Проблема \d+:\s*(.*)', sub)
                sub_title = m_sub_title.group(1).strip() if m_sub_title else title
                m_tag = re.search(r'\*\*Тип:\*\*\s*([^\n]+)', sub)
                m_prio = re.search(r'\*\*Приоритет:\*\*\s*([^\n]+)', sub)
                m_f = re.search(r'\*\*Файл:\*\*\s*[`"]?([^`"\n\r]+)[`"]?', sub)
                sub_fpath = m_f.group(1).strip() if m_f else default_fpath
                m_l = re.search(r'\*\*Строки:\*\*\s*[`"]?([^`"\n\r]+)[`"]?', sub)
                m_p = re.search(r'\*\*Проблема:\*\*\s*(.+?)(?=\n\*\*Правка:\*\*|\Z)', sub, re.DOTALL)
                m_fix = re.search(r'\*\*Правка:\*\*\s*(.+)', sub, re.DOTALL)

                all_issues.append({
                    "id": issue_counter,
                    "milestone": milestone,
                    "lesson": folder,
                    "filename": fname,
                    "file_path": sub_fpath,
                    "title": f"{fname} — {sub_title}",
                    "type": m_tag.group(1).strip() if m_tag else "",
                    "priority": m_prio.group(1).strip() if m_prio else "",
                    "lines": m_l.group(1).strip() if m_l else "",
                    "problem": m_p.group(1).strip() if m_p else "",
                    "fix": m_fix.group(1).strip() if m_fix else "",
                    "full_entry": sub.strip()
                })
        else:
            issue_counter += 1
            m_tag = re.search(r'\*\*Тип:\*\*\s*([^\n]+)', entry)
            m_prio = re.search(r'\*\*Приоритет:\*\*\s*([^\n]+)', entry)
            m_f = re.search(r'\*\*Файл:\*\*\s*[`"]?([^`"\n\r]+)[`"]?', entry)
            sub_fpath = m_f.group(1).strip() if m_f else default_fpath
            m_l = re.search(r'\*\*Строки:\*\*\s*[`"]?([^`"\n\r]+)[`"]?', entry)
            m_p = re.search(r'\*\*Проблема:\*\*\s*(.+?)(?=\n\*\*Правка:\*\*|\Z)', entry, re.DOTALL)
            m_fix = re.search(r'\*\*Правка:\*\*\s*(.+)', entry, re.DOTALL)

            all_issues.append({
                "id": issue_counter,
                "milestone": milestone,
                "lesson": folder,
                "filename": fname,
                "file_path": sub_fpath,
                "title": f"{fname} — {title}",
                "type": m_tag.group(1).strip() if m_tag else "",
                "priority": m_prio.group(1).strip() if m_prio else "",
                "lines": m_l.group(1).strip() if m_l else "",
                "problem": m_p.group(1).strip() if m_p else "",
                "fix": m_fix.group(1).strip() if m_fix else "",
                "full_entry": entry.strip()
            })

print(f"Total parsed issues: {len(all_issues)}")
from collections import Counter
print("By folder:", Counter(x['lesson'] for x in all_issues))
print("By milestone:", Counter(x['milestone'] for x in all_issues))

output_json = ".agents/teamwork/test_writer_e2e_1/parsed_all_113.json"
with open(output_json, "w", encoding="utf-8") as f:
    json.dump(all_issues, f, ensure_ascii=False, indent=2)

print(f"Saved {len(all_issues)} issues to {output_json}")
