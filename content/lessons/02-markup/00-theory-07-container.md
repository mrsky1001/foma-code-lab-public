---
title: "Паттерн Container: центрирование и ширина макета"
highlight: css
type: theory
---

# Паттерн Container: центрирование и ширина макета

Если открыть сайт на широком мониторе (Full HD, 2K или 4K) без ограничений ширины, контент растянется от левого края дисплея до правого. Читать строку текста длиной в 2000 пикселей физически невозможно для человеческого глаза.

А на экранах смартфонов без боковых отступов текст упрётся прямо в рамку стекла.

Для решения обеих проблем в профессиональной вёрстке применяется базовый паттерн: **блок-контейнер (`.container`)**.

---

## Формула идеального контейнера

```css
.container {
  max-width: 1200px; /* максимальная ширина контента */
  margin: 0 auto;    /* центрирование по горизонтали */
  padding: 0 16px;   /* безопасные боковые отступы (gutter) на мобильных */
}
```

```
Широкий экран (> 1200px):
┌────────────────────────────────────────────────────────┐
│  margin: auto │    Контейнер (1200px)   │ margin: auto │
│  (пусто слева)│ [Логотип]       [Меню]  │(пусто справа)│
└────────────────────────────────────────────────────────┘

Экран смартфона (< 1200px):
┌──────────────────────┐
│ p │ Контент (100%)│p │  (p = padding 16px, чтобы текст не прилипал к краю)
└──────────────────────┘
```

---

## Как работает каждое свойство

### 1. `max-width: 1200px` (гибкое ограничение)
В отличие от жёсткого `width: 1200px`, которое приведёт к появлению горизонтальной полосы прокрутки на экранах меньше 1200px, свойство `max-width` ведёт себя адаптивно:
- Если экран шире 1200px — блок фиксируется на ширине 1200px;
- Если экран уже 1200px — блок сжимается вместе с экраном до 100% ширины.

### 2. `margin: 0 auto` (магия центрирования)
- `0` — верхний и нижний внешние отступы равны нулю;
- `auto` — браузер автоматически вычисляет оставшееся свободное пространство по бокам и **делит его поровну** между левым и правым отступом. В результате блок оказывается строго по центру.

> [!IMPORTANT]
> `margin: 0 auto` центрирует только блочные элементы (`display: block` или `<div>`), у которых явно задана ширина или `max-width`.

### 3. `padding: 0 16px` (защитные поля)
На смартфонах контент сжимается до краёв экрана. Внутренний отступ (padding) оставляет аккуратный отступ в 16px от границ стекла.

---

## Паттерн «Фон на всю ширину, контент по центру»

Частая задача: полоса шапки или секции окрашена во всю ширину экрана (100%), но сам контент (логотип и меню) должен быть выровнен по центру.

Для этого фон задаётся внешней секции, а контент оборачивается в `.container`:

```html
<header class="header">              <!-- Фон на 100% ширины -->
  <div class="container">            <!-- Ограничен 1200px и по центру -->
    <a class="logo">СмартОфис</a>
    <nav class="nav">...</nav>
  </div>
</header>
```

```css
.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  width: 100%;
}
```

---

## 🛠 Задание

Оформите класс `.container`:
1. Установите максимальную ширину `1200px`;
2. Отцентрируйте блок по горизонтали с помощью `margin: 0 auto`;
3. Задайте внутренние боковые отступы `0 20px` (сверху/снизу 0, слева/справа 20px).

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Паттерн Container</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <strong>СмартОфис</strong>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="content-box">
        <h1>Контент страницы</h1>
        <p>Этот блок ограничен по ширине и отцентрирован внутри окна браузера.</p>
      </div>
    </div>
  </main>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background: #f1f5f9;
}

.header {
  background: #0f172a;
  color: #ffffff;
  padding: 16px 0;
}

.container {
  /* Задайте max-width, margin и padding */
}

.content-box {
  background: #ffffff;
  padding: 24px;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h1 {
  margin: 0 0 12px 0;
  font-size: 24px;
}

p {
  margin: 0;
  color: #64748b;
}
```

```css:solution
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background: #f1f5f9;
}

.header {
  background: #0f172a;
  color: #ffffff;
  padding: 16px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.content-box {
  background: #ffffff;
  padding: 24px;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h1 {
  margin: 0 0 12px 0;
  font-size: 24px;
}

p {
  margin: 0;
  color: #64748b;
}
```
