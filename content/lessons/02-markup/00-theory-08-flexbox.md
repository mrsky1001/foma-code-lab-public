---
title: "Подключение Flexbox"
highlight: css
type: theory
---

# Подключение Flexbox

**Flexbox** — это современный способ расположения элементов в одну строку или колонку. Включается одним свойством на **родительском** контейнере.

## display: flex

```css
.catalog {
  display: flex; /* включить Flexbox на контейнере */
}
```

Сразу после этого все прямые дочерние элементы `.catalog` становятся **flex-items** и выстраиваются в строку.

```
Без flex:            С flex:
[Карточка 1]         [Карточка 1] [Карточка 2] [Карточка 3]
[Карточка 2]
[Карточка 3]
```

## Flex-контейнер и flex-items

```html
<div class="catalog">            <!-- flex-контейнер: display: flex -->
  <div class="card">...</div>    <!-- flex-item: управляется родителем -->
  <div class="card">...</div>    <!-- flex-item -->
  <div class="card">...</div>    <!-- flex-item -->
</div>
```

**Правило:** свойства `justify-content`, `align-items`, `flex-direction`, `gap` применяются к **контейнеру**. Свойство `flex` применяется к **дочернему элементу**.

## Базовый набор свойств

```css
.catalog {
  display: flex;              /* включить Flexbox */
  gap: 16px;                  /* промежутки между карточками */
  flex-wrap: wrap;            /* перенос на следующую строку */
  justify-content: flex-start; /* горизонтальное выравнивание */
  align-items: stretch;       /* вертикальное выравнивание */
}
```

## Горизонтальная навигация

Одно из самых частых применений Flexbox — меню в строку:

```css
nav {
  display: flex;
  gap: 24px;
  align-items: center; /* вертикально по центру */
}
```

```html
<nav>
  <a href="/">Главная</a>       <!-- flex-item -->
  <a href="/catalog">Каталог</a> <!-- flex-item -->
  <a href="/about">О нас</a>    <!-- flex-item -->
</nav>
```

## Шапка — логотип слева, меню справа

```css
.header {
  display: flex;
  justify-content: space-between; /* первый — слева, последний — справа */
  align-items: center;            /* вертикально по центру */
  padding: 0 24px;
}
```

## 🛠 Задание

Превратите блок `.catalog` в Flex-контейнер: элементы в строку с `gap: 16px` и переносом. Убедитесь что карточки выравниваются по верхнему краю.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Подключение Flexbox</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="wrapper">
    <div class="catalog">
      <div class="catalog-item">
        <h3>Мини-офис Focus</h3>
        <p>450 ₽/час</p>
      </div>
      <div class="catalog-item">
        <h3>Конференц-зал Alpha</h3>
        <p>1200 ₽/час</p>
      </div>
      <div class="catalog-item">
        <h3>Опенспейс Hub</h3>
        <p>250 ₽/час</p>
      </div>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 24px;
  margin: 0;
}

.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.catalog {
  /* Сделайте flex-контейнером */
}

.catalog-item {
  flex: 1;
  min-width: 200px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.catalog-item h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.catalog-item p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}
```

```css:solution
body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 24px;
  margin: 0;
}

.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.catalog {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.catalog-item {
  flex: 1;
  min-width: 200px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.catalog-item h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.catalog-item p {
  margin: 0;
  color: #0ea5e9;
  font-weight: 600;
}
```
