import os
import re

base_dir = r"d:\IEEU International East-European University\foma-code-lab\content\lessons"
lessons = ["04-js-dom", "05-catalog", "06-forms"]

all_files = {}

for l in lessons:
    ldir = os.path.join(base_dir, l)
    fnames = sorted([f for f in os.listdir(ldir) if f.endswith(".md")])
    all_files[l] = []
    for fn in fnames:
        fp = os.path.join(ldir, fn)
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
        all_files[l].append({
            "name": fn,
            "path": f"content/lessons/{l}/{fn}",
            "lines": content.splitlines(),
            "content": content
        })

print({l: len(all_files[l]) for l in all_files})
