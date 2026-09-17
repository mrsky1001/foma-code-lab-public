---
title: "Адаптивность и медиа-запросы (@media)"
highlight: css
type: theory
---

# Адаптивность и медиа-запросы (@media)

Свойство `flex-wrap: wrap` помогает карточкам переноситься на новую строку при нехватке места. Однако на смартфонах макет часто требует **кардинального изменения структуры**:
- Шапка перестраивается из строки в колонку, либо меню скрывается в «бургер»;
- Заголовки уменьшаются, чтобы не разрывать длинные слова на три строки;
- Сетка из 3–4 колонок превращается в одну вертикальную ленту на 100% ширины экрана.

Для точечной настройки стилей под разные устройства используются **медиа-запросы (`@media`)**.

---

## Синтаксис правила `@media`

Медиа-запрос проверяет параметры экрана (ширину, ориентацию) и применяет вложенные CSS-правила только тогда, когда условие истинно:

```css
/* Базовые стили (для больших экранов / десктопов) */
.header {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
}

/* Стили для планшетов и смартфонов (ширина экрана 768px и меньше) */
@media (max-width: 768px) {
  .header {
    flex-direction: column; /* перестраиваем логотип и меню друг под друга */
    gap: 16px;
    padding: 16px;          /* уменьшаем отступы на небольшом экране */
  }
}
```

---

## Популярные точки перелома (Breakpoints)

В веб-разработке принято ориентироваться на стандартные диапазоны ширины устройств:

| Точка перелома | Типичные устройства | Что обычно меняют |
| :--- | :--- | :--- |
| `max-width: 1024px` | Ноутбуки, планшеты в ландшафте | 4 колонки ➔ 2–3 колонки |
| `max-width: 768px` | Планшеты вертикально, большие телефоны | Горизонтальное меню ➔ компактный вид, 2 колонки ➔ 1 колонка |
| `max-width: 480px` | Смартфоны | Уменьшение размера шрифтов `h1`, отступы до 12–16px |

> [!IMPORTANT]
> **Принцип каскада:** Медиа-запросы всегда пишутся **в самом низу CSS-файла** (после основных стилей элементов). Если поместить `@media` выше основного класса `.header`, базовое правило переопределит адаптивное из-за каскада CSS.

---

## Как протестировать адаптивность

Вам не нужен физический смартфон для проверки верстки:
1. Откройте инструмент разработчика в браузере (`F12`);
2. Нажмите комбинацию `Ctrl + Shift + M` (или иконку планшета/смартфона);
3. Выбирайте готовые устройства (iPhone, iPad) или вручную перетаскивайте ползунок ширины.

---

## 🛠 Задание

Напишите медиа-запрос для экранов шириной `768px` и меньше (`@media (max-width: 768px)`):
1. Переопределите блок `.room-grid`: задайте `flex-direction: column` и `gap: 12px`.
2. Задайте элементам `.card` ширину `100%`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Медиа-запросы</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="room-grid">
    <div class="card">
      <h3>Мини-офис Focus</h3>
      <p>Тихое место для 1-2 человек</p>
    </div>
    <div class="card">
      <h3>Конференц-зал Alpha</h3>
      <p>Просторный зал до 15 человек</p>
    </div>
    <div class="card">
      <h3>Опенспейс Hub</h3>
      <p>Выделенный стол в open-space</p>
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

.room-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 300px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

/* Добавьте медиа-запрос для max-width: 768px ниже */
```

```css:solution
body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 24px;
}

.room-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 300px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

/* Адаптивные стили для мобильных экранов */
@media (max-width: 768px) {
  .room-grid {
    flex-direction: column;
    gap: 12px;
  }

  .card {
    width: 100%;
  }
}
```
