"""
Builds precise, authoritative verification rules for all 113 issues.
Verifies each rule against current baseline repository files:
- baseline must FAIL (fixed_pattern not in file, or flawed_pattern in file, or frontmatter mismatch)
"""

import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Load sources
data_113 = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))
survey1_snippets = json.load(open('.agents/teamwork/spec_miner_survey_1/parsed_60_with_snippets.json', encoding='utf-8'))

# Read survey 2 text
with open('.agents/teamwork/spec_miner_survey_2/survey_report.md', encoding='utf-8') as f:
    s2_text = f.read()

s2_blocks = re.split(r'\n(?=### Issue #\d+:)', s2_text)
s2_map = {}
for b in s2_blocks:
    m_id = re.search(r'### Issue #(\d+):', b)
    if m_id:
        s2_map[int(m_id.group(1))] = b

print(f"Loaded 113 issues, survey1 {len(survey1_snippets)} items, survey2 {len(s2_map)} items.")
