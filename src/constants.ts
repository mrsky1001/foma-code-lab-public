/* ══════════════════════════════════════════════
   Foma Code Lab — Layout Constants
   ══════════════════════════════════════════════ */

export const LAYOUT = {
  SIDEBAR_MIN: 180,
  SIDEBAR_MAX: 480,
  SIDEBAR_DEFAULT: 260,

  LESSON_MIN: 260,
  LESSON_MAX: 800,
  LESSON_DEFAULT: 380,

  EDITOR_RATIO_MIN: 0.15,
  EDITOR_RATIO_MAX: 0.85,
  EDITOR_RATIO_DEFAULT: 0.5,

  MOBILE_BREAKPOINT: 900,

  FONT_SIZE_MIN: 10,
  FONT_SIZE_MAX: 30,
  FONT_SIZE_DEFAULT: 13,

  SPLIT_RATIO_MIN: 0.2,
  SPLIT_RATIO_MAX: 0.8,
} as const;

export const DRAFT_DEBOUNCE_MS = 500;
export const TOAST_DURATION_MS = 5000;
