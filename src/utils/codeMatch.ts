import type { CodeFiles } from '../types/lesson';

/**
 * Strips comments from code for accurate semantic comparison.
 */
function stripComments(code: string, lang: 'html' | 'css' | 'js'): string {
  if (!code) return '';
  let clean = code;
  if (lang === 'html') {
    clean = clean.replace(/<!--[\s\S]*?-->/g, '');
  }
  // Remove CSS/JS multi-line comments
  clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
  if (lang === 'js') {
    // Remove single-line comments
    clean = clean.replace(/\/\/.*$/gm, '');
  }
  return clean;
}

/**
 * Normalizes code: strips comments and collapses whitespace.
 */
function normalizeCode(code: string, lang: 'html' | 'css' | 'js'): string {
  const noComments = stripComments(code, lang);
  return noComments.replace(/\s+/g, ' ').trim();
}

/**
 * Tokenizes code into words, tags, operators, and punctuation.
 */
function tokenize(code: string): string[] {
  if (!code) return [];
  // Matches words (including Cyrillic, numbers, hyphens) or single punctuation/special chars
  const matches = code.match(/[a-zA-Z0-9_\u0400-\u04FF\-]+|[<>{}/=;:"'().,#%]/g);
  return matches || [];
}

/**
 * Calculates the percentage (0-100) of expected solution code that the user has added.
 *
 * @param userCode Current code in editor
 * @param startCode Initial code at the start of the step
 * @param solutionCode Expected target code
 * @param primaryLang Primary language for the step
 * @returns Integer from 0 to 100 representing percentage of completion
 */
export function calculateCodeSimilarity(
  userCode: CodeFiles,
  startCode: CodeFiles,
  solutionCode: CodeFiles,
  primaryLang?: 'html' | 'css' | 'js'
): number {
  const langs: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
  
  // Find which languages actually have differences between start and solution
  const changedLangs = langs.filter(lang => {
    const sNorm = normalizeCode(startCode[lang] || '', lang);
    const solNorm = normalizeCode(solutionCode[lang] || '', lang);
    return sNorm !== solNorm;
  });

  // If no language has changes (e.g. purely theoretical step), consider 100% matched
  if (changedLangs.length === 0) {
    return 100;
  }

  // Prioritize primaryLang if it has changes, otherwise evaluate all changed languages
  const targetLangs = primaryLang && changedLangs.includes(primaryLang)
    ? [primaryLang]
    : changedLangs;

  let totalPct = 0;

  for (const lang of targetLangs) {
    const startNorm = normalizeCode(startCode[lang] || '', lang);
    const solNorm = normalizeCode(solutionCode[lang] || '', lang);
    const userNorm = normalizeCode(userCode[lang] || '', lang);

    // If user's code already exactly matches solution (normalized)
    if (userNorm === solNorm) {
      totalPct += 100;
      continue;
    }

    // If user hasn't touched the code from start
    if (userNorm === startNorm) {
      totalPct += 0;
      continue;
    }

    // Extract tokens
    const startTokens = tokenize(startNorm);
    const solTokens = tokenize(solNorm);
    const userTokens = tokenize(userNorm);

    // Build frequency map of start tokens
    const startFreq = new Map<string, number>();
    for (const t of startTokens) {
      startFreq.set(t, (startFreq.get(t) || 0) + 1);
    }

    // Expected delta tokens: tokens in solution that exceed what was in start
    const expectedFreq = new Map<string, number>();
    const startFreqCopy = new Map(startFreq);
    for (const t of solTokens) {
      const inStart = startFreqCopy.get(t) || 0;
      if (inStart > 0) {
        startFreqCopy.set(t, inStart - 1);
      } else {
        expectedFreq.set(t, (expectedFreq.get(t) || 0) + 1);
      }
    }

    // Total count of newly expected tokens
    let totalExpected = 0;
    for (const count of expectedFreq.values()) {
      totalExpected += count;
    }

    // If no new tokens were added in solution (e.g. deletion), compare overall similarity
    if (totalExpected === 0) {
      totalPct += userNorm.length > 0 ? 50 : 0;
      continue;
    }

    // User added tokens: tokens in user code that exceed what was in start
    const userFreqCopy = new Map(startFreq);
    const userAddedFreq = new Map<string, number>();
    for (const t of userTokens) {
      const inStart = userFreqCopy.get(t) || 0;
      if (inStart > 0) {
        userFreqCopy.set(t, inStart - 1);
      } else {
        userAddedFreq.set(t, (userAddedFreq.get(t) || 0) + 1);
      }
    }

    // Count matches between expected tokens and user-added tokens
    let matchedTokens = 0;
    for (const [token, expCount] of expectedFreq.entries()) {
      const uCount = userAddedFreq.get(token) || 0;
      matchedTokens += Math.min(expCount, uCount);
    }

    let pct = Math.min(100, Math.round((matchedTokens / totalExpected) * 100));

    // ── Structural keyword guard ─────────────────────────────────────────────
    // If the solution introduces new *word* tokens (tag names, identifiers,
    // class names, etc.), missing any of them caps the score below 80% threshold.
    // Cap is proportional: the more keywords present, the higher the allowed score.
    // This ensures students see real progress for partial work, while preventing
    // auto-pass when structural elements are missing.
    const requiredKeywords = [...expectedFreq.keys()].filter(t =>
      /^[a-zA-Z\u0400-\u04FF]/.test(t) // word tokens only (letters/Cyrillic)
    );
    const missingKeywords = requiredKeywords.filter(t => (userAddedFreq.get(t) || 0) === 0);
    if (missingKeywords.length > 0 && requiredKeywords.length > 0) {
      // Proportional cap: present / total keywords * 79 (always below 80% threshold)
      const presentRatio = (requiredKeywords.length - missingKeywords.length) / requiredKeywords.length;
      const proportionalCap = Math.floor(presentRatio * 79);
      pct = Math.min(pct, Math.max(proportionalCap, 10)); // at least 10% for any attempt
    }
    // ────────────────────────────────────────────────────────────────────────

    totalPct += pct;
  }

  return Math.round(totalPct / targetLangs.length);
}

/**
 * Determines whether a step contains an actual code task
 * (i.e. has differences between start and solution code once comments and whitespace are normalized).
 */
export function hasCodeTask(startCode?: CodeFiles, solutionCode?: CodeFiles): boolean {
  if (!startCode || !solutionCode) return false;
  const langs: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
  return langs.some(lang => {
    const sNorm = normalizeCode(startCode[lang] || '', lang);
    const solNorm = normalizeCode(solutionCode[lang] || '', lang);
    return sNorm !== solNorm;
  });
}
