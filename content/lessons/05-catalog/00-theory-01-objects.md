---
title: "Объекты в JavaScript"
highlight: js
type: theory
---

# Объекты в JavaScript

Объект — способ хранить связанные данные вместе. Вместо трёх отдельных переменных — один объект.

```js
// Без объекта — плохо: переменные не связаны:
const roomName     = 'Переговорная Alpha';
const roomPrice    = 800;
const roomCapacity = 8;

// С объектом — хорошо: всё об одной комнате в одном месте:
const room = {
  name:        'Переговорная Alpha', // строковое поле: название комнаты
  price:       800,                  // числовое поле: цена в рублях за час
  capacity:    8,                    // числовое поле: вместимость (человек)
  isAvailable: true                  // булево поле: доступна ли для бронирования
};
```

## Доступ к свойствам

```js
room.name           // 'Переговорная Alpha' — через точку (чаще всего)
room['price']       // 800 — через скобки (удобно, если ключ хранится в переменной)
room.isAvailable    // true
```

## Изменение и добавление

```js
room.price = 900;          // изменить существующее свойство
room.floor = 3;            // добавить новое свойство (если его не было)
delete room.isAvailable;   // удалить свойство из объекта
```

## Вложенные объекты

```js
const room = {
  name: 'Alpha',
  equipment: {              // значение поля — другой объект
    wifi:      true,        // есть ли Wi-Fi
    projector: true,        // есть ли проектор
    capacity:  8            // вместимость (внутри вложенного объекта)
  }
};

console.log(room.equipment.capacity); // 8 — обращаемся через две точки
```

## 🛠 Задание

Создайте объект `office` с полями: `name` (строка), `floor` (число), `hasKitchen` (булево). Выведите в консоль название и этаж.

```js:start
// Создайте объект office
const office = {
  // ...
};

// Выведите name и floor
```

```js:solution
const office = {
  name:       'СмартОфис Центр', // название офиса
  floor:      4,                  // этаж в здании
  hasKitchen: true                // есть ли кухня
};

console.log(office.name);  // → 'СмартОфис Центр'
console.log(office.floor); // → 4
```
