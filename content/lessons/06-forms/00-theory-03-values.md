---
title: "Получение и проверка значений полей"
highlight: js
type: theory
---

# Получение и проверка значений полей

После перехвата submit нужно прочитать, что ввёл пользователь.

## Чтение значений

```js
const emailInput  = document.getElementById('email');
const email       = emailInput.value;        // строка с тем, что ввёл пользователь
const trimmedEmail = email.trim();           // .trim() убирает пробелы в начале и конце
```

## Проверка на пустоту

```js
if (!trimmedEmail) {                         // пустая строка — falsy, условие выполнится
  console.log('Поле email пустое!');
}
```

## Полный пример

```js
form.addEventListener('submit', (e) => {
  e.preventDefault(); // отменить перезагрузку

  const email    = document.getElementById('email').value.trim();    // читаем email и чистим пробелы
  const password = document.getElementById('password').value;        // читаем пароль (не чистим — пробел может быть частью пароля)

  if (!email) {             // если email пустой после trim()
    alert('Введите email');
    return;                 // прекратить выполнение функции
  }

  if (password.length < 6) { // если пароль короче 6 символов
    alert('Пароль слишком короткий');
    return;
  }

  console.log('Данные валидны:', email); // всё ок — продолжаем
});
```

## 🛠 Задание

Прочитайте значения полей `#username` и `#password`. Проверьте что они не пустые и выведите сообщение.

```js:start
const form = document.querySelector('#loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = /* ? */;
  const password = /* ? */;

  // Проверьте на пустоту
});
```

```js:solution
const form = document.querySelector('#loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // отменить перезагрузку

  const username = document.getElementById('username').value.trim(); // читаем и чистим пробелы
  const password = document.getElementById('password').value.trim(); // читаем и чистим пробелы

  if (!username || !password) { // если хотя бы одно поле пустое
    console.log('Заполните все поля!');
    return; // выходим — не продолжаем
  }

  console.log('Логин:', username); // оба поля заполнены — всё ок
});
```
