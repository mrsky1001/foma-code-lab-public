---
title: "Flexbox на body для прижатия footer"
highlight: css
type: practice
---


# Flexbox на body для прижатия footer

Задача: footer должен быть всегда внизу экрана, даже если контента мало.

Решение: делаем `body` flex-контейнером с направлением по колонке (`flex-direction: column`). Затем `<main>` получит `flex: 1` — и он растянется на всё свободное место.

`min-height: 100vh` — body занимает минимум всю высоту экрана.

## 🛠 Задание

К стилям `body` добавьте:
```css
display: flex;           /* body — flex-контейнер, дети (header, main, footer) встают в колонку */
flex-direction: column;  /* направление — сверху вниз */
min-height: 100vh;       /* минимальная высота — весь экран (viewport height) */
min-width: 320px;        /* минимальная ширина страницы */
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
}
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
```
