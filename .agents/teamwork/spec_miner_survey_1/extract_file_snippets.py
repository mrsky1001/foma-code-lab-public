import json
import os
import re

REPO_ROOT = r"d:\IEEU International East-European University\foma-code-lab"

with open(r"d:\IEEU International East-European University\foma-code-lab\.agents\teamwork\spec_miner_survey_1\parsed_60.json", "r", encoding="utf-8") as f:
    data = json.load(f)

def parse_line_ranges(line_str):
    cleaned = line_str.replace('`', '').replace('строки', '').replace('строка', '').strip()
    cleaned = cleaned.replace('–', '-').replace('—', '-')
    ranges = []
    parts = [p.strip() for p in cleaned.split(',') if p.strip()]
    for p in parts:
        if '-' in p:
            sub = p.split('-')
            try:
                ranges.append((int(sub[0].strip()), int(sub[1].strip())))
            except ValueError:
                pass
        else:
            try:
                n = int(p.strip())
                ranges.append((n, n))
            except ValueError:
                pass
    return ranges

for it in data:
    fpath = os.path.join(REPO_ROOT, it['file_path'].replace('/', os.sep))
    if not os.path.exists(fpath):
        print(f"MISSING FILE: {fpath}")
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        file_lines = f.readlines()
    
    ranges = parse_line_ranges(it['lines'])
    snippets = []
    for s, e in ranges:
        # 1-indexed to 0-indexed
        start_idx = max(0, s - 1)
        end_idx = min(len(file_lines), e)
        sub_snippet = "".join(file_lines[start_idx:end_idx])
        snippets.append(f"--- Lines {s}-{e} ---\n{sub_snippet}")
    it['actual_file_snippets'] = "\n".join(snippets)

with open(r"d:\IEEU International East-European University\foma-code-lab\.agents\teamwork\spec_miner_survey_1\parsed_60_with_snippets.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Finished extracting target file snippets for all 60 issues.")
