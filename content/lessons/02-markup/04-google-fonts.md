---
title: "Подключение Google Fonts"
highlight: html
type: practice
---

# Подключение Google Fonts

По умолчанию браузер использует системные шрифты — Times New Roman или Arial. Google Fonts даёт тысячи бесплатных шрифтов.

Два шага:
**1.** В `<head>` добавить ссылки-предзагрузки (`preconnect`) и саму ссылку на шрифт.
**2.** В CSS — применить: `font-family: 'Inter', sans-serif;`

`sans-serif` — запасной шрифт. Если Inter не загрузится, браузер возьмёт системный без засечек.

## 🛠 Задание

Перед `<link rel="icon">` добавьте три строки:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<!-- preconnect — заранее установить соединение с сервером Google Fonts, ускоряет загрузку -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- второй сервер Google для файлов шрифтов, crossorigin — разрешить запросы с другого домена -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<!-- подключить шрифт Inter с начертаниями 400/500/600/700/800; display=swap — показать текст сразу -->
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
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
</body>
</html>
```
