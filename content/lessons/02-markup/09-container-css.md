---
title: "Класс .container"
highlight: css
type: practice
---


# Класс .container

Без ограничения ширины текст будет растягиваться на всю ширину монитора — читать неудобно.

`.container` — универсальный класс-обёртка:
- `max-width: 1200px; width: 100%` — адаптивная ширина (не шире 1200px, но сжимается на смартфонах)
- `margin: 0 auto` — центрирует блок горизонтально
- `padding: 0 15px` — небольшие поля по бокам

## 🛠 Задание

Добавьте класс .container:
```css
.container {
  max-width: 1200px; /* максимальная ширина контейнера */
  width: 100%;       /* занимает всю ширину экрана на мобильных устройствах */
  margin: 0 auto;   /* 0 сверху/снизу, auto слева/справа — центрирует блок по горизонтали */
  padding: 0 15px;  /* горизонтальные поля 15px — контент не прилипает к краям */
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
  min-width: 320px;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}
```
