---
title: "Выравнивание во Flexbox"
highlight: css
type: theory
---

# Выравнивание во Flexbox

Flexbox — система вёрстки для расположения элементов в строку или колонку. Включается одним свойством и даёт мощные инструменты выравнивания.

## Оси Flexbox

Главное что нужно понять: Flexbox работает с двумя осями.

```
flex-direction: row (по умолчанию)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━→  Главная ось (main axis)
│ [элем] [элем] [элем]
↓  Поперечная ось (cross axis)

flex-direction: column
│  Главная ось (main axis)
↓
[элем]
[элем]
[элем]
──────────────────→  Поперечная ось (cross axis)
```

**Ключевой момент:** при `flex-direction: column` оси меняются местами!

## justify-content — выравнивание по главной оси

```css
.container {
  display: flex;
  justify-content: flex-start;    /* по умолчанию: элементы в начале */
  justify-content: flex-end;      /* элементы в конце */
  justify-content: center;        /* элементы по центру */
  justify-content: space-between; /* первый — слева, последний — справа, остальные равномерно */
  justify-content: space-around;  /* равные отступы вокруг каждого */
  justify-content: space-evenly;  /* строго равные промежутки между всеми */
}
```

## align-items — выравнивание по поперечной оси

```css
.container {
  display: flex;
  align-items: stretch;     /* по умолчанию: растянуть до высоты контейнера */
  align-items: flex-start;  /* к началу поперечной оси (вверх при row) */
  align-items: flex-end;    /* к концу поперечной оси (вниз при row) */
  align-items: center;      /* по центру поперечной оси */
  align-items: baseline;    /* выровнять по базовой линии текста */
}
```

## flex-direction — направление главной оси

```css
.container {
  display: flex;
  flex-direction: row;            /* по умолчанию: элементы в строку (слева направо) */
  flex-direction: row-reverse;    /* в строку, но справа налево */
  flex-direction: column;         /* в колонку (сверху вниз) */
  flex-direction: column-reverse; /* в колонку снизу вверх */
}
```

## flex-grow и flex-shrink — как элементы делят пространство

```css
.sidebar {
  flex: 0 0 250px;  /* flex-grow: 0, flex-shrink: 0, flex-basis: 250px */
  /* не растягивается, не сжимается, всегда 250px */
}

.main-content {
  flex: 1;          /* сокращение от flex: 1 1 0 */
  /* займёт всё оставшееся место */
}
```

## Практический пример — шапка

```css
.header {
  display: flex;              /* включить flexbox */
  justify-content: space-between; /* logo — слева, nav — справа */
  align-items: center;        /* вертикально по центру */
  padding: 0 24px;
}
```

## 🛠 Задание

Создайте контейнер с тремя карточками. Расположите их в строку с `space-between`. Затем добавьте второй вариант — с `flex-direction: column` и элементами по центру.

```css:start
.container {
  display: flex;
  /* Добавьте justify-content и align-items */
}

.card {
  width: 100px;
  height: 80px;
  background: #007bff;
  color: white;
  border-radius: 8px;
}
```

```css:solution
.container {
  display: flex;                   /* включить flexbox */
  justify-content: space-between; /* равномерно с отступами по краям */
  align-items: center;             /* вертикально по центру */
  padding: 16px;
  background: #f0f4f8;
  border-radius: 12px;
}

.card {
  width: 100px;                   /* ширина карточки */
  height: 80px;                   /* высота карточки */
  background: #007bff;            /* синий фон */
  color: white;                   /* белый текст */
  border-radius: 8px;             /* скруглённые углы */
  display: flex;                  /* flexbox внутри карточки */
  align-items: center;            /* вертикально по центру текст */
  justify-content: center;        /* горизонтально по центру текст */
}
```
