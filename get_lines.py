import json

fixes = json.load(open('temp_fixes.json', encoding='utf-8'))

# I need to print exact lines from target file based on line ranges provided
# in parsed_all_113.json. 
data = json.load(open('d:/IEEU International East-European University/foma-code-lab/.agents/teamwork/test_writer_e2e_1/parsed_all_113.json', encoding='utf-8'))

for x in data:
    if x['lesson'] in ['04-js-dom', '05-catalog']:
        print(f"ID: {x['id']}")
        # print the lines from the file
        path = x['file_path']
        lines_str = x['lines']
        print(f"Lines: {lines_str}")
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.readlines()
            
            # just print a few lines around the problem
            # parse the first range
            first_range = lines_str.split(',')[0].strip()
            if '-' in first_range:
                start, end = map(int, first_range.split('-'))
            else:
                start = end = int(first_range)
            
            print("CONTENT:")
            for i in range(max(0, start-2), min(len(content), end+1)):
                print(f"{i+1}: {content[i].rstrip()}")
            print("-" * 40)
        except Exception as e:
            print(e)
