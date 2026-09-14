---
title: "Flexbox на body для прижатия footer"
highlight: css
type: practice
---

# Flexbox на body для прижатия footer

Задача: footer должен быть всегда внизу экрана, даже если контента мало.

Решение: делаем `body` flex-контейнером с направлением по колонке (`flex-direction: column`). Затем `<main>` получит `flex: 1` — и он растянется на всё свободное место.

`min-height: 100vh` — body занимает минимум всю высоту экрана.

## 🛠 Задание

К стилям `body` добавьте:
```css
display: flex;           /* body — flex-контейнер, дети (header, main, footer) встают в колонку */
flex-direction: column;  /* направление — сверху вниз */
min-height: 100vh;       /* минимальная высота — весь экран (viewport height) */
min-width: 1200px;       /* минимальная ширина — не сжиматься ниже 1200px */
```
