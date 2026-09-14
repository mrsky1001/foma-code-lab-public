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

```css:start
.card {
  width: 200px;
  height: 150px;
  background: #f0f4f8;
  border-radius: 8px;
  /* Добавьте position */
}

.badge {
  background: #28a745;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  /* Сделайте absolute, поместите в правый верхний угол */
}
```

```css:solution
.card {
  width: 200px;           /* ширина карточки */
  height: 150px;          /* высота карточки */
  background: #f0f4f8;    /* светло-серый фон */
  border-radius: 8px;     /* скруглённые углы */
  position: relative;     /* точка отсчёта для дочернего .badge */
}

.badge {
  background: #28a745;    /* зелёный фон бейджа */
  color: white;           /* белый текст */
  padding: 4px 10px;      /* отступы внутри бейджа */
  border-radius: 20px;    /* форма таблетки */
  font-size: 12px;        /* маленький размер шрифта */
  position: absolute;     /* позиционировать относительно .card */
  top: 10px;              /* 10px от верхнего края карточки */
  right: 10px;            /* 10px от правого края карточки */
}
```
