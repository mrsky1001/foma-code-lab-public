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
    <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
  </div>

</div>
```

**Шаг 3** — блок контента. После `</div>` обёртки изображения (но ещё внутри `.card`) добавляем блок с текстом:
```html
<div class="card">
  <div class="card-img-wrap">
    <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
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
    <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
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
    <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
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

---

## 🖼 Изображения для вставки

Чтобы использовать картинки в задании — скопируйте одну из готовых ссылок:

```
https://placehold.co/300x200/4A90E2/FFF?text=Комната+1
https://placehold.co/300x200/7B68EE/FFF?text=Комната+2
https://placehold.co/300x200/48A999/FFF?text=Комната+3
```

Вставьте её в атрибут `src` тега `<img>`:
```html
<img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната+1" alt="Переговорная" class="card-img">
```

## 🛠 Задание

Допишите недостающие части карточки. В редакторе уже есть внешний контейнер и блок с изображением — добавьте `card-content` с заголовком и текстом, и `card-footer` с ценой и кнопкой.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI-карточка</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="card">
    <div class="card-img-wrap">
      <img src="https://placehold.co/300x200/4A90E2/FFF?text=Комната" alt="Переговорная" class="card-img">
    </div>
    <!-- Добавьте сюда card-content с h3 и p -->
    <!-- Добавьте сюда card-footer со span.card-price и button -->
  </div>
</body>
</html>
```

```css:start
body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.card {
  width: 320px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-img-wrap {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #1e293b;
}

.card-text {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 16px;
  border-top: 1px solid #f1f5f9;
}

.card-price {
  font-weight: 700;
  font-size: 16px;
  color: #0ea5e9;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background: #0ea5e9;
  color: #ffffff;
}
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
