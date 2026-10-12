import difflib
import re
import os

def check_lesson_diffs(lesson_name):
    base_dir = os.path.join(r"d:\IEEU International East-European University\foma-code-lab\content\lessons", lesson_name)
    files = sorted([f for f in os.listdir(base_dir) if f.endswith('.md')])
    
    out_lines = []
    for f in files:
        path = os.path.join(base_dir, f)
        with open(path, 'r', encoding='utf-8') as fp:
            text = fp.read()
        
        # Extract task
        task_m = re.search(r"## 🛠 Задание\r?\n(.*?)(?=\r?\n```|$)", text, re.DOTALL)
        task = task_m.group(1).strip() if task_m else "NO TASK"
        
        # Find start block and solution block
        # Match all blocks
        blocks = re.findall(r"```([a-zA-Z0-9_:-]+)\r?\n(.*?)```", text, re.DOTALL)
        
        starts = {b[0]: b[1] for b in blocks if ":start" in b[0]}
        sols = {b[0]: b[1] for b in blocks if ":solution" in b[0]}
        
        out_lines.append(f"\n{'='*70}\nFILE: {f}\n{'='*70}\nTASK:\n{task}\n")
        
        for sol_tag, sol_code in sols.items():
            base_lang = sol_tag.split(':')[0]
            start_tag = f"{base_lang}:start"
            start_code = starts.get(start_tag, "")
            
            diff = list(difflib.unified_diff(
                start_code.splitlines(),
                sol_code.splitlines(),
                fromfile=start_tag,
                tofile=sol_tag,
                lineterm=""
            ))
            out_lines.append(f"DIFF FOR {sol_tag} (vs {start_tag}):")
            if diff:
                out_lines.append("\n".join(diff[:60]))
                if len(diff) > 60:
                    out_lines.append(f"... (truncated, total diff lines: {len(diff)})")
            else:
                out_lines.append("NO DIFF FOUND (Identical!)")
    
    with open(f".agents/teamwork/audit_explorer_m2/{lesson_name}_diffs.txt", "w", encoding="utf-8") as out:
        out.write("\n".join(out_lines))
    print(f"Done {lesson_name}")

if __name__ == "__main__":
    check_lesson_diffs("04-js-dom")
    check_lesson_diffs("05-catalog")
    check_lesson_diffs("06-forms")
