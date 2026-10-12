import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def inspect_file(fpath):
    print("=" * 60)
    print(f"FILE: {fpath}")
    c = open(fpath, encoding='utf-8').read()
    # print code blocks
    for m in re.finditer(r'```(\w+):(\w+)\r?\n([\s\S]*?)```', c):
        print(f"--- Block {m.group(1)}:{m.group(2)} ({len(m.group(3).splitlines())} lines) ---")
        lines = m.group(3).splitlines()
        if len(lines) <= 10:
            print(m.group(3))
        else:
            print("\n".join(lines[:5]))
            print("...")
            print("\n".join(lines[-3:]))

# Let's inspect some of them
inspect_file('content/lessons/01-intro/08-html-structure.md')
inspect_file('content/lessons/06-forms/01-create-login-page.md')
inspect_file('content/lessons/06-forms/02-login-html-form.md')
inspect_file('content/lessons/08-search/17-booking-auth-guard.md')
inspect_file('content/lessons/09-final/01-bookings-list-css.md')
