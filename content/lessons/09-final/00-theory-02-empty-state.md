---
title: "Пустые состояния (Empty State)"
highlight: js
type: theory
---

# Пустые состояния (Empty State)

**Empty State** — это то, что видит пользователь когда данных нет: пустая корзина, нет результатов поиска, нет бронирований.

Плохой Empty State: просто белый экран или ничего.  
Хороший: объяснение + призыв к действию.

## Структура хорошего Empty State

```html
<!-- Блок пустого состояния (когда список бронирований пуст) -->
<div class="empty-state">
  <div class="empty-state-icon">
    <!-- SVG-иконка пустого списка -->
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#888888" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  </div>
  <h3 class="empty-state-title">Бронирований пока нет</h3> <!-- понятный заголовок -->
  <p class="empty-state-text">
    Найдите подходящую комнату в каталоге и оформите первое бронирование <!-- подсказка что делать -->
  </p>
  <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a> <!-- призыв к действию (CTA) -->
</div>
```

## CSS для Empty State

```css
.empty-state {
  text-align: center;      /* центрируем иконку, заголовки и кнопку */
  padding: 60px 20px;      /* просторные отступы сверху и снизу */
  color: #666666;          /* нейтральный приглушённый цвет текста */
}

.empty-state-icon {
  margin-bottom: 16px;     /* отступ от иконки до заголовка */
}

.empty-state-title {
  font-size: 20px;         /* крупный читаемый заголовок */
  font-weight: 700;        /* жирный шрифт */
  margin-bottom: 8px;      /* небольшой отступ до описания */
  color: #222222;          /* акцентный темный цвет */
}

.empty-state-text {
  font-size: 14px;         /* комфортный размер для чтения */
  max-width: 320px;        /* ограничиваем ширину чтобы текст красиво переносился */
  margin: 0 auto 24px;     /* центрируем блок текста и даем отступ снизу */
}
```

## Показ/скрытие в JavaScript

```js
function renderBookings(bookings) {
  // Находим элементы пустого состояния и списка в DOM
  const emptyState = document.querySelector('.empty-state');
  const list = document.querySelector('.bookings-list');

  // Если массив бронирований пуст — показываем заглушку и скрываем контейнер списка
  if (bookings.length === 0) {
    emptyState.style.display = 'block';
    list.style.display = 'none';
  } else {
    // Если есть записи — скрываем заглушку и рендерим карточки
    emptyState.style.display = 'none';
    list.style.display = 'block';
    list.innerHTML = bookings.map(renderCard).join('');
  }
}
```

## 🛠 Задание

Напишите функцию `renderList(items)`, которая показывает Empty State если массив пуст, или список если есть элементы.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Пустые состояния</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Каталог бронирований</h2>
    <div class="empty empty-state">
      <div class="empty-icon">📭</div>
      <h3>Бронирований пока нет</h3>
      <p>Выберите подходящую комнату в каталоге.</p>
    </div>
    <ul class="list" style="display: none; padding-left: 20px; margin-top: 12px;"></ul>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.empty-state { text-align: center; padding: 32px 16px; background: #ffffff; border-radius: 8px; border: 1px dashed #cbd5e1; color: #64748b; }
.empty-icon { font-size: 32px; margin-bottom: 8px; }
```

```js:start
function renderList(items) {
  const empty = document.querySelector('.empty');
  const list = document.querySelector('.list');

  if (items.length === 0) {
    // Показать empty, скрыть list
  } else {
    // Скрыть empty, показать list с элементами
  }
}
```

```js:solution
function renderList(items) {
  const empty = document.querySelector('.empty');
  const list = document.querySelector('.list');

  if (items.length === 0) {
    empty.style.display = 'block';
    list.style.display = 'none';
  } else {
    empty.style.display = 'none';
    list.style.display = 'block';
    list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
  }
}
```
