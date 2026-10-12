import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

from compile_complete_dataset import parse_m1
from compile_m2_test import parse_m2
from compile_m3_test import parse_m3

m1 = parse_m1()
m2 = parse_m2()
m3 = parse_m3()

# Let's inspect a few samples of generated text for M1, M2, M3
def format_item(item):
    out = []
    fname = item['fname']
    rel_path = item['rel_path']
    if item['is_clean']:
        out.append(f"### `{fname}` — без замечаний")
        out.append(f"**Файл:** `{rel_path}`")
        out.append("**Статус:** Без замечаний")
        if item.get('comment'):
            out.append(f"**Примечание:** {item['comment']}")
        out.append("")
    else:
        probs = item['problems']
        if len(probs) == 1:
            p = probs[0]
            title = p['title'] if p['title'] else "Обнаружено замечание"
            out.append(f"### `{fname}` — {title}")
            out.append(f"**Тип:** `{p['type']}`")
            out.append(f"**Приоритет:** `{p['priority']}`")
            out.append(f"**Файл:** `{rel_path}`")
            out.append(f"**Строки:** `{p['lines']}`")
            out.append(f"**Проблема:** {p['problem']}")
            out.append(f"**Правка:**\n{p['fix']}")
            out.append("")
        else:
            out.append(f"### `{fname}` — Комплексные замечания ({len(probs)} проблемы)")
            out.append(f"**Файл:** `{rel_path}`")
            out.append(f"**Статус:** С замечаниями ({len(probs)} проблемы)")
            out.append("")
            for idx, p in enumerate(probs, 1):
                title = p['title'] if p['title'] else f"Проблема {idx}"
                out.append(f"#### Проблема {idx}: {title}")
                out.append(f"**Тип:** `{p['type']}`")
                out.append(f"**Приоритет:** `{p['priority']}`")
                out.append(f"**Файл:** `{rel_path}`")
                out.append(f"**Строки:** `{p['lines']}`")
                out.append(f"**Проблема:** {p['problem']}")
                out.append(f"**Правка:**\n{p['fix']}")
                out.append("")
    return "\n".join(out)

print("Sample M1 Issue:")
print(format_item(m1[0]))

print("Sample M1 Clean:")
print(format_item(m1[1]))

print("Sample M2 Multi:")
print(format_item(m2[0]))

print("Sample M3 Issue:")
print(format_item(m3[0]))
