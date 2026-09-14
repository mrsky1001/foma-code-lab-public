---
title: "Фавикон сайта"
highlight: html
type: practice
---

# Фавикон сайта

Фавикон — маленькая иконка сайта в браузерной вкладке.

Подключается через `<link>` с тремя атрибутами:
```
rel="icon"           — тип ссылки (иконка)
type="image/svg+xml" — формат файла
href="img/logo.svg"  — путь к файлу
```

## 🛠 Задание

После `<title>` добавьте строку:
`<link rel="icon" type="image/svg+xml" href="img/logo.svg">`

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
</body>
</html>
```
