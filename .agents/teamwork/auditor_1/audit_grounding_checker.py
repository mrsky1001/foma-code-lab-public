import pathlib
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

report_path = pathlib.Path('content/AUDIT_REPORT.md')
report_text = report_path.read_text(encoding='utf-8')

# Extract all 113 issue blocks
# Each issue block starts with either:
# ### `filename` — ... OR within a multi-issue entry: #### Проблема 1 / 2 ...
# Or simply split by **Тип:**

lines = report_text.splitlines()

# Let's locate each occurrence of **Тип:** and extract its context
issue_indices = [i for i, line in enumerate(lines) if line.strip().startswith('**Тип:**')]
print(f"Total **Тип:** found in lines: {len(issue_indices)}")

# Preamble issues (first 7 in Known issues)
# Known issues section is before line 104
known_issue_indices = [i for i in issue_indices if i < 104]
lesson_issue_indices = [i for i in issue_indices if i >= 104]

print(f"Known issues indices count: {len(known_issue_indices)}")
print(f"Lesson issues indices count: {len(lesson_issue_indices)}")

# Now for each lesson issue, extract:
# Header, Type, Priority, File, Lines, Problem, Fix
parsed_issues = []

for idx_in_lines in lesson_issue_indices:
    # Scan upwards for file or header
    header = None
    file_path = None
    
    # Search backwards for ### or ####
    for back_idx in range(idx_in_lines - 1, max(0, idx_in_lines - 30), -1):
        line = lines[back_idx].strip()
        if line.startswith('### ') or line.startswith('#### '):
            header = line
            break

    # Scan downwards for priority, file, lines, problem, fix
    block_lines = lines[idx_in_lines:min(len(lines), idx_in_lines + 80)]
    block_text = "\n".join(block_lines)
    # Stop before next **Тип:** or next ###
    next_delim = re.search(r'\n(\*\*Тип:\*\*|### |## )', block_text[1:])
    if next_delim:
        block_text = block_text[:next_delim.start() + 1]

    m_tag = re.search(r'\*\*Тип:\*\*\s*(.+)', block_text)
    m_prio = re.search(r'\*\*Приоритет:\*\*\s*(.+)', block_text)
    m_file = re.search(r'\*\*Файл:\*\*\s*[`"]?([^`"\r\n]+)[`"]?', block_text)
    m_lines = re.search(r'\*\*Строки:\*\*\s*[`"]?([^`"\r\n]+)[`"]?', block_text)
    m_prob = re.search(r'\*\*Проблема:\*\*\s*(.+?)(?=\n\*\*Правка:\*\*|\Z)', block_text, re.DOTALL)
    m_fix = re.search(r'\*\*Правка:\*\*\s*(.+)', block_text, re.DOTALL)

    # If file was not in block, look upwards for **Файл:**
    if not m_file:
        for back_idx in range(idx_in_lines - 1, max(0, idx_in_lines - 15), -1):
            mf = re.search(r'\*\*Файл:\*\*\s*[`"]?([^`"\r\n]+)[`"]?', lines[back_idx])
            if mf:
                m_file = mf
                break

    parsed_issues.append({
        'line_num_in_report': idx_in_lines + 1,
        'header': header,
        'tag': m_tag.group(1).strip() if m_tag else 'MISSING',
        'prio': m_prio.group(1).strip() if m_prio else 'MISSING',
        'file': m_file.group(1).strip() if m_file else 'MISSING',
        'lines': m_lines.group(1).strip() if m_lines else 'MISSING',
        'problem': m_prob.group(1).strip() if m_prob else 'MISSING',
        'fix': m_fix.group(1).strip() if m_fix else 'MISSING',
    })

print(f"Successfully extracted {len(parsed_issues)} lesson issues.")

# Check files on disk and line numbers
missing_files_on_disk = []
line_bounds_discrepancies = []

for iss in parsed_issues:
    f_path = iss['file'].strip('`" ')
    # Normalize path
    target = pathlib.Path(f_path)
    if not target.exists():
        missing_files_on_disk.append((iss, f_path))
        continue
    
    file_content = target.read_text(encoding='utf-8')
    total_file_lines = len(file_content.splitlines())
    
    # Extract line numbers from iss['lines']
    # e.g. "10-75", "10–75", "45", "14–16, 55", "80-87", "весь файл", "15-17, 57 строк diff"
    nums = re.findall(r'\b\d+\b', iss['lines'])
    if nums:
        line_ints = [int(n) for n in nums]
        max_line = max(line_ints)
        min_line = min(line_ints)
        if max_line > total_file_lines + 5: # allow small margin if diff or formatting
            line_bounds_discrepancies.append((iss, f_path, max_line, total_file_lines))

print(f"\nMissing files on disk: {len(missing_files_on_disk)}")
if missing_files_on_disk:
    for iss, fp in missing_files_on_disk:
        print(f"  Report line {iss['line_num_in_report']}: file '{fp}' DOES NOT EXIST!")

print(f"Line bounds discrepancies (> file line count + 5): {len(line_bounds_discrepancies)}")
if line_bounds_discrepancies:
    for iss, fp, ml, tl in line_bounds_discrepancies:
        print(f"  Report line {iss['line_num_in_report']}: {fp} referenced line {ml}, but file has only {tl} lines! Header: {iss['header']}")
