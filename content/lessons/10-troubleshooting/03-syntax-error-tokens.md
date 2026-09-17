---
title: "SyntaxError: Unexpected token"
highlight: js
type: theory
---

# SyntaxError: Unexpected token и синтаксические ловушки

Если в коде допущена синтаксическая ошибка, JavaScript-движок браузера даже не начнёт выполнение файла — он упадёт на этапе парсинга:

> **✕ Uncaught SyntaxError: Unexpected token '}' (строка 45)**  
> *(или Unexpected identifier, Invalid or unexpected token)*

Слово **token** переводится как «лексема» — базовый кирпичик языка (скобка, слово, запятая, оператор). «Unexpected token» означает, что браузер встретил символ, которого по правилам грамматики JavaScript здесь быть не может.

---

## 🔍 Топ-3 частых причин синтаксических ошибок

### 1. Пропущенная запятая в объекте или массиве
В объектах пары «ключ: значение» обязательно разделяются запятыми:

```js
// ОШИБКА: пропущена запятая после названия
const room = {
  title: 'Мини-офис Focus'   // <- здесь должна быть запятая!
  price: 450,
  capacity: 2
};
```

### 2. Непарные скобки: `(`, `)`, `{`, `}`
Особенно часто это происходит во вложенных функциях или колбэках (`addEventListener`, `map`, `forEach`):

```js
// ОШИБКА: открыта скобка функции (), но не закрыта в конце
document.addEventListener('DOMContentLoaded', () => {
  console.log('Готово!');
// Забыли: });
```

### 3. Разные или незакрытые кавычки
Начали строку с одинарной кавычки, а закрыли двойной, или забыли закрыть:

```js
// ОШИБКА: смешивание типов кавычек
const text = 'Добро пожаловать в СмартОфис"; // Ошибка!
```

---

## 🛠 Как быстро находить ошибку

1. **Смотрите на номер строки в консоли DevTools:**  
   Кликните по ссылке `main.js:45` справа от текста ошибки — браузер подсветит место сбоя красной волнистой линией.
2. **Ищите ошибку на строке выше:**  
   Если в консоли указана строка 45, а на ней просто закрывающая скобка `}`, ошибка почти всегда допущена на предыдущих строках (например, забыта запятая на строке 44).
3. **Используйте подсветку парных скобок в редакторе:**  
   Кликните рядом со скобкой — редактор подсветит её пару. Если пара не подсвечивается — скобка потеряна.

---

## 🛠 Задание

Исправьте синтаксические ошибки в объекте комнаты `roomData`, чтобы код успешно скомпилировался и работал.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Синтаксические ошибки</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Проверка синтаксиса объекта</h2>
    <div id="output" class="output-box">Объект компилируется...</div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
```

```js:start
// Объект комнаты с синтаксическими ошибками — исправьте их:
const roomData = {
  id: 'focus-1'
  title: 'Мини-офис Focus',
  price: 450
  features: ['Wi-Fi 500 Мбит/с', '4K Монитор'
};
```

```js:solution
// Исправленный объект комнаты:
const roomData = {
  id: 'focus-1',                          // добавлена запятая
  title: 'Мини-офис Focus',               // строка оформлена корректно
  price: 450,                             // добавлена запятая
  features: ['Wi-Fi 500 Мбит/с', '4K Монитор'] // закрыта квадратная скобка массива
};
```
