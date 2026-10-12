import re

with open("content/AUDIT_REPORT.md", "r", encoding="utf-8") as f:
    text = f.read()

targets = [
    "08-flex-body.md",
    "07-grid-container-html.md",
    "17-nav-highlight-others.md",
    "21-auth-logout-event.md",
    "23-auth-logged-out.md",
    "00-theory-06-fetch.md",
    "00-theory-07-tabs.md",
    "21-data-mock-bookings.md",
    "00-theory-05-storage.md",
    "00-theory-06-modal.md"
]

for t in targets:
    m = re.search(rf"### `{t}`.*?(?=\n### `|\Z)", text, re.DOTALL)
    if m:
        entry = m.group(0)
        lines_m = re.search(r'\*\*Строки:\*\*\s*(.+)', entry)
        prob_m = re.search(r'\*\*Проблема:\*\*\s*(.+)', entry)
        print("="*60)
        print(f"Target: {t}")
        print(f"Lines spec: {lines_m.group(1) if lines_m else 'N/A'}")
        print(f"Problem: {prob_m.group(1) if prob_m else 'N/A'}")
