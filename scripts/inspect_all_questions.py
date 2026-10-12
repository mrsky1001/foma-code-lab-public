import json

with open('scripts/all_quizzes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('scripts/questions_utf8.txt', 'w', encoding='utf-8') as out:
    for w_id in range(1, 11):
        out.write(f"=== WEBINAR {w_id} ===\n")
        for q in data[str(w_id)]:
            out.write(f"Q{q['id']} [{q['topic']}]: {q['question']}\n")
            out.write(f"   CORRECT: {q['options'][0]}\n")
            wrong = "; ".join(q['options'][1:])
            out.write(f"   WRONG: {wrong}\n")
print("Done writing questions_utf8.txt")
