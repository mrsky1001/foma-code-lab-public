---
title: "Тег <head> и мета-теги"
highlight: html
type: theory
---

# Тег `<head>` и мета-теги

`<head>` — невидимая «голова» HTML-страницы. Пользователь не видит её содержимое, но браузер и поисковики используют эти данные постоянно.

## Что живёт в `<head>`

```html
<head>
  <!-- 1. КОДИРОВКА — всегда первой строкой в head -->
  <meta charset="UTF-8">

  <!-- 2. VIEWPORT — корректное отображение на мобильных -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 3. ОПИСАНИЕ ДЛЯ ПОИСКОВИКОВ -->
  <meta name="description" content="Аренда переговорных комнат в Москве">

  <!-- 4. ЗАГОЛОВОК ВКЛАДКИ -->
  <title>СмартОфис — аренда переговорных</title>

  <!-- 5. ИКОНКА ВКЛАДКИ (favicon) -->
  <link rel="icon" href="favicon.ico">

  <!-- 6. ПОДКЛЮЧЕНИЕ CSS -->
  <link rel="stylesheet" href="css/style.css">
</head>
```

## Зачем нужен viewport

Без viewport мобильный браузер масштабирует страницу под Desktop и пользователь видит крошечный текст:

```
Без viewport:          С viewport:
┌─────────────┐        ┌───────┐
│ [микроскоп- │        │ Текст │
│  ический    │        │ нор-  │
│  текст]     │        │ маль- │
│             │        │ ного  │
└─────────────┘        │ разм. │
                       └───────┘
```

```html
<!-- initial-scale=1.0 — не масштабировать при загрузке -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Favicon — иконка вкладки

```html
<link rel="icon" href="favicon.ico">         <!-- .ico формат, старый способ -->
<link rel="icon" href="favicon.svg" type="image/svg+xml"> <!-- SVG — лучший вариант -->
<link rel="apple-touch-icon" href="icon-180.png"> <!-- иконка для iOS -->
```

## 🛠 Задание

Добавьте в `<head>` все 4 обязательных элемента: charset, viewport, title, и иконку. Добавьте описание для поисковиков.

```html:start
<!DOCTYPE html>
<html lang="ru">
  <head>
    <!-- Добавьте мета-теги -->
  </head>
  <body>
    <h1>СмартОфис</h1>
  </body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">          <!-- кодировка: поддержка кириллицы -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- мобильные -->
    <meta name="description" content="Аренда переговорных комнат в Москве — СмартОфис">
    <title>СмартОфис — аренда переговорных</title>  <!-- вкладка браузера -->
    <link rel="icon" href="favicon.svg" type="image/svg+xml">  <!-- иконка вкладки -->
    <link rel="stylesheet" href="css/style.css">               <!-- стили -->
  </head>
  <body>
    <h1>СмартОфис</h1>
  </body>
</html>
```
