import fs from 'fs';
import path from 'path';

// Parse TS quiz files directly
const quizFiles = [
  'webinar-1.ts', 'webinar-2.ts', 'webinar-3.ts', 'webinar-4.ts', 'webinar-5.ts',
  'webinar-6.ts', 'webinar-7.ts', 'webinar-8.ts', 'webinar-9.ts', 'webinar-10.ts'
];

let totalCount = 0;
const errors = [];
const warnings = [];

for (const file of quizFiles) {
  const filePath = path.join('src/data/quizzes', file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Strip TS imports and types to evaluate as JS
  const jsContent = content
    .replace(/import\s+type\s+.*?;\s*/g, '')
    .replace(/:\s*QuizQuestion\[\]/g, '')
    .replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =');

  let questions;
  try {
    const fn = new Function(`${jsContent}; return ${file.replace('.ts', '').replace('-', '')}Questions || [];`);
    questions = fn();
  } catch (e) {
    errors.push(`[${file}] Syntax error executing quiz file: ${e.message}`);
    continue;
  }

  if (!Array.isArray(questions)) {
    errors.push(`[${file}] Export is not an array`);
    continue;
  }

  if (questions.length !== 25) {
    errors.push(`[${file}] Expected 25 questions, got ${questions.length}`);
  }

  totalCount += questions.length;
  const seenIds = new Set();

  questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const prefix = `[${file} Q#${qNum} ID:${q.id}]`;

    if (!q.id || seenIds.has(q.id)) {
      errors.push(`${prefix} Duplicate or missing ID: ${q.id}`);
    }
    seenIds.add(q.id);

    if (!q.topic || typeof q.topic !== 'string' || !q.topic.trim()) {
      errors.push(`${prefix} Missing or empty topic`);
    }

    if (!q.question || typeof q.question !== 'string' || !q.question.trim()) {
      errors.push(`${prefix} Missing or empty question`);
    }

    if (!Array.isArray(q.options)) {
      errors.push(`${prefix} options is not an array`);
      return;
    }

    if (q.options.length !== 4) {
      warnings.push(`${prefix} Expected 4 options, got ${q.options.length}`);
    }

    // Check empty or whitespace-only options
    q.options.forEach((opt, oIdx) => {
      if (typeof opt !== 'string' || !opt.trim()) {
        errors.push(`${prefix} Option #${oIdx} is empty or not string`);
      }
    });

    // Check duplicate options within question
    const uniqueOpts = new Set(q.options.map(o => (typeof o === 'string' ? o.trim() : '')));
    if (uniqueOpts.size !== q.options.length) {
      errors.push(`${prefix} Has DUPLICATE options: ${JSON.stringify(q.options)}`);
    }

    // Check correctIndex bounds
    if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
      errors.push(`${prefix} Invalid correctIndex: ${q.correctIndex} (options length: ${q.options.length})`);
    } else {
      const correctOption = q.options[q.correctIndex];
      // Check if explanation exists
      if (!q.explanation || typeof q.explanation !== 'string' || !q.explanation.trim()) {
        errors.push(`${prefix} Missing or empty explanation`);
      } else {
        // Check if explanation actually mentions or matches the correct answer
        // Note: explanation usually starts with "Правильный ответ: «...»"
        const explClean = q.explanation.toLowerCase();
        const optClean = correctOption.toLowerCase();
        // Extract first 15 chars of correct option (ignoring HTML tags or punctuation)
        const optCore = optClean.replace(/<[^>]+>/g, '').replace(/[«»"'`]/g, '').trim().slice(0, 20);
        if (optCore.length > 5 && !explClean.includes(optCore)) {
          warnings.push(`${prefix} Explanation might not match correct answer!\n  Option: "${correctOption}"\n  Explanation: "${q.explanation.slice(0, 100)}..."`);
        }
      }
    }
  });
}

console.log(`\n=== QUIZ AUDIT REPORT ===`);
console.log(`Total questions audited: ${totalCount}`);
console.log(`Total errors: ${errors.length}`);
console.log(`Total warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log('\n❌ ERRORS:');
  errors.forEach(e => console.log('  -', e));
} else {
  console.log('✅ No structural errors found in quizzes!');
}

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log('  -', w));
} else {
  console.log('✅ No warnings found in quizzes!');
}

if (errors.length > 0) {
  process.exit(1);
}
