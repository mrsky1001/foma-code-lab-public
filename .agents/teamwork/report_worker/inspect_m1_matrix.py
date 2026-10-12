import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'r', encoding='utf-8') as f:
    m1_text = f.read()

# Let's inspect the summary matrix in M1:
matrix_part = m1_text.split('## 3. Сводная матрица всех 72 файлов Milestone 1')[1]
matrix_lines = [l for l in matrix_part.splitlines() if l.strip().startswith('|') and not l.strip().startswith('|---') and not l.strip().startswith('| №')]

print(f"Matrix rows in M1: {len(matrix_lines)}")
matrix_clean = 0
matrix_issues = 0
for row in matrix_lines:
    cols = [c.strip() for c in row.split('|')[1:-1]]
    num, fname, status, ptype, prio = cols[:5]
    if 'без замечаний' in status.lower() or 'без замечаний' in ptype.lower():
        matrix_clean += 1
    else:
        matrix_issues += 1
        print(f"Matrix issue #{num}: {fname} | {ptype} | {prio}")

print(f"Matrix clean: {matrix_clean}, issues: {matrix_issues}, total: {matrix_clean + matrix_issues}")
