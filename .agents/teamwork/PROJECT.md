# Project: foma-code-lab Mass Audit Report Remediation (113 Fixes)

## Architecture
- Target Content: 231 interactive web development course lesson files across 10 directories in `content/lessons/`.
- Remediation Scope: 113 pedagogical, technical, and structural defects documented in `content/AUDIT_REPORT.md`.
- Pipeline:
  - Milestone M1: Lessons 01–03 (`01-intro`, `02-markup`, `03-flexbox`), Issues 1–34. [COMPLETED by worker_m1]
  - Milestone M2: Lessons 04–05 (`04-js-dom`, `05-catalog`), Issues 35–58. [IN PROGRESS]
  - Milestone M3: Lessons 06–07 (`06-forms`, `07-slider`), Issues 59–81. [PLANNED]
  - Milestone M4: Lessons 08–10 (`08-search`, `09-final`, `10-troubleshooting`), Issues 82–113. [PLANNED]
  - Milestone M5: Full E2E Verification, Adversarial Hardening & Final Forensic Audit across all 113 issues. [PLANNED]

## Code Layout & Write Boundaries
- M1 Files: `content/lessons/01-intro/*`, `content/lessons/02-markup/*`, `content/lessons/03-flexbox/*` (Owned by M1)
- M2 Files: `content/lessons/04-js-dom/*`, `content/lessons/05-catalog/*` (Owned exclusively by worker_m2)
- M3 Files: `content/lessons/06-forms/*`, `content/lessons/07-slider/*` (Owned exclusively by worker_m3)
- M4 Files: `content/lessons/08-search/*`, `content/lessons/09-final/*`, `content/lessons/10-troubleshooting/*` (Owned exclusively by worker_m4)

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Lessons 01–03 | 34 issues in 01-intro, 02-markup, 03-flexbox | none | DONE |
| 2 | M2: Lessons 04–05 | 24 issues in 04-js-dom, 05-catalog | M1 | IN_PROGRESS |
| 3 | M3: Lessons 06–07 | 23 issues in 06-forms, 07-slider | M2 | PLANNED |
| 4 | M4: Lessons 08–10 | 32 issues in 08-search, 09-final, 10-troubleshooting | M3 | PLANNED |
| 5 | M5: E2E Acceptance & Audit | All 113 issues across all 10 lessons verified | M1, M2, M3, M4 | PLANNED |

## Interface & Invariance Contracts
1. **Safe Edit & Frontmatter Invariance**: Do NOT alter YAML frontmatter (`title`, `type`, `highlight`, etc.) unless specifically demanded by the audit report (e.g. designated theory/practice type changes).
2. **Pedagogical Alignment**: Do NOT invent arbitrary changes; adhere strictly to the before/after fixes in `content/AUDIT_REPORT.md`.
3. **Automated Verification**: Passing `node scripts/verify-all-lessons.mjs`, `node scripts/verify-all-theory-lessons.mjs`, and `npm run build` is mandatory after every milestone.
