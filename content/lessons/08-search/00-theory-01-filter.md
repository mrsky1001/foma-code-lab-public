---
title: "Метод .filter() — фильтрация массива"
highlight: js
type: theory
---

# Метод .filter() — фильтрация массива

`.filter()` создаёт новый массив, оставляя только те элементы, для которых условие вернуло `true`.

```js
const rooms = [
  { name: 'Focus', price: 450,  capacity: 1  },
  { name: 'Alpha', price: 1200, capacity: 10 },
  { name: 'Hub',   price: 250,  capacity: 5  }
];

// Только дешевле 500
const cheap = rooms.filter(room => room.price < 500);
// результат: [{ name: 'Focus', ... }, { name: 'Hub', ... }]

// Только большие (вместимость > 4)
const large = rooms.filter(room => room.capacity > 4);
// результат: [{ name: 'Alpha', ... }, { name: 'Hub', ... }]
```

## Поиск по строке

```js
const query = 'фо'; // строка поиска

const found = rooms.filter(room =>
  room.name.toLowerCase().includes(query.toLowerCase())
  // .toLowerCase() — перевести в нижний регистр для поиска без учёта регистра
  // .includes() — проверить, содержит ли строка подстроку
);
```

## Комбинирование фильтров

```js
const filtered = rooms
  .filter(r => r.price < 500)                        // сначала по цене
  .filter(r => r.name.toLowerCase().includes(query)); // потом по названию
// результат — пересечение обоих условий
```

## 🛠 Задание

Отфильтруйте массив товаров: оставьте только те, у которых цена меньше 1000 и название содержит «про».

```js:start
const products = [
  { name: 'Ноутбук Pro',    price: 800  },
  { name: 'Мышь',           price: 200  },
  { name: 'Монитор Pro',    price: 1500 },
  { name: 'Клавиатура Pro', price: 600  }
];

const result = products.filter(p => {
  // Ваше условие
});

console.log(result.map(p => p.name));
```

```js:solution
const products = [
  { name: 'Ноутбук Pro',    price: 800  },
  { name: 'Мышь',           price: 200  },
  { name: 'Монитор Pro',    price: 1500 },
  { name: 'Клавиатура Pro', price: 600  }
];

const result = products.filter(p =>
  p.price < 1000                            // цена меньше 1000
  && p.name.toLowerCase().includes('про')   // && — И; название содержит 'про'
);

console.log(result.map(p => p.name));
// ['Ноутбук Pro', 'Клавиатура Pro']
```
