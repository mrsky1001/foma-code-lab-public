---
title: "Первое знакомство с Flexbox"
highlight: css
type: theory
---

# Первое знакомство с Flexbox

Flexbox — это система расположения элементов в одну строку или колонку. До Flexbox разработчики использовали float и position, что было мучительно сложно.

## Включаем Flexbox

Достаточно одного свойства на **родительском** элементе:

```css
.container {               /* CSS селектор: блок-контейнер */
  display: flex;           /* CSS свойство: включить Flexbox — дети встают в ряд */
}
```

Теперь все **дочерние** элементы автоматически встают в ряд.

## Основные свойства

```css
.container {
  display: flex;                /* включить Flexbox-режим */
  flex-direction: row;          /* направление: row (ряд) или column (колонка) */
  justify-content: center;      /* выравнивание по главной оси (горизонталь для row) */
  align-items: center;          /* выравнивание по поперечной оси (вертикаль для row) */
  gap: 16px;                    /* расстояние между дочерними элементами */
}
```

## 🛠 Задание

Расположите три цветных блока в ряд с отступом 16px между ними, выровняйте по центру контейнера.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Flexbox</title>
  <style>
    .container {
      /* Включите flex здесь */
      height: 200px;
      background: #f0f4f8;
    }
    .box { width: 80px; height: 80px; border-radius: 8px; }
    .box-1 { background: #007bff; }
    .box-2 { background: #28a745; }
    .box-3 { background: #dc3545; }
  </style>
</head>
<body>
  <div class="container">
    <div class="box box-1"></div>
    <div class="box box-2"></div>
    <div class="box box-3"></div>
  </div>
</body>
</html>
```

```css:start
.container {
  /* Добавьте flex-свойства */
  height: 200px;
  background: #f0f4f8;
}
.box { width: 80px; height: 80px; border-radius: 8px; }
.box-1 { background: #007bff; }
.box-2 { background: #28a745; }
.box-3 { background: #dc3545; }
```

```css:solution
.container {                      /* CSS селектор: родительский контейнер */
  display: flex;                  /* включить Flexbox */
  justify-content: center;        /* горизонтальное выравнивание: по центру */
  align-items: center;            /* вертикальное выравнивание: по центру */
  gap: 16px;                      /* отступ 16px между каждым дочерним блоком */
  height: 200px;                  /* высота контейнера */
  background: #f0f4f8;            /* цвет фона */
}
.box { width: 80px; height: 80px; border-radius: 8px; }  /* базовые стили квадрата */
.box-1 { background: #007bff; }   /* синий блок */
.box-2 { background: #28a745; }   /* зелёный блок */
.box-3 { background: #dc3545; }   /* красный блок */
```
