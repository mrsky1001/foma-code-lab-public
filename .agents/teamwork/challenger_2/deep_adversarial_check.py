import re
from pathlib import Path

BASE_DIR = Path(r"d:\IEEU International East-European University\foma-code-lab")
REPORT_PATH = BASE_DIR / "content" / "AUDIT_REPORT.md"
LESSONS_DIR = BASE_DIR / "content" / "lessons"

with open(REPORT_PATH, "r", encoding="utf-8") as f:
    text = f.read()

# Let's inspect 07-slider/02-slider-css-container.md
target_f = LESSONS_DIR / "07-slider" / "02-slider-css-container.md"
if target_f.exists():
    with open(target_f, "r", encoding="utf-8") as f:
        file_lines = f.readlines()
    print(f"07-slider/02-slider-css-container.md has {len(file_lines)} lines.")
else:
    print("07-slider/02-slider-css-container.md DOES NOT EXIST!")

# Let's check all line ranges in AUDIT_REPORT.md against disk files!
items = re.findall(r'(\*\*Файл:\*\*\s*`?content/lessons/([^`\n]+)`?[\s\S]*?\*\*Строки:\*\*\s*`?([^`\n]+)`?)', text)
print(f"Total issue file-line pairs found: {len(items)}")

out_of_bounds = []
for full_block, rel_path, lines_spec in items:
    disk_path = BASE_DIR / "content" / "lessons" / rel_path.strip()
    if not disk_path.exists():
        out_of_bounds.append((rel_path, "FILE_NOT_FOUND", lines_spec))
        continue
    with open(disk_path, "r", encoding="utf-8") as df:
        num_lines = len(df.readlines())
    
    # parse numbers from lines_spec
    line_nums = [int(n) for n in re.findall(r'\b\d+\b', lines_spec)]
    for n in line_nums:
        if n > num_lines:
            out_of_bounds.append((rel_path, f"Line {n} > total lines {num_lines}", lines_spec))

print(f"\nLine out of bounds check ({len(out_of_bounds)} issues):")
for item in out_of_bounds:
    print(f"  {item}")
