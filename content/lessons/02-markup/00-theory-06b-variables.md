---
title: "CSS-переменные (Custom Properties)"
highlight: css
type: theory
---

# CSS-переменные (Пользовательские свойства)

В больших проектах одни и те же фирменные цвета, шрифты и радиусы скругления используются сотни раз. Если заказчик попросит сменить фирменный синий цвет `#2563eb` на фиолетовый `#7c3aed`, разработчику без переменных придётся вручную искать и заменять шестнадцатеричный код по всему файлу стилей.

**CSS-переменные (Custom Properties)** позволяют объявить значение один раз и использовать его по всему сайту.

---

## Объявление переменных в `:root`

Псевдокласс `:root` соответствует самому главному элементу страницы (`<html>`). Переменные, объявленные в `:root`, доступны **абсолютно всем элементам** сайта (глобальная область видимости):

```css
:root {
  /* Переменные всегда начинаются с двух дефисов -- */
  --color-primary: #2563eb;      /* основной акцентный цвет */
  --color-primary-hover: #1d4ed8;/* цвет при наведении */
  --color-text: #1e293b;         /* цвет основного текста */
  --color-bg: #f8fafc;           /* светлый фоновый цвет */
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  
  --transition-fast: 0.2s ease;
}
```

---

## Использование через функцию `var()`

Чтобы применить значение переменной к свойству элемента, используется функция `var(--имя-переменной)`:

```css
.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.card {
  background-color: var(--color-bg);
  color: var(--color-text);
  border-radius: var(--radius-lg);
}
```

> [!TIP]
> **Резервное значение (Fallback):**  
> Вторым аргументом в `var()` можно передать запасное значение на случай, если переменная не была объявлена:  
> `color: var(--custom-color, #333333);`

---

## Мгновенное переключение тем (Dark Mode)

Главное преимущество CSS-переменных — возможность мгновенно перекрасить весь интерфейс в тёмную тему, просто переопределив значения переменных внутри класса темы:

```css
/* Светлая тема по умолчанию */
:root {
  --color-bg: #ffffff;
  --color-text: #0f172a;
}

/* Тёмная тема — при добавлении класса .dark-theme на <body> */
body.dark-theme {
  --color-bg: #0f172a;
  --color-text: #f8fafc;
}
```

Все кнопки, карточки и блоки, использующие `var(--color-bg)` и `var(--color-text)`, автоматически сменят цвет без единой дополнительной строчки кода!

---

## 🛠 Задание

1. В блоке `:root` объявите две переменные:
   - `--brand-color` со значением `#0ea5e9`;
   - `--brand-radius` со значением `6px`.
2. Примените их к классу `.badge`: установите `background-color` через `var(--brand-color)` и `border-radius` через `var(--brand-radius)`.

```css:start
:root {
  /* Объявите переменные --brand-color и --brand-radius */
}

.badge {
  color: #ffffff;
  padding: 4px 8px;
  /* Примените переменные */
}
```

```css:solution
:root {
  --brand-color: #0ea5e9;
  --brand-radius: 6px;
}

.badge {
  color: #ffffff;
  padding: 4px 8px;
  background-color: var(--brand-color);
  border-radius: var(--brand-radius);
}
```
