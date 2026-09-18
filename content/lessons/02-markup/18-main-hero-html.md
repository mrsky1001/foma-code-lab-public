---
title: "Тег main и секция hero"
highlight: html
type: practice
---


# Тег main и секция hero

`<main>` — семантический тег для основного контента страницы. Поисковики понимают: здесь главный текст.

`<section>` — логическая секция страницы. Используем для Hero — большого баннера с ключевым предложением.

CSS-класс `.main { flex: 1 }` заставит main растянуться на всё свободное место и прижмёт footer вниз.

## 🛠 Задание

После `</header>` добавьте main и hero-section:
```html
<main class="main">         <!-- основной контент страницы -->
  <div class="container">   <!-- ограничить ширину и центрировать контент -->
    <section class="hero-section">  <!-- секция: основной баннер -->
    </section>
  </div>
</main>
```

И CSS:
```css
.main {
  flex: 1;          /* растянуться на всё свободное место — footer прижмётся вниз */
  padding: 40px 0;  /* отступ 40px сверху и снизу */
}

.hero-section {
  padding: 20px 0 50px 0;  /* отступы: 20px сверху, 0 по бокам, 50px снизу */
  margin-bottom: 30px;     /* внешний отступ снизу перед следующей секцией */
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
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
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
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <section class="hero-section">
        
      </section>
    </div>
  </main>
</body>
</html>
```

```css:start
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
