---
title: "setInterval и clearInterval — автослайдер"
highlight: js
type: theory
---

# setInterval и clearInterval

## setInterval — повторять действие через интервал

```js
const timerId = setInterval(() => {
  console.log('Тик!');
}, 2000); // каждые 2000 мс = 2 секунды
```

`setInterval` возвращает **идентификатор таймера** — его нужно сохранить чтобы остановить.

## clearInterval — остановить

```js
clearInterval(timerId); // передаём id, который вернул setInterval — таймер остановлен
```

## Паттерн автослайдера со сбросом при клике

```js
let timerId = null; // null — таймер не запущен

function startAuto() {
  timerId = setInterval(() => { // запустить и сохранить id
    nextSlide();                // переключать слайды каждые 3 сек
  }, 3000);
}

function stopAuto() {
  clearInterval(timerId); // остановить таймер по сохранённому id
}

function resetTimer() {
  stopAuto();  // сначала остановить текущий
  startAuto(); // потом запустить заново — отсчёт пошёл с нуля
}

// При клике пользователя — сбросить таймер (чтобы не переключилось сразу)
nextBtn.addEventListener('click', () => {
  nextSlide();    // переключить слайд вручную
  resetTimer();   // перезапустить отсчёт автоматики
});

startAuto(); // запустить автоматику при старте страницы
```

## 🛠 Задание

Создайте счётчик, который увеличивается каждую секунду. Кнопка «Стоп» останавливает счётчик.

```js:start
let count = 0;
let timerId = null;

// Запустите setInterval который увеличивает count и выводит в #counter

// Обработчик кнопки Стоп
document.querySelector('#stopBtn').addEventListener('click', () => {
  // Остановите таймер
});
```

```js:solution
let count   = 0;
let timerId = null;

const counter = document.querySelector('#counter');

timerId = setInterval(() => { // запустить и сохранить id таймера
  count++;                    // увеличивать счётчик каждую секунду
  counter.textContent = count; // обновить текст в блоке #counter
}, 1000); // 1000 мс = 1 секунда

document.querySelector('#stopBtn').addEventListener('click', () => {
  clearInterval(timerId); // остановить таймер по сохранённому id
});
```
