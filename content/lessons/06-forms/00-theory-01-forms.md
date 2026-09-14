---
title: "HTML-формы — теги и типы полей"
highlight: html
type: theory
---

# HTML-формы — теги и типы полей

Форма — это набор полей для ввода данных пользователем.

## Основная структура

```html
<form id="loginForm">  <!-- форма с id для доступа из JS -->
  <label for="email">Email</label>  <!-- label связан с input через for="email" -->
  <input type="email" id="email" name="email" placeholder="user@mail.ru">
  <!-- type="email" — браузер проверит формат адреса -->

  <label for="password">Пароль</label>
  <input type="password" id="password" name="password">
  <!-- type="password" — символы скрыты звёздочками -->

  <button type="submit">Войти</button>  <!-- type="submit" — отправляет форму -->
</form>
```

## Типы `<input>`

| type | Что делает |
|------| -----------|
| `text` | Обычная строка |
| `email` | Проверяет формат email |
| `password` | Скрывает символы |
| `number` | Только числа |
| `date` | Выбор даты |
| `checkbox` | Чекбокс |

## Атрибуты полей

```html
<input
  type="text"
  id="name"
  name="name"
  placeholder="Введите имя"  <!-- подсказка внутри пустого поля -->
  required                   <!-- поле обязательно для заполнения -->
  minlength="2"              <!-- минимальная длина — 2 символа -->
>
```

## 🛠 Задание

Создайте форму регистрации с полями: имя (text), email, пароль, кнопка «Зарегистрироваться».

```html:start
<!-- Напишите форму с тремя полями и кнопкой -->
<form id="registerForm">

</form>
```

```html:solution
<form id="registerForm">  <!-- форма регистрации -->
  <label for="name">Имя</label>
  <input type="text" id="name" name="name" placeholder="Ваше имя" required>
  <!-- type="text" + required — обязательное текстовое поле -->

  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="user@mail.ru" required>
  <!-- type="email" — браузер проверит формат (наличие @) -->

  <label for="password">Пароль</label>
  <input type="password" id="password" name="password" placeholder="Минимум 6 символов" required>
  <!-- type="password" — ввод скрыт звёздочками -->

  <button type="submit">Зарегистрироваться</button>  <!-- отправить форму -->
</form>
```
