---
title: "События и слушатели (addEventListener)"
highlight: js
type: theory
---

# События и слушатели

Пользователь нажал кнопку, ввёл текст, прокрутил страницу — всё это **события**. JavaScript позволяет «слушать» их и реагировать.

## addEventListener

```js
element.addEventListener('тип события', функция-обработчик);
//                        ↑ строка      ↑ вызывается при срабатывании события
```

```js
const btn = document.querySelector('.btn'); // найти кнопку

// Обычная функция:
btn.addEventListener('click', function() {
  alert('Кнопка нажата!'); // всплывающее окно при клике
});

// Стрелочная функция (современный стиль):
btn.addEventListener('click', () => {
  console.log('Клик!'); // вывод в консоль при каждом клике
});
```

## Объект события (event)

```js
form.addEventListener('submit', (event) => {
  event.preventDefault(); // отменить стандартное поведение: форма не перезагрузит страницу
  console.log('Форма отправлена без перезагрузки!');
});
```

## Популярные типы событий

| Событие | Когда срабатывает |
|---------|-------------------|
| `click` | Клик мышью |
| `submit` | Отправка формы |
| `input` | Изменение поля ввода |
| `change` | Смена значения select |
| `DOMContentLoaded` | HTML загружен и распознан |

## 🛠 Задание

Добавьте кнопке обработчик клика. При каждом клике увеличивайте счётчик и показывайте его в блоке `#counter`.

```js:start
let count = 0;
const btn = document.querySelector('#btn');
const counter = document.querySelector('#counter');

// Добавьте обработчик клика
```

```js:solution
let count = 0;                                    // счётчик кликов, начинаем с 0
const btn     = document.querySelector('#btn');     // найти кнопку по id
const counter = document.querySelector('#counter'); // найти блок для отображения счётчика

btn.addEventListener('click', () => { // слушать событие 'click' на кнопке
  count++;                            // увеличить счётчик на 1
  counter.textContent = 'Кликов: ' + count; // обновить текст в блоке #counter
});
```
