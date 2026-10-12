import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'r', encoding='utf-8') as f:
    m2_text = f.read()

# In M2, sections are:
# ### N. `filename.md`
sections = re.split(r'###\s+\d+\.\s+', m2_text)[1:]
print(f"Total M2 items parsed: {len(sections)}")

m2_items = []
for s in sections:
    lines = s.strip().splitlines()
    header_line = lines[0]
    m = re.search(r'`([^`]+)`(?:\s+—\s+(.*))?', header_line)
    if not m:
        print("ERROR matching M2 header:", header_line)
        continue
    fname = m.group(1)
    short_title = m.group(2) if m.group(2) else ""
    
    # Check if clean
    is_clean = 'без замечаний' in s.lower() and '**Тип:**' not in s
    m2_items.append({
        'file': fname,
        'title': short_title,
        'clean': is_clean,
        'raw': s
    })

print(f"M2 clean: {sum(1 for x in m2_items if x['clean'])}, issues: {sum(1 for x in m2_items if not x['clean'])}")
for x in m2_items[:10]:
    print(f"  {x['file']}: clean={x['clean']}, title={x['title']}")
