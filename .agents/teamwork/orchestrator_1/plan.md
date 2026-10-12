# Plan: Foma Code Lab — Mass Audit Report Fixes (113 Issues)

## Project Overview
Apply all 113 fixes (code and text) described in `content/AUDIT_REPORT.md` across all 10 lessons in `content/lessons/`, ensuring zero regression to frontmatter/markdown structure, and verifying 100% completion via automated scripts.

## Phases

### Phase 0: Survey & Scope Mapping
- **Step 0.1**: Dispatch 3 survey subagents:
  - `spec_miner_survey_1`: Mine `content/AUDIT_REPORT.md` for issues 1-60, extract exact target files, line numbers, error descriptions, and recommended fixes.
  - `spec_miner_survey_2`: Mine `content/AUDIT_REPORT.md` for issues 61-113, extract exact target files, line numbers, error descriptions, and recommended fixes.
  - `explorer_survey_1`: Explore `content/lessons/` structure, examine file naming, frontmatter formats, git status/baseline, and verify access to all 10 lessons.
- **Step 0.2**: Merge survey reports into `PROJECT.md` Feature Inventory (all 113 issues assigned to milestones).

### Phase 1: Dual Track Setup
- **Track 1 (E2E Testing Track)**:
  - Create test harness / verification script that independently checks all 113 fixes and verifies markdown/frontmatter integrity.
  - Publishes `TEST_READY.md`.
- **Track 2 (Implementation Track)**:
  - Group lessons into milestones (e.g., M1: Lessons 01-03, M2: Lessons 04-06, M3: Lessons 07-08, M4: Lessons 09-10).
  - Define clear write ownership per milestone to avoid write conflicts.

### Phase 2: Milestone Iteration Execution
- For each milestone:
  - Explorer: Analyzes target lesson files and precise fix locations.
  - Worker: Implements safe edits preserving frontmatter and structure.
  - Reviewer: 2 reviewers verify correctness, diff cleanliness, and formatting.
  - Challenger: 2 challengers verify edge cases and syntax correctness.
  - Forensic Auditor: Verifies genuine fixes, no cheating, no corrupted frontmatter.
  - Gate check in `GATE_STATUS.md`.

### Phase 3: Final E2E Verification & Adversarial Hardening
- Run the full automated verification suite across all 111 files / 113 issues.
- Adversarial checks for any overlooked broken markdown, corrupted code blocks, or missed items.
- Full integrity audit check.

### Phase 4: Final Report & Handoff
- Produce comprehensive completion report for parent and user.
