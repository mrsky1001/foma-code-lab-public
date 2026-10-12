import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))
p60 = json.load(open('.agents/teamwork/spec_miner_survey_1/parsed_60_with_snippets.json', encoding='utf-8'))

print("Parsed 113 count:", len(data))
print("Parsed 60 count:", len(p60))

# Compare paths for 1..60
mismatches_60 = []
for i in range(60):
    d_path = data[i]['file_path']
    p_path = p60[i]['file_path']
    if d_path != p_path:
        mismatches_60.append((data[i]['id'], d_path, p_path))
print("Mismatches in first 60:", mismatches_60)

# Check survey 2 (61..113)
survey2_text = open('.agents/teamwork/spec_miner_survey_2/survey_report.md', encoding='utf-8').read()
blocks = re.split(r'\n(?=### Issue #\d+:)', survey2_text)
s2_dict = {}
for b in blocks:
    m_id = re.search(r'### Issue #(\d+):', b)
    m_f = re.search(r'Affected File Path:\*\*\s*`([^`]+)`', b)
    if m_id and m_f:
        s2_dict[int(m_id.group(1))] = m_f.group(1).strip()
print("Survey 2 parsed affected files:", len(s2_dict))

mismatches_s2 = []
for x in data[60:]:
    num = x['id']
    if num in s2_dict and s2_dict[num] != x['file_path']:
        mismatches_s2.append((num, x['file_path'], s2_dict[num]))
print("Mismatches in 61..113:", mismatches_s2)

