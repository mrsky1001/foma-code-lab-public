---
title: "Паттерн UI-карточки"
highlight: html
type: theory
---

# Паттерн UI-карточки

Карточка — один из самых распространённых UI-паттернов в веб-дизайне. Она встречается везде: товары в магазине, статьи в блоге, переговорные комнаты в нашем проекте.

## Структура карточки

```
┌─────────────────────┐
│   Изображение       │  ← .card-img-wrap
├─────────────────────┤
│   Заголовок         │  ← .card-title    ┐
│   Описание          │  ← .card-text     │ .card-content
│   Список            │  ← .card-list     ┘
├─────────────────────┤
│   Цена    [Кнопка]  │  ← .card-footer
└─────────────────────┘
```

## Как вложить теги пошагово

Главная трудность карточки — **правильная вложенность блоков**. Разбираем по шагам:

**Шаг 1** — внешний контейнер карточки. Он будет Flex-контейнером с `flex-direction: column`:
```html
<div class="card">

</div>
```

**Шаг 2** — блок изображения. Внутри `<div class="card">` добавляем обёртку для фото:
```html
<div class="card">
  <div class="card-img-wrap">
    <img src="room.jpg" alt="Переговорная" class="card-img">
  </div>

</div>
```

**Шаг 3** — блок контента. После `</div>` обёртки изображения (но ещё внутри `.card`) добавляем блок с текстом:
```html
<div class="card">
  <div class="card-img-wrap">
    <img src="room.jpg" alt="Переговорная" class="card-img">
  </div>

  <div class="card-content">
    <h3 class="card-title">Переговорная «Альфа»</h3>
    <p class="card-text">Уютная комната для встреч до 8 человек.</p>
  </div>

</div>
```

**Шаг 4** — блок подвала. После `</div>` контента (внутри `.card`) добавляем footer с ценой и кнопкой:
```html
<div class="card">
  <div class="card-img-wrap">
    <img src="room.jpg" alt="Переговорная" class="card-img">
  </div>

  <div class="card-content">
    <h3 class="card-title">Переговорная «Альфа»</h3>
    <p class="card-text">Уютная комната для встреч до 8 человек.</p>
  </div>

  <div class="card-footer">
    <span class="card-price">800 ₽/час</span>
    <button class="btn btn-primary">Забронировать</button>
  </div>

</div>
```

**Итоговая структура** — все теги закрыты, порядок соблюдён:

```html
<div class="card">                         <!-- контейнер карточки -->
  <div class="card-img-wrap">              <!-- обёртка изображения -->
    <img src="room.jpg" alt="Переговорная" class="card-img">
  </div>
  <div class="card-content">              <!-- блок с текстом -->
    <h3 class="card-title">Переговорная «Альфа»</h3>
    <p class="card-text">Уютная комната для встреч до 8 человек.</p>
  </div>
  <div class="card-footer">              <!-- подвал: цена + кнопка -->
    <span class="card-price">800 ₽/час</span>
    <button class="btn btn-primary">Забронировать</button>
  </div>
</div>
```

## Ключевые CSS-приёмы

```css
.card {                           /* CSS селектор: контейнер карточки */
  display: flex;                  /* включить Flexbox */
  flex-direction: column;         /* дочерние блоки — в колонку (сверху вниз) */
}

.card-content {                   /* CSS селектор: блок с текстом карточки */
  flex: 1;                        /* занять всё оставшееся вертикальное пространство */
}

.card-footer {                    /* CSS селектор: подвал карточки (цена + кнопка) */
  margin-top: auto;               /* прижать к низу карточки (трюк Flexbox) */
}
```

## Правило закрытия тегов

Запомните: **закрывай текущий тег прежде чем открыть следующий на том же уровне**.

```html
<!-- ПРАВИЛЬНО: каждый div полностью закрыт до следующего -->
<div class="card">
  <div class="card-img-wrap">...</div>   ← закрыт
  <div class="card-content">...</div>   ← закрыт
  <div class="card-footer">...</div>    ← закрыт
</div>

<!-- НЕПРАВИЛЬНО: теги перекрываются -->
<div class="card-img-wrap">
  <div class="card-content">
</div>  ← непонятно что закрывается!
```

## 🛠 Задание

Допишите недостающие части карточки. В редакторе уже есть внешний контейнер и блок с изображением — добавьте `card-content` с заголовком и текстом, и `card-footer` с ценой и кнопкой.

```html:start
<div class="card">
  <div class="card-img-wrap">
    <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
  </div>
  <!-- Добавьте сюда card-content с h3 и p -->
  <!-- Добавьте сюда card-footer со span.card-price и button -->
</div>
```

```html:solution
<div class="card">                              <!-- HTML структура: контейнер карточки -->
  <div class="card-img-wrap">                   <!-- HTML структура: обёртка изображения -->
    <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
  </div>
  <div class="card-content">                   <!-- HTML структура: блок с контентом -->
    <h3 class="card-title">Переговорная «Альфа»</h3>   <!-- HTML контент: заголовок -->
    <p class="card-text">Уютная комната для встреч до 8 человек.</p>  <!-- HTML контент: описание -->
  </div>
  <div class="card-footer">                    <!-- HTML структура: подвал карточки -->
    <span class="card-price">800 ₽/час</span>          <!-- HTML контент: цена -->
    <button class="btn btn-primary">Забронировать</button>  <!-- HTML форма: кнопка -->
  </div>
</div>
```
