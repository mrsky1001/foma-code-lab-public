---
title: "Псевдоклассы :hover, :focus, :active и transition"
highlight: css
type: theory
---

# Псевдоклассы и transition

Псевдоклассы — это специальные состояния элементов. Они добавляются через `:` после селектора и позволяют применять стили в зависимости от того, что делает пользователь.

## Основные псевдоклассы

### :hover — при наведении мыши

```css
.btn {
  background: #007bff;       /* обычное состояние */
  color: white;
}

.btn:hover {                 /* курсор наведён на кнопку */
  background: #0056b3;       /* чуть темнее при наведении */
  cursor: pointer;           /* курсор-рука (иначе остаётся стрелка) */
}
```

### :focus — при фокусе (Tab или клик)

Срабатывает когда элемент получил фокус — пользователь кликнул или перешёл через Tab:

```css
input:focus {                /* поле получило фокус */
  outline: 2px solid #007bff; /* синяя рамка вместо стандартной */
  outline-offset: 2px;       /* небольшой отступ от края элемента */
}

/* ВАЖНО: никогда не убирайте :focus без замены!
   outline: none без альтернативы нарушает доступность для клавиатурных пользователей */
```

### :active — в момент нажатия

Срабатывает пока кнопка мыши удерживается на элементе (момент клика):

```css
.btn:active {                /* кнопка зажата */
  transform: scale(0.97);   /* лёгкое уменьшение — «нажатость» */
  background: #004a99;       /* ещё темнее */
}
```

### :disabled — для заблокированных элементов

```css
button:disabled {            /* кнопка с атрибутом disabled -->
  opacity: 0.5;              /* полупрозрачная */
  cursor: not-allowed;       /* курсор «запрещено» */
}
```

## transition — плавные переходы

Без transition изменения мгновенные. `transition` задаёт анимацию переходов:

```css
.btn {
  background: #007bff;
  transform: scale(1);
  transition: background 0.2s ease,   /* плавная смена фона за 0.2 сек */
              transform 0.1s ease;     /* плавная смена масштаба за 0.1 сек */
}

.btn:hover  { background: #0056b3; }       /* переход анимируется */
.btn:active { transform: scale(0.97); }    /* и это тоже */
```

Синтаксис: `transition: свойство время функция-сглаживания`

| Функция | Поведение |
|---------|-----------|
| `ease` | Быстро → медленно (по умолчанию) |
| `linear` | Постоянная скорость |
| `ease-in` | Начинает медленно |
| `ease-out` | Заканчивает медленно |

## transform — трансформации

```css
.card:hover {
  transform: translateY(-4px);  /* сдвинуть на 4px вверх */
}

.icon:hover {
  transform: scale(1.1);         /* увеличить на 10% */
}

.logo:hover {
  transform: rotate(5deg);       /* повернуть на 5 градусов */
}
```

## 🛠 Задание

Создайте кнопку с тремя состояниями через псевдоклассы: обычное (синий), hover (темнее + подъём), active (ещё темнее + уменьшение). Добавьте плавный transition.

```css:start
.btn {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  /* Добавьте transition */
}

/* Добавьте :hover и :active */
```

```css:solution
.btn {
  background: #007bff;          /* синий фон по умолчанию */
  color: white;                 /* белый текст */
  padding: 10px 20px;           /* отступы */
  border: none;                 /* убрать рамку */
  border-radius: 6px;           /* скруглённые углы */
  font-size: 16px;              /* размер шрифта */
  cursor: pointer;              /* курсор-рука */
  transition: background 0.2s ease,   /* плавная смена фона */
              transform 0.1s ease;     /* плавная смена масштаба */
}

.btn:hover {                    /* наведение мыши */
  background: #0056b3;         /* темнее синий */
  transform: translateY(-2px); /* приподнять на 2px */
}

.btn:active {                   /* момент нажатия */
  background: #004a99;         /* ещё темнее */
  transform: scale(0.97);      /* лёгкое уменьшение — эффект «нажатости» */
}

.btn:focus {                    /* фокус через Tab (доступность) */
  outline: 2px solid #80bdff;  /* синяя рамка */
  outline-offset: 2px;         /* отступ от края кнопки */
}
```
