---
title: "События и слушатели: addEventListener"
highlight: js
type: theory
---

# События и слушатели: addEventListener

**Событие (Event)** — это сигнал браузера о том, что что-то произошло: пользователь кликнул мышь, нажал клавишу, отправил форму или страница закончила загрузку HTML.

JavaScript может «слушать» эти сигналы и запускать соответствующие функции-обработчики.

---

## Метод `addEventListener`

Чтобы научить элемент реагировать на действие пользователя, используется метод `addEventListener`:

```js
элемент.addEventListener('название_события', функция_обработчик);
```

### Пример обработки клика:

```js
const bookBtn = document.querySelector('#bookBtn');

bookBtn.addEventListener('click', () => {
  console.log('Пользователь нажал кнопку бронирования!');
  bookBtn.textContent = 'Обработка...';
});
```

---

## Популярные типы событий

| Событие | Когда срабатывает | Где применяется |
| :--- | :--- | :--- |
| `'click'` | Клик мышью или тап на тачскрине | Кнопки, карточки, меню |
| `'input'` | Изменение значения в текстовом поле | Живой поиск, калькулятор стоимости |
| `'submit'` | Отправка HTML-формы | Авторизация, оформление заявки |
| `'DOMContentLoaded'` | Браузер построил всё дерево DOM | Безопасная инициализация скриптов |

---

## Объект события (`event` или `e`)

Браузер автоматически передаёт в функцию-обработчик специальный объект `event` (сокращённо `e`), содержащий все детали произошедшего:

```js
bookBtn.addEventListener('click', (e) => {
  console.log(e.type);   // 'click' — тип события
  console.log(e.target); // ссылка на элемент, по которому непосредственно кликнули
});
```

### Отмена стандартного поведения: `e.preventDefault()`

Некоторые элементы в браузере имеют поведение «по умолчанию»:
- Ссылка `<a>` пытается сразу перейти по URL;
- Форма `<form>` перезагружает страницу при отправке.

Чтобы отменить это поведение и обработать действие в JavaScript, вызывается `e.preventDefault()`:

```js
const link = document.querySelector('#termsLink');

link.addEventListener('click', (e) => {
  e.preventDefault(); // браузер НЕ переходит по ссылке
  showModal();        // вместо этого открываем всплывающее окно
});
```

> [!TIP]
> **Делегирование событий:** Когда на странице много однотипных элементов (например, десятки карточек в каталоге), вместо сотен отдельных слушателей вешают **один** слушатель на общий родительский контейнер. Этот паттерн мы подробно разберём и применим в **Модуле 05 (Каталог)**.

---

## 🛠 Задание

1. Найдите кнопку `#themeToggle`.
2. Добавьте к ней слушатель события `'click'`.
3. Внутри обработчика переключайте класс `'dark-theme'` у элемента `document.body` с помощью метода `classList.toggle('dark-theme')`.
4. Выводите в консоль сообщение `'Тема переключена'`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>События и слушатели</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Переключение темы</h2>
    <p>Нажмите кнопку для переключения класса <code>dark-theme</code> на странице.</p>
    <button id="themeToggle" class="btn">Переключить тему</button>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; padding: 30px; transition: background 0.3s, color 0.3s; }
body.dark-theme { background: #0f172a; color: #f8fafc; }
body.dark-theme .btn { background: #38bdf8; color: #0f172a; }
.sandbox { max-width: 500px; margin: 0 auto; text-align: center; }
.btn { background: #0ea5e9; color: #ffffff; border: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; }
```

```js:start
// HTML: <button id="themeToggle">Сменить тему</button>

const toggleBtn = document.querySelector('#themeToggle');

// Повесьте слушатель клика на toggleBtn
// Переключайте класс 'dark-theme' на document.body
```

```js:solution
const toggleBtn = document.querySelector('#themeToggle');

// Обработчик клика для смены темы
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  console.log('Тема переключена');
});
```
