---
title: "Модальные окна: тег <dialog> и оверлеи"
highlight: html
type: theory
---

# Модальные окна: тег `<dialog>` и оверлеи

**Модальное окно (Modal)** — это всплывающий диалог, который блокирует взаимодействие с основной страницей и требует от пользователя конкретного действия: подтвердить бронирование, ввести логин или прочитать важное предупреждение.

Раньше верстальщикам приходилось собирать модалки из сложных `position: fixed`, оверлеев и вручную перехватывать нажатие клавиши `Escape`. В современном стандарте HTML5 для этого есть специализированный тег **`<dialog>`**.

---

## Преимущества тега `<dialog>`

- **Встроенная доступность:** при открытии фокус клавиатуры автоматически перемещается внутрь диалога;
- **Нативная клавиша `Escape`:** браузер сам закрывает окно при нажатии `Esc` без единой строчки JS;
- **Нативный оверлей (Backdrop):** затемнение фона страницы через специальный псевдоэлемент `::backdrop`.

```html
<!-- Разметка модального окна -->
<dialog id="bookingModal" class="modal">
  <h2>Подтверждение брони</h2>
  <p>Вы бронируете «Хаб Альфа» на 3 часа.</p>
  <button id="closeModalBtn" class="btn btn-outline">Отмена</button>
  <button id="confirmBtn" class="btn btn-primary">Подтвердить</button>
</dialog>
```

---

## Управление через JavaScript: `.showModal()` и `.close()`

У элемента `<dialog>` есть два ключевых встроенных метода:
- **`dialog.showModal()`** — открывает окно как **модальное** (поверх всего контента с затемняющим фоном `::backdrop`);
- **`dialog.close()`** — закрывает окно.

```js
const modal = document.querySelector('#bookingModal');
const openBtn = document.querySelector('#openModalBtn');
const closeBtn = document.querySelector('#closeModalBtn');

// Открыть окно
openBtn.addEventListener('click', () => {
  modal.showModal();
});

// Закрыть окно
closeBtn.addEventListener('click', () => {
  modal.close();
});
```

> [!CAUTION]
> Не путайте `modal.showModal()` и `modal.show()`. Метод `show()` открывает окно как обычный блок без затемнения фона и без блокировки остальной страницы. Всегда используйте **`.showModal()`** для модальных окон!

---

## Стилизация окна и затемнения `::backdrop`

```css
/* Стили самого окна */
.modal {
  border: none;
  border-radius: 12px;
  padding: 24px 32px;
  max-width: 480px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

/* Стили подложки (затемнения фона всей страницы) */
.modal::backdrop {
  background-color: rgba(15, 23, 42, 0.6); /* тёмный полупрозрачный фон */
  backdrop-filter: blur(4px);              /* эффект размытия страницы под окном */
}
```

---

## 🛠 Задание

1. Найдите диалоговое окно `#confirmModal` и кнопки `#openBtn`, `#closeBtn`.
2. По клику на `#openBtn` открывайте окно методом `.showModal()`.
3. По клику на `#closeBtn` закрывайте окно методом `.close()`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Модальные окна</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <button id="openModalBtn">Открыть окно</button>
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-box">
      <h3>Заголовок окна</h3>
      <p>Контент модального окна</p>
      <button id="closeModalBtn">Закрыть</button>
    </div>
  </div>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 40px; text-align: center; }
dialog { border: none; border-radius: 12px; padding: 24px; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
dialog::backdrop { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(2px); }
.btn { background: #0ea5e9; color: #ffffff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
```

```js:start
const modal = document.querySelector('#confirmModal');
const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');

// Навесьте слушатели клика на openBtn и closeBtn
```

```html:solution
<button id="openBtn" class="btn">Забронировать</button>

<dialog id="confirmModal">
  <h3>Подтвердите действие</h3>
  <p>Вы уверены, что хотите продолжить?</p>
  <button id="closeBtn" class="btn">Закрыть</button>
</dialog>
```

```js:solution
const modal = document.querySelector('#confirmModal');
const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');

// Открытие модального окна с затемнением
openBtn.addEventListener('click', () => {
  modal.showModal();
});

// Закрытие окна
closeBtn.addEventListener('click', () => {
  modal.close();
});
```
