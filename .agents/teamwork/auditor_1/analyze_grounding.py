import pathlib
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

report_path = pathlib.Path('content/AUDIT_REPORT.md')
report_text = report_path.read_text(encoding='utf-8')

lines = report_text.splitlines()

# Parse all 113 issues with exact report line numbers
parsed = []
current = {}
for i, line in enumerate(lines):
    if line.startswith('### `') or (line.startswith('### ') and not line.startswith('### Урок') and not line.startswith('### 1.') and not line.startswith('### 2.') and not line.startswith('### 3.') and not line.startswith('### 4.') and not line.startswith('### 5.') and not line.startswith('### 6.') and not line.startswith('### 7.')):
        # New entry
        pass

# Let's use our existing parsed_issues from audit_grounding_checker.py
import audit_grounding_checker
issues = audit_grounding_checker.parsed_issues

print(f"\nAnalyzing grounding for all {len(issues)} issues...")

grounding_results = []
for idx, iss in enumerate(issues):
    f_path = iss['file'].strip('`" ')
    target = pathlib.Path(f_path)
    if not target.exists():
        grounding_results.append({
            'index': idx,
            'file': f_path,
            'status': 'FILE_NOT_FOUND',
            'details': 'File does not exist'
        })
        continue
    
    file_lines = target.read_text(encoding='utf-8').splitlines()
    total_lines = len(file_lines)
    
    # Parse line numbers from iss['lines']
    nums = [int(n) for n in re.findall(r'\b\d+\b', iss['lines'])]
    
    # Check key terms in problem and fix
    prob_text = iss['problem']
    fix_text = iss['fix']
    
    # Extract identifiers or code tokens from problem/fix (e.g. backticked terms)
    code_tokens = re.findall(r'`([^`]+)`', prob_text + " " + fix_text)
    
    # Check if code tokens appear in the file
    matched_tokens = [tok for tok in code_tokens if any(tok in l for l in file_lines)]
    
    grounding_results.append({
        'index': idx,
        'header': iss['header'],
        'file': f_path,
        'reported_lines': iss['lines'],
        'nums': nums,
        'total_lines': total_lines,
        'tag': iss['tag'],
        'prio': iss['prio'],
        'code_tokens': code_tokens,
        'matched_tokens': matched_tokens,
        'token_match_rate': len(matched_tokens) / max(1, len(code_tokens))
    })

print(f"Total processed: {len(grounding_results)}")
token_match_rates = [g['token_match_rate'] for g in grounding_results if g.get('code_tokens')]
print(f"Average token match rate in target file: {sum(token_match_rates)/len(token_match_rates):.1%}")

low_matches = [g for g in grounding_results if g['token_match_rate'] < 0.2 and len(g['code_tokens']) > 2]
print(f"Issues with low token match rate (< 20%): {len(low_matches)}")
for lm in low_matches:
    print(f"  Issue {lm['index']}: {lm['file']} - {lm['header']}")
    print(f"    Tokens: {lm['code_tokens']}")
    print(f"    Matched: {lm['matched_tokens']}")
