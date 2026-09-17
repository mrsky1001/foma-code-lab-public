---
title: "Конвейер данных: совместная фильтрация и сортировка"
highlight: js
type: theory
---

# Конвейер данных: совместная фильтрация и сортировка

В реальных приложениях (каталогах интернет-магазинов, сервисах бронирования, поисковиках) фильтрация и сортировка почти никогда не работают изолированно. Пользователь одновременно:
1. Вводит текст в строку поиска (например, «Альфа»);
2. Выбирает фильтр по вместимости (например, «от 5 человек»);
3. Выбирает порядок сортировки («сначала дешёвые»).

Для решения этой задачи в JavaScript применяется архитектурный паттерн **Data Pipeline (Конвейер данных)**.

---

## ⚠️ Главная ловушка новичка: мутация исходных данных

Типичная ошибка начинающих разработчиков — перезапись или изменение исходного массива:

```js
// ❌ ГРУБАЯ ОШИБКА:
let rooms = [...]; // исходный массив

function onSearch(text) {
  rooms = rooms.filter(r => r.name.includes(text)); // Исходные данные безвозвратно потеряны!
}
```

Если пользователь введёт «Альфа», в массиве останется 1 комната. Если затем он сотрёт строку поиска (нажмёт Backspace), остальные комнаты **не вернутся**, потому что исходный массив был перезаписан!

---

## Паттерн «Источник правды» (Source of Truth)

Чтобы данные никогда не терялись, разделяйте состояние на два массива:
1. **`allRooms`** — эталонный массив всех данных с сервера/файла (НИКОГДА не изменяется);
2. **`displayedRooms`** — временный результат для отрисовки в UI.

```
[ allRooms ] (Эталонные данные)
      │
      ▼
   .filter()  ➔ Фильтрация по строке поиска
      │
      ▼
   .filter()  ➔ Фильтрация по категории/вместимости
      │
      ▼
   [...].sort() ➔ Сортировка (по цене / имени)
      │
      ▼
[ displayedRooms ] ➔ render(displayedRooms) в DOM
```

---

## Реализация функции-конвейера

```js
// Исходные неизменяемые данные
const allRooms = [
  { id: 1, name: 'Хаб Фокус', price: 450, capacity: 2 },
  { id: 2, name: 'Хаб Альфа', price: 1200, capacity: 10 },
  { id: 3, name: 'Лаунж Бета', price: 800, capacity: 6 }
];

function applyFiltersAndSort(rooms, query, sortMode) {
  const cleanQuery = query.toLowerCase().trim();

  // Шаг 1. Фильтруем (создаётся новый массив, оригинал не затронут)
  let result = rooms.filter(room => {
    return room.name.toLowerCase().includes(cleanQuery);
  });

  // Шаг 2. Сортируем копию результата
  if (sortMode === 'price-asc') {
    result.sort((a, b) => a.price - b.price); // по возрастанию цены
  } else if (sortMode === 'price-desc') {
    result.sort((a, b) => b.price - a.price); // по убыванию цены
  }

  // Шаг 3. Возвращаем готовый массив для рендера
  return result;
}
```

> [!TIP]
> Поскольку `.filter()` всегда возвращает **новый** массив, последующий вызов `.sort()` на отфильтрованном результате уже безопасен для исходного массива `allRooms`.

---

## 🛠 Задание

Напишите функцию `processRooms(rooms, search, sortOrder)`:
1. Отфильтруйте массив `rooms` по совпадению подстроки `search` в поле `name` (без учёта регистра `toLowerCase()`);
2. Отсортируйте полученный результат по цене:
   - если `sortOrder === 'asc'`, то по возрастанию цены (`a.price - b.price`);
   - если `sortOrder === 'desc'`, то по убыванию цены (`b.price - a.price`);
3. Верните итоговый массив.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Конвейер данных</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Фильтрация и сортировка</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 600px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }
```

```js:start
const initialRooms = [
  { name: 'Конференц-зал', price: 2500 },
  { name: 'Мини-офис', price: 700 },
  { name: 'Офис на двоих', price: 1200 }
];

function processRooms(rooms, search, sortOrder) {
  // 1. Отфильтруйте по search
  // 2. Отсортируйте по sortOrder
  // 3. Верните результат
}
```

```js:solution
const initialRooms = [
  { name: 'Конференц-зал', price: 2500 },
  { name: 'Мини-офис', price: 700 },
  { name: 'Офис на двоих', price: 1200 }
];

function processRooms(rooms, search, sortOrder) {
  const query = search.toLowerCase().trim();

  // Фильтруем исходный массив
  const filtered = rooms.filter(room => 
    room.name.toLowerCase().includes(query)
  );

  // Сортируем полученный массив
  if (sortOrder === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}

// Проверка: ищем 'офис' и сортируем от дешёвых к дорогим
const result = processRooms(initialRooms, 'офис', 'asc');
console.log(result.map(r => `${r.name}: ${r.price}`));
// → ['Мини-офис: 700', 'Офис на двоих: 1200']
```
