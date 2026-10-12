import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

def inspect_range(start_id, end_id):
    for item in data:
        if start_id <= item['id'] <= end_id:
            print(f"==================================================")
            print(f"ISSUE #{item['id']} ({item['milestone']}): {item['file_path']}")
            print(f"TITLE: {item['title']}")
            print(f"TYPE: {item['type']} | PRIO: {item['priority']} | LINES: {item['lines']}")
            print(f"--- PROBLEM ---")
            print(item['problem'].strip()[:300])
            print(f"--- FIX ---")
            print(item['fix'].strip()[:400])

if __name__ == '__main__':
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    inspect_range(start, end)
