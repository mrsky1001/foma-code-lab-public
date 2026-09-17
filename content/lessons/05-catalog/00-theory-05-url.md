---
title: "URLSearchParams — параметры URL"
highlight: js
type: theory
---

# URLSearchParams — параметры URL

`URLSearchParams` позволяет читать и записывать параметры в адресной строке браузера (`?key=value`).

## Читать параметры URL

```js
// URL: https://smartoffice.ru/room.html?id=3&date=2024-01-15

const params = new URLSearchParams(window.location.search);
// window.location.search → '?id=3&date=2024-01-15'

params.get('id')    // → '3' (всегда строка!)
params.get('date')  // → '2024-01-15'
params.get('foo')   // → null (параметр не найден)
```

**Важно:** `.get()` всегда возвращает **строку**. Для числовых значений нужно конвертировать:

```js
const id = parseInt(params.get('id'));   // '3' → 3
// или
const id = Number(params.get('id'));     // '3' → 3
```

## Полезные свойства location

```js
window.location.href      // полный URL: 'https://smartoffice.ru/room.html?id=3'
window.location.pathname  // только путь: '/room.html'
window.location.search    // только параметры: '?id=3&date=2024-01-15'
window.location.hash      // якорь: '#contacts'
window.location.origin    // происхождение: 'https://smartoffice.ru'
```

## Переход на другую страницу с параметром

```js
// Перейти на страницу комнаты при клике на карточку
card.addEventListener('click', () => {
  const id = card.dataset.id;
  window.location.href = `room.html?id=${id}`; // редирект с параметром
});
```

## Записать параметры (без перезагрузки)

```js
const url = new URL(window.location.href);
url.searchParams.set('sort', 'price');   // изменить или добавить параметр
url.searchParams.delete('filter');        // удалить параметр

// Обновить URL без перезагрузки страницы
window.history.pushState({}, '', url);    // URL меняется, страница остаётся
```

## 🛠 Задание

Прочитайте параметр `id` из URL и найдите соответствующую комнату в массиве. Используйте `parseInt` для конвертации.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URLSearchParams</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Параметры URL</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }
```

```js:start
// URL: room.html?id=2
const rooms = [
  { id: 1, name: 'Фокус', price: 450  },
  { id: 2, name: 'Альфа', price: 1200 },
  { id: 3, name: 'Хаб',   price: 800  }
];

// 1. Прочитайте параметр id через URLSearchParams
// 2. Конвертируйте в число
// 3. Найдите комнату через .find()
// 4. Выведите название или 'Комната не найдена'
```

```js:solution
const rooms = [
  { id: 1, name: 'Фокус', price: 450  },
  { id: 2, name: 'Альфа', price: 1200 },
  { id: 3, name: 'Хаб',   price: 800  }
];

const params = new URLSearchParams(window.location.search); // прочитать параметры URL
const rawId  = params.get('id');   // → '2' — строка или null
const id     = parseInt(rawId);    // → 2 — число; parseInt(null) → NaN

const room = rooms.find(r => r.id === id); // найти комнату по id

if (room) {
  console.log('Комната:', room.name, room.price + ' ₽/час');
} else {
  console.log('Комната не найдена');
}
```
