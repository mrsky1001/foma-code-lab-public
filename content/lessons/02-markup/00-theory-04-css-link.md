---
title: "Подключение внешнего CSS-файла"
highlight: html
type: theory
---

# Подключение внешнего CSS-файла

CSS можно писать прямо внутри HTML в теге `<style>`, но это плохая практика. Профессионалы выносят CSS в отдельный файл.

## Как подключить CSS-файл?

```html
<link rel="stylesheet" href="css/style.css">
<!-- link: подключение внешнего ресурса; rel="stylesheet" — это таблица стилей; href — путь к файлу -->
```

- `rel="stylesheet"` — говорит браузеру, что это таблица стилей
- `href` — путь к файлу. Может быть относительным (`css/style.css`) или абсолютным

## Порядок подключения важен!

Если подключить два CSS-файла, второй перекроет стили первого при конфликте:
```html
<link rel="stylesheet" href="css/reset.css">   <!-- сначала сброс стилей браузера -->
<link rel="stylesheet" href="css/style.css">   <!-- потом наши стили (перекрывают reset) -->
```

## 🛠 Задание

Подключите файл `style.css` к HTML-странице. В CSS сделайте фон страницы светло-серым (`#f5f5f5`).

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>CSS файл</title>
  <!-- Подключите style.css -->
</head>
<body>
  <h1>Внешний CSS работает!</h1>
</body>
</html>
```

```css:start
/* Добавьте фон для body */
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>CSS файл</title>
  <link rel="stylesheet" href="style.css">  <!-- подключение внешнего CSS-файла -->
</head>
<body>
  <h1>Внешний CSS работает!</h1>  <!-- заголовок страницы -->
</body>
</html>
```

```css:solution
body {
  background-color: #f5f5f5;  /* CSS свойство: цвет фона страницы */
  font-family: sans-serif;     /* CSS свойство: шрифт без засечек */
  padding: 20px;               /* CSS свойство: внутренние отступы со всех сторон */
}
```
