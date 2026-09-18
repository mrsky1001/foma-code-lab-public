---
title: "CSS шапки"
highlight: css
type: practice
---


# CSS шапки

Оформляем шапку:
- `.header` — нижняя граница и отступы
- `.header-container` — Flexbox для горизонтального выравнивания

`justify-content: space-between` разносит логотип и навигацию к краям.
`align-items: center` выравнивает их по вертикали.

## 🛠 Задание

Добавьте стили шапки:
```css
.header {
  border-bottom: 1px solid #dddddd; /* нижняя рамка 1px — визуально отделяет шапку от контента */
  padding: 18px 0;                  /* 18px сверху и снизу, 0 по бокам */
  background-color: #ffffff;        /* белый фон шапки */
}

.header-container {
  display: flex;                    /* включить Flexbox — логотип и nav в ряд */
  justify-content: space-between;   /* логотип слева, навигация справа */
  align-items: center;              /* выровнять по вертикали по центру */
}
```

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
  <header class="header">
    <div class="container header-container">
      
    </div>
  </header>
</body>
</html>
```

```css:solution
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  color: #222222;
  background-color: #ffffff;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 1200px;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.header {
  border-bottom: 1px solid #dddddd;
  padding: 18px 0;
  background-color: #ffffff;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
