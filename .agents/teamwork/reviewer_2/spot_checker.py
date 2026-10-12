import os
import re

def spot_check():
    checks = [
        # (lesson_file, report_claim, expected_snippet_in_file)
        ('content/lessons/01-intro/01-welcome.md', 'btn.addEventListener without id="btn"', ['btn.addEventListener', '<button class="btn">']),
        ('content/lessons/01-intro/07-images.md', 'loading="lazy" on hero banner', ['loading="lazy"']),
        ('content/lessons/01-intro/08-html-structure.md', 'DOCTYPE and html skeleton', ['<!DOCTYPE html>']),
        ('content/lessons/02-markup/00-theory-01-doctype.md', 'DOCTYPE and html skeleton repeated', ['<!DOCTYPE html>']),
        ('content/lessons/02-markup/00-theory-06b-variables.md', '--brand-color and --brand-radius in task vs --brand-dark in solution', ['--brand-dark', '--brand-color']),
        ('content/lessons/01-intro/04-paragraphs.md', '<br> explained twice and block/inline table', ['<br>', 'Блочные', 'Строчные']),
        ('content/lessons/04-js-dom/00-theory-01-js-basics.md', 'boolean mentioned but no if/else explanation', ['boolean', 'true', 'false']),
        ('content/lessons/01-intro/06-links.md', 'rel="noopener" without noreferrer', ['rel="noopener"']),
        ('content/lessons/02-markup/25-room-image.md', 'overflow / object-fit in lesson 02', ['object-fit', 'overflow']),
        ('content/lessons/07-slider/00-theory-01-state.md', 'slider theory state / transition', ['currentIndex', 'slides']),
        ('content/lessons/08-search/00-theory-01-input-events.md', 'input event vs change event', ['input', 'change']),
        ('content/lessons/09-final/01-check-links.md', 'final integration check links', ['href', 'nav']),
        ('content/lessons/10-troubleshooting/01-broken-css.md', 'troubleshooting broken css', ['css', 'style']),
    ]

    for fpath, desc, snippets in checks:
        if not os.path.exists(fpath):
            print(f"FAILED: File {fpath} not found!")
            continue
        with open(fpath, 'r', encoding='utf-8') as f:
            fc = f.read()
        
        found_all = True
        missing = []
        for snip in snippets:
            if snip not in fc:
                found_all = False
                missing.append(snip)
        
        if found_all:
            print(f"[PASS] {fpath}: Verified claim ({desc})")
        else:
            print(f"[FAIL] {fpath}: Missing expected snippet {missing} for claim ({desc})")

if __name__ == '__main__':
    spot_check()
