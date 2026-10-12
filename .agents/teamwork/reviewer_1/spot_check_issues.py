import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('content/AUDIT_REPORT.md', 'r', encoding='utf-8') as f:
    content = f.read()

sections = re.split(r'\n###\s+`', content)[1:]

# Sample issues across different lessons
sampled_issues = []
for sec in sections:
    if "без замечаний" in sec.lower():
        continue
    # Extract file path
    m_file = re.search(r'\*\*Файл:\*\*\s*`?([^`\n\r]+)`?', sec)
    m_lines = re.search(r'\*\*Строки:\*\*\s*`?([0-9]+)(?:[–\-]([0-9]+))?`?', sec)
    m_prob = re.search(r'\*\*Проблема:\*\*\s*(.+)', sec)
    m_type = re.search(r'\*\*Тип:\*\*\s*`?([^`\n\r]+)`?', sec)
    if m_file and m_lines and m_prob:
        sampled_issues.append({
            'file': m_file.group(1).strip().replace('\\', '/'),
            'start': int(m_lines.group(1)),
            'end': int(m_lines.group(2)) if m_lines.group(2) else int(m_lines.group(1)),
            'prob': m_prob.group(1).strip()[:100],
            'type': m_type.group(1).strip() if m_type else ''
        })

print(f"Total issue files sampled: {len(sampled_issues)}")

# Let's inspect 15 issues across different lessons
step = max(1, len(sampled_issues) // 15)
test_set = sampled_issues[::step][:15]

for idx, item in enumerate(test_set, 1):
    fpath = item['file']
    print(f"\n[{idx}] File: {fpath} | Lines: {item['start']}-{item['end']} | Type: {item['type']}")
    print(f"    Problem: {item['prob']}")
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            flines = f.readlines()
        s = max(1, item['start'])
        e = min(len(flines), item['end'])
        snippet = "".join(flines[s-1:e]).strip()
        print(f"    Target lines content ({s}-{e}, {len(snippet)} chars):")
        first_few = [l.strip() for l in flines[s-1:min(s+3, e)] if l.strip()]
        for ff in first_few[:2]:
            print(f"      > {ff[:90]}")
    else:
        print(f"    [ERROR] File does not exist: {fpath}")
