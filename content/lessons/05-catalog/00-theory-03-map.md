---
title: "Метод .map() и шаблонные строки"
highlight: js
type: theory
---

# Метод .map() и шаблонные строки

## .map() — трансформация массива

`.map()` создаёт **новый** массив, преобразуя каждый элемент по заданному правилу.

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2); // каждое число умножается на 2
// результат: [2, 4, 6, 8]

const rooms = [
  { name: 'Focus', price: 450 },
  { name: 'Alpha', price: 1200 }
];

const names = rooms.map(room => room.name); // из каждого объекта берём только поле name
// результат: ['Focus', 'Alpha']
```

## Шаблонные строки (Template Literals)

Вместо склейки строк через `+` используют обратные кавычки `` ` ``:

```js
const name  = 'Focus';
const price = 450;

// Старый способ — неудобный:
const old    = '<div>' + name + ' — ' + price + ' ₽</div>';

// Шаблонная строка — читается как обычный текст:
const modern = `<div>${name} — ${price} ₽</div>`; // ${} — вставка переменной
```

## .map() для генерации HTML

```js
const html = rooms.map(room => `
  <div class="card">
    <h3>${room.name}</h3>     <!-- вставляем название комнаты -->
    <p>${room.price} ₽/час</p> <!-- вставляем цену -->
  </div>
`).join(''); // .join('') склеивает все строки массива в одну без разделителей

container.innerHTML = html; // вставляем сгенерированный HTML в DOM
```

## 🛠 Задание

Преобразуйте массив имён в массив HTML-строк `<li>Имя</li>` и объедините в одну строку.

```js:start
const names = ['Алексей', 'Мария', 'Дмитрий'];

const html = names.map(name => {
  // Верните строку <li>...</li>
}).join('');

console.log(html);
```

```js:solution
const names = ['Алексей', 'Мария', 'Дмитрий'];

const html = names.map(name => `<li>${name}</li>`).join(''); // каждое имя → <li>Имя</li>, затем всё склеивается

console.log(html);
// <li>Алексей</li><li>Мария</li><li>Дмитрий</li>
```
