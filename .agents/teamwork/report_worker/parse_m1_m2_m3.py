import os
import glob
import re

def analyze_m1():
    with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    # Split by #### NN.
    sections = re.split(r'####\s+\d+\.\s+', text)[1:]
    print(f'M1 total sections: {len(sections)}')

    clean_files = []
    issue_files = []

    for s in sections:
        first_line = s.split('\n')[0]
        # Match `filename.md`
        m = re.search(r'`([^`]+)`', first_line)
        fn = m.group(1) if m else first_line
        if 'без замечаний' in s.lower() and '- **Тип:**' not in s:
            clean_files.append((fn, first_line))
        else:
            issue_files.append((fn, first_line, s))

    print(f'M1 Clean files: {len(clean_files)}')
    print(f'M1 Issue files: {len(issue_files)}')
    return clean_files, issue_files

def analyze_m2():
    with open('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    sections = re.split(r'###\s+\d+\.\s+', text)[1:]
    print(f'M2 total sections: {len(sections)}')

    clean_files = []
    issue_files = []

    for s in sections:
        first_line = s.split('\n')[0]
        m = re.search(r'`([^`]+)`', first_line)
        fn = m.group(1) if m else first_line
        if 'без замечаний' in s.lower() and '**Тип:**' not in s:
            clean_files.append((fn, first_line))
        else:
            issue_files.append((fn, first_line, s))

    print(f'M2 Clean files: {len(clean_files)}')
    print(f'M2 Issue files: {len(issue_files)}')
    return clean_files, issue_files

def analyze_m3():
    with open('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    # In M3, headers are '### filename.md — title'
    # But wait, there are also sections like '## 🛠 Задание' in M3? Let's check!
    # Let's see how M3 is structured
    lines = text.splitlines()
    m3_headers = []
    for line in lines:
        if line.startswith('### ') and '.md' in line:
            m3_headers.append(line)
    print(f'M3 .md headers count: {len(m3_headers)}')

    clean_files = []
    issue_files = []
    # Split text by '### ' where .md in line
    parts = re.split(r'\n###\s+(?=[0-9a-zA-Z_-]+\.md)', text)
    print(f'M3 parts count: {len(parts)}')
    for p in parts[1:]:
        first_line = p.split('\n')[0]
        fn = first_line.split(' — ')[0].strip()
        if 'Статус:** Без замечаний' in p or ('без замечаний' in p.lower() and '**Тип:**' not in p):
            clean_files.append((fn, first_line))
        else:
            issue_files.append((fn, first_line, p))

    print(f'M3 Clean files: {len(clean_files)}')
    print(f'M3 Issue files: {len(issue_files)}')
    return clean_files, issue_files

if __name__ == '__main__':
    c1, i1 = analyze_m1()
    c2, i2 = analyze_m2()
    c3, i3 = analyze_m3()
    print(f'Total clean across M1-M3: {len(c1) + len(c2) + len(c3)}')
    print(f'Total issues across M1-M3: {len(i1) + len(i2) + len(i3)}')
    print(f'Total files: {len(c1) + len(c2) + len(c3) + len(i1) + len(i2) + len(i3)}')
