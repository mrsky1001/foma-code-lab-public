import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 1. Get actual files by lesson
lessons_dir = 'content/lessons'
actual_files = sorted(glob.glob(f'{lessons_dir}/**/*.md', recursive=True))

file_to_lesson = {}
lesson_files = {}
for af in actual_files:
    norm = os.path.normpath(af).replace('\\', '/')
    parts = norm.split('/')
    lesson = parts[2]
    fname = os.path.basename(af)
    file_to_lesson[fname] = (lesson, norm)
    lesson_files.setdefault(lesson, []).append(fname)

print(f"Total actual lesson files: {len(actual_files)}")
for l, fs in sorted(lesson_files.items()):
    print(f"  {l}: {len(fs)} files")

# 2. Inspect M1
with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'r', encoding='utf-8') as f:
    m1_text = f.read()

# 3. Inspect M2
with open('.agents/teamwork/audit_explorer_m2/audit_findings.md', 'r', encoding='utf-8') as f:
    m2_text = f.read()

# 4. Inspect M3
with open('.agents/teamwork/audit_explorer_m3/audit_findings.md', 'r', encoding='utf-8') as f:
    m3_text = f.read()

print("Files read successfully.")
