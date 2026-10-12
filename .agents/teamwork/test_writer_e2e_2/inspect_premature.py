import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))
rules = json.load(open('scripts/audit_fix_rules.json', encoding='utf-8'))

premature_ids = [7, 11, 14, 19, 20, 21, 22, 23, 26, 27, 34, 37, 38, 40, 43, 46, 47, 48, 49, 50, 52, 53, 55, 57, 59, 60, 61, 62, 64, 67, 68, 69, 71, 72, 74, 75, 78, 80, 81, 82, 83, 84, 86, 87, 88, 90, 92, 95, 97, 99, 102, 103, 107]

for pid in premature_ids[:10]:
    raw = [x for x in data if x['id'] == pid][0]
    r = [x for x in rules if x['id'] == pid][0]
    print(f"=== #{pid} {r['file_path']} ===")
    print("PROB:", raw['problem'].strip()[:200])
    print("FIX:", raw['fix'].strip()[:250])
    print("CURRENT RULE FLAWED:", r['flawed_patterns'])
    print("CURRENT RULE FIXED :", r['fixed_patterns'])
    print()
