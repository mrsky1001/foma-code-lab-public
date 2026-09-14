---
title: "Метод .filter() — фильтрация массива"
highlight: js
type: theory
---

# Метод .filter() — фильтрация массива

`.filter()` создаёт **новый** массив, оставляя только те элементы, для которых условие вернуло `true`. Оригинальный массив не изменяется.

```js
const rooms = [
  { name: 'Фокус', price: 450,  capacity: 1  },
  { name: 'Альфа', price: 1200, capacity: 10 },
  { name: 'Хаб',   price: 800,  capacity: 5  }
];

// Только дешевле 500
const cheap = rooms.filter(room => room.price < 500);
// → [{ name: 'Фокус', ... }]

// Только большие (вместимость > 4)
const large = rooms.filter(room => room.capacity > 4);
// → [{ name: 'Альфа', ... }, { name: 'Хаб', ... }]
```

## Поиск по строке

```js
const query = 'фо';

const found = rooms.filter(room =>
  room.name.toLowerCase().includes(query.toLowerCase())
  // .toLowerCase() — нижний регистр для регистронезависимого поиска
  // .includes() — содержит ли строка подстроку
);
```

## Фильтрация по нескольким полям

```js
// Фильтр с тремя условиями одновременно
function applyFilters(rooms, { query, maxPrice, minCapacity }) {
  return rooms.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())   // по названию
    && r.price <= maxPrice                               // && — И (все условия)
    && r.capacity >= minCapacity                         // по вместимости
  );
}

const result = applyFilters(rooms, {
  query: '',
  maxPrice: 1000,
  minCapacity: 3
});
// → [{ name: 'Хаб', price: 800, capacity: 5 }]
```

## .reduce() — суммирование и группировка

`reduce` — мощный метод для сворачивания массива в одно значение:

```js
// Сумма цен всех комнат
const totalPrice = rooms.reduce((sum, room) => sum + room.price, 0);
// 0 — начальное значение accumulator (sum)
// → 450 + 1200 + 800 = 2450

// Средняя цена
const avgPrice = totalPrice / rooms.length; // → 816.67
```

## filter vs find

| | `.filter()` | `.find()` |
|-|-------------|-----------|
| Возвращает | Массив (все подходящие) | Один элемент (первый) / undefined |
| Когда | Нужно несколько результатов | Нужен один результат по id |

## 🛠 Задание

Отфильтруйте комнаты по трём критериям одновременно: цена ≤ 1000, вместимость ≥ 3 и название содержит «Hub» / «Хаб».

```js:start
const rooms = [
  { name: 'Hub Focus', price: 450,  capacity: 2 },
  { name: 'Hub Alpha', price: 800,  capacity: 5 },
  { name: 'Mega Hub',  price: 1200, capacity: 8 },
  { name: 'Focus',     price: 300,  capacity: 1 }
];

const result = rooms.filter(r => {
  // Напишите условие с тремя критериями
});

console.log(result.map(r => r.name));
```

```js:solution
const rooms = [
  { name: 'Hub Focus', price: 450,  capacity: 2 },
  { name: 'Hub Alpha', price: 800,  capacity: 5 },
  { name: 'Mega Hub',  price: 1200, capacity: 8 },
  { name: 'Focus',     price: 300,  capacity: 1 }
];

const result = rooms.filter(r =>
  r.price <= 1000                                   // цена не больше 1000
  && r.capacity >= 3                                // вместимость не меньше 3
  && r.name.toLowerCase().includes('hub')           // название содержит 'hub'
);

console.log(result.map(r => r.name));
// → ['Hub Alpha'] — единственная комната удовлетворяющая всем условиям
```
