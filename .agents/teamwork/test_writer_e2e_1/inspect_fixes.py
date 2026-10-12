import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8') as f:
    issues = json.load(f)

# Let's inspect how many issues have "// Было:" in fix
bylo_count = 0
code_fence_count = 0
for iss in issues:
    fix = iss['fix']
    if '// Было' in fix or 'Было:' in fix or '<!-- Было' in fix or '/* Было' in fix:
        bylo_count += 1
    if '```' in fix:
        code_fence_count += 1

print(f"Total issues: {len(issues)}")
print(f"Issues with explicit 'Было': {bylo_count}")
print(f"Issues with code fences in fix: {code_fence_count}")
