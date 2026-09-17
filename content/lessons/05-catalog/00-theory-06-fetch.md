---
title: "Сетевые запросы: fetch() и async/await"
highlight: js
type: theory
---

# Сетевые запросы: fetch() и async/await

В учебных проектах данные часто хранят прямо в коде — в виде массива объектов в файле `data.js`. В реальных веб-приложениях фронтенд загружает данные с сервера по сети в формате **JSON** (JavaScript Object Notation).

Для отправки сетевых запросов без перезагрузки страницы используется встроенная функция **`fetch()`**, а для удобной работы с асинхронным кодом — ключевые слова **`async` / `await`**.

---

## Что такое JSON?

**JSON** — это текстовый формат обмена данными. Он выглядит почти как обычный объект JavaScript, но со строгими правилами:
1. Имена всех свойств обязательно оборачиваются в **двойные кавычки** `"name"`;
2. Строковые значения — тоже только в двойных кавычках `"Фокус"`;
3. В конце списков и объектов запрещены завершающие запятые.

Пример файла `rooms.json`:
```json
[
  { "id": 1, "name": "Фокус", "price": 450 },
  { "id": 2, "name": "Альфа", "price": 1200 }
]
```

---

## Асинхронные функции: `async` и `await`

Сетевой запрос занимает время (от десятков миллисекунд до нескольких секунд). Чтобы интерфейс страницы не зависал во время ожидания ответа, запрос выполняется **асинхронно**.

- Ключевое слово `async` перед функцией говорит, что внутри неё будут асинхронные операции;
- Ключевое слово `await` заставляет JavaScript дождаться завершения операции (например, загрузки данных), не блокируя при этом остальную страницу:

```js
async function loadRooms() {
  try {
    // 1. Отправляем запрос к файлу или серверному API
    const response = await fetch('data/rooms.json');

    // 2. Проверяем, успешен ли ответ (код 200–299)
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    // 3. Преобразуем текстовый JSON в массив объектов JavaScript
    const rooms = await response.json();

    // 4. Отрисовываем полученные данные в DOM
    renderCatalog(rooms);

  } catch (error) {
    // Обрабатываем ошибки сети (нет интернета, файл не найден 404)
    console.error('Не удалось загрузить каталог:', error);
    showErrorMessage('Не удалось загрузить данные. Попробуйте позже.');
  }
}
```

> [!IMPORTANT]
> Метод `response.json()` — тоже асинхронный! Перед ним **обязательно** нужно ставить `await`, иначе вы получите не массив данных, а ожидающий промис (`Promise { <pending> }`).

---

## Состояния интерфейса: Loading, Error, Success

При работе с сетью профессиональный интерфейс обязан информировать пользователя:
1. **Loading (Загрузка):** показать спиннер или скелетон, пока данные летят по сети;
2. **Success (Успех):** спрятать спиннер и отобразить карточки через `.map()`;
3. **Error (Ошибка):** показать понятное сообщение с кнопкой «Повторить попытку».

---

## 🛠 Задание

Напишите асинхронную функцию `fetchPrice(url)`:
1. Выполните запрос с помощью `await fetch(url)`;
2. Распарсите JSON-ответ через `await response.json()`;
3. Верните полученный объект;
4. В блоке `catch` выведите ошибку через `console.error`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>fetch и async/await</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Сетевые запросы</h2>
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
async function fetchPrice(url) {
  try {
    // 1. Выполните fetch(url)
    // 2. Распарсите response.json()
    // 3. Верните результат
  } catch (error) {
    // Выведите ошибку
  }
}
```

```js:solution
async function fetchPrice(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
  }
}
```
