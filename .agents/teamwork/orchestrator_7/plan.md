# Plan: Mass Application and Full Verification of 113 Fixes

## Context & Objectives
Apply all 113 pedagogical, technical, and structural fixes identified in `content/AUDIT_REPORT.md` across the remaining lessons of `foma-code-lab`.
- M1 (Lessons 01–03, Issues 1–34): COMPLETED by `worker_m1`.
- M2 (Lessons 04–05, Issues 35–58): 24 issues in `04-js-dom` and `05-catalog`.
- M3 (Lessons 06–07, Issues 59–81): 23 issues in `06-forms` and `07-slider`.
- M4 (Lessons 08–10, Issues 82–113): 32 issues in `08-search`, `09-final`, `10-troubleshooting`.
- M5: Full E2E Verification, Adversarial Coverage Hardening, and Forensic Audit of all 113 fixes across 10 lessons.

## Execution Sequence

### Phase 1: Initialization & Heartbeat
1. Set up heartbeat cron `schedule(CronExpression="*/10 * * * *")`.
2. Update global `PROJECT.md` to reflect the 113-fix remediation architecture and milestones.

### Phase 2: Milestone M2 (Lessons 04–05, Issues 35–58)
1. **Survey / Exploration**:
   - Dispatch `explorer_m2_l4` for Lesson 04 (Issues 35–48 in `04-js-dom/`).
   - Dispatch `explorer_m2_l5` for Lesson 05 (Issues 49–58 in `05-catalog/`).
   - Extract exact file locations, before/after code blocks, verify frontmatter requirements.
2. **Implementation**:
   - Dispatch `worker_m2` to execute surgical edits across Lesson 04 and Lesson 05.
   - Run verification commands (`verify-all-lessons.mjs`, `verify-all-theory-lessons.mjs`, `npm run build`).
3. **Verification & Audit**:
   - Dispatch Reviewer (`reviewer_m2_1`, `reviewer_m2_2`), Challenger (`challenger_m2`), and Forensic Auditor (`auditor_m2`).
4. **Gate**: Evaluate Gate M2.

### Phase 3: Milestone M3 (Lessons 06–07, Issues 59–81)
1. **Survey / Exploration**:
   - Dispatch `explorer_m3_l6` for Lesson 06 (`06-forms/`, Issues 59–67).
   - Dispatch `explorer_m3_l7` for Lesson 07 (`07-slider/`, Issues 68–81).
2. **Implementation**:
   - Dispatch `worker_m3` to apply fixes and run test harness.
3. **Verification & Gate**:
   - Reviewers, Challenger, Forensic Auditor, Gate evaluation.

### Phase 4: Milestone M4 (Lessons 08–10, Issues 82–113)
1. **Survey / Exploration**:
   - Dispatch `explorer_m4_l8` for Lesson 08 (`08-search/`, Issues 82–97).
   - Dispatch `explorer_m4_l9_10` for Lessons 09 & 10 (`09-final/` Issues 98–108, `10-troubleshooting/` Issues 109–113).
2. **Implementation**:
   - Dispatch `worker_m4` to apply fixes and verify.
3. **Verification & Gate**:
   - Reviewers, Challenger, Forensic Auditor, Gate evaluation.

### Phase 5: Final Course-Wide Verification & E2E Acceptance
1. Dispatch comprehensive verification agent to validate all 113 rules from `scripts/audit_fix_rules.json` and `content/AUDIT_REPORT.md` across all 231 files.
2. Run full course validation:
   - `node scripts/verify-all-lessons.mjs`
   - `node scripts/verify-all-theory-lessons.mjs`
   - `npm run build`
   - Git working-tree check (all 111 modified files, zero unexpected files, frontmatter integrity).
3. Final Forensic Audit sign-off on the full repository state.

### Phase 6: Delivery
Synthesize findings, verify all criteria met, and deliver completion report to parent agent.
