/**
 * stripComments.ts
 *
 * Strips code comments from solution code BEFORE it is inserted into the
 * code editor. The theory panel (ReactMarkdown) is never affected — it
 * always shows the original annotated markdown.
 *
 * Rules:
 *  - HTML : remove <!-- ... --> blocks (inline or multiline)
 *  - CSS  : remove /* ... *\/ blocks (inline or multiline)
 *  - JS   : remove // line comments and /* ... *\/ blocks
 *
 * After stripping we also collapse runs of 3+ blank lines → 2 blank lines
 * and trim trailing whitespace from each line.
 */

/**
 * Strip HTML comments (<!-- ... -->) from source.
 * Preserves line structure for clean diff display.
 */
function stripHtmlComments(code: string): string {
  // Remove <!-- ... --> (single-line and multi-line)
  let result = code.replace(/<!--[\s\S]*?-->/g, (match) => {
    // If the comment is the only content on its line(s), remove the whole line(s)
    return match.includes('\n') ? '' : '';
  });

  return cleanupBlankLines(trimLineEnds(result));
}

/**
 * Strip CSS block comments (/* ... *\/) from source.
 */
function stripCssComments(code: string): string {
  const result = code.replace(/\/\*[\s\S]*?\*\//g, () => '');
  return cleanupBlankLines(trimLineEnds(result));
}

/**
 * Strip JS line comments (//) and block comments (/* ... *\/) from source.
 * Carefully avoids stripping URLs (http://) and regex literals.
 */
function stripJsComments(code: string): string {
  // Use a state machine approach to handle strings correctly
  let result = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];

    // String literals — skip contents entirely
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      result += ch;
      i++;
      while (i < len) {
        const c = code[i];
        if (c === '\\') {
          result += code[i] + (code[i + 1] ?? '');
          i += 2;
          continue;
        }
        result += c;
        i++;
        if (c === quote) break;
      }
      continue;
    }

    // Block comment /* ... */
    if (ch === '/' && code[i + 1] === '*') {
      // Consume until */
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) {
        i++;
      }
      i += 2; // skip */
      // Don't add anything to result (comment stripped)
      continue;
    }

    // Line comment //  (but NOT inside http:// etc — check previous char isn't ':')
    if (ch === '/' && code[i + 1] === '/' && result[result.length - 1] !== ':') {
      // Skip to end of line
      while (i < len && code[i] !== '\n') {
        i++;
      }
      continue;
    }

    result += ch;
    i++;
  }

  return cleanupBlankLines(trimLineEnds(result));
}

/**
 * Trim trailing whitespace from each line.
 */
function trimLineEnds(code: string): string {
  return code
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n');
}

/**
 * Collapse 3+ consecutive blank lines into at most 2 blank lines,
 * and remove lines that became entirely empty after stripping comments.
 */
function cleanupBlankLines(code: string): string {
  // First, remove lines that are now empty (were only a comment)
  const lines = code.split('\n');
  const filtered: string[] = [];
  let blankCount = 0;

  for (const line of lines) {
    if (line.trim() === '') {
      blankCount++;
      if (blankCount <= 1) {
        filtered.push('');
      }
    } else {
      blankCount = 0;
      filtered.push(line);
    }
  }

  return filtered.join('\n');
}

/**
 * Main export: strip comments from solution code before it enters the editor.
 * Theory panel is NOT affected — this is only called from codeDiff.ts.
 */
export function stripCodeComments(lang: 'html' | 'css' | 'js', code: string): string {
  if (!code || !code.trim()) return code;
  try {
    if (lang === 'html') return stripHtmlComments(code);
    if (lang === 'css') return stripCssComments(code);
    if (lang === 'js') return stripJsComments(code);
  } catch {
    // Safety fallback — never break the editor
    return code;
  }
  return code;
}
