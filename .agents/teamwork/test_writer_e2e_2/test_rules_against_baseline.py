import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

rules = json.load(open('scripts/audit_fix_rules.json', encoding='utf-8'))

passed = []
failed = []

for r in rules:
    fpath = r['file_path']
    if not os.path.exists(fpath):
        failed.append((r['id'], f"File not found: {fpath}"))
        continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check frontmatter if specified
    fm_match = re.match(r'^---\r?\n([\s\S]*?)\r?\n---', content)
    fm_text = fm_match.group(1) if fm_match else ""
    
    fm_ok = True
    if r['frontmatter_expected']:
        for k, v in r['frontmatter_expected'].items():
            if not re.search(rf'^{k}:\s*{re.escape(v)}', fm_text, re.MULTILINE):
                fm_ok = False
                break
    
    # Check flawed patterns (all should be absent for pass)
    flawed_present = False
    for p in r['flawed_patterns']:
        if p in content:
            flawed_present = True
            break
            
    # Check fixed patterns (at least one or all should be present for pass)
    # If fixed patterns are defined, we check if at least one (or all) are present
    fixed_present = True
    if r['fixed_patterns']:
        # Let's see: for fixed_patterns, any present or all?
        # Typically, if an issue has alternatives like [A, B], any can match.
        # But let's check whether ANY is in baseline right now!
        any_in_baseline = any(p in content for p in r['fixed_patterns'])
        if not any_in_baseline:
            fixed_present = False

    # Issue is APPLIED (PASS) if fm_ok AND not flawed_present AND fixed_present
    is_applied = fm_ok and (not flawed_present) and fixed_present
    if is_applied:
        passed.append(r['id'])
    else:
        reason = []
        if not fm_ok: reason.append("frontmatter mismatch")
        if flawed_present: reason.append("flawed pattern present")
        if not fixed_present: reason.append("fixed pattern missing")
        failed.append((r['id'], ", ".join(reason)))

print(f"Results against baseline:")
print(f"Total rules: {len(rules)}")
print(f"Passed (Applied): {len(passed)}")
print(f"Failed (Not applied): {len(failed)}")
if passed:
    print(f"Prematurely passing IDs: {passed}")
