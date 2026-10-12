const fs = require('fs');

// 82
let c82 = fs.readFileSync('content/lessons/08-search/00-theory-04-input-event.md', 'utf8');
c82 = c82.replace(
  '// фильтрация запустится только через 300 мс после последнего символа\n});\n```',
  '// фильтрация запустится только через 300 мс после последнего символа\n});\n```\n\n> **Примечание:** В нашем учебном проекте мы работаем с локальным массивом всего из 6 комнат. Фильтрация такого крошечного массива происходит мгновенно, поэтому прямой вызов `applyFilter` на каждый ввод не создаст проблем. В реальных приложениях с бэкенд-запросами `debounce` обязателен. В качестве бонуса в шаге 09 попробуйте обернуть `applyFilter` в `debounce`!'
);
fs.writeFileSync('content/lessons/08-search/00-theory-04-input-event.md', c82);

// 83
let c83 = fs.readFileSync('content/lessons/08-search/00-theory-05-select.md', 'utf8');
c83 = c83.replace(
  "].join('');\n```\n\n## Событие change",
  "].join('');\n```\n\n> **Сравнение подходов:** Генерация через шаблонные строки `.map()` отлично подходит для простых плоских списков. Подход с `document.createElement` и `<optgroup>` лучше использовать для сложных иерархий и группировок.\n\n## Событие change"
);
fs.writeFileSync('content/lessons/08-search/00-theory-05-select.md', c83);

// 84
let c84 = fs.readFileSync('content/lessons/08-search/00-theory-06-dates.md', 'utf8');
c84 = c84.replace(
  "const totalCost = diffHours * pricePerHour; // 3200 ?\n```\n\n---",
  "const totalCost = diffHours * pricePerHour; // 3200 ?\n```\n\n> **На практике** бывает два сценария: выбор времени «от и до» (где требуется объект `Date` для вычисления разницы, как показано выше) и выбор количества часов напрямую (как в нашем проекте «СмартОфис», где используется просто числовое поле).\n\n---"
);
fs.writeFileSync('content/lessons/08-search/00-theory-06-dates.md', c84);

// 85
let c85 = fs.readFileSync('content/lessons/08-search/01-catalog-toolbar-html.md', 'utf8');
c85 = c85.replace(
  '<input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию...">',
  '<input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию..." aria-label="Поиск офисных комнат">'
);
fs.writeFileSync('content/lessons/08-search/01-catalog-toolbar-html.md', c85);

// 91
let c91 = fs.readFileSync('content/lessons/08-search/14-create-mybookings-page.md', 'utf8');
c91 = c91.replace(
  "Представьте, что вы создали файл `my-bookings.html` в вашем проекте и скопировали туда стандартный HTML каркас. Идем дальше! Ничего вписывать не нужно.",
  "Откройте страницу `my-bookings.html`. Замените заголовок на «Мои бронирования» и добавьте пустой контейнер для заявок:\n`<div class=\"bookings-list\" id=\"myBookingsList\"></div>`."
);
fs.writeFileSync('content/lessons/08-search/14-create-mybookings-page.md', c91);

console.log("Patched 82, 83, 84, 85, 91");
