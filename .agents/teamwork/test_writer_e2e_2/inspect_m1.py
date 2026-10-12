import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/spec_miner_survey_1/parsed_60_with_snippets.json', encoding='utf-8'))

for x in data[:34]:
    print(f"=== #{x['id']} {x['file_path']} ===")
    print("PROB:", x['problem'][:150])
    print("FIX:", x['fix'][:200])
    print()
