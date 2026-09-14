---
title: "Ошибки путей и 404 Not Found"
highlight: html
type: theory
---

# Ошибки путей и 404 Not Found

Если стили не применились, шрифт остался стандартным, а картинка превратилась в значок битого файла, откройте вкладку **Console** или **Network** в браузере:

> **✕ GET http://localhost:5173/pages/img/logo.svg 404 (Not Found)**  
> *(или net::ERR_FILE_NOT_FOUND)*

Код **404** означает, что браузер обратился по указанному адресу, но файла там не оказалось.

---

## 🔍 Анатомия путей в веб-разработке

### 1. Текущая папка vs Папка на уровень выше
Представьте структуру проекта:
```text
smart-office/
├── index.html
├── css/
│   └── style.css
├── img/
│   └── logo.svg
└── pages/
    └── catalog.html
```

- Из `index.html` (корень): путь к картинке `img/logo.svg`.
- Из `pages/catalog.html` (вложенная папка): папки `img/` рядом нет! Нужно сначала выйти на уровень вверх: `../img/logo.svg`.
  - `./` — текущая папка (где лежит текущий HTML).
  - `../` — выйти на одну папку выше к родителю.
  - `../../` — выйти на две папки выше.

### 2. Почему нельзя писать абсолютный путь от корня `/img/...`?
Путь `/img/logo.svg` ищет файл в корне веб-сервера. Если вы выложите сайт на GitHub Pages (например, `user.github.io/my-project/`), путь `/img/logo.svg` будет искать картинку в `user.github.io/img/logo.svg` вместо папки проекта и вернёт 404!

### 3. Регистр букв (Case Sensitivity)
Операционная система **Windows** не различает регистр (`logo.png` и `Logo.PNG` — один и тот же файл). Но веб-серверы в интернете работают на **Linux**, где регистр строго учитывается:
- Файл на диске: `Room-1.jpg`
- Запрос в HTML: `room-1.jpg`  
👉 **Результат на сервере: 404 Not Found!** Всегда называйте файлы и папки строчными буквами через дефис.

---

## 🛠 Задание

Исправьте пути подключения логотипа, стилей и скрипта в файле `pages/catalog.html`, расположенном во вложенной папке `pages/`.

```html:start
<!-- Ошибочные пути из вложенной страницы pages/catalog.html: -->
<head>
  <!-- Ошибка: папки css нет внутри pages -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  <script src="js/data.js" defer></script>
</head>
```

```html:solution
<!-- Исправленные относительные пути с выходом на уровень выше ../ -->
<head>
  <link rel="stylesheet" href="../css/style.css">              <!-- выходим в корень и идем в папку css -->
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg"> <!-- выходим в корень и идем в папку img -->
  <script src="../js/data.js" defer></script>                  <!-- подключаем скрипт данных из корня -->
</head>
```
