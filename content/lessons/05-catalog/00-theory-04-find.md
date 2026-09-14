---
title: "Метод .find() — поиск в массиве"
highlight: js
type: theory
---

# Метод .find() — поиск в массиве

`.find()` находит **первый** элемент массива, для которого условие возвращает `true`.

```js
const rooms = [
  { id: 1, name: 'Focus', price: 450  },
  { id: 2, name: 'Alpha', price: 1200 },
  { id: 3, name: 'Hub',   price: 250  }
];

// Найти комнату с id === 2
const room = rooms.find(r => r.id === 2); // r — текущий элемент; === — строгое равенство
console.log(room.name); // 'Alpha'

// Найти первую комнату дешевле 500 рублей
const cheap = rooms.find(r => r.price < 500);
console.log(cheap.name); // 'Focus' (первая подходящая)
```

## Если не найдено — возвращает undefined

```js
const notFound = rooms.find(r => r.id === 99); // нет комнаты с id 99
console.log(notFound); // undefined

// Всегда проверяйте результат перед использованием!
if (!notFound) {
  console.log('Комната не найдена'); // защита от ошибки при обращении к undefined
}
```

## .findIndex() — найти индекс

```js
const idx = rooms.findIndex(r => r.id === 2); // вернёт позицию в массиве, не сам объект
console.log(idx); // 1 (нумерация с нуля: первый — 0, второй — 1)
```

## 🛠 Задание

Найдите в массиве студентов того, у кого оценка 5. Выведите его имя. Если не найден — выведите «Отличников нет».

```js:start
const students = [
  { name: 'Алексей', grade: 4 },
  { name: 'Мария',   grade: 5 },
  { name: 'Дмитрий', grade: 3 }
];

const topStudent = students.find(/* ? */);

if (topStudent) {
  console.log(/* ? */);
} else {
  console.log('Отличников нет');
}
```

```js:solution
const students = [
  { name: 'Алексей', grade: 4 },
  { name: 'Мария',   grade: 5 },
  { name: 'Дмитрий', grade: 3 }
];

const topStudent = students.find(s => s.grade === 5); // найти первого с оценкой 5

if (topStudent) {                          // если нашли — объект, не undefined
  console.log(topStudent.name);           // → 'Мария'
} else {                                   // если не нашли — undefined
  console.log('Отличников нет');
}
```
