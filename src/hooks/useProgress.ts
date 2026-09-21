import { useState, useEffect, useCallback, useMemo } from "react";
import type { Lesson } from "../types/lesson";
import { hasQuizForLesson } from "../data/quizzes";
import { hasCodeTask } from "../utils/codeMatch";

const VISITED_PREFIX     = "foma-visited";
const TIMER_PREFIX       = "foma-step-time";   // accumulated seconds
const PRACTICE_PREFIX    = "foma-practice-done";
const QUIZ_COMPLETED_PREFIX = "foma-quiz-completed";
const MIN_SECONDS        = 0;

function getVisitedKey(lessonId: number, stepIdx: number) {
  return `${VISITED_PREFIX}-${lessonId}-${stepIdx}`;
}
function getTimerKey(lessonId: number, stepIdx: number) {
  return `${TIMER_PREFIX}-${lessonId}-${stepIdx}`;
}
function getPracticeKey(lessonId: number, stepIdx: number) {
  return `${PRACTICE_PREFIX}-${lessonId}-${stepIdx}`;
}
function getQuizKey(lessonId: number) {
  return `${QUIZ_COMPLETED_PREFIX}-${lessonId}`;
}

function loadVisitedSteps(): Set<string> {
  const visited = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(VISITED_PREFIX)) visited.add(key);
    }
  } catch { /* ignore */ }
  return visited;
}

function loadPracticeDone(): Set<string> {
  const done = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PRACTICE_PREFIX)) done.add(key);
    }
  } catch { /* ignore */ }
  return done;
}

function loadTimerDoneSteps(): Set<string> {
  const done = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(TIMER_PREFIX)) {
        const val = Number(localStorage.getItem(key)) || 0;
        if (val >= MIN_SECONDS) {
          done.add(key);
        }
      }
    }
  } catch { /* ignore */ }
  return done;
}

function loadQuizCompleted(): Set<number> {
  const done = new Set<number>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(QUIZ_COMPLETED_PREFIX)) {
        const parts = key.split('-');
        const lessonId = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(lessonId)) {
          done.add(lessonId);
        }
      }
    }
  } catch { /* ignore */ }
  return done;
}

function getAccumTime(lessonId: number, stepIdx: number): number {
  try {
    return Number(localStorage.getItem(getTimerKey(lessonId, stepIdx))) || 0;
  } catch { return 0; }
}

