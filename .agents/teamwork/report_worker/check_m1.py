import os
import re

def check_m1_details():
    with open('.agents/teamwork/audit_explorer_m1/audit_findings.md', 'r', encoding='utf-8') as f:
        text = f.read()

    sections = re.split(r'####\s+\d+\.\s+', text)[1:]
    
    lesson_stats = {}
    type_stats = {}
    prio_stats = {}

    for idx, s in enumerate(sections, 1):
        fl = s.split('\n')[0]
        m = re.search(r'`([^`]+)`', fl)
        fn = m.group(1) if m else fl
        has_clean = 'без замечаний' in s.lower()
        types = re.findall(r'- \*\*Тип:\*\*\s+`?\[([^\]]+)\]`?', s)
        prios = re.findall(r'- \*\*Приоритет:\*\*\s+([^\n]+)', s)
        
        # Determine lesson from file path in section or index
        path_m = re.search(r'content/lessons/([^/]+)/', s)
        lesson = path_m.group(1) if path_m else 'unknown'
        
        if lesson not in lesson_stats:
            lesson_stats[lesson] = {'total': 0, 'clean': 0, 'issues': 0, 'types': {}, 'prios': {}}
            
        lesson_stats[lesson]['total'] += 1
        if has_clean:
            lesson_stats[lesson]['clean'] += 1
        else:
            lesson_stats[lesson]['issues'] += len(types)
            for t in types:
                type_stats[t] = type_stats.get(t, 0) + 1
                lesson_stats[lesson]['types'][t] = lesson_stats[lesson]['types'].get(t, 0) + 1
            for p in prios:
                p_clean = p.strip()
                prio_stats[p_clean] = prio_stats.get(p_clean, 0) + 1
                lesson_stats[lesson]['prios'][p_clean] = lesson_stats[lesson]['prios'].get(p_clean, 0) + 1

    print('=== M1 LESSON STATS ===')
    for l, st in lesson_stats.items():
        print(f"{l}: total={st['total']}, clean={st['clean']}, issues={st['issues']}, types={st['types']}, prios={st['prios']}")
    print('\n=== M1 TOTAL TYPES ===')
    for t, c in type_stats.items():
        print(f"{t}: {c}")
    print('\n=== M1 TOTAL PRIOS ===')
    for p, c in prio_stats.items():
        print(f"{p}: {c}")

if __name__ == '__main__':
    check_m1_details()
