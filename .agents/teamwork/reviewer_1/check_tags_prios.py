import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('content/AUDIT_REPORT.md', 'r', encoding='utf-8') as f:
    content = f.read()

valid_tags = {'[ДУБЛИРОВАНИЕ]', '[ОШИБКА]', '[ЗАДАНИЕ]', '[ПРОБЕЛ]', '[ПОДАЧА]', '[ПЛАВНОСТЬ]'}
valid_prios = {'Критический', 'Высокий', 'Средний', 'Низкий'}

type_lines = re.findall(r'\*\*Тип:\*\*\s*(.+)', content)
print(f"Total '**Тип:**' occurrences: {len(type_lines)}")

invalid_tags = []
for tl in type_lines:
    tl_clean = tl.strip()
    # Check if contains any valid tags
    found = [t for t in valid_tags if t in tl_clean]
    if not found:
        invalid_tags.append(tl_clean)

if invalid_tags:
    print(f"Found {len(invalid_tags)} invalid tag lines:")
    for it in invalid_tags:
        print("  -", it)
else:
    print("[PASS] All tag lines contain strictly valid tags from R2!")

prio_lines = re.findall(r'\*\*Приоритет:\*\*\s*(.+)', content)
print(f"Total '**Приоритет:**' occurrences: {len(prio_lines)}")

invalid_prios = []
for pl in prio_lines:
    pl_clean = pl.strip().replace('`', '')
    found = [p for p in valid_prios if p in pl_clean]
    if not found:
        invalid_prios.append(pl_clean)

if invalid_prios:
    print(f"Found {len(invalid_prios)} invalid priority lines:")
    for ip in invalid_prios:
        print("  -", ip)
else:
    print("[PASS] All priority lines contain strictly valid priorities!")
