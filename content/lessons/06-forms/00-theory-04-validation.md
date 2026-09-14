---
title: "Визуальная валидация форм"
highlight: js
type: theory
---

# Визуальная валидация форм

Хорошая форма не просто говорит «ошибка» — она подсвечивает конкретное поле и объясняет что не так.

## Паттерн через CSS-классы

```css
.input-error {
  border-color: #dc3545;      /* красная рамка у поля с ошибкой */
  background-color: #fff5f5;  /* лёгкий розовый фон */
}

.error-message {
  color: #dc3545;    /* красный текст сообщения об ошибке */
  font-size: 12px;   /* маленький шрифт под полем */
  margin-top: 4px;   /* небольшой отступ от поля */
}
```

```js
function showError(input, message) {
  input.classList.add('input-error'); // подсветить поле красным

  // Найти или создать блок ошибки под полем
  let errorEl = input.nextElementSibling; // следующий элемент после input
  if (!errorEl || !errorEl.classList.contains('error-message')) {
    errorEl = document.createElement('span'); // создать новый span
    errorEl.className = 'error-message';      // назначить класс
    input.after(errorEl);                     // вставить сразу после input
  }
  errorEl.textContent = message; // задать текст ошибки
}

function clearError(input) {
  input.classList.remove('input-error'); // убрать красную рамку
  const errorEl = input.nextElementSibling;
  if (errorEl?.classList.contains('error-message')) { // ?. — безопасное обращение (если null — не упадёт)
    errorEl.remove(); // удалить блок с ошибкой
  }
}
```

## 🛠 Задание

Напишите функцию `validate(input)`, которая добавляет класс `input-error` если поле пустое, или убирает его если заполнено.

```js:start
function validate(input) {
  if (input.value.trim() === '') {
    // Добавьте класс input-error
  } else {
    // Уберите класс input-error
  }
}
```

```js:solution
function validate(input) {
  if (input.value.trim() === '') {          // поле пустое (или только пробелы)
    input.classList.add('input-error');     // подсветить красным
    return false;                           // вернуть false — валидация не прошла
  } else {
    input.classList.remove('input-error'); // убрать красную рамку
    return true;                           // вернуть true — валидация прошла
  }
}
```
