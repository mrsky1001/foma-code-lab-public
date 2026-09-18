---
title: "Кнопка «Войти» в шапке"
highlight: html
type: practice
---


# Кнопка «Войти» в шапке

Кнопка «Войти» — это обычная ссылка, но со специальным классом `.nav-btn`, который делает её похожей на кнопку.

Принцип: **не меняем HTML-структуру** (это по-прежнему `<a>`), просто добавляем CSS-класс.

Два класса сразу: `class="nav-link nav-btn"` — применяются оба.

## 🛠 Задание

В `ul.nav-list` добавьте третий пункт + CSS:

HTML:
```html
<li><a href="pages/login.html" class="nav-link nav-btn">Войти</a></li>
<!-- nav-link — базовые стили ссылки; nav-btn — модификатор: синяя кнопка -->
```

CSS:
```css
.nav-btn {
  background-color: #007bff;  /* синий фон — выделяет кнопку среди обычных ссылок */
  color: #ffffff;             /* белый текст на синем фоне */
  font-weight: 600;           /* жирный текст — акцент */
}

.nav-btn:hover {
  background-color: #0056b3;  /* более тёмный синий при наведении — эффект нажатия */
  color: #ffffff;             /* белый текст остаётся */
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
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon" onerror="this.style.display='none'">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
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

.nav-list {
  display: flex;
  list-style: none;
  gap: 12px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #222222;
  padding: 8px 14px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
}

.nav-link:hover {
  color: #007bff;
  background-color: #eaf2ff;
}

.nav-btn {
  background-color: #007bff;
  color: #ffffff;
  font-weight: 600;
}

.nav-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}
```
