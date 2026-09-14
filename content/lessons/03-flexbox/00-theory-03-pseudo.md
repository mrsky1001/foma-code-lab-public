---
title: "Псевдоклассы :hover и transition"
highlight: css
type: theory
---

# Псевдоклассы :hover и transition

Псевдоклассы — это стили, которые применяются при определённом состоянии элемента.

## :hover — при наведении мыши

```css
.btn {                       /* CSS селектор: кнопка в обычном состоянии */
  background: #007bff;       /* синий фон */
  color: #fff;               /* белый текст */
}

.btn:hover {                 /* CSS псевдокласс :hover — при наведении мыши */
  background: #0056b3;       /* темнее при наведении */
}
```

## transition — плавный переход

Без transition стиль меняется мгновенно (резко). С transition — плавно.

```css
.btn {
  background: #007bff;
  transition: background 0.3s ease;   /* анимировать свойство background за 0.3с плавно */
}
```

Можно анимировать несколько свойств:
```css
transition: all 0.2s ease;   /* анимировать все изменяющиеся свойства за 0.2с */
```

## 🛠 Задание

Сделайте кнопку, которая плавно меняет цвет фона и чуть увеличивается при наведении.

```css:start
.btn {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  /* Добавьте transition */
}

.btn:hover {
  /* Измените фон и добавьте transform */
}
```

```css:solution
.btn {                              /* CSS селектор: кнопка */
  padding: 12px 24px;               /* внутренние отступы кнопки */
  background: #007bff;              /* синий фон */
  color: white;                     /* белый текст */
  border: none;                     /* убрать рамку */
  border-radius: 6px;               /* скруглить углы */
  font-size: 14px;                  /* размер шрифта */
  font-weight: 600;                 /* полужирный */
  cursor: pointer;                  /* курсор-рука при наведении */
  transition: all 0.2s ease;        /* плавная анимация всех изменений за 0.2с */
}

.btn:hover {                        /* CSS псевдокласс :hover — при наведении */
  background: #0056b3;              /* тёмно-синий при наведении */
  transform: translateY(-2px);      /* CSS функция: сдвиг вверх на 2px (эффект подъёма) */
}
```
