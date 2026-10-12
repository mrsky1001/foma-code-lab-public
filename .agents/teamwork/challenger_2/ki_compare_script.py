import re

with open("content/AUDIT_REPORT.md", "r", encoding="utf-8") as f:
    text = f.read()

targets = [
    ("KI-1: 01-intro/08-html-structure.md", "08-html-structure.md"),
    ("KI-1: 02-markup/00-theory-01-doctype.md", "00-theory-01-doctype.md"),
    ("KI-2: 02-markup/00-theory-06b-variables.md", "00-theory-06b-variables.md"),
    ("KI-3: 01-intro/07-images.md", "07-images.md"),
    ("KI-4: 01-intro/04-paragraphs.md", "04-paragraphs.md"),
    ("KI-5: 04-js-dom/00-theory-01-js-basics.md", "00-theory-01-js-basics.md"),
    ("KI-6: 01-intro/06-links.md", "06-links.md"),
    ("KI-7: 03-flexbox/00-theory-04-card.md", "00-theory-04-card.md")
]

with open(".agents/teamwork/challenger_2/ki_comparison_results.txt", "w", encoding="utf-8") as out:
    out.write("=== COMPARISON OF KNOWN ISSUES PREAMBLE VS DETAILED ENTRIES ===\n\n")
    # Preamble:
    ki_section = re.search(r'## Анализ и статус Known Issues \(1–7\)(.*?)(?=\n## Урок 01)', text, re.DOTALL).group(1)
    for b in re.split(r'\n(?=### \d+\.)', ki_section)[1:]:
        out.write(b.strip().splitlines()[0] + "\n")
        t = re.search(r'- \*\*Тип:\*\*\s*(.+)', b)
        p = re.search(r'- \*\*Приоритет:\*\*\s*(.+)', b)
        out.write(f"  Preamble: Tipo={t.group(1) if t else None} | Prio={p.group(1) if p else None}\n")

    out.write("\n--- Itemized Lesson Entries ---\n")
    for label, fn in targets:
        # find lines starting with ### `fn`
        pos = text.find(f"### `{fn}`")
        if pos != -1:
            chunk = text[pos:pos+1500]
            # take until next ### ` or ## Урок
            m_end = re.search(r'\n(### `|## Урок)', chunk[10:])
            if m_end:
                chunk = chunk[:10 + m_end.start()]
            types = re.findall(r'\*\*Тип:\*\*\s*(.+)', chunk)
            prios = re.findall(r'\*\*Приоритет:\*\*\s*(.+)', chunk)
            lines = re.findall(r'\*\*Строки:\*\*\s*(.+)', chunk)
            out.write(f"{label}:\n")
            out.write(f"  Types: {types}\n")
            out.write(f"  Prios: {prios}\n")
            out.write(f"  Lines: {lines}\n")
            out.write(f"  Snippet: {chunk[:200].replace(chr(10), ' ')}\n\n")
