---
title: "SecurityError и безопасный localStorage"
highlight: js
type: theory
---

# SecurityError: доступ к localStorage заблокирован

Одна из частых ошибок в веб-разработке при работе с хранилищем браузера:

> **✕ Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.**

Она означает, что скрипт попытался обратиться к `window.localStorage`, но браузер запретил операцию из соображений безопасности.

---

## 🔍 Почему возникает эта ошибка?

1. **Изоляция в `<iframe>` без прав:**  
   Если страница запущена внутри фрейма `<iframe sandbox="...">` без флага `allow-same-origin`, браузер присваивает ей уникальный источник (`origin: null`) и полностью блокирует доступ к постоянному хранилищу `localStorage`.
2. **Режим инкогнито и приватность:**  
   В некоторых браузерах (Safari, Chrome с блокировкой сторонних куки) доступ к `localStorage` внутри фреймов или сторонних скриптов вызывает исключение `SecurityError`.
3. **Открытие файла напрямую (`file:///`):**  
   Если дважды кликнуть на `index.html` и открыть его без веб-сервера, в ряде браузеров обращение к `localStorage` также вызовет ошибку безопасности.

---

## 🛠 Способы решения

### 1. На уровне HTML-тега iframe (если вы управляете фреймом)
Добавьте флаг `allow-same-origin` в атрибут `sandbox`:
```html
<!-- Разрешаем выполнение скриптов, модальные окна и сохранение источника -->
<iframe src="preview.html" sandbox="allow-scripts allow-modals allow-same-origin"></iframe>
```

### 2. На уровне JS: безопасный доступ через `try...catch`
Никогда не читайте `localStorage` напрямую без защиты, если код может работать в изолированных окружениях. Всегда оборачивайте в блок перехвата ошибок:

```js
// Функция безопасного чтения из localStorage с резервным значением
function safeGetStorage(key, fallbackValue = null) {
  try {
    // Пытаемся прочитать значение из постоянного хранилища
    const value = localStorage.getItem(key);
    return value !== null ? value : fallbackValue;
  } catch (error) {
    // Если доступ запрещён политикой безопасности (SecurityError) — возвращаем fallback
    console.warn('Доступ к localStorage заблокирован браузером:', error.message);
    return fallbackValue;
  }
}
```

### 3. Резервное хранилище в памяти (Memory Fallback)
Если `localStorage` недоступен, можно создать объект-заглушку в оперативной памяти с теми же методами (`getItem`, `setItem`, `removeItem`):

```js
// Проверяем доступность localStorage
function isStorageAvailable() {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true; // хранилище доступно
  } catch (e) {
    return false; // сработал SecurityError или квота исчерпана
  }
}
```

---

## 🛠 Задание

Напишите функцию `safeReadUser(key)`, которая пытается получить данные пользователя из `localStorage`. Если возникает ошибка `SecurityError` или ключ отсутствует — функция должна безопасно вернуть строку `'Гость'`.

```js:start
// Напишите безопасную функцию чтения пользователя
function safeReadUser(key) {
  // Добавьте блок try...catch вокруг localStorage.getItem(key)
}
```

```js:solution
// Напишите безопасную функцию чтения пользователя
function safeReadUser(key) {
  try {
    // Пытаемся безопасно прочитать значение из localStorage
    const user = localStorage.getItem(key);
    // Возвращаем найденного пользователя или 'Гость' если ключ пуст
    return user ? user : 'Гость';
  } catch (error) {
    // В случае SecurityError возвращаем резервное значение без падения скрипта
    console.warn('localStorage недоступен, режим гостя:', error.message);
    return 'Гость';
  }
}
```
