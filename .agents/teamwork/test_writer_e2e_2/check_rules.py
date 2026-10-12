import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

print("Total issues:", len(data))
# Check what each issue has
for item in data[:10]:
    print(f"ID {item['id']}: {item['file_path']}")
    print(f"  Title: {item['title']}")
    print(f"  Type: {item['type']}, Prio: {item['priority']}")
    # extract code blocks from problem and fix
    prob_codes = re.findall(r'```(?:\w+)?\r?\n([\s\S]*?)```', item['problem'])
    fix_codes = re.findall(r'```(?:\w+)?\r?\n([\s\S]*?)```', item['fix'])
    print(f"  Problem code blocks: {len(prob_codes)}, Fix code blocks: {len(fix_codes)}")
    if fix_codes:
        print(f"  Fix sample:\n{fix_codes[0][:150]}")
    else:
        print(f"  Fix text:\n{item['fix'][:150]}")
    print("-" * 50)
