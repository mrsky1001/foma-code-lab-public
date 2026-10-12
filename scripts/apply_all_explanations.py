# -*- coding: utf-8 -*-
import json
import os
import sys

sys.path.insert(0, os.getcwd())

from scripts.generate_webinar_1 import webinar1_explanations
from scripts.generate_webinar_2 import webinar2_explanations
from scripts.generate_webinar_3 import webinar3_explanations
from scripts.generate_webinar_4 import webinar4_explanations
from scripts.generate_webinar_5 import webinar5_explanations
from scripts.generate_webinar_6 import webinar6_explanations
from scripts.generate_webinar_7 import webinar7_explanations
from scripts.generate_webinar_8 import webinar8_explanations
from scripts.generate_webinar_9 import webinar9_explanations
from scripts.generate_webinar_10 import webinar10_explanations

explanations_map = {
    1: webinar1_explanations,
    2: webinar2_explanations,
    3: webinar3_explanations,
    4: webinar4_explanations,
    5: webinar5_explanations,
    6: webinar6_explanations,
    7: webinar7_explanations,
    8: webinar8_explanations,
    9: webinar9_explanations,
    10: webinar10_explanations,
}

with open('scripts/all_quizzes.json', 'r', encoding='utf-8') as f:
    all_quizzes = json.load(f)

total_checked = 0
for w_id in range(1, 11):
    w_expls = explanations_map[w_id]
    w_qs = all_quizzes[str(w_id)]
    assert len(w_qs) == 25, f"Webinar {w_id} has {len(w_qs)} questions, expected 25"
    assert len(w_expls) == 25, f"Webinar {w_id} has {len(w_expls)} explanations, expected 25"
    for q in w_qs:
        qid = q['id']
        assert qid in w_expls, f"Missing explanation for Webinar {w_id} Q{qid}"
        expl = w_expls[qid]
        assert len(expl.strip()) > 30, f"Explanation too short for Webinar {w_id} Q{qid}"
        total_checked += 1

print(f"Validation passed: All {total_checked} questions across 10 webinars have valid detailed explanations.")

# Now write each TypeScript file
for w_id in range(1, 11):
    w_expls = explanations_map[w_id]
    w_qs = all_quizzes[str(w_id)]
    ts_file = f"src/data/quizzes/webinar-{w_id}.ts"
    
    lines = [
        'import type { QuizQuestion } from "../../types/quiz";',
        '',
        f'export const webinar{w_id}Questions: QuizQuestion[] = ['
    ]
    
    for q in w_qs:
        qid = q['id']
        topic = q['topic']
        question = q['question']
        options = q['options']
        correct_index = q['correctIndex']
        explanation = w_expls[qid]
        
        # Serialize fields cleanly to JSON to handle quotes and newlines
        topic_json = json.dumps(topic, ensure_ascii=False)
        question_json = json.dumps(question, ensure_ascii=False)
        options_json = json.dumps(options, ensure_ascii=False)
        explanation_json = json.dumps(explanation, ensure_ascii=False)
        
        entry = (
            f'  {{\n'
            f'    id: {qid},\n'
            f'    topic: {topic_json},\n'
            f'    question: {question_json},\n'
            f'    options: {options_json},\n'
            f'    correctIndex: {correct_index},\n'
            f'    explanation: {explanation_json},\n'
            f'  }},'
        )
        lines.append(entry)
    
    lines.append('];\n')
    
    with open(ts_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Updated {ts_file}")

print("All quiz files successfully updated with explanations!")
