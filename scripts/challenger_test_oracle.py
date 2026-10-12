"""
Challenger Test Oracle for foma-code-lab Pedagogical Course Audit
Verifies content/AUDIT_REPORT.md against all 231 physical files in content/lessons/**.
"""

import os
import sys
import glob
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

REPORT_PATH = 'content/AUDIT_REPORT.md'
LESSONS_DIR = 'content/lessons'

VALID_TAGS = {"[ОШИБКА]", "[ПЛАВНОСТЬ]", "[ЗАДАНИЕ]", "[ПОДАЧА]", "[ПРОБЕЛ]", "[ДУБЛИРОВАНИЕ]"}
VALID_PRIORITIES = {"Критический", "Высокий", "Средний", "Низкий"}

EXPECTED_LESSONS = [
    ("01-intro", "Урок 01", 11),
    ("02-markup", "Урок 02", 33),
    ("03-flexbox", "Урок 03", 28),
    ("04-js-dom", "Урок 04", 31),
    ("05-catalog", "Урок 05", 28),
    ("06-forms", "Урок 06", 27),
    ("07-slider", "Урок 07", 24),
    ("08-search", "Урок 08", 31),
    ("09-final", "Урок 09", 13),
    ("10-troubleshooting", "Урок 10", 5),
]

class TestResult:
    def __init__(self, name):
        self.name = name
        self.passed = True
        self.failures = []
        self.warnings = []

    def fail(self, msg):
        self.passed = False
        self.failures.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)

def parse_line_numbers(line_str):
    """
    Parses strings like:
    '28–29'
    '55–60, 66, 92'
    '112, 132–133'
    '80-87'
    '45'
    Returns list of integers or (start, end) tuples.
    """
    cleaned = line_str.replace('`', '').replace('строки', '').replace('строка', '').strip()
    # Replace en-dash, em-dash with hyphen
    cleaned = cleaned.replace('–', '-').replace('—', '-')
    
    numbers = []
    # split by comma
    parts = [p.strip() for p in cleaned.split(',') if p.strip()]
    for part in parts:
        if '-' in part:
            sub = part.split('-')
            try:
                start = int(sub[0].strip())
                end = int(sub[1].strip())
                numbers.append((start, end))
            except ValueError:
                pass
        else:
            try:
                num = int(part.strip())
                numbers.append((num, num))
            except ValueError:
                pass
    return numbers

