import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Sample check of actual findings against files
checks = [
    {
        'file': 'content/lessons/01-intro/01-welcome.md',
        'expect_snippet': 'btn.addEventListener',
        'lines': (25, 35)
    },
    {
        'file': 'content/lessons/01-intro/06-links.md',
        'expect_snippet': 'rel="noopener"',
        'lines': (30, 45)
    },
    {
        'file': 'content/lessons/01-intro/07-images.md',
        'expect_snippet': 'loading="lazy"',
        'lines': (40, 50)
    },
    {
        'file': 'content/lessons/02-markup/00-theory-06b-variables.md',
        'expect_snippet': '--brand-dark',
        'lines': (120, 160)
    },
    {
        'file': 'content/lessons/04-js-dom/00-theory-01-js-basics.md',
        'expect_snippet': 'console.log(\'Открыт ли офис:\', isOpen)',
        'lines': (160, 175)
    },
    {
        'file': 'content/lessons/07-slider/00-theory-01-slider-concept.md',
        'expect_snippet': None, # Let's see what problem is reported
        'lines': (1, 50)
    }
]

for c in checks:
    path = c['file']
    print(f"\n--- Checking {path} ---")
    if not os.path.exists(path):
        print(f"File NOT FOUND: {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        file_lines = f.readlines()
    
    start, end = c['lines']
    sub_lines = file_lines[start-1:end]
    print(f"Lines {start}-{end} (file total: {len(file_lines)}):")
    snippet_found = False
    for i, line in enumerate(sub_lines, start=start):
        if c['expect_snippet'] and c['expect_snippet'] in line:
            snippet_found = True
            print(f"  [{i}]: {line.strip()}  <-- MATCHED SNIPPET")
        elif i in range(start, min(start+5, end+1)):
            print(f"  [{i}]: {line.strip()[:80]}")
    if c['expect_snippet']:
        if snippet_found:
            print(f"[PASS] Expected snippet '{c['expect_snippet']}' verified in {path}!")
        else:
            print(f"[FAIL] Expected snippet '{c['expect_snippet']}' NOT found in lines {start}-{end}!")
            # Search whole file
            for i, l in enumerate(file_lines, 1):
                if c['expect_snippet'] in l:
                    print(f"  (found at line {i} instead: {l.strip()})")
