import re

with open('content/AUDIT_REPORT.md', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'###\s+`16-stop-auto-func\.md`.*?(?=\n###|\Z)', text, re.S)
if m:
    print(m.group(0))
