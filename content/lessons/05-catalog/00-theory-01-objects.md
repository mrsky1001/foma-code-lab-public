---
title: "Объекты в JavaScript"
highlight: js
type: theory
---

# Объекты в JavaScript

Объект — это коллекция **пар «ключ: значение»**. Используется для хранения структурированных данных.

## Создание и обращение к свойствам

```js
const room = {
  name: 'Переговорная «Альфа»',   // ключ: 'name', значение: строка
  price: 800,                      // ключ: 'price', значение: число
  capacity: 8,                     // ключ: 'capacity', значение: число
  isAvailable: true                // ключ: 'isAvailable', значение: boolean
};

// Два способа обратиться к свойству:
room.name          // точечная нотация → 'Переговорная «Альфа»'
room['price']      // скобочная нотация → 800 (нужна для динамических ключей)
```

## Изменение и добавление свойств

```js
room.price = 900;              // изменить существующее свойство
room.floor = 3;                // добавить новое свойство
delete room.isAvailable;       // удалить свойство
```

## Деструктуризация — удобное извлечение

Вместо того чтобы каждый раз писать `room.name`, `room.price` — используйте деструктуризацию:

```js
// Без деструктуризации — многословно
const name = room.name;
const price = room.price;
const capacity = room.capacity;

// С деструктуризацией — чисто и коротко
const { name, price, capacity } = room;
// Теперь name, price, capacity — самостоятельные переменные

console.log(name);     // → 'Переговорная «Альфа»'
console.log(price);    // → 900
```

Деструктуризация с переименованием:
```js
const { name: roomName, price: roomPrice } = room;
// roomName = 'Переговорная «Альфа»', roomPrice = 900
```

## Spread оператор — копирование и обновление

```js
// Создать копию объекта с изменением одного поля
const updatedRoom = { ...room, price: 1000 };
// { name: 'Альфа', price: 1000, capacity: 8 } — новый объект, оригинал не тронут

// Слить два объекта
const extra = { wifi: true, projector: false };
const fullRoom = { ...room, ...extra };
// Все поля room + все поля extra
```

## Object.keys, Object.values, Object.entries

```js
Object.keys(room)    // → ['name', 'price', 'capacity', 'isAvailable'] — массив ключей
Object.values(room)  // → ['Альфа', 800, 8, true] — массив значений
Object.entries(room) // → [['name','Альфа'], ['price',800], ...] — массив пар [ключ, значение]

// Удобно для перебора объекта:
Object.entries(room).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);  // → 'name: Альфа', 'price: 800', ...
});
```

## Вложенные объекты

```js
const booking = {
  room: { name: 'Альфа', price: 800 },  // вложенный объект
  user: { name: 'Иван', email: 'ivan@mail.ru' },
  date: '2024-01-15'
};

// Доступ к вложенным полям:
booking.room.name     // → 'Альфа'
booking.user.email    // → 'ivan@mail.ru'

// Деструктуризация вложенного:
const { room: { name: roomName } } = booking;  // roomName = 'Альфа'
```

## 🛠 Задание

Создайте объект комнаты и используйте деструктуризацию для извлечения полей. Создайте обновлённую копию через spread.

```js:start
const room = {
  name: 'Мини-офис «Фокус»',
  price: 450,
  capacity: 2,
  isAvailable: true
};

// 1. Деструктурируйте: извлеките name, price, capacity

// 2. Создайте копию с price: 500 через spread

// 3. Выведите оба объекта
```

```js:solution
const room = {
  name: 'Мини-офис «Фокус»',
  price: 450,
  capacity: 2,
  isAvailable: true
};

// Деструктуризация: создаём отдельные переменные из полей объекта
const { name, price, capacity } = room;
console.log(name);     // → 'Мини-офис «Фокус»'
console.log(price);    // → 450

// Spread: копия объекта с изменением одного поля
const updatedRoom = { ...room, price: 500 };
// { name: 'Фокус', price: 500, capacity: 2, isAvailable: true }

console.log(room.price);        // → 450 — оригинал не изменился!
console.log(updatedRoom.price); // → 500 — только в копии
```
