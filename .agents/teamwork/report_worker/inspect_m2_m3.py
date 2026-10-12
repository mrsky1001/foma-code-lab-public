import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def inspect_m2():
    with open('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    sections = re.split(r'###\s+\d+\.\s+', text)[1:]
    print(f'M2 total items: {len(sections)}')
    for idx, s in enumerate(sections[:5], 1):
        print(f'--- M2 ITEM {idx} ---')
        print(s[:300])

def inspect_m3():
    with open('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    # M3 uses '### filename.md'
    parts = re.split(r'\n###\s+(?=[0-9a-zA-Z_-]+\.md)', text)
    print(f'M3 total items: {len(parts)-1}')
    for idx, s in enumerate(parts[1:6], 1):
        print(f'--- M3 ITEM {idx} ---')
        print(s[:300])

if __name__ == '__main__':
    inspect_m2()
    inspect_m3()
