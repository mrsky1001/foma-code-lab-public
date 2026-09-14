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
nums.sort((a, b) => a - b); // [1, 3, 10, 25] — По возрастанию
nums.sort((a, b) => b - a); // [25, 10, 3, 1] — По убыванию
```

**Как работает compareFn:**
- `a - b < 0` → a идёт раньше b
- `a - b > 0` → b идёт раньше a
- `a - b = 0` → порядок не меняется

## Сортировка объектов

```js
const rooms = [
  { name: 'Хаб',   price: 800  },
  { name: 'Альфа', price: 1200 },
  { name: 'Фокус', price: 450  }
];

// По цене от дешёвых к дорогим
rooms.sort((a, b) => a.price - b.price);

// По цене от дорогих к дешёвым
rooms.sort((a, b) => b.price - a.price);

// По названию в алфавитном порядке (с учётом кириллицы)
rooms.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
```

## Сортировка по нескольким критериям

Если первый критерий равен — применяется второй через `||`:

```js
// Сначала по цене, при одинаковой цене — по имени
rooms.sort((a, b) =>
  (a.price - b.price) || a.name.localeCompare(b.name, 'ru')
);
// || — если a.price - b.price = 0 (равны), переходим ко второму критерию
```

## Не изменять оригинал — `[...arr].sort()`

```js
// .sort() изменяет исходный массив!
const sorted = [...rooms].sort((a, b) => a.price - b.price);
// [...rooms] — создаём копию через spread
// Исходный rooms остаётся без изменений
```

## `toSorted()` — современная иммутабельная версия (ES2023)

```js
// Не изменяет оригинал, возвращает новый отсортированный массив
const sorted = rooms.toSorted((a, b) => a.price - b.price);
// rooms — не тронут, sorted — новый массив
```

## 🛠 Задание

Отсортируйте массив комнат по цене от дешёвых к дорогим. Не изменяйте оригинал — используйте spread.

```js:start
const rooms = [
  { name: 'Альфа', price: 1200 },
  { name: 'Хаб',   price: 800  },
  { name: 'Фокус', price: 450  }
];

const sorted = [...rooms].sort(/* ? */);
console.log(sorted.map(r => r.name));
```

```js:solution
const rooms = [
  { name: 'Альфа', price: 1200 },
  { name: 'Хаб',   price: 800  },
  { name: 'Фокус', price: 450  }
];

const sorted = [...rooms].sort((a, b) => a.price - b.price);
// [...rooms] — копия через spread, оригинал не тронут
// (a, b) => a.price - b.price — по возрастанию цены

console.log(sorted.map(r => r.name));
// ['Фокус', 'Хаб', 'Альфа'] — от дешёвых к дорогим
```
