---
title: "Элемент <select> и динамическое заполнение"
highlight: html
type: theory
---

# Элемент `<select>` и динамическое заполнение

`<select>` — выпадающий список. Используется в формах для выбора из нескольких вариантов.

## HTML-структура

```html
<select id="roomSelect">
  <option value="">-- Выберите комнату --</option>  <!-- пустой вариант по умолчанию -->
  <option value="1">Мини-офис Focus — 450 ₽/час</option>   <!-- value — что передаётся в JS -->
  <option value="2">Конференц-зал Alpha — 1200 ₽/час</option>
</select>
```

## Получение значения

```js
const select    = document.getElementById('roomSelect');
const selectedId = select.value; // '1' или '2' — всегда строка, даже если атрибут value="1"
```

## Динамическое заполнение через JavaScript

Вместо ручного написания `<option>` — генерируем из массива:

```js
const rooms = [
  { id: 1, name: 'Focus', price: 450  },
  { id: 2, name: 'Alpha', price: 1200 }
];

select.innerHTML = '<option value="">-- Выберите --</option>'; // сначала сбросить и добавить пустой

rooms.forEach(room => {
  const option       = document.createElement('option'); // создать тег <option>
  option.value       = room.id;                          // задать атрибут value
  option.textContent = `${room.name} — ${room.price} ₽/час`; // задать текст пункта
  select.appendChild(option);                            // добавить в <select>
});
```

## 🛠 Задание

Динамически заполните `<select>` из массива городов. При изменении — выведите выбранный город в консоль.

```js:start
const cities = ['Москва', 'Санкт-Петербург', 'Казань'];
const select = document.querySelector('#citySelect');

// Заполните select из массива cities
// Добавьте обработчик change
```

```js:solution
const cities = ['Москва', 'Санкт-Петербург', 'Казань'];
const select = document.querySelector('#citySelect');

select.innerHTML = '<option value="">-- Выберите город --</option>'; // пустой пункт по умолчанию

cities.forEach(city => {
  const option       = document.createElement('option'); // создать <option>
  option.value       = city;                             // значение = название города
  option.textContent = city;                             // текст тоже = название города
  select.appendChild(option);                           // добавить в список
});

select.addEventListener('change', () => {    // сработает когда пользователь выберет пункт
  console.log('Выбран:', select.value);      // вывести выбранное значение
});
```