def main():
    results = []
    print("=" * 70)
    print("STARTING ADVERSARIAL CHALLENGER VERIFICATION ORACLE")
    print("=" * 70)

    # -------------------------------------------------------------
    # TEST 1: Physical File Inventory & Count
    # -------------------------------------------------------------
    t1 = TestResult("TEST 1: Physical File Inventory & Distribution")
    physical_files = sorted(glob.glob(f"{LESSONS_DIR}/**/*.md", recursive=True))
    if len(physical_files) != 231:
        t1.fail(f"Physical file count mismatch: found {len(physical_files)}, expected 231")
    
    physical_meta = {}
    dir_counts = defaultdict(int)
    for pf in physical_files:
        norm = pf.replace('\\', '/')
        parts = norm.split('/')
        # parts: content, lessons, <dir>, <file>
        ldir = parts[2]
        fname = parts[3]
        dir_counts[ldir] += 1
        
        try:
            with open(pf, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            if len(lines) == 0:
                t1.fail(f"File is empty: {norm}")
            physical_meta[fname] = {
                'path': norm,
                'lesson_dir': ldir,
                'line_count': len(lines),
                'lines': lines
            }
        except Exception as e:
            t1.fail(f"Error reading {norm}: {e}")

    for ldir, _, exp_count in EXPECTED_LESSONS:
        actual = dir_counts[ldir]
        if actual != exp_count:
            t1.fail(f"Lesson dir '{ldir}': expected {exp_count} files, got {actual}")

    results.append(t1)

    # -------------------------------------------------------------
    # Read AUDIT_REPORT.md
    # -------------------------------------------------------------
    if not os.path.exists(REPORT_PATH):
        print(f"FATAL: {REPORT_PATH} does not exist!")
        sys.exit(1)

    with open(REPORT_PATH, 'r', encoding='utf-8') as f:
        report_text = f.read()
    report_lines = report_text.splitlines()

    # -------------------------------------------------------------
    # TEST 2: Formatting, Balanced Code Fences & Duplicate Headers
    # -------------------------------------------------------------
    t2 = TestResult("TEST 2: AUDIT_REPORT Formatting & Headers Structure")
    code_fences = len(re.findall(r'```', report_text))
    if code_fences % 2 != 0:
        t2.fail(f"Unclosed code fence detected! Total count: {code_fences}")
    
    # Check for duplicate lesson headers
    all_h2 = [l.strip() for l in report_lines if l.startswith('## ')]
    all_h3 = [l.strip() for l in report_lines if l.startswith('### ')]

    # Check for anomaly headers
    for h in all_h3:
        if re.search(r'Урок\s+\d+:', h):
            t2.warn(f"Formatting artifact found in H3: '{h}'")
    
    # Count how many ## headers for each lesson
    lesson_h2_counts = defaultdict(list)
    for i, line in enumerate(report_lines, 1):
        m = re.match(r'^##\s+(Урок\s+\d+.*)', line)
        if m:
            prefix = line[:12] # e.g. ## Урок 05
            lesson_h2_counts[prefix].append((i, line))

    for prefix, entries in lesson_h2_counts.items():
        if len(entries) > 1:
            t2.warn(f"Duplicate H2 header for '{prefix}': {entries}")

    results.append(t2)

    # -------------------------------------------------------------
    # TEST 3: File Coverage & Name Matching
    # -------------------------------------------------------------
    t3 = TestResult("TEST 3: File Coverage (100% of 231 files)")
    # Extract all ### `filename` headers
    file_section_pattern = re.compile(r'^###\s+`([^`]+)`(.*)$', re.MULTILINE)
    file_sections = file_section_pattern.findall(report_text)
    
    found_fnames = [fs[0] for fs in file_sections]
    fname_counts = Counter(found_fnames)
    
    for fname, count in fname_counts.items():
        if count > 1:
            t3.fail(f"Duplicate entry for file `{fname}` (appears {count} times)")

    missing = set(physical_meta.keys()) - set(found_fnames)
    extra = set(found_fnames) - set(physical_meta.keys())

    if missing:
        t3.fail(f"Missing {len(missing)} files: {sorted(missing)}")
    if extra:
        t3.fail(f"Found {len(extra)} unknown extra files: {sorted(extra)}")
    if len(found_fnames) != 231:
        t3.fail(f"Expected 231 file entries, got {len(found_fnames)}")

    results.append(t3)

    # -------------------------------------------------------------
    # Split report by lesson to verify lesson ownership
    # -------------------------------------------------------------
    t4 = TestResult("TEST 4: Lesson Ownership & Hierarchy Placement")
    
    # Let's parse the document into lesson chunks
    # We find where each lesson section starts
    lesson_positions = []
    for ldir, ltitle, _ in EXPECTED_LESSONS:
        # search for ## Урок XX
        pattern = rf'##\s+{re.escape(ltitle)}'
        matches = [m.start() for m in re.finditer(pattern, report_text)]
        if not matches:
            t4.fail(f"Lesson section '{ltitle}' not found in report!")
        else:
            lesson_positions.append((matches[0], ldir, ltitle))

    lesson_positions.sort()
    lesson_chunks = {}
    for idx in range(len(lesson_positions)):
        start_pos, ldir, ltitle = lesson_positions[idx]
        end_pos = lesson_positions[idx + 1][0] if idx + 1 < len(lesson_positions) else len(report_text)
        chunk = report_text[start_pos:end_pos]
        lesson_chunks[ldir] = chunk

    # For each physical file, check it is located within its lesson chunk
    for fname, meta in physical_meta.items():
        expected_dir = meta['lesson_dir']
        target_chunk = lesson_chunks.get(expected_dir, '')
        file_header = f"### `{fname}`"
        if file_header not in target_chunk:
            t4.fail(f"File `{fname}` ({expected_dir}) is NOT inside section for {expected_dir}!")

    results.append(t4)

    # -------------------------------------------------------------
    # TEST 5: Schema & Field Validation per Section
    # -------------------------------------------------------------
    t5 = TestResult("TEST 5: Schema, Fields & Non-Empty Descriptions")
    
    # Let's split report into file blocks
    # Each file block starts with ### `filename`
    raw_blocks = re.split(r'\n###\s+`', report_text)
    # The first element is the header before first file
    file_blocks = {}
    for rb in raw_blocks[1:]:
        # first token until backtick
        end_idx = rb.find('`')
        if end_idx == -1:
            continue
        fname = rb[:end_idx]
        block_body = rb[end_idx+1:]
        file_blocks[fname] = block_body

    parsed_stats = {
        'total_files': len(file_blocks),
        'clean_files': 0,
        'issue_files': 0,
        'total_problems': 0,
        'tags': Counter(),
        'priorities': Counter(),
        'by_lesson': defaultdict(lambda: {
            'clean': 0,
            'issue': 0,
            'problems': 0,
            'tags': Counter(),
            'priorities': Counter()
        })
    }

    parsed_issues = []

    for fname, body in file_blocks.items():
        if fname not in physical_meta:
            continue
        ldir = physical_meta[fname]['lesson_dir']
        
        # Check **Файл:**
        file_match = re.search(r'\*\*Файл:\*\*\s*`?([^`\n]+)`?', body)
        if not file_match:
            t5.fail(f"File `{fname}` missing **Файл:** field")
        else:
            file_path = file_match.group(1).strip()
            expected_path = physical_meta[fname]['path']
            if not file_path.endswith(fname):
                t5.fail(f"File `{fname}` path mismatch: got '{file_path}', expected '{expected_path}'")

        is_clean = ("без замечаний" in body.splitlines()[0].lower()) or ("**Статус:** Без замечаний" in body)
        
        if is_clean:
            parsed_stats['clean_files'] += 1
            parsed_stats['by_lesson'][ldir]['clean'] += 1
            if "**Примечание:**" not in body and "Примечание" not in body:
                t5.warn(f"Clean file `{fname}` missing note/comment")
        else:
            parsed_stats['issue_files'] += 1
            parsed_stats['by_lesson'][ldir]['issue'] += 1
            
            # Check for multiple problems inside one file block (like in lesson 04)
            # Find all problem headers or Type fields
            type_matches = list(re.finditer(r'\*\*Тип:\*\*\s*([^\n]+)', body))
            prio_matches = list(re.finditer(r'\*\*Приоритет:\*\*\s*([^\n]+)', body))
            line_matches = list(re.finditer(r'\*\*Строки:\*\*\s*([^\n]+)', body))
            prob_matches = list(re.finditer(r'\*\*Проблема:\*\*\s*([^\n]+)', body))
            fix_matches = list(re.finditer(r'\*\*Правка:\*\*', body))

            if not type_matches:
                t5.fail(f"Issue file `{fname}` missing **Тип:**")
            if not prio_matches:
                t5.fail(f"Issue file `{fname}` missing **Приоритет:**")
            if not line_matches:
                t5.fail(f"Issue file `{fname}` missing **Строки:**")
            if not prob_matches:
                t5.fail(f"Issue file `{fname}` missing **Проблема:**")
            if not fix_matches:
                t5.fail(f"Issue file `{fname}` missing **Правка:**")

            prob_count = len(type_matches)
            parsed_stats['total_problems'] += prob_count
            parsed_stats['by_lesson'][ldir]['problems'] += prob_count

            for i in range(prob_count):
                raw_type = type_matches[i].group(1).strip() if i < len(type_matches) else ""
                raw_prio = prio_matches[i].group(1).strip() if i < len(prio_matches) else ""
                raw_lines = line_matches[i].group(1).strip() if i < len(line_matches) else ""
                raw_prob = prob_matches[i].group(1).strip() if i < len(prob_matches) else ""

                # Validate tags
                extracted_tags = re.findall(r'\[[А-ЯA-Z]+\]', raw_type)
                if not extracted_tags:
                    t5.fail(f"File `{fname}` problem {i+1} has invalid tag: '{raw_type}'")
                for tag in extracted_tags:
                    if tag not in VALID_TAGS:
                        t5.fail(f"File `{fname}` problem {i+1} has unknown tag: '{tag}'")
                    parsed_stats['tags'][tag] += 1
                    parsed_stats['by_lesson'][ldir]['tags'][tag] += 1

                # Validate priorities
                found_prio = None
                for p in VALID_PRIORITIES:
                    if p in raw_prio:
                        found_prio = p
                        break
                if not found_prio:
                    t5.fail(f"File `{fname}` problem {i+1} has invalid priority: '{raw_prio}'")
                else:
                    parsed_stats['priorities'][found_prio] += 1
                    parsed_stats['by_lesson'][ldir]['priorities'][found_prio] += 1

                # Validate problem length
                if len(raw_prob) < 15:
                    t5.fail(f"File `{fname}` problem {i+1} description is too short/empty: '{raw_prob}'")

                parsed_issues.append({
                    'fname': fname,
                    'lesson_dir': ldir,
                    'prob_idx': i + 1,
                    'type': extracted_tags,
                    'prio': found_prio,
                    'lines_raw': raw_lines,
                    'prob_desc': raw_prob
                })

    results.append(t5)

    # -------------------------------------------------------------
    # TEST 6: Line Number Boundary Check against Physical Files
    # -------------------------------------------------------------
    t6 = TestResult("TEST 6: Line Number Boundaries against Physical Files")
    out_of_bounds_count = 0
    checked_lines_count = 0

    for issue in parsed_issues:
        fname = issue['fname']
        lines_raw = issue['lines_raw']
        parsed_ranges = parse_line_numbers(lines_raw)
        
        if not parsed_ranges:
            t6.warn(f"Could not parse line numbers in `{fname}`: '{lines_raw}'")
            continue

        actual_max_line = physical_meta[fname]['line_count']
        for start, end in parsed_ranges:
            checked_lines_count += 1
            if start < 1:
                t6.fail(f"File `{fname}` line start < 1: {start}")
            if start > end:
                t6.fail(f"File `{fname}` inverted range: {start} > {end}")
            if end > actual_max_line:
                out_of_bounds_count += 1
                t6.fail(f"File `{fname}`: line {end} exceeds actual file length ({actual_max_line} lines)! Raw: '{lines_raw}'")
            elif start > actual_max_line:
                out_of_bounds_count += 1
                t6.fail(f"File `{fname}`: line start {start} exceeds actual file length ({actual_max_line} lines)! Raw: '{lines_raw}'")

    if out_of_bounds_count == 0:
        print(f"       Checked {checked_lines_count} line range references across all files. All within bounds!")
    results.append(t6)

    # -------------------------------------------------------------
    # TEST 7: Summary Table Mathematical Consistency
    # -------------------------------------------------------------
    t7 = TestResult("TEST 7: Summary Table Mathematical Reconciliation")
    
    # Parse summary table from text
    tbl_rows = {}
    in_table = False
    for line in report_lines:
        if line.startswith('| Урок |'):
            in_table = True
            continue
        if in_table:
            if not line.startswith('|'):
                break
            if '---' in line:
                continue
            cols = [c.strip() for c in line.split('|')[1:-1]]
            if not cols:
                continue
            lesson_key = cols[0].replace('**', '')
            tbl_rows[lesson_key] = cols

    # Verify each lesson row
    for ldir, ltitle, exp_files in EXPECTED_LESSONS:
        if ldir not in tbl_rows:
            t7.fail(f"Summary table missing row for '{ldir}'")
            continue
        row = tbl_rows[ldir]
        tot = int(row[1])
        clean = int(row[2])
        issue = int(row[3])
        tag_err = int(row[4])
        tag_flow = int(row[5])
        tag_task = int(row[6])
        tag_pres = int(row[7])
        tag_gap = int(row[8])
        tag_dup = int(row[9])
        p_crit = int(row[10])
        p_high = int(row[11])
        p_med = int(row[12])
        p_low = int(row[13])

        p_stats = parsed_stats['by_lesson'][ldir]

        if tot != exp_files:
            t7.fail(f"Row {ldir}: total {tot} != expected {exp_files}")
        if clean != p_stats['clean']:
            t7.fail(f"Row {ldir}: table clean ({clean}) != parsed clean ({p_stats['clean']})")
        if issue != p_stats['issue']:
            t7.fail(f"Row {ldir}: table issue ({issue}) != parsed issue ({p_stats['issue']})")
        
        # Check sum of tags vs sum of priorities
        sum_tags = tag_err + tag_flow + tag_task + tag_pres + tag_gap + tag_dup
        sum_prios = p_crit + p_high + p_med + p_low
        if sum_tags != p_stats['problems']:
            t7.fail(f"Row {ldir}: sum tags ({sum_tags}) != parsed problems ({p_stats['problems']})")
        if sum_prios != p_stats['problems']:
            t7.fail(f"Row {ldir}: sum prios ({sum_prios}) != parsed problems ({p_stats['problems']})")

    # Check total row
    if 'ИТОГО' in tbl_rows:
        tot_row = tbl_rows['ИТОГО']
        if int(tot_row[1]) != 231:
            t7.fail(f"Total row total files {tot_row[1]} != 231")
        if int(tot_row[2]) != parsed_stats['clean_files']:
            t7.fail(f"Total row clean files {tot_row[2]} != parsed {parsed_stats['clean_files']}")
        if int(tot_row[3]) != parsed_stats['issue_files']:
            t7.fail(f"Total row issue files {tot_row[3]} != parsed {parsed_stats['issue_files']}")
        if int(tot_row[10]) + int(tot_row[11]) + int(tot_row[12]) + int(tot_row[13]) != parsed_stats['total_problems']:
            t7.fail(f"Total row problems sum != parsed total problems {parsed_stats['total_problems']}")
    else:
        t7.fail("Summary table missing ИТОГО row")

    results.append(t7)

    # -------------------------------------------------------------
    # TEST 8: Known Issues Empirical Analysis
    # -------------------------------------------------------------
    t8 = TestResult("TEST 8: Known Issues (1-7) Verification")
    for ki_num in range(1, 8):
        pattern = rf'###\s+{ki_num}\.\s+([^\n]+)'
        m = re.search(pattern, report_text)
        if not m:
            t8.fail(f"Known issue #{ki_num} heading missing in analysis section")
        else:
            ki_title = m.group(1)
            # check that it has status, type, priority, analysis, solution
            ki_pos = m.start()
            ki_sub = report_text[ki_pos:ki_pos+1500]
            if "**Статус:**" not in ki_sub:
                t8.fail(f"Known issue #{ki_num} missing **Статус:**")
            if "**Тип:**" not in ki_sub:
                t8.fail(f"Known issue #{ki_num} missing **Тип:**")
            if "**Приоритет:**" not in ki_sub:
                t8.fail(f"Known issue #{ki_num} missing **Приоритет:**")
            if "**Анализ:**" not in ki_sub:
                t8.fail(f"Known issue #{ki_num} missing **Анализ:**")
            if "**Решение:**" not in ki_sub:
                t8.fail(f"Known issue #{ki_num} missing **Решение:**")

    results.append(t8)

    # -------------------------------------------------------------
    # PRINT RESULTS
    # -------------------------------------------------------------
    print("\n" + "=" * 70)
    print("CHALLENGER ORACLE TEST REPORT")
    print("=" * 70)
    
    all_passed = True
    for res in results:
        status_str = "[PASS]" if res.passed else "[FAIL]"
        print(f"\n{status_str} {res.name}")
        if res.warnings:
            for w in res.warnings:
                print(f"       [WARN] {w}")
        if not res.passed:
            all_passed = False
            for f in res.failures:
                print(f"       [FAIL DETAIL] {f}")
        else:
            print(f"       All assertions satisfied.")

    print("\n" + "-" * 70)
    print(f"STATISTICS SUMMARY:")
    print(f"  Physical lesson files: {len(physical_files)}")
    print(f"  Files audited in report: {parsed_stats['total_files']}")
    print(f"  Clean files: {parsed_stats['clean_files']}")
    print(f"  Files with issues: {parsed_stats['issue_files']}")
    print(f"  Total itemized problems: {parsed_stats['total_problems']}")
    print(f"  Tags distribution: {dict(parsed_stats['tags'])}")
    print(f"  Priorities distribution: {dict(parsed_stats['priorities'])}")
    print("-" * 70)

    if all_passed:
        print("\n>>> FINAL VERDICT: APPROVE (ALL 8 ADVERSARIAL TEST SUITES PASSED)")
    else:
        print("\n>>> FINAL VERDICT: REQUEST_CHANGES (CRITICAL FAILURES DETECTED)")
    print("=" * 70)

    return all_passed

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
