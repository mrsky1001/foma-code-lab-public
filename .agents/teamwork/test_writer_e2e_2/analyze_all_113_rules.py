import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

# Let's inspect problem descriptions and fix descriptions
for item in data:
    qid = item['id']
    fpath = item['file_path']
    fix = item['fix']
    prob = item['problem']
    
    # Check if there are snippets in fix
    # Patterns like `Было ... Стало ...`
    # Or code fences
    # Or specific keywords
    pass

print("Loaded 113 items.")
