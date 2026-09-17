---
title: "TypeError: Cannot read properties of null"
highlight: js
type: theory
---

# TypeError: Cannot read properties of null

Это абсолютный рекордсмен по частоте среди ошибок начинающих фронтенд-разработчиков:

> **✕ Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')**  
> *(или reading 'value', reading 'textContent', reading 'classList')*

Она означает: вы попытались вызвать метод или прочитать свойство у переменной, в которой лежит `null` (ничего нет).

---

## 🔍 Три главные причины

### 1. Скрипт запустился раньше, чем браузер построил HTML-дерево
Если скрипт подключён в `<head>` без атрибута `defer`, браузер останавливает чтение HTML и сразу выполняет JS. В этот момент элементов на странице ещё просто не существует!

```html
<!-- ОШИБКА: скрипт запустится до отрисовки <button> -->
<head>
  <script src="main.js"></script>
</head>
```

**Решение:** всегда добавляйте атрибут `defer` или оборачивайте код в `DOMContentLoaded`:
```html
<!-- ПРАВИЛЬНО: браузер загрузит скрипт параллельно, но запустит ПОСЛЕ готовности DOM -->
<script src="main.js" defer></script>
```

### 2. Опечатка в названии id или класса
Если написать в JS `#authBtn`, а в HTML `id="auth-btn"` — `querySelector` вернёт `null`.

```js
// Если элемент не найден, btn равен null:
const btn = document.querySelector('#authBtn'); // null!
btn.addEventListener('click', () => {});        // ОШИБКА! null.addEventListener
```

### 3. Элемент генерируется динамически
Например, карточки комнат или кнопки «Забронировать» создаются из массива через `map`. Если попытаться найти их до рендера — их ещё нет в DOM.

---

## 🛡 Как защитить свой код от падений (Graceful Handling)

### Способ 1. Условная проверка (`Guard Clause`)
```js
const submitBtn = document.getElementById('submitBooking');

// Проверяем существование элемента перед использованием
if (submitBtn) {
  submitBtn.addEventListener('click', handleBooking);
}
```

### Способ 2. Опциональная цепочка (`Optional Chaining ?.`)
Современный стандарт JavaScript позволяет обращаться к свойствам безопасно:
```js
// Если getElementById вернёт null, код просто вернёт undefined и не выбросит ошибку
document.getElementById('promoInput')?.addEventListener('input', applyPromo);
```

---

## 🛠 Задание

Исправьте функцию `bindSearchEvent()`, чтобы она не падала с ошибкой, если на текущей странице нет поля поиска `#searchInput`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TypeError: null DOM</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Безопасный поиск элементов</h2>
    <p>На этой странице нет поля <code>#searchInput</code>. Скрипт должен безопасно проверить наличие элемента перед добавлением слушателя.</p>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
```

```js:start
// Функция привязки события поиска
function bindSearchEvent() {
  const searchInput = document.querySelector('#searchInput');
  // Опасно: если searchInput равен null, страница упадет с ошибкой
  searchInput.addEventListener('input', (e) => {
    console.log('Поиск:', e.target.value);
  });
}
```

```js:solution
// Функция привязки события поиска
function bindSearchEvent() {
  const searchInput = document.querySelector('#searchInput');
  // Безопасная проверка: выходим из функции, если поля поиска нет на странице
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    // Безопасно считываем значение введенного текста
    console.log('Поиск:', e.target.value);
  });
}
```
