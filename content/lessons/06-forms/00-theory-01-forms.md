---
title: "HTML-формы"
highlight: html
type: theory
---

# HTML-формы

Форма — это группа полей для ввода данных пользователем: логин, поиск, бронирование.

## Тег `<form>` — контейнер формы

```html
<form id="bookingForm" action="/api/book" method="post">
  <!-- поля формы -->
</form>
```

- `action` — куда отправляются данные (для классических форм без JS)
- `method` — `get` (данные в URL) или `post` (данные в теле запроса)

В наших проектах мы перехватываем отправку через JS (`e.preventDefault()`) и `action`/`method` нам не нужны.

## Поля ввода `<input>`

```html
<!-- Текстовое поле -->
<input type="text" name="name" placeholder="Ваше имя" required>

<!-- Email -->
<input type="email" name="email" placeholder="email@example.com">

<!-- Число -->
<input type="number" name="guests" min="1" max="20" value="1">

<!-- Дата -->
<input type="date" name="date">

<!-- Пароль -->
<input type="password" name="password" minlength="8">

<!-- Чекбокс -->
<input type="checkbox" name="agree" id="agree">
<label for="agree">Согласен с условиями</label>
```

## Многострочное поле `<textarea>`

```html
<textarea name="comment" rows="4" placeholder="Ваш комментарий..."></textarea>
<!-- rows — высота в строках; resize задаётся через CSS -->
```

```css
textarea {
  resize: vertical; /* разрешить изменять только высоту */
  width: 100%;
}
```

## Выпадающий список `<select>`

```html
<select name="roomType">
  <option value="">-- Выберите тип --</option>        <!-- пустой пункт -->
  <option value="meeting">Переговорная</option>
  <option value="focus" selected>Кабинет</option>    <!-- selected — выбран по умолчанию -->
</select>
```

## Группировка полей

```html
<fieldset>
  <legend>Контактные данные</legend>    <!-- заголовок группы -->
  <input type="text"  name="name"  placeholder="Имя">
  <input type="email" name="email" placeholder="Email">
</fieldset>
```

## Кнопка отправки

```html
<button type="submit">Забронировать</button>  <!-- отправить форму -->
<button type="reset">Очистить</button>         <!-- сбросить все поля -->
<button type="button">Просто кнопка</button>  <!-- не отправляет форму -->
```

## 🛠 Задание

Создайте форму бронирования с полями: имя (text), email, дата (date), комментарий (textarea), тип комнаты (select) и кнопкой отправки.

```html:start
<form id="bookingForm">
  <!-- Добавьте поля: name, email, date, textarea, select, button -->
</form>
```

```html:solution
<form id="bookingForm">
  <input type="text" name="name" placeholder="Ваше имя" required>
  <!-- required — поле обязательно для заполнения -->

  <input type="email" name="email" placeholder="Email" required>
  <!-- type="email" — браузер проверяет формат email -->

  <input type="date" name="date" required>
  <!-- type="date" — встроенный датапикер -->

  <select name="roomType">
    <option value="">-- Тип комнаты --</option>
    <option value="meeting">Переговорная</option>
    <option value="focus">Мини-офис</option>
  </select>

  <textarea name="comment" rows="3" placeholder="Комментарий..."></textarea>
  <!-- rows="3" — высота 3 строки -->

  <button type="submit">Забронировать</button>
  <!-- type="submit" — нажатие отправляет форму -->
</form>
```
