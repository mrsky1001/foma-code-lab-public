import json
data = json.load(open('d:/IEEU International East-European University/foma-code-lab/.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))
for x in data:
    if x['lesson'] in ['04-js-dom', '05-catalog']:
        print(f"ID: {x['id']}, Lines: {x['lines']}")
