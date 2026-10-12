import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

report_file = 'content/AUDIT_REPORT.md'
with open(report_file, 'r', encoding='utf-8') as f:
    content = f.read()

targets = [
    '07-grid-container-html.md',
    '00-theory-06-fetch.md',
    '00-theory-07-tabs.md',
    '00-theory-05-storage.md',
    '00-theory-06-modal.md'
]

sections = re.split(r'\n###\s+`', content)
for sec in sections[1:]:
    fname = sec.split('`')[0].strip()
    for t in targets:
        if t in fname:
            print(f"===================== {fname} =====================")
            # print up to next section or 1500 chars
            print(sec[:1200])
            print("\n")
