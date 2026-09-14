import { useState, useCallback, useEffect, useRef } from 'react';
import type { CodeFiles } from '../types/lesson';
import { lessons } from '../lessons';
import { formatCode } from '../utils/formatCode';
import { analyzeStepSolution } from '../utils/codeDiff';
import { DRAFT_DEBOUNCE_MS } from '../constants';

export interface SolutionTarget {
  lang: 'html' | 'css' | 'js';
  fromLine: number;
  toLine: number;
  scrollToLine: number;
  timestamp: number;
}

function formatCodeFiles(files: CodeFiles): CodeFiles {
  return {
    html: formatCode('html', files.html),
    css: formatCode('css', files.css),
    js: formatCode('js', files.js),
  };
}

function getInitialLessonAndStep(): { lessonIdx: number; stepIdx: number } {
  let lessonParam: string | null = null;
  let stepParam: string | null = null;

  try {
    // 1. Check URL search params (?lesson=4&step=1 or ?l=4&s=1)
    const searchParams = new URLSearchParams(window.location.search);
    lessonParam = searchParams.get('lesson') || searchParams.get('l');
    stepParam = searchParams.get('step') || searchParams.get('s');

    // 2. Hash fallback (#lesson=4&step=1 or #/4/1)
    if (!lessonParam && window.location.hash) {
      const cleanHash = window.location.hash.replace(/^#\/?/, '');
      const hashParams = new URLSearchParams(cleanHash);
      lessonParam = hashParams.get('lesson') || hashParams.get('l');
      stepParam = hashParams.get('step') || hashParams.get('s');

      if (!lessonParam) {
        const match = cleanHash.match(/(?:lesson\/)?(\d+)(?:\/step\/|\/)(\d+)/i);
        if (match) {
          lessonParam = match[1];
          stepParam = match[2];
        }
      }
    }

    // 3. LocalStorage fallback
    if (!lessonParam) {
      lessonParam = localStorage.getItem('foma-last-lesson-id');
      stepParam = localStorage.getItem('foma-last-step-idx');
    }
  } catch {
    // Ignore in non-browser context
  }

  let lessonIdx = 0;
  let stepIdx = 0;

  if (lessonParam) {
    const num = parseInt(lessonParam, 10);
    const foundIdx = lessons.findIndex((l) => l.id === num);
    if (foundIdx !== -1) {
      lessonIdx = foundIdx;
    }
  }

  if (stepParam) {
    const sNum = parseInt(stepParam, 10);
    if (!isNaN(sNum)) {
      const targetIdx = sNum >= 1 ? sNum - 1 : 0;
      if (targetIdx >= 0 && targetIdx < lessons[lessonIdx].steps.length) {
        stepIdx = targetIdx;
      }
    }
  }

  return { lessonIdx, stepIdx };
}

export function useLesson() {
  const [{ lessonIndex: initialLessonIdx, stepIdx: initialStepIdx }] = useState(() => {
    const result = getInitialLessonAndStep();
    return { lessonIndex: result.lessonIdx, stepIdx: result.stepIdx };
  });
  const [lessonIndex, setLessonIndex] = useState(initialLessonIdx);
// Purge legacy broken drafts from v1 and v2
try {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('foma-draft-') && !k.startsWith('foma-draft-v3-')) {
      keysToRemove.push(k);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
} catch { /* ignore */ }

function isValidDraft(draft: unknown, startCode: CodeFiles): draft is CodeFiles {
  if (!draft || typeof draft !== 'object') return false;
  const d = draft as CodeFiles;
  const trimmedHtml = (d.html || '').trim();
  // Discard draft if it starts with an orphaned closing tag (legacy fragment bug)
  if (trimmedHtml.startsWith('</')) return false;
  // Discard draft if startCode is a full HTML document but draft is missing DOCTYPE/html
  if (startCode.html.includes('<!DOCTYPE') && !d.html.includes('<!DOCTYPE') && !d.html.includes('<html')) {
    return false;
  }
  // Discard draft if html is wiped empty when startCode has non-empty HTML
  if (!trimmedHtml && (startCode.html || '').trim()) {
    return false;
  }
  return true;
}

  const [stepIndex, setStepIndex] = useState(initialStepIdx);
  const [code, setCode] = useState<CodeFiles>(() => {
    const targetStartCode = lessons[initialLessonIdx].steps[initialStepIdx].startCode;
    const draftKey = `foma-draft-v3-${lessons[initialLessonIdx].id}-${initialStepIdx}`;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft) as CodeFiles;
        if (isValidDraft(parsed, targetStartCode)) {
          return parsed;
        } else {
          localStorage.removeItem(draftKey);
        }
      }
    } catch { /* ignore */ }
    return formatCodeFiles({ ...targetStartCode });
  });
  
  const [isShowingSolution, setIsShowingSolution] = useState(false);
  const [userCodeBeforeSolution, setUserCodeBeforeSolution] = useState<CodeFiles | null>(null);
  const [solutionTarget, setSolutionTarget] = useState<SolutionTarget | null>(null);

  // Debounced draft save
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveDraft = useCallback((lIdx: number, sIdx: number, codeToSave: CodeFiles) => {
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      try {
        const key = `foma-draft-v3-${lessons[lIdx].id}-${sIdx}`;
        localStorage.setItem(key, JSON.stringify(codeToSave));
      } catch { /* quota exceeded */ }
    }, DRAFT_DEBOUNCE_MS);
  }, []);

  const clearDraft = useCallback((lIdx: number, sIdx: number) => {
    try {
      localStorage.removeItem(`foma-draft-v3-${lessons[lIdx].id}-${sIdx}`);
      localStorage.removeItem(`foma-draft-v2-${lessons[lIdx].id}-${sIdx}`);
      localStorage.removeItem(`foma-draft-${lessons[lIdx].id}-${sIdx}`);
    } catch { /* ignore */ }
  }, []);

  /** Load draft or fallback to startCode for a given lesson/step */
  const loadCodeForStep = useCallback((lIdx: number, sIdx: number): CodeFiles => {
    const targetStartCode = lessons[lIdx].steps[sIdx].startCode;
    const draftKey = `foma-draft-v3-${lessons[lIdx].id}-${sIdx}`;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft) as CodeFiles;
        if (isValidDraft(parsed, targetStartCode)) {
          return parsed;
        } else {
          localStorage.removeItem(draftKey);
        }
      }
    } catch { /* ignore */ }
    return formatCodeFiles({ ...targetStartCode });
  }, []);

  const lesson = lessons[lessonIndex];
  const step = lesson.steps[stepIndex];
  const totalSteps = lesson.steps.length;

  // Sync URL and localStorage on lesson/step change
  useEffect(() => {
    const currentLesson = lessons[lessonIndex];
    if (!currentLesson) return;

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lesson', String(currentLesson.id));
      url.searchParams.set('step', String(stepIndex + 1));
      window.history.replaceState(null, '', url.toString());

      localStorage.setItem('foma-last-lesson-id', String(currentLesson.id));
      localStorage.setItem('foma-last-step-idx', String(stepIndex + 1));
      localStorage.setItem(`foma-lesson-${currentLesson.id}-step`, String(stepIndex));
    } catch {
      // Ignore
    }
  }, [lessonIndex, stepIndex]);

  // Sync state if user clicks browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const { lessonIdx, stepIdx } = getInitialLessonAndStep();
      setLessonIndex(lessonIdx);
      setStepIndex(stepIdx);
      setCode(loadCodeForStep(lessonIdx, stepIdx));
      setIsShowingSolution(false);
      setUserCodeBeforeSolution(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [loadCodeForStep]);

  // Helper to reset solution state on navigation
  const resetSolutionState = useCallback(() => {
    setIsShowingSolution(false);
    setUserCodeBeforeSolution(null);
    setSolutionTarget(null);
  }, []);

  // ── Step navigation ──
  const goToStep = useCallback((idx: number) => {
    const l = lessons[lessonIndex];
    if (idx >= 0 && idx < l.steps.length) {
      setStepIndex(idx);
      setCode(loadCodeForStep(lessonIndex, idx));
      resetSolutionState();
    }
  }, [lessonIndex, resetSolutionState, loadCodeForStep]);

  const nextStep = useCallback(() => {
    const l = lessons[lessonIndex];
    if (stepIndex < l.steps.length - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      setCode(loadCodeForStep(lessonIndex, next));
      resetSolutionState();
    }
  }, [lessonIndex, stepIndex, resetSolutionState, loadCodeForStep]);

  const prevStep = useCallback(() => {
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      setStepIndex(prev);
      setCode(loadCodeForStep(lessonIndex, prev));
      resetSolutionState();
    }
  }, [lessonIndex, stepIndex, resetSolutionState, loadCodeForStep]);

  // ── Lesson navigation ──
  const goToLesson = useCallback((id: number) => {
    const idx = lessons.findIndex((l) => l.id === id);
    if (idx !== -1) {
      if (idx === lessonIndex) {
        return; // Already on this lesson — do not reset step!
      }
      let targetStep = 0;
      try {
        const savedStep = localStorage.getItem(`foma-lesson-${id}-step`);
        if (savedStep !== null) {
          const parsed = Number(savedStep);
          if (!isNaN(parsed) && parsed >= 0 && parsed < lessons[idx].steps.length) {
            targetStep = parsed;
          }
        }
      } catch {
        // Ignore
      }

      setLessonIndex(idx);
      setStepIndex(targetStep);
      setCode(loadCodeForStep(idx, targetStep));
      resetSolutionState();
    }
  }, [lessonIndex, resetSolutionState, loadCodeForStep]);

  const goToLessonStep = useCallback((lessonId: number, sIdx: number) => {
    const lIdx = lessons.findIndex((l) => l.id === lessonId);
    if (lIdx !== -1 && sIdx >= 0 && sIdx < lessons[lIdx].steps.length) {
      setLessonIndex(lIdx);
      setStepIndex(sIdx);
      setCode(loadCodeForStep(lIdx, sIdx));
      resetSolutionState();
    }
  }, [resetSolutionState, loadCodeForStep]);

  const nextLesson = useCallback(() => {
    if (lessonIndex < lessons.length - 1) {
      const next = lessonIndex + 1;
      setLessonIndex(next);
      setStepIndex(0);
      setCode(loadCodeForStep(next, 0));
      resetSolutionState();
    }
  }, [lessonIndex, resetSolutionState, loadCodeForStep]);

  const prevLesson = useCallback(() => {
    if (lessonIndex > 0) {
      const prev = lessonIndex - 1;
      const lastStepIdx = lessons[prev].steps.length - 1;
      setLessonIndex(prev);
      setStepIndex(lastStepIdx);
      setCode(loadCodeForStep(prev, lastStepIdx));
      resetSolutionState();
    }
  }, [lessonIndex, resetSolutionState, loadCodeForStep]);

  // ── Code actions ──
  const resetCode = useCallback(() => {
    clearDraft(lessonIndex, stepIndex);
    setCode(formatCodeFiles({ ...lessons[lessonIndex].steps[stepIndex].startCode }));
    resetSolutionState();
  }, [lessonIndex, stepIndex, resetSolutionState, clearDraft]);

  const toggleSolution = useCallback(() => {
    if (isShowingSolution) {
      // Hide solution, restore user code
      setCode(userCodeBeforeSolution || formatCodeFiles({ ...lessons[lessonIndex].steps[stepIndex].startCode }));
      setIsShowingSolution(false);
      setUserCodeBeforeSolution(null);
      setSolutionTarget(null);
    } else {
      // Show solution, save current code
      setUserCodeBeforeSolution(code);
      const curStep = lessons[lessonIndex].steps[stepIndex];
      const analysis = analyzeStepSolution(
        curStep.startCode,
        curStep.solutionCode,
        curStep.highlight,
        curStep.title
      );
      setCode(analysis.annotatedCode);
      setIsShowingSolution(true);

      const primaryRange = analysis.ranges[analysis.primaryLang];
      setSolutionTarget({
        lang: analysis.primaryLang,
        fromLine: primaryRange.fromLine,
        toLine: primaryRange.toLine,
        scrollToLine: primaryRange.scrollToLine,
        timestamp: Date.now(),
      });
    }
  }, [isShowingSolution, code, userCodeBeforeSolution, lessonIndex, stepIndex]);

  const updateCode = useCallback((lang: keyof CodeFiles, value: string) => {
    if (isShowingSolution) {
      setIsShowingSolution(false);
      setUserCodeBeforeSolution(null);
      setSolutionTarget(null);
    }
    setCode((prev) => {
      const next = { ...prev, [lang]: value };
      saveDraft(lessonIndex, stepIndex, next);
      return next;
    });
  }, [isShowingSolution, lessonIndex, stepIndex, saveDraft]);

  const resetAllDrafts = useCallback(() => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (
          k &&
          (k.startsWith('foma-draft-') ||
           k === 'foma-last-lesson-id' ||
           k === 'foma-last-step-idx')
        ) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
    setLessonIndex(0);
    setStepIndex(0);
    setIsShowingSolution(false);
    setUserCodeBeforeSolution(null);
    setSolutionTarget(null);
    const firstStepCode = lessons[0].steps[0].startCode;
    setCode(formatCodeFiles({ ...firstStepCode }));
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return {
    lesson,
    step,
    lessons,
    lessonIndex,
    stepIndex,
    totalSteps,
    code,
    goToStep,
    goToLessonStep,
    nextStep,
    prevStep,
    goToLesson,
    nextLesson,
    prevLesson,
    resetCode,
    resetAllDrafts,
    toggleSolution,
    isShowingSolution,
    solutionTarget,
    updateCode,
    hasNextStep: stepIndex < totalSteps - 1,
    hasPrevStep: stepIndex > 0,
    hasNextLesson: lessonIndex < lessons.length - 1,
    hasPrevLesson: lessonIndex > 0,
  } as const;
}
