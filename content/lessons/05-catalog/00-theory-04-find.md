---
title: "Метод .find() и поиск в массивах"
highlight: js
type: theory
---

# Метод .find() и поиск в массивах

## .find() — найти один элемент

`.find()` возвращает **первый элемент** для которого условие вернуло `true`. Если не нашлось — `undefined`.

```js
const rooms = [
  { id: 1, name: 'Альфа',  price: 1200, isAvailable: true  },
  { id: 2, name: 'Фокус',  price: 450,  isAvailable: false },
  { id: 3, name: 'Хаб',    price: 800,  isAvailable: true  }
];

const room = rooms.find(r => r.id === 2);
// → { id: 2, name: 'Фокус', price: 450, isAvailable: false }

const notFound = rooms.find(r => r.id === 99);
// → undefined (не нашлось)
```

**Типичное использование** — найти комнату по ID из URL:
```js
const id = parseInt(new URLSearchParams(location.search).get('id'));
const room = rooms.find(r => r.id === id);
if (!room) {
  // комната не найдена — показать 404
}
```

## .findIndex() — найти индекс

Возвращает **индекс** первого подходящего элемента (-1 если не нашлось):

```js
const idx = rooms.findIndex(r => r.id === 2); // → 1
```

Используется для удаления или обновления элемента:
```js
// Удалить элемент по id
const idx = rooms.findIndex(r => r.id === 2);
if (idx !== -1) {
  rooms.splice(idx, 1); // удалить 1 элемент с позиции idx
}
```

## .some() — хоть один подходит?

Возвращает `true` если хотя бы один элемент удовлетворяет условию:

```js
const hasAvailable = rooms.some(r => r.isAvailable === true);
// → true (хотя бы одна комната свободна)

const hasExpensive = rooms.some(r => r.price > 2000);
// → false (ни одной дороже 2000)
```

## .every() — все подходят?

Возвращает `true` только если **все** элементы удовлетворяют условию:

```js
const allAvailable = rooms.every(r => r.isAvailable === true);
// → false (Фокус недоступен)

const allAffordable = rooms.every(r => r.price < 2000);
// → true (все дешевле 2000)
```

## Сравнение методов поиска

| Метод | Возвращает | Когда |
|-------|-----------|-------|
| `.find()` | Первый подходящий элемент / `undefined` | Найти объект по id |
| `.findIndex()` | Индекс / `-1` | Найти позицию для удаления/замены |
| `.some()` | `true/false` | Проверить есть ли хоть один |
| `.every()` | `true/false` | Проверить все ли подходят |
| `.filter()` | Новый массив | Получить все подходящие |

## 🛠 Задание

Найдите комнату с id=3. Проверьте через `.some()` есть ли хоть одна свободная комната. Проверьте через `.every()` все ли комнаты дешевле 2000 ₽.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>.find() и поиск</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Поиск комнат</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }
```

```js:start
const rooms = [
  { id: 1, name: 'Альфа', price: 1200, isAvailable: true  },
  { id: 2, name: 'Фокус', price: 450,  isAvailable: false },
  { id: 3, name: 'Хаб',   price: 800,  isAvailable: true  }
];

// 1. Найдите комнату с id=3 через .find()
// 2. Проверьте есть ли хоть одна свободная (isAvailable) через .some()
// 3. Проверьте все ли дешевле 2000 через .every()
```

```js:solution
const rooms = [
  { id: 1, name: 'Альфа', price: 1200, isAvailable: true  },
  { id: 2, name: 'Фокус', price: 450,  isAvailable: false },
  { id: 3, name: 'Хаб',   price: 800,  isAvailable: true  }
];

// .find() — вернёт первый элемент где r.id === 3
const room = rooms.find(r => r.id === 3);
console.log(room); // → { id: 3, name: 'Хаб', price: 800, isAvailable: true }

// .some() — true если хотя бы одна комната свободна
const hasAvailable = rooms.some(r => r.isAvailable === true);
console.log('Есть свободные:', hasAvailable); // → true

// .every() — true только если ВСЕ дешевле 2000
const allAffordable = rooms.every(r => r.price < 2000);
console.log('Все дешевле 2000:', allAffordable); // → true
```
