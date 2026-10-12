import os
import re
import sys
from pathlib import Path

BASE_DIR = Path(r"d:\IEEU International East-European University\foma-code-lab")
REPORT_PATH = BASE_DIR / "content" / "AUDIT_REPORT.md"
LESSONS_DIR = BASE_DIR / "content" / "lessons"

EXPECTED_LESSON_FILES = {
    "01-intro": 11,
    "02-markup": 33,
    "03-flexbox": 28,
    "04-js-dom": 31,
    "05-catalog": 28,
    "06-forms": 27,
    "07-slider": 24,
    "08-search": 31,
    "09-final": 13,
    "10-troubleshooting": 5,
}

ALLOWED_TAGS = {
    "[ДУБЛИРОВАНИЕ]",
    "[ОШИБКА]",
    "[ЗАДАНИЕ]",
    "[ПРОБЕЛ]",
    "[ПОДАЧА]",
    "[ПЛАВНОСТЬ]"
}

ALLOWED_PRIORITIES = {
    "Критический",
    "Высокий",
    "Средний",
    "Низкий"
}

def normalize_text(t):
    return t.replace('**', '').replace('`', '').strip()

def run_tests():
    report_lines_out = []
    def log(msg=""):
        report_lines_out.append(msg)

    log("=" * 80)
    log("CHALLENGER 2 INDEPENDENT AUDIT VERIFICATION")
    log("=" * 80)

    # 1. Filesystem scan
    log("\n--- 1. Filesystem Verification ---")
    disk_files_by_lesson = {}
    total_disk_files = 0
    all_disk_files = set()

    for lesson_dir in sorted(LESSONS_DIR.iterdir()):
        if lesson_dir.is_dir():
            lesson_name = lesson_dir.name
            files = sorted([f.name for f in lesson_dir.glob("*.md")])
            disk_files_by_lesson[lesson_name] = files
            total_disk_files += len(files)
            for f in files:
                all_disk_files.add(f"{lesson_name}/{f}")
            expected = EXPECTED_LESSON_FILES.get(lesson_name, 0)
            status = "OK" if len(files) == expected else f"FAIL (expected {expected})"
            log(f"Lesson {lesson_name}: {len(files)} files on disk [{status}]")

    log(f"Total files on disk: {total_disk_files} (expected 231) [{'OK' if total_disk_files == 231 else 'FAIL'}]")

    # 2. Read report
    log("\n--- 2. Parsing AUDIT_REPORT.md ---")
    if not REPORT_PATH.exists():
        log(f"ERROR: {REPORT_PATH} not found!")
        return "\n".join(report_lines_out)

    with open(REPORT_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.splitlines()
    log(f"Total lines in AUDIT_REPORT.md: {len(lines)}")
    log(f"Total bytes in AUDIT_REPORT.md: {len(content.encode('utf-8'))}")

    # 3. Parse Summary Table
    log("\n--- 3. Verifying Summary Table Math ---")
    table_lines = []
    in_table = False
    for line in lines:
        if line.strip().startswith("| Урок | Всего файлов"):
            in_table = True
        if in_table:
            if line.strip().startswith("|"):
                table_lines.append(line.strip())
            else:
                break

    log(f"Found {len(table_lines)} table lines")
    table_data = {}
    table_headers = [c.strip() for c in table_lines[0].split("|")[1:-1]]
    log(f"Headers: {table_headers}")

    for row_str in table_lines[2:]: # skip header and separator
        cols = [c.strip() for c in row_str.split("|")[1:-1]]
        lesson_key = normalize_text(cols[0])
        nums = [int(normalize_text(c)) for c in cols[1:]]
        table_data[lesson_key] = nums
        log(f"Table row {lesson_key}: {nums}")

    # Check table internal column sums
    sum_calculated = [0] * len(table_data["01-intro"])
    for l_key, l_nums in table_data.items():
        if l_key == "ИТОГО":
            continue
        for i, val in enumerate(l_nums):
            sum_calculated[i] += val

    itogo_row = table_data.get("ИТОГО")
    log(f"\nCalculated sum of rows: {sum_calculated}")
    log(f"Table 'ИТОГО' row:       {itogo_row}")
    table_sum_match = (sum_calculated == itogo_row)
    log(f"Table internal sums match: {'PASS' if table_sum_match else 'FAIL'}")

    # Verify bullet summary matches table
    summary_match = True
    bullet_total_files = int(re.search(r'Всего файлов проверено:\s*\*\*(\d+)\*\*', content).group(1))
    bullet_clean_files = int(re.search(r'Файлов без замечаний:\s*\*\*(\d+)\*\*', content).group(1))
    bullet_issue_files = int(re.search(r'Файлов с замечаниями:\s*\*\*(\d+)\*\*', content).group(1))
    bullet_total_issues = int(re.search(r'Общее количество выявленных проблем:\s*\*\*(\d+)\*\*', content).group(1))

    log(f"\nBullet summary check:")
    log(f"  Total files: {bullet_total_files} vs Table {itogo_row[0]} -> {'PASS' if bullet_total_files == itogo_row[0] else 'FAIL'}")
    log(f"  Clean files: {bullet_clean_files} vs Table {itogo_row[1]} -> {'PASS' if bullet_clean_files == itogo_row[1] else 'FAIL'}")
    log(f"  Issue files: {bullet_issue_files} vs Table {itogo_row[2]} -> {'PASS' if bullet_issue_files == itogo_row[2] else 'FAIL'}")
    
    # Check sum of types in bullet points vs table
    types_in_bullets = {
        "ОШИБКА": int(re.search(r'`\[ОШИБКА\]`:\s*(\d+)', content).group(1)),
        "ПЛАВНОСТЬ": int(re.search(r'`\[ПЛАВНОСТЬ\]`:\s*(\d+)', content).group(1)),
        "ЗАДАНИЕ": int(re.search(r'`\[ЗАДАНИЕ\]`:\s*(\d+)', content).group(1)),
        "ПОДАЧА": int(re.search(r'`\[ПОДАЧА\]`:\s*(\d+)', content).group(1)),
        "ПРОБЕЛ": int(re.search(r'`\[ПРОБЕЛ\]`:\s*(\d+)', content).group(1)),
        "ДУБЛИРОВАНИЕ": int(re.search(r'`\[ДУБЛИРОВАНИЕ\]`:\s*(\d+)', content).group(1)),
    }
    log(f"Types in bullets: {types_in_bullets}")
    sum_types = sum(types_in_bullets.values())
    log(f"Sum of types in bullets: {sum_types} (matches bullet total issues: {sum_types == bullet_total_issues})")

    prios_in_bullets = {
        "Критический": int(re.search(r'Критический:\s*(\d+)', content).group(1)),
        "Высокий": int(re.search(r'Высокий:\s*(\d+)', content).group(1)),
        "Средний": int(re.search(r'Средний:\s*(\d+)', content).group(1)),
        "Низкий": int(re.search(r'Низкий:\s*(\d+)', content).group(1)),
    }
    log(f"Priorities in bullets: {prios_in_bullets}")
    sum_prios = sum(prios_in_bullets.values())
    log(f"Sum of priorities in bullets: {sum_prios} (matches bullet total issues: {sum_prios == bullet_total_issues})")

    # 4. Parse Detailed Lesson Sections
    log("\n--- 4. Parsing Detailed Lesson Sections ---")
    lesson_sections = re.split(r'\n(?=## Урок \d{2})', content)
    lesson_bodies = lesson_sections[1:]

    log(f"Found {len(lesson_bodies)} lesson sections (expected 10)")

    parsed_lessons = {}
    all_report_files = set()
    all_issues = []

    for idx, sec in enumerate(lesson_bodies):
        first_line = sec.strip().splitlines()[0]
        m_num = re.search(r'## Урок (\d{2})', first_line)
        lesson_num = m_num.group(1) if m_num else f"{idx+1:02d}"

        matched_name = None
        for k in EXPECTED_LESSON_FILES.keys():
            if k.startswith(lesson_num):
                matched_name = k
                break
        if not matched_name:
            matched_name = f"lesson-{lesson_num}"

        items = re.split(r'\n(?=### `)', sec)
        items_list = items[1:]

        sec_clean_files = []
        sec_issues = []

        for item in items_list:
            item_first_line = item.strip().splitlines()[0]
            m_fn = re.search(r'### `([^`]+)`', item_first_line)
            fn = m_fn.group(1) if m_fn else "UNKNOWN"
            full_file_rel = f"{matched_name}/{fn}"
            all_report_files.add(full_file_rel)

            # Check if clean
            is_clean = False
            if "Статус:** Без замечаний" in item or "Статус:** без замечаний" in item or "— без замечаний" in item_first_line:
                is_clean = True
                sec_clean_files.append((fn, item))
            else:
                # Check if multi-problem
                if "#### Проблема" in item:
                    # Multi-problem
                    prob_chunks = re.split(r'\n(?=#### Проблема \d+:)', item)[1:]
                    for p_chunk in prob_chunks:
                        tipo_m = re.search(r'\*\*Тип:\*\*\s*(.+)', p_chunk)
                        prio_m = re.search(r'\*\*Приоритет:\*\*\s*(.+)', p_chunk)
                        file_m = re.search(r'\*\*Файл:\*\*\s*(.+)', p_chunk)
                        lines_m = re.search(r'\*\*Строки:\*\*\s*(.+)', p_chunk)
                        prob_m = re.search(r'\*\*Проблема:\*\*\s*(.+)', p_chunk)
                        # Fix is from **Правка:** to end or next header
                        fix_m = re.search(r'\*\*Правка:\*\*\s*(.*?)(?=\n####|\Z)', p_chunk, re.DOTALL)

                        raw_tipo = tipo_m.group(1).strip() if tipo_m else None
                        raw_prio = prio_m.group(1).strip() if prio_m else None
                        raw_file = file_m.group(1).strip() if file_m else None
                        raw_lines = lines_m.group(1).strip() if lines_m else None
                        raw_prob = prob_m.group(1).strip() if prob_m else None
                        raw_fix = fix_m.group(1).strip() if fix_m else None

                        clean_tipo = normalize_text(raw_tipo) if raw_tipo else ""
                        clean_prio = normalize_text(raw_prio) if raw_prio else ""

                        iss_obj = {
                            "lesson": matched_name,
                            "filename": fn,
                            "full_path": full_file_rel,
                            "raw_tipo": raw_tipo,
                            "clean_tipo": clean_tipo,
                            "raw_prio": raw_prio,
                            "clean_prio": clean_prio,
                            "lines": raw_lines,
                            "problem": raw_prob,
                            "fix": raw_fix,
                            "raw_item": p_chunk
                        }
                        sec_issues.append(iss_obj)
                        all_issues.append(iss_obj)
                else:
                    # Single issue
                    tipo_m = re.search(r'\*\*Тип:\*\*\s*(.+)', item)
                    prio_m = re.search(r'\*\*Приоритет:\*\*\s*(.+)', item)
                    file_m = re.search(r'\*\*Файл:\*\*\s*(.+)', item)
                    lines_m = re.search(r'\*\*Строки:\*\*\s*(.+)', item)
                    prob_m = re.search(r'\*\*Проблема:\*\*\s*(.+)', item)
                    fix_m = re.search(r'\*\*Правка:\*\*\s*(.*?)(?=\n###|\Z)', item, re.DOTALL)

                    raw_tipo = tipo_m.group(1).strip() if tipo_m else None
                    raw_prio = prio_m.group(1).strip() if prio_m else None
                    raw_file = file_m.group(1).strip() if file_m else None
                    raw_lines = lines_m.group(1).strip() if lines_m else None
                    raw_prob = prob_m.group(1).strip() if prob_m else None
                    raw_fix = fix_m.group(1).strip() if fix_m else None

                    clean_tipo = normalize_text(raw_tipo) if raw_tipo else ""
                    clean_prio = normalize_text(raw_prio) if raw_prio else ""

                    iss_obj = {
                        "lesson": matched_name,
                        "filename": fn,
                        "full_path": full_file_rel,
                        "raw_tipo": raw_tipo,
                        "clean_tipo": clean_tipo,
                        "raw_prio": raw_prio,
                        "clean_prio": clean_prio,
                        "lines": raw_lines,
                        "problem": raw_prob,
                        "fix": raw_fix,
                        "raw_item": item
                    }
                    sec_issues.append(iss_obj)
                    all_issues.append(iss_obj)

        parsed_lessons[matched_name] = {
            "title": first_line,
            "total_items": len(items_list),
            "clean_count": len(sec_clean_files),
            "issue_count": len(sec_issues),
            "clean_files": sec_clean_files,
            "issues": sec_issues
        }

    log(f"\nParsed {len(parsed_lessons)} lessons:")
    for l_name, l_info in parsed_lessons.items():
        log(f"  {l_name}: {l_info['total_items']} items (clean: {l_info['clean_count']}, issue entries: {l_info['issue_count']})")

    # 5. Compare Parsed Lesson Data vs Summary Table Rows
    log("\n--- 5. Comparing Parsed Section Data vs Summary Table Rows ---")
    math_discrepancies = []

    for l_name, l_info in parsed_lessons.items():
        t_row = table_data.get(l_name)
        if not t_row:
            math_discrepancies.append(f"Lesson {l_name} not found in summary table!")
            continue

        tipo_counts = {
            "ОШИБКА": 0,
            "ПЛАВНОСТЬ": 0,
            "ЗАДАНИЕ": 0,
            "ПОДАЧА": 0,
            "ПРОБЕЛ": 0,
            "ДУБЛИРОВАНИЕ": 0
        }
        for iss in l_info["issues"]:
            ct = iss["clean_tipo"].strip('[]')
            if ct in tipo_counts:
                tipo_counts[ct] += 1
            else:
                tipo_counts[ct] = tipo_counts.get(ct, 0) + 1

        prio_counts = {
            "Критический": 0,
            "Высокий": 0,
            "Средний": 0,
            "Низкий": 0
        }
        for iss in l_info["issues"]:
            cp = iss["clean_prio"]
            if cp in prio_counts:
                prio_counts[cp] += 1
            else:
                prio_counts[cp] = prio_counts.get(cp, 0) + 1

        unique_issue_files = len(set(iss["filename"] for iss in l_info["issues"]))

        expected_row = [
            l_info["total_items"],
            l_info["clean_count"],
            unique_issue_files,
            tipo_counts.get("ОШИБКА", 0),
            tipo_counts.get("ПЛАВНОСТЬ", 0),
            tipo_counts.get("ЗАДАНИЕ", 0),
            tipo_counts.get("ПОДАЧА", 0),
            tipo_counts.get("ПРОБЕЛ", 0),
            tipo_counts.get("ДУБЛИРОВАНИЕ", 0),
            prio_counts.get("Критический", 0),
            prio_counts.get("Высокий", 0),
            prio_counts.get("Средний", 0),
            prio_counts.get("Низкий", 0),
        ]

        diffs = []
        col_names = ["Всего", "Без замечаний", "С замечаниями", "ОШИБКА", "ПЛАВНОСТЬ", "ЗАДАНИЕ", "ПОДАЧА", "ПРОБЕЛ", "ДУБЛИРОВАНИЕ", "Критический", "Высокий", "Средний", "Низкий"]
        for c_idx in range(len(col_names)):
            if t_row[c_idx] != expected_row[c_idx]:
                diffs.append(f"{col_names[c_idx]}: table={t_row[c_idx]} vs parsed={expected_row[c_idx]}")

        if diffs:
            math_discrepancies.append(f"Discrepancy in {l_name}: {', '.join(diffs)}")
        else:
            log(f"Lesson {l_name}: PERFECT MATCH with summary table row! [PASS]")

    if math_discrepancies:
        log(f"\nMATH DISCREPANCIES DETECTED ({len(math_discrepancies)}):")
        for d in math_discrepancies:
            log(f"  - {d}")
    else:
        log("\nALL SUMMARY TABLE ROWS MATCH PARSED LESSON DATA EXACTLY! (100% PASS)")

    # 6. Tag validation
    log("\n--- 6. Tag Validation ---")
    invalid_tags = []
    for iss in all_issues:
        ct = iss["raw_tipo"]
        norm_tag = normalize_text(ct)
        if not norm_tag.startswith("[") or not norm_tag.endswith("]"):
            norm_tag = f"[{norm_tag}]"
        if norm_tag not in ALLOWED_TAGS:
            invalid_tags.append((iss["full_path"], ct, norm_tag))

    if invalid_tags:
        log(f"INVALID TAGS DETECTED ({len(invalid_tags)}):")
        for f, raw, norm in invalid_tags:
            log(f"  - {f}: raw='{raw}', normalized='{norm}'")
    else:
        log(f"ALL {len(all_issues)} TAGS ARE STRICTLY FROM ALLOWED SET! (100% PASS)")

    # 7. Priority validation
    log("\n--- 7. Priority Validation ---")
    invalid_prios = []
    for iss in all_issues:
        cp = iss["raw_prio"]
        norm_prio = normalize_text(cp)
        if norm_prio not in ALLOWED_PRIORITIES:
            invalid_prios.append((iss["full_path"], cp, norm_prio))

    if invalid_prios:
        log(f"INVALID PRIORITIES DETECTED ({len(invalid_prios)}):")
        for f, raw, norm in invalid_prios:
            log(f"  - {f}: raw='{raw}', normalized='{norm}'")
    else:
        log(f"ALL {len(all_issues)} PRIORITIES ARE STRICTLY FROM ALLOWED SET! (100% PASS)")

    # 8. File coverage (all 231 files)
    log("\n--- 8. File Coverage Check ---")
    missing_from_report = all_disk_files - all_report_files
    extra_in_report = all_report_files - all_disk_files

    log(f"Total disk files: {len(all_disk_files)}")
    log(f"Total report files: {len(all_report_files)}")
    if missing_from_report:
        log(f"MISSING FROM REPORT ({len(missing_from_report)}):")
        for m in sorted(missing_from_report):
            log(f"  - {m}")
    else:
        log("NO FILES MISSING FROM REPORT! (100% COVERAGE)")

    if extra_in_report:
        log(f"EXTRA IN REPORT ({len(extra_in_report)}):")
        for e in sorted(extra_in_report):
            log(f"  - {e}")
    else:
        log("NO EXTRA/PHANTOM FILES IN REPORT!")

    # 9. Completeness of Issue Fields
    log("\n--- 9. Issue Fields Quality Check ---")
    missing_fields = []
    vague_fixes = []
    for iss in all_issues:
        fp = iss["full_path"]
        if not iss["lines"]:
            missing_fields.append((fp, "Строки"))
        if not iss["problem"]:
            missing_fields.append((fp, "Проблема"))
        if not iss["fix"]:
            missing_fields.append((fp, "Правка"))
        else:
            fix_text = iss["fix"]
            if len(fix_text.strip()) < 15:
                vague_fixes.append((fp, fix_text))

    if missing_fields:
        log(f"ISSUES WITH MISSING FIELDS ({len(missing_fields)}):")
        for fp, fld in missing_fields:
            log(f"  - {fp}: missing {fld}")
    else:
        log("ALL ISSUES HAVE ALL MANDATORY FIELDS (Файл, Строки, Проблема, Правка, Тип, Приоритет)! (100% PASS)")

    if vague_fixes:
        log(f"POTENTIALLY VAGUE FIXES ({len(vague_fixes)}):")
        for fp, fx in vague_fixes:
            log(f"  - {fp}: '{fx}'")
    else:
        log("ALL FIXES ARE SUBSTANTIVE AND CONCRETE! (100% PASS)")

    # 10. Check Known Issues 1-7
    log("\n--- 10. Known Issues 1-7 Verification ---")
    ki_section_m = re.search(r'## Анализ и статус Known Issues \(1–7\)(.*?)(?=\n## Урок 01)', content, re.DOTALL)
    if not ki_section_m:
        log("FAIL: Known Issues section not found in report!")
    else:
        ki_text = ki_section_m.group(1)
        log(f"Found Known Issues section ({len(ki_text.splitlines())} lines)")
        for i in range(1, 8):
            m_ki = re.search(rf'### {i}\.', ki_text)
            if m_ki:
                log(f"  - Known Issue {i}: Present in Known Issues section [PASS]")
            else:
                log(f"  - Known Issue {i}: MISSING in Known Issues section [FAIL]")

    log("\nVerifying Known Issues in individual lesson entries:")
    # KI-1: 01-intro/08-html-structure.md and 02-markup/00-theory-01-doctype.md
    ki1_issues = [iss for iss in all_issues if (iss["filename"] == "08-html-structure.md" and iss["lesson"] == "01-intro") or (iss["filename"] == "00-theory-01-doctype.md" and iss["lesson"] == "02-markup")]
    log(f"KI-1 (01-intro/08-html-structure.md & 02-markup/00-theory-01-doctype.md): {len(ki1_issues)} issue(s) found.")
    for iss in ki1_issues:
        log(f"   In {iss['full_path']}: {iss['clean_tipo']} ({iss['clean_prio']})")

    # KI-2: 02-markup/00-theory-06b-variables.md
    ki2_issues = [iss for iss in all_issues if iss["filename"] == "00-theory-06b-variables.md" and iss["lesson"] == "02-markup"]
    log(f"KI-2 (02-markup/00-theory-06b-variables.md): {len(ki2_issues)} issue(s) found.")
    for iss in ki2_issues:
        log(f"   In {iss['full_path']}: {iss['clean_tipo']} ({iss['clean_prio']})")

    # KI-3: 01-intro/07-images.md
    ki3_issues = [iss for iss in all_issues if iss["filename"] == "07-images.md" and iss["lesson"] == "01-intro"]
    log(f"KI-3 (01-intro/07-images.md): {len(ki3_issues)} issue(s) found.")
    for iss in ki3_issues:
        log(f"   In {iss['full_path']}: {iss['clean_tipo']} ({iss['clean_prio']})")

    # KI-4: 01-intro/04-paragraphs.md
    ki4_issues = [iss for iss in all_issues if iss["filename"] == "04-paragraphs.md" and iss["lesson"] == "01-intro"]
    log(f"KI-4 (01-intro/04-paragraphs.md): {len(ki4_issues)} issue(s) found.")
    for iss in ki4_issues:
        log(f"   In {iss['full_path']}: {iss['clean_tipo']} ({iss['clean_prio']})")

    # KI-5: 04-js-dom/00-theory-01-js-basics.md
    ki5_issues = [iss for iss in all_issues if iss["filename"] == "00-theory-01-js-basics.md" and iss["lesson"] == "04-js-dom"]
    log(f"KI-5 (04-js-dom/00-theory-01-js-basics.md): {len(ki5_issues)} issue(s) found.")
    for iss in ki5_issues:
        log(f"   In {iss['full_path']}: {iss['clean_tipo']} ({iss['clean_prio']}) - lines {iss['lines']}")

    # KI-6: 01-intro/06-links.md
    ki6_issues = [iss for iss in all_issues if iss["filename"] == "06-links.md" and iss["lesson"] == "01-intro"]
    log(f"KI-6 (01-intro/06-links.md): {len(ki6_issues)} issue(s) found.")
    for iss in ki6_issues:
        log(f"   In {iss['full_path']}: {iss['clean_tipo']} ({iss['clean_prio']})")

    # KI-7: overflow/object-fit references
    ki7_issues = [iss for iss in all_issues if "overflow" in iss["raw_item"].lower() or "object-fit" in iss["raw_item"].lower()]
    log(f"KI-7 (overflow/object-fit references across lessons): {len(ki7_issues)} issue(s) found.")
    for iss in ki7_issues:
        log(f"   In {iss['full_path']}: {iss['clean_tipo']} ({iss['clean_prio']}) - lines {iss['lines']}")

    # 11. Verdict
    log("\n" + "=" * 80)
    has_math_errors = len(math_discrepancies) > 0 or not table_sum_match
    has_tag_errors = len(invalid_tags) > 0
    has_prio_errors = len(invalid_prios) > 0
    has_missing_files = len(missing_from_report) > 0
    has_field_errors = len(missing_fields) > 0

    if has_math_errors or has_tag_errors or has_prio_errors or has_missing_files or has_field_errors:
        log("FINAL VERDICT: REQUEST_CHANGES")
    else:
        log("FINAL VERDICT: APPROVE")
    log("=" * 80)

    out_text = "\n".join(report_lines_out)
    with open(BASE_DIR / ".agents" / "teamwork" / "challenger_2" / "test_output.txt", "w", encoding="utf-8") as out_f:
        out_f.write(out_text)
    print("Execution completed. Output saved to test_output.txt")
    return out_text

if __name__ == "__main__":
    run_tests()
