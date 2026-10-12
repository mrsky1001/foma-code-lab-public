import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

for item in data:
    iid = item['id']
    fpath = item['file_path']
    fix = item['fix']
    prob = item['problem']
    
    print(f"[{iid:3d}] {fpath} | {item['type']} | {item['priority']}")
    # print first line of problem and first line of fix
    prob_line = prob.strip().splitlines()[0] if prob.strip() else ""
    fix_line = fix.strip().splitlines()[0] if fix.strip() else ""
    print(f"     PROB: {prob_line[:90]}")
    print(f"     FIX : {fix_line[:90]}")
