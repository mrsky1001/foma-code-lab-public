---
title: "classList — управление классами элемента"
highlight: js
type: theory
---

# classList — управление классами элемента

`classList` — удобный интерфейс для работы с CSS-классами через JavaScript.

## Методы classList

```js
const el = document.querySelector('.slide');

el.classList.add('active');           // добавить класс (если уже есть — ничего)
el.classList.remove('active');        // убрать класс (если нет — ничего)
el.classList.toggle('active');        // добавить если нет / убрать если есть
el.classList.contains('active');      // → true/false: есть ли класс
el.classList.replace('old', 'new');   // заменить один класс другим
```

## toggle с булевым аргументом

```js
// Второй аргумент явно задаёт: добавить (true) или убрать (false)
slides.forEach((slide, i) => {
  slide.classList.toggle('active', i === currentIndex);
  // если i === currentIndex → добавить 'active'
  // если i !== currentIndex → убрать 'active'
});
// Заменяет паттерн forEach remove + одиночный add
```

## Паттерн активной вкладки

```js
const tabs   = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Шаг 1: убрать active у ВСЕХ
    tabs.forEach(t   => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    // Шаг 2: добавить active только нужным
    tab.classList.add('active');
    panels[index].classList.add('active');
  });
});
```

**Почему сначала убираем у всех, а потом добавляем одному?**
Потому что активной вкладкой может быть любая. Если добавить новую без снятия старой — будут две активных вкладки.

## CSS-анимация active-класса

```css
.panel {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  display: none;
}

.panel.active {
  opacity: 1;
  transform: translateY(0);
  display: block;
}
```

## 🛠 Задание

По клику на кнопку переключайте класс `dark` на элементе `body` (тёмная/светлая тема). Обновляйте текст кнопки.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Управление classList</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Тёмная и светлая тема</h2>
    <button id="themeBtn" class="btn">Включить тёмную тему</button>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; padding: 40px; text-align: center; transition: all 0.3s; }
body.dark { background: #0f172a; color: #f8fafc; }
body.dark .btn { background: #38bdf8; color: #0f172a; }
.btn { background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
```

```js:start
const themeBtn = document.querySelector('#themeBtn');

themeBtn.addEventListener('click', () => {
  // Переключите класс dark на document.body
  // Обновите текст кнопки
});
```

```js:solution
const themeBtn = document.querySelector('#themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark'); // добавить 'dark' если нет, убрать если есть

  // Обновить текст кнопки в зависимости от текущей темы
  themeBtn.textContent = document.body.classList.contains('dark')
    ? 'Светлая тема'  // сейчас dark — предлагаем переключиться на светлую
    : 'Тёмная тема';  // сейчас светлая — предлагаем тёмную
});
```
