import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import re

base_dir = r"d:\IEEU International East-European University\foma-code-lab\content\lessons\04-js-dom"
practice_files = [f for f in sorted(os.listdir(base_dir)) if not f.startswith("00-theory-") and f.endswith(".md")]

for pf in practice_files:
    path = os.path.join(base_dir, pf)
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    lines = text.splitlines()
    
    # Task
    task_m = re.search(r"## 🛠 Задание\r?\n(.*?)(?=\r?\n```|$)", text, re.DOTALL)
    task = task_m.group(1).strip() if task_m else "NO TASK"
    
    # Find start and solution blocks
    # Look for ```js:start ... ``` and ```js:solution ... ``` (or html / css)
    js_start = re.search(r"```([a-z]+):start\r?\n(.*?)```", text, re.DOTALL)
    js_sol = re.search(r"```([a-z]+):solution\r?\n(.*?)```", text, re.DOTALL)
    
    lang_start = js_start.group(1) if js_start else "none"
    lang_sol = js_sol.group(1) if js_sol else "none"
    
    body_start = js_start.group(2).strip() if js_start else ""
    body_sol = js_sol.group(2).strip() if js_sol else ""
    
    print("=" * 70)
    print(f"FILE: {pf} | Lang: {lang_start}->{lang_sol}")
    print("=" * 70)
    print("TASK:\n" + task)
    print("-" * 40)
    
    # Show diff lines
    lines_start = body_start.splitlines()
    lines_sol = body_sol.splitlines()
    print(f"Start lines: {len(lines_start)}, Sol lines: {len(lines_sol)}")
    # If small, print sol
    if len(lines_sol) < 40:
        print("SOLUTION BODY:\n" + body_sol)
    else:
        # print first 20 and last 20
        print("SOLUTION BODY (HEAD):\n" + "\n".join(lines_sol[:20]))
        print("...\nSOLUTION BODY (TAIL):\n" + "\n".join(lines_sol[-15:]))
