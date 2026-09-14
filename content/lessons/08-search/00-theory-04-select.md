---
title: "Элемент <select> и динамическое заполнение"
highlight: html
type: theory
---

# Элемент `<select>` и динамическое заполнение

`<select>` — выпадающий список для выбора из нескольких вариантов.

## HTML-структура

```html
<select id="roomSelect" name="room">
  <option value="">-- Выберите комнату --</option>  <!-- пустой вариант -->
  <option value="1">Мини-офис Focus — 450 ₽/час</option>
  <option value="2" selected>Конференц-зал Alpha — 1200 ₽/час</option>
  <!-- selected — выбран по умолчанию -->
</select>
```

## Получение значения

```js
const select = document.getElementById('roomSelect');
const value  = select.value;        // → '1' (всегда строка!)
const index  = select.selectedIndex; // → 0 (индекс выбранного пункта)
const text   = select.options[select.selectedIndex].text; // текст пункта
```

## Группировка через `<optgroup>`

```html
<select name="room">
  <optgroup label="Переговорные">       <!-- группа 1 -->
    <option value="1">Альфа — 1200 ₽</option>
    <option value="2">Бета — 800 ₽</option>
  </optgroup>
  <optgroup label="Мини-офисы">         <!-- группа 2 -->
    <option value="3">Фокус — 450 ₽</option>
  </optgroup>
</select>
```

## Динамическое заполнение через JavaScript

```js
const rooms = [
  { id: 1, name: 'Focus',  price: 450  },
  { id: 2, name: 'Alpha',  price: 1200 }
];

const select = document.querySelector('#roomSelect');

// Сначала сбросить и добавить пустой пункт
select.innerHTML = '<option value="">-- Выберите --</option>';

rooms.forEach(room => {
  const option       = document.createElement('option');
  option.value       = room.id;
  option.textContent = `${room.name} — ${room.price} ₽/час`;
  select.appendChild(option);
});
```

Или через innerHTML + map:

```js
select.innerHTML = [
  '<option value="">-- Выберите --</option>',
  ...rooms.map(r => `<option value="${r.id}">${r.name} — ${r.price} ₽</option>`)
].join('');
```

## Событие change

```js
select.addEventListener('change', () => {
  const id   = parseInt(select.value); // строку → число
  const room = rooms.find(r => r.id === id);
  if (room) {
    console.log('Выбрана:', room.name);
  }
});
```

## 🛠 Задание

Динамически заполните `<select>` из массива комнат сгруппированных по типу (через `<optgroup>`). При изменении — выведите название выбранной комнаты.

```js:start
const rooms = [
  { id: 1, name: 'Альфа', type: 'meeting', price: 1200 },
  { id: 2, name: 'Бета',  type: 'meeting', price: 800  },
  { id: 3, name: 'Фокус', type: 'focus',   price: 450  }
];

const select = document.querySelector('#roomSelect');

// Заполните select с группировкой по type (meeting / focus)
// Добавьте обработчик change
```

```js:solution
const rooms = [
  { id: 1, name: 'Альфа', type: 'meeting', price: 1200 },
  { id: 2, name: 'Бета',  type: 'meeting', price: 800  },
  { id: 3, name: 'Фокус', type: 'focus',   price: 450  }
];

const select = document.querySelector('#roomSelect');

// Получить уникальные типы
const types = [...new Set(rooms.map(r => r.type))]; // ['meeting', 'focus']

select.innerHTML = '<option value="">-- Выберите комнату --</option>';

// Создать группу для каждого типа
types.forEach(type => {
  const group = document.createElement('optgroup'); // создать <optgroup>
  group.label = type === 'meeting' ? 'Переговорные' : 'Мини-офисы'; // заголовок

  rooms
    .filter(r => r.type === type)  // только комнаты этого типа
    .forEach(room => {
      const option       = document.createElement('option');
      option.value       = room.id;
      option.textContent = `${room.name} — ${room.price} ₽/час`;
      group.appendChild(option);   // добавить в группу
    });

  select.appendChild(group); // добавить группу в select
});

select.addEventListener('change', () => {
  const id   = parseInt(select.value);          // строку → число
  const room = rooms.find(r => r.id === id);    // найти объект
  if (room) console.log('Выбрана:', room.name);
});
```
