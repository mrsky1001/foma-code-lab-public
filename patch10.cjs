const fs = require('fs');

const patches = [
  {
    file: 'content/lessons/10-troubleshooting/01-security-error-localstorage.md',
    replaces: [
      { from: 'type: theory', to: 'type: practice' },
      { 
        from: "function safeReadUser(key) {\n  // Студент добавляет try-catch сюда\n}\n```",
        to: "function safeReadUser(key) {\n  // Студент добавляет try-catch сюда\n}\n\nconst user = safeReadUser('currentUser');\ndocument.getElementById('output').textContent = 'Текущий пользователь: ' + user;\n```"
      }
    ]
  },
  {
    file: 'content/lessons/10-troubleshooting/02-type-error-null-dom.md',
    replaces: [
      { from: 'type: theory', to: 'type: practice' },
      { 
        from: "  });\n}\n```\n\n```js:solution",
        to: "  });\n}\nbindSearchEvent();\n```\n\n```js:solution"
      },
      {
        from: "  });\n}\n```",
        to: "  });\n}\nbindSearchEvent();\n```"
      }
    ]
  },
  {
    file: 'content/lessons/10-troubleshooting/03-syntax-error-tokens.md',
    replaces: [
      { from: 'type: theory', to: 'type: practice' },
      {
        from: "  isActive: true\n}\n```",
        to: "  isActive: true\n}\ndocument.getElementById('output').textContent = `Объект ${roomData.title} успешно инициализирован (цена: ${roomData.price} ?)`;\n```"
      }
    ]
  },
  {
    file: 'content/lessons/10-troubleshooting/04-network-404-paths.md',
    replaces: [
      { from: 'type: theory', to: 'type: practice' },
      {
        from: "<head>\n  <link rel=\"stylesheet\" href=\"../css/style.css\">\n  <link rel=\"icon\" type=\"image/svg+xml\" href=\"../img/logo.svg\">\n  <script src=\"../js/data.js\" defer></script>\n</head>",
        to: "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Каталог — Проверка путей</title>\n  <link rel=\"stylesheet\" href=\"../css/style.css\">\n  <link rel=\"icon\" type=\"image/svg+xml\" href=\"../img/logo.svg\">\n  <script src=\"../js/data.js\" defer></script>\n</head>"
      }
    ]
  },
  {
    file: 'content/lessons/10-troubleshooting/05-devtools-mastery.md',
    replaces: [
      { from: 'type: theory', to: 'type: practice' },
      {
        from: "    console.timeEnd('FilterTime');\n    return result;\n}\n```",
        to: "    console.timeEnd('FilterTime');\n    return result;\n}\n\nconst testRooms = [\n  { name: 'Фокус', price: 450 },\n  { name: 'Альфа', price: 1200 },\n  { name: 'Бета', price: 800 }\n];\ndebugFilterRooms(testRooms, 900);\ndocument.getElementById('output').textContent = 'Фильтрация завершена. Откройте вкладку Console в DevTools.';\n```"
      }
    ]
  }
];

patches.forEach(p => {
  let content = fs.readFileSync(p.file, 'utf8');
  p.replaces.forEach(r => {
    // replace all occurrences of `from` with `to`
    content = content.split(r.from).join(r.to);
  });
  fs.writeFileSync(p.file, content);
  console.log('Patched ' + p.file);
});
