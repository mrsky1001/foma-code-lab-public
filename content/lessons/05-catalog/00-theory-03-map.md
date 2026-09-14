---
title: "Метод .map() и шаблонные строки"
highlight: js
type: theory
---

# Метод .map() и шаблонные строки

`.map()` создаёт **новый массив**, преобразуя каждый элемент по функции. Оригинал не изменяется.

## Базовое использование

```js
const prices = [450, 800, 1200];

const doubled = prices.map(p => p * 2);     // [900, 1600, 2400]
const labels  = prices.map(p => `${p} ₽`); // ['450 ₽', '800 ₽', '1200 ₽']
```

## Шаблонные строки (Template Literals)

```js
const name = 'Альфа';
const price = 800;

// Старый способ — конкатенация
const old = 'Комната ' + name + ' стоит ' + price + ' ₽';

// Новый способ — шаблонная строка (обратные кавычки)
const modern = `Комната ${name} стоит ${price} ₽`;
// Внутри ${} можно любое выражение:
const info = `Итого: ${price * 3} ₽`;   // → 'Итого: 2400 ₽'
```

## Многострочные шаблоны — генерация HTML

```js
const room = { name: 'Альфа', price: 800 };

const html = `
  <div class="card">
    <h3 class="card-title">${room.name}</h3>
    <p class="card-price">${room.price} ₽/час</p>
  </div>
`;
// Обратные кавычки сохраняют переносы строк
```

## map для генерации карточек

```js
const rooms = [
  { id: 1, name: 'Фокус', price: 450, isAvailable: true },
  { id: 2, name: 'Альфа', price: 800, isAvailable: false }
];

// Генерируем массив HTML-строк и объединяем через join('')
catalog.innerHTML = rooms.map(room => `
  <div class="card" data-id="${room.id}">
    <h3>${room.name}</h3>
    <p>${room.price} ₽/час</p>
    ${room.isAvailable
      ? '<span class="badge badge-green">Свободна</span>'
      : '<span class="badge badge-red">Занята</span>'
    }
  </div>
`).join('');
// join('') убирает запятые между строками
```

## Условный рендеринг в шаблоне

```js
// Тернарный оператор в шаблоне
`${isAvailable ? '<span>Свободна</span>' : '<span>Занята</span>'}`

// Показать элемент только если условие true (или пустую строку)
`${isNew ? '<span class="badge">Новинка</span>' : ''}`
```

## 🛠 Задание

Сгенерируйте список карточек из массива. Каждая карточка должна показывать название, цену, и бейдж «Свободна» / «Занята» через условный рендеринг.

```js:start
const rooms = [
  { id: 1, name: 'Фокус', price: 450, isAvailable: true  },
  { id: 2, name: 'Альфа', price: 800, isAvailable: false }
];

const container = document.querySelector('#catalog');
container.innerHTML = rooms.map(room => `
  <!-- Напишите шаблон карточки с условным бейджем -->
`).join('');
```

```js:solution
const rooms = [
  { id: 1, name: 'Фокус', price: 450, isAvailable: true  },
  { id: 2, name: 'Альфа', price: 800, isAvailable: false }
];

const container = document.querySelector('#catalog');

// map: преобразуем каждый объект в HTML-строку
// join(''): склеиваем строки без разделителя
container.innerHTML = rooms.map(room => `
  <div class="card" data-id="${room.id}">
    <h3 class="card-title">${room.name}</h3>
    <p class="card-price">${room.price} ₽/час</p>
    ${room.isAvailable
      ? '<span class="badge badge--green">Свободна</span>'   <!-- условие true -->
      : '<span class="badge badge--red">Занята</span>'       <!-- условие false -->
    }
  </div>
`).join(''); // join('') убирает запятые между карточками
```
