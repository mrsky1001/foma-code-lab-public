---
title: "Рефакторинг и принцип DRY"
highlight: js
type: theory
---

# Рефакторинг и принцип DRY

**Рефакторинг** — улучшение структуры кода без изменения его поведения. Код делает то же самое, но написан чище.

**DRY** (Don't Repeat Yourself) — «Не повторяй себя». Если один и тот же код встречается в нескольких местах — вынеси его в функцию.

## Признаки кода требующего рефакторинга

1. **Дублирование** — один и тот же код в 2+ местах → вынести в функцию
2. **Длинные функции** — функция делает слишком много → разбить на несколько
3. **Магические числа** — `300` непонятно что → `const DELAY_MS = 300`
4. **Вложенные if** — глубокие условия → ранний возврат (`guard clause`)

## Пример 1: устранение дублирования

```js
// ПЛОХО: одно и то же в трёх местах
document.querySelector('#btn1').style.background = '#007bff';
document.querySelector('#btn1').style.color = 'white';
document.querySelector('#btn2').style.background = '#007bff';
document.querySelector('#btn2').style.color = 'white';

// ХОРОШО: вынести в функцию
function styleAsBlue(selector) {
  const el = document.querySelector(selector);
  if (!el) return;           // guard clause: не упасть если элемент не найден
  el.style.background = '#007bff';
  el.style.color = 'white';
}

styleAsBlue('#btn1');
styleAsBlue('#btn2');
```

## Пример 2: магические числа → именованные константы

```js
// ПЛОХО: что значит 300? почему 5?
setTimeout(hideLoader, 300);
if (text.length > 5) { ... }

// ХОРОШО: имена объясняют смысл
const LOADER_DELAY_MS = 300;  // задержка скрытия лоадера
const MIN_QUERY_LENGTH = 5;   // минимум символов для поиска

setTimeout(hideLoader, LOADER_DELAY_MS);
if (text.length > MIN_QUERY_LENGTH) { ... }
```

## Пример 3: вложенные if → ранний возврат

```js
// ПЛОХО: «стрелочный» код — несколько уровней вложенности
function processBooking(user, room) {
  if (user) {
    if (room) {
      if (room.isAvailable) {
        // основная логика глубоко внутри
        book(user, room);
      }
    }
  }
}

// ХОРОШО: guard clauses — ранний выход при проверке условий
function processBooking(user, room) {
  if (!user) return;              // нет пользователя — выйти
  if (!room) return;              // нет комнаты — выйти
  if (!room.isAvailable) return;  // комната занята — выйти

  book(user, room);               // основная логика — без вложенности
}
```

## Пример 4: разбить длинную функцию

```js
// ПЛОХО: одна функция делает всё
function handleSubmit(e) {
  e.preventDefault();
  const name = document.querySelector('[name="name"]').value.trim();
  const email = document.querySelector('[name="email"]').value.trim();
  if (!name || !email) { alert('Заполните поля'); return; }
  const user = { name, email, date: new Date().toISOString() };
  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = 'catalog.html';
}

// ХОРОШО: каждая функция — одна задача
function getFormData() {
  return {
    name:  document.querySelector('[name="name"]').value.trim(),
    email: document.querySelector('[name="email"]').value.trim()
  };
}

function validateData({ name, email }) {
  if (!name || !email) { alert('Заполните поля'); return false; }
  return true;
}

function saveUser(data) {
  localStorage.setItem('user', JSON.stringify({ ...data, date: new Date().toISOString() }));
}

function handleSubmit(e) {
  e.preventDefault();
  const data = getFormData();
  if (!validateData(data)) return;
  saveUser(data);
  window.location.href = 'catalog.html';
}
```

## 🛠 Задание

Перепишите функцию `applyStyles` без повторений. Вынесите общую логику и добавьте guard clause.

```js:start
// ПЛОХО:
function applyStyles() {
  const header = document.querySelector('#header');
  if (header) {
    header.style.background = '#1a1a2e';
    header.style.color = 'white';
    header.style.padding = '16px';
  }
  const footer = document.querySelector('#footer');
  if (footer) {
    footer.style.background = '#1a1a2e';
    footer.style.color = 'white';
    footer.style.padding = '16px';
  }
}

// ХОРОШО: вынесите общую логику в функцию styleDark(selector)
function styleDark(selector) {
  // ...
}
```

```js:solution
// Выносим повторяющуюся логику в функцию
function styleDark(selector) {
  const el = document.querySelector(selector);
  if (!el) return;               // guard clause: не падать если элемент не найден
  el.style.background = '#1a1a2e'; // тёмный фон
  el.style.color = 'white';        // белый текст
  el.style.padding = '16px';       // отступы
}

// DRY: вызов вместо дублирования
styleDark('#header');
styleDark('#footer');
// Легко расширить: styleDark('#sidebar')
```
