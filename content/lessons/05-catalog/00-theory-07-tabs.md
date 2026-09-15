---
title: "Интерактивные вкладки (Tabs): переключение разделов"
highlight: js
type: theory
---

# Интерактивные вкладки (Tabs): переключение разделов

На странице детальной информации о комнате скапливается много разной информации: фотографии, техническое оборудование (проектор, флипчарт, Wi-Fi), правила бронирования и отзывы арендаторов.

Если вывести всё единым длинным списком, страница превратится в бесконечную «простыню». Для структурирования контента применяется популярный UI-паттерн: **вкладки (Tabs)**.

---

## 1. HTML-структура вкладок

Паттерн состоит из двух частей:
1. **Кнопки вкладок** с `data-tab="имя_вкладки"`;
2. **Панели с контентом** с `id="имя_вкладки"` и общим классом `.tab-pane`:

```html
<!-- Навигация по вкладкам -->
<div class="tabs-nav">
  <button class="tab-btn active" data-tab="overview">Обзор</button>
  <button class="tab-btn" data-tab="equipment">Оборудование</button>
  <button class="tab-btn" data-tab="rules">Правила</button>
</div>

<!-- Блоки контента -->
<div class="tabs-content">
  <div class="tab-pane active" id="overview">
    <p>Просторная комната для переговоров и совещаний до 10 человек.</p>
  </div>
  <div class="tab-pane" id="equipment">
    <p>Проектор 4K, маркерная доска, скоростной Wi-Fi 500 Мбит/с.</p>
  </div>
  <div class="tab-pane" id="rules">
    <p>Бронь от 1 часа. Отмена без штрафа за 24 часа.</p>
  </div>
</div>
```

---

## 2. CSS: управление видимостью

Главный принцип: скрываем все панели, кроме той, на которой висит класс `.active`:

```css
/* Все панели по умолчанию скрыты */
.tab-pane {
  display: none;
}

/* Видна только активная панель */
.tab-pane.active {
  display: block;
  animation: fadeIn 0.2s ease; /* плавное появление */
}

/* Стили активной кнопки переключения */
.tab-btn.active {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
}
```

---

## 3. JavaScript: логика переключения

При клике на любую кнопку вкладки мы:
1. Снимаем класс `.active` со всех кнопок и панелей;
2. Добавляем `.active` нажатой кнопке;
3. Находим панель по id из `btn.dataset.tab` и добавляем ей `.active`.

```js
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.tab; // читаем data-tab (например, 'equipment')

    // 1. Снимаем активный класс у всех кнопок и панелей
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    // 2. Активируем нужную кнопку и панель
    btn.classList.add('active');
    document.querySelector(`#${targetId}`)?.classList.add('active');
  });
});
```

---

## 🛠 Задание

Допишите функцию `initTabs()`:
1. Переберите кнопки `.tab-btn` и повесьте на каждую слушатель `'click'`.
2. При клике снимайте класс `'active'` со всех кнопок и всех панелей `.tab-pane`.
3. Добавляйте `'active'` нажатой кнопке и панели с `id === btn.dataset.tab`.

```js:start
const btns = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-pane');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. Снимите active со всех кнопок и панелей
    // 2. Активируйте btn
    // 3. Активируйте целевую панель
  });
});
```

```js:solution
const btns = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-pane');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.tab;

    // Снимаем активность
    btns.forEach(b => b.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    // Назначаем активность
    btn.classList.add('active');
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.add('active');
    }
  });
});
```
