---
title: "Создание элементов через JavaScript"
highlight: js
type: theory
---

# Создание элементов через JavaScript

JavaScript позволяет создавать HTML-элементы прямо в коде — без написания HTML в файле.

## Три шага: создать → настроить → вставить

```js
// 1. Создать элемент (в памяти, ещё не на странице)
const div = document.createElement('div');  // создаёт <div></div>

// 2. Настроить внешний вид и содержимое
div.className = 'card';                   // задать CSS-класс
div.id = 'myCard';                        // задать атрибут id
div.textContent = 'Содержимое карточки'; // задать текст (HTML не интерпретируется)
div.style.color = 'red';                  // задать inline-стиль

// 3. Вставить в DOM (теперь появится на странице)
document.body.appendChild(div);           // добавить в конец <body>
parentElement.prepend(div);               // добавить в начало родителя
container.insertAdjacentHTML('beforeend', '<p>Текст</p>'); // вставить HTML-строкой
```

## innerHTML vs textContent

```js
el.textContent = '<b>Текст</b>'; // отобразит текст буквально: <b>Текст</b>
el.innerHTML  = '<b>Текст</b>';  // интерпретирует HTML → покажет: Текст (жирным)
```

## 🛠 Задание

Создайте элемент `<p>` с текстом «Создан через JS», классом `created` и добавьте его в `<div id="container">`.

```js:start
// 1. Создайте элемент p
// 2. Задайте textContent и className
// 3. Вставьте в #container
```

```js:solution
const p = document.createElement('p'); // создать элемент <p>
p.textContent = 'Создан через JS';     // задать текстовое содержимое
p.className = 'created';               // задать CSS-класс

const container = document.getElementById('container'); // найти div#container
container.appendChild(p);              // добавить <p> в конец контейнера
```
