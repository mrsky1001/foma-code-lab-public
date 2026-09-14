---
title: "CSS position: relative и absolute"
highlight: css
type: theory
---

# CSS position: relative и absolute

Без `position` элементы идут один за другим в потоке. `position` позволяет вырвать элемент из потока и разместить его точно.

## position: relative

Элемент остаётся в потоке, но его можно сдвинуть относительно **его исходного места**:

```css
.card {
  position: relative; /* делает .card «точкой отсчёта» для вложенных absolute-элементов */
}
```

## position: absolute

Элемент вырывается из потока и позиционируется относительно **ближайшего предка с position ≠ static**:

```css
.badge {
  position: absolute; /* вырвать из потока, позиционировать относительно родителя с relative */
  top: 10px;          /* отступ 10px от верхнего края родителя */
  right: 10px;        /* отступ 10px от правого края родителя */
}
```

## Классический паттерн: бейдж на карточке

```html
<div class="card">        <!-- position: relative — точка отсчёта -->
  <img src="room.jpg">
  <span class="badge">Хит!</span>  <!-- position: absolute — позиционируется внутри .card -->
</div>
```

```css
.card { position: relative; }  /* родитель — точка отсчёта для badge */
.badge {
  position: absolute;   /* вырвать из потока */
  top: 12px;            /* 12px от верха карточки */
  left: 12px;           /* 12px от левого края карточки */
  background: #007bff;  /* синий фон бейджа */
  color: white;         /* белый текст */
  padding: 4px 10px;    /* внутренние отступы: 4px сверху/снизу, 10px слева/справа */
  border-radius: 20px;  /* сильное скругление — таблетка */
  font-size: 12px;      /* маленький шрифт бейджа */
}
```

## 🛠 Задание

Создайте карточку с бейджем «Новинка» в правом верхнем углу.

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
