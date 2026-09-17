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

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Reset</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="preview-box">
    <h1>Заголовок h1</h1>
    <p>Параграф текста с базовыми отступами.</p>
    <div style="margin: 16px 0;">
      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80" alt="Офис">
    </div>
    <div style="display: flex; gap: 8px;">
      <input type="text" placeholder="Поле ввода">
      <button>Кнопка</button>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  line-height: 1.5;
  padding: 24px;
  background: #f8fafc;
}

.preview-box {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Добавьте правила для img и input/button ниже */
```

```css:solution
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  line-height: 1.5;
  padding: 24px;
  background: #f8fafc;
}

.preview-box {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Добавьте правила для img и input/button ниже */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

input, button {
  font-family: inherit;
  font-size: inherit;
}
```
