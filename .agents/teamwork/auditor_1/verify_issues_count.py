import pathlib
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

report_path = pathlib.Path('content/AUDIT_REPORT.md')
report_text = report_path.read_text(encoding='utf-8')

all_types = re.findall(r'\*\*Тип:\*\*\s*(.+)', report_text)
print(f"Total **Тип:** occurrences in entire document: {len(all_types)}")

preamble, lessons_part = report_text.split('## Урок 01 — Введение', 1)
print(f"Occurrences in preamble / Known issues: {len(re.findall(r'\*\*Тип:\*\*', preamble))}")
print(f"Occurrences in lessons part: {len(re.findall(r'\*\*Тип:\*\*', lessons_part))}")

# Let's see what each **Тип:** is in lessons_part
lesson_types = re.findall(r'\*\*Тип:\*\*\s*(.+)', lessons_part)
print(f"\nBreakdown of the {len(lesson_types)} in lessons_part:")
counts = {}
for t in lesson_types:
    clean_t = t.replace('`', '').strip()
    counts[clean_t] = counts.get(clean_t, 0) + 1

for t, c in sorted(counts.items(), key=lambda x: -x[1]):
    print(f"  {t}: {c}")

all_prios = re.findall(r'\*\*Приоритет:\*\*\s*(.+)', lessons_part)
print(f"\nTotal **Приоритет:** occurrences in lessons part: {len(all_prios)}")
prio_counts = {}
for p in all_prios:
    clean_p = p.replace('`', '').strip()
    prio_counts[clean_p] = prio_counts.get(clean_p, 0) + 1

for p, c in sorted(prio_counts.items(), key=lambda x: -x[1]):
    print(f"  {p}: {c}")
