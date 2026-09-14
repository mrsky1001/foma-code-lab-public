import { useState, useEffect, useCallback } from "react";
import { ACHIEVEMENT_RANKS, INITIAL_RANK } from "../types/quiz";
import type { AchievementRank } from "../types/quiz";

const RANK_KEY = "foma-achievement-rank";
const QUIZ_COMPLETED_PREFIX = "foma-quiz-completed-";

function getCompletedCount(): number {
  let count = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(QUIZ_COMPLETED_PREFIX)) count++;
    }
  } catch { /* ignore */ }
  return count;
}

function calcRankLevel(completedTests: number): number {
  if (completedTests <= 0) return 0;
  if (completedTests >= 10) return 10;
  return completedTests;
}

export function useAchievements() {
  const [rankLevel, setRankLevel] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(RANK_KEY)) || 0;
    } catch { return 0; }
  });

  const [justUnlocked, setJustUnlocked] = useState<AchievementRank | null>(null);

  const currentRank: AchievementRank =
    rankLevel > 0 ? (ACHIEVEMENT_RANKS[rankLevel - 1] ?? INITIAL_RANK) : INITIAL_RANK;

  const checkAndUpdate = useCallback(() => {
    const completed = getCompletedCount();
    const newLevel = calcRankLevel(completed);
    const prevLevel = Number(localStorage.getItem(RANK_KEY)) || 0;
    if (newLevel > prevLevel) {
      try { localStorage.setItem(RANK_KEY, String(newLevel)); } catch { /* ignore */ }
      setRankLevel(newLevel);
      if (newLevel > 0) setJustUnlocked(ACHIEVEMENT_RANKS[newLevel - 1]);
    }
  }, []);

  const clearJustUnlocked = useCallback(() => setJustUnlocked(null), []);

  const resetAchievements = useCallback(() => {
    try {
      localStorage.removeItem(RANK_KEY);
    } catch { /* ignore */ }
    setRankLevel(0);
    setJustUnlocked(null);
  }, []);

  // Re-sync on mount
  useEffect(() => { checkAndUpdate(); }, [checkAndUpdate]);

  return { rankLevel, currentRank, justUnlocked, checkAndUpdate, clearJustUnlocked, resetAchievements };
}
