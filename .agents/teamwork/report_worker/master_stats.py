import os
import glob
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

from parse_m1_test import m1_items
from compile_m2_test import parse_m2
from compile_m3_test import parse_m3

# Load actual files
lessons_dir = 'content/lessons'
actual_files = sorted(glob.glob(f'{lessons_dir}/**/*.md', recursive=True))

file_info = {}
for af in actual_files:
    norm = os.path.normpath(af).replace('\\', '/')
    parts = norm.split('/')
    lesson = parts[2]
    fname = os.path.basename(af)
    file_info[fname] = {
        'lesson': lesson,
        'rel_path': norm,
        'fname': fname
    }

# Import M1 parser from compile_complete_dataset
from compile_complete_dataset import parse_m1

m1_res = parse_m1()
m2_res = parse_m2()
m3_res = parse_m3()

all_files = m1_res + m2_res + m3_res
print(f"Total unified files: {len(all_files)}")

# Check uniqueness of files
seen = set()
duplicates = []
for item in all_files:
    if item['fname'] in seen:
        duplicates.append(item['fname'])
    seen.add(item['fname'])
print(f"Duplicates: {duplicates}")

# Check missing actual files
missing_from_audit = [af for af in actual_files if os.path.basename(af) not in seen]
print(f"Missing from audit: {missing_from_audit}")

# Let's count by lesson
by_lesson = {}
for item in all_files:
    l = item['lesson']
    by_lesson.setdefault(l, []).append(item)

print("\nFiles by lesson in unified data:")
for l, items in sorted(by_lesson.items()):
    clean_c = sum(1 for x in items if x['is_clean'])
    issue_c = sum(1 for x in items if not x['is_clean'])
    prob_c = sum(len(x['problems']) for x in items)
    print(f"  {l}: total={len(items)}, clean={clean_c}, issues_files={issue_c}, problems={prob_c}")

# Let's count types and priorities across all problems
all_types = {}
all_prios = {}
lesson_stats = {}

for l, items in sorted(by_lesson.items()):
    l_types = {}
    l_prios = {}
    clean_c = sum(1 for x in items if x['is_clean'])
    issue_c = sum(1 for x in items if not x['is_clean'])
    for x in items:
        for p in x['problems']:
            t = p['type']
            prio = p['priority']
            all_types[t] = all_types.get(t, 0) + 1
            all_prios[prio] = all_prios.get(prio, 0) + 1
            l_types[t] = l_types.get(t, 0) + 1
            l_prios[prio] = l_prios.get(prio, 0) + 1
    lesson_stats[l] = {
        'total': len(items),
        'clean': clean_c,
        'issue_files': issue_c,
        'types': l_types,
        'prios': l_prios
    }

print("\n=== MASTER TOTAL TYPES ===")
for t, c in sorted(all_types.items()):
    print(f"  {t}: {c}")

print("\n=== MASTER TOTAL PRIORITIES ===")
for p, c in sorted(all_prios.items()):
    print(f"  {p}: {c}")
