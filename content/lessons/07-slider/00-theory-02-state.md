---
title: "Состояние программы (State)"
highlight: js
type: theory
---

# Состояние программы (State)

**Состояние** — это переменная (или объект), которая хранит текущее положение дел в программе. Когда состояние меняется — меняется и интерфейс.

## Пример: текущий слайд

```js
// Состояние — одна переменная описывает где мы сейчас
let currentSlide = 0; // начинаем с 0-го слайда (индекс массива)

// Функция отображения: читает состояние и обновляет DOM
function showSlide(index) {
  slides.forEach(s => s.classList.remove('active')); // убрать active со всех
  slides[index].classList.add('active');              // добавить только нужному
}

// Изменение состояния → вызов функции → обновление интерфейса
nextBtn.addEventListener('click', () => {
  currentSlide++;               // меняем состояние
  showSlide(currentSlide);      // функция обновляет UI под новое состояние
});
```

## Single Source of Truth — единый источник правды

Ключевой принцип: **состояние живёт только в JS-переменной**, DOM — лишь отражение.

```js
// АНТИПАТТЕРН: читать состояние из DOM — хрупко и медленно
function nextSlide() {
  const current = document.querySelector('.slide.active'); // искать в DOM?!
  current.classList.remove('active');
  current.nextElementSibling.classList.add('active');
}

// ПРАВИЛЬНО: читать из переменной, писать в DOM
let currentIndex = 0; // состояние — в JS

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length; // circular: 0,1,2,0,1...
  render(); // перерисовать
}

function render() {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex); // true/false
  });
}
```

## Паттерн render(state)

Для более сложных случаев — хранить всё состояние в одном объекте:

```js
// Состояние — один объект
const state = {
  currentSlide: 0,
  isAutoplay: true,
  totalSlides: 5
};

// Функция render — полностью перерисовывает UI по состоянию
function render(state) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === state.currentSlide);
  });
  counter.textContent = `${state.currentSlide + 1} / ${state.totalSlides}`;
}

// Изменить состояние и перерисовать
function goToSlide(index) {
  state.currentSlide = index; // обновить состояние
  render(state);               // перерисовать UI
}
```

## 🛠 Задание

Напишите простой переключатель: переменная `isOpen` (true/false). По клику на кнопку — меняйте состояние и обновляйте текст через функцию `render`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Состояние программы</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <div style="margin-bottom: 12px; font-weight: 600;">
      Статус: <span id="status" class="status-badge">Закрыто</span>
    </div>
    <button id="toggleBtn" class="btn">Открыть</button>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 30px; }
.sandbox { max-width: 440px; margin: 0 auto; text-align: center; }
.btn { background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
.status-badge { color: #0284c7; font-weight: 700; }
```

```js:start
let isOpen = false;
const btn    = document.querySelector('#toggleBtn');
const status = document.querySelector('#status');

function render() {
  // Обновите текст status и btn на основе isOpen
}

btn.addEventListener('click', () => {
  // Измените isOpen и вызовите render
});

render(); // начальная отрисовка
```

```js:solution
let isOpen = false;                              // начальное состояние — закрыто
const btn    = document.querySelector('#toggleBtn');
const status = document.querySelector('#status');

// render: полностью перерисовывает UI под текущее состояние
function render() {
  status.textContent = isOpen ? 'Открыто' : 'Закрыто'; // тернарный оператор
  btn.textContent    = isOpen ? 'Закрыть' : 'Открыть'; // текст кнопки тоже
}

btn.addEventListener('click', () => {
  isOpen = !isOpen;  // инвертировать состояние (true↔false)
  render();          // перерисовать UI под новое состояние
});

render(); // начальная отрисовка при загрузке страницы
```
