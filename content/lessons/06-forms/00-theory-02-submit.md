---
title: "Событие submit и preventDefault"
highlight: js
type: theory
---

# Событие submit и preventDefault

Когда пользователь нажимает кнопку `type="submit"` — форма генерирует событие `submit`. По умолчанию браузер **перезагружает страницу** и отправляет данные на сервер. Нам это не нужно — мы перехватываем событие через JS.

## preventDefault — отменить действие по умолчанию

```js
const form = document.querySelector('#bookingForm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // отменить перезагрузку страницы и отправку на сервер

  // Теперь можно читать данные и делать что угодно
  console.log('Форма отправлена!');
});
```

**Что происходит без `e.preventDefault()`:** страница мигает (перезагружается), поля сбрасываются, URL меняется (`?name=...`).

## Чтение полей — FormData

`FormData` — современный способ читать все поля формы сразу:

```js
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);   // создать объект из всех полей формы

  const name  = data.get('name');    // значение поля name="name"
  const email = data.get('email');   // значение поля name="email"
  const date  = data.get('date');

  console.log({ name, email, date });
});
```

**Имена полей** в `data.get('...')` берутся из атрибута `name` тега `<input>`.

## Чтение полей напрямую

```js
const nameInput  = document.querySelector('[name="name"]');
const emailInput = document.querySelector('[name="email"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name  = nameInput.value.trim();   // .trim() убирает лишние пробелы
  const email = emailInput.value.trim();

  if (!name) {
    alert('Введите имя');
    return; // прекратить выполнение
  }

  console.log({ name, email });
});
```

## Сброс формы после отправки

```js
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);

  // ... обработать данные ...

  form.reset(); // сбросить все поля в начальное состояние
});
```

## 🛠 Задание

Перехватите submit формы. Прочитайте поля `name` и `email` через `FormData`. Выведите в консоль объект с данными.

```js:start
const form = document.querySelector('#bookingForm');

form.addEventListener('submit', (e) => {
  // Отмените поведение по умолчанию
  // Прочитайте name и email через FormData
  // Выведите через console.log
});
```

```js:solution
const form = document.querySelector('#bookingForm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // отменить перезагрузку страницы

  const data  = new FormData(form);      // прочитать все поля формы
  const name  = data.get('name');        // поле с name="name"
  const email = data.get('email');       // поле с name="email"

  console.log({ name, email });
  // → { name: 'Иван', email: 'ivan@mail.ru' }

  form.reset(); // сбросить поля после успешной обработки
});
```
