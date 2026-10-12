import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'r', encoding='utf-8') as f:
    m2_text = f.read()

# Let's count tags in M2
sections = re.split(r'###\s+\d+\.\s+', m2_text)[1:]

m2_types = {}
m2_prios = {}
clean_count = 0
issue_count = 0

for s in sections:
    is_clean = 'без замечаний' in s.lower() and '**Тип:**' not in s
    if is_clean:
        clean_count += 1
    else:
        issue_count += 1
        types = re.findall(r'- \*\*Тип:\*\*\s*`?\[?([A-ZА-ЯЁa-zа-яё]+)\]?`?', s)
        prios = re.findall(r'- \*\*Приоритет:\*\*\s*([A-Za-zА-Яа-яЁё]+)', s)
        for t in types:
            m2_types[t] = m2_types.get(t, 0) + 1
        for p in prios:
            m2_prios[p] = m2_prios.get(p, 0) + 1

print(f"M2 clean files: {clean_count}, issue files: {issue_count}")
print("M2 types:", m2_types, f"sum={sum(m2_types.values())}")
print("M2 prios:", m2_prios, f"sum={sum(m2_prios.values())}")
