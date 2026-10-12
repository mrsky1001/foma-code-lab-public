import re
import os

AUDIT_PATH = r"d:\IEEU International East-European University\foma-code-lab\content\AUDIT_REPORT.md"

with open(AUDIT_PATH, "r", encoding="utf-8") as f:
    text = f.read()

# Split into lines
lines = text.split("\n")

# Let's find all sections
current_lesson = None
issues = []

# Regex for lesson header: ## Урок 01 — Введение (11 файлов)
lesson_re = re.compile(r"^##\s+(Урок\s+\d+[^(\n]+)")
# Regex for item header: ### `filename.md` — Title or ### `filename.md` — без замечаний
item_re = re.compile(r"^###\s+`([^`]+)`\s+—\s+(.*)")

current_item = None
current_issue = None

i = 0
while i < len(lines):
    line = lines[i]
    m_les = lesson_re.match(line)
    if m_les:
        current_lesson = m_les.group(1).strip()
        i += 1
        continue
    
    m_item = item_re.match(line)
    if m_item:
        filename = m_item.group(1).strip()
        title = m_item.group(2).strip()
        
        # Collect lines for this item until next header (### or ## or EOF)
        item_lines = [line]
        i += 1
        while i < len(lines) and not lines[i].startswith("### ") and not lines[i].startswith("## "):
            item_lines.append(lines[i])
            i += 1
        
        item_text = "\n".join(item_lines)
        is_clean = "без замечаний" in title.lower() or "**Статус:** Без замечаний" in item_text
        
        # Check if there are issues
        # Notice that in some files, there might be multiple issues or single issue
        # Let's see how many have **Проблема:**
        problema_count = len(re.findall(r"\*\*Проблема:\*\*", item_text))
        
        issues.append({
            "lesson": current_lesson,
            "filename": filename,
            "title": title,
            "is_clean": is_clean,
            "problema_count": problema_count,
            "item_text": item_text
        })
        continue
    
    i += 1

print(f"Total files parsed: {len(issues)}")
clean_count = sum(1 for x in issues if x["is_clean"])
problem_files = [x for x in issues if not x["is_clean"]]
print(f"Clean files: {clean_count}")
print(f"Problem files: {len(problem_files)}")
print(f"Total problema blocks: {sum(x['problema_count'] for x in problem_files)}")

for idx, p in enumerate(problem_files[:10]):
    print(f"{idx+1}. [{p['lesson']}] {p['filename']} — {p['title']} (problemas: {p['problema_count']})")
