---
title: "Массивы объектов"
highlight: js
type: theory
---

# Массивы объектов

В реальных задачах данные чаще хранятся в виде **массива объектов** — списков с однотипными записями.

## Создание и обращение

```js
const rooms = [
  { id: 1, name: 'Фокус',  price: 450,  capacity: 2 },
  { id: 2, name: 'Альфа',  price: 1200, capacity: 10 },
  { id: 3, name: 'Хаб',    price: 800,  capacity: 5  }
];

rooms[0]          // → первый объект { id: 1, name: 'Фокус', ... }
rooms[0].name     // → 'Фокус'
rooms.length      // → 3
```

## Деструктуризация массива

```js
const [first, second] = rooms;
// first  = { id: 1, name: 'Фокус', ... }
// second = { id: 2, name: 'Альфа', ... }

const [, , third] = rooms; // пропустить первые два
// third = { id: 3, name: 'Хаб', ... }
```

## Копирование через spread

```js
// ВАЖНО: sort() и splice() изменяют оригинал!
// Всегда копируйте перед такими операциями:

const copy = [...rooms];            // поверхностная копия массива

copy.sort((a, b) => a.price - b.price); // изменяет copy
// rooms — не тронут

// Добавить элемент без мутации:
const withNew = [...rooms, { id: 4, name: 'VIP', price: 2000 }];
```

## Полезные методы

```js
// slice — вырезать часть (оригинал не меняется)
rooms.slice(0, 2)   // → первые 2 элемента
rooms.slice(-1)     // → последний элемент (массив из одного)

// splice — удалить/заменить (МЕНЯЕТ оригинал!)
rooms.splice(1, 1)  // удалить 1 элемент с индекса 1

// includes — проверить наличие значения
const ids = [1, 2, 3];
ids.includes(2)     // → true
ids.includes(99)    // → false

// flat — развернуть вложенные массивы
const nested = [[1, 2], [3, 4]];
nested.flat()       // → [1, 2, 3, 4]
```

## Перебор с деструктуризацией

```js
// Деструктуризация в параметре forEach/map:
rooms.forEach(({ name, price }) => {     // сразу извлекаем нужные поля
  console.log(`${name}: ${price} ₽/час`);
});

// То же в map:
const labels = rooms.map(({ name, price }) => `${name} — ${price} ₽`);
```

## 🛠 Задание

Скопируйте массив через spread. Добавьте новую комнату в копию. Убедитесь что оригинал не изменился.

```js:start
const rooms = [
  { id: 1, name: 'Фокус', price: 450 },
  { id: 2, name: 'Альфа', price: 1200 }
];

// 1. Создайте копию через spread
// 2. Добавьте в копию новый объект { id: 3, name: 'VIP', price: 2000 }
// 3. Выведите длины обоих массивов
```

```js:solution
const rooms = [
  { id: 1, name: 'Фокус', price: 450 },
  { id: 2, name: 'Альфа', price: 1200 }
];

// Создаём копию через spread — оригинал не тронут
const roomsCopy = [...rooms, { id: 3, name: 'VIP', price: 2000 }];
// spread разворачивает rooms + добавляет новый объект

console.log(rooms.length);      // → 2 — оригинал не изменился
console.log(roomsCopy.length);  // → 3 — копия с новым элементом
```
