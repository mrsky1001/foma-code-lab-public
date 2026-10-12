import pathlib
import sys
import collections
import audit_grounding_checker

sys.stdout.reconfigure(encoding='utf-8')

issues = audit_grounding_checker.parsed_issues
print(f"Total issues to evaluate for uniqueness and substance: {len(issues)}")

# Check lengths of problem and fix
short_problems = []
short_fixes = []

problems_text = [iss['problem'] for iss in issues]
fixes_text = [iss['fix'] for iss in issues]

for i, iss in enumerate(issues):
    if len(iss['problem']) < 30:
        short_problems.append((i, iss['header'], iss['problem']))
    if len(iss['fix']) < 30:
        short_fixes.append((i, iss['header'], iss['fix']))

print(f"Short problems (< 30 chars): {len(short_problems)}")
print(f"Short fixes (< 30 chars): {len(short_fixes)}")

# Check duplicate problems or fixes (copy-paste facade detection)
prob_counts = collections.Counter(problems_text)
fix_counts = collections.Counter(fixes_text)

dup_probs = {p: c for p, c in prob_counts.items() if c > 1}
dup_fixes = {f: c for f, c in fix_counts.items() if c > 1}

print(f"Duplicate problem texts: {len(dup_probs)}")
if dup_probs:
    for p, c in dup_probs.items():
        print(f"  Count {c}: {p[:80]}...")

print(f"Duplicate fix texts: {len(dup_fixes)}")
if dup_fixes:
    for f, c in dup_fixes.items():
        print(f"  Count {c}: {f[:80]}...")

# Word count and depth
total_words = sum(len(iss['problem'].split()) + len(iss['fix'].split()) for iss in issues)
avg_words = total_words / len(issues)
print(f"\nTotal words across all 113 issues: {total_words}")
print(f"Average words per issue (problem + fix): {avg_words:.1f} words")
