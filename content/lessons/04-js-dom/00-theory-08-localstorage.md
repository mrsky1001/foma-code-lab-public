---
title: "localStorage — хранение данных в браузере"
highlight: js
type: theory
---

# localStorage — хранение данных в браузере

`localStorage` позволяет сохранять данные прямо в браузере пользователя. Данные остаются после закрытия вкладки и даже после перезапуска браузера.

## Основные методы

```js
// Сохранить строку
localStorage.setItem('key', 'value');       // сохранить значение по ключу

// Получить строку
const val = localStorage.getItem('key');    // → 'value', или null если нет

// Удалить одно значение
localStorage.removeItem('key');

// Удалить всё хранилище
localStorage.clear();
```

## Хранить объекты — через JSON

`localStorage` хранит **только строки**. Чтобы сохранить объект или массив — используйте `JSON.stringify`:

```js
const user = { name: 'Алексей', role: 'admin' };

// Сохранить объект → превратить в строку
localStorage.setItem('user', JSON.stringify(user));
// JSON.stringify({ name: 'Алексей', role: 'admin' })
// → '{"name":"Алексей","role":"admin"}'

// Получить объект → распарсить строку обратно
const saved = localStorage.getItem('user');
const parsed = JSON.parse(saved);
// JSON.parse('{"name":"Алексей","role":"admin"}')
// → { name: 'Алексей', role: 'admin' }

console.log(parsed.name); // → 'Алексей'
```

## Безопасное чтение — try/catch

`JSON.parse` бросает ошибку если данные повреждены. Всегда оборачивайте в `try/catch`:

```js
function loadUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;               // ключ не найден
    return JSON.parse(raw);              // распарсить строку в объект
  } catch (e) {
    console.error('Повреждённые данные:', e);
    localStorage.removeItem('currentUser'); // удалить битые данные
    return null;
  }
}
```

## localStorage vs sessionStorage

| | `localStorage` | `sessionStorage` |
|--|---------------|-----------------|
| Когда очищается | Только вручную | При закрытии вкладки |
| Доступно между вкладками | Да | Нет |
| Когда использовать | «Запомнить меня» | Временные данные сессии |

## Ограничения

- Хранит только **строки**
- Лимит: около **5 МБ** на домен
- Доступ синхронный (не блокирует UI, но на больших данных медленнее)
- Работает только в браузере (не на сервере)

## 🛠 Задание

Сохраните объект пользователя в `localStorage`. Загрузите его обратно через `JSON.parse` с защитой `try/catch`. Если данных нет — выведите «Нет сохранённых данных».

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>localStorage</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="sandbox">
    <h2>Профиль пользователя</h2>
    <div class="profile-card">
      <p>Данные сохраняются в хранилище браузера (localStorage).</p>
      <div id="userDisplay" style="margin-top: 12px; font-weight: 600; color: #0ea5e9;"></div>
    </div>
  </div>
  <script src="js/main.js"></script>
</body>
</html>
```

```css:start
body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 30px; }
.sandbox { max-width: 500px; margin: 0 auto; }
.profile-card { background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
```

```js:start
const user = { name: 'Студент', theme: 'dark' };

// 1. Сохраните user в localStorage под ключом 'user'

// 2. Прочитайте сохранённые данные с try/catch

// 3. Выведите name пользователя или 'Нет данных'
```

```js:solution
const user = { name: 'Студент', theme: 'dark' };

// Сохранить объект: сначала преобразовать в строку через JSON.stringify
localStorage.setItem('user', JSON.stringify(user));

// Безопасное чтение через try/catch
try {
  const raw = localStorage.getItem('user'); // получить строку или null
  if (!raw) {
    console.log('Нет сохранённых данных');  // ключ не найден
  } else {
    const loaded = JSON.parse(raw);          // строку → объект
    console.log('Привет,', loaded.name);     // → 'Привет, Студент'
  }
} catch (e) {
  console.error('Ошибка чтения:', e);
  localStorage.removeItem('user');           // удалить повреждённые данные
}
```
