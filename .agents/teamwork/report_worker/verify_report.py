import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def run_verification():
    report_path = 'content/AUDIT_REPORT.md'
    print(f"=== Starting verification of {report_path} ===")

    # 1. File exists and non-empty
    assert os.path.exists(report_path), f"ERROR: File {report_path} does not exist!"
    file_size = os.path.getsize(report_path)
    assert file_size > 10000, f"ERROR: File {report_path} is too small ({file_size} bytes)!"
    print(f"[PASS] Check 1: File exists and is non-empty ({file_size} bytes)")

    with open(report_path, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = content.splitlines()
    print(f"[PASS] Check 1b: File line count: {len(lines)} lines")

    # 2. Check all 10 lessons have their dedicated section
    expected_lessons = [
        "Урок 01 — Введение (11 файлов)",
        "Урок 02 — Разметка и структура (33 файла)",
        "Урок 03 — Flexbox и адаптивность (28 файлов)",
        "Урок 04 — JavaScript и DOM (31 файл)",
        "Урок 05 — Каталог и карточки (28 файлов)",
        "Урок 06 — Формы и валидация (27 файлов)",
        "Урок 07 — Слайдер (24 файла)",
        "Урок 08 — Поиск и фильтрация (31 файл)",
        "Урок 09 — Финал и сборка проекта (13 файлов)",
        "Урок 10 — Troubleshooting (5 файлов)",
    ]

    for l_title in expected_lessons:
        header = f"## {l_title}"
        assert header in content, f"ERROR: Lesson header '{header}' not found in report!"
    print(f"[PASS] Check 2: All 10 lesson sections exist with exact names")

    # 3. Check all 231 files from content/lessons/** appear in report
    actual_files = sorted(glob.glob('content/lessons/**/*.md', recursive=True))
    assert len(actual_files) == 231, f"ERROR: Expected 231 lesson files, found {len(actual_files)}!"
    
    missing_files = []
    found_headers = 0
    for af in actual_files:
        fname = os.path.basename(af)
        pattern = rf"###\s+`{re.escape(fname)}`"
        if not re.search(pattern, content):
            missing_files.append(fname)
        else:
            found_headers += 1

    assert len(missing_files) == 0, f"ERROR: Missing files in report: {missing_files}"
    assert found_headers == 231, f"ERROR: Found {found_headers} file headers, expected 231!"
    print(f"[PASS] Check 3: All 231 files have dedicated ### `filename` headers (100% coverage)")

    # 4. Check all 6 tags are present
    expected_tags = ["[ОШИБКА]", "[ПЛАВНОСТЬ]", "[ЗАДАНИЕ]", "[ПОДАЧА]", "[ПРОБЕЛ]", "[ДУБЛИРОВАНИЕ]"]
    for tag in expected_tags:
        count = content.count(f"`{tag}`") + content.count(f"{tag}")
        assert count > 0, f"ERROR: Tag {tag} not found in report!"
        print(f"       Tag {tag}: {count} occurrences")
    print(f"[PASS] Check 4: All 6 issue tags are present")

    # 5. Check all 4 priorities are present
    expected_prios = ["Критический", "Высокий", "Средний", "Низкий"]
    for prio in expected_prios:
        count = content.count(f"`{prio}`") + content.count(f"**Приоритет:** `{prio}`")
        assert count > 0, f"ERROR: Priority {prio} not found in report!"
    print(f"[PASS] Check 5: All 4 priority levels are present")

    # 6. Parse and verify summary table vs itemized counts
    tbl_lines = []
    in_tbl = False
    for l in lines:
        if l.startswith('| Урок |'):
            in_tbl = True
        if in_tbl:
            tbl_lines.append(l)
            if 'ИТОГО' in l:
                break
    
    # Filter separator and header
    data_rows = [r for r in tbl_lines if not re.match(r'^\|[\s\-:|]+\|$', r) and not 'Всего файлов' in r]
    assert len(data_rows) == 11, f"ERROR: Expected 10 lesson rows + 1 total row, got {len(data_rows)}"
    
    total_row = data_rows[-1]
    tot_cols = [c.strip() for c in total_row.split('|')[1:-1]]
    tot_files_val = int(tot_cols[1])
    tot_clean_val = int(tot_cols[2])
    tot_issue_val = int(tot_cols[3])
    
    assert tot_files_val == 231, f"ERROR: Summary table total files is {tot_files_val}, expected 231"
    assert tot_clean_val + tot_issue_val == 231, f"ERROR: Clean ({tot_clean_val}) + Issue ({tot_issue_val}) != 231"
    print(f"[PASS] Check 6: Summary table totals match: 231 files ({tot_clean_val} clean, {tot_issue_val} with issues)")

    # 7. Check Known Issues section (1-7)
    assert "## Анализ и статус Known Issues (1–7)" in content, "ERROR: Known Issues section not found!"
    for ki_num in range(1, 8):
        ki_pattern = rf"###\s+{ki_num}\."
        assert re.search(ki_pattern, content), f"ERROR: Known Issue {ki_num} heading not found!"
    print(f"[PASS] Check 7: All 7 Known Issues thoroughly documented and verified")

    # 8. Check that all issue items have valid properties
    sections = re.split(r'\n###\s+`', content)[1:]
    assert len(sections) == 231, f"ERROR: Expected 231 file sections, got {len(sections)}"

    clean_count = 0
    issue_count = 0
    problem_count = 0

    for s in sections:
        fname = s.split('`')[0]
        if "Без замечаний" in s:
            clean_count += 1
            assert "**Статус:** Без замечаний" in s, f"Clean file {fname} missing standard status line"
            assert "**Файл:**" in s, f"Clean file {fname} missing path"
        else:
            issue_count += 1
            assert "**Файл:**" in s, f"Issue file {fname} missing path"
            assert "**Тип:**" in s, f"Issue file {fname} missing type"
            assert "**Приоритет:**" in s, f"Issue file {fname} missing priority"
            assert "**Строки:**" in s, f"Issue file {fname} missing lines"
            assert "**Проблема:**" in s, f"Issue file {fname} missing problem"
            assert "**Правка:**" in s, f"Issue file {fname} missing fix"
            problem_count += s.count("**Тип:**")

    assert clean_count == tot_clean_val, f"Itemized clean count ({clean_count}) != table clean ({tot_clean_val})"
    assert issue_count == tot_issue_val, f"Itemized issue count ({issue_count}) != table issues ({tot_issue_val})"
    print(f"[PASS] Check 8: Itemized sections perfectly match table: {clean_count} clean, {issue_count} issue files, {problem_count} total problems")

    print("\n==========================================")
    print(">>> ALL VERIFICATION CHECKS PASSED (10/10) <<<")
    print("==========================================")
    return True

if __name__ == '__main__':
    run_verification()
