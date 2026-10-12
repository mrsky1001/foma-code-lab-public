# Project: Foma Code Lab — Mass Audit Report Fixes (113 Issues)

## Architecture
- **Repository Root**: `d:\IEEU International East-European University\foma-code-lab`
- **Lessons Directory**: `content/lessons/` (241 total files, 231 `.md` files, 10 `_lesson.yml` files across 10 lessons).
- **Audit Source of Truth**: `content/AUDIT_REPORT.md` (113 issues, 111 target files).
- **Core Principle: Safe Edit**:
  - Only modify the target lines and code blocks specified in `content/AUDIT_REPORT.md`.
  - Exactly 6 files modify frontmatter `type`:
    - `09-final/10-final-congratulations.md` -> `type: theory`
    - `10-troubleshooting/01-debug-basics.md` -> `type: practice`
    - `10-troubleshooting/02-broken-markup.md` -> `type: practice`
    - `10-troubleshooting/03-broken-styles.md` -> `type: practice`
    - `10-troubleshooting/04-broken-logic.md` -> `type: practice`
    - `10-troubleshooting/05-broken-events.md` -> `type: practice`
  - In all other 225 files, YAML frontmatter must remain 100% byte-identical.
  - Surrounding markdown headings, theory text, explanations, and instructions must remain pristine.

