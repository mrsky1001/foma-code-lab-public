import os
import re

issues = [
    # Lesson 04
    ("04-js-dom/00-theory-01-js-basics.md", "if/else missing", r"## Базовые типы данных"),
    ("04-js-dom/00-theory-01-js-basics.md", "console.log unrequested", r"console.log\('Открыт ли офис:', isOpen\);"),
    ("04-js-dom/00-theory-03-dom.md", "querySelector used before taught", r"const card = document\.querySelector\('\.card'\);"),
    ("04-js-dom/00-theory-04-selector.md", "filter used before taught", r"cardsArray\.filter"),
    ("04-js-dom/00-theory-05-create.md", "insertAdjacentHTML diagram missing beforeend", r"← afterend"),
    ("04-js-dom/00-theory-05-create.md", "addEventListener used before taught", r"addEventListener\('click'"),
    ("04-js-dom/00-theory-06-events.md", "comment mismatch", r"Сменить тему"),
    ("04-js-dom/00-theory-07-timeout.md", "id alert vs alertBox", r'id="alert"'),
    ("04-js-dom/04-toast-get-container.md", "getElementById unexplained", r"getElementById\('toast-container'\)"),
    ("04-js-dom/07-toast-append.md", "colors object unrequested", r"const colors = \{ success:"),
    ("04-js-dom/14-nav-links-loop.md", "task links vs navLinks & missing sol lines", r"links\.forEach"),
    ("04-js-dom/15-nav-highlight-index.md", "classList.remove phantom ref", r"после `classList\.remove`"),
    ("04-js-dom/16-nav-highlight-catalog.md", "brace formatting", r"\} else if"),
    ("04-js-dom/17-nav-highlight-others.md", "condition mismatch & updateAuthNav", r"href\.includes\('booking\.html'\)"),
    ("04-js-dom/21-auth-logout-event.md", "onclick property", r"authNavBtn\.onclick"),
    ("04-js-dom/23-auth-logged-out.md", "myBookingsNavItem omitted in task", r"myBookingsNavItem"),

    # Lesson 05
    ("05-catalog/00-theory-06-fetch.md", "fetch disconnected from practice", r"async function fetchPrice"),
    ("05-catalog/00-theory-07-tabs.md", "tabs orphaned theory", r"initTabs"),
    ("05-catalog/06-create-catalog-page.md", "duplicate OFFICE_ROOMS", r"const OFFICE_ROOMS = \["),
    ("05-catalog/07-catalog-container.md", "zero diff catalogContainer", r'id="catalogContainer"'),
    ("05-catalog/11-render-join.md", "zero diff join", r"\.join\(''\)"),
    ("05-catalog/13-update-index-links.md", "catalog.html in start instead of index.html", r"Каталог офисов — СмартОфис"),
    ("05-catalog/14-create-details-page.md", "duplicate OFFICE_ROOMS", r"const OFFICE_ROOMS = \["),
    ("05-catalog/21-data-mock-bookings.md", "main.js in start instead of data.js", r"document\.addEventListener\('DOMContentLoaded'"),

    # Lesson 06
    ("06-forms/00-theory-02-submit.md", "FormData disconnected from practice", r"new FormData"),
    ("06-forms/00-theory-05-storage.md", "duplicate localStorage theory", r"localStorage\.setItem"),
    ("06-forms/00-theory-06-modal.md", "dialog modal disconnected from practice", r"showModal"),
    ("06-forms/01-create-login-page.md", "premature form in solution", r'id="loginForm"'),
    ("06-forms/02-login-html-form.md", "zero diff login form", r'id="loginForm"'),
    ("06-forms/03-create-register-page.md", "premature form in solution", r'id="registerForm"'),
    ("06-forms/04-register-html-form.md", "zero diff register form", r'id="registerForm"'),
    ("06-forms/20-login-error-ui.md", "danger instead of error", r"showNotification\(.*'danger'\)"),
    ("06-forms/21-call-form-functions.md", "call both functions misleading", r"вызов обеих новых функций"),
]

base_dir = r"d:\IEEU International East-European University\foma-code-lab\content\lessons"

for relpath, desc, pat in issues:
    fp = os.path.join(base_dir, relpath)
    with open(fp, "r", encoding="utf-8") as f:
        lines = f.readlines()
    matches = []
    for idx, l in enumerate(lines, 1):
        if re.search(pat, l):
            matches.append(idx)
    print(f"{relpath} | {desc} | lines: {matches}")
