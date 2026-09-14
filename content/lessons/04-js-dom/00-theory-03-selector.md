---
title: "querySelector и querySelectorAll"
highlight: js
type: theory
---

# querySelector и querySelectorAll

Это два главных метода для поиска элементов в DOM.

## querySelector — найти один элемент

```js
const btn  = document.querySelector('.btn');    // первая кнопка с классом .btn
const nav  = document.querySelector('nav');     // первый тег <nav> на странице
const logo = document.querySelector('#logo');   // элемент с атрибутом id="logo"
const link = document.querySelector('nav a');   // первая ссылка <a> внутри <nav>
```

Возвращает **первый** найденный элемент или `null` если не найден.

## querySelectorAll — найти все

```js
const links = document.querySelectorAll('.nav-link');   // все .nav-link (NodeList)
const cards = document.querySelectorAll('.room-card');  // все .room-card

// Перебрать все найденные элементы
cards.forEach(card => {                    // forEach перебирает каждый элемент
  card.style.border = '2px solid red';    // добавить красную рамку каждой карточке
});
```

Возвращает **NodeList** — похожий на массив список всех найденных элементов.

## 🛠 Задание

Найдите все элементы с классом `.item` и добавьте им класс `highlighted`.

```js:start
// Найдите все .item и добавьте им класс highlighted
const items = document.querySelectorAll(/* ? */);

items.forEach(item => {
  // добавьте класс
});
```

```js:solution
const items = document.querySelectorAll('.item'); // найти все элементы с классом .item

items.forEach(item => {                           // перебрать каждый найденный элемент
  item.classList.add('highlighted');              // добавить класс highlighted к каждому
});
```
