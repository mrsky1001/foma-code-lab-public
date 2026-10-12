# Milestone M1 Implementation Changes (Lessons 01–03, Issues 1–34)

**Worker:** `worker_m1`  
**Milestone:** M1 (Foundations & Layout)  
**Date:** 2026-10-10  
**Status:** COMPLETE (33 files modified, 1 verified idempotent, 0 frontmatter mutations, all verification tests passing)

---

## 1. Summary of Changes

Milestone M1 covers Lessons 01–03 (`01-intro`, `02-markup`, `03-flexbox`), encompassing Issues #1 through #34 as cataloged in `content/AUDIT_REPORT.md`:
- **Lesson 01 (`01-intro`):** 8 files modified (Issues 1–8).
- **Lesson 02 (`02-markup`):** 12 files modified, 1 file verified idempotent (`04-google-fonts.md`) (Issues 9–21).
- **Lesson 03 (`03-flexbox`):** 13 files modified (Issues 22–34).
- **Total Modified Files:** 33 files.
- **Frontmatter Invariance:** 100% byte-identical across all 33 modified files (`git diff` reports 0 frontmatter mutations).

---

## 2. Detailed File Modifications

### Lesson 01 — Введение (`content/lessons/01-intro/`)

| # | Issue ID | File Path | Defect Type | Changes Applied |
|---|---|---|---|---|
| 1 | #1 | `01-welcome.md` | `[ОШИБКА]` | Added DOM selection `const btn = document.querySelector('.btn');` prior to `addEventListener` to avoid runtime `ReferenceError`. Updated greeting alert text. |
| 2 | #2 | `04-paragraphs.md` | `[ДУБЛИРОВАНИЕ]` | Removed premature Block vs Inline table; added warning note against chaining `<br><br>` for margins; aligned starter code and solution with the "СмартОфис" project context. |
| 3 | #3 | `06-links.md` | `[ОШИБКА]` | Added `noreferrer` alongside `noopener` in theory, task instructions, and solution to prevent tabnabbing and referer header leakages. |
| 4 | #4 | `07-images.md` | `[ОШИБКА]` | Added LCP/performance warning against using `loading="lazy"` on above-the-fold assets; removed `loading="lazy"` from logo task description and solution. |
| 5 | #5 | `08-html-structure.md` | `[ДУБЛИРОВАНИЕ]` | Replaced redundant 5-step baby construction with high-level anatomy of a web page and forward reference to Lesson 02 standards. |
| 6 | #6 | `09-what-is-css.md` | `[ПЛАВНОСТЬ]` | Wrapped `<body>` in full HTML5 skeleton (`<!DOCTYPE html>`, `<html lang="ru">`, `<head>`, `<meta charset="UTF-8">`, `<title>`) in both `html:start` and `html:solution`. |
| 7 | #7 | `10-css-selectors.md` | `[ЗАДАНИЕ]` | Removed undeclared `border-radius: 4px;` from `.highlight` in `css:solution` to align with the task requirements. |
| 8 | #8 | `11-block-inline.md` | `[ЗАДАНИЕ]` | Added preset `text-decoration: none;` and `color: #1e293b;` to `css:start` and placed them ahead of student-implemented properties in `css:solution`. |

---

### Lesson 02 — Разметка и стилизация (`content/lessons/02-markup/`)

| # | Issue ID | File Path | Defect Type | Changes Applied |
|---|---|---|---|---|
| 9 | #9 | `00-theory-01-doctype.md` | `[ДУБЛИРОВАНИЕ]` | Replaced duplicate baby construction with professional Standards Mode vs Quirks Mode theory, and explained `lang="ru"` significance for a11y screenreaders and SEO. |
| 10 | #10 | `00-theory-02-head.md` | `[ЗАДАНИЕ]` | Removed premature `<link rel="stylesheet" href="css/style.css">` from `html:solution` before stylesheet linkage is introduced in the curriculum. |
| 11 | #11 | `00-theory-06b-variables.md` | `[ЗАДАНИЕ]` | Aligned task instructions with solution to declare `--brand-color` and `--brand-dark`, applied to `h1`, `.btn`, and added `.btn:hover` with `var(--brand-dark)` to `css:solution`. |
| 12 | #12 | `00-theory-07-container.md` | `[ЗАДАНИЕ]` | Fixed padding mismatch in `css:solution`: updated `.container` padding from `0 16px` to `0 20px`, matching task instruction #3. |
| 13 | #13 | `00-theory-08-flexbox.md` | `[ЗАДАНИЕ]` | Added missing `align-items: flex-start;` to `.catalog` in `css:solution` as requested in the task text. |
| 14 | #14 | `04-google-fonts.md` | `[ОШИБКА]` | Verified idempotent: `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` is already physically present in `html:solution`. Zero edit needed. |
| 15 | #15 | `08-flex-body.md` | `[ОШИБКА]` | Added missing interactive code blocks `css:start` and `css:solution`. Replaced rigid `min-width: 1200px` with responsive mobile baseline `min-width: 320px`. |
| 16 | #16 | `09-container-css.md` | `[ОШИБКА]` | Replaced fixed `width: 1200px` with responsive `max-width: 1200px; width: 100%;` in theory, task snippet, and `css:solution`. Updated body `min-width` to `320px`. |
| 17 | #17 | `15-nav-css.md` | `[ПЛАВНОСТЬ]` | Removed premature login button (`nav-btn`) and premature `active` class from starter HTML `html:start` to preserve step progression. |
| 18 | #18 | `16-nav-links.md` | `[ПЛАВНОСТЬ]` | Removed premature login button (`nav-btn`) from `html:start`, keeping active state on "Главная". |
| 19 | #19 | `17-nav-button.md` | `[ЗАДАНИЕ]` | Removed target login button from starter HTML `html:start`, allowing the student to implement it as assigned. |
| 20 | #20 | `21-hero-bottom-css.md` | `[ОШИБКА]` | Restored missing `.hero-bottom` wrapper and `.hero-subtitle` paragraph in `html:start`, carrying over output from preceding step 20. |
| 21 | #21 | `24-footer-css.md` | `[ОШИБКА]` | Replaced outdated footer stub in `html:start` with the complete footer markup from step 23 (`.footer-info`, `.footer-contacts`, and 2026 copyright). |

