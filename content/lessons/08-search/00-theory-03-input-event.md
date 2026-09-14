---
title: "Событие input — живой поиск"
highlight: js
type: theory
---

# Событие input — живой поиск

Событие `input` срабатывает **при каждом изменении** значения поля — каждый введённый или удалённый символ.

## input vs change

| Событие | Когда срабатывает |
|---------|-------------------|
| `input` | При каждом символе (живой поиск) |
| `change` | Только когда поле теряет фокус |

## Живой поиск

```js
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => { // срабатывает на каждый введённый символ
  const query = searchInput.value.toLowerCase().trim(); // получить текст, привести к нижнему регистру

  const filtered = allRooms.filter(room =>
    room.name.toLowerCase().includes(query) // проверить, входит ли запрос в название
  );

  renderRooms(filtered); // перерисовать список с отфильтрованными результатами
});
```

## Оптимизация — debounce

При быстром вводе не нужно фильтровать на каждый символ. Можно подождать паузу:

```js
let timeout; // переменная для хранения id таймера

searchInput.addEventListener('input', () => {
  clearTimeout(timeout); // сбросить предыдущий таймер (если пользователь ещё печатает)
  timeout = setTimeout(() => {
    filterRooms(); // выполнить только если пауза в наборе >= 300 мс
  }, 300);
});
```

## 🛠 Задание

Сделайте поле поиска. При вводе фильтруйте список имён и показывайте только подходящие.

```js:start
const names = ['Алексей', 'Мария', 'Александра', 'Дмитрий', 'Марина'];
const input = document.querySelector('#search');
const list  = document.querySelector('#list');

input.addEventListener('input', () => {
  const query  = input.value.toLowerCase();
  const filtered = names.filter(/* ? */);
  list.innerHTML = filtered.map(n => `<li>${n}</li>`).join('');
});
```

```js:solution
const names = ['Алексей', 'Мария', 'Александра', 'Дмитрий', 'Марина'];
const input = document.querySelector('#search');
const list  = document.querySelector('#list');

input.addEventListener('input', () => {
  const query    = input.value.toLowerCase();                           // запрос в нижнем регистре
  const filtered = names.filter(n => n.toLowerCase().includes(query)); // оставить только совпадения
  list.innerHTML = filtered.map(n => `<li>${n}</li>`).join('');        // сгенерировать <li> и вставить
});
```
