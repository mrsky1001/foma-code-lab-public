---
title: "URLSearchParams — чтение параметров из URL"
highlight: js
type: theory
---

# URLSearchParams — чтение параметров из URL

Страницы каталога часто передают данные через URL. Например:
`catalog.html?id=3&sort=price`

Параметры после `?` называются **query string** (строка запроса).

## Как прочитать параметры?

```js
// Текущий URL: page.html?id=3&sort=price

const params = new URLSearchParams(window.location.search);
// window.location.search → '?id=3&sort=price'
// URLSearchParams разбирает эту строку на пары ключ=значение

const id   = params.get('id');    // '3' — всегда возвращает строку!
const sort = params.get('sort');  // 'price'
const page = params.get('page');  // null — параметра нет в URL
```

## Преобразование типов

```js
const id = parseInt(params.get('id'), 10); // строку '3' → число 3 (10 — десятичная система)
```

## Проверка наличия параметра

```js
if (params.has('id')) {
  // параметр 'id' есть в URL → можно безопасно делать params.get('id')
}
```

## Практический пример — страница детали

```js
// URL: room.html?id=2
const params = new URLSearchParams(window.location.search); // прочитать строку запроса
const roomId = parseInt(params.get('id'), 10);              // получить id как число

const room = rooms.find(r => r.id === roomId); // найти комнату по id в массиве данных

if (!room) {                                              // если комната не найдена:
  document.body.innerHTML = '<h1>Комната не найдена</h1>'; // показать сообщение
  return;                                                  // прекратить выполнение
}
```

## 🛠 Задание

Прочитайте параметры `name` и `age` из URL `profile.html?name=Иван&age=25` и выведите их.

```js:start
// Допустим URL: ?name=Иван&age=25
const params = new URLSearchParams('name=Иван&age=25');

const name = /* ? */;
const age  = /* ? */;

console.log(`${name}, ${age} лет`);
```

```js:solution
const params = new URLSearchParams('name=Иван&age=25'); // разобрать строку запроса

const name = params.get('name');                // → 'Иван' (строка)
const age  = parseInt(params.get('age'), 10);   // → 25 (число, преобразовали из строки)

console.log(`${name}, ${age} лет`); // → 'Иван, 25 лет'
```
