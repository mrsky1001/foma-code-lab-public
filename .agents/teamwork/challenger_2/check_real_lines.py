import re
from pathlib import Path
from test_audit_report import run_tests

# Let's import all_issues from test_audit_report
with open(".agents/teamwork/challenger_2/test_audit_report.py", "r", encoding="utf-8") as f:
    code = f.read()

# Let's write a targeted script
with open("content/AUDIT_REPORT.md", "r", encoding="utf-8") as f:
    text = f.read()

BASE_DIR = Path(r"d:\IEEU International East-European University\foma-code-lab")
LESSONS_DIR = BASE_DIR / "content" / "lessons"

# Let's parse items properly per entry
entries = re.split(r'\n(?=### `)', text)[1:]
print(f"Total entries: {len(entries)}")

real_issues = []
for entry in entries:
    first_line = entry.strip().splitlines()[0]
    if "без замечаний" in first_line.lower() or "статус:** без замечаний" in entry.lower():
        continue
    
    # It's an issue entry
    # Check if multi-problem
    if "#### Проблема" in entry:
        probs = re.split(r'\n(?=#### Проблема \d+:)', entry)[1:]
        for p in probs:
            file_m = re.search(r'\*\*Файл:\*\*\s*`?content/lessons/([^`\n\r]+)`?', p)
            lines_m = re.search(r'\*\*Строки:\*\*\s*`?([^`\n\r]+)`?', p)
            real_issues.append({
                "file": file_m.group(1).strip() if file_m else None,
                "lines": lines_m.group(1).strip() if lines_m else None,
                "header": first_line,
                "prob_text": p[:150]
            })
    else:
        file_m = re.search(r'\*\*Файл:\*\*\s*`?content/lessons/([^`\n\r]+)`?', entry)
        lines_m = re.search(r'\*\*Строки:\*\*\s*`?([^`\n\r]+)`?', entry)
        real_issues.append({
            "file": file_m.group(1).strip() if file_m else None,
            "lines": lines_m.group(1).strip() if lines_m else None,
            "header": first_line,
            "prob_text": entry[:150]
        })

print(f"Parsed {len(real_issues)} real issues (expected 113)")

out_of_bounds = []
for iss in real_issues:
    f_rel = iss["file"]
    l_str = iss["lines"]
    if not f_rel:
        print(f"Issue missing file: {iss['header']}")
        continue
    disk_p = LESSONS_DIR / f_rel
    if not disk_p.exists():
        print(f"File not on disk: {disk_p}")
        continue
    with open(disk_p, "r", encoding="utf-8") as df:
        total_l = len(df.readlines())
    
    # check line nums
    nums = [int(n) for n in re.findall(r'\b\d+\b', l_str)]
    for n in nums:
        if n > total_l:
            out_of_bounds.append((f_rel, n, total_l, l_str, iss['header']))

print(f"\nReal issue line out of bounds check ({len(out_of_bounds)} detected):")
for item in out_of_bounds:
    print(f"  File: {item[0]} | Line {item[1]} > Total {item[2]} | Spec: '{item[3]}' | Header: {item[4]}")
