import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))
ids = [5, 25, 33, 52, 60, 61]
for x in data:
    if x['id'] in ids:
        print(f"=== Issue #{x['id']} ({x['file_path']}) ===")
        print("Lines:", x['lines'])
        print("Problem:", x['problem'][:200])
        print("Fix:", x['fix'][:300])
        print()
