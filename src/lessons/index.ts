import { lessons as rawLessons } from 'virtual:lessons';
import type { Lesson, LessonStep, CodeFiles } from '../types/lesson';

// ─── Determine step type ──────────────────────────────────────────────────────
// If frontmatter has explicit type → use it.
// Otherwise: lesson id=1 (01-intro) = theory, id>=2 = practice.
function stepType(step: LessonStep, lessonId: number): 'theory' | 'practice' {
  if (step.type) return step.type;
  return lessonId === 1 ? 'theory' : 'practice';
}

function isDataJs(code: string): boolean {
  if (!code) return false;
  return (
    /const\s+(?:OFFICE_ROOMS|MOCK_BOOKINGS)\b/.test(code) &&
    !/addEventListener|DOMContentLoaded|function\s+init/i.test(code)
  );
}

// ─── Accumulate practice steps only ──────────────────────────────────────────
// Theory steps are left untouched (their own isolated sandbox code).
// Practice steps form a continuous chain:
//   startCode[N] = solutionCode[N-1]
//   solutionCode[N] = taken directly from the .md file (must be complete snapshot)
//   If the .md file's solutionCode for a lang is empty → carry forward prevPractice
function accumulatePractice(allLessons: Lesson[]): Lesson[] {
  let prevPractice: CodeFiles = { html: '', css: '', js: '' };
  let prevDataJs = '';
  let prevMainJs = '';
  let hasPrev = false;

  for (const lesson of allLessons) {
    for (const step of lesson.steps) {
      const isTheory = stepType(step, lesson.id) === 'theory';

      if (isTheory) {
        step.type = 'theory';
        continue;
      }

      step.type = 'practice';

      const rawSolJs = step.solutionCode.js || '';
      const rawStartJs = step.startCode.js || '';
      const stepIsDataJs = isDataJs(rawSolJs) || isDataJs(rawStartJs);

      if (!hasPrev) {
        // First practice step — use its own code as baseline
        prevPractice = {
          html: step.solutionCode.html || step.startCode.html || '',
          css:  step.solutionCode.css  || step.startCode.css  || '',
          js:   step.solutionCode.js   || step.startCode.js   || '',
        };
        if (stepIsDataJs) prevDataJs = prevPractice.js;
        else prevMainJs = prevPractice.js;
        hasPrev = true;
        continue;
      }

      // startCode = complete state of previous practice step
      step.startCode = { ...prevPractice };
      if (stepIsDataJs) {
        if (prevDataJs) step.startCode.js = prevDataJs;
      } else {
        if (prevMainJs) step.startCode.js = prevMainJs;
      }

      // solutionCode = file's value if non-empty, else carry forward
      const currentPrevJs = stepIsDataJs
        ? (prevDataJs || prevPractice.js)
        : (prevMainJs || prevPractice.js);

      step.solutionCode = {
        html: step.solutionCode.html?.trim() ? step.solutionCode.html : prevPractice.html,
        css:  step.solutionCode.css?.trim()  ? step.solutionCode.css  : prevPractice.css,
        js:   step.solutionCode.js?.trim()   ? step.solutionCode.js   : currentPrevJs,
      };

      if (step.highlight) {
        // Only step.highlight is being modified in this step.
        // Keep other files strictly identical to startCode so no phantom diffs occur.
        const otherLangs = (['html', 'css', 'js'] as const).filter((l) => l !== step.highlight);
        for (const l of otherLangs) {
          step.solutionCode[l] = step.startCode[l];
        }
      }

      if (stepIsDataJs) {
        prevDataJs = step.solutionCode.js;
      } else {
        prevMainJs = step.solutionCode.js;
      }

      prevPractice = { ...step.solutionCode };
    }
  }

  return allLessons;
}

export const lessons: Lesson[] = accumulatePractice(rawLessons as Lesson[]);
