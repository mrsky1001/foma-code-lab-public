---
title: "Мета-теги в head"
highlight: html
type: practice
---

# Мета-теги в head

Тег `<head>` — невидимая «шапка» документа. Браузер читает её первой.

Три обязательных тега:
- `<meta charset="UTF-8">` — кодировка. Без неё русские буквы превратятся в кракозябры.
- `<meta name="viewport" ...>` — мобильная адаптация. Без него сайт на телефоне будет крошечным.
- `<title>` — название вкладки в браузере.

## 🛠 Задание

Внутри `<head>` добавьте:
1. `<meta charset="UTF-8">`
2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
3. `<title>СмартОфис — Бронирование офисных комнат</title>`

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
</head>
<body>
</body>
</html>
```
