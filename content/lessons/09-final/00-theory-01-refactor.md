---
title: "Рефакторинг и принцип DRY"
highlight: js
type: theory
---

# Рефакторинг и принцип DRY

**Рефакторинг** — улучшение структуры кода без изменения его поведения.

**DRY** (Don't Repeat Yourself) — «Не повторяй себя». Если один и тот же код встречается в нескольких местах — вынеси его в функцию.

## Пример: код до рефакторинга

```js
// Плохо — одно и то же в трёх местах:
document.querySelector('#page1').style.display = 'none';
document.querySelector('#page2').style.display = 'none';
document.querySelector('#page3').style.display = 'none';
```

## После рефакторинга

```js
// Хорошо — функция:
function hideAll(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.style.display = 'none';
  });
}

hideAll('.page');
```

## Признаки кода, требующего рефакторинга

1. **Дублирование** — один и тот же код в 2+ местах
2. **Длинные функции** — функция делает слишком много всего
3. **Магические числа** — `300` вместо `const ANIMATION_DURATION = 300`

## 🛠 Задание

Перепишите код без повторений — вынесите общую логику в функцию.

```js:start
// Плохо — дублирование:
document.querySelector('#btn1').style.background = '#007bff';
document.querySelector('#btn1').style.color = 'white';

document.querySelector('#btn2').style.background = '#007bff';
document.querySelector('#btn2').style.color = 'white';

// Хорошо — напишите функцию makeBlue(selector):
function makeBlue(selector) {
  // ...
}
```

```js:solution
function makeBlue(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.style.background = '#007bff';
  el.style.color = 'white';
}

makeBlue('#btn1');
makeBlue('#btn2');
```
