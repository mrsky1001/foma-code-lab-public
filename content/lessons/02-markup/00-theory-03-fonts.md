---
title: "Подключение шрифтов Google Fonts"
highlight: html
type: theory
---

# Подключение шрифтов Google Fonts

По умолчанию браузер использует системные шрифты — Times New Roman или Arial. Они выглядят устаревшими. Google Fonts даёт тысячи бесплатных шрифтов.

## Как подключить шрифт?

Два шага:

**1. В `<head>` HTML — добавить ссылки:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">       <!-- предварительное соединение с Google Fonts -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>  <!-- предварительное соединение с CDN шрифтов -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">  <!-- подключение шрифта Inter -->
```

`rel="preconnect"` — подсказка браузеру: «заранее установи соединение с этим сервером, мы туда пойдём».

**2. В CSS — применить шрифт:**
```css
body {
  font-family: 'Inter', sans-serif;  /* основной шрифт + запасной без засечек */
}
```

`sans-serif` — запасной шрифт. Если Inter не загрузится, браузер возьмёт системный без засечек.

## 🛠 Задание

Подключите шрифт Inter и примените его к body.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Шрифты</title>
  <!-- Подключите Inter здесь -->
  <style>
    body {
      /* Примените шрифт */
    }
  </style>
</head>
<body>
  <h1>Текст со шрифтом Inter</h1>
  <p>Красивый современный шрифт для веб-приложений.</p>
</body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Шрифты</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">    <!-- соединение с Google Fonts -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>  <!-- соединение с CDN -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">  <!-- загрузка Inter -->
  <style>
    body {
      font-family: 'Inter', sans-serif;  /* CSS свойство: шрифт Inter, запасной — sans-serif */
    }
  </style>
</head>
<body>
  <h1>Текст со шрифтом Inter</h1>   <!-- заголовок страницы -->
  <p>Красивый современный шрифт для веб-приложений.</p>  <!-- абзац текста -->
</body>
</html>
```
