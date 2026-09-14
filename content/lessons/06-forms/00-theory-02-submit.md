---
title: "Событие submit и preventDefault"
highlight: js
type: theory
---

# Событие submit и preventDefault

Когда пользователь нажимает кнопку типа `submit` внутри формы — срабатывает событие `submit`. По умолчанию браузер **перезагружает страницу**. Нам нужно это отменить.

## Перехват submit

```js
const form = document.getElementById('loginForm'); // найти форму по id

form.addEventListener('submit', (event) => {
  event.preventDefault(); // отменить стандартное поведение — перезагрузку страницы

  // Теперь наш код выполняется без перезагрузки
  console.log('Форма отправлена!');
});
```

## Почему preventDefault?

Без него:
1. Пользователь нажал «Войти»
2. Браузер перезагрузил страницу — все данные потеряны!

С ним:
1. Пользователь нажал «Войти»
2. Мы читаем поля, проверяем, отправляем на сервер — всё под нашим контролем.

## 🛠 Задание

Добавьте к форме обработчик submit. Отмените перезагрузку и выведите в консоль «Форма перехвачена!».

```js:start
const form = document.querySelector('#myForm');

// Добавьте обработчик submit
```

```js:solution
const form = document.querySelector('#myForm'); // найти форму в DOM

form.addEventListener('submit', (event) => {  // слушать событие отправки формы
  event.preventDefault();                     // отменить перезагрузку страницы
  console.log('Форма перехвачена!');          // наш код выполнился — страница не перезагрузилась
});
```
