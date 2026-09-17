---
title: "Визуальная валидация"
highlight: js
type: theory
---

# Визуальная валидация форм

Показывать ошибки красиво — так же важно, как их находить. Хорошая UX практика: подсвечивать поле красной рамкой и показывать сообщение рядом с ним.

## Паттерн: обёртка поля

Оборачиваем каждое поле в `<div class="field-wrap">`. Это даёт нам надёжную точку для вставки ошибки:

```html
<div class="field-wrap">
  <input type="text" name="name" id="nameInput" placeholder="Имя">
  <span class="error-msg"></span>  <!-- сюда показываем ошибку -->
</div>
```

```css
.field-wrap input.error {
  border-color: #dc3545;             /* красная рамка при ошибке */
}

.error-msg {
  color: #dc3545;                    /* красный текст */
  font-size: 12px;
  opacity: 0;                        /* скрыто по умолчанию */
  transform: translateY(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease; /* плавное появление */
}

.error-msg.visible {
  opacity: 1;                        /* показать */
  transform: translateY(0);
}
```

## Функции showError и clearError

```js
function showError(input, message) {
  input.classList.add('error');      // красная рамка на input

  const wrap = input.closest('.field-wrap');   // найти обёртку-предка
  const msg  = wrap.querySelector('.error-msg'); // найти элемент для ошибки внутри обёртки

  msg.textContent = message;         // текст ошибки
  msg.classList.add('visible');      // показать с анимацией
}

function clearError(input) {
  input.classList.remove('error');   // убрать красную рамку

  const wrap = input.closest('.field-wrap');
  const msg  = wrap.querySelector('.error-msg');

  msg.textContent = '';
  msg.classList.remove('visible');   // скрыть
}
```

## Валидация при вводе (live)

```js
const nameInput = document.querySelector('[name="name"]');

// Очищать ошибку как только пользователь начинает исправлять
nameInput.addEventListener('input', () => {
  if (nameInput.value.trim().length >= 2) {
    clearError(nameInput);  // убрать ошибку если уже всё хорошо
  }
});
```

## Полная валидация при submit

```js
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  const name = nameInput.value.trim();
  if (!name || name.length < 2) {
    showError(nameInput, 'Введите имя (минимум 2 символа)');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (!isValid) return; // есть ошибки — не отправляем

  // отправить данные
  console.log('Форма валидна:', name);
});
```

## 🛠 Задание

Напишите функцию `showError(input, message)` и `clearError(input)`. Используйте `closest('.field-wrap')` для поиска контейнера.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Визуальная валидация</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <form id="testForm" class="form-card">
      <div class="field-wrap">
        <label>Имя</label>
        <input type="text" id="nameField" placeholder="Введите имя">
        <span class="error-msg"></span>
      </div>
      <button type="submit" class="btn">Сохранить</button>
    </form>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 440px; margin: 0 auto; }
.form-card { background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; }
.field-wrap { margin-bottom: 16px; }
label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
input { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; }
.field-wrap.error input { border-color: #ef4444; }
.error-msg { display: none; color: #ef4444; font-size: 12px; margin-top: 4px; }
.field-wrap.error .error-msg { display: block; }
.btn { width: 100%; background: #0ea5e9; color: #ffffff; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; }
```

```js:start
function showError(input, message) {
  // Добавьте класс 'error' на input
  // Найдите .error-msg через closest + querySelector
  // Установите текст и класс 'visible'
}

function clearError(input) {
  // Уберите класс 'error' с input
  // Очистите текст .error-msg и уберите 'visible'
}
```

```js:solution
function showError(input, message) {
  input.classList.add('error');                    // красная рамка на поле

  const wrap = input.closest('.field-wrap');        // ближайший предок .field-wrap
  const msg  = wrap?.querySelector('.error-msg');   // ?. — не упадёт если wrap = null

  if (msg) {
    msg.textContent = message;                     // текст ошибки
    msg.classList.add('visible');                  // показать с анимацией
  }
}

function clearError(input) {
  input.classList.remove('error');                 // убрать красную рамку

  const wrap = input.closest('.field-wrap');
  const msg  = wrap?.querySelector('.error-msg');

  if (msg) {
    msg.textContent = '';                          // очистить текст
    msg.classList.remove('visible');               // скрыть
  }
}
```
