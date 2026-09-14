---
title: "Событие input — живой поиск"
highlight: js
type: theory
---

# Событие input — живой поиск

Событие `input` срабатывает **при каждом изменении** значения поля — каждый введённый или удалённый символ.

## input vs change vs keyup

| Событие | Когда срабатывает | Когда использовать |
|---------|-------------------|--------------------|
| `input` | При каждом изменении значения | Живой поиск, счётчик символов |
| `change` | Только когда поле теряет фокус | Выбор из списка, чекбокс |
| `keyup` | При каждом отпускании клавиши | Реакция на Enter, Escape |

## Живой поиск

```js
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {       // срабатывает на каждый символ
  const query = searchInput.value.toLowerCase().trim(); // нижний регистр + убрать пробелы

  const filtered = allRooms.filter(room =>
    room.name.toLowerCase().includes(query) // входит ли запрос в название
  );

  renderRooms(filtered); // перерисовать список
});
```

## Обработка клавиш через e.key

```js
searchInput.addEventListener('keyup', (e) => {  // e — объект события
  if (e.key === 'Enter') {                       // нажат Enter
    startSearch();
  }
  if (e.key === 'Escape') {                      // нажат Escape
    searchInput.value = '';                      // очистить поле
    renderRooms(allRooms);                       // показать всё
  }
});
```

## Оптимизация — функция debounce

При быстром вводе `input` срабатывает десятки раз в секунду. Если каждый вызов делает запрос к серверу — это нагрузка. **Debounce** откладывает выполнение до паузы в печатании:

```js
// Функция debounce — ждёт паузу перед вызовом fn
function debounce(fn, delay) {
  let timer;                      // хранит id текущего таймера
  return function(...args) {      // возвращает новую функцию-обёртку
    clearTimeout(timer);          // сбросить предыдущий таймер (если ещё не сработал)
    timer = setTimeout(() => {    // запустить новый таймер
      fn(...args);                // вызвать оригинальную функцию после паузы
    }, delay);                    // delay — минимальная пауза в мс
  };
}

// Использование: оборачиваем функцию поиска в debounce
const debouncedSearch = debounce((query) => {
  const filtered = allRooms.filter(r => r.name.toLowerCase().includes(query));
  renderRooms(filtered);
}, 300); // ждать 300 мс паузы

searchInput.addEventListener('input', () => {
  debouncedSearch(searchInput.value.toLowerCase().trim());
  // если пользователь продолжает печатать — предыдущий таймер сбрасывается
  // фильтрация запустится только через 300 мс после последнего символа
});
```

## Полный пример живого поиска с Enter и Escape

```js
const searchInput = document.querySelector('#search');
const debouncedFilter = debounce((query) => {
  const result = allRooms.filter(r =>
    r.name.toLowerCase().includes(query)
  );
  renderRooms(result);
}, 300);

// input — обновление при каждом символе (с debounce)
searchInput.addEventListener('input', () => {
  debouncedFilter(searchInput.value.toLowerCase().trim());
});

// keyup — обработка Enter и Escape
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {          // Escape — очистить поиск
    searchInput.value = '';
    renderRooms(allRooms);
  }
});
```

## 🛠 Задание

Реализуйте поиск по массиву имён с debounce 300ms. При нажатии Escape очищайте результаты.

```js:start
const names = ['Алексей', 'Мария', 'Александра', 'Дмитрий', 'Марина'];
const input = document.querySelector('#search');
const list  = document.querySelector('#list');

// Напишите функцию debounce

// Создайте обёрнутую функцию фильтрации

// Повесьте обработчики input и keyup
```

```js:solution
const names = ['Алексей', 'Мария', 'Александра', 'Дмитрий', 'Марина'];
const input = document.querySelector('#search');
const list  = document.querySelector('#list');

// Реализация debounce: ждём паузу delay мс после последнего вызова
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);                    // сброс предыдущего таймера
    timer = setTimeout(() => fn(...args), delay); // запуск нового
  };
}

// Функция фильтрации и рендера результатов
function filterNames(query) {
  const filtered = names.filter(n => n.toLowerCase().includes(query));
  list.innerHTML = filtered.map(n => `<li>${n}</li>`).join(''); // сгенерировать список
}

// Оборачиваем filterNames в debounce: выполнится через 300 мс после паузы
const debouncedFilter = debounce(filterNames, 300);

// input — живой поиск с debounce
input.addEventListener('input', () => {
  const query = input.value.toLowerCase().trim(); // нижний регистр + без пробелов
  debouncedFilter(query);
});

// keyup — Escape очищает поле и показывает все
input.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    input.value = '';                  // очистить поле
    filterNames('');                   // показать всех (пустой запрос = все)
  }
});

filterNames(''); // инициализация: показать все имена при загрузке
```
