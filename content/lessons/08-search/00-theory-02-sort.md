---
title: "Метод .sort() — сортировка массива"
highlight: js
type: theory
---

# Метод .sort() — сортировка массива

`.sort()` сортирует массив **на месте** (изменяет исходный!) и возвращает его же.

## Числовая сортировка

```js
const nums = [10, 3, 25, 1];

// По умолчанию sort сортирует как строки — НЕПРАВИЛЬНО для чисел:
nums.sort(); // [1, 10, 25, 3] — '10' < '3' строково — Плохо!

// С функцией сравнения (compareFn) — правильно:
nums.sort((a, b) => a - b); // [1, 3, 10, 25] — По возрастанию (a-b < 0 → a раньше)
nums.sort((a, b) => b - a); // [25, 10, 3, 1] — По убыванию  (b-a < 0 → b раньше)
```

## Сортировка объектов

```js
const rooms = [
  { name: 'Hub',   price: 250  },
  { name: 'Alpha', price: 1200 },
  { name: 'Focus', price: 450  }
];

// По цене от дешёвых к дорогим
rooms.sort((a, b) => a.price - b.price); // сравниваем числовое поле price

// По названию в алфавитном порядке (с учётом русских букв)
rooms.sort((a, b) => a.name.localeCompare(b.name, 'ru')); // 'ru' — локаль для кириллицы
```

## Не изменять оригинал — `[...arr].sort()`

```js
const sorted = [...rooms].sort((a, b) => a.price - b.price);
// [...rooms] — создаём копию через spread; исходный rooms остаётся без изменений
```

## 🛠 Задание

Отсортируйте массив комнат по цене от дешёвых к дорогим. Выведите названия в порядке сортировки.

```js:start
const rooms = [
  { name: 'Alpha', price: 1200 },
  { name: 'Hub',   price: 250  },
  { name: 'Focus', price: 450  }
];

const sorted = [...rooms].sort(/* ? */);
console.log(sorted.map(r => r.name));
```

```js:solution
const rooms = [
  { name: 'Alpha', price: 1200 },
  { name: 'Hub',   price: 250  },
  { name: 'Focus', price: 450  }
];

const sorted = [...rooms].sort((a, b) => a.price - b.price);
// [...rooms] — копия, оригинал не тронут
// (a, b) => a.price - b.price — по возрастанию цены
console.log(sorted.map(r => r.name));
// ['Hub', 'Focus', 'Alpha']
```
