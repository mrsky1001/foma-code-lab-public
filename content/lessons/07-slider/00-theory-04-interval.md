---
title: "setInterval и clearInterval — автослайдер"
highlight: js
type: theory
---

# setInterval и clearInterval

`setInterval` и `clearInterval` уже разобраны в уроке «Таймеры» (модуль 04). Здесь — их применение в контексте автослайдера.

## setInterval — повторять действие

```js
const timerId = setInterval(() => {
  console.log('Тик!');
}, 2000); // каждые 2000 мс = 2 секунды

// setInterval возвращает id — нужен для остановки
```

## clearInterval — остановить

```js
clearInterval(timerId); // передаём id → таймер остановлен
```

## Паттерн автослайдера со сбросом при клике

```js
let timerId = null; // null — таймер не запущен

function startAuto() {
  timerId = setInterval(() => {
    nextSlide();     // переключать каждые 3 сек
  }, 3000);
}

function stopAuto() {
  clearInterval(timerId); // остановить
  timerId = null;         // сбросить в null
}

function resetTimer() {
  stopAuto();   // остановить текущий
  startAuto();  // запустить заново — отсчёт с нуля
}

// При ручном переключении — сбросить таймер
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetTimer(); // чтобы автопереключение не произошло сразу
});

startAuto(); // запустить при старте
```

## Утечка памяти — остановить при уходе

Если интервал не остановить — он продолжит работать даже когда пользователь ушёл:

```js
window.addEventListener('beforeunload', () => {
  clearInterval(timerId); // освободить ресурс при закрытии страницы
});
```

## requestAnimationFrame — для анимаций

Для плавных анимаций `setInterval` менее эффективен. Браузер синхронизирует `requestAnimationFrame` с частотой обновления экрана (обычно 60 раз/сек):

```js
function animate() {
  // обновить позицию, прозрачность и т.п.
  requestAnimationFrame(animate); // вызвать себя снова на следующем кадре
}

requestAnimationFrame(animate); // запустить цикл анимации
```

## 🛠 Задание

Создайте счётчик, который увеличивается каждую секунду. Кнопка «Стоп» останавливает, кнопка «Старт» запускает заново.

```js:start
let count = 0;
let timerId = null;

// Реализуйте start() и stop()
// Повесьте обработчики на кнопки #startBtn и #stopBtn
```

```js:solution
let count   = 0;
let timerId = null;

const counter  = document.querySelector('#counter');
const startBtn = document.querySelector('#startBtn');
const stopBtn  = document.querySelector('#stopBtn');

function start() {
  if (timerId) return;            // уже запущен — не запускать второй
  timerId = setInterval(() => {
    count++;
    counter.textContent = count; // обновлять дисплей каждую секунду
  }, 1000);
}

function stop() {
  clearInterval(timerId);        // остановить
  timerId = null;                // сбросить в null
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click',  stop);

start(); // запустить при загрузке
```
