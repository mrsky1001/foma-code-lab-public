---
title: "setTimeout и setInterval — таймеры"
highlight: js
type: theory
---

# setTimeout и setInterval — таймеры

JavaScript — **однопоточный** язык: он выполняет код строчку за строчкой. Но иногда нужно отложить действие или повторять его регулярно. Для этого есть таймеры.

## setTimeout — выполнить один раз через задержку

```js
const timerId = setTimeout(() => {  // запустить через 2 секунды
  console.log('Прошло 2 секунды!'); // код выполнится один раз
}, 2000); // 2000 мс = 2 секунды

// setTimeout возвращает id — он нужен чтобы отменить таймер
```

**Отменить до срабатывания:**
```js
clearTimeout(timerId); // таймер отменён, код не выполнится
```

## setInterval — повторять действие через интервал

```js
const intervalId = setInterval(() => {
  console.log('Тик!');   // выполняется каждые 1000 мс
}, 1000); // каждую секунду

// setInterval тоже возвращает id — сохраните для остановки!
```

**Остановить интервал:**
```js
clearInterval(intervalId); // передаём id, который вернул setInterval
```

## Паттерн автослайдера со сбросом при клике

```js
let timerId = null; // null — таймер ещё не запущен

function startAuto() {
  timerId = setInterval(() => {  // запустить и сохранить id
    nextSlide();                  // переключать слайды каждые 3 сек
  }, 3000);
}

function stopAuto() {
  clearInterval(timerId);  // остановить таймер по сохранённому id
}

function resetTimer() {
  stopAuto();   // сначала остановить текущий
  startAuto();  // потом запустить заново — отсчёт с нуля
}

// При клике пользователя — сбросить автоматику
nextBtn.addEventListener('click', () => {
  nextSlide();    // переключить слайд вручную
  resetTimer();   // перезапустить отсчёт (чтобы не переключился сразу)
});

startAuto(); // запустить при старте страницы
```

## Важно: не забывать остановить!

Если интервал не остановить — он продолжит работать даже после ухода пользователя со страницы. Это называется **утечка памяти**:

```js
// Остановить при уходе со страницы
window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
});
```

## 🛠 Задание

Создайте счётчик, который увеличивается каждую секунду. Кнопка «Стоп» останавливает счётчик. Кнопка «Сброс» обнуляет и перезапускает.

```js:start
let count = 0;
let timerId = null;

// Запустите setInterval который увеличивает count и обновляет #counter

// Обработчик кнопки Стоп
document.querySelector('#stopBtn').addEventListener('click', () => {
  // Остановите таймер
});
```

```js:solution
let count = 0;
let timerId = null;

const counter = document.querySelector('#counter'); // элемент для отображения числа

timerId = setInterval(() => {      // запустить и сохранить id таймера
  count++;                         // увеличивать счётчик каждую секунду
  counter.textContent = count;     // обновить текст в блоке #counter
}, 1000); // 1000 мс = 1 секунда

document.querySelector('#stopBtn').addEventListener('click', () => {
  clearInterval(timerId);          // остановить таймер по сохранённому id
});
```
