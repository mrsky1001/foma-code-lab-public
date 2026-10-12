import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))
rules = json.load(open('scripts/audit_fix_rules.json', encoding='utf-8'))

premature_ids = [5, 23, 30, 36, 38, 39, 55, 62, 63, 64, 65, 67, 70, 83, 93, 94, 95, 96, 97, 99, 103, 104, 105, 106]

for pid in premature_ids:
    raw = [x for x in data if x['id'] == pid][0]
    r = [x for x in rules if x['id'] == pid][0]
    print(f"=== #{pid} {r['file_path']} ===")
    print("PROB:", raw['problem'].strip()[:140])
    print("FIX :", raw['fix'].strip()[:140])
    print("RULE CHECKS:", r['checks'])
    print()
