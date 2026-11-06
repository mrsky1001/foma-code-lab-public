import type { CodeFiles } from '../types/lesson';
import { formatCode } from './formatCode';
import { stripCodeComments } from './stripComments';

export interface CodeDiffRange {
  hasChanges: boolean;
  fromLine: number;     // 1-based line number in clean code
  toLine: number;       // 1-based line number in clean code
  scrollToLine: number; // 1-based line to scroll to
  cleanCode: string;
}

export interface SolutionDiffAnalysis {
  annotatedCode: CodeFiles;
  primaryLang: 'html' | 'css' | 'js';
  ranges: Record<'html' | 'css' | 'js', CodeDiffRange>;
}

/**
 * Generates an informative solution comment for the added code block.
 */
export function getSolutionComment(lang: 'html' | 'css' | 'js', stepTitle: string): string {
  const title = stepTitle ? `: ${stepTitle}` : '';
  if (lang === 'html') {
    return `<!-- Добавлен код решения${title} -->`;
  }
  if (lang === 'css') {
    return `/* Добавлен код решения${title} */`;
  }
  return `// Добавлен код решения${title}`;
}

/**
 * Computes diff between start and solution code, and calculates the exact
 * line range of inserted/modified code for cursor selection.
 */
export function computeDiffRange(
  lang: 'html' | 'css' | 'js',
  rawStartCode: string,
  rawSolutionCode: string,
  stepTitle = ''
): CodeDiffRange {
  // Strip comments from BOTH before diffing — avoids comment-induced false diffs across files
  const strippedStart = stripCodeComments(lang, rawStartCode || '');
  const formattedStart = formatCode(lang, strippedStart).replace(/\r\n/g, '\n');
  const strippedSolution = stripCodeComments(lang, rawSolutionCode || '');
  const formattedSolution = formatCode(lang, strippedSolution).replace(/\r\n/g, '\n');

  if (!formattedSolution.trim()) {
    return {
      hasChanges: false,
      fromLine: 1,
      toLine: 1,
      scrollToLine: 1,
      cleanCode: formattedSolution,
    };
  }

  if (formattedStart === formattedSolution) {
    const totalLines = formattedSolution.split('\n').length;
    return {
      hasChanges: false,
      fromLine: 1,
      toLine: Math.max(1, totalLines),
      scrollToLine: 1,
      cleanCode: formattedSolution,
    };
  }

  const startLines = formattedStart ? formattedStart.split('\n') : [];
  const solutionLines = formattedSolution.split('\n');

  // If start is empty, all solution lines are new
  if (startLines.length === 0) {
    const comment = getSolutionComment(lang, stepTitle);
    const withComment = comment ? `${comment}\n${formattedSolution}` : formattedSolution;
    const finalLines = withComment.split('\n');
    return {
      hasChanges: true,
      fromLine: 1,
      toLine: finalLines.length,
      scrollToLine: 1,
      cleanCode: withComment,
    };
  }

  // Find common prefix lines
  let prefix = 0;
  while (
    prefix < startLines.length &&
    prefix < solutionLines.length &&
    startLines[prefix] === solutionLines[prefix]
  ) {
    prefix++;
  }

  // Find common suffix lines
  let startEnd = startLines.length - 1;
  let solutionEnd = solutionLines.length - 1;
  while (
    startEnd >= prefix &&
    solutionEnd >= prefix &&
    startLines[startEnd] === solutionLines[solutionEnd]
  ) {
    startEnd--;
    solutionEnd--;
  }

  let fromLine = prefix + 1; // 1-based index
  let toLine = solutionEnd + 1; // 1-based index

  // Trim empty lines from selection edges for a neat cursor selection
  while (fromLine < toLine && !solutionLines[fromLine - 1]?.trim()) {
    fromLine++;
  }
  while (toLine > fromLine && !solutionLines[toLine - 1]?.trim()) {
    toLine--;
  }

  // Generate solution comment with proper indentation matching the target insertion point
  const targetLine = solutionLines[fromLine - 1] || '';
  const indent = targetLine.match(/^\s*/)?.[0] || '';
  const comment = indent + getSolutionComment(lang, stepTitle);

  // Insert comment line right before fromLine
  const linesWithComment = [
    ...solutionLines.slice(0, fromLine - 1),
    comment,
    ...solutionLines.slice(fromLine - 1),
  ];

  const newFromLine = fromLine; // comment is at fromLine
  const newToLine = toLine + 1; // offset by 1 because comment line was added

  return {
    hasChanges: true,
    fromLine: newFromLine,
    toLine: Math.max(newFromLine, newToLine),
    scrollToLine: newFromLine,
    cleanCode: linesWithComment.join('\n'),
  };
}

/**
 * Analyzes all three files (html, css, js) for a step and identifies
 * the primary file and line range that changed.
 */
export function analyzeStepSolution(
  startCode: CodeFiles,
  solutionCode: CodeFiles,
  preferredHighlight?: 'html' | 'css' | 'js',
  stepTitle = ''
): SolutionDiffAnalysis {
  const langs: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
  const ranges = {} as Record<'html' | 'css' | 'js', CodeDiffRange>;
  const annotatedCode: CodeFiles = { html: '', css: '', js: '' };

  // 1. Primary language MUST strictly follow preferredHighlight if specified!
  let primaryLang: 'html' | 'css' | 'js' = preferredHighlight || 'html';
  if (!preferredHighlight) {
    for (const lang of langs) {
      if ((startCode[lang] || '').trim() !== (solutionCode[lang] || '').trim()) {
        primaryLang = lang;
        break;
      }
    }
  }

  // 2. Compute diff ranges with solution comment annotation
  for (const lang of langs) {
    const diff = computeDiffRange(
      lang,
      startCode[lang] || '',
      solutionCode[lang] || '',
      lang === primaryLang ? stepTitle : ''
    );
    ranges[lang] = diff;
    annotatedCode[lang] = diff.cleanCode;
  }

  // 3. Fallback position if primaryLang had no detected differences
  if (!ranges[primaryLang].hasChanges) {
    const lines = annotatedCode[primaryLang].split('\n');
    const lastNonEmpty = lines.reduce((acc, l, idx) => (l.trim() ? idx + 1 : acc), 1);
    ranges[primaryLang].fromLine = lastNonEmpty;
    ranges[primaryLang].toLine = lastNonEmpty;
    ranges[primaryLang].scrollToLine = lastNonEmpty;
  }

  return {
    annotatedCode,
    primaryLang,
    ranges,
  };
}

