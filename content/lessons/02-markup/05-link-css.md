---
title: "Подключение CSS файла"
highlight: html
type: practice
---

# Подключение CSS файла

HTML и CSS — два отдельных файла. HTML — это структура, CSS — внешний вид.

Чтобы браузер знал где искать стили — нужна ссылка `<link rel="stylesheet">`.

Атрибут `href` указывает путь к файлу относительно HTML-файла.

## 🛠 Задание

После блока Google Fonts добавьте:
`<link rel="stylesheet" href="css/style.css">`

Убедитесь что порядок тегов в head такой:
1. meta charset
2. meta viewport  
3. title
4. preconnect (fonts)
5. font stylesheet
6. **link stylesheet ← здесь**
7. link icon

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
</body>
</html>
```
