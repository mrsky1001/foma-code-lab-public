---
title: "overflow и object-fit"
highlight: css
type: theory
---

# overflow и object-fit

## overflow — что делать с вылезающим контентом

`overflow` управляет поведением контента который не помещается в контейнер.

| Значение | Поведение |
|----------|-----------|
| `visible` | По умолчанию. Контент вылезает за пределы |
| `hidden` | Лишнее обрезается |
| `scroll` | Всегда показывает полосы прокрутки |
| `auto` | Полосы прокрутки только если нужны |

```css
.card-img-wrap {
  overflow: hidden;    /* обрезать картинку по границам блока */
  border-radius: 8px;  /* скругление работает только с overflow: hidden */
}

.description {
  overflow: auto;      /* скролл если текст не помещается */
  max-height: 200px;
}
```

## object-fit — вписать картинку в блок

Без `object-fit` картинка растягивается и деформируется. `object-fit` управляет тем как изображение заполняет блок:

```css
.card-img {
  width: 100%;
  height: 200px;       /* фиксированная высота блока */
  object-fit: cover;   /* заполнить блок пропорционально, обрезав лишнее */
}
```

| Значение | Поведение |
|----------|-----------|
| `fill` | По умолчанию. Растянуть на весь блок (деформация) |
| `cover` | Заполнить, сохраняя пропорции. Лишнее обрезается |
| `contain` | Вписать целиком. Могут быть поля по краям |
| `none` | Оригинальный размер |

## aspect-ratio — современное соотношение сторон

```css
.card-img-wrap {
  aspect-ratio: 16 / 9;  /* соотношение 16:9 */
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Раньше это делали хаком через `padding-top: 56.25%`. `aspect-ratio` — современный и чистый способ.

## display: block на img

```css
img {
  display: block; /* убирает пространство снизу (baseline gap) */
}
```

По умолчанию `<img>` — строчный элемент. Браузер резервирует место под «хвосты» букв (baseline) — появляется ~4px снизу. `display: block` убирает этот артефакт.

## 🛠 Задание

Создайте карточку с изображением 16:9 через `aspect-ratio`. Картинка должна заполнять блок без деформации через `object-fit: cover`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>overflow и object-fit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="card">
    <div class="card-img-wrap">
      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80" alt="Офис" class="card-img">
    </div>
    <div class="card-body">
      <h3>Офис Focus</h3>
      <p>Просторное рабочее место</p>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.card {
  width: 320px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 16px;
}

.card-body h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card-body p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.card-img-wrap {
  /* Задайте соотношение 16:9 и скройте выход за границы */
}

.card-img {
  width: 100%;
  height: 100%;
  /* Задайте object-fit чтобы не деформировать */
}
```

```css:solution
body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.card {
  width: 320px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 16px;
}

.card-body h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card-body p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.card-img-wrap {
  aspect-ratio: 16 / 9;  /* соотношение сторон блока */
  overflow: hidden;       /* обрезать картинку по границам */
  border-radius: 8px 8px 0 0; /* скругление только сверху */
}

.card-img {
  width: 100%;            /* занять всю ширину обёртки */
  height: 100%;           /* занять всю высоту обёртки */
  object-fit: cover;      /* заполнить пропорционально, обрезав лишнее */
  display: block;         /* убрать baseline gap (пространство снизу) */
}
```