---

### Lesson 03 — Flexbox и адаптивность (`content/lessons/03-flexbox/`)

| # | Issue ID | File Path | Defect Type | Changes Applied |
|---|---|---|---|---|
| 22 | #22 | `00-theory-03-pseudo.md` | `[ЗАДАНИЕ]` | Removed unrequested `.btn:focus` rule from `css:solution` (task requested only `:hover` and `:active`). |
| 23 | #23 | `00-theory-04-card.md` | `[ПРОБЕЛ]` | Added explanatory comments to `overflow: hidden;` and `object-fit: cover;` noting they will be studied in depth in step 05. |
| 24 | #24 | `01-popular-section-html.md` | `[ПОДАЧА]` | Removed premature button and card component CSS rules from `css:start` (steps 02–21 build them incrementally). |
| 25 | #25 | `07-grid-container-html.md` | `[ПОДАЧА]` | Removed premature card component styles (`.room-card`, `.card-img-wrap`, `.card-content`, etc.) from `css:start`, preserving button styles. |
| 26 | #26 | `08-room-card-html.md` | `[ОШИБКА]` | Restored truncated description sentence and added missing `## 🛠 Задание` section with precise instructions. |
| 27 | #27 | `10-card-image-html.md` | `[ПОДАЧА]` | Clarified that the `onerror` attribute is an optional commercial technique, preventing confusion with the standard `html:solution`. |
| 28 | #28 | `11-card-image-css.md` | `[ПЛАВНОСТЬ]` | Fixed wrapper link href in `html:start` from `pages/catalog.html` to `pages/room-details.html`, matching surrounding steps. |
| 29 | #29 | `12-card-content-html.md` | `[ОШИБКА]` | Removed inline style `style="text-decoration: none; color: inherit;"` from task description, code snippet, and `html:solution`. |
| 30 | #30 | `15-card-footer-html.md` | `[ПЛАВНОСТЬ]` | Corrected step cross-references in ascii tree and code comment from "следующим шагом" to "в шаге 18". |
| 31 | #31 | `16-card-footer-css.md` | `[ПЛАВНОСТЬ]` | Cleared premature button and icon contents from `.card-btns` in `html:start`, providing an empty container. |
| 32 | #32 | `18-card-btns-layout.md` | `[ЗАДАНИЕ]` | Cleared button contents from `<div class="card-btns">` in `html:start` per AUDIT_REPORT, giving student the empty container to populate. |
| 33 | #33 | `19-duplicate-cards.md` | `[ПОДАЧА]` | Replaced truncated pseudocode examples with complete, valid HTML snippets for Card 2 ("Конференц-зал Alpha") and Card 3 ("Опенспейс Hub"). |
| 34 | #34 | `20-rooms-grid-css.md` | `[ПЛАВНОСТЬ]` | Removed premature `.center-action` ("Больше офисов") container from `html:start`, as it is introduced in step 21. |

---

## 3. Verification Commands & Results

1. **Course Audit Suite:**
   ```bash
   node scripts/verify-all-lessons.mjs
   ```
   **Output:**
   ```
   --- Auditing all webinars (1-9) ---
   No issues found!
   Audit Results:
   Total steps checked: 231
   Passed steps: 231
   Issues found: 0
   ✅ ALL STEPS PASSED AUDIT WITH ZERO ERRORS!
   ```

2. **Theory Step Context Verification:**
   ```bash
   node scripts/verify-all-theory-lessons.mjs
   ```
   **Output:**
   ```
   AUDIT RESULTS: 66 theoretical steps checked
   ERRORS:   0
   WARNINGS: 0
   ✅ All required context rules passed with 0 errors!
   ```

3. **Frontmatter Invariance Verification:**
   ```powershell
   git diff -U0 content/lessons/ | Select-String "^[+-]title:|^[+-]type:|^[+-]highlight:"
   ```
   **Output:** 0 matches (zero mutations to YAML frontmatter across all files).

4. **Vite Production Build:**
   ```bash
   npm run build
   ```
   **Output:** Exit code 0, 2769 modules transformed, `dist/` built cleanly.
