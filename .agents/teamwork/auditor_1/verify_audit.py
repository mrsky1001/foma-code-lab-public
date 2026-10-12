import pathlib
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

report_path = pathlib.Path('content/AUDIT_REPORT.md')
report_text = report_path.read_text(encoding='utf-8')

# Split into preamble (including Known issues) and lessons
preamble, lessons_part = report_text.split('## Урок 01 — Введение', 1)
lessons_part = '## Урок 01 — Введение' + lessons_part

entries = re.split(r'\n(?=### )', lessons_part)
print(f"Total entries in lessons part: {len(entries)}")

issues = []
clean_entries = []
other_entries = []

for idx, entry in enumerate(entries):
    if not entry.strip().startswith('### '):
        continue
    first_line = entry.strip().splitlines()[0]
    
    if 'без замечаний' in first_line.lower():
        clean_entries.append((first_line, entry))
        continue
    
    m_tag = re.search(r'\*\*Тип:\*\*\s*(.+)', entry)
    m_prio = re.search(r'\*\*Приоритет:\*\*\s*(.+)', entry)
    m_file = re.search(r'\*\*Файл:\*\*\s*[`"]?([^`"\n\r]+)[`"]?', entry)
    m_lines = re.search(r'\*\*Строки:\*\*\s*[`"]?([^`"\n\r]+)[`"]?', entry)
    m_prob = re.search(r'\*\*Проблема:\*\*\s*(.+?)(?=\n\*\*Правка:\*\*|\Z)', entry, re.DOTALL)
    m_fix = re.search(r'\*\*Правка:\*\*\s*(.+)', entry, re.DOTALL)

    if m_tag or m_file or m_lines or m_prob or m_fix:
        issues.append({
            'header': first_line,
            'tag': m_tag.group(1).strip() if m_tag else None,
            'prio': m_prio.group(1).strip() if m_prio else None,
            'file': m_file.group(1).strip() if m_file else None,
            'lines': m_lines.group(1).strip() if m_lines else None,
            'problem': m_prob.group(1).strip() if m_prob else None,
            'fix': m_fix.group(1).strip() if m_fix else None,
            'full_text': entry
        })
    else:
        other_entries.append((first_line, entry))

print(f"Clean entries parsed: {len(clean_entries)}")
print(f"Issues parsed: {len(issues)}")
print(f"Other entries: {len(other_entries)}")

# Verify all issues have all mandatory fields
missing_fields = []
for i, iss in enumerate(issues):
    for fld in ['tag', 'prio', 'file', 'lines', 'problem', 'fix']:
        if not iss[fld]:
            missing_fields.append((i, iss['header'], fld))

if missing_fields:
    print(f"\nWARNING: Found {len(missing_fields)} missing fields in issues:")
    for mf in missing_fields:
        print(f"  Issue {mf[0]} ({mf[1]}): missing {mf[2]}")
else:
    print("\nALL issues in lesson sections have ALL 6 mandatory fields!")

# Breakdown by tag
tag_counts = {}
for iss in issues:
    t = iss['tag'].replace('`', '').strip()
    tag_counts[t] = tag_counts.get(t, 0) + 1

print("\n=== TAG BREAKDOWN ===")
for t, c in sorted(tag_counts.items(), key=lambda x: -x[1]):
    print(f"  {t:20s}: {c}")

# Breakdown by priority
prio_counts = {}
for iss in issues:
    p = iss['prio'].replace('`', '').strip()
    prio_counts[p] = prio_counts.get(p, 0) + 1

print("\n=== PRIORITY BREAKDOWN ===")
for p, c in sorted(prio_counts.items(), key=lambda x: -x[1]):
    print(f"  {p:20s}: {c}")
