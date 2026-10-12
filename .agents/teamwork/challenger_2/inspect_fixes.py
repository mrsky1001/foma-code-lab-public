import re

with open("content/AUDIT_REPORT.md", "r", encoding="utf-8") as f:
    text = f.read()

targets = [
    "08-flex-body.md",
    "07-grid-container-html.md",
    "21-auth-logout-event.md",
    "00-theory-06-fetch.md",
    "00-theory-06-modal.md"
]

with open(".agents/teamwork/challenger_2/fixes_out_utf8.txt", "w", encoding="utf-8") as out:
    for t in targets:
        pos = text.find(f"### `{t}`")
        if pos != -1:
            chunk = text[pos:pos+2500]
            m_end = re.search(r'\n(### `|## Урок)', chunk[10:])
            if m_end:
                chunk = chunk[:10 + m_end.start()]
            out.write("="*70 + "\n")
            out.write(f"FILE: {t}\n")
            out.write(chunk + "\n\n")
