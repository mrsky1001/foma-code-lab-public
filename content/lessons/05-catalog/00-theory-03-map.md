---
title: "Метод .map() и шаблонные строки"
highlight: js
type: theory
---

# Метод .map() и генерация динамического интерфейса

До сих пор мы создавали карточки в HTML вручную — копируя и вставляя один и тот же блок кода. Если в каталоге 50 комнат, вручную верстать их невозможно, а при изменении цены придётся править 50 мест в разметке.

Современный веб построен на концепции **Data-Driven UI (интерфейс, управляемый данными)**:
1. Данные хранятся в массиве объектов (например, в файле `data.js`);
2. Метод **`.map()`** преобразует каждый объект в кусок HTML-разметки;
3. Метод **`.join('')`** объединяет разметку в единую строку и вставляет в DOM.

---

## Как работает метод `.map()`

`.map()` перебирает массив и возвращает **новый массив**, где каждый элемент преобразован функцией-коллбэком. Исходный массив остаётся нетронутым:

```js
const prices = [450, 800, 1200];

// Умножаем каждую цену на 2:
const doubled = prices.map(price => price * 2); 
// → [900, 1600, 2400]

// Форматируем в строку с символом валюты:
const formatted = prices.map(price => `${price} ₽/час`);
// → ['450 ₽/час', '800 ₽/час', '1200 ₽/час']
```

---

## Шаблонные строки (Template Literals) для вёрстки

Обратные кавычки `` ` `` позволяют создавать многострочный HTML и без труда вставлять значения переменных через `${выражение}`:

```js
const room = { id: 1, name: 'Фокус', price: 450 };

const cardHtml = `
  <div class="card" data-id="${room.id}">
    <h3 class="card-title">${room.name}</h3>
    <p class="card-price">${room.price} ₽/час</p>
  </div>
`;
```

---

## ⚠️ Ловушка новичка: почему появляются запятые на странице?

Самый частый баг: студент написал `container.innerHTML = rooms.map(...)`, но на странице между карточками появились лишние запятые `,`:

```
[Карточка 1] , [Карточка 2] , [Карточка 3]
```

> [!WARNING]
> **Почему это происходит:**  
> Метод `.map()` возвращает **массив** строк: `['<div>...</div>', '<div>...</div>']`.  
> Когда вы присваиваете массив свойству `innerHTML`, браузер автоматически приводит его к строке через стандартный метод `.toString()`, который разделяет элементы массива **запятыми**!
> 
> **Решение:** всегда вызывайте **`.join('')`** в конце `.map()`. Метод `join('')` склеивает массив строк в один непрерывный текст без каких-либо разделителей:
> ```js
> container.innerHTML = rooms.map(room => `...`).join('');
> ```

---

## Условный рендеринг внутри шаблона

Внутри `${...}` можно использовать тернарный оператор `условие ? 'если да' : 'если нет'`:

```js
// Показываем зелёный или красный бейдж в зависимости от статуса:
const badge = `${room.isAvailable 
  ? '<span class="badge badge-green">Свободна</span>' 
  : '<span class="badge badge-red">Занята</span>'
}`;

// Показываем иконку только если комната популярна (иначе пустая строка):
const hotBadge = `${room.isPopular ? '<span class="tag">🔥 Хит</span>' : ''}`;
```

---

## 🛠 Задание

Преобразуйте массив комнат в HTML-разметку с помощью `.map()` и вставьте её в контейнер `#catalog`:
1. Каждая карточка должна иметь класс `card` и атрибут `data-id`;
2. Внутри выведите `h3.card-title` с названием комнаты и `p.card-price` с ценой;
3. Добавьте бейдж со статусом через тернарный оператор (`isAvailable ? 'Свободна' : 'Занята'`);
4. Не забудьте объединить строки через `.join('')`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>.map() и рендер HTML</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Каталог комнат</h2>
    <div id="catalog" class="rooms-grid"></div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 700px; margin: 0 auto; }
.rooms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px; }
.room-card { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
.room-card h3 { margin: 0 0 8px 0; font-size: 16px; }
.room-card p { margin: 0; color: #0ea5e9; font-weight: 600; }
```

```js:start
const rooms = [
  { id: 1, name: 'Фокус', price: 450, isAvailable: true },
  { id: 2, name: 'Альфа', price: 800, isAvailable: false }
];

const container = document.querySelector('#catalog');

// Сгенерируйте HTML карточек с помощью .map() и .join('')
```

```js:solution
const rooms = [
  { id: 1, name: 'Фокус', price: 450, isAvailable: true },
  { id: 2, name: 'Альфа', price: 800, isAvailable: false }
];

const container = document.querySelector('#catalog');

// Преобразуем массив данных в единую строку HTML без запятых
container.innerHTML = rooms.map(room => `
  <div class="card" data-id="${room.id}">
    <h3 class="card-title">${room.name}</h3>
    <p class="card-price">${room.price} ₽/час</p>
    ${room.isAvailable
      ? '<span class="badge badge-green">Свободна</span>'
      : '<span class="badge badge-red">Занята</span>'
    }
  </div>
`).join('');
```
