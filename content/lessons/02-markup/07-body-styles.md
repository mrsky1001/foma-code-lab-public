---
title: "Стили тега body"
highlight: css
type: practice
---


# Стили тега body

Тег `body` — контейнер всего видимого содержимого страницы. Здесь задаём:

- `font-family` — шрифт для всей страницы (Inter, который мы подключили)
- `color` — цвет текста по умолчанию
- `background-color` — цвет фона
- `line-height` — межстрочный интервал (1.5 = комфортное расстояние между строками)

## 🛠 Задание

После блока `*` добавьте стили для body:
```css
body {
  font-family: 'Inter', sans-serif; /* шрифт Inter для всей страницы (подключён из Google Fonts) */
  color: #222222;                   /* цвет текста по умолчанию — почти чёрный */
  background-color: #ffffff;        /* белый фон страницы */
  line-height: 1.5;                 /* межстрочный интервал — 1.5 комфортно для чтения */
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
}
```
