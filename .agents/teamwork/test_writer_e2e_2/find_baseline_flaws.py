import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

raw_issues = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))
premature_ids = [7, 11, 14, 19, 20, 21, 22, 23, 26, 27, 34, 37, 38, 40, 43, 46, 47, 48, 49, 50, 52, 53, 55, 57, 59, 60, 61, 62, 64, 67, 68, 69, 71, 72, 74, 75, 78, 80, 81, 82, 83, 84, 86, 87, 88, 90, 92, 95, 97, 99, 102, 103, 107]

print(f"Total premature issues: {len(premature_ids)}")

for pid in premature_ids:
    item = [x for x in raw_issues if x['id'] == pid][0]
    fpath = item['file_path']
    content = open(fpath, encoding='utf-8').read()
    
    # Extract blocks
    blocks = {}
    for m in re.finditer(r'```(\w+):(\w+)\r?\n([\s\S]*?)```', content):
        blocks[f"{m.group(1)}:{m.group(2)}"] = m.group(3)
        
    print(f"ID #{pid} | {item['milestone']} | {fpath}")
    print(f"  TITLE: {item['title'][:80]}")
    print(f"  BLOCKS: {list(blocks.keys())}")
    print(f"  LINES: {item['lines']}")
    print(f"  PROB : {item['problem'].strip()[:140]}")
    print(f"  FIX  : {item['fix'].strip()[:140]}")
    print("-" * 60)
