#!/usr/bin/env node
/**
 * foma-audit-cjs.cjs — Финальный аудит через CJS (без ESM regex-проблем)
 * Запуск: node scripts/foma-audit-cjs.cjs
 */

const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = 'content/lessons';
const C = {
  red:    s => `\x1b[31m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  green:  s => `\x1b[32m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
  gray:   s => `\x1b[90m${s}\x1b[0m`,
};

function parseStep(content) {
  const fmRaw = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmRaw) return null;
  let meta = {};
  try { meta = yaml.load(fmRaw[1]); } catch { return null; }
  const bodyMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  if (!bodyMatch) return null;
  const body = bodyMatch[1];
  const blocks = {};
  const re = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = re.exec(body)) !== null) blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
  const start = { html: blocks['html:start']??'', css: blocks['css:start']??'', js: blocks['js:start']??'' };
  const hasSol = 'html:solution' in blocks || 'css:solution' in blocks || 'js:solution' in blocks;
  const solution = hasSol
    ? { html: (blocks['html:solution']||'').trim()?blocks['html:solution']:start.html,
        css:  (blocks['css:solution'] ||'').trim()?blocks['css:solution'] :start.css,
        js:   (blocks['js:solution']  ||'').trim()?blocks['js:solution']  :start.js }
    : { ...start };
  return { highlight: meta?.highlight??null, start, solution, hasSol };
}

function norm(s) { return (s||'').replace(/\s+/g,' ').trim(); }
function hasKey(target, source) {
  if (!source.trim()||!target.trim()) return true;
  if (norm(source)===norm(target)) return true;
  const mid=Math.floor(source.length/2);
  const key=norm(source).slice(Math.max(0,mid-150),Math.min(norm(source).length,mid+150));
  return key.length<=20||norm(target).includes(key);
}

function diffLines(a, b) {
  const aSet = new Set((a||'').split('\n').map(l=>l.trim()).filter(Boolean));
  return (b||'').split('\n').map(l=>l.trim()).filter(l=>l&&!aSet.has(l)).length;
}

const stats = { pass:0, fail:0, CRITICAL:0, HIGH:0, MEDIUM:0, LOW:0 };
const highList = [];
let prevSolution=null, prevHighlight=null, prevLabel=null;

const dirs = fs.readdirSync(CONTENT_DIR,{withFileTypes:true}).filter(d=>d.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name));

for (const dir of dirs) {
  const lp = path.join(CONTENT_DIR, dir.name);
  const files = fs.readdirSync(lp).filter(f=>f.endsWith('.md')).sort();
  let wPass=0, wFail=0;

  for (let si=0; si<files.length; si++) {
    const label=`${dir.name}/${files[si]}`;
    const content=fs.readFileSync(path.join(lp,files[si]),'utf-8');
    const step=parseStep(content);
    if(!step){wFail++;stats.fail++;continue;}

    const issues=[];

    // Проверка связности
    if (prevSolution && si>0) {
      const filesToCheck = prevHighlight ? [prevHighlight] : ['html','css','js'];
      for (const file of filesToCheck) {
        const prevSol=prevSolution[file].trim();
        const curStart=step.start[file].trim();
        if(!prevSol||!curStart) continue;
        if(!hasKey(curStart,prevSol)) {
          issues.push({p:'HIGH', msg:`${file}:start ≠ ${file}:solution из ${prevLabel}`});
        }
      }
    }

    // diff=0 или нет solution
    if (step.hasSol) {
      const lang = step.highlight;
      if (lang && ['html','css','js'].includes(lang)) {
        const sd=diffLines(step.start[lang], step.solution[lang]);
        if (sd===0) issues.push({p:'MEDIUM', msg:'diff=0 (start===solution для '+lang+')'});
        if (sd>60) issues.push({p:'MEDIUM', msg:`Большой diff: +${sd} строк`});
      }
    }

    const maxPrio = issues.reduce((acc,i)=>{
      const ord={CRITICAL:0,HIGH:1,MEDIUM:2,LOW:3};
      return ord[i.p]<ord[acc]?i.p:acc;
    }, 'LOW');

    if (issues.length===0) {
      wPass++; stats.pass++;
      console.log(C.green(`  ✅ [${String(si+1).padStart(2,'0')}/${files.length}] ${files[si]} — PASS`));
    } else {
      wFail++; stats.fail++;
      const highCount=issues.filter(i=>i.p==='HIGH').length;
      const critCount=issues.filter(i=>i.p==='CRITICAL').length;
      const pLabel = critCount?'CRITICAL':highCount?'HIGH':maxPrio;
      const emoji = critCount?'🔴':highCount?'🟠':maxPrio==='MEDIUM'?'🟡':'🟢';
      console.log(C.yellow(`  ❌ [${String(si+1).padStart(2,'0')}/${files.length}] ${files[si]} — FAIL [${pLabel}]`));
      issues.forEach(i=>{
        const e=i.p==='CRITICAL'?'🔴':i.p==='HIGH'?'🟠':i.p==='MEDIUM'?'🟡':'🟢';
        console.log(`       ${e} [${i.p}] ${i.msg}`);
        stats[i.p]++;
        if(i.p==='HIGH') highList.push({label,msg:i.msg});
      });
    }

    prevSolution=step.solution;
    prevHighlight=step.highlight;
    prevLabel=label;
  }
  console.log(`  ── ${dir.name}: ${wPass} PASS, ${wFail} FAIL ──\n`);
}

console.log(C.bold('═'.repeat(55)));
console.log(C.bold('  Итог аудита (CJS — надёжный парсер)'));
console.log(C.bold('═'.repeat(55)));
console.log(C.green(`  PASS     : ${stats.pass}`));
console.log(       `  FAIL     : ${stats.fail}`);
console.log(C.red( `    🔴 CRITICAL : ${stats.CRITICAL}`));
console.log(       `    🟠 HIGH     : ${stats.HIGH}`);
console.log(       `    🟡 MEDIUM   : ${stats.MEDIUM}`);
console.log(       `    🟢 LOW      : ${stats.LOW}`);

if (highList.length>0) {
  console.log(C.bold('\n── HIGH детали ──'));
  highList.forEach(h=>{ console.log(`  📌 ${h.label}`); console.log(`     ${h.msg}`); });
}
