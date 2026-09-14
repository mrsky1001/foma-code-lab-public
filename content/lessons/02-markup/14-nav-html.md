---
title: "HTML навигации"
highlight: html
type: practice
---

# HTML навигации

Тег `<nav>` группирует навигационные ссылки. Поисковики понимают: всё внутри `<nav>` — это меню.

Структура:
```
nav.nav
  └── ul.nav-list (список)
        ├── li → a.nav-link «Главная»
        └── li → a.nav-link «Каталог»
```

`<ul>` — неупорядоченный список. `<li>` — элемент списка. `<a>` — ссылка.

## 🛠 Задание

После `</a>` логотипа добавьте навигацию:
```html
<nav class="nav">           <!-- семантический блок навигации -->
  <ul class="nav-list">    <!-- неупорядоченный список пунктов меню -->
    <li><a href="index.html" class="nav-link">Главная</a></li>
    <!-- li — пункт списка; a — ссылка с классом nav-link -->
    <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
  </ul>
</nav>
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
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
        </ul>
      </nav>
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

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #222222;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.logo-icon {
  width: 32px;
  height: 32px;
}
```
