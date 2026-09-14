---
title: "classList — управление классами элемента"
highlight: js
type: theory
---

# classList — управление классами элемента

`classList` — это удобный интерфейс для работы с CSS-классами элемента через JavaScript.

## Методы classList

```js
const el = document.querySelector('.slide');

el.classList.add('active');       // добавить класс active (если уже есть — ничего не сделает)
el.classList.remove('active');    // убрать класс active (если нет — ничего не сделает)
el.classList.toggle('active');    // добавить если нет / убрать если есть — переключатель
el.classList.contains('active'); // → true или false: проверить, есть ли класс
```

## Практический пример — вкладки

```js
const tabs   = document.querySelectorAll('.tab');    // все кнопки-вкладки
const panels = document.querySelectorAll('.panel');  // все панели контента

tabs.forEach((tab, index) => {        // index — порядковый номер вкладки
  tab.addEventListener('click', () => {
    // Сначала убрать active со ВСЕХ
    tabs.forEach(t   => t.classList.remove('active'));   // все вкладки — неактивные
    panels.forEach(p => p.classList.remove('active'));   // все панели — скрытые

    // Потом добавить active только нужным
    tab.classList.add('active');          // подсветить нажатую вкладку
    panels[index].classList.add('active'); // показать соответствующую панель
  });
});
```

## 🛠 Задание

По клику на кнопку переключайте класс `dark` на элементе `body` (тёмная/светлая тема).

```js:start
const themeBtn = document.querySelector('#themeBtn');

themeBtn.addEventListener('click', () => {
  // Переключите класс dark на document.body
});
```

```js:solution
const themeBtn = document.querySelector('#themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark'); // добавить 'dark' если нет, убрать если есть
  themeBtn.textContent = document.body.classList.contains('dark')
    ? 'Светлая тема'   // если сейчас dark — предложить переключиться на светлую
    : 'Тёмная тема';   // иначе — предложить тёмную
});
```
