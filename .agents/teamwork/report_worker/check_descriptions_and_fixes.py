import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

from compile_complete_dataset import parse_m1
from compile_m2_test import parse_m2
from compile_m3_test import parse_m3

m1_res = parse_m1()
m2_res = parse_m2()
m3_res = parse_m3()

all_files = m1_res + m2_res + m3_res
print(f"Total unified items: {len(all_files)}")

# Check for any problem missing description or fix
issues_with_empty_fix = []
issues_with_empty_desc = []
for item in all_files:
    if not item['is_clean']:
        for p in item['problems']:
            if not p['problem']:
                issues_with_empty_desc.append((item['fname'], p))
            if not p['fix']:
                issues_with_empty_fix.append((item['fname'], p))

print(f"Problems with empty description: {len(issues_with_empty_desc)}")
print(f"Problems with empty fix: {len(issues_with_empty_fix)}")
if issues_with_empty_fix:
    for fn, p in issues_with_empty_fix:
        print("  Empty fix in:", fn, p['title'])
if issues_with_empty_desc:
    for fn, p in issues_with_empty_desc:
        print("  Empty desc in:", fn, p['title'])
