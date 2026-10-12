"""
Builds the complete scripts/audit_fix_rules.json with block-aware checks.
Validates baseline: exactly 0/113 passed, 113 failed.
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

raw_issues = json.load(open('.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

def parse_file(content):
    fm_match = re.match(r'^---\r?\n([\s\S]*?)\r?\n---', content)
    fm = fm_match.group(1) if fm_match else ""
    body = content[fm_match.end():] if fm_match else content

    blocks = {}
    for m in re.finditer(r'```(\w+):(\w+)\r?\n([\s\S]*?)```', body):
        blocks[f"{m.group(1)}:{m.group(2)}"] = m.group(3)

    task_match = re.search(r'## 🛠 Задание\r?\n([\s\S]*?)(?=(?:```|\n## |\Z))', body)
    task_text = task_match.group(1) if task_match else ""

    return {
        "fm": fm,
        "body": body,
        "blocks": blocks,
        "task": task_text,
        "full": content
    }

CHECK_DEFINITIONS = {
    # M1 (1..34)
    1: [
        {"type": "presence_file", "pattern": "const btn = document.querySelector('.btn');"},
        {"type": "absence_file", "pattern": "btn.addEventListener('click', () => alert('Забронировано!'));"}
    ],
    2: [
        {"type": "absence_file", "pattern": "## Блочные vs строчные элементы"},
        {"type": "presence_file", "pattern": "СмартОфис"}
    ],
    3: [
        {"type": "presence_file", "pattern": 'rel="noopener noreferrer"'}
    ],
    4: [
        {"type": "absence_block", "block": "html:solution", "pattern": 'loading="lazy"'}
    ],
    5: [
        {"type": "presence_file", "pattern": "базовый фундамент"}
    ],
    6: [
        {"type": "presence_block", "block": "html:start", "pattern": "<!DOCTYPE html>"}
    ],
    7: [
        {"type": "presence_block", "block": "task", "pattern": "border-radius: 4px"}
    ],
    8: [
        {"type": "presence_block", "block": "css:start", "pattern": "text-decoration: none;"}
    ],
    9: [
        {"type": "presence_file", "pattern": "Quirks Mode"}
    ],
    10: [
        {"type": "absence_block", "block": "html:solution", "pattern": '<link rel="stylesheet" href="css/style.css">'}
    ],
    11: [
        {"type": "presence_block", "block": "task", "pattern": "--brand-dark"}
    ],
    12: [
        {"type": "presence_block", "block": "css:solution", "pattern": "padding: 0 20px;"},
        {"type": "absence_block", "block": "css:solution", "pattern": "padding: 0 16px;"}
    ],
    13: [
        {"type": "presence_block", "block": "css:solution", "pattern": "align-items: flex-start;"}
    ],
    14: [
        {"type": "presence_block", "block": "html:solution", "pattern": "family=Inter:wght@400;500;600;700&display=swap"}
    ],
    15: [
        {"type": "presence_file", "pattern": "```css:start"},
        {"type": "presence_file", "pattern": "```css:solution"},
        {"type": "absence_block", "block": "css:solution", "pattern": "min-width: 1200px;"}
    ],
    16: [
        {"type": "presence_block", "block": "css:solution", "pattern": "max-width: 1200px;"},
        {"type": "absence_block", "block": "css:solution", "pattern": "width: 1200px;"}
    ],
    17: [
        {"type": "absence_block", "block": "html:start", "pattern": 'id="authNavBtn">Войти</a>'}
    ],
    18: [
        {"type": "absence_block", "block": "html:start", "pattern": 'id="authNavBtn">Войти</a>'}
    ],
    19: [
        {"type": "absence_block", "block": "html:start", "pattern": 'id="authNavBtn">Войти</a>'}
    ],
    20: [
        {"type": "presence_block", "block": "html:start", "pattern": '<div class="hero-bottom">'}
    ],
    21: [
        {"type": "presence_block", "block": "html:start", "pattern": "footer-info"}
    ],
    22: [
        {"type": "absence_block", "block": "css:solution", "pattern": ".btn:focus"}
    ],
    23: [
        {"type": "presence_file", "pattern": "предотвращают искажение"}
    ],
    24: [
        {"type": "absence_block", "block": "css:start", "pattern": ".room-card {"}
    ],
    25: [
        {"type": "absence_block", "block": "css:start", "pattern": ".card-content {"}
    ],
    26: [
        {"type": "presence_file", "pattern": "## 🛠 Задание"}
    ],
    27: [
        {"type": "presence_file", "pattern": "факультатив"}
    ],
    28: [
        {"type": "presence_block", "block": "html:start", "pattern": "pages/room-details.html"},
        {"type": "absence_block", "block": "html:start", "pattern": "pages/catalog.html"}
    ],
    29: [
        {"type": "presence_block", "block": "html:solution", "pattern": 'class="card-title-link"'},
        {"type": "absence_block", "block": "html:solution", "pattern": 'style="text-decoration: none; color: inherit;"'}
    ],
    30: [
        {"type": "presence_file", "pattern": "заполним в шаге 18"}
    ],
    31: [
        {"type": "absence_block", "block": "html:start", "pattern": "Забронировать"}
    ],
    32: [
        {"type": "absence_block", "block": "html:start", "pattern": "Забронировать"}
    ],
    33: [
        {"type": "absence_block", "block": "task", "pattern": '<img src="..." alt="...">'},
        {"type": "presence_block", "block": "task", "pattern": "Офис у метро"}
    ],
    34: [
        {"type": "absence_block", "block": "html:start", "pattern": 'class="center-action"'}
    ],

    # M2 (35..58)
    35: [
        {"type": "presence_file", "pattern": "## Условные конструкции: if / else"}
    ],
    36: [
        {"type": "absence_block", "block": "js:solution", "pattern": "console.log('Открыт ли офис:', isOpen);"}
    ],
    37: [
        {"type": "presence_file", "pattern": "Метод `querySelector`"}
    ],
    38: [
        {"type": "presence_file", "pattern": "уроке 05"}
    ],
    39: [
        {"type": "absence_file", "pattern": "</div>                        ← afterend"}
    ],
    40: [
        {"type": "presence_file", "pattern": "// Слушатель событий"}
    ],
    41: [
        {"type": "presence_file", "pattern": '// HTML: <button id="mainBtn">Нажми меня</button>'},
        {"type": "absence_file", "pattern": '// HTML: <button id="mainBtn">Забронировать</button>'}
    ],
    42: [
        {"type": "presence_block", "block": "html:solution", "pattern": 'id="alertBox"'},
        {"type": "absence_block", "block": "html:solution", "pattern": 'id="alert"'}
    ],
    43: [
        {"type": "presence_file", "pattern": "Метод `getElementById`"}
    ],
    44: [
        {"type": "presence_block", "block": "task", "pattern": "toast-success"}
    ],
    45: [
        {"type": "presence_block", "block": "task", "pattern": "navLinks"},
        {"type": "absence_block", "block": "task", "pattern": "for (let i = 0; i < links.length; i++)"}
    ],
    46: [
        {"type": "presence_file", "pattern": "currentPath"}
    ],
    47: [
        {"type": "presence_block", "block": "task", "pattern": "дополните условие"}
    ],
    48: [
        {"type": "presence_block", "block": "task", "pattern": "link.getAttribute('href')"}
    ],
    49: [
        {"type": "presence_file", "pattern": "Мы используем authNavBtn.onclick"}
    ],
    50: [
        {"type": "presence_block", "block": "task", "pattern": "if (myBookingsNavItem)"}
    ],
    51: [
        {"type": "presence_file", "pattern": "симулируем работу сервера с помощью файла `js/data.js`"}
    ],
    52: [
        {"type": "presence_file", "pattern": "Факультативный компонент"}
    ],
    53: [
        {"type": "absence_block", "block": "html:solution", "pattern": "const OFFICE_ROOMS = ["}
    ],
    54: [
        {"type": "absence_block", "block": "html:start", "pattern": 'id="catalogContainer"'}
    ],
    55: [
        {"type": "absence_file", "pattern": "карточками появились запятые"}
    ],
    56: [
        {"type": "presence_block", "block": "html:start", "pattern": "<title>СмартОфис — Коворкинг</title>"},
        {"type": "absence_block", "block": "html:start", "pattern": "<title>Каталог офисов — СмартОфис</title>"}
    ],
    57: [
        {"type": "absence_block", "block": "html:solution", "pattern": "const OFFICE_ROOMS = ["}
    ],
    58: [
        {"type": "presence_block", "block": "js:start", "pattern": "const OFFICE_ROOMS = ["},
        {"type": "absence_block", "block": "js:start", "pattern": "document.addEventListener('DOMContentLoaded'"}
    ],

    # M3 (59..81)
    59: [
        {"type": "presence_file", "pattern": "Объект FormData идеален"}
    ],
    60: [
        {"type": "presence_file", "pattern": "remember me"}
    ],
    61: [
        {"type": "presence_file", "pattern": "альтернативный паттерн"}
    ],
    62: [
        {"type": "absence_block", "block": "html:solution", "pattern": '<input type="text" id="login"'}
    ],
    63: [
        {"type": "absence_block", "block": "html:start", "pattern": '<input type="text" id="login"'}
    ],
    64: [
        {"type": "absence_block", "block": "html:solution", "pattern": '<input type="text" id="login"'}
    ],
    65: [
        {"type": "absence_block", "block": "html:start", "pattern": '<input type="text" id="login"'}
    ],
    66: [
        {"type": "presence_block", "block": "js:solution", "pattern": "showToast('Неверный логин или пароль', 'error');"},
        {"type": "absence_block", "block": "js:solution", "pattern": "showToast('Неверный логин или пароль', 'success');"}
    ],
    67: [
        {"type": "absence_block", "block": "task", "pattern": "вызов обеих новых функций"}
    ],
    68: [
        {"type": "presence_file", "pattern": "Точкой отсчёта для absolute"}
    ],
    69: [
        {"type": "presence_file", "pattern": "начальный вызов render"}
    ],
    70: [
        {"type": "absence_file", "pattern": "Включить тёмную тему"}
    ],
    71: [
        {"type": "presence_block", "block": "task", "pattern": "startAuto"}
    ],
    72: [
        {"type": "absence_block", "block": "html:start", "pattern": '<section class="slider-section">'}
    ],
    73: [
        {"type": "absence_block", "block": "css:solution", "pattern": ".slide-img"}
    ],
    74: [
        {"type": "presence_block", "block": "css:start", "pattern": ".slider-section"}
    ],
    75: [
        {"type": "presence_block", "block": "css:start", "pattern": ".slide-img"},
        {"type": "absence_block", "block": "css:solution", "pattern": ".slider-btn"}
    ],
    76: [
        {"type": "presence_block", "block": "html:solution", "pattern": 'aria-label="Предыдущий слайд"'}
    ],
    77: [
        {"type": "presence_block", "block": "html:solution", "pattern": 'role="button"'}
    ],
    78: [
        {"type": "absence_block", "block": "js:solution", "pattern": "initSlider();"}
    ],
    79: [
        {"type": "absence_block", "block": "js:solution", "pattern": "clearInterval(timerId)"}
    ],
    80: [
        {"type": "absence_block", "block": "js:start", "pattern": "clearInterval(timerId)"}
    ],
    81: [
        {"type": "absence_block", "block": "js:start", "pattern": "initSlider();"}
    ],

    # M4 (82..113)
    82: [
        {"type": "presence_file", "pattern": "почему в проекте мы обходимся без debounce"}
    ],
    83: [
        {"type": "presence_file", "pattern": "для простых списков"}
    ],
    84: [
        {"type": "presence_file", "pattern": "два сценария: выбор времени"}
    ],
    85: [
        {"type": "presence_block", "block": "html:solution", "pattern": 'aria-label="Поиск комнат"'}
    ],
    86: [
        {"type": "presence_block", "block": "task", "pattern": "заменяет renderCatalog"}
    ],
    87: [
        {"type": "absence_block", "block": "js:start", "pattern": "initBookingCalc"}
    ],
    88: [
        {"type": "absence_block", "block": "js:start", "pattern": "searchInput.addEventListener('input'"}
    ],
    89: [
        {"type": "absence_block", "block": "js:start", "pattern": "renderCatalog();"}
    ],
    90: [
        {"type": "absence_block", "block": "html:start", "pattern": '<form id="bookingForm">'}
    ],
    91: [
        {"type": "absence_block", "block": "task", "pattern": "Ничего вписывать не нужно"}
    ],
    92: [
        {"type": "absence_block", "block": "js:start", "pattern": "localStorage.getItem('currentUser')"}
    ],
    93: [
        {"type": "absence_block", "block": "js:start", "pattern": "currentUser"}
    ],
    94: [
        {"type": "absence_block", "block": "js:start", "pattern": "roomSelect.innerHTML"}
    ],
    95: [
        {"type": "absence_block", "block": "js:start", "pattern": "urlParams.get('room')"}
    ],
    96: [
        {"type": "absence_block", "block": "js:start", "pattern": "displayedRooms"}
    ],
    97: [
        {"type": "absence_block", "block": "task", "pattern": "не забудьте вызвать"}
    ],
    98: [
        {"type": "presence_file", "pattern": '<script type="module" src="js/main.js"></script>'}
    ],
    99: [
        {"type": "absence_block", "block": "css:solution", "pattern": ".booking-item {"}
    ],
    100: [
        {"type": "presence_block", "block": "css:start", "pattern": ".bookings-list"}
    ],
    101: [
        {"type": "presence_block", "block": "css:start", "pattern": ".booking-card"}
    ],
    102: [
        {"type": "absence_block", "block": "js:start", "pattern": "localStorage.getItem('currentUser')"}
    ],
    103: [
        {"type": "absence_block", "block": "js:start", "pattern": "currentUser"}
    ],
    104: [
        {"type": "absence_block", "block": "js:start", "pattern": "empty-message"}
    ],
    105: [
        {"type": "absence_block", "block": "js:start", "pattern": "MOCK_BOOKINGS.map"}
    ],
    106: [
        {"type": "absence_block", "block": "js:start", "pattern": "booking-title"}
    ],
    107: [
        {"type": "absence_block", "block": "js:start", "pattern": "initMyBookings();"}
    ],
    108: [
        {"type": "frontmatter", "expected": {"type": "theory"}},
        {"type": "absence_block", "block": "html:start", "pattern": 'style="display: block;"'},
        {"type": "presence_block", "block": "html:start", "pattern": 'style="display: none;"'}
    ],
    109: [
        {"type": "frontmatter", "expected": {"type": "practice"}},
        {"type": "presence_block", "block": "js:solution", "pattern": "safeReadUser('currentUser')"}
    ],
    110: [
        {"type": "frontmatter", "expected": {"type": "practice"}},
        {"type": "presence_block", "block": "js:solution", "pattern": "bindSearchEvent();"}
    ],
    111: [
        {"type": "frontmatter", "expected": {"type": "practice"}},
        {"type": "presence_block", "block": "js:solution", "pattern": "roomData.title"}
    ],
    112: [
        {"type": "frontmatter", "expected": {"type": "practice"}},
        {"type": "presence_block", "block": "html:solution", "pattern": "<meta charset=\"UTF-8\">"}
    ],
    113: [
        {"type": "frontmatter", "expected": {"type": "practice"}},
        {"type": "presence_block", "block": "js:solution", "pattern": "debugFilterRooms(testRooms, 900);"}
    ]
}

# Compile complete rules list
compiled_rules = []
for item in raw_issues:
    iid = item['id']
    fpath = item['file_path']
    checks = CHECK_DEFINITIONS.get(iid, [])
    
    compiled_rules.append({
        "id": iid,
        "milestone": item['milestone'],
        "lesson": item['lesson'],
        "file_path": fpath,
        "defect_type": item['type'].replace('`', '').strip(),
        "priority": item['priority'].replace('`', '').strip(),
        "title": item['title'],
        "lines": item['lines'],
        "checks": checks
    })

# Save to scripts/audit_fix_rules.json
with open("scripts/audit_fix_rules.json", "w", encoding="utf-8") as f:
    json.dump(compiled_rules, f, ensure_ascii=False, indent=2)

print(f"Saved {len(compiled_rules)} rules to scripts/audit_fix_rules.json")

# Now verify on baseline
def verify_rule(rule, base_dir="."):
    fpath = os.path.join(base_dir, rule['file_path'])
    if not os.path.exists(fpath):
        return False, "file_missing"
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    parsed = parse_file(content)
    
    for chk in rule['checks']:
        ctype = chk['type']
        if ctype == 'presence_file':
            if chk['pattern'] not in parsed['full']:
                return False, f"missing_in_file: {chk['pattern'][:30]}"
        elif ctype == 'absence_file':
            if chk['pattern'] in parsed['full']:
                return False, f"flawed_in_file: {chk['pattern'][:30]}"
        elif ctype == 'presence_block':
            block_content = parsed['blocks'].get(chk['block'], "") if chk['block'] != 'task' else parsed['task']
            if chk['pattern'] not in block_content:
                return False, f"missing_in_{chk['block']}: {chk['pattern'][:30]}"
        elif ctype == 'absence_block':
            block_content = parsed['blocks'].get(chk['block'], "") if chk['block'] != 'task' else parsed['task']
            if chk['pattern'] in block_content:
                return False, f"flawed_in_{chk['block']}: {chk['pattern'][:30]}"
        elif ctype == 'frontmatter':
            for k, exp_val in chk['expected'].items():
                m = re.search(rf'^{k}:\s*(\w+)', parsed['fm'], re.MULTILINE)
                if not m or m.group(1).strip() != exp_val:
                    return False, f"fm_mismatch: {k} != {exp_val}"
    return True, "ok"

passed = []
failed = []
for r in compiled_rules:
    ok, reason = verify_rule(r)
    if ok:
        passed.append(r['id'])
    else:
        failed.append((r['id'], reason))

print(f"\nBASELINE TEST RESULTS:")
print(f"Total: {len(compiled_rules)}")
print(f"Passed: {len(passed)}")
print(f"Failed: {len(failed)}")
if passed:
    print(f"Prematurely passing IDs: {passed}")
