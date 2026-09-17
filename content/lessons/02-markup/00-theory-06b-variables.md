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

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS-переменные</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h1>СмартОфис: рабочие пространства</h1>
    <p>Аренда комфортных рабочих мест и переговорных комнат.</p>
    <button class="btn">Забронировать</button>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
:root {
  /* Объявите --brand-color и --brand-dark */
}

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 32px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

h1 {
  /* Используйте var(--brand-color) */
  margin-bottom: 12px;
}

p {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
}

.btn {
  /* Используйте var(--brand-color) */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
```

```css:solution
:root {
  --brand-color: #0ea5e9;
  --brand-dark: #0284c7;
}

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  padding: 32px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

h1 {
  color: var(--brand-color);
  margin-bottom: 12px;
}

p {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
}

.btn {
  background: var(--brand-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
```
