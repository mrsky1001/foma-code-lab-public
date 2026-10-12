import os
import re
import sys
from pathlib import Path

BASE_DIR = Path(r"d:\IEEU International East-European University\foma-code-lab")
REPORT_PATH = BASE_DIR / "content" / "AUDIT_REPORT.md"
LESSONS_DIR = BASE_DIR / "content" / "lessons"

def normalize_text(t):
    return t.replace('**', '').replace('`', '').strip()

with open(REPORT_PATH, "r", encoding="utf-8") as f:
    text = f.read()

# Let's inspect lesson 04 section
sec_04_m = re.search(r'## Урок 04.*?(?=\n## Урок 05)', text, re.DOTALL)
if not sec_04_m:
    print("Lesson 04 not found!")
    sys.exit(1)

sec_04 = sec_04_m.group(0)

# Let's split by ### `
items = re.split(r'\n(?=### `)', sec_04)
header = items[0]
subsections = items[1:]

print(f"Header: {header.strip().splitlines()[0]}")
print(f"Subsections count: {len(subsections)}")

for idx, sub in enumerate(subsections):
    first_line = sub.strip().splitlines()[0]
    types = re.findall(r'\*\*Тип:\*\*\s*(.+)', sub)
    prios = re.findall(r'\*\*Приоритет:\*\*\s*(.+)', sub)
    status = re.findall(r'\*\*Статус:\*\*\s*(.+)', sub)
    clean = "без замечаний" in first_line.lower() or "без замечаний" in "".join(status).lower()
    print(f"[{idx+1:02d}] {first_line[:60]} -> clean={clean}, types={types}, prios={prios}")
