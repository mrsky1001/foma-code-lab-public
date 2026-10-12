import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'r', encoding='utf-8') as f:
    m3_text = f.read()

# Let's inspect M3 items
# Cut off recommendations
if '## Рекомендации' in m3_text:
    m3_body = m3_text.split('## Рекомендации')[0]
else:
    m3_body = m3_text

parts = re.split(r'\n###\s+(?=[0-9a-zA-Z_-]+\.md)', m3_body)[1:]

m3_types = {}
m3_prios = {}
clean_count = 0
issue_count = 0

for p in parts:
    is_clean = 'Статус:** Без замечаний' in p or ('без замечаний' in p.lower() and '**Тип:**' not in p)
    if is_clean:
        clean_count += 1
    else:
        issue_count += 1
        # In M3, type line can be `- **Тип:** [ЗАДАНИЕ] / [ОШИБКА]` or `- **Тип:** [ПОДАЧА]`
        type_line_m = re.search(r'- \*\*Тип:\*\*\s*(.*)', p)
        if type_line_m:
            t_str = type_line_m.group(1)
            found_tags = re.findall(r'\[([A-ZА-ЯЁa-zа-яё]+)\]', t_str)
            for t in found_tags:
                m3_types[t] = m3_types.get(t, 0) + 1
        
        prio_line_m = re.search(r'- \*\*Приоритет:\*\*\s*(.*)', p)
        if prio_line_m:
            p_str = prio_line_m.group(1).strip()
            # Clean up
            p_val = re.search(r'([A-Za-zА-Яа-яЁё]+)', p_str).group(1)
            m3_prios[p_val] = m3_prios.get(p_val, 0) + 1

print(f"M3 clean files: {clean_count}, issue files: {issue_count}")
print("M3 types:", m3_types, f"sum={sum(m3_types.values())}")
print("M3 prios:", m3_prios, f"sum={sum(m3_prios.values())}")
