import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8') as f:
    audit_issues = json.load(f)

m1_audit = [x['filename'] for x in audit_issues if x['milestone'] == 'M1']
print(f"M1 in AUDIT_REPORT.md ({len(m1_audit)}):", m1_audit)

with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', encoding='utf-8') as f:
    m1_find_text = f.read()

m1_findings_files = re.findall(r'#### \d+\.\s+`([^`]+)`', m1_find_text)
print(f"M1 in audit_findings.md ({len(m1_findings_files)}):", m1_findings_files)

diff = set(m1_audit) - set(m1_findings_files)
print("Difference (in AUDIT_REPORT but not findings):", diff)
diff2 = set(m1_findings_files) - set(m1_audit)
print("Difference (in findings but not AUDIT_REPORT):", diff2)
