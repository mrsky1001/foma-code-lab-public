---
title: "Состояние программы (State)"
highlight: js
type: theory
---

# Состояние программы (State)

**Состояние** — это переменная, которая хранит текущее положение дел в программе. Когда состояние меняется — меняется и интерфейс.

## Пример: текущий слайд

```js
// Состояние — одна переменная описывает где мы сейчас
let currentSlide = 0; // начинаем с 0-го слайда (индекс массива)

// Функция отображения: читает состояние и обновляет DOM
function showSlide(index) {
  slides.forEach(s => s.classList.remove('active')); // убрать active со всех слайдов
  slides[index].classList.add('active');             // добавить active только нужному
}

// Изменение состояния → вызов функции → обновление интерфейса
nextBtn.addEventListener('click', () => {
  currentSlide++;              // меняем состояние (увеличиваем индекс)
  showSlide(currentSlide);    // функция сама знает что делать с новым значением
});
```

## Зачем переменная-состояние?

Без неё: «Какой слайд сейчас активен? Нужно читать DOM...»  
С ней: «Текущий слайд = `currentSlide`. Просто!»

## 🛠 Задание

Напишите простой переключатель: переменная `isOpen` (true/false). По клику на кнопку меняйте состояние и выводите «Открыто» или «Закрыто».

```js:start
let isOpen = false;
const btn    = document.querySelector('#toggleBtn');
const status = document.querySelector('#status');

btn.addEventListener('click', () => {
  // Измените isOpen на противоположное
  // Обновите текст в status
});
```

```js:solution
let isOpen = false;                            // начальное состояние — закрыто
const btn    = document.querySelector('#toggleBtn');
const status = document.querySelector('#status');

btn.addEventListener('click', () => {
  isOpen = !isOpen;                                         // инвертировать состояние (true↔false)
  status.textContent = isOpen ? 'Открыто' : 'Закрыто';    // тернарный оператор: если true → 'Открыто'
  btn.textContent    = isOpen ? 'Закрыть' : 'Открыть';    // текст кнопки тоже меняется
});
```
