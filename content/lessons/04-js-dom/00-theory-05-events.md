---
title: "События и слушатели"
highlight: js
type: theory
---

# События и addEventListener

**Событие** — это уведомление о том, что что-то произошло: клик, нажатие клавиши, отправка формы. JavaScript может «слушать» события и реагировать на них.

## addEventListener — подписаться на событие

```js
element.addEventListener('событие', функция-обработчик);

const btn = document.querySelector('#myBtn');
btn.addEventListener('click', () => {        // при клике на кнопку
  console.log('Кнопка нажата!');
});
```

## Объект события (e)

Функция-обработчик получает объект события — он содержит информацию о том, что произошло:

```js
btn.addEventListener('click', (e) => {    // e — объект события
  console.log(e.target);                  // элемент на который кликнули
  console.log(e.type);                    // тип события: 'click'
  console.log(e.clientX, e.clientY);      // координаты мыши
});

document.addEventListener('keydown', (e) => {
  console.log(e.key);                     // нажатая клавиша: 'Enter', 'Escape', 'a'
  if (e.key === 'Enter') { /* ... */ }
});
```

## e.target vs e.currentTarget

```js
list.addEventListener('click', (e) => {
  e.target          // элемент на который кликнули (может быть дочерний)
  e.currentTarget   // элемент на котором висит слушатель (list)
});
```

## Делегирование событий

Вместо того чтобы вешать обработчик на каждый элемент списка — вешаем **один** обработчик на родителя:

```js
// Плохо: 100 карточек = 100 обработчиков
cards.forEach(card => {
  card.addEventListener('click', handleClick);
});

// Хорошо: один обработчик на контейнер
const catalog = document.querySelector('.catalog');
catalog.addEventListener('click', (e) => {
  // e.target — конкретный элемент на который кликнули
  const card = e.target.closest('.card');  // найти ближайшую карточку-предка
  if (!card) return;                       // кликнули не по карточке — выйти

  const id = card.dataset.id;             // прочитать id из data-атрибута
  openCard(id);
});
```

## Управление обработчиками

```js
function handleClick() {
  console.log('клик');
}

btn.addEventListener('click', handleClick);   // подписаться

btn.removeEventListener('click', handleClick); // отписаться (нужна та же функция!)

// Сработать один раз и автоматически отписаться:
btn.addEventListener('click', handleClick, { once: true });
```

## 🛠 Задание

Создайте список элементов. Через **делегирование** определяйте клик по кнопке удаления внутри `<li>` и удаляйте весь `<li>`.

```js:start
// HTML:
// <ul id="list">
//   <li>Пункт 1 <button class="del">✕</button></li>
//   <li>Пункт 2 <button class="del">✕</button></li>
// </ul>

const list = document.querySelector('#list');

// Повесьте ОДИН обработчик на list
// Через e.target определяйте клик по .del
// Удаляйте родительский <li>
```

```js:solution
const list = document.querySelector('#list');

// Один обработчик на весь список — делегирование событий
list.addEventListener('click', (e) => {
  // e.target — элемент на который кликнули (может быть span, button и т.д.)
  if (!e.target.matches('.del')) return; // выйти если кликнули не по кнопке удаления

  const li = e.target.closest('li');    // найти ближайший родительский <li>
  li.remove();                           // удалить его из DOM
});
```
