import os
import re
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

def test_audit_report():
    report_file = 'content/AUDIT_REPORT.md'
    with open(report_file, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()

    print("=== ADVERSARIAL TEST 1: Table Mathematics and Consistency ===")
    table_lines = []
    in_table = False
    for line in lines:
        if line.startswith('| Урок |'):
            in_table = True
        if in_table:
            table_lines.append(line)
            if 'ИТОГО' in line:
                break

    header_cols = [c.strip() for c in table_lines[0].split('|')[1:-1]]
    data_rows = [r for r in table_lines[2:]] # skip header and separator

    parsed_rows = []
    for r in data_rows:
        cols = [c.strip() for c in r.split('|')[1:-1]]
        lesson_name = cols[0].replace('*', '')
        vals = [int(v) for v in cols[1:]]
        parsed_rows.append((lesson_name, vals))

    # Columns:
    # 0: Всего файлов
    # 1: Без замечаний
    # 2: С замечаниями
    # 3: ОШИБКА
    # 4: ПЛАВНОСТЬ
    # 5: ЗАДАНИЕ
    # 6: ПОДАЧА
    # 7: ПРОБЕЛ
    # 8: ДУБЛИРОВАНИЕ
    # 9: Критический
    # 10: Высокий
    # 11: Средний
    # 12: Низкий

    table_errors = []
    # Check rows 0..9 (lessons)
    for name, vals in parsed_rows[:-1]:
        tot_files = vals[0]
        clean_files = vals[1]
        issue_files = vals[2]
        if clean_files + issue_files != tot_files:
            table_errors.append(f"Row {name}: clean ({clean_files}) + issue ({issue_files}) != tot ({tot_files})")
        
        type_sum = sum(vals[3:9])
        prio_sum = sum(vals[9:13])
        if type_sum != prio_sum:
            table_errors.append(f"Row {name}: type_sum ({type_sum}) != prio_sum ({prio_sum})")
        if issue_files > type_sum:
            table_errors.append(f"Row {name}: issue_files ({issue_files}) > type_sum ({type_sum})")

    # Check totals row (last)
    total_name, total_vals = parsed_rows[-1]
    col_sums = [sum(parsed_rows[i][1][col_idx] for i in range(10)) for col_idx in range(len(total_vals))]
    for col_idx, (actual_col_sum, table_val) in enumerate(zip(col_sums, total_vals)):
        if actual_col_sum != table_val:
            table_errors.append(f"Col {header_cols[col_idx+1]}: sum of lessons ({actual_col_sum}) != total row ({table_val})")

    if table_errors:
        print("TABLE ERRORS FOUND:")
        for err in table_errors:
            print("  -", err)
    else:
        print("[PASS] Table math is 100% consistent across all rows and columns!")

    print("\n=== ADVERSARIAL TEST 2: File Existence and Completeness ===")
    all_disk_files = set(glob.glob('content/lessons/**/*.md', recursive=True))
    all_disk_norm = {f.replace('\\', '/') for f in all_disk_files}
    print(f"Total files on disk: {len(all_disk_norm)}")

    # Extract all file sections in AUDIT_REPORT.md
    file_sections = re.split(r'\n###\s+`', content)[1:]
    print(f"Total file sections in report: {len(file_sections)}")

    reported_files = set()
    invalid_paths = []
    missing_fields = []
    line_number_errors = []
    placeholder_warnings = []

    for idx, sec in enumerate(file_sections):
        # First line contains filename` - title
        first_line = sec.split('\n')[0]
        fname = first_line.split('`')[0].strip()
        
        # Find file path line
        path_match = re.search(r'\*\*Файл:\*\*\s*`?([^`\n\r]+)`?', sec)
        if not path_match:
            missing_fields.append(f"Section {fname}: missing **Файл:**")
            continue
        rel_path = path_match.group(1).strip()
        rel_path_norm = rel_path.replace('\\', '/')
        reported_files.add(rel_path_norm)

        if not os.path.exists(rel_path_norm):
            invalid_paths.append(f"Section {fname}: file path does not exist on disk: {rel_path_norm}")
            continue

        # Check total lines in disk file
        with open(rel_path_norm, 'r', encoding='utf-8') as df:
            disk_lines = df.readlines()
        disk_line_count = len(disk_lines)

        # Check if clean or has issues
        is_clean = ("без замечаний" in first_line.lower()) or ("**статус:** без замечаний" in sec.lower())
        if is_clean:
            if not ("**статус:** без замечаний" in sec.lower() or "**статус:** `без замечаний`" in sec.lower()):
                missing_fields.append(f"Clean file {fname}: missing standard **Статус:** Без замечаний")
        else:
            # Check issue fields
            for req_field in ["**Тип:**", "**Приоритет:**", "**Строки:**", "**Проблема:**", "**Правка:**"]:
                if req_field not in sec:
                    missing_fields.append(f"Issue file {fname}: missing {req_field}")

            # Check line numbers
            # Matches strings like **Строки:** `28–29` or **Строки:** `45` or **Строки:** 10-15
            lines_matches = re.findall(r'\*\*Строки:\*\*\s*`?([0-9]+)(?:[–\-]([0-9]+))?`?', sec)
            if not lines_matches:
                line_number_errors.append(f"{fname}: Could not parse line numbers in: {sec[:150]}")
            else:
                for start_str, end_str in lines_matches:
                    start_l = int(start_str)
                    end_l = int(end_str) if end_str else start_l
                    if start_l > disk_line_count or end_l > disk_line_count:
                        line_number_errors.append(
                            f"{rel_path_norm}: Cites lines {start_l}-{end_l}, but file only has {disk_line_count} lines!"
                        )

        # Check for placeholders or dummy text
        dummy_patterns = [r'\bTODO\b', r'\bTBD\b', r'\[описание\]', r'\[исправить\]', r'lorem ipsum', r'xxx']
        for dp in dummy_patterns:
            if re.search(dp, sec, re.IGNORECASE):
                placeholder_warnings.append(f"{fname}: Contains placeholder pattern {dp}")

    if invalid_paths:
        print(f"[FAIL] Found {len(invalid_paths)} invalid file paths:")
        for ip in invalid_paths[:10]:
            print("  -", ip)
    else:
        print("[PASS] All file paths exist on disk!")

    if len(all_disk_norm - reported_files) > 0:
        print(f"[FAIL] Missing files on disk not in report: {all_disk_norm - reported_files}")
    else:
        print(f"[PASS] 100% of files on disk ({len(all_disk_norm)}) are reported in AUDIT_REPORT.md!")

    if missing_fields:
        print(f"[FAIL] Missing required fields in {len(missing_fields)} instances:")
        for mf in missing_fields[:10]:
            print("  -", mf)
    else:
        print("[PASS] All required fields (Файл, Тип, Приоритет, Строки, Проблема, Правка) are present!")

    if line_number_errors:
        print(f"[FAIL] Line number errors ({len(line_number_errors)}):")
        for lne in line_number_errors[:15]:
            print("  -", lne)
    else:
        print("[PASS] All cited line numbers are within valid line ranges of target files!")

    if placeholder_warnings:
        print(f"[FAIL] Placeholder patterns found ({len(placeholder_warnings)}):")
        for pw in placeholder_warnings[:10]:
            print("  -", pw)
    else:
        print("[PASS] No dummy/placeholder patterns (TODO, TBD, etc.) found!")

    print("\n=== ADVERSARIAL TEST 3: Concrete Fixes & Code Blocks ===")
    # Check that issue sections have substantial replacement blocks or concrete instructions
    weak_fixes = []
    for sec in file_sections:
        fname = sec.split('`')[0].strip()
        if "без замечаний" in sec.lower():
            continue
        # Extract after **Правка:**
        fix_parts = sec.split('**Правка:**')
        for fp in fix_parts[1:]:
            fix_text = fp.split('###')[0].strip()
            # If fix text is very short (< 30 chars) or lacks code / bullet points
            if len(fix_text) < 25:
                weak_fixes.append(f"{fname}: Fix too brief ({len(fix_text)} chars): {fix_text}")

    if weak_fixes:
        print(f"[WARN/FAIL] Found {len(weak_fixes)} potentially weak fixes:")
        for wf in weak_fixes[:10]:
            print("  -", wf)
    else:
        print("[PASS] All fixes provide substantial, concrete code or instructions!")

if __name__ == '__main__':
    test_audit_report()
