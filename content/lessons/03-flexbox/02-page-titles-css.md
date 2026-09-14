---
title: "CSS заголовков секций"
highlight: css
type: practice
---

# CSS заголовков секций

Стилизуем `.page-title` и `.page-subtitle` — универсальные классы заголовков для любой секции сайта.

Центрирование через `text-align: center` — простой способ выровнять заголовок.

`letter-spacing: -0.02em` — лёгкое сближение букв делает крупный заголовок более аккуратным.

## 🛠 Задание

Добавьте стили заголовков секций:
```css
.page-title {
  font-size: 28px;          /* крупный заголовок секции */
  font-weight: 800;         /* жирный */
  letter-spacing: -0.02em;  /* слегка сближаем буквы */
  margin-bottom: 8px;       /* небольшой отступ до подзаголовка */
  text-align: center;       /* по центру */
}

.page-subtitle {
  color: #666666;       /* серый — тихий вспомогательный текст */
  text-align: center;   /* по центру под заголовком */
  font-size: 15px;      /* чуть меньше основного текста */
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
          <li><a href="pages/login.html" class="nav-link nav-btn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
        <div class="hero-bottom">
          <p class="hero-subtitle">
            Удобный выбор и быстрое бронирование рабочих пространств в центре города
          </p>
          <div class="hero-metrics">
            <div class="metric-item">
              <span class="metric-val">24/7</span>
              <span class="metric-lbl">Доступ</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">от 250 ₽</span>
              <span class="metric-lbl">Почасовая аренда</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">0 ₽</span>
              <span class="metric-lbl">Без комиссии</span>
            </div>
          </div>
        </div>
      </section>

      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>
      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-info">
        <p><strong>СмартОфис</strong> — Сервис бронирования офисных комнат</p>
        <p>© 2026 СмартОфис. Все права защищены.</p>
      </div>
      <div class="footer-contacts">
        <p>Email: <a href="mailto:info@smartoffice.ru">info@smartoffice.ru</a></p>
        <p>Телефон: <a href="tel:+78005553535">+7 (800) 555-35-35</a></p>
      </div>
    </div>
  </footer>
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

.main {
  flex: 1;
  padding: 40px 0;
}

.hero-section {
  padding: 20px 0 50px 0;
  margin-bottom: 30px;
}

.hero-title {
  font-size: 108px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: #222222;
  margin-bottom: 25px;
}

.brand-highlight {
  color: #007bff;
}

.hero-bottom {
  border-top: 2px solid #222222;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.hero-subtitle {
  font-size: 17px;
  line-height: 1.5;
  color: #555555;
  max-width: 600px;
}

.hero-metrics {
  display: flex;
  align-items: center;
  gap: 25px;
}

.metric-item {
  display: flex;
  flex-direction: column;
}

.metric-val {
  font-size: 20px;
  font-weight: 800;
  color: #007bff;
  letter-spacing: -0.02em;
}

.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}

.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dddddd;
  color: #444444;
  padding: 25px 0;
  margin-top: auto;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-contacts p {
  font-size: 14px;
  margin-bottom: 4px;
}

.footer-contacts a {
  color: #007bff;
  text-decoration: none;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  text-align: center;
}

.page-subtitle {
  color: #666666;
  text-align: center;
  font-size: 15px;
}
```
