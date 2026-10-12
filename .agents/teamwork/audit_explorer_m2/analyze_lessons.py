import os
import re

lessons = ["04-js-dom", "05-catalog", "06-forms"]
base_dir = r"d:\IEEU International East-European University\foma-code-lab\content\lessons"

def extract_sections(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Frontmatter
    fm = {}
    fm_match = re.search(r"^---\r?\n(.*?)\r?\n---", text, re.DOTALL)
    if fm_match:
        for line in fm_match.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                fm[k.strip()] = v.strip().strip('"\'')

    # Code blocks
    # Find all ```lang:type ... ```
    blocks = {}
    # Pattern to match ```tag\ncontent\n```
    pattern = r"```([a-zA-Z0-9_:-]*)\r?\n(.*?)```"
    matches = list(re.finditer(pattern, text, re.DOTALL))
    for m in matches:
        tag = m.group(1).strip()
        body = m.group(2)
        start_line = text[:m.start()].count('\n') + 1
        end_line = text[:m.end()].count('\n') + 1
        blocks[tag] = {
            'body': body,
            'start_line': start_line,
            'end_line': end_line
        }

    # Task section
    task_match = re.search(r"## 🛠 Задание\r?\n(.*?)(?=\r?\n```|$)", text, re.DOTALL)
    task_text = task_match.group(1).strip() if task_match else ""
    task_lines = (text[:task_match.start()].count('\n') + 1, text[:task_match.end()].count('\n') + 1) if task_match else (0, 0)

    return {
        'filepath': filepath,
        'fm': fm,
        'task': task_text,
        'task_lines': task_lines,
        'blocks': blocks,
        'raw_text': text
    }

if __name__ == '__main__':
    for lesson in lessons:
        ldir = os.path.join(base_dir, lesson)
        files = sorted([f for f in os.listdir(ldir) if f.endswith('.md')])
        print(f"=== {lesson} ({len(files)} files) ===")
        for f in files:
            data = extract_sections(os.path.join(ldir, f))
            block_keys = list(data['blocks'].keys())
            print(f"{f}: type={data['fm'].get('type')}, title={data['fm'].get('title')}, blocks={block_keys}")
