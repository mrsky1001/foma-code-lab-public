---
title: "CSS Reset"
highlight: css
type: theory
---

# CSS Reset

Разные браузеры применяют **разные стили по умолчанию** к HTML-элементам. Chrome делает `<h1>` немного крупнее чем Firefox. У `<body>` есть margin в одних браузерах и нет в других.

CSS Reset сбрасывает эти стили до нулевой точки — так мы получаем **одинаковую базу** во всех браузерах.

## Минимальный modern reset

```css
/* Сброс отступов и рамок */
*, *::before, *::after {
  box-sizing: border-box; /* ширина включает padding и border */
  margin: 0;              /* убрать внешние отступы у всех */
  padding: 0;             /* убрать внутренние отступы у всех */
}

/* Базовые настройки страницы */
body {
  font-family: sans-serif; /* системный шрифт без засечек */
  line-height: 1.5;        /* межстрочный интервал */
  -webkit-font-smoothing: antialiased; /* сглаживание шрифта на macOS */
}

/* Адаптивные картинки */
img, video, svg {
  max-width: 100%;  /* картинка не выйдет за пределы контейнера */
  height: auto;     /* высота масштабируется пропорционально */
  display: block;   /* убрать baseline gap (пространство снизу) */
}

/* Удобная работа с шрифтами в форм-элементах */
input, button, textarea, select {
  font: inherit; /* унаследовать шрифт страницы (браузеры задают свой) */
}
```

## Зачем box-sizing: border-box?

Без него: `width: 200px` + `padding: 16px` = реальная ширина **232px** (padding добавляется).  
С ним: `width: 200px` + `padding: 16px` = реальная ширина ровно **200px** (padding внутри).

```
content-box (по умолчанию):
┌──────────────────────────────┐
│ padding │  content  │ padding│  = 200px + 16 + 16 = 232px
└──────────────────────────────┘

border-box:
┌──────────────────────────────┐
│ p │      content      │ p   │  = 200px (padding внутри)
└──────────────────────────────┘
```

## 🛠 Задание

Добавьте к существующему reset правила для `img` (адаптивность) и `input/button` (наследование шрифта).

```css:start
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  line-height: 1.5;
}

/* Добавьте правила для img и input/button/textarea */
```

```css:solution
*, *::before, *::after {
  box-sizing: border-box; /* ширина включает padding — интуитивно */
  margin: 0;              /* убрать отступы браузера по умолчанию */
  padding: 0;
}

body {
  font-family: sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased; /* сглаживание на macOS */
}

img, video, svg {
  max-width: 100%;  /* адаптивность: не выходить за контейнер */
  height: auto;     /* пропорциональная высота */
  display: block;   /* убрать baseline gap */
}

input, button, textarea, select {
  font: inherit;    /* унаследовать шрифт страницы */
}
```
