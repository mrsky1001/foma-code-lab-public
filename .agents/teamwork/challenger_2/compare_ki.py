import re

with open("content/AUDIT_REPORT.md", "r", encoding="utf-8") as f:
    text = f.read()

# Extract Known Issues preamble
ki_section = re.search(r'## Анализ и статус Known Issues \(1–7\)(.*?)(?=\n## Урок 01)', text, re.DOTALL).group(1)

ki_blocks = re.split(r'\n(?=### \d+\.)', ki_section)[1:]
for b in ki_blocks:
    title = b.strip().splitlines()[0]
    tipo = re.search(r'- \*\*Тип:\*\*\s*(.+)', b)
    prio = re.search(r'- \*\*Приоритет:\*\*\s*(.+)', b)
    print(f"Preamble: {title}")
    print(f"  Tipo: {tipo.group(1) if tipo else 'N/A'}")
    print(f"  Prio: {prio.group(1) if prio else 'N/A'}")

print("\nCorresponding entries in Lesson sections:")
targets = [
    ("01-intro/08-html-structure.md", "08-html-structure.md"),
    ("02-markup/00-theory-01-doctype.md", "00-theory-01-doctype.md"),
    ("02-markup/00-theory-06b-variables.md", "00-theory-06b-variables.md"),
    ("01-intro/07-images.md", "07-images.md"),
    ("01-intro/04-paragraphs.md", "04-paragraphs.md"),
    ("04-js-dom/00-theory-01-js-basics.md", "00-theory-01-js-basics.md"),
    ("01-intro/06-links.md", "06-links.md"),
    ("03-flexbox/00-theory-04-card.md", "00-theory-04-card.md")
]

for rel_f, fn in targets:
    m = re.search(rf"### `{fn}`.*?(?=\n### `|\n## Урок|\Z)", text, re.DOTALL)
    if m:
        entry = m.group(0)
        types = re.findall(r'\*\*Тип:\*\*\s*(.+)', entry)
        prios = re.findall(r'\*\*Приоритет:\*\*\s*(.+)', entry)
        print(f"Entry `{rel_f}`: Types={types}, Prios={prios}")
