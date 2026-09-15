---
title: "Подключение внешнего CSS-файла"
highlight: html
type: theory
---

# Подключение внешнего CSS-файла

CSS можно писать прямо в HTML через `<style>`, но это плохой подход. В реальных проектах стили всегда выносятся в **отдельный файл**.

## Тег `<link>` — подключение CSS

```html
<head>
  <!-- rel="stylesheet" — тип ресурса: таблица стилей -->
  <!-- href — путь к CSS-файлу -->
  <link rel="stylesheet" href="css/style.css">
</head>
```

## Относительные пути — как они работают

Путь в `href` указывается **относительно HTML-файла**:

```
project/
├── index.html          ← наш файл
├── style.css           ← в той же папке
├── css/
│   └── main.css        ← в папке css
└── assets/
    └── fonts.css       ← в папке assets
```

| Файл находится | Путь в href |
|----------------|-------------|
| Та же папка | `href="style.css"` |
| В папке `css/` | `href="css/style.css"` |
| На уровень выше | `href="../style.css"` |
| На два уровня выше | `href="../../style.css"` |

## Пример структуры проекта

```html
<!-- Файл: project/pages/about.html -->
<link rel="stylesheet" href="../css/style.css">
<!--                         ↑ идём на уровень вверх из pages/
                               потом в папку css -->
```

## Порядок подключения важен

```html
<head>
  <link rel="stylesheet" href="css/reset.css">   <!-- сначала сброс стилей -->
  <link rel="stylesheet" href="css/fonts.css">   <!-- потом шрифты -->
  <link rel="stylesheet" href="css/style.css">   <!-- потом основные стили -->
</head>
<!-- Последующий файл может переопределить предыдущий (каскад) -->
```

## Отладка — что делать если CSS не применяется

Если стили не работают — почти всегда проблема в пути:
1. Откройте DevTools (F12) → вкладка **Network**
2. Найдите ваш CSS-файл
3. Если статус **404** — путь неверный

## 🛠 Задание

Подключите два файла: `css/reset.css` и `css/style.css`. HTML-файл находится в корне проекта.

```html:start
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Проект</title>
    <!-- Подключите reset.css и style.css из папки css/ -->
  </head>
  <body>
    <h1>Привет!</h1>
  </body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Проект</title>
    <link rel="stylesheet" href="css/reset.css">   <!-- сначала сброс: css/reset.css -->
    <link rel="stylesheet" href="css/style.css">   <!-- потом стили: css/style.css -->
  </head>
  <body>
    <h1>Привет!</h1>
  </body>
</html>
```
