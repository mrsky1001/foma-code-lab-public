# Execution Plan: Mass Application of 113 Fixes to Foma Code Lab

## Objective
Apply all 113 pedagogical and technical fixes from `content/AUDIT_REPORT.md` across 111 target files in `content/lessons/` with zero corruption to markdown structures and frontmatter, verified by automated test harnesses.

## Milestones & Strategy

### Phase 1: Survey & Test Infrastructure (Dual Track)
1. Dispatch `teamwork_preview_spec_miner` / `teamwork_preview_explorer` to inspect repository state (check which files have already been modified vs untouched, git status check via worker, ensure clean baseline).
2. Dispatch `teamwork_preview_test_writer` to construct the automated verification test harness (`tests/verify_audit_fixes.py`) checking:
   - All 111 files were edited.
   - All 113 issues applied according to specifications.
   - Frontmatter byte-invariance across 225 files (and correct `type` modification in the 6 designated files).
   - Markdown syntax and blockquote/code-block integrity.
   - Publish `TEST_READY.md`.

### Phase 2: Milestone M1 — Lessons 01–03 (Issues 1–34)
- Scope: 34 files in `01-intro`, `02-markup`, `03-flexbox`.
- Step 1: Dispatch Explorer to prepare exact patch instructions for M1 issues.
- Step 2: Dispatch Worker to apply M1 fixes.
- Step 3: Dispatch Reviewers (2) and Challengers (2) to review changes and run test harness.
- Step 4: Dispatch Forensic Auditor to verify authentic changes.
- Step 5: Gate check.

### Phase 3: Milestone M2 — Lessons 04–05 (Issues 35–58)
- Scope: 22 files (24 issues) in `04-js-dom`, `05-catalog`.
- Step 1: Dispatch Explorer for M2.
- Step 2: Dispatch Worker for M2.
- Step 3: Reviewers + Challengers + Forensic Auditor.
- Step 4: Gate check.

### Phase 4: Milestone M3 — Lessons 06–07 (Issues 59–81)
- Scope: 23 files in `06-forms`, `07-slider`.
- Step 1: Dispatch Explorer for M3.
- Step 2: Dispatch Worker for M3.
- Step 3: Reviewers + Challengers + Forensic Auditor.
- Step 4: Gate check.

### Phase 5: Milestone M4 — Lessons 08–10 (Issues 82–113)
- Scope: 32 files in `08-search`, `09-final`, `10-troubleshooting`.
- Step 1: Dispatch Explorer for M4.
- Step 2: Dispatch Worker for M4.
- Step 3: Reviewers + Challengers + Forensic Auditor.
- Step 4: Gate check.

### Phase 6: Milestone M5 — Full E2E Verification & Adversarial Hardening
- Run full 113-issue test harness across all 111 touched files.
- Adversarial coverage check (Tier 5).
- Forensic Auditor final sign-off.
- Final completion report to parent agent.
