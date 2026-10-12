import json
import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/spec_miner_survey_2/survey_report.md', encoding='utf-8') as f:
    text = f.read()

issue_blocks = re.findall(r'(### Issue #(\d+):[^\n]+\n[\s\S]*?)(?=(?:### Issue #\d+:)|\Z)', text)
print(f"Parsed {len(issue_blocks)} issue blocks from survey_report.md (miner 2).")

m2_issues = []
for full_block, num_str in issue_blocks:
    num = int(num_str)
    m_title = re.search(r'### Issue #\d+:\s*([^\n]+)', full_block)
    m_file = re.search(r'- \*\*Affected File Path:\*\*\s*`([^`]+)`', full_block)
    m_prob = re.search(r'#### Problem Description\n([\s\S]*?)(?=#### Proposed Replacement|\Z)', full_block)
    m_fix = re.search(r'#### Proposed Replacement / Fix Specification\n([\s\S]*?)(?=---|\Z)', full_block)
    
    m2_issues.append({
        "id": num,
        "title": m_title.group(1).strip() if m_title else "",
        "file_path": m_file.group(1).strip() if m_file else "",
        "problem": m_prob.group(1).strip() if m_prob else "",
        "fix": m_fix.group(1).strip() if m_fix else "",
        "full_block": full_block
    })

print(f"Extracted {len(m2_issues)} issues from miner 2 (IDs {m2_issues[0]['id']} to {m2_issues[-1]['id']})")
