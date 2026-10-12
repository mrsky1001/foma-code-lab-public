import sys
sys.stdout.reconfigure(encoding='utf-8')
from master_stats import by_lesson, lesson_stats

headers = [
    "Урок", "Всего файлов", "Без замечаний", "С замечаниями",
    "ОШИБКА", "ПЛАВНОСТЬ", "ЗАДАНИЕ", "ПОДАЧА", "ПРОБЕЛ", "ДУБЛИРОВАНИЕ",
    "Критический", "Высокий", "Средний", "Низкий"
]

print("| " + " | ".join(headers) + " |")
print("| " + " | ".join(["---"] * len(headers)) + " |")

tot_files = 0
tot_clean = 0
tot_issues = 0
tot_types = {"[ОШИБКА]": 0, "[ПЛАВНОСТЬ]": 0, "[ЗАДАНИЕ]": 0, "[ПОДАЧА]": 0, "[ПРОБЕЛ]": 0, "[ДУБЛИРОВАНИЕ]": 0}
tot_prios = {"Критический": 0, "Высокий": 0, "Средний": 0, "Низкий": 0}

for l, st in sorted(lesson_stats.items()):
    tot_files += st['total']
    tot_clean += st['clean']
    tot_issues += st['issue_files']
    
    t_counts = [st['types'].get(k, 0) for k in ["[ОШИБКА]", "[ПЛАВНОСТЬ]", "[ЗАДАНИЕ]", "[ПОДАЧА]", "[ПРОБЕЛ]", "[ДУБЛИРОВАНИЕ]"]]
    for idx, k in enumerate(["[ОШИБКА]", "[ПЛАВНОСТЬ]", "[ЗАДАНИЕ]", "[ПОДАЧА]", "[ПРОБЕЛ]", "[ДУБЛИРОВАНИЕ]"]):
        tot_types[k] += t_counts[idx]
        
    p_counts = [st['prios'].get(k, 0) for k in ["Критический", "Высокий", "Средний", "Низкий"]]
    for idx, k in enumerate(["Критический", "Высокий", "Средний", "Низкий"]):
        tot_prios[k] += p_counts[idx]

    row = [
        f"**{l}**",
        str(st['total']),
        str(st['clean']),
        str(st['issue_files']),
        str(t_counts[0]),
        str(t_counts[1]),
        str(t_counts[2]),
        str(t_counts[3]),
        str(t_counts[4]),
        str(t_counts[5]),
        str(p_counts[0]),
        str(p_counts[1]),
        str(p_counts[2]),
        str(p_counts[3])
    ]
    print("| " + " | ".join(row) + " |")

tot_row = [
    "**ИТОГО**",
    str(tot_files),
    str(tot_clean),
    str(tot_issues),
    str(tot_types["[ОШИБКА]"]),
    str(tot_types["[ПЛАВНОСТЬ]"]),
    str(tot_types["[ЗАДАНИЕ]"]),
    str(tot_types["[ПОДАЧА]"]),
    str(tot_types["[ПРОБЕЛ]"]),
    str(tot_types["[ДУБЛИРОВАНИЕ]"]),
    str(tot_prios["Критический"]),
    str(tot_prios["Высокий"]),
    str(tot_prios["Средний"]),
    str(tot_prios["Низкий"])
]
print("| " + " | ".join(tot_row) + " |")
