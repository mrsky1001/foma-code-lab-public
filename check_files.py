import json, os
with open('temp_fixes.json', 'r', encoding='utf-8') as f:
    fixes = json.load(f)
for item in fixes:
    path = item['file_path']
    if os.path.exists(path):
        print(f'Found {item["id"]} - {path}')
    else:
        print(f'Missing {item["id"]} - {path}')
