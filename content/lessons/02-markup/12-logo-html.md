---
title: "HTML логотипа"
highlight: html
type: practice
---

# HTML логотипа

Логотип — это ссылка на главную страницу. Внутри:
- `<img>` — векторная иконка SVG
- `<span>` — текст «СмартОфис»

Атрибут `alt` у изображения обязателен: он описывает картинку для читалок для слабовидящих и поисковиков.

## 🛠 Задание

Внутри `div.header-container` добавьте логотип:
```html
<a href="index.html" class="logo">  <!-- ссылка на главную, класс logo — для стилей -->
  <img src="img/logo.svg" alt="Логотип" class="logo-icon">
  <!-- img: src — путь к SVG, alt — описание для доступности и SEO -->
  <span>СмартОфис</span>  <!-- текстовая часть логотипа -->
</a>
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
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
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
