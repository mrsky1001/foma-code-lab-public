---
title: "CSS Reset — зачем сбрасывать стили браузера?"
highlight: css
type: theory
---

# CSS Reset — зачем сбрасывать стили браузера?

У каждого браузера есть **встроенные стили** — Chrome, Firefox, Safari показывают элементы немного по-разному. Это приводит к багам верстки.

CSS Reset убирает эти различия и даёт чистый лист.

## Минимальный CSS Reset

```css
* {                          /* универсальный селектор — применяется ко ВСЕМ элементам */
  box-sizing: border-box;    /* padding и border входят в width/height (не добавляются) */
  margin: 0;                 /* убрать все внешние отступы по умолчанию */
  padding: 0;                /* убрать все внутренние отступы по умолчанию */
}
```

**`box-sizing: border-box`** — революционное правило. Теперь padding и border входят в размер элемента, а не добавляются к нему.

Без него: `width: 200px + padding: 20px = 240px` (неожиданно!)
С ним: `width: 200px + padding: 20px = 200px` (как ожидалось!)

**`margin: 0; padding: 0`** — убирает отступы по умолчанию у заголовков, абзацев, списков.

## 🛠 Задание

Добавьте CSS Reset. Убедитесь, что у `<h1>` и `<p>` нет лишних отступов.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>CSS Reset</title>
  <style>
    /* Добавьте Reset здесь */

    body { font-family: sans-serif; padding: 20px; background: #fff; }
  </style>
</head>
<body>
  <h1>Заголовок без лишних отступов</h1>
  <p>Абзац без лишних отступов</p>
</body>
</html>
```

```css:start
/* Добавьте Reset */
body { font-family: sans-serif; padding: 20px; }
```

```css:solution
* {                          /* CSS сброс: ко всем элементам */
  box-sizing: border-box;    /* размеры включают padding и border */
  margin: 0;                 /* сброс внешних отступов */
  padding: 0;                /* сброс внутренних отступов */
}
body {
  font-family: sans-serif;   /* базовый шрифт без засечек */
  padding: 20px;             /* отступ внутри body */
}
```
