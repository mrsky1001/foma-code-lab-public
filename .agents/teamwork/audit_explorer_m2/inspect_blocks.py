import os
import re

lessons = ["04-js-dom", "05-catalog", "06-forms"]
base_dir = r"d:\IEEU International East-European University\foma-code-lab\content\lessons"

for lesson in lessons:
    lesson_dir = os.path.join(base_dir, lesson)
    files = sorted([f for f in os.listdir(lesson_dir) if f.endswith(".md")])
    print(f"=== {lesson}: {len(files)} files ===")
    for f in files:
        filepath = os.path.join(lesson_dir, f)
        with open(filepath, "r", encoding="utf-8") as fp:
            content = fp.read()
        
        # Check frontmatter
        fm_match = re.search(r"^---\n(.*?)\n---", content, re.DOTALL)
        fm = fm_match.group(1) if fm_match else "NO_FM"
        
        # Check code blocks
        blocks = re.findall(r"^```([a-zA-Z0-9_:-]*)", content, re.MULTILINE)
        
        # Check task header
        has_task = "## 🛠 Задание" in content or "## Задание" in content
        
        # Check if solution block exists
        has_solution = any("solution" in b for b in blocks)
        
        print(f"  {f}: blocks={blocks}, has_task={has_task}, has_solution={has_solution}")
