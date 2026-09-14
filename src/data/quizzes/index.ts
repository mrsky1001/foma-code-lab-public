import { webinar1Questions } from "./webinar-1";
import { webinar2Questions } from "./webinar-2";
import { webinar3Questions } from "./webinar-3";
import { webinar4Questions } from "./webinar-4";
import { webinar5Questions } from "./webinar-5";
import { webinar6Questions } from "./webinar-6";
import { webinar7Questions } from "./webinar-7";
import { webinar8Questions } from "./webinar-8";
import { webinar9Questions } from "./webinar-9";
import { webinar10Questions } from "./webinar-10";
import type { QuizQuestion } from "../../types/quiz";

const quizMap: Record<number, QuizQuestion[]> = {
  1: webinar1Questions,
  2: webinar2Questions,
  3: webinar3Questions,
  4: webinar4Questions,
  5: webinar5Questions,
  6: webinar6Questions,
  7: webinar7Questions,
  8: webinar8Questions,
  9: webinar9Questions,
  10: webinar10Questions,
};

/** Shuffle array with Fisher-Yates */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Get 25 shuffled questions for a given lesson id, with shuffled options */
export function getQuizQuestions(lessonId: number): QuizQuestion[] {
  const base = quizMap[lessonId] ?? [];
  return shuffle(base).slice(0, 25).map(q => {
    // Build index array [0,1,2,3], shuffle it
    const indices = shuffle([0, 1, 2, 3]);
    const newOptions = indices.map(i => q.options[i]);
    const newCorrectIndex = indices.indexOf(q.correctIndex);
    return { ...q, options: newOptions, correctIndex: newCorrectIndex };
  });
}

export function hasQuizForLesson(lessonId: number): boolean {
  return lessonId in quizMap;
}
