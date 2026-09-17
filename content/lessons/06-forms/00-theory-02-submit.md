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

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Событие submit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <form id="bookingForm" class="form-card">
      <div class="field">
        <label>Имя</label>
        <input type="text" name="name" value="Иван Иванов" required>
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" name="email" value="ivan@mail.ru" required>
      </div>
      <button type="submit" class="btn">Отправить заявку</button>
    </form>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 440px; margin: 0 auto; }
.form-card { background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; }
.field { margin-bottom: 14px; }
label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
input { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; }
.btn { width: 100%; background: #0ea5e9; color: #ffffff; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; }
```

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
