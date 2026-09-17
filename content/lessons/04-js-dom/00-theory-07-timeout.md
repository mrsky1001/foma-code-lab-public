---
title: "Асинхронность и таймеры: setTimeout"
highlight: js
type: theory
---

# Асинхронность и таймеры: setTimeout

JavaScript — **однопоточный** язык: он выполняет инструкции последовательно, строчка за строчкой. Однако многие задачи в интерфейсе требуют задержки во времени:
- Автоматически скрыть всплывающее уведомление (Toast) через 3 секунды;
- Подождать завершения CSS-анимации перед удалением элемента из DOM;
- Запустить действие с паузой.

Для таких задач существует таймер **`setTimeout`**.

---

## Как работает `setTimeout`

`setTimeout` принимает два аргумента: **функцию-коллбэк** и **задержку в миллисекундах** (1 секунда = 1000 мс):

```js
console.log('1. Начало');

setTimeout(() => {
  console.log('3. Прошло 2 секунды!');
}, 2000);

console.log('2. Конец');
```

> [!IMPORTANT]
> **Таймер не блокирует браузер!**  
> В консоли сначала выведется `1. Начало`, затем сразу `2. Конец`, и только спустя 2 секунды — `3. Прошло 2 секунды!`. JavaScript регистрирует будильник в браузере и продолжает работу дальше, не «подвешивая» интерфейс.

---

## Отмена таймера через `clearTimeout`

Функция `setTimeout` возвращает числовой идентификатор (ID таймера). С его помощью таймер можно остановить до того, как он успеет сработать:

```js
const timerId = setTimeout(() => {
  console.log('Это сообщение не появится');
}, 5000);

// Если пользователь нажал кнопку отмены или закрыл окно:
clearTimeout(timerId); // Таймер аннулирован!
```

---

## Главный паттерн модуля: Всплывающие уведомления (Toast)

В практической части этого модуля вы создадите систему Toast-уведомлений. Вот как работает связка таймеров для плавного показа и удаления элемента:

```js
function showNotification(text) {
  // 1. Создаём элемент уведомления
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = text;
  document.body.appendChild(toast);

  // 2. Через 3 секунды запускаем исчезновение
  setTimeout(() => {
    toast.classList.add('fade-out'); // запускаем CSS-анимацию растворения (300 мс)

    // 3. Ждём завершения анимации и удаляем узел из DOM
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
```

> [!NOTE]
> Для регулярного повторения действий (например, автоматического перелистывания картинок каждые 4 секунды) в JavaScript существует парный метод `setInterval`. Его мы детально разберём на практике в **Модуле 07 (Слайдер)**.

---

## 🛠 Задание

Напишите функцию `autoHideAlert(selector, delay)`, которая находит блок с переданным селектором и через `delay` миллисекунд скрывает его (устанавливает свойство `element.style.display = 'none'`).

Вызовите функцию для элемента `#alertBox` с задержкой `2000` мс.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Асинхронность и setTimeout</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Уведомление</h2>
    <div id="alert" class="alert-box">Бронирование успешно оформлено!</div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 30px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.alert-box { background: #dcfce7; color: #166534; padding: 16px 20px; border-radius: 8px; border: 1px solid #bbf7d0; font-weight: 500; transition: opacity 0.5s; }
```

```js:start
// HTML: <div id="alertBox">Успешно сохранено!</div>

function autoHideAlert(selector, delay) {
  // 1. Найдите элемент по селектору
  
  // 2. Установите setTimeout на delay миллисекунд
  // Внутри коллбэка задайте element.style.display = 'none'
}

// 3. Вызовите autoHideAlert('#alertBox', 2000)
```

```js:solution
// Функция для отложенного скрытия плашки
function autoHideAlert(selector, delay) {
  const element = document.querySelector(selector);
  if (!element) return;

  setTimeout(() => {
    element.style.display = 'none';
  }, delay);
}

// Запускаем скрытие через 2 секунды
autoHideAlert('#alertBox', 2000);
```
