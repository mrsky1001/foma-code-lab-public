---
title: "Таймеры и localStorage"
highlight: js
type: theory
---

# Таймеры и localStorage

## setTimeout — выполнить один раз через N миллисекунд

```js
setTimeout(() => {
  console.log('Прошла 1 секунда!'); // выполнится один раз через 1000 мс
}, 1000); // 1000 мс = 1 секунда
```

## setInterval — повторять каждые N миллисекунд

```js
const timerId = setInterval(() => {
  console.log('Тик!'); // будет вызываться каждые 500 мс бесконечно
}, 500); // 500 мс = 0.5 секунды

// Остановить интервал:
clearInterval(timerId); // передаём тот же id, что вернул setInterval
```

## localStorage — постоянное хранилище в браузере

Данные сохраняются между перезагрузками страницы.

```js
// Сохранить строку по ключу
localStorage.setItem('username', 'Иван'); // ключ — 'username', значение — 'Иван'

// Прочитать по ключу
const name = localStorage.getItem('username'); // → 'Иван' (или null, если нет)

// Сохранить объект (нужно преобразовать в строку через JSON)
const user = { name: 'Иван', role: 'admin' };
localStorage.setItem('user', JSON.stringify(user)); // JSON.stringify → '{"name":"Иван",...}'

// Прочитать объект обратно
const savedUser = JSON.parse(localStorage.getItem('user')); // JSON.parse → объект
console.log(savedUser.name); // → 'Иван'

// Удалить ключ из хранилища
localStorage.removeItem('username');
```

## 🛠 Задание

Сохраните объект `{ name: 'Студент', score: 42 }` в localStorage. Прочитайте его и выведите имя в консоль.

```js:start
const data = { name: 'Студент', score: 42 };

// Сохраните data в localStorage под ключом 'progress'
// Прочитайте обратно и выведите name
```

```js:solution
const data = { name: 'Студент', score: 42 }; // объект с данными

localStorage.setItem('progress', JSON.stringify(data)); // сохранить: ключ 'progress', значение — JSON-строка

const saved = JSON.parse(localStorage.getItem('progress')); // прочитать и распарсить обратно в объект
console.log(saved.name); // → 'Студент'
```
