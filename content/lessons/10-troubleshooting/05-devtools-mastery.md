---
title: "Мастерство отладки через DevTools"
highlight: js
type: theory
---

# Профессиональная отладка в инструментах разработчика (DevTools)

Консоль браузера создана не только для вывода ошибок — это мощнейшая рабочая среда разработчика. Нажатие клавиши `F12` открывает **Chrome DevTools**.

Вот приёмы, которые экономят часы времени при поиске багов:

---

## 🚀 Четыре главных приёма отладки

### 1. Табличный вывод: `console.table()`
Вместо того чтобы разворачивать длинные списки объектов в `console.log()`, используйте `console.table()`. Браузер выведет данные в виде аккуратной интерактивной таблицы с колонками:

```js
const rooms = [
  { id: 'focus-1', title: 'Фокус', price: 450 },
  { id: 'alpha-2', title: 'Альфа', price: 1200 }
];

// Выводит красивую таблицу с колонками id, title, price:
console.table(rooms);
```

### 2. Точка останова в коде: оператор `debugger;`
Если написать в JavaScript слово `debugger;` и открыть DevTools, браузер **заморозит** выполнение на этой строке. Вы сможете навести курсор на любую переменную, посмотреть её текущее значение и пошагово нажимать `F10` (следующий шаг) или `F11` (шаг внутрь функции):

```js
function calculateTotal(pricePerHour, hours) {
  // Браузер остановится здесь, позволяя проверить аргументы:
  debugger;
  return pricePerHour * hours;
}
```

### 3. Замер времени выполнения: `console.time()` и `console.timeEnd()`
Позволяет узнать, сколько миллисекунд занимает фильтрация или рендеринг:

```js
console.time('Поиск комнат');
const results = OFFICE_ROOMS.filter(r => r.price <= 500);
console.timeEnd('Поиск комнат'); // Выведет: Поиск комнат: 0.82ms
```

### 4. Вкладка Elements (Инспектор стилей)
- Кликните правой кнопкой на любой элемент страницы → **«Просмотреть код» (Inspect)**.
- В блоке **Styles** можно на лету менять CSS-свойства, включать/выключать галочки и смотреть, как меняется внешний вид.
- Рядом с элементами с `display: flex` есть специальный бейдж **flex** — клик по нему визуализирует главную и поперечную оси Flexbox.

---

## 🛠 Задание

Напишите функцию `debugFilterRooms(rooms, maxPrice)`, которая:
1. Засекает время работы таймера `'Фильтрация комнат'`.
2. Фильтрует комнаты с ценой `<= maxPrice`.
3. Завершает замер времени.
4. Выводит результат в консоль в виде таблицы `console.table()`.
5. Возвращает отфильтрованный массив.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Мастерство DevTools</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Отладка производительности</h2>
    <div id="output" class="output-box">Замеры времени выводятся в DevTools Console...</div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
```

```js:start
// Функция фильтрации с отладкой
function debugFilterRooms(rooms, maxPrice) {
  // 1. Запустите console.time('Фильтрация комнат')
  // 2. Отфильтруйте массив rooms по условию room.price <= maxPrice
  // 3. Остановите console.timeEnd('Фильтрация комнат')
  // 4. Выведите отфильтрованный массив через console.table
  // 5. Верните результат
}
```

```js:solution
// Функция фильтрации с отладкой
function debugFilterRooms(rooms, maxPrice) {
  // Запускаем таймер замера производительности
  console.time('Фильтрация комнат');

  // Фильтруем массив комнат по максимальной цене
  const filtered = rooms.filter(room => room.price <= maxPrice);

  // Останавливаем таймер — время будет выведено в консоль
  console.timeEnd('Фильтрация комнат');

  // Выводим найденные комнаты в виде наглядной таблицы
  console.table(filtered);

  // Возвращаем итоговый массив
  return filtered;
}
```