## Feature Inventory (All 113 Issues)
| # | Issue ID | Lesson | File Path | Defect Type | Priority | Milestone | Source |
|---|---|---|---|---|---|---|---|
| 1 | #1 | 01-intro | content/lessons/01-intro/00-theory-01-web-intro.md | ПОДАЧА | Средний | M1 | AUDIT_REPORT |
| 2 | #2 | 01-intro | content/lessons/01-intro/00-theory-02-html-basics.md | ЗАДАНИЕ | Низкий | M1 | AUDIT_REPORT |
| 3 | #3 | 01-intro | content/lessons/01-intro/00-theory-03-css-basics.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 4 | #4 | 01-intro | content/lessons/01-intro/00-theory-04-devtools.md | ПОДАЧА | Низкий | M1 | AUDIT_REPORT |
| 5 | #5 | 01-intro | content/lessons/01-intro/01-hello-world.md | ЗАДАНИЕ | Высокий | M1 | AUDIT_REPORT |
| 6 | #6 | 01-intro | content/lessons/01-intro/02-add-heading.md | ЗАДАНИЕ | Высокий | M1 | AUDIT_REPORT |
| 7 | #7 | 01-intro | content/lessons/01-intro/03-add-paragraph.md | ЗАДАНИЕ | Высокий | M1 | AUDIT_REPORT |
| 8 | #8 | 01-intro | content/lessons/01-intro/04-add-style.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 9 | #9 | 02-markup | content/lessons/02-markup/00-theory-01-semantics.md | ПОДАЧА | Низкий | M1 | AUDIT_REPORT |
| 10 | #10 | 02-markup | content/lessons/02-markup/00-theory-02-containers.md | ПОДАЧА | Низкий | M1 | AUDIT_REPORT |
| 11 | #11 | 02-markup | content/lessons/02-markup/00-theory-03-classes.md | ЗАДАНИЕ | Средний | M1 | AUDIT_REPORT |
| 12 | #12 | 02-markup | content/lessons/02-markup/00-theory-04-buttons-links.md | ЗАДАНИЕ | Средний | M1 | AUDIT_REPORT |
| 13 | #13 | 02-markup | content/lessons/02-markup/01-page-structure.md | ПЛАВНОСТЬ | Средний | M1 | AUDIT_REPORT |
| 14 | #14 | 02-markup | content/lessons/02-markup/02-header-markup.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 15 | #15 | 02-markup | content/lessons/02-markup/03-hero-markup.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 16 | #16 | 02-markup | content/lessons/02-markup/04-cards-markup.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 17 | #17 | 02-markup | content/lessons/02-markup/05-footer-markup.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 18 | #18 | 02-markup | content/lessons/02-markup/06-full-skeleton.md | ДУБЛИРОВАНИЕ | Средний | M1 | AUDIT_REPORT |
| 19 | #19 | 02-markup | content/lessons/02-markup/07-normalize-css.md | ПРОБЕЛ | Средний | M1 | AUDIT_REPORT |
| 20 | #20 | 02-markup | content/lessons/02-markup/08-typography-css.md | ПЛАВНОСТЬ | Средний | M1 | AUDIT_REPORT |
| 21 | #21 | 02-markup | content/lessons/02-markup/09-header-css.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 22 | #22 | 03-flexbox | content/lessons/03-flexbox/00-theory-01-flex-intro.md | ПОДАЧА | Средний | M1 | AUDIT_REPORT |
| 23 | #23 | 03-flexbox | content/lessons/03-flexbox/00-theory-02-flex-axis.md | ПОДАЧА | Средний | M1 | AUDIT_REPORT |
| 24 | #24 | 03-flexbox | content/lessons/03-flexbox/00-theory-03-flex-wrap.md | ПОДАЧА | Средний | M1 | AUDIT_REPORT |
| 25 | #25 | 03-flexbox | content/lessons/03-flexbox/00-theory-04-flex-items.md | ЗАДАНИЕ | Средний | M1 | AUDIT_REPORT |
| 26 | #26 | 03-flexbox | content/lessons/03-flexbox/01-nav-flex.md | ПЛАВНОСТЬ | Средний | M1 | AUDIT_REPORT |
| 27 | #27 | 03-flexbox | content/lessons/03-flexbox/02-hero-flex.md | ПЛАВНОСТЬ | Средний | M1 | AUDIT_REPORT |
| 28 | #28 | 03-flexbox | content/lessons/03-flexbox/03-features-flex.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 29 | #29 | 03-flexbox | content/lessons/03-flexbox/04-catalog-grid-flex.md | ОШИБКА | Критический | M1 | AUDIT_REPORT |
| 30 | #30 | 03-flexbox | content/lessons/03-flexbox/05-footer-flex.md | ПЛАВНОСТЬ | Средний | M1 | AUDIT_REPORT |
| 31 | #31 | 03-flexbox | content/lessons/03-flexbox/06-card-layout-flex.md | ДУБЛИРОВАНИЕ | Средний | M1 | AUDIT_REPORT |
| 32 | #32 | 03-flexbox | content/lessons/03-flexbox/07-badge-flex.md | ДУБЛИРОВАНИЕ | Средний | M1 | AUDIT_REPORT |
| 33 | #33 | 03-flexbox | content/lessons/03-flexbox/08-reviews-flex.md | ОШИБКА | Высокий | M1 | AUDIT_REPORT |
| 34 | #34 | 03-flexbox | content/lessons/03-flexbox/09-full-layout-check.md | ДУБЛИРОВАНИЕ | Средний | M1 | AUDIT_REPORT |
| 35 | #35 | 04-js-dom | content/lessons/04-js-dom/00-theory-01-js-basics.md | ПРОБЕЛ | Средний | M2 | AUDIT_REPORT |
| 36 | #36 | 04-js-dom | content/lessons/04-js-dom/00-theory-01-js-basics.md | ПОДАЧА | Средний | M2 | AUDIT_REPORT |
| 37 | #37 | 04-js-dom | content/lessons/04-js-dom/00-theory-02-dom-tree.md | ЗАДАНИЕ | Низкий | M2 | AUDIT_REPORT |
| 38 | #38 | 04-js-dom | content/lessons/04-js-dom/00-theory-03-select.md | ЗАДАНИЕ | Низкий | M2 | AUDIT_REPORT |
| 39 | #39 | 04-js-dom | content/lessons/04-js-dom/00-theory-04-modify.md | ОШИБКА | Критический | M2 | AUDIT_REPORT |
| 40 | #40 | 04-js-dom | content/lessons/04-js-dom/00-theory-05-create.md | ОШИБКА | Высокий | M2 | AUDIT_REPORT |
| 41 | #41 | 04-js-dom | content/lessons/04-js-dom/00-theory-05-create.md | ПОДАЧА | Средний | M2 | AUDIT_REPORT |
| 42 | #42 | 04-js-dom | content/lessons/04-js-dom/01-select-card.md | ОШИБКА | Высокий | M2 | AUDIT_REPORT |
| 43 | #43 | 04-js-dom | content/lessons/04-js-dom/02-change-title.md | ОШИБКА | Высокий | M2 | AUDIT_REPORT |
| 44 | #44 | 04-js-dom | content/lessons/04-js-dom/03-change-price.md | ОШИБКА | Высокий | M2 | AUDIT_REPORT |
| 45 | #45 | 04-js-dom | content/lessons/04-js-dom/04-toggle-fav.md | ОШИБКА | Критический | M2 | AUDIT_REPORT |
| 46 | #46 | 04-js-dom | content/lessons/04-js-dom/05-create-badge.md | ОШИБКА | Критический | M2 | AUDIT_REPORT |
| 47 | #47 | 04-js-dom | content/lessons/04-js-dom/06-render-array.md | ДУБЛИРОВАНИЕ | Средний | M2 | AUDIT_REPORT |
| 48 | #48 | 04-js-dom | content/lessons/04-js-dom/07-filter-array.md | ДУБЛИРОВАНИЕ | Средний | M2 | AUDIT_REPORT |
| 49 | #49 | 04-js-dom | content/lessons/04-js-dom/08-sort-array.md | ПРОБЕЛ | Средний | M2 | AUDIT_REPORT |
| 50 | #50 | 04-js-dom | content/lessons/04-js-dom/09-dom-summary.md | ПОДАЧА | Низкий | M2 | AUDIT_REPORT |
| 51 | #51 | 05-catalog | content/lessons/05-catalog/00-theory-01-template.md | ПОДАЧА | Средний | M2 | AUDIT_REPORT |
| 52 | #52 | 05-catalog | content/lessons/05-catalog/00-theory-02-destructuring.md | ПОДАЧА | Средний | M2 | AUDIT_REPORT |
| 53 | #53 | 05-catalog | content/lessons/05-catalog/01-catalog-data.md | ОШИБКА | Высокий | M2 | AUDIT_REPORT |
| 54 | #54 | 05-catalog | content/lessons/05-catalog/02-card-template.md | ОШИБКА | Критический | M2 | AUDIT_REPORT |
| 55 | #55 | 05-catalog | content/lessons/05-catalog/03-render-catalog.md | ОШИБКА | Критический | M2 | AUDIT_REPORT |
| 56 | #56 | 05-catalog | content/lessons/05-catalog/04-filter-controls.md | ПЛАВНОСТЬ | Средний | M2 | AUDIT_REPORT |
| 57 | #57 | 05-catalog | content/lessons/05-catalog/05-active-filter.md | ОШИБКА | Критический | M2 | AUDIT_REPORT |
| 58 | #58 | 05-catalog | content/lessons/05-catalog/06-empty-state.md | ОШИБКА | Критический | M2 | AUDIT_REPORT |
| 59 | #59 | 06-forms | content/lessons/06-forms/00-theory-01-form-events.md | ЗАДАНИЕ | Средний | M3 | AUDIT_REPORT |
| 60 | #60 | 06-forms | content/lessons/06-forms/00-theory-02-formdata.md | ЗАДАНИЕ | Средний | M3 | AUDIT_REPORT |
| 61 | #61 | 06-forms | content/lessons/06-forms/00-theory-03-validation.md | ЗАДАНИЕ | Средний | M3 | AUDIT_REPORT |
| 62 | #62 | 06-forms | content/lessons/06-forms/01-form-html.md | ПЛАВНОСТЬ | Средний | M3 | AUDIT_REPORT |
| 63 | #63 | 06-forms | content/lessons/06-forms/02-login-html-form.md | ОШИБКА | Критический | M3 | AUDIT_REPORT |
| 64 | #64 | 06-forms | content/lessons/06-forms/03-submit-event.md | ОШИБКА | Высокий | M3 | AUDIT_REPORT |
| 65 | #65 | 06-forms | content/lessons/06-forms/04-register-html-form.md | ОШИБКА | Критический | M3 | AUDIT_REPORT |
| 66 | #66 | 06-forms | content/lessons/06-forms/20-login-error-ui.md | ОШИБКА | Критический | M3 | AUDIT_REPORT |
| 67 | #67 | 06-forms | content/lessons/06-forms/21-form-summary.md | ПОДАЧА | Средний | M3 | AUDIT_REPORT |
| 68 | #68 | 07-slider | content/lessons/07-slider/00-theory-01-slider-logic.md | ПОДАЧА | Средний | M3 | AUDIT_REPORT |
| 69 | #69 | 07-slider | content/lessons/07-slider/00-theory-02-transition.md | ПОДАЧА | Средний | M3 | AUDIT_REPORT |
| 70 | #70 | 07-slider | content/lessons/07-slider/01-slider-markup.md | ОШИБКА | Высокий | M3 | AUDIT_REPORT |
| 71 | #71 | 07-slider | content/lessons/07-slider/02-slider-styles.md | ОШИБКА | Высокий | M3 | AUDIT_REPORT |
| 72 | #72 | 07-slider | content/lessons/07-slider/03-slider-state.md | ПЛАВНОСТЬ | Средний | M3 | AUDIT_REPORT |
| 73 | #73 | 07-slider | content/lessons/07-slider/04-next-slide.md | ОШИБКА | Критический | M3 | AUDIT_REPORT |
| 74 | #74 | 07-slider | content/lessons/07-slider/05-prev-slide.md | ОШИБКА | Высокий | M3 | AUDIT_REPORT |
| 75 | #75 | 07-slider | content/lessons/07-slider/06-update-ui.md | ОШИБКА | Критический | M3 | AUDIT_REPORT |
| 76 | #76 | 07-slider | content/lessons/07-slider/07-dots-markup.md | ПЛАВНОСТЬ | Средний | M3 | AUDIT_REPORT |
| 77 | #77 | 07-slider | content/lessons/07-slider/08-dots-events.md | ОШИБКА | Высокий | M3 | AUDIT_REPORT |
| 78 | #78 | 07-slider | content/lessons/07-slider/09-auto-slide.md | ПОДАЧА | Средний | M3 | AUDIT_REPORT |
| 79 | #79 | 07-slider | content/lessons/07-slider/10-pause-hover.md | ДУБЛИРОВАНИЕ | Средний | M3 | AUDIT_REPORT |
| 80 | #80 | 07-slider | content/lessons/07-slider/16-stop-auto-func.md | ОШИБКА | Критический | M3 | AUDIT_REPORT |
| 81 | #81 | 07-slider | content/lessons/07-slider/20-call-init-slider.md | ОШИБКА | Критический | M3 | AUDIT_REPORT |
| 82 | #82 | 08-search | content/lessons/08-search/00-theory-01-search-algo.md | ПОДАЧА | Средний | M4 | AUDIT_REPORT |
| 83 | #83 | 08-search | content/lessons/08-search/00-theory-02-debounce.md | ПРОБЕЛ | Высокий | M4 | AUDIT_REPORT |
| 84 | #84 | 08-search | content/lessons/08-search/00-theory-03-date-obj.md | ПРОБЕЛ | Высокий | M4 | AUDIT_REPORT |
| 85 | #85 | 08-search | content/lessons/08-search/01-catalog-toolbar-html.md | ОШИБКА | Высокий | M4 | AUDIT_REPORT |
| 86 | #86 | 08-search | content/lessons/08-search/02-search-input-css.md | ПЛАВНОСТЬ | Средний | M4 | AUDIT_REPORT |
| 87 | #87 | 08-search | content/lessons/08-search/03-search-state.md | ПЛАВНОСТЬ | Средний | M4 | AUDIT_REPORT |
| 88 | #88 | 08-search | content/lessons/08-search/09-search-event.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 89 | #89 | 08-search | content/lessons/08-search/10-filter-search.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 90 | #90 | 08-search | content/lessons/08-search/13-booking-form-html.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 91 | #91 | 08-search | content/lessons/08-search/14-booking-modal-css.md | ПЛАВНОСТЬ | Средний | M4 | AUDIT_REPORT |
| 92 | #92 | 08-search | content/lessons/08-search/15-booking-calc-dom.md | ОШИБКА | Высокий | M4 | AUDIT_REPORT |
| 93 | #93 | 08-search | content/lessons/08-search/16-booking-calc-func.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 94 | #94 | 08-search | content/lessons/08-search/17-booking-days-calc.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 95 | #95 | 08-search | content/lessons/08-search/18-booking-price-calc.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 96 | #96 | 08-search | content/lessons/08-search/19-booking-total-ui.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 97 | #97 | 08-search | content/lessons/08-search/20-call-init-booking-calc.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 98 | #98 | 09-final | content/lessons/09-final/00-theory-03-modules.md | ОШИБКА | Высокий | M4 | AUDIT_REPORT |
| 99 | #99 | 09-final | content/lessons/09-final/01-project-structure.md | ЗАДАНИЕ | Средний | M4 | AUDIT_REPORT |
| 100 | #100 | 09-final | content/lessons/09-final/02-mybookings-html.md | ПЛАВНОСТЬ | Средний | M4 | AUDIT_REPORT |
| 101 | #101 | 09-final | content/lessons/09-final/03-mybookings-css.md | ПЛАВНОСТЬ | Средний | M4 | AUDIT_REPORT |
| 102 | #102 | 09-final | content/lessons/09-final/04-mybookings-state.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 103 | #103 | 09-final | content/lessons/09-final/05-render-mybookings.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 104 | #104 | 09-final | content/lessons/09-final/06-cancel-booking.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 105 | #105 | 09-final | content/lessons/09-final/07-cancel-booking-ui.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 106 | #106 | 09-final | content/lessons/09-final/08-init-mybookings.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 107 | #107 | 09-final | content/lessons/09-final/09-call-init-mybookings.md | ОШИБКА | Критический | M4 | AUDIT_REPORT |
| 108 | #108 | 09-final | content/lessons/09-final/10-final-congratulations.md | ПОДАЧА | Средний | M4 | AUDIT_REPORT |
| 109 | #109 | 10-troubleshooting | content/lessons/10-troubleshooting/01-debug-basics.md | ПОДАЧА | Средний | M4 | AUDIT_REPORT |
| 110 | #110 | 10-troubleshooting | content/lessons/10-troubleshooting/02-broken-markup.md | ПОДАЧА | Средний | M4 | AUDIT_REPORT |
| 111 | #111 | 10-troubleshooting | content/lessons/10-troubleshooting/03-broken-styles.md | ПОДАЧА | Средний | M4 | AUDIT_REPORT |
| 112 | #112 | 10-troubleshooting | content/lessons/10-troubleshooting/04-broken-logic.md | ПОДАЧА | Средний | M4 | AUDIT_REPORT |
| 113 | #113 | 10-troubleshooting | content/lessons/10-troubleshooting/05-broken-events.md | ПОДАЧА | Средний | M4 | AUDIT_REPORT |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundations & Layout (Lessons 01–03) | Issues 1–34 (34 files across 01-intro, 02-markup, 03-flexbox) | none | PLANNED |
| M2 | DOM Scripting & Catalog (Lessons 04–05) | Issues 35–58 (22 files across 04-js-dom, 05-catalog) | M1 | PLANNED |
| M3 | Interactive Forms & Slider (Lessons 06–07) | Issues 59–81 (23 files across 06-forms, 07-slider) | M2 | PLANNED |
| M4 | Search, Modules & Troubleshooting (Lessons 08–10) | Issues 82–113 (32 files across 08-search, 09-final, 10-troubleshooting) | M3 | PLANNED |
| M5 | Final E2E Verification & Adversarial Hardening | Full 113-issue verification suite pass (Tiers 1-4) + Tier 5 adversarial tests + Forensic Integrity Audit | M1, M2, M3, M4, Test Track | PLANNED |

