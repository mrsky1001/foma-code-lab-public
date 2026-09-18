---
title: "CSS сброс стилей"
highlight: css
type: practice
---


# CSS сброс стилей

Браузер по умолчанию добавляет собственные отступы к тегам. На разных браузерах они разные. Чтобы верстка выглядела одинаково везде — сбрасываем их.

Селектор `*` выбирает **абсолютно все** элементы на странице.

`box-sizing: border-box` — включает padding и border в ширину элемента. Без этого элемент шириной 200px + padding 20px = 240px, что ломает верстку.

## 🛠 Задание

В файле `css/style.css` напишите:
```css
* {
  box-sizing: border-box; /* padding и border включаются в ширину — ничего не сломает размеры */
  margin: 0;              /* убрать внешние отступы браузера у всех тегов */
  padding: 0;             /* убрать внутренние отступы браузера у всех тегов */
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

```css:start
/* Наш CSS пока пуст */
```

```css:solution
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
