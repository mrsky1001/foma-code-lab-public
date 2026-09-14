---
title: "flex-wrap и адаптивная сетка"
highlight: css
type: theory
---

# flex-wrap и адаптивная сетка

По умолчанию Flexbox пытается уместить все элементы в одну строку, сжимая их. `flex-wrap: wrap` разрешает перенос на новую строку.

## flex-wrap

```css
.grid {
  display: flex;           /* включить Flexbox */
  flex-wrap: wrap;         /* разрешить перенос элементов на новую строку */
  gap: 20px;               /* отступ между карточками */
}
```

## Как задать ширину элементов в сетке?

```css
.card {
  width: 300px;            /* фиксированная ширина карточки */
}
```

Или гибкий вариант:
```css
.card {
  flex: 1 1 300px;         /* flex-grow flex-shrink flex-basis: расти, сжиматься, базовая 300px */
  min-width: 280px;        /* минимальная ширина — не меньше 280px */
}
```

## 🛠 Задание

Создайте сетку из 4 карточек. При нехватке места карточки должны переноситься на следующую строку.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>flex-wrap</title>
  <style>
    .grid {
      display: flex;
      /* Добавьте flex-wrap и gap */
      padding: 20px;
      background: #f5f5f5;
    }
    .card {
      width: 200px;
      height: 120px;
      background: #007bff;
      border-radius: 8px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="grid">
    <div class="card">Карточка 1</div>
    <div class="card">Карточка 2</div>
    <div class="card">Карточка 3</div>
    <div class="card">Карточка 4</div>
  </div>
</body>
</html>
```

```css:start
.grid {
  display: flex;
  /* Добавьте flex-wrap и gap */
  padding: 20px;
  background: #f5f5f5;
}
.card {
  width: 200px; height: 120px;
  background: #007bff; border-radius: 8px;
  color: white; display: flex;
  align-items: center; justify-content: center;
  font-weight: 600;
}
```

```css:solution
.grid {                     /* CSS селектор: контейнер сетки */
  display: flex;            /* включить Flexbox */
  flex-wrap: wrap;          /* разрешить перенос на новую строку при нехватке места */
  gap: 20px;                /* отступ между карточками */
  padding: 20px;            /* внутренний отступ сетки */
  background: #f5f5f5;      /* фон сетки */
}
.card {                     /* CSS селектор: отдельная карточка */
  width: 200px; height: 120px;          /* фиксированные размеры карточки */
  background: #007bff; border-radius: 8px;  /* синий фон, скруглённые углы */
  color: white; display: flex;           /* белый текст, Flexbox внутри */
  align-items: center; justify-content: center;  /* текст по центру */
  font-weight: 600;          /* полужирный шрифт */
}
```
