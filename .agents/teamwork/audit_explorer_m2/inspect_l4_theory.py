import os

base_dir = r"d:\IEEU International East-European University\foma-code-lab\content\lessons\04-js-dom"
theory_files = [f for f in sorted(os.listdir(base_dir)) if f.startswith("00-theory-")]

for tf in theory_files:
    path = os.path.join(base_dir, tf)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    print("=" * 60)
    print(f"FILE: {tf}")
    print("=" * 60)
    lines = content.splitlines()
    print(f"Total lines: {len(lines)}")
    # Print task section and solution section
    in_task = False
    task_lines = []
    sol_lines = []
    in_sol = False
    for i, line in enumerate(lines, 1):
        if "## 🛠 Задание" in line or "## Задание" in line:
            in_task = True
        if in_task and line.startswith("```"):
            in_task = False
        if in_task:
            task_lines.append(f"{i}: {line}")
        if "solution" in line:
            in_sol = True
        elif in_sol and line.startswith("```"):
            in_sol = False
        elif in_sol:
            sol_lines.append(f"{i}: {line}")
    print("TASK:")
    print("\n".join(task_lines[:15]))
    print("SOLUTION:")
    print("\n".join(sol_lines[:20]))
