import re

specs = [
    {
        'issue': 22,
        'file': 'content/lessons/03-flexbox/00-theory-03-pseudo.md',
        'target': """.btn:active {                   /* момент нажатия */
  background: #004a99;         /* ещё темнее */
  transform: scale(0.97);      /* лёгкое уменьшение — эффект «нажатости» */
}

.btn:focus {                    /* фокус через Tab (доступность) */
  outline: 2px solid #80bdff;  /* синяя рамка */
  outline-offset: 2px;         /* отступ от края кнопки */
}"""
    },
    {
        'issue': 23,
        'file': 'content/lessons/03-flexbox/00-theory-04-card.md',
        'target': """.card-img-wrap {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}"""
    },
    {
        'issue': 24,
        'file': 'content/lessons/03-flexbox/01-popular-section-html.md',
        'target': """.btn { display: inline-block; padding: 8px 16px; font-size: 14px; font-weight: 600; border-radius: 4px; border: 1px solid transparent; cursor: pointer; text-decoration: none; text-align: center; }
.btn-primary { background-color: #007bff; color: #ffffff; }
.btn-primary:hover { background-color: #0056b3; }
.btn-outline { background-color: transparent; border-color: #007bff; color: #007bff; }
.btn-outline:hover { background-color: #007bff; color: #ffffff; }
.btn-icon { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: 4px; border: 1px solid #007bff; background-color: transparent; color: #007bff; cursor: pointer; text-decoration: none; }
.btn-icon:hover { background-color: #eaf2ff; }
.rooms-grid { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; margin-bottom: 30px; }
.room-card { width: 373px; border: 1px solid #dddddd; border-radius: 6px; overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column; }
.card-img-wrap { width: 100%; height: 200px; overflow: hidden; background-color: #f0f4f8; }
.card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-content { padding: 15px; display: flex; flex-direction: column; flex: 1; }
.card-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.card-equipment { list-style: none; margin-bottom: 15px; flex: 1; }
.card-equipment li { font-size: 13px; color: #555555; margin-bottom: 4px; }
.card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eeeeee; padding-top: 10px; gap: 10px; }
.card-price { font-size: 18px; font-weight: 700; color: #222222; }
.card-price span { font-size: 13px; font-weight: 400; color: #666666; }
.card-btns { display: flex; align-items: center; gap: 8px; }
.center-action { text-align: center; margin-top: 20px; }"""
    },
    {
        'issue': 25,
        'file': 'content/lessons/03-flexbox/07-grid-container-html.md',
        'target': """.rooms-grid { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; margin-bottom: 30px; }
.room-card { width: 373px; border: 1px solid #dddddd; border-radius: 6px; overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column; }
.card-img-wrap { width: 100%; height: 200px; overflow: hidden; background-color: #f0f4f8; }
.card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-content { padding: 15px; display: flex; flex-direction: column; flex: 1; }
.card-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.card-equipment { list-style: none; margin-bottom: 15px; flex: 1; }
.card-equipment li { font-size: 13px; color: #555555; margin-bottom: 4px; }
.card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eeeeee; padding-top: 10px; gap: 10px; }
.card-price { font-size: 18px; font-weight: 700; color: #222222; }
.card-price span { font-size: 13px; font-weight: 400; color: #666666; }
.card-btns { display: flex; align-items: center; gap: 8px; }
.center-action { text-align: center; margin-top: 20px; }"""
    },
    {
        'issue': 26,
        'file': 'content/lessons/03-flexbox/08-room-card-html.md',
        'target': """# Скелет карточки комнаты

Структура карточки состоит из двух частей:

```html:start"""
    },
    {
        'issue': 27,
        'file': 'content/lessons/03-flexbox/10-card-image-html.md',
        'target': """Атрибут `onerror` — JS-обработчик: если картинка не загрузилась, подставляем заглушку `no-image.svg`."""
    },
    {
        'issue': 28,
        'file': 'content/lessons/03-flexbox/11-card-image-css.md',
        'target': """          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
          </div>"""
    },
    {
        'issue': 29,
        'file': 'content/lessons/03-flexbox/12-card-content-html.md',
        'target': """- Заголовок — это ссылка на детальную страницу (без подчёркивания через style)"""
    },
    {
        'issue': 30,
        'file': 'content/lessons/03-flexbox/15-card-footer-html.md',
        'target': """  └── div.card-btns   (кнопки — добавим следующим шагом)"""
    },
    {
        'issue': 31,
        'file': 'content/lessons/03-flexbox/16-card-footer-css.md',
        'target': """                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>"""
    },
    {
        'issue': 32,
        'file': 'content/lessons/03-flexbox/18-card-btns-layout.md',
        'target': """                <div class="card-btns">
                  <a href="pages/booking.html" class="btn-icon" title="Подробнее">&#8599;</a>
                  <a href="pages/booking.html" class="btn btn-primary">Забронировать</a>
                </div>"""
    },
    {
        'issue': 33,
        'file': 'content/lessons/03-flexbox/19-duplicate-cards.md',
        'target': """**Карточка 2: Конференц-зал Alpha**
```html
<!-- Карточка 2: Конференц-зал Alpha -->
<div class="room-card">
  <div class="card-img-wrap">
    <!-- Ссылка на страницу комнаты alpha-2 -->
    <a href="pages/room-details.html?id=alpha-2">
      <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
    </a>
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="pages/room-details.html?id=alpha-2" style="text-decoration: none; color: inherit;">Конференц-зал Alpha</a></h3>
    <!-- Список оснащения зала -->
    <ul class="card-equipment">
      <li>Проектор 4K</li>
      <li>Спикерфон</li>
      <li>Флипчарт</li>
    </ul>
    <div class="card-footer">
      <div class="card-price">1200 ₽ <span>/ час</span></div>
      <div class="card-btns">
        <a href="pages/room-details.html?id=alpha-2" class="btn-icon" ...>SVG</a>
        <a href="pages/booking.html?room=alpha-2" class="btn btn-primary">Забронировать</a>
      </div>
    </div>
  </div>
</div>
```

**Карточка 3: Опенспейс Hub** (аналогично, цена 250 ₽)"""
    },
    {
        'issue': 34,
        'file': 'content/lessons/03-flexbox/20-rooms-grid-css.md',
        'target': """        </div>
        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>"""
    }
]

all_ok = True
for s in specs:
    with open(s['file'], encoding='utf-8') as f:
        c = f.read()
    c_norm = c.replace('\r\n', '\n')
    t_norm = s['target'].replace('\r\n', '\n')
    count = c_norm.count(t_norm)
    print(f"Issue {s['issue']}: occurrences = {count} in {s['file']}")
    if count != 1:
        all_ok = False

if all_ok:
    print("\nALL TARGETS FOUND EXACTLY ONCE! Perfect uniqueness!")
else:
    print("\nSome targets failed uniqueness check!")
