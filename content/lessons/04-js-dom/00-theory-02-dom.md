---
title: "Что такое DOM?"
highlight: js
type: theory
---

# Что такое DOM?

DOM (Document Object Model) — это представление HTML-страницы в виде **дерева объектов**, которое JavaScript может читать и изменять.

```
document
  └── html
        ├── head
        │     └── title
        └── body
              ├── header
              ├── main
              │     └── h1
              └── footer
```

Каждый элемент HTML = **узел (node)** в этом дереве.

## Доступ к DOM из JavaScript

```js
// Доступ к элементам страницы
document.body                         // сам тег <body>
document.querySelector('h1')          // первый тег h1 на странице
document.querySelectorAll('.card')    // все элементы с классом .card (список)
document.getElementById('header')    // элемент с атрибутом id="header"
```

## Изменение DOM

```js
const title = document.querySelector('h1'); // найти первый заголовок

title.textContent = 'Новый заголовок'; // изменить текстовое содержимое
title.style.color = 'red';             // изменить CSS-стиль через JS
title.classList.add('active');         // добавить CSS-класс к элементу
```

## 🛠 Задание

Найдите элемент с id `greeting` и измените его текст на «Привет из JavaScript!».

```html:start
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><title>DOM</title></head>
<body>
  <h1 id="greeting">Исходный текст</h1>
  <script>
    // Найдите #greeting и измените textContent
  </script>
</body>
</html>
```

```js:start
// Найдите элемент и измените текст
```

```js:solution
const greeting = document.getElementById('greeting'); // найти элемент с id="greeting"
greeting.textContent = 'Привет из JavaScript!';       // заменить текст
greeting.style.color = '#007bff';                     // сделать текст синим
```
