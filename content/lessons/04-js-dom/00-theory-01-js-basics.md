---
title: "Основы JavaScript: переменные и типы"
highlight: js
type: theory
---

# Основы JavaScript: переменные и типы данных

Если HTML задаёт скелет страницы, а CSS — её внешний вид, то **JavaScript** отвечает за **поведение, логику и интерактивность**.

С помощью JavaScript вы можете:
- Реагировать на клики, ввод текста и скролл пользователя;
- Динамически изменять содержимое и стили страницы без перезагрузки;
- Загружать информацию и отправлять данные на сервер;
- Сохранять пользовательские настройки в браузере.

## Подключение JavaScript к HTML-странице

Скрипты подключаются с помощью тега `<script>`:

```html
<!-- Внутри тега <head> с атрибутом defer -->
<script src="js/main.js" defer></script>
```

> [!TIP]
> **Атрибут `defer`** указывает браузеру загружать файл скрипта в фоновом режиме параллельно с разметкой, а выполнять его строго **после того, как всё дерево HTML будет полностью прочитано и построено**. Это гарантирует, что элементы, которые мы ищем через скрипт, уже существуют на странице.

---

## Переменные: `const` и `let`

Переменная — это именованный контейнер для хранения данных. В современном JavaScript используются два ключевых слова:

```js
// const (константа) — значение нельзя переприсвоить позже
const siteName = 'СмартОфис';
// siteName = 'ДругойОфис'; // ❌ Ошибка TypeError: Assignment to constant variable

// let — значение переменной можно изменить в процессе работы программы
let currentFloor = 1;
currentFloor = 2; // ✅ Разрешено
```

> [!IMPORTANT]
> **Золотое правило чистого кода:** Всегда используйте `const` по умолчанию. Переключайтесь на `let` только тогда, когда значение переменной действительно должно меняться в процессе выполнения программы (например, счётчик или флаг). Старое ключевое слово `var` использовать не рекомендуется из-за непредсказуемой области видимости.

---

## Базовые типы данных

В JavaScript данные делятся на простые (примитивные) типы и объекты:

```js
// 1. Строка (String) — текст в одинарных, двойных или обратных кавычках
const roomName = 'Переговорная «Альфа»';
const category = "Премиум";

// 2. Число (Number) — целые числа и числа с плавающей точкой
const capacity = 10;      // вместимость (человек)
const pricePerHour = 850.5; // цена за час

// 3. Булево значение (Boolean) — логическое ДА или НЕТ
const isAvailable = true;  // свободна для брони
const hasProjector = false; // нет проектора

// 4. null — явное, намеренное отсутствие значения («пусто»)
const activeBooking = null; // бронирований пока нет

// 5. undefined — значение не присвоено (переменная объявлена, но пуста)
let selectedDate; // значение: undefined
```

---

## Шаблонные строки (Template Literals)

Вместо склеивания строк через оператор `+`, в современном JS применяются **шаблонные строки** в косых (обратных) кавычках `` ` ``:

```js
const clientName = 'Алексей';
const hours = 3;

// Старый способ (конкатенация через +):
const oldMsg = 'Клиент ' + clientName + ' забронировал зал на ' + hours + ' ч.';

// Современный способ (интерполяция ${выражение}):
const newMsg = `Клиент ${clientName} забронировал зал на ${hours} ч. Итого: ${hours * 850} ₽`;
```

---

## Консоль разработчика: инструмент отладки

Для проверки значений и поиска ошибок используйте инструменты консоли (`F12` ➔ вкладка *Console* в браузере):

```js
console.log('Информационное сообщение:', roomName);
console.warn('Предупреждение: время брони подходит к концу!');
console.error('Ошибка: не удалось связаться с сервером!');
```

---

## 🛠 Задание

Объявите три переменные:
1. `officeName` со значением `'СмартОфис'` (строка);
2. `roomsCount` со значением `8` (число);
3. `isOpen` со значением `true` (булево).

Сформируйте с помощью шаблонной строки переменную `statusText`:  
`Добро пожаловать в СмартОфис! Доступно комнат: 8.`  
Выведите `statusText` в консоль через `console.log`.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Основы JavaScript</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Основы JavaScript: переменные</h2>
    <div class="info-card">
      <div class="info-row"><span>Сервис:</span> <strong id="nameEl">—</strong></div>
      <div class="info-row"><span>Комнат:</span> <strong id="countEl">—</strong></div>
      <div class="info-row"><span>Доступен:</span> <strong id="availEl">—</strong></div>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 24px; }
.sandbox { max-width: 500px; margin: 0 auto; }
h2 { margin-bottom: 16px; font-size: 20px; }
.info-card { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
.info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
.info-row:last-child { border-bottom: none; }
```

```js:start
// 1. Объявите переменные officeName, roomsCount, isOpen

// 2. Сформируйте шаблонную строку statusText

// 3. Выведите результат в консоль
```

```js:solution
// 1. Объявляем переменные
const officeName = 'СмартОфис';
const roomsCount = 8;
const isOpen = true;

// 2. Формируем строку с интерполяцией
const statusText = `Добро пожаловать в ${officeName}! Доступно комнат: ${roomsCount}.`;

// 3. Выводим результат в консоль разработчика
console.log(statusText);
console.log('Открыт ли офис:', isOpen);
```
