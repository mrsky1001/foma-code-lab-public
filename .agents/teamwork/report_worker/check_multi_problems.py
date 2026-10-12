import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Let's inspect M2 issue items: does any file have multiple problems?
with open('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'r', encoding='utf-8') as f:
    m2_text = f.read()

m2_sections = re.split(r'###\s+\d+\.\s+', m2_text)[1:]
multi_problem_files_m2 = []
for s in m2_sections:
    fl = s.split('\n')[0]
    m = re.search(r'`([^`]+)`', fl)
    fn = m.group(1) if m else fl
    prob_headers = re.findall(r'- \*\*Проблема(?:\s+\d+)?:\s*(.*)\*\*', s)
    if len(prob_headers) > 1:
        multi_problem_files_m2.append((fn, prob_headers))

print("M2 multi problem files:")
for fn, ph in multi_problem_files_m2:
    print(f"  {fn}: {len(ph)} problems -> {ph}")

# Let's check M1: does any file have multiple problems?
with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'r', encoding='utf-8') as f:
    m1_text = f.read()

m1_sections = re.split(r'####\s+\d+\.\s+', m1_text)[1:]
# Cut off matrix
m1_sections[-1] = re.split(r'\n##\s+3\.\s+Сводная матрица', m1_sections[-1])[0]

multi_problem_files_m1 = []
for s in m1_sections:
    fl = s.split('\n')[0]
    m = re.search(r'`([^`]+)`', fl)
    fn = m.group(1) if m else fl
    types = re.findall(r'- \*\*Тип:\*\*', s)
    if len(types) > 1:
        multi_problem_files_m1.append((fn, len(types)))

print(f"M1 multi problem files: {multi_problem_files_m1}")

# Let's check M3: does any file have multiple problems?
with open('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'r', encoding='utf-8') as f:
    m3_text = f.read()

m3_parts = re.split(r'\n###\s+(?=[0-9a-zA-Z_-]+\.md)', m3_text)[1:]
multi_problem_files_m3 = []
for p in m3_parts:
    fl = p.split('\n')[0]
    fn = fl.split(' — ')[0].strip()
    types = re.findall(r'- \*\*Тип:\*\*', p)
    if len(types) > 1:
        multi_problem_files_m3.append((fn, len(types)))

print(f"M3 multi problem files: {multi_problem_files_m3}")
