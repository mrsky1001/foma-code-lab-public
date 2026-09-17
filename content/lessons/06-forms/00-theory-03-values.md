---
title: "Получение и проверка значений формы"
highlight: js
type: theory
---

# Получение и проверка значений формы

## Чтение значений полей

```js
const nameInput  = document.querySelector('[name="name"]');
const emailInput = document.querySelector('[name="email"]');

const name  = nameInput.value.trim();    // .trim() убирает пробелы по краям
const email = emailInput.value.trim();

// Для чекбокса — .checked (boolean)
const agree = document.querySelector('[name="agree"]').checked; // true/false

// Для select — .value
const type = document.querySelector('[name="roomType"]').value; // строка
```

## Валидация — ручная проверка

```js
function validateForm(name, email) {
  const errors = [];

  if (!name) {
    errors.push('Введите имя');         // пустое поле
  }

  if (name.length < 2) {
    errors.push('Имя слишком короткое');
  }

  if (!email.includes('@')) {
    errors.push('Некорректный email');   // упрощённая проверка
  }

  return errors; // пустой массив = нет ошибок
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors = validateForm(name, email);
  if (errors.length > 0) {
    console.log(errors);
    return; // остановить если есть ошибки
  }
  // отправить данные
});
```

## Regex для проверки email

```js
// Регулярное выражение для email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailRegex.test('user@mail.ru')    // → true
emailRegex.test('usermail.ru')     // → false (нет @)
emailRegex.test('user@mail')       // → false (нет домена)
emailRegex.test('user @mail.ru')   // → false (пробел)
```

## Встроенная валидация браузера

```js
const input = document.querySelector('[name="email"]');

input.validity.valid         // → true/false — поле валидно?
input.validity.valueMissing  // → true если required и пустое
input.validity.typeMismatch  // → true если type="email" и формат неверный

// Кастомное сообщение об ошибке
input.setCustomValidity('Введите корпоративный email @company.ru');
input.reportValidity(); // показать сообщение
input.setCustomValidity(''); // сбросить — поле снова валидно
```

## Важно: серверная валидация

Клиентская валидация — только для удобства пользователя. Никогда не доверяйте только ей: любой может открыть DevTools и отправить форму с любыми данными. **Всегда валидируйте на сервере**.

## 🛠 Задание

Напишите функцию `validate(name, email)`. Она должна возвращать массив ошибок: пустое имя, имя < 2 символов, проверка email через regex.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Валидация значений</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <form id="validateForm" class="form-card">
      <div class="field">
        <label>Имя</label>
        <input type="text" id="nameInput" placeholder="Иван">
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" id="emailInput" placeholder="example@mail.ru">
      </div>
      <button type="button" class="btn" id="checkBtn">Проверить</button>
      <div id="errorsList" style="margin-top: 12px; color: #dc2626; font-size: 13px;"></div>
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
function validate(name, email) {
  const errors = [];
  // Проверьте: имя не пустое, имя >= 2 символа, email через regex
  return errors;
}

console.log(validate('', 'test'));          // ['Введите имя', 'Некорректный email']
console.log(validate('А', 'a@b.ru'));       // ['Имя слишком короткое']
console.log(validate('Иван', 'a@b.ru'));    // [] — нет ошибок
```

```js:solution
function validate(name, email) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // паттерн email

  if (!name.trim()) {                     // пустая строка или только пробелы
    errors.push('Введите имя');
  } else if (name.trim().length < 2) {   // имя слишком короткое
    errors.push('Имя слишком короткое');
  }

  if (!emailRegex.test(email)) {         // проверка формата email через regex
    errors.push('Некорректный email');
  }

  return errors; // пустой массив если ошибок нет
}

console.log(validate('', 'test'));         // → ['Введите имя', 'Некорректный email']
console.log(validate('А', 'a@b.ru'));      // → ['Имя слишком короткое']
console.log(validate('Иван', 'a@b.ru'));   // → [] — валидация пройдена
```
