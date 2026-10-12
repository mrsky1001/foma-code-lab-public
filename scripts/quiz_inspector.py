import re
import json
import glob
import os

def parse_quiz_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Match each object { id: ..., ... }
    # Find all { id: ... } lines
    lines = text.splitlines()
    questions = []
    for line in lines:
        line_clean = line.strip()
        if not line_clean.startswith('{') or 'id:' not in line_clean:
            continue
        
        # Extract id
        id_m = re.search(r'id:\s*(\d+)', line_clean)
        topic_m = re.search(r'topic:\s*"([^"]+)"', line_clean)
        q_m = re.search(r'question:\s*"([^"]+)"', line_clean)
        # options: ["...", "..."]
        opts_m = re.search(r'options:\s*(\[.*?\])\s*,\s*correctIndex', line_clean)
        correct_m = re.search(r'correctIndex:\s*(\d+)', line_clean)
        
        if id_m and topic_m and q_m and opts_m and correct_m:
            try:
                opts = json.loads(opts_m.group(1))
            except Exception as e:
                # If json.loads fails due to single quotes or escaping
                opts_raw = opts_m.group(1)
                opts = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', opts_raw)
            
            questions.append({
                'id': int(id_m.group(1)),
                'topic': topic_m.group(1),
                'question': q_m.group(1),
                'options': opts,
                'correctIndex': int(correct_m.group(1)),
                'raw_line': line_clean
            })
    return questions

for i in range(1, 11):
    path = f'src/data/quizzes/webinar-{i}.ts'
    qs = parse_quiz_file(path)
    print(f'Webinar {i}: parsed {len(qs)} questions')
    if len(qs) != 25:
        print(f'WARNING: Webinar {i} parsed count is {len(qs)}')
