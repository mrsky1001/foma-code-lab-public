---
title: "Выравнивание во Flexbox"
highlight: css
type: theory
---

# Выравнивание во Flexbox

Flexbox даёт мощные инструменты выравнивания. Разберём каждый.

## justify-content — по главной оси (горизонталь в row)

| Значение | Что делает |
|----------| -----------|
| `flex-start` | Прижать к началу (по умолчанию) |
| `flex-end` | Прижать к концу |
| `center` | По центру |
| `space-between` | Равные промежутки между элементами |
| `space-around` | Равные промежутки вокруг каждого |

## align-items — по поперечной оси (вертикаль в row)

| Значение | Что делает |
|----------| -----------|
| `stretch` | Растянуть (по умолчанию) |
| `center` | По центру |
| `flex-start` | По верхнему краю |
| `flex-end` | По нижнему краю |

## gap — расстояние между элементами

```css
gap: 20px;           /* одинаковый отступ по всем направлениям между дочерними */
gap: 10px 20px;      /* row-gap (вертикальный) и column-gap (горизонтальный) */
```

## 🛠 Задание

Сделайте горизонтальное меню с пунктами, расположёнными через `space-between`, выровненными по центру по вертикали.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Выравнивание Flexbox</title>
  <style>
    .nav {
      background: #222;
      padding: 0 20px;
      height: 56px;
      /* Добавьте flex-свойства */
    }
    .nav a { color: #fff; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <nav class="nav">
    <a href="#">Главная</a>
    <a href="#">Каталог</a>
    <a href="#">О нас</a>
    <a href="#">Войти</a>
  </nav>
</body>
</html>
```

```css:start
.nav {
  background: #222;
  padding: 0 20px;
  height: 56px;
  /* Добавьте flex свойства */
}
.nav a { color: #fff; text-decoration: none; font-size: 14px; }
```

```css:solution
.nav {                              /* CSS селектор: навигационная панель */
  display: flex;                    /* включить Flexbox */
  justify-content: space-between;   /* ссылки равномерно по горизонтали */
  align-items: center;              /* ссылки по вертикали: по центру */
  background: #222;                 /* тёмный фон навигации */
  padding: 0 20px;                  /* горизонтальные внутренние отступы */
  height: 56px;                     /* фиксированная высота навигации */
}
.nav a { color: #fff; text-decoration: none; font-size: 14px; }  /* стиль ссылок */
```
