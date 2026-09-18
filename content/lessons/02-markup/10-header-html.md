---
title: "HTML шапки сайта"
highlight: html
type: practice
---

# HTML шапки сайта

Тег `<header>` — семантический. Он говорит браузерам и поисковикам: «здесь шапка сайта».

Структура нашей шапки:
```
header.header
  └── div.container.header-container
        ├── (логотип — добавим на следующем шаге)
        └── (навигация — добавим позже)
```

Класс `header-container` будет использоваться для Flexbox-выравнивания логотипа и навигации.

## 🛠 Задание

В `<body>` добавьте структуру шапки:
```html
<header class="header">  <!-- семантическая шапка сайта -->
  <div class="container header-container">
  <!-- container — ограничивает ширину; header-container — Flexbox для лого + навигации -->
  </div>
</header>
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
</body>
</html>
```

```html:solution
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
```
