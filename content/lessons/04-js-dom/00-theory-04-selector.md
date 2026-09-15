---
title: "querySelector и querySelectorAll"
highlight: js
type: theory
---

# querySelector и querySelectorAll

Чтобы работать с элементом через JavaScript — его сначала нужно найти. Для этого используются методы `querySelector` и `querySelectorAll`.

## querySelector — найти один элемент

Возвращает **первый** найденный элемент или `null` если ничего не нашлось:

```js
document.querySelector('.card')        // первая карточка на странице
document.querySelector('#main-nav')    // элемент с id="main-nav"
document.querySelector('h1')           // первый тег h1
document.querySelector('[data-id="3"]') // атрибутный селектор
document.querySelector('.catalog .card') // комбинирование
```

## querySelectorAll — найти все элементы

Возвращает **NodeList** — список всех подходящих элементов:

```js
const cards = document.querySelectorAll('.card'); // все карточки

// Перебор через forEach — работает напрямую
cards.forEach(card => {
  card.classList.add('visible');
});
```

## NodeList vs Array

`querySelectorAll` возвращает `NodeList`, **а не массив**. У него нет `.map()`, `.filter()`, `.find()`. Конвертируйте:

```js
const cards = document.querySelectorAll('.card');

// Способ 1: spread-оператор
const cardsArray = [...cards];

// Способ 2: Array.from()
const cardsArray = Array.from(cards);

// Теперь доступны все методы массива:
const prices = cardsArray.map(card => card.dataset.price);
```

## Поиск внутри элемента

Поиск не обязан начинаться с `document` — можно искать внутри конкретного элемента:

```js
const card = document.querySelector('.card');

// Поиск ВНУТРИ card, а не по всему документу
const title = card.querySelector('h3');       // h3 внутри этой карточки
const buttons = card.querySelectorAll('button'); // все кнопки внутри карточки
```

## closest — поиск предка

Двигается **вверх** по DOM-дереву и находит ближайшего предка с нужным селектором:

```js
// Пользователь кликнул на кнопку внутри карточки
deleteBtn.addEventListener('click', (e) => {
  const card = e.target.closest('.card');  // найти ближайший родитель .card
  // Не важно насколько глубоко вложена кнопка
  card.remove();
});
```

## 🛠 Задание

Найдите все карточки, конвертируйте NodeList в массив и отфильтруйте только доступные (с `data-available="true"`).

```js:start
// HTML: несколько <div class="card" data-available="true/false">

const allCards = document.querySelectorAll('.card');

// 1. Конвертируйте в массив через spread или Array.from
// 2. Отфильтруйте: оставьте только data-available="true"
// 3. Выведите количество доступных
```

```js:solution
const allCards = document.querySelectorAll('.card'); // NodeList всех карточек

// Конвертировать NodeList → Array чтобы использовать .filter()
const cardsArray = [...allCards];

// Отфильтровать: оставить только те где data-available="true"
const available = cardsArray.filter(card => card.dataset.available === 'true');
// dataset.available всегда строка, поэтому сравниваем с 'true' а не true

console.log('Доступно:', available.length); // количество доступных карточек
```
