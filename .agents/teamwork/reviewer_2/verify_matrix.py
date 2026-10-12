import os
import glob
import re

def verify_itemized_vs_table():
    with open('content/AUDIT_REPORT.md', 'r', encoding='utf-8') as f:
        content = f.read()

    lessons = [
        '01-intro', '02-markup', '03-flexbox', '04-js-dom', '05-catalog',
        '06-forms', '07-slider', '08-search', '09-final', '10-troubleshooting'
    ]

    # Split report by lesson
    # Note: lesson headers start with ## Урок XX
    # Find positions of ## Урок
    positions = []
    for l in re.finditer(r'^##\s+Урок\s+(\d{2})', content, re.MULTILINE):
        positions.append((l.group(1), l.start()))

    # Deduplicate positions if multiple headers for same lesson
    dedup_positions = []
    seen = set()
    for lnum, pos in positions:
        if lnum not in seen:
            seen.add(lnum)
            dedup_positions.append((lnum, pos))

    print(f"Unique lesson start positions: {len(dedup_positions)}")

    # Parse table rows from report
    table_pattern = r"\|\s*\*\*(\d{2}-[\w-]+)\*\*\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|"
    table_rows = {m[0][:2]: [int(x) for x in m[1:]] for m in re.findall(table_pattern, content)}

    mismatches = []
    total_problems = 0
    total_clean = 0
    total_issue_files = 0

    for i, (lnum, start_pos) in enumerate(dedup_positions):
        end_pos = dedup_positions[i+1][1] if i + 1 < len(dedup_positions) else len(content)
        lesson_text = content[start_pos:end_pos]
        
        # Files in this section
        headers = list(re.finditer(r'^###\s+`([^`]+)`(?:\s+—\s+([^\n]+))?', lesson_text, re.MULTILINE))
        clean_in_section = [h for h in headers if "без замечаний" in (h.group(2) or "").lower()]
        issue_in_section = [h for h in headers if "без замечаний" not in (h.group(2) or "").lower()]

        # Types in this section
        # Look for **Тип:** `[XXX]`
        types = re.findall(r"\*\*Тип:\*\*\s+(`\[[^\]]+\]`|\[[^\]]+\])", lesson_text)
        # Priorities in this section
        prios = re.findall(r"\*\*Приоритет:\*\*\s+`?([^`\n\r]+)`?", lesson_text)
        prios_clean = [p.strip('` ').split()[0] for p in prios]

        # Counts
        t_counts = {
            'ОШИБКА': len([t for t in types if 'ОШИБКА' in t]),
            'ПЛАВНОСТЬ': len([t for t in types if 'ПЛАВНОСТЬ' in t]),
            'ЗАДАНИЕ': len([t for t in types if 'ЗАДАНИЕ' in t]),
            'ПОДАЧА': len([t for t in types if 'ПОДАЧА' in t]),
            'ПРОБЕЛ': len([t for t in types if 'ПРОБЕЛ' in t]),
            'ДУБЛИРОВАНИЕ': len([t for t in types if 'ДУБЛИРОВАНИЕ' in t]),
        }
        p_counts = {
            'Критический': len([p for p in prios_clean if 'Критический' in p]),
            'Высокий': len([p for p in prios_clean if 'Высокий' in p]),
            'Средний': len([p for p in prios_clean if 'Средний' in p]),
            'Низкий': len([p for p in prios_clean if 'Низкий' in p]),
        }

        # Compare with table_rows
        # row: [tot, clean, issue_files, err, flw, tsk, pres, gap, dup, crit, high, med, low]
        expected = table_rows[lnum]
        exp_tot, exp_clean, exp_issue = expected[0], expected[1], expected[2]
        exp_err, exp_flw, exp_tsk, exp_pres, exp_gap, exp_dup = expected[3:9]
        exp_crit, exp_high, exp_med, exp_low = expected[9:13]

        print(f"\n--- Lesson {lnum} ---")
        print(f"Files: {len(headers)} (clean: {len(clean_in_section)}, issue: {len(issue_in_section)})")
        print(f"Types: {t_counts} (sum = {len(types)})")
        print(f"Prios: {p_counts} (sum = {len(prios_clean)})")

        if len(headers) != exp_tot or len(clean_in_section) != exp_clean or len(issue_in_section) != exp_issue:
            mismatches.append(f"Lesson {lnum} file counts mismatch: actual ({len(headers)}, {len(clean_in_section)}, {len(issue_in_section)}) vs table ({exp_tot}, {exp_clean}, {exp_issue})")
        if t_counts['ОШИБКА'] != exp_err or t_counts['ПЛАВНОСТЬ'] != exp_flw or t_counts['ЗАДАНИЕ'] != exp_tsk or t_counts['ПОДАЧА'] != exp_pres or t_counts['ПРОБЕЛ'] != exp_gap or t_counts['ДУБЛИРОВАНИЕ'] != exp_dup:
            mismatches.append(f"Lesson {lnum} type counts mismatch: actual {t_counts} vs table {expected[3:9]}")
        if p_counts['Критический'] != exp_crit or p_counts['Высокий'] != exp_high or p_counts['Средний'] != exp_med or p_counts['Низкий'] != exp_low:
            mismatches.append(f"Lesson {lnum} prio counts mismatch: actual {p_counts} vs table {expected[9:13]}")

        total_problems += len(types)
        total_clean += len(clean_in_section)
        total_issue_files += len(issue_in_section)

    print(f"\nTOTAL PROBLEMS: {total_problems}")
    print(f"TOTAL CLEAN: {total_clean}")
    print(f"TOTAL ISSUE FILES: {total_issue_files}")
    if mismatches:
        print(f"\nMISMATCHES FOUND ({len(mismatches)}):")
        for m in mismatches:
            print("  *", m)
    else:
        print("\nPERFECT MATCH: All itemized counts match summary table exactly!")

if __name__ == '__main__':
    verify_itemized_vs_table()
