import os
import glob
import re
import sys

def main():
    report_path = 'content/AUDIT_REPORT.md'
    print(f"Loading {report_path}...")
    with open(report_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    print(f"Report total lines: {len(lines)}")
    print(f"Report total characters: {len(content)}")

    # 1. Discover all disk lesson files
    disk_files = sorted(glob.glob('content/lessons/**/*.md', recursive=True))
    disk_files = [f.replace('\\', '/') for f in disk_files]
    print(f"\n1. Disk lesson files found: {len(disk_files)}")
    assert len(disk_files) == 231, f"Expected 231 files, found {len(disk_files)}"

    # Check lesson directory distribution
    lesson_dirs = [
        '01-intro', '02-markup', '03-flexbox', '04-js-dom', '05-catalog',
        '06-forms', '07-slider', '08-search', '09-final', '10-troubleshooting'
    ]
    expected_counts = {
        '01-intro': 11, '02-markup': 33, '03-flexbox': 28, '04-js-dom': 31,
        '05-catalog': 28, '06-forms': 27, '07-slider': 24, '08-search': 31,
        '09-final': 13, '10-troubleshooting': 5
    }
    
    disk_counts = {}
    for d in lesson_dirs:
        count = len([f for f in disk_files if f.startswith(f"content/lessons/{d}/")])
        disk_counts[d] = count
        assert count == expected_counts[d], f"Mismatch for {d}: disk {count} vs expected {expected_counts[d]}"
    print(f"Disk file counts per lesson match expected 100%: {disk_counts}")

    # Check if basenames are unique across the whole course!
    basenames = [os.path.basename(f) for f in disk_files]
    duplicate_basenames = set([b for b in basenames if basenames.count(b) > 1])
    print(f"Unique basenames check: {len(set(basenames))} unique of {len(basenames)} total.")
    if duplicate_basenames:
        print(f"NOTE: Basenames appearing in multiple directories: {duplicate_basenames}")
    else:
        print("All 231 files have globally unique basenames.")

    # 2. Check lesson sections in report
    print("\n2. Checking lesson sections in report...")
    lesson_section_regex = r"^##\s+Урок\s+(\d{2})\s+—\s+([^\n]+)"
    lesson_sections = list(re.finditer(lesson_section_regex, content, re.MULTILINE))
    print(f"Found {len(lesson_sections)} lesson sections.")
    for ls in lesson_sections:
        print(f"   Line header: {ls.group(0)}")
    if len(lesson_sections) != 10:
        print(f"WARNING / FINDING: Found {len(lesson_sections)} lesson headers instead of exactly 10! Check for duplicate or redundant headers.")


    # 3. Check every disk file has exact path reference in report
    print("\n3. Checking exact file paths in report...")
    missing_paths = []
    for fpath in disk_files:
        if f"`{fpath}`" not in content and fpath not in content:
            missing_paths.append(fpath)
    if missing_paths:
        print(f"FAILED: Missing file paths in report: {missing_paths}")
    else:
        print("PASS: Every one of 231 disk files is referenced by its exact relative path in content/AUDIT_REPORT.md!")

    # 4. Parse file headers (### `filename` ...)
    print("\n4. Parsing itemized file entries...")
    file_header_regex = r"^###\s+`([^`]+)`(?:\s+—\s+([^\n]+))?"
    headers = list(re.finditer(file_header_regex, content, re.MULTILINE))
    print(f"Found {len(headers)} file headers matching `### `filename``.")

    # Check headers against disk files
    header_files = [m.group(1) for m in headers]
    assert len(header_files) == 231, f"Expected 231 headers, got {len(header_files)}"
    assert sorted(header_files) == sorted(basenames), "Header filenames do not match disk filenames exactly!"
    print("PASS: Exactly 231 distinct files have headers matching the 231 disk files.")

    # 5. Check clean vs issue items
    clean_entries = []
    issue_entries = []
    for m in headers:
        fname = m.group(1)
        subtitle = m.group(2) or ""
        if "без замечаний" in subtitle.lower():
            clean_entries.append(fname)
        else:
            issue_entries.append((fname, subtitle))

    print(f"\n5. Clean entries: {len(clean_entries)}, Issue entries: {len(issue_entries)}")
    assert len(clean_entries) + len(issue_entries) == 231

    # 6. Check detailed content of each entry
    print("\n6. Inspecting entry schemas and line boundaries...")
    valid_tags = {"[ДУБЛИРОВАНИЕ]", "[ОШИБКА]", "[ЗАДАНИЕ]", "[ПРОБЕЛ]", "[ПОДАЧА]", "[ПЛАВНОСТЬ]"}
    valid_priorities = {"Критический", "Высокий", "Средний", "Низкий"}

    # Split report by lesson and examine each section
    # Let's map each file to its disk path and line count
    file_line_counts = {}
    for df in disk_files:
        with open(df, 'r', encoding='utf-8') as f:
            file_line_counts[df] = len(f.readlines())

    out_of_bounds_lines = []
    invalid_tags_found = []
    invalid_prios_found = []
    missing_fields = []

    # Iterate over headers and extract their text block
    for i, m in enumerate(headers):
        fname = m.group(1)
        start_idx = m.start()
        end_idx = headers[i+1].start() if i + 1 < len(headers) else len(content)
        entry_text = content[start_idx:end_idx]

        # Find matching disk file
        matching_dfs = [df for df in disk_files if df.endswith('/' + fname)]
        assert len(matching_dfs) == 1, f"Ambiguous or missing file for {fname}: {matching_dfs}"
        target_df = matching_dfs[0]
        actual_lines_in_file = file_line_counts[target_df]

        if "без замечаний" in (m.group(2) or "").lower():
            if "**Статус:** Без замечаний" not in entry_text:
                missing_fields.append((fname, "Missing '**Статус:** Без замечаний'"))
            if f"**Файл:** `{target_df}`" not in entry_text:
                missing_fields.append((fname, f"Missing '**Файл:** `{target_df}`'"))
        else:
            # Check issue fields
            # Note: files might have multiple issues (e.g. 00-theory-01-js-basics.md has 2 issues)
            # Find all types, priorities, lines, problems, fixes
            types = re.findall(r"\*\*Тип:\*\*\s+(`\[[^\]]+\]`|\[[^\]]+\])", entry_text)
            prios = re.findall(r"\*\*Приоритет:\*\*\s+`?([^`\n]+)`?", entry_text)
            line_refs = re.findall(r"\*\*Строки:\*\*\s+`?([^`\n]+)`?", entry_text)

            if not types:
                missing_fields.append((fname, "No **Тип:** field found"))
            if not prios:
                missing_fields.append((fname, "No **Приоритет:** field found"))
            if not line_refs:
                missing_fields.append((fname, "No **Строки:** field found"))
            if "**Проблема:**" not in entry_text:
                missing_fields.append((fname, "No **Проблема:** field found"))
            if "**Правка:**" not in entry_text:
                missing_fields.append((fname, "No **Правка:** field found"))

            for t in types:
                clean_t = t.strip('` ')
                # Split multiple tags if any (e.g. `[ЗАДАНИЕ]` / `[ОШИБКА]`)
                split_tags = [x.strip() for x in clean_t.split('/')]
                for st in split_tags:
                    if st not in valid_tags:
                        invalid_tags_found.append((fname, st))

            for p in prios:
                clean_p = p.strip('` ').split()[0] # e.g. "Критический"
                if clean_p not in valid_priorities:
                    invalid_prios_found.append((fname, clean_p))

            for lr in line_refs:
                clean_lr = lr.strip('` ')
                # Try to extract upper line number
                nums = [int(n) for n in re.findall(r'\d+', clean_lr)]
                if nums:
                    max_line_in_ref = max(nums)
                    # Allow minor buffer (e.g. +10 lines) for appending or EOF
                    if max_line_in_ref > actual_lines_in_file + 15:
                        out_of_bounds_lines.append((fname, target_df, clean_lr, max_line_in_ref, actual_lines_in_file))

    print(f"Missing fields: {len(missing_fields)}")
    if missing_fields:
        for mf in missing_fields[:10]:
            print("  ", mf)

    print(f"Invalid tags: {len(invalid_tags_found)}")
    if invalid_tags_found:
        for it in invalid_tags_found:
            print("  ", it)

    print(f"Invalid priorities: {len(invalid_prios_found)}")
    if invalid_prios_found:
        for ip in invalid_prios_found:
            print("  ", ip)

    print(f"Out of bounds line references: {len(out_of_bounds_lines)}")
    if out_of_bounds_lines:
        for oob in out_of_bounds_lines:
            print(f"   {oob[0]} ({oob[1]}): ref {oob[2]} vs max line {oob[4]}")

    # 7. Check Summary table consistency
    print("\n7. Summary table cross-check...")
    # Extract table rows
    table_pattern = r"\|\s*\*\*(\d{2}-[\w-]+)\*\*\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|"
    table_rows = re.findall(table_pattern, content)

    print(f"Found {len(table_rows)} lesson rows in summary table.")
    assert len(table_rows) == 10, f"Expected 10 rows, got {len(table_rows)}"

    for row in table_rows:
        lname, tot, clean, issues, err, flw, tsk, pres, gap, dup, crit, high, med, low = row
        tot, clean, issues = int(tot), int(clean), int(issues)
        types_sum = int(err) + int(flw) + int(tsk) + int(pres) + int(gap) + int(dup)
        prios_sum = int(crit) + int(high) + int(med) + int(low)
        print(f"Lesson {lname}: tot={tot}, clean={clean}, issues={issues}, sum_types={types_sum}, sum_prios={prios_sum}")
        assert tot == clean + issues, f"Row {lname}: tot != clean + issues"
        assert types_sum == prios_sum, f"Row {lname}: types_sum ({types_sum}) != prios_sum ({prios_sum})"

    print("\nDone basic verification.")

if __name__ == '__main__':
    main()
