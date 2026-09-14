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
