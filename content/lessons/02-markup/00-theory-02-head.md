---
title: "Тег <head> и мета-теги"
highlight: html
type: theory
---

# Тег `<head>` и мета-теги

`<head>` — это «невидимая голова» страницы. Пользователь её не видит, но браузер и поисковики читают внимательно.

## Самые важные мета-теги

```html
<meta charset="UTF-8">  <!-- кодировка: без неё кириллица → кракозябры -->
```
Кодировка. Без неё русский текст превращается в кракозябры.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- viewport: адаптивность на мобильных устройствах -->
```
Адаптивность. Без него мобильные устройства уменьшают страницу до крошечного размера.

```html
<meta name="description" content="Описание страницы для поисковиков">
<!-- description: текст под заголовком в результатах Google -->
```
Описание — появляется в результатах Google под заголовком.

```html
<title>Название вкладки</title>  <!-- заголовок вкладки в браузере -->
```
Заголовок вкладки в браузере.

## 🛠 Задание

Заполните `<head>` правильно: charset, viewport, description и title.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- Добавьте мета-теги здесь -->
</head>
<body>
  <h1>Тест мета-тегов</h1>
</body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">                                       <!-- кодировка UTF-8 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- адаптив для мобильных -->
  <meta name="description" content="Учебная страница по HTML"> <!-- описание для поисковиков -->
  <title>Учебная страница</title>                              <!-- текст во вкладке браузера -->
</head>
<body>
  <h1>Тест мета-тегов</h1>  <!-- главный заголовок страницы -->
</body>
</html>
```
