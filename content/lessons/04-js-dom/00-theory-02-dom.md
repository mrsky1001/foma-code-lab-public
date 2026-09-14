---
title: "DOM — дерево документа"
highlight: js
type: theory
---

# DOM — дерево документа

**DOM** (Document Object Model) — это представление HTML-страницы в виде объектов JavaScript. Браузер парсит HTML и строит дерево элементов. JavaScript работает именно с DOM, а не напрямую с HTML-текстом.

## Как выглядит DOM

```html
<body>
  <div class="catalog">
    <h2>Переговорные</h2>
    <div class="card" data-id="1">
      <h3>Альфа</h3>
      <p>800 ₽/час</p>
    </div>
  </div>
</body>
```

Это дерево объектов:
```
body
└── div.catalog
    ├── h2        → textContent: 'Переговорные'
    └── div.card  → dataset.id: '1'
        ├── h3    → textContent: 'Альфа'
        └── p     → textContent: '800 ₽/час'
```

## Чтение и изменение содержимого

```js
const card = document.querySelector('.card');

// textContent — только текст, без HTML-тегов (безопасно)
card.textContent          // → 'Альфа\n800 ₽/час' (весь текст внутри)
card.textContent = 'Новый текст'; // заменить текст (теги игнорируются)

// innerHTML — читает/устанавливает HTML (осторожно!)
card.innerHTML            // → '<h3>Альфа</h3><p>800 ₽/час</p>'
card.innerHTML = '<h3>Новое</h3>'; // заменить HTML-разметку
```

**Важно:** никогда не вставляйте пользовательский ввод через `innerHTML` — это XSS-уязвимость:

```js
// ОПАСНО: пользователь может ввести <script>alert('взлом')</script>
el.innerHTML = userInput;

// БЕЗОПАСНО: textContent экранирует все теги
el.textContent = userInput;
```

## Работа с атрибутами

```js
const img = document.querySelector('img');

img.getAttribute('src')         // → 'room.jpg' — получить атрибут
img.setAttribute('src', 'new.jpg') // изменить атрибут
img.removeAttribute('alt')      // удалить атрибут
img.hasAttribute('loading')     // → true/false — проверить наличие

// Удобный доступ к data-атрибутам через dataset
const card = document.querySelector('[data-id]');
card.dataset.id       // → '1' (всегда строка!)
card.dataset.type     // → значение data-type
card.dataset.myKey = 'hello'; // изменить data-my-key
```

## Свойства элемента

```js
el.id            // значение атрибута id
el.className     // строка всех классов: 'card active highlighted'
el.tagName       // тег в верхнем регистре: 'DIV', 'H1'
el.style.color   // инлайн-стиль: '' (пусто если не задан inline)
```

## 🛠 Задание

Найдите элемент с атрибутом `data-id="1"`, прочитайте его `data-id` через `dataset`, измените `textContent` заголовка h3 внутри.

```js:start
// HTML: <div class="card" data-id="1"><h3>Старый заголовок</h3></div>

const card = document.querySelector('[data-id="1"]');

// Прочитайте card.dataset.id
// Найдите h3 внутри card и измените textContent на 'Новый заголовок'
```

```js:solution
const card = document.querySelector('[data-id="1"]'); // найти карточку с data-id=1

const id = card.dataset.id;   // прочитать data-id через dataset → '1' (строка)
console.log('ID карточки:', id);

const title = card.querySelector('h3'); // найти h3 ВНУТРИ card (не во всём document)
title.textContent = 'Новый заголовок';  // изменить текст безопасно через textContent
```
