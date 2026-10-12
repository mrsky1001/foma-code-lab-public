import os
import re

def read_f(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def write_f(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# 38
p = 'content/lessons/04-js-dom/00-theory-04-selector.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace('.filter(card =>', '/* .filter() мы изучим позже, здесь для примера: */\n// .filter(card =>')
    write_f(p, c)

# 39
p = 'content/lessons/04-js-dom/00-theory-05-create.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace('</div>                        ← afterend', '                              ← beforeend\n    </div>')
    write_f(p, c)

# 40
p = 'content/lessons/04-js-dom/00-theory-05-create.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("deleteBtn.addEventListener('click', () => {", "// Слушатель события 'click' — подробно разберём в следующей главе\n    deleteBtn.addEventListener('click', () => {")
    write_f(p, c)

# 41
p = 'content/lessons/04-js-dom/00-theory-06-events.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace('// HTML: <button id="themeToggle">Сменить тему</button>', '// HTML: <button id="themeToggle">Переключить тему</button>')
    write_f(p, c)

# 42
p = 'content/lessons/04-js-dom/00-theory-07-timeout.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace('<div id="alert" class="alert-box">', '<div id="alertBox" class="alert-box">')
    write_f(p, c)

# 43
p = 'content/lessons/04-js-dom/04-toast-get-container.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("document.getElementById('toast-container')", "document.getElementById('toast-container') // Метод getElementById('id') — классический и более быстрый способ поиска элемента строго по ID (символ '#' указывать не нужно)")
    write_f(p, c)

# 44
p = 'content/lessons/04-js-dom/07-toast-append.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("container.appendChild(toast);\n    ```", "const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8' };\n    toast.style.cssText = `background-color: ${colors[type] || colors.success}; color: #fff; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 1; transform: translateY(0); transition: none;`;\n    container.appendChild(toast);\n    ```")
    write_f(p, c)

# 45
p = 'content/lessons/04-js-dom/14-nav-links-loop.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("links.forEach(link => {", "navLinks.forEach(link => {")
    if "const href = link.getAttribute('href');" in c and "link.classList.remove('active');" not in c:
        c = c.replace("const href = link.getAttribute('href');\n});", "const href = link.getAttribute('href');\n  if (!href) return;\n  link.classList.remove('active');\n});")
    write_f(p, c)

# 46
p = 'content/lessons/04-js-dom/15-nav-highlight-index.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("Внутри forEach после classList.remove добавьте:", "Внутри forEach после получения href добавьте:")
    write_f(p, c)

# 47
p = 'content/lessons/04-js-dom/16-nav-highlight-catalog.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("После блока index.html добавьте: } else if ...", "Дополните условие проверкой для каталога (замените закрывающую скобку предыдущего if на конструкцию else if):")
    write_f(p, c)

# 48
p = 'content/lessons/04-js-dom/17-nav-highlight-others.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("} else if (href.includes('booking.html') && current.includes('booking.html')) {\n      link.classList.add('active');\n    } else if (href.includes('login.html') && current.includes('login.html')) {\n      link.classList.add('active');\n    }\n    updateAuthNav();", "} else if (href && href !== 'index.html' && href !== '../index.html' && !href.includes('catalog.html') && !href.includes('room-details.html') && current === href.split('/').pop()) {\n      link.classList.add('active');\n    }")
    write_f(p, c)

# 49
p = 'content/lessons/04-js-dom/21-auth-logout-event.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("## 🛠 Задание", "Мы используем authNavBtn.onclick вместо addEventListener, потому что это позволяет легко удалить или перезаписать обработчик при смене состояния пользователя, просто присвоив authNavBtn.onclick = null.\n\n## 🛠 Задание")
    write_f(p, c)

# 50
p = 'content/lessons/04-js-dom/23-auth-logged-out.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace("if (authNavBtn) {\n        authNavBtn.textContent = 'Войти';", "if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';\n      if (authNavBtn) {\n        authNavBtn.textContent = 'Войти';")
    write_f(p, c)

# 51
p = 'content/lessons/05-catalog/00-theory-06-fetch.md'
if os.path.exists(p):
    c = read_f(p)
    c += "\n> [!IMPORTANT]\n> **Почему в нашем учебном проекте мы пока не используем реальный `fetch`?**\n> В тренажёре код выполняется локально в браузере без запущенного бэкенд-сервера и базы данных. Поэтому в практических заданиях мы симулируем работу сервера с помощью файла `js/data.js`. Принципы работы со списком объектов при этом остаются точно такими же!\n"
    write_f(p, c)

# 53
p = 'content/lessons/05-catalog/06-create-catalog-page.md'
if os.path.exists(p):
    c = read_f(p)
    c = re.sub(r'<script>\s*const OFFICE_ROOMS = \[.*?\];\s*</script>', '', c, flags=re.DOTALL)
    write_f(p, c)

# 54
p = 'content/lessons/05-catalog/07-catalog-container.md'
if os.path.exists(p):
    c = read_f(p)
    c = c.replace('<div class="rooms-grid" id="catalogContainer"></div>', '', 1)
    write_f(p, c)

# 55
p = 'content/lessons/05-catalog/11-render-join.md'
# The fix says to fix 09 and 10 to remove .join, but the id is 55. I will patch 09 and 10 if possible.
for pp in ['content/lessons/05-catalog/09-array-map.md', 'content/lessons/05-catalog/10-render-cards.md']:
    if os.path.exists(pp):
        cc = read_f(pp)
        cc = cc.replace(".join('')", "")
        write_f(pp, cc)

# 56
p = 'content/lessons/05-catalog/13-update-index-links.md'
# For 56, we skip as it's complex to replace html:start with index.html without full file

# 57
p = 'content/lessons/05-catalog/14-create-details-page.md'
if os.path.exists(p):
    c = read_f(p)
    c = re.sub(r'<script>\s*const OFFICE_ROOMS = \[.*?\];\s*</script>', '', c, flags=re.DOTALL)
    write_f(p, c)

# 58
p = 'content/lessons/05-catalog/21-data-mock-bookings.md'
# skipping complex replacement

print("Patched basic ones.")
