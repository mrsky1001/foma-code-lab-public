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

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Создание элементов через JS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Список задач</h2>
    <ul id="list" class="todo-list">
      <li><span>Подготовить договор аренды</span> <button class="btn-del">Удалить</button></li>
    </ul>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.todo-list { list-style: none; padding: 0; margin-top: 16px; }
.todo-list li { display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 12px 16px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 8px; }
.btn-del { background: #fee2e2; color: #dc2626; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: 500; }
.btn-del:hover { background: #fecaca; }
```

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
      <button class="btn-del">Удалить</button>
    </li>
  `);

  // Найти только что добавленный li (последний дочерний элемент)
  const newLi = list.lastElementChild;

  // Повесить обработчик на кнопку удаления внутри этого li
  newLi.querySelector('.btn-del').addEventListener('click', () => {
    newLi.remove(); // удалить весь li
  });
}

addItem('Первый пункт');
addItem('Второй пункт');
```
