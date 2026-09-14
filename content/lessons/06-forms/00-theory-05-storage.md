---
title: "localStorage для пользователя"
highlight: js
type: theory
---

# localStorage — хранение данных пользователя

Этот урок о практическом применении localStorage для сохранения данных формы. Базы localStorage/JSON разобраны в уроке «localStorage — хранение данных в браузере» (модуль 04).

## Сохранение данных формы

```js
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = {
    name:  document.querySelector('[name="name"]').value.trim(),
    email: document.querySelector('[name="email"]').value.trim()
  };

  // Сохранить в localStorage — JSON.stringify превращает объект в строку
  localStorage.setItem('currentUser', JSON.stringify(user));

  // Перейти на следующую страницу
  window.location.href = 'catalog.html';
});
```

## Загрузка сохранённых данных

```js
// Безопасное чтение с try/catch
function loadUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;           // ключ не найден
    return JSON.parse(raw);          // строка → объект
  } catch (e) {
    console.error('Ошибка чтения пользователя:', e);
    localStorage.removeItem('currentUser'); // удалить битые данные
    return null;
  }
}

const user = loadUser();
if (user) {
  console.log('Привет,', user.name);
  // Можно заполнить поля формы сохранёнными данными
  document.querySelector('[name="name"]').value  = user.name;
  document.querySelector('[name="email"]').value = user.email;
}
```

## sessionStorage — временные данные

```js
// sessionStorage работает как localStorage, но очищается при закрытии вкладки
sessionStorage.setItem('draft', JSON.stringify(formData)); // сохранить черновик
const draft = JSON.parse(sessionStorage.getItem('draft') || 'null');
```

| | localStorage | sessionStorage |
|--|-------------|----------------|
| Когда очищается | Только вручную | При закрытии вкладки |
| Между вкладками | Да | Нет |

## Выход из системы

```js
function logout() {
  localStorage.removeItem('currentUser');  // удалить данные пользователя
  window.location.href = 'index.html';     // редирект на главную
}
```

## 🛠 Задание

Напишите функцию `saveUser(name, email)` которая сохраняет объект в localStorage. Напишите `loadUser()` с try/catch. Если данные есть — заполните поля формы автоматически.

```js:start
function saveUser(name, email) {
  // Сохраните { name, email } в localStorage под ключом 'currentUser'
}

function loadUser() {
  // Прочитайте и распарсите данные с try/catch
  // Если нет — вернуть null
}

// При загрузке страницы — заполнить поля если есть сохранённые данные
const user = loadUser();
// Если user не null — заполните поля name и email
```

```js:solution
function saveUser(name, email) {
  const user = { name, email };                    // создать объект
  localStorage.setItem('currentUser', JSON.stringify(user)); // сохранить
}

function loadUser() {
  try {
    const raw = localStorage.getItem('currentUser'); // получить строку или null
    if (!raw) return null;                           // ключ не существует
    return JSON.parse(raw);                          // строка → объект
  } catch (e) {
    console.error('Повреждённые данные:', e);
    localStorage.removeItem('currentUser');          // удалить битые данные
    return null;
  }
}

// При загрузке страницы — автозаполнение если данные есть
const user = loadUser();
if (user) {
  document.querySelector('[name="name"]').value  = user.name;  // заполнить поле имя
  document.querySelector('[name="email"]').value = user.email; // заполнить email
}
```
