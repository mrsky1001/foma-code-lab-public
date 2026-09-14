---
title: "Создание элементов через JavaScript"
highlight: js
type: theory
---

# Создание элементов через JavaScript

Два основных подхода для динамического добавления HTML: `createElement` и `insertAdjacentHTML`.

## createElement — создать элемент программно

```js
// 1. Создать элемент
const card = document.createElement('div'); // создать <div>

// 2. Настроить
card.className = 'card';                    // добавить класс
card.dataset.id = 3;                        // добавить data-id="3"
card.innerHTML = '<h3>Новая комната</h3>';  // вставить содержимое

// 3. Добавить в DOM
const catalog = document.querySelector('.catalog');
catalog.appendChild(card);   // в конец catalog
```

## insertAdjacentHTML — вставить HTML-строку

Быстрее и удобнее для шаблонов:

```js
const catalog = document.querySelector('.catalog');

catalog.insertAdjacentHTML('beforeend', `
  <div class="card">
    <h3>Новая комната</h3>
    <p>800 ₽/час</p>
  </div>
`);
```

**Позиции вставки:**

```
<!-- beforebegin -->
<div class="catalog">         ← afterbegin
  [существующий контент]
</div>                        ← afterend
<!-- afterend -->
```

| Позиция | Куда вставляет |
|---------|----------------|
| `'beforebegin'` | Перед элементом (снаружи) |
| `'afterbegin'` | Внутрь, в начало |
| `'beforeend'` | Внутрь, в конец |
| `'afterend'` | После элемента (снаружи) |

## Удаление и замена

```js
const card = document.querySelector('.card');

card.remove();                      // удалить элемент из DOM

const newCard = document.createElement('div');
card.replaceWith(newCard);          // заменить card на newCard

const anotherCard = document.createElement('div');
card.before(anotherCard);           // вставить anotherCard перед card
card.after(anotherCard);            // вставить anotherCard после card
```

## Практический паттерн — рендер массива

```js
function renderRooms(rooms) {
  const catalog = document.querySelector('.catalog');

  // Очистить и перерисовать
  catalog.innerHTML = rooms.map(room => `
    <div class="card" data-id="${room.id}">
      <h3 class="card-title">${room.name}</h3>
      <p class="card-price">${room.price} ₽/час</p>
    </div>
  `).join(''); // join('') убирает запятые между строками
}
```

## 🛠 Задание

Напишите функцию `addItem(text)` которая создаёт `<li>` с кнопкой удаления и добавляет в `<ul>`. При клике на кнопку — `<li>` удаляется.

```js:start
const list = document.querySelector('#list');

function addItem(text) {
  // Создайте li с текстом и кнопкой удаления
  // Добавьте в list
  // Повесьте обработчик удаления
}

addItem('Первый пункт');
addItem('Второй пункт');
```

```js:solution
const list = document.querySelector('#list');

function addItem(text) {
  // insertAdjacentHTML — быстро и удобно для HTML-шаблонов
  list.insertAdjacentHTML('beforeend', `
    <li>
      ${text}
      <button class="del-btn">Удалить</button>
    </li>
  `);

  // Найти только что добавленный li (последний дочерний элемент)
  const newLi = list.lastElementChild;

  // Повесить обработчик на кнопку удаления внутри этого li
  newLi.querySelector('.del-btn').addEventListener('click', () => {
    newLi.remove(); // удалить весь li
  });
}

addItem('Первый пункт');
addItem('Второй пункт');
```