export function useProgress(
  lessons: readonly Lesson[],
  currentLessonId: number,
  currentStepIdx: number,
  isAdmin: boolean = false
) {
  const [visitedSteps, setVisitedSteps] = useState<Set<string>>(() => loadVisitedSteps());
  const [practiceDone, setPracticeDone] = useState<Set<string>>(() => loadPracticeDone());
  const [timerDoneSteps, setTimerDoneSteps] = useState<Set<string>>(() => loadTimerDoneSteps());
  const [quizCompletedSet, setQuizCompletedSet] = useState<Set<number>>(() => loadQuizCompleted());
  const [currentStepSeconds, setCurrentStepSeconds] = useState<number>(() => getAccumTime(currentLessonId, currentStepIdx));

  // Mark visited (legacy — kept for backwards compatibility)
  useEffect(() => {
    const key = getVisitedKey(currentLessonId, currentStepIdx);
    try { localStorage.setItem(key, "1"); } catch { /* ignore */ }
    setVisitedSteps(prev => {
      if (prev.has(key)) return prev;
      const next = new Set(prev); next.add(key); return next;
    });
  }, [currentLessonId, currentStepIdx]);

  // ── Step visit marker (replaces old 60-second accumulation timer) ──────────
  // MIN_SECONDS = 0 means every visited step is immediately "timer-done".
  // The timer barrier was removed intentionally; this effect just ensures
  // the timerDoneSteps set is populated on step visit so isStepFullyCompleted works.
  useEffect(() => {
    const key = getTimerKey(currentLessonId, currentStepIdx);
    // Mark as done immediately — no time gate
    try { localStorage.setItem(key, '0'); } catch { /* ignore */ }
    setCurrentStepSeconds(0);
    setTimerDoneSteps(prev => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, [currentLessonId, currentStepIdx]);

  // ── Practice done marker ──────────────────────────────────────────────────
  const markPracticeDone = useCallback((lessonId: number, stepIdx: number) => {
    const key = getPracticeKey(lessonId, stepIdx);
    try { localStorage.setItem(key, "1"); } catch { /* ignore */ }
    setPracticeDone(prev => {
      if (prev.has(key)) return prev;
      const next = new Set(prev); next.add(key); return next;
    });
  }, []);

  // ── Mark any step fully completed (both timer and practice/theory fulfilled) ──
  const markStepCompleted = useCallback((lessonId: number, stepIdx: number) => {
    // 1. Mark timer as fulfilled (60s)
    const tKey = getTimerKey(lessonId, stepIdx);
    try { localStorage.setItem(tKey, String(MIN_SECONDS)); } catch { /* ignore */ }
    setTimerDoneSteps(prev => {
      if (prev.has(tKey)) return prev;
      const next = new Set(prev); next.add(tKey); return next;
    });
    if (lessonId === currentLessonId && stepIdx === currentStepIdx) {
      setCurrentStepSeconds(MIN_SECONDS);
    }
    // 2. Mark practice / task fulfilled
    const pKey = getPracticeKey(lessonId, stepIdx);
    try { localStorage.setItem(pKey, "1"); } catch { /* ignore */ }
    setPracticeDone(prev => {
      if (prev.has(pKey)) return prev;
      const next = new Set(prev); next.add(pKey); return next;
    });
  }, [currentLessonId, currentStepIdx]);

  // ── Quiz completed marker ─────────────────────────────────────────────────
  const markQuizCompleted = useCallback((lessonId: number) => {
    try { localStorage.setItem(getQuizKey(lessonId), "1"); } catch { /* ignore */ }
    setQuizCompletedSet(prev => {
      if (prev.has(lessonId)) return prev;
      const next = new Set(prev); next.add(lessonId); return next;
    });
  }, []);

  const isQuizCompleted = useCallback((lessonId: number): boolean => {
    return quizCompletedSet.has(lessonId);
  }, [quizCompletedSet]);

  // ── Step completion check ─────────────────────────────────────────────────
  const isStepFullyCompleted = useCallback(
    (lessonId: number, stepIdx: number, type?: "theory" | "practice"): boolean => {
      const timerKey = getTimerKey(lessonId, stepIdx);
      const timerDone = timerDoneSteps.has(timerKey) || getAccumTime(lessonId, stepIdx) >= MIN_SECONDS;
      if (!timerDone) return false;

      const targetLesson = lessons.find(l => l.id === lessonId);
      const targetStep = targetLesson?.steps[stepIdx];
      let stepType = type;
      if (!stepType && targetStep) {
        stepType = targetStep.type ?? "theory";
      }

      const hasTask = stepType === "practice" || (targetStep ? hasCodeTask(targetStep.startCode, targetStep.solutionCode) : false);

      if (hasTask) {
        return practiceDone.has(getPracticeKey(lessonId, stepIdx));
      }
      return true;
    },
    [timerDoneSteps, practiceDone, lessons]
  );

  // ── Is all steps of lesson completed → quiz unlocked ─────────────────────
  const isQuizUnlocked = useCallback(
    (lessonId: number): boolean => {
      if (isAdmin) return true;
      const lesson = lessons.find(l => l.id === lessonId);
      if (!lesson || lesson.steps.length === 0) return false;
      return lesson.steps.every((step, idx) =>
        isStepFullyCompleted(lessonId, idx, step.type)
      );
    },
    [lessons, isStepFullyCompleted, isAdmin]
  );

  // Alias for backward compatibility
  const isLessonUnlocked = isQuizUnlocked;

  // ── Is lesson completed (quiz passed or all steps done if no quiz) ────────
  const isLessonCompleted = useCallback(
    (lessonId: number): boolean => {
      if (hasQuizForLesson(lessonId)) {
        return isQuizCompleted(lessonId);
      }
      const lesson = lessons.find(l => l.id === lessonId);
      if (!lesson || lesson.steps.length === 0) return true;
      return lesson.steps.every((step, idx) =>
        isStepFullyCompleted(lessonId, idx, step.type)
      );
    },
    [lessons, isQuizCompleted, isStepFullyCompleted]
  );

  // ── Is lesson accessible (sequential unlock for students, all for admin) ──
  const isLessonAccessible = useCallback(
    (lessonId: number): boolean => {
      if (isAdmin) return true;
      const idx = lessons.findIndex(l => l.id === lessonId);
      if (idx <= 0) return true; // First lesson is always unlocked
      const prevLesson = lessons[idx - 1];
      return isLessonCompleted(prevLesson.id);
    },
    [lessons, isAdmin, isLessonCompleted]
  );

  // ── Sequential step accessibility within lesson ───────────────────────────
  const isStepAccessible = useCallback(
    (lessonId: number, stepIdx: number): boolean => {
      if (isAdmin) return true;
      if (!isLessonAccessible(lessonId)) return false;
      if (stepIdx <= 0) return true; // First step of an accessible lesson is always open
      // Every preceding step in this lesson must be completed
      for (let i = 0; i < stepIdx; i++) {
        if (!isStepFullyCompleted(lessonId, i)) return false;
      }
      return true;
    },
    [isAdmin, isLessonAccessible, isStepFullyCompleted]
  );

  // ── Progress helpers ──────────────────────────────────────────────────────
  const getLessonProgress = useCallback(
    (lessonId: number, totalSteps: number): number => {
      let count = 0;
      for (let i = 0; i < totalSteps; i++) {
        if (isStepFullyCompleted(lessonId, i)) count++;
      }
      return count;
    },
    [isStepFullyCompleted]
  );

  const totalStepsCount = useMemo(
    () => lessons.reduce((sum, l) => sum + l.steps.length, 0),
    [lessons]
  );

  const totalVisitedCount = useMemo(() => {
    let count = 0;
    for (const l of lessons) {
      for (let i = 0; i < l.steps.length; i++) {
        if (visitedSteps.has(getVisitedKey(l.id, i))) count++;
      }
    }
    return count;
  }, [lessons, visitedSteps]);

  const totalCompletedCount = useMemo(() => {
    let count = 0;
    for (const l of lessons) {
      for (let i = 0; i < l.steps.length; i++) {
        if (isStepFullyCompleted(l.id, i, l.steps[i].type)) count++;
      }
    }
    return count;
  }, [lessons, isStepFullyCompleted]);

  // ── Reset all progress ───────────────────────────────────────────────────
  const resetAllProgress = useCallback(() => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (
          k &&
          (k.startsWith(VISITED_PREFIX) ||
           k.startsWith(TIMER_PREFIX) ||
           k.startsWith(PRACTICE_PREFIX) ||
           k.startsWith(QUIZ_COMPLETED_PREFIX))
        ) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }
    setVisitedSteps(new Set());
    setPracticeDone(new Set());
    setTimerDoneSteps(new Set());
    setQuizCompletedSet(new Set());
    setCurrentStepSeconds(0);
  }, []);

  return {
    visitedSteps,
    practiceDone,
    timerDoneSteps,
    currentStepSeconds,
    getLessonProgress,
    totalStepsCount,
    totalVisitedCount,
    totalCompletedCount,
    markPracticeDone,
    markStepCompleted,
    markQuizCompleted,
    isQuizCompleted,
    isStepFullyCompleted,
    isStepCompleted: isStepFullyCompleted,
    isStepAccessible,
    isQuizUnlocked,
    isLessonUnlocked,
    isLessonCompleted,
    isLessonAccessible,
    resetAllProgress,
  } as const;
}

