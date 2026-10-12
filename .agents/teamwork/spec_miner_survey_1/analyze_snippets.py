import json

with open(r"d:\IEEU International East-European University\foma-code-lab\.agents\teamwork\spec_miner_survey_1\parsed_60.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for item in data:
    has_code_in_prob = '```' in item['problem']
    has_code_in_fix = '```' in item['fix']
    has_bylo = 'было' in item['fix'].lower()
    has_stalo = 'стало' in item['fix'].lower()
    print(f"#{item['id']:02d}: lines={item['lines']} | code_in_prob={has_code_in_prob} | code_in_fix={has_code_in_fix} | bylo={has_bylo} | stalo={has_stalo}")
