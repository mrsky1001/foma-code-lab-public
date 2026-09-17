---
title: "Объект Date: работа с датами бронирования"
highlight: js
type: theory
---

# Объект Date: работа с датами бронирования

В любом сервисе бронирования (отелей, билетов, рабочих кабинетов) ключевую роль играет работа со временем:
- Запретить пользователю выбирать прошедшую дату (нельзя забронировать вчерашний день);
- Рассчитать количество забронированных часов между началом и окончанием аренды;
- Красиво отформатировать дату на русском языке в карточке брони (например, *«15 сентября 2026»*).

Для работы с датами и временем в JavaScript используется встроенный объект **`Date`**.

---

## Создание даты

```js
// Текущие дата и время (сейчас):
const now = new Date();

// Конкретная дата и время из строки:
const bookingStart = new Date('2026-09-15T10:00:00');
const bookingEnd   = new Date('2026-09-15T14:00:00');
```

---

## 🔒 Защита от бронирования в прошлом (`min="YYYY-MM-DD"`)

HTML-поле `<input type="date">` поддерживает атрибут `min`, который блокирует выбор дат раньше указанной. Чтобы автоматически заблокировать все прошедшие дни, установите сегодняшний день через JavaScript:

```js
const dateInput = document.querySelector('#bookingDate');

// Получаем сегодняшнюю дату в формате '2026-09-15':
const today = new Date().toISOString().split('T')[0];

// Задаём минимально допустимую дату для выбора:
dateInput.min = today;
```

---

## Расчёт разницы во времени (длительность аренды)

При вычитании двух объектов `Date` JavaScript возвращает разницу в **миллисекундах**:

```js
const start = new Date('2026-09-15T09:00:00');
const end   = new Date('2026-09-15T13:00:00');

const diffMs = end - start; // 14 400 000 миллисекунд

// Переводим миллисекунды в часы:
// 1 час = 60 минут * 60 секунд * 1000 мс = 3 600 000 мс
const diffHours = diffMs / (1000 * 60 * 60); // 4 часа

const pricePerHour = 800;
const totalCost = diffHours * pricePerHour; // 3200 ₽
```

---

## Красивое форматирование через `toLocaleDateString`

Вместо технического формата `2026-09-15` пользователю приятно видеть привычную локализованную запись:

```js
const date = new Date('2026-09-15');

const formatted = date.toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
// → '15 сентября 2026 г.'
```

---

## 🛠 Задание

Напишите функцию `calcBookingCost(startIso, endIso, hourlyRate)`:
1. Создайте два объекта `Date` из переданных строк;
2. Вычислите количество часов аренды (`(end - start) / (1000 * 60 * 60)`);
3. Верните итоговую стоимость (`часы * hourlyRate`).

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Объект Date</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Расчёт бронирования по датам</h2>
    <div id="output" class="output-box">Результат выводится в консоль...</div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 600px; margin: 0 auto; }
.output-box { background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }
```

```js:start
function calcBookingCost(startIso, endIso, hourlyRate) {
  // 1. Создайте объекты Date
  // 2. Рассчитайте часы
  // 3. Верните стоимость
}
```

```js:solution
function calcBookingCost(startIso, endIso, hourlyRate) {
  const start = new Date(startIso);
  const end   = new Date(endIso);

  // Разница в миллисекундах переводится в часы
  const hours = (end - start) / (1000 * 60 * 60);

  return hours * hourlyRate;
}

// Проверка: аренда с 10:00 до 14:00 (4 часа) по 900 ₽/час
const total = calcBookingCost('2026-09-15T10:00', '2026-09-15T14:00', 900);
console.log('Итого к оплате:', total, '₽'); // 3600 ₽
```
