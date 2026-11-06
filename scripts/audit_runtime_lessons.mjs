import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

// Strip comments
function stripComments(code, lang) {
  if (!code) return '';
  let clean = code;
  if (lang === 'html') clean = clean.replace(/<!--[\s\S]*?-->/g, '');
  clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
  if (lang === 'js') clean = clean.replace(/\/\/.*$/gm, '');
  return clean;
}

function normalizeQuotes(code) {
  if (!code) return '';
  let res = code
    .replace(/[\u201C\u201D\u00AB\u00BB]/g, '"')
    .replace(/[\u2018\u2019]/g, "'");

  res = res.replace(/`([^`\\$]*(?:\\.[^`\\$]*)*)`/g, (match, inner) => {
    if (match.includes('${') || match.includes('\n')) return match;
    const escapedInner = inner.replace(/"/g, '\\"');
    return `"${escapedInner}"`;
  });

  res = res.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_match, inner) => {
    const unescapedSingle = inner.replace(/\\'/g, "'");
    const escapedDouble = unescapedSingle.replace(/"/g, '\\"');
    return `"${escapedDouble}"`;
  });

  return res;
}

function normalizeCode(code, lang) {
  const noComments = stripComments(code, lang);
  const normalizedQuotes = normalizeQuotes(noComments);
  return normalizedQuotes.replace(/\s+/g, ' ').trim();
}

function tokenize(code) {
  if (!code) return [];
  const matches = code.match(/[a-zA-Z0-9_\u0400-\u04FF\-]+|[<>{}/=;:"'`().,#%]/g);
  if (!matches) return [];
  return matches.map(t => (t === "'" || t === '`' ? '"' : t));
}

function calculateCodeSimilarity(userCode, startCode, solutionCode, primaryLang) {
  const langs = ['html', 'css', 'js'];
  
  const changedLangs = langs.filter(lang => {
    const sNorm = normalizeCode(startCode[lang] || '', lang);
    const solNorm = normalizeCode(solutionCode[lang] || '', lang);
    return sNorm !== solNorm;
  });

  if (changedLangs.length === 0) return 100;

  const targetLangs = primaryLang && changedLangs.includes(primaryLang)
    ? [primaryLang]
    : changedLangs;

  let totalPct = 0;

  for (const lang of targetLangs) {
    const startNorm = normalizeCode(startCode[lang] || '', lang);
    const solNorm = normalizeCode(solutionCode[lang] || '', lang);
    const userNorm = normalizeCode(userCode[lang] || '', lang);

    if (userNorm === solNorm) {
      totalPct += 100;
      continue;
    }

    if (userNorm === startNorm) {
      totalPct += 0;
      continue;
    }

    const startTokens = tokenize(startNorm);
    const solTokens = tokenize(solNorm);
    const userTokens = tokenize(userNorm);

    const startFreq = new Map();
    for (const t of startTokens) {
      startFreq.set(t, (startFreq.get(t) || 0) + 1);
    }

    const expectedFreq = new Map();
    const startFreqCopy = new Map(startFreq);
    for (const t of solTokens) {
      const inStart = startFreqCopy.get(t) || 0;
      if (inStart > 0) {
        startFreqCopy.set(t, inStart - 1);
      } else {
        expectedFreq.set(t, (expectedFreq.get(t) || 0) + 1);
      }
    }

    let totalExpected = 0;
    for (const count of expectedFreq.values()) {
      totalExpected += count;
    }

    if (totalExpected === 0) {
      totalPct += userNorm.length > 0 ? 50 : 0;
      continue;
    }

    const userFreqCopy = new Map(startFreq);
    const userAddedFreq = new Map();
    for (const t of userTokens) {
      const inStart = userFreqCopy.get(t) || 0;
      if (inStart > 0) {
        userFreqCopy.set(t, inStart - 1);
      } else {
        userAddedFreq.set(t, (userAddedFreq.get(t) || 0) + 1);
      }
    }

    let matchedTokens = 0;
    for (const [token, expCount] of expectedFreq.entries()) {
      const uCount = userAddedFreq.get(token) || 0;
      matchedTokens += Math.min(expCount, uCount);
    }

    let pct = Math.min(100, Math.round((matchedTokens / totalExpected) * 100));

    const requiredKeywords = [...expectedFreq.keys()].filter(t =>
      /^[a-zA-Z\u0400-\u04FF]/.test(t)
    );
    const missingKeywords = requiredKeywords.filter(t => (userAddedFreq.get(t) || 0) === 0);
    if (missingKeywords.length > 0 && requiredKeywords.length > 0) {
      const presentRatio = (requiredKeywords.length - missingKeywords.length) / requiredKeywords.length;
      const proportionalCap = Math.floor(presentRatio * 79);
      pct = Math.min(pct, Math.max(proportionalCap, 10));
    }

    totalPct += pct;
  }

  return Math.round(totalPct / targetLangs.length);
}

function parseMdStep(content, filePath) {
  content = content.replace(/^\uFEFF/, '');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) throw new Error(`No YAML front-matter in ${filePath}`);

  const meta = yaml.load(fmMatch[1]) || {};
  const body = fmMatch[2];

  const firstBlockIdx = body.search(/^```\w+:(start|solution)/m);
  const explanation = (firstBlockIdx === -1 ? body : body.slice(0, firstBlockIdx)).trim();

  const codeBlocks = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let match;
  while ((match = blockRe.exec(body)) !== null) {
    const [, lang, variant, code] = match;
    codeBlocks[`${lang}:${variant}`] = code.trimEnd();
  }

  const startCode = {
    html: codeBlocks['html:start'] ?? '',
    css:  codeBlocks['css:start']  ?? '',
    js:   codeBlocks['js:start']   ?? '',
  };

  const hasSolutionBlock =
    codeBlocks['html:solution'] !== undefined ||
    codeBlocks['css:solution']  !== undefined ||
    codeBlocks['js:solution']   !== undefined;

  const solutionCode = hasSolutionBlock
    ? {
        html: (codeBlocks['html:solution'] && codeBlocks['html:solution'].trim())
          ? codeBlocks['html:solution']
          : startCode.html,
        css: (codeBlocks['css:solution'] && codeBlocks['css:solution'].trim())
          ? codeBlocks['css:solution']
          : startCode.css,
        js: (codeBlocks['js:solution'] && codeBlocks['js:solution'].trim())
          ? codeBlocks['js:solution']
          : startCode.js,
      }
    : { ...startCode };

  return {
    title: String(meta.title ?? ''),
    explanation,
    startCode,
    solutionCode,
    highlight: meta.highlight,
    type: meta.type,
    file: path.basename(filePath),
  };
}

function loadAllLessons(contentDir) {
  const lessonDirs = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  const lessons = [];

  for (const dir of lessonDirs) {
    const lessonPath = path.join(contentDir, dir.name);
    const metaPath = path.join(lessonPath, '_lesson.yml');
    if (!fs.existsSync(metaPath)) continue;
    const meta = yaml.load(fs.readFileSync(metaPath, 'utf-8')) || {};

    const stepFiles = fs.readdirSync(lessonPath)
      .filter(f => f.endsWith('.md'))
      .sort();

    const steps = [];
    for (const stepFile of stepFiles) {
      const stepPath = path.join(lessonPath, stepFile);
      const step = parseMdStep(fs.readFileSync(stepPath, 'utf-8'), stepPath);
      steps.push(step);
    }

    lessons.push({
      id: Number(meta.id ?? 0),
      dir: dir.name,
      title: String(meta.title ?? dir.name),
      steps,
    });
  }

  return lessons;
}

function stepType(step, lessonId) {
  if (step.type) return step.type;
  return lessonId === 1 ? 'theory' : 'practice';
}

function isDataJs(code) {
  if (!code) return false;
  return (
    /const\s+(?:OFFICE_ROOMS|MOCK_BOOKINGS)\b/.test(code) &&
    !/addEventListener|DOMContentLoaded|function\s+init/i.test(code)
  );
}

function accumulatePractice(allLessons) {
  let prevPractice = { html: '', css: '', js: '' };
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

      step.startCode = { ...prevPractice };
      if (stepIsDataJs) {
        if (prevDataJs) step.startCode.js = prevDataJs;
      } else {
        if (prevMainJs) step.startCode.js = prevMainJs;
      }

      const currentPrevJs = stepIsDataJs
        ? (prevDataJs || prevPractice.js)
        : (prevMainJs || prevPractice.js);

      step.solutionCode = {
        html: step.solutionCode.html?.trim() ? step.solutionCode.html : prevPractice.html,
        css:  step.solutionCode.css?.trim()  ? step.solutionCode.css  : prevPractice.css,
        js:   step.solutionCode.js?.trim()   ? step.solutionCode.js   : currentPrevJs,
      };

      if (step.highlight) {
        const otherLangs = ['html', 'css', 'js'].filter(l => l !== step.highlight);
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

// RUN AUDIT
const lessons = accumulatePractice(loadAllLessons('content/lessons'));

console.log(`Loaded ${lessons.length} lessons with practice accumulation.`);

const issues = [];

for (const lesson of lessons) {
  for (const step of lesson.steps) {
    if (step.type === 'theory') continue;

    const langs = ['html', 'css', 'js'];
    const diffLangs = langs.filter(l => {
      const s = normalizeCode(step.startCode[l], l);
      const sol = normalizeCode(step.solutionCode[l], l);
      return s !== sol;
    });

    const taskMatch = step.explanation.match(/##\s*🛠?\s*Задание([\s\S]*)$/i) || step.explanation.match(/###\s*Задание([\s\S]*)$/i);
    const taskText = taskMatch ? taskMatch[1].trim() : '';

    // Check 1: ZERO DIFF TASK in practice
    if (diffLangs.length === 0) {
      issues.push({
        lesson: lesson.dir,
        file: step.file,
        title: step.title,
        type: 'ZERO_DIFF_PRACTICE',
        msg: `Практический шаг НЕ ИМЕЕТ различий между startCode и solutionCode! Студенту нечего делать.`,
      });
    }

    // Check 2: Highlighted lang has no diff
    if (step.highlight && !diffLangs.includes(step.highlight)) {
      issues.push({
        lesson: lesson.dir,
        file: step.file,
        title: step.title,
        type: 'HIGHLIGHT_NO_DIFF',
        msg: `Указан highlight: '${step.highlight}', но в этом файле нет изменений! Изменения в: [${diffLangs.join(', ')}]`,
      });
    }

    // Check 3: Missing task header
    if (!taskMatch) {
      issues.push({
        lesson: lesson.dir,
        file: step.file,
        title: step.title,
        type: 'NO_TASK_HEADER',
        msg: `Нет заголовка ## 🛠 Задание в практическом шаге`,
      });
    } else {
      // Check 4: Task ends with colon or doesn't show what to insert
      // Look for code fences or inline backticks in taskText
      const hasCodeBlock = /```[\s\S]*?```/.test(taskText);
      const hasInlineCode = /`[^`\n]{3,}`/.test(taskText);

      if (!hasCodeBlock && !hasInlineCode) {
        issues.push({
          lesson: lesson.dir,
          file: step.file,
          title: step.title,
          type: 'NO_CODE_IN_TASK',
          msg: `В задании нет ни блока кода, ни инлайн-кода для вставки! Текст: "${taskText.slice(0, 70)}..."`,
        });
      }

      if (/(?:HTML|CSS|JS|следующий код):\s*$/i.test(taskText) && !hasCodeBlock) {
        issues.push({
          lesson: lesson.dir,
          file: step.file,
          title: step.title,
          type: 'TASK_TRUNCATED_COLON',
          msg: `Задание заканчивается двоеточием, но блок кода отсутствует! Текст: "${taskText.slice(-50)}"`,
        });
      }
    }

    // Check 5: Solution similarity
    const solSim = calculateCodeSimilarity(step.solutionCode, step.startCode, step.solutionCode, step.highlight);
    if (solSim < 100) {
      issues.push({
        lesson: lesson.dir,
        file: step.file,
        title: step.title,
        type: 'SOLUTION_NOT_100',
        msg: `solutionCode даёт сходство ${solSim}% вместо 100%`,
      });
    }
  }
}

console.log(`\n========================================`);
console.log(`Total runtime issues found: ${issues.length}`);
console.log(`========================================\n`);

const byType = {};
issues.forEach(i => {
  byType[i.type] = (byType[i.type] || 0) + 1;
  console.log(`[${i.lesson}/${i.file}] (${i.type}): ${i.msg}`);
});

console.log('\nBreakdown:', byType);

if (issues.length > 0) {
  fs.writeFileSync('runtime_audit_issues.json', JSON.stringify(issues, null, 2), 'utf-8');
  process.exit(1);
} else {
  if (fs.existsSync('runtime_audit_issues.json')) {
    fs.unlinkSync('runtime_audit_issues.json');
  }
}
