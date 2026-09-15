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

```css:start
.catalog {
  /* Включите Flexbox */
  /* Добавьте gap и flex-wrap */
}

.card {
  flex: 1 1 200px;
  min-width: 160px;
  padding: 16px;
  background: #f0f4f8;
  border-radius: 8px;
}
```

```css:solution
.catalog {
  display: flex;           /* включить Flexbox на контейнере */
  gap: 16px;               /* промежутки между дочерними карточками */
  flex-wrap: wrap;         /* перенос карточек на следующую строку */
  align-items: flex-start; /* выровнять карточки по верхнему краю */
}

.card {
  flex: 1 1 200px;   /* растягиваться/сжиматься, базовая ширина 200px */
  min-width: 160px;  /* не сжимать меньше 160px */
  padding: 16px;
  background: #f0f4f8;
  border-radius: 8px;
}
```
