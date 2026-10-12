import re

with open("content/AUDIT_REPORT.md", "r", encoding="utf-8") as f:
    text = f.read()

for target in ["00-theory-01-js-basics.md", "00-theory-05-create.md"]:
    m = re.search(rf"### `{target}`.*?(?=\n### `|\Z)", text, re.DOTALL)
    if m:
        with open(f".agents/teamwork/challenger_2/{target}.txt", "w", encoding="utf-8") as out:
            out.write(m.group(0))
        print(f"Wrote {target}.txt")
