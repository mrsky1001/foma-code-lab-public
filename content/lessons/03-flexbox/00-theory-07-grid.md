---
title: "CSS Grid: современная двумерная сетка"
highlight: css
type: theory
---

# CSS Grid: современная двумерная сетка

Если **Flexbox** создавался для управления элементами вдоль **одной оси** (в строку или в колонку), то **CSS Grid** — это мощная система для управления **двумерной сеткой** (строками и колонками одновременно).

В каталогах товаров, карточках офисов и галереях CSS Grid позволяет создать адаптивную сетку всего одной строкой кода.

---

## Flexbox против CSS Grid: когда что использовать?

| Критерий | Flexbox | CSS Grid |
| :--- | :--- | :--- |
| **Оси** | Одномерный (только X или только Y) | Двумерный (X и Y одновременно) |
| **Идеально для** | Шапка, меню, выравнивание внутри кнопок, подвал | Каталог карточек, раскладка всей страницы, галереи |
| **Философия** | Контент определяет раскладку | Сетка определяет положение контента |

---

## Включение сетки Grid

```css
.catalog-grid {
  display: grid;
  gap: 24px; /* расстояние между строками и колонками */
}
```

---

## Главная магия: адаптивная сетка без медиа-запросов

Чтобы сделать сетку карточек, которая автоматически рассчитывает количество колонок под любой экран (на телефоне 1 колонка, на планшете 2, на мониторе 3–4), используется формула:

```css
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

```
Большой экран (> 1200px)  ➔ 4 колонки по 1fr:
┌──────────┬──────────┬──────────┬──────────┐
│ Карточка │ Карточка │ Карточка │ Карточка │
└──────────┴──────────┴──────────┴──────────┘

Планшет (~ 768px)         ➔ 2 колонки по 1fr:
┌─────────────────────┬─────────────────────┐
│ Карточка            │ Карточка            │
├─────────────────────┼─────────────────────┤
│ Карточка            │ Карточка            │
└─────────────────────┴─────────────────────┘

Смартфон (< 480px)        ➔ 1 колонка (100%):
┌───────────────────────────────────────────┐
│ Карточка                                  │
├───────────────────────────────────────────┤
│ Карточка                                  │
└───────────────────────────────────────────┘
```

### Разбор формулы:
- **`repeat(...)`** — повторять шаблон колонок;
- **`auto-fill`** — заполнить строку максимальным количеством колонок, которое помещается в контейнер;
- **`minmax(280px, 1fr)`** — колонка не может быть уже `280px`, а оставшееся свободное пространство делится поровну между колонками (`1fr` = 1 fraction, одна равная доля).

---

## Выравнивание элементов внутри ячеек

По умолчанию все карточки в Grid-строке имеют **одинаковую высоту**, независимо от объёма текста внутри — это решает давнюю проблему Flexbox, где приходилось выравнивать карточки вручную.

---

## 🛠 Задание

Создайте адаптивную сетку для каталога комнат `.rooms-grid`:
1. Включите режим `display: grid`;
2. Задайте расстояние между ячейками `gap: 20px`;
3. Настройте адаптивные колонки с помощью `repeat(auto-fit, minmax(250px, 1fr))`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="rooms-grid">
    <div class="room-card">
      <h3>Мини-офис Focus</h3>
      <p>450 ₽/час</p>
    </div>
    <div class="room-card">
      <h3>Конференц-зал Alpha</h3>
      <p>1200 ₽/час</p>
    </div>
    <div class="room-card">
      <h3>Опенспейс Hub</h3>
      <p>250 ₽/час</p>
    </div>
    <div class="room-card">
      <h3>Переговорная Solo</h3>
      <p>600 ₽/час</p>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 24px;
}

.rooms-grid {
  /* Включите CSS Grid */
  /* Задайте отступы gap */
  /* Настройте адаптивные колонки */
}

.room-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.room-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.room-card p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}
```

```css:solution
body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 24px;
}

.rooms-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.room-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.room-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.room-card p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}
```
