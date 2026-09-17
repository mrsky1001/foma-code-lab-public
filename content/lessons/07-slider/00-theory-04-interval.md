---
title: "setInterval и clearInterval — автослайдер"
highlight: js
type: theory
---

# setInterval и clearInterval: автослайдер

В то время как `setTimeout` выполняет действие **один раз** с задержкой, метод **`setInterval`** предназначен для **регулярного циклического повторения** функции через заданный интервал времени.

Именно на `setInterval` строятся автоматические слайдеры, тикающие часы и периодический опрос обновлений.

---

## Синтаксис `setInterval` и `clearInterval`

```js
// Запускаем повторение каждые 3000 мс (3 секунды):
const timerId = setInterval(() => {
  console.log('Прошло 3 секунды: переключаем слайд!');
}, 3000);

// Останавливаем интервал по идентификатору:
clearInterval(timerId);
```

---

## ⚠️ Главная ловушка: «Бешеные таймеры» (Умножение интервалов)

Самый частый баг у начинающих разработчиков при создании слайдера: при каждом клике на стрелку «Вперёд» вызывается `startAuto()`, но старый таймер не останавливается:

```
Клик 1 ➔ запустился таймер 1 (слайд раз в 3 сек)
Клик 2 ➔ запустился таймер 2 (+ ещё раз в 3 сек)
Клик 3 ➔ запустился таймер 3 (+ ещё раз в 3 сек)
ИТОГ: три таймера работают одновременно, картинки мелькают как стробоскоп!
```

> [!CAUTION]
> **Золотое правило работы с интервалами:**
> 1. Перед запуском нового `setInterval` **всегда** останавливайте старый через `clearInterval(timerId)`.
> 2. Храните идентификатор в переменной `let timerId = null` и проверяйте: если таймер уже активен, не создавайте дубликат!

---

## Архитектура слайдера с ручным сбросом

Когда пользователь сам кликает на стрелку «Следующий слайд» или точку-индикатор, автоматический таймер должен **сброситься и начать отсчёт 3 секунд с нуля** (иначе слайдер переключится сразу после ручного клика):

```js
let timerId = null; // Единственный источник правды для таймера

function startAuto() {
  if (timerId) return; // Защита: если таймер уже тикает, выходим
  timerId = setInterval(() => {
    nextSlide(); // перелистываем слайд
  }, 3000);
}

function stopAuto() {
  clearInterval(timerId); // останавливаем интервал в браузере
  timerId = null;         // сбрасываем идентификатор
}

function resetTimer() {
  stopAuto();  // 1. Убиваем старый отсчёт
  startAuto(); // 2. Запускаем новый отсчёт с нуля
}

// При ручном клике пользователя:
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetTimer(); // сбрасываем автоматику
});

// Запускаем автолистание при загрузке страницы:
startAuto();
```

---

## Пауза при наведении курсора (UX Best Practice)

Хорошим тоном в веб-разработке считается останавливать автослайдер, когда пользователь наводит мышь на фотографию (чтобы он мог спокойно рассмотреть детали или прочитать текст):

```js
const sliderElement = document.querySelector('.slider');

// Мышь над слайдером — пауза
sliderElement.addEventListener('mouseenter', stopAuto);

// Мышь ушла со слайдера — возобновляем автолистание
sliderElement.addEventListener('mouseleave', startAuto);
```

---

## 🛠 Задание

Реализуйте функции `start()` и `stop()` для счетчика слайдов:
1. В функции `start`: если `timerId` уже существует, ничего не делайте. Иначе запустите `setInterval`, который каждую секунду увеличивает `slideIndex` на 1 и обновляет `display.textContent = slideIndex`.
2. В функции `stop`: остановите таймер через `clearInterval` и сбросьте `timerId` в `null`.
3. Привяжите `start` к кнопке `#playBtn`, а `stop` — к кнопке `#pauseBtn`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>setInterval автослайдер</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Слайдер: <span id="slideNum" style="color: #0ea5e9;">1</span></h2>
    <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: center;">
      <button id="playBtn" class="btn">Старт</button>
      <button id="pauseBtn" class="btn btn-stop">Стоп</button>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; text-align: center; }
.btn { background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
.btn-stop { background: #ef4444; }
```

```js:start
let slideIndex = 1;
let timerId = null;

const display = document.querySelector('#slideNum');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');

function start() {
  // Запустите интервал с защитой от дублирования
}

function stop() {
  // Остановите интервал и сбросьте timerId
}

// Привяжите слушатели клика
```

```js:solution
let slideIndex = 1;
let timerId = null;

const display = document.querySelector('#slideNum');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');

function start() {
  if (timerId) return; // защита от накопления таймеров
  timerId = setInterval(() => {
    slideIndex++;
    display.textContent = slideIndex;
  }, 1000);
}

function stop() {
  clearInterval(timerId);
  timerId = null; // очищаем переменную
}

playBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', stop);

// Запуск по умолчанию
start();
```
