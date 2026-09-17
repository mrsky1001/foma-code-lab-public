---
title: "CSS position: relative, absolute, fixed, sticky"
highlight: css
type: theory
---

# CSS position

Без `position` элементы идут один за другим в **потоке документа**. `position` позволяет вырвать элемент из потока и разместить его точно.

## Все значения position

| Значение | Описание |
|----------|----------|
| `static` | По умолчанию. Элемент в обычном потоке |
| `relative` | В потоке, но можно сдвинуть. Точка отсчёта для `absolute` детей |
| `absolute` | Вырван из потока. Позиционируется относительно ближайшего предка с `position ≠ static` |
| `fixed` | Вырван из потока. Позиционируется относительно **viewport** (экрана) |
| `sticky` | Сначала как `relative`, при прокрутке «прилипает» как `fixed` |

## position: relative

Элемент остаётся в потоке. Главная задача — создать **точку отсчёта** для вложенных `absolute`-элементов:

```css
.card {
  position: relative; /* делает .card точкой отсчёта для absolute внутри */
}
```

## position: absolute

Элемент вырывается из потока и позиционируется относительно **ближайшего предка с `position: relative`**:

```css
.badge {
  position: absolute; /* вырвать из потока */
  top: 10px;          /* отступ 10px от верхнего края родителя */
  right: 10px;        /* отступ 10px от правого края родителя */
}
```

**Классический паттерн: бейдж на карточке**
```html
<div class="card">         <!-- position: relative — точка отсчёта -->
  <img src="room.jpg">
  <span class="badge">Хит!</span>  <!-- position: absolute — над картинкой -->
</div>
```

## position: fixed

Фиксируется относительно **экрана (viewport)** — не прокручивается вместе со страницей. Используется для шапок, кнопок «Наверх», модальных окон:

```css
.sticky-header {
  position: fixed;    /* фиксировать относительно окна браузера */
  top: 0;             /* прижать к верху экрана */
  left: 0;            /* прижать к левому краю */
  width: 100%;        /* на всю ширину */
  z-index: 100;       /* поверх остального контента */
}
```

## position: sticky

Гибрид: ведёт себя как `relative` пока не достигнет заданного порога — потом как `fixed`:

```css
.section-header {
  position: sticky;   /* sticky — «прилипающий» заголовок */
  top: 0;             /* прилипнуть когда достигнет верха viewport */
  background: white;  /* нужен фон, иначе контент будет просвечивать */
}
```

## z-index — порядок стопки

`z-index` управляет тем, какой элемент находится **поверх** другого. Работает только на positioned-элементах (`position ≠ static`):

```css
.modal {
  position: fixed;
  z-index: 1000;      /* поверх всего на странице */
}

.header {
  position: fixed;
  z-index: 100;       /* под модальным окном, но над контентом */
}

.content {
  /* position: static — z-index не работает */
}
```

Больший `z-index` = элемент «выше» в стопке.

## 🛠 Задание

Создайте карточку с бейджем «Новинка» в правом верхнем углу. Используйте паттерн `relative` на карточке + `absolute` на бейдже.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS position</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <div class="card">
      <span class="badge">Новинка</span>
      <h3>Мини-офис Focus</h3>
      <p>Идеальное пространство для концентрации.</p>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; }
.sandbox { max-width: 380px; margin: 0 auto; }
.card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  /* Сделайте карточку точкой отсчёта для абсолютного позиционирования */
}

.badge {
  background: #ef4444;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  /* Позиционируйте абсолютно в правом верхнем углу */
}

h3 { margin: 0 0 8px 0; font-size: 18px; }
p { margin: 0; color: #64748b; font-size: 14px; }
```

```css:solution
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; }
.sandbox { max-width: 380px; margin: 0 auto; }
.card {
  position: relative;  /* точка отсчёта для абсолютно позиционированных детей */
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.badge {
  position: absolute;  /* вынуть из потока */
  top: 12px;           /* 12px от верхнего края card */
  right: 12px;         /* 12px от правого края card */
  background: #ef4444;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

h3 { margin: 0 0 8px 0; font-size: 18px; }
p { margin: 0; color: #64748b; font-size: 14px; }
```
