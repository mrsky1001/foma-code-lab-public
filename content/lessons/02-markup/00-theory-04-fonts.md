---
title: "Подключение шрифтов Google Fonts"
highlight: html
type: theory
---

# Подключение шрифтов Google Fonts

По умолчанию браузер использует системные шрифты — Times New Roman или Arial. Они выглядят устаревшими. Google Fonts даёт тысячи бесплатных современных шрифтов.

## Как подключить шрифт — два шага

**Шаг 1.** В `<head>` HTML — добавить три тега:

```html
<!-- preconnect — заранее установить соединение с серверами Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Сам шрифт: Inter с вариантами 400 (regular), 600 (semi-bold), 700 (bold) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

**Шаг 2.** В CSS — применить шрифт к `body`:

```css
body {
  font-family: 'Inter', sans-serif;
  /* 'Inter' — загруженный шрифт; sans-serif — запасной если Inter не загрузился */
}
```

## Что значит `display=swap`?

Параметр `display=swap` в URL шрифта управляет поведением во время загрузки:

| Значение | Поведение |
|----------|-----------|
| `swap` | Сначала показать системный шрифт, потом заменить на загруженный |
| `block` | Ничего не показывать пока шрифт не загрузится (мигание) |
| `fallback` | Очень короткое время ожидания, потом фолбэк |

**Всегда используйте `display=swap`** — пользователь сразу видит текст.

## Несколько вариантов начертания

Параметр `wght@400;600;700` задаёт какие начертания загружать:

```html
<!-- Только нужные веса — чем меньше тем быстрее загрузка -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

В CSS используем через `font-weight`:

```css
p         { font-weight: 400; }  /* обычный текст */
.subtitle { font-weight: 600; }  /* полужирный (semi-bold) */
h1, h2    { font-weight: 700; }  /* жирный */
```

## Несколько шрифтов

```html
<!-- Inter + Fira Code в одном запросе — экономия запросов -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { font-family: 'Inter', sans-serif; }
code { font-family: 'Fira Code', monospace; } /* моноширинный для кода */
```

## Альтернатива: системный стек шрифтов

Если не хочется загружать внешний шрифт — используйте системный стек. Он быстрее загружается:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               Oxygen, Ubuntu, Cantarell, sans-serif;
  /* Каждый браузер возьмёт свой лучший системный шрифт */
}
```

## 🛠 Задание

Подключите шрифт Inter с тремя вариантами весов (400, 600, 700). Примените к `body`. Используйте `h1` с `font-weight: 700` и параграф с `font-weight: 400`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Шрифты</title>
  <!-- Подключите Inter здесь (3 тега) -->
  <style>
    body {
      /* Примените шрифт */
    }
    h1 {
      /* Жирный: font-weight 700 */
    }
  </style>
</head>
<body>
  <h1>Заголовок в Inter 700</h1>
  <p>Обычный текст в Inter 400.</p>
</body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Шрифты</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">         <!-- соединение с Google Fonts -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <!-- соединение с CDN -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <!-- display=swap: сначала системный шрифт, потом Inter -->
  <style>
    body {
      font-family: 'Inter', sans-serif; /* CSS: Inter как основной, sans-serif как запасной */
      font-weight: 400;                 /* CSS: базовый вес — обычный текст */
    }
    h1 {
      font-weight: 700;                 /* CSS: жирный заголовок */
    }
  </style>
</head>
<body>
  <h1>Заголовок в Inter 700</h1>
  <p>Обычный текст в Inter 400.</p>
</body>
</html>
```
