---
title: "CSS ссылок навигации"
highlight: css
type: practice
---

# CSS ссылок навигации

Стилизуем ссылки:
- Убираем подчёркивание (`text-decoration: none`)
- Добавляем внутренние отступы (`padding`) — область клика становится больше
- Скругляем углы (`border-radius`)
- `:hover` — псевдокласс. Срабатывает при наведении мыши. Меняем цвет и фон.

## 🛠 Задание

Добавьте стили ссылок:
```css
.nav-link {
  text-decoration: none;  /* убрать подчёркивание ссылки */
  color: #222222;         /* тёмный цвет текста */
  padding: 8px 14px;      /* отступ 8px сверху/снизу, 14px по бокам — увеличивает область клика */
  border-radius: 4px;     /* слегка скруглить углы */
  font-weight: 500;       /* немного жирнее обычного текста */
  font-size: 14px;        /* размер шрифта ссылки */
}

.nav-link:hover {
  color: #007bff;              /* синий цвет при наведении */
  background-color: #eaf2ff;   /* голубоватый фон при наведении */
}
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
```
