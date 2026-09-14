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
