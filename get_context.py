import json

def get_context(file_path, search_str):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if search_str in content:
        return search_str
    return "NOT FOUND"

fixes = json.load(open('temp_fixes.json', encoding='utf-8'))
for fix in fixes:
    print(f"ID {fix['id']} in {fix['file_path']}")
