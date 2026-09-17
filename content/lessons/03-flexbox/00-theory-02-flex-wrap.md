---
title: "flex-wrap и адаптивная сетка"
highlight: css
type: theory
---

# flex-wrap и адаптивная сетка

По умолчанию Flexbox пытается уместить все элементы в одну строку, сжимая их. `flex-wrap` позволяет переносить элементы на следующую строку.

## flex-wrap

```css
.catalog {
  display: flex;
  flex-wrap: nowrap;   /* по умолчанию: всё в одну строку, сжимать */
  flex-wrap: wrap;     /* переносить на следующую строку если не помещается */
  flex-wrap: wrap-reverse; /* перенос в обратном направлении */
}
```

## Адаптивная сетка карточек

```css
.catalog {
  display: flex;
  flex-wrap: wrap;        /* разрешить перенос */
  gap: 16px;              /* отступы между карточками */
}

.card {
  flex: 1 1 280px;
  /* flex-grow: 1   — растягиваться если есть место */
  /* flex-shrink: 1 — сжиматься если не хватает */
  /* flex-basis: 280px — желаемая ширина */
}
```

Результат: карточки занимают столько места сколько помещается, переносясь на следующую строку.

## flex: 1 1 280px vs width: 280px

```css
/* width: 280px — жёсткая ширина, всегда 280px */
.card { width: 280px; }

/* flex: 1 1 280px — гибкая ширина:
   начинаем с 280px, но можем расти и сжиматься */
.card { flex: 1 1 280px; }
```

С `flex: 1 1 280px` карточки равномерно заполняют строку — нет некрасивых «хвостов».

## min-width — защита от слишком узких карточек

```css
.card {
  flex: 1 1 280px;
  min-width: 200px; /* не сжиматься меньше 200px */
}
```

## gap vs margin

```css
/* Старый способ — margin на карточках */
.card { margin: 8px; }       /* отступ по всем сторонам */

/* Современный способ — gap на контейнере */
.catalog {
  display: flex;
  gap: 16px;          /* промежутки между карточками, без внешних отступов */
  /* или по осям: */
  row-gap: 24px;      /* вертикальные промежутки */
  column-gap: 16px;   /* горизонтальные промежутки */
}
```

## 🛠 Задание

Создайте адаптивную сетку карточек: 4 в ряд на широком экране, 2 на среднем, 1 на узком. Используйте `flex-wrap` и `flex-basis`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>flex-wrap и сетка</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <div class="catalog">
      <div class="card">Мини-офис Focus</div>
      <div class="card">Конференц-зал Alpha</div>
      <div class="card">Опенспейс Hub</div>
      <div class="card">Переговорная Solo</div>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
  padding: 24px;
}

.sandbox {
  max-width: 900px;
  margin: 0 auto;
}

.catalog {
  display: flex;
  /* Добавьте flex-wrap и gap */
}

.card {
  /* Задайте flex: 1 1 220px и min-width */
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  font-weight: 500;
}
```

```css:solution
body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  margin: 0;
  padding: 24px;
}

.sandbox {
  max-width: 900px;
  margin: 0 auto;
}

.catalog {
  display: flex;
  flex-wrap: wrap;     /* переносить карточки на следующую строку */
  gap: 16px;           /* промежутки между карточками */
}

.card {
  flex: 1 1 220px;     /* базовая ширина 220px, растягиваться/сжиматься */
  min-width: 160px;    /* не сжимать меньше 160px */
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  font-weight: 500;
}
```
