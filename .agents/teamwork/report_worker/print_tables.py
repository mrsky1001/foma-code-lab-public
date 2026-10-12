import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Let's inspect M1, M2, M3 summary tables
def print_table(path, title):
    print(f"=== {title} ===")
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    for line in text.splitlines():
        if '|' in line and any(w in line for w in ['Урок', 'intro', 'markup', 'flexbox', 'js-dom', 'catalog', 'forms', 'slider', 'search', 'final', 'troubleshooting', 'ИТОГО']):
            print(line)

print_table('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'M1')
print_table('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'M2')
print_table('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'M3')
