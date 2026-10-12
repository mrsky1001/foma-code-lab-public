"""
Extracts and builds complete verification rules for all 113 issues.
"""
import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load all 113 issues from test_writer_e2e_1/parsed_all_113.json
issues_113 = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

# Load survey 1 and survey 2
s1_snippets = json.load(open('.agents/teamwork/spec_miner_survey_1/parsed_60_with_snippets.json', encoding='utf-8'))
s2_text = open('.agents/teamwork/spec_miner_survey_2/survey_report.md', encoding='utf-8').read()

print(f"Loaded {len(issues_113)} issues.")