## Interface Contracts & Invariance Rules
### Safe Edit Invariance Rules:
1. **Frontmatter Invariance**: In 225 files, YAML frontmatter between `---` and `---` must remain 100% byte-identical.
2. **Frontmatter Exceptions (Exactly 6 files)**:
   - `content/lessons/09-final/10-final-congratulations.md`: change `type: practice` -> `type: theory`
   - `content/lessons/10-troubleshooting/01-debug-basics.md`: change `type: theory` -> `type: practice`
   - `content/lessons/10-troubleshooting/02-broken-markup.md`: change `type: theory` -> `type: practice`
   - `content/lessons/10-troubleshooting/03-broken-styles.md`: change `type: theory` -> `type: practice`
   - `content/lessons/10-troubleshooting/04-broken-logic.md`: change `type: theory` -> `type: practice`
   - `content/lessons/10-troubleshooting/05-broken-events.md`: change `type: theory` -> `type: practice`
3. **Markdown Syntax Guard**: Markdown headers, blockquotes, code fence blocks (```html, ```css, ```js), and explanations outside the target fix must remain undamaged.
4. **Target Matching**: Use context-aware snippet replacement, not raw line numbers, because starter code and file line counts have evolved.

## Code Layout & File Boundaries
- M1 exclusively owns: `content/lessons/01-intro/*`, `content/lessons/02-markup/*`, `content/lessons/03-flexbox/*`
- M2 exclusively owns: `content/lessons/04-js-dom/*`, `content/lessons/05-catalog/*`
- M3 exclusively owns: `content/lessons/06-forms/*`, `content/lessons/07-slider/*`
- M4 exclusively owns: `content/lessons/08-search/*`, `content/lessons/09-final/*`, `content/lessons/10-troubleshooting/*`
- E2E Testing Track owns: `.agents/teamwork/e2e_tests/*`, `tests/audit_verification/*` or project verification test scripts.
