import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/spec_miner_survey_1/parsed_60_with_snippets.json', encoding='utf-8') as f:
    data = json.load(f)

print(f"spec_miner_survey_1 items count: {len(data)}")
for x in data[:5]:
    print(f"{x['id']}: {x['lesson_folder']} {x['file_path']} - {x['title'][:50]}")
print("...")
for x in data[-5:]:
    print(f"{x['id']}: {x['lesson_folder']} {x['file_path']} - {x['title'][:50]}")
