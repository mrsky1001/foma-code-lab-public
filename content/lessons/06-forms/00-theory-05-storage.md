---
title: "localStorage для сохранения данных пользователя"
highlight: js
type: theory
---

# localStorage для сохранения данных пользователя

После успешной авторизации нужно «запомнить» пользователя. Для этого используют `localStorage`.

## Сохранение пользователя при входе

```js
const user = {
  name:       'Иван Петров',
  email:      'ivan@mail.ru',
  isLoggedIn: true            // флаг: пользователь вошёл
};

localStorage.setItem('currentUser', JSON.stringify(user));
// JSON.stringify превращает объект в строку: '{"name":"Иван Петров",...}'
// localStorage хранит только строки — поэтому нужен JSON
```

## Проверка при загрузке страницы

```js
const raw = localStorage.getItem('currentUser'); // прочитать строку из хранилища

if (raw) {                              // если строка есть (не null)
  const user = JSON.parse(raw);        // JSON.parse: строка → объект
  console.log('Добро пожаловать,', user.name); // пользователь авторизован
} else {
  window.location.href = 'login.html'; // гость — перенаправить на вход
}
```

## Выход (logout)

```js
function logout() {
  localStorage.removeItem('currentUser'); // удалить данные пользователя из хранилища
  window.location.href = 'login.html';   // перенаправить на страницу входа
}
```

## 🛠 Задание

Напишите функцию `login(email)`, которая сохраняет объект `{ email, loggedIn: true }` в localStorage. И функцию `isLoggedIn()`, которая возвращает `true` если пользователь авторизован.

```js:start
function login(email) {
  // Сохраните объект в localStorage под ключом 'user'
}

function isLoggedIn() {
  // Верните true если 'user' есть в localStorage
}
```

```js:solution
function login(email) {
  const user = { email, loggedIn: true };        // создаём объект (email: email — краткая запись)
  localStorage.setItem('user', JSON.stringify(user)); // сохраняем как JSON-строку
}

function isLoggedIn() {
  const raw = localStorage.getItem('user');  // читаем строку из хранилища
  if (!raw) return false;                    // ключ не найден — пользователь не вошёл
  const user = JSON.parse(raw);             // распарсить строку обратно в объект
  return user.loggedIn === true;            // вернуть флаг авторизации
}

login('test@mail.ru');
console.log(isLoggedIn()); // true
```
