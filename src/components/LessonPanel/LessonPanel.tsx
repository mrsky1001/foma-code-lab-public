import { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import createElement from 'react-syntax-highlighter/dist/esm/create-element';
import { Eye, EyeOff, ChevronLeft, ChevronRight, BookOpen, Wrench, Copy, Check, FileCode, Lock, CheckCheck, AlertCircle } from 'lucide-react';
import type { Lesson, LessonStep } from '../../types/lesson';
import { analyzeStepSolution } from '../../utils/codeDiff';
import { hasCodeTask } from '../../utils/codeMatch';
import { pluralize } from '../../utils/pluralize';
import './LessonPanel.css';

// Custom dark theme that matches the app's color palette
const appCodeTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '13px',
    lineHeight: '1.6', background: 'transparent',
  },
  'pre[class*="language-"]': { background: 'transparent', margin: 0, padding: 0 },
  comment: { color: '#6b7280', fontStyle: 'italic' },
  prolog: { color: '#6b7280' },
  doctype: { color: '#6b7280' },
  cdata: { color: '#6b7280' },
  punctuation: { color: '#94a3b8' },
  property: { color: '#a78bfa' },      // purple — css properties
  keyword: { color: '#38bdf8' },        // blue — html tags, js keywords
  tag: { color: '#f472b6' },            // pink — html tags
  'attr-name': { color: '#a78bfa' },    // purple — html attributes
  'attr-value': { color: '#fcd34d' },   // yellow — string values
  string: { color: '#fcd34d' },         // yellow — strings
  selector: { color: '#38bdf8' },       // blue — css selectors
  'class-name': { color: '#4ade80' },   // green — class names
  function: { color: '#4ade80' },       // green — js functions
  number: { color: '#fb923c' },         // orange — numbers
  operator: { color: '#94a3b8' },       // gray — operators
  boolean: { color: '#fb923c' },        // orange — true/false
  variable: { color: '#e2e8f0' },       // white — variables
  builtin: { color: '#4ade80' },        // green — built-ins
  unit: { color: '#fb923c' },           // orange — css units
  important: { color: '#f87171', fontWeight: 'bold' },
  atrule: { color: '#38bdf8' },         // blue — @media, @keyframes
  'rule-name': { color: '#38bdf8' },
};

interface TheoryCodeBlockProps {
  language: string;
  code: string;
}

function TheoryCodeBlock({ language, code }: TheoryCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const cleanCode = code.replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="theory-code-block">
      <div className="theory-code-header">
        <div className="theory-code-header-left">
          <span className="theory-code-lang">{language.toUpperCase()}</span>
        </div>
        <div className="theory-code-header-actions">
          <button
            type="button"
            className="btn-code-action"
            onClick={handleCopy}
            title="Скопировать код"
          >
            {copied ? <Check size={13} strokeWidth={1.5} color="#4ade80" /> : <Copy size={13} strokeWidth={1.5} />}
            <span>{copied ? 'Скопировано' : 'Копия'}</span>
          </button>
        </div>
      </div>
      <div className="theory-code-body">
        <SyntaxHighlighter
          language={language}
          style={appCodeTheme}
          useInlineStyles={true}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '12.5px',
            lineHeight: '1.6',
          }}
          renderer={({ rows, stylesheet, useInlineStyles }) => {
            return (
              <div className="theory-code-lines">
                {rows.map((rowNode, i) => {
                  const lineContent = createElement({
                    node: rowNode,
                    stylesheet,
                    useInlineStyles,
                    key: `code-line-${i}`,
                  });
                  return (
                    <div key={i} className="theory-code-row">
                      <span className="theory-line-num">{i + 1}</span>
                      <div className="theory-line-content">{lineContent}</div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        >
          {cleanCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function getFileLabel(lang: 'html' | 'css' | 'js', htmlCode: string): string {
  if (lang === 'css') return 'style.css';
  if (lang === 'js') return 'main.js';
  if (htmlCode.includes('Вход — СмартОфис') || (htmlCode.includes('form-card') && htmlCode.includes('id="login"'))) return 'login.html';
  if (htmlCode.includes('Регистрация — СмартОфис') || htmlCode.includes('id="confirmPassword"')) return 'register.html';
  if (htmlCode.includes('Каталог офисов') || htmlCode.includes('catalog.html')) return 'catalog.html';
  if (htmlCode.includes('room.html') || htmlCode.includes('Детали офиса')) return 'room.html';
  return 'index.html';
}

interface LessonPanelProps {
  lesson: Lesson;
  step: LessonStep;
  stepIndex: number;
  totalSteps: number;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  hasPrevLesson: boolean;
  hasNextLesson: boolean;
  isNextLessonAccessible?: boolean;
  isShowingSolution: boolean;
  onToggleSolution: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onPrevLesson: () => void;
  onNextLesson: () => void;
  onGoToStep: (idx: number) => void;
  // Quiz props
  hasQuiz?: boolean;
  isLessonUnlocked?: boolean;
  quizCompleted?: boolean;
  onStartQuiz?: () => void;
  onForceCompleteQuiz?: () => void;
  // Step progression & similarity
  isCurrentStepCompleted?: boolean;
  taskSimilarity?: number;
  onCheckSolution?: () => void;
  checkStatus?: 'idle' | 'success' | 'error';
}

export function LessonPanel({
  step,
  stepIndex,
  totalSteps,
  hasPrevStep,
  hasNextStep,
  hasPrevLesson,
  hasNextLesson,
  isNextLessonAccessible = true,
  isShowingSolution,
  onToggleSolution,
  onPrevStep,
  onNextStep,
  onPrevLesson,
  onNextLesson,
  onGoToStep,
  hasQuiz = false,
  isLessonUnlocked = false,
  quizCompleted = false,
  onStartQuiz,
  onForceCompleteQuiz,
  isCurrentStepCompleted = true,
  taskSimilarity = 0,
  onCheckSolution,
  checkStatus = 'idle',
}: LessonPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const previewBodyRef = useRef<HTMLDivElement>(null);
  const [snippetCopied, setSnippetCopied] = useState(false);

  // Scroll to top when switching steps
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [stepIndex]);

  // Diff analysis for solution preview
  const analysis = useMemo(() => {
    return analyzeStepSolution(step.startCode, step.solutionCode, step.highlight, step.title);
  }, [step]);

  // Target file is strictly the one being modified in this step
  const targetLang = step.highlight || analysis.primaryLang;
  const curRange = analysis.ranges[targetLang];
  const fullLines = (curRange.cleanCode || '').split('\n');
  const fromLine = curRange.hasChanges ? Math.max(1, curRange.fromLine) : 1;
  const toLine = curRange.hasChanges ? Math.min(fullLines.length, curRange.toLine) : fullLines.length;
  const snippet = curRange.hasChanges
    ? fullLines.slice(fromLine - 1, toLine).join('\n')
    : curRange.cleanCode;

  const fileName = getFileLabel(targetLang, step.solutionCode.html);

  useEffect(() => {
    setSnippetCopied(false);
    if (previewBodyRef.current) {
      previewBodyRef.current.scrollTop = 0;
    }
  }, [stepIndex, isShowingSolution]);

  // Scroll to solution section when it becomes visible
  useEffect(() => {
    if (isShowingSolution && solutionRef.current) {
      solutionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isShowingSolution]);

  const hasTask = useMemo(() => {
    return step.type === 'practice' || hasCodeTask(step.startCode, step.solutionCode);
  }, [step.type, step.startCode, step.solutionCode]);

  const isTheory = step.type === 'theory';

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setSnippetCopied(true);
      setTimeout(() => setSnippetCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const target = Math.min(totalSteps - 1, Math.floor(ratio * totalSteps));
    onGoToStep(target);
  };

  return (
    <>
      <div className="panel-header">
        <div className="panel-header-info">
          <div className="panel-header-badges">
            <span className="step-badge">Шаг {stepIndex + 1}/{totalSteps}</span>
            <span className={`step-type-badge ${isTheory ? 'theory' : 'practice'}`}>
              {isTheory ? <BookOpen size={11} /> : <Wrench size={11} />}
              {isTheory ? 'Теория' : 'Практика'}
            </span>
          </div>
          <span className="panel-header-title" title={step.title}>
            {step.title}
          </span>
        </div>

        {totalSteps <= 8 ? (
          <div className="step-indicator" role="tablist" aria-label="Шаги урока">
            {Array.from({ length: totalSteps }, (_, i) => {
              const dotType = i === stepIndex ? step.type : undefined;
              return (
                <button
                  key={i}
                  className={`step-dot ${i === stepIndex ? 'active' : ''} ${i < stepIndex ? 'completed' : ''}${dotType ? ` dot-${dotType}` : ''}`}
                  onClick={() => onGoToStep(i)}
                  title={`Шаг ${i + 1}`}
                  id={`step-dot-${i}`}
                  aria-label={`Перейти к шагу ${i + 1}`}
                />
              );
            })}
          </div>
        ) : (
          <div
            className="step-progress-wrapper"
            onClick={handleProgressClick}
            title={`Шаг ${stepIndex + 1} из ${totalSteps} (${Math.round(((stepIndex + 1) / totalSteps) * 100)}%) — нажмите для перехода`}
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`Шаг ${stepIndex + 1} из ${totalSteps}`}
          >
            <div className="step-progress-track">
              <div
                className={`step-progress-fill ${isTheory ? 'theory' : 'practice'}`}
                style={{ width: `${Math.round(((stepIndex + 1) / totalSteps) * 100)}%` }}
              />
            </div>
            <span className="step-progress-percent">
              {Math.round(((stepIndex + 1) / totalSteps) * 100)}%
            </span>
          </div>
        )}
      </div>
      <div className="lesson-panel" ref={panelRef}>
        <div className="md-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ ...props }) => (
                <div className="table-container">
                  <table {...props} />
                </div>
              ),
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                if (isInline) {
                  return <code className="md-inline-code" {...props}>{children}</code>;
                }
                const lang = match[1] || 'text';
                const codeString = String(children);
                return <TheoryCodeBlock language={lang} code={codeString} />;
              },
            }}
          >
            {step.explanation}
          </ReactMarkdown>
        </div>
        {hasTask && (
          <div className="task-progress-box" id="task-progress-box">
            <div className="task-progress-header">
              <span className="task-progress-label">
                {taskSimilarity >= 80 || isShowingSolution ? 'Задание выполнено' : 'Процент выполнения задания'}
              </span>
              <span className={`task-progress-pct ${(taskSimilarity >= 80 || isShowingSolution) ? 'done' : ''}`}>
                {isShowingSolution ? '100%' : `${taskSimilarity}%`}
              </span>
            </div>
            <div className="task-progress-bar">
              <div
                className={`task-progress-fill ${(taskSimilarity >= 80 || isShowingSolution) ? 'done' : ''}`}
                style={{ width: `${isShowingSolution ? 100 : taskSimilarity}%` }}
              />
            </div>
          </div>
        )}
        {hasTask && (
          <div className="lesson-solution-section" ref={solutionRef}>
            <div className="lesson-solution-toolbar">
              <span className="lesson-solution-title">{isTheory ? 'Решение и проверка' : 'Готовое решение'}</span>
              <div className="lesson-solution-btn-group">
                {onCheckSolution && (
                  <button
                    type="button"
                    className={`btn btn-sm btn-check ${
                      checkStatus === 'success'
                        ? 'passed'
                        : checkStatus === 'error'
                        ? 'failed'
                        : ''
                    }`}
                    onClick={onCheckSolution}
                    id="check-solution-btn"
                    title={
                      checkStatus === 'success'
                        ? `Верно (${taskSimilarity}%)`
                        : checkStatus === 'error'
                        ? `Не верно (${taskSimilarity}%, порог 80%)`
                        : 'Проверить'
                    }
                  >
                    {checkStatus === 'success' ? (
                      <Check size={13} strokeWidth={2} />
                    ) : checkStatus === 'error' ? (
                      <AlertCircle size={13} strokeWidth={1.5} />
                    ) : (
                      <CheckCheck size={13} strokeWidth={1.5} />
                    )}
                    <span>
                      {checkStatus === 'success'
                        ? 'Верно'
                        : checkStatus === 'error'
                        ? 'Не верно'
                        : 'Проверить'}
                    </span>
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-solution"
                  onClick={onToggleSolution}
                  id="show-solution-btn"
                  title={isShowingSolution ? "Вернуться к вашему коду" : "Показать правильное решение этого шага"}
                >
                  {isShowingSolution ? <EyeOff size={13} strokeWidth={1.5} /> : <Eye size={13} strokeWidth={1.5} />}
                  <span>{isShowingSolution ? "Скрыть решение" : "Показать решение"}</span>
                </button>
              </div>
            </div>

            {isShowingSolution && (
              <div className="lesson-solution-preview" id="lesson-solution-preview">
                <div className="solution-preview-header">
                  <div className="solution-preview-file-info">
                    <FileCode size={13} strokeWidth={1.5} />
                    <span className="solution-file-name">{fileName}</span>
                    <span className="solution-preview-lines-range">
                      {curRange.hasChanges
                        ? `Строки ${fromLine}–${toLine}`
                        : pluralize(fullLines.length, 'строка', 'строки', 'строк')}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-code-action"
                    onClick={handleCopySnippet}
                    title="Скопировать вставляемый код"
                  >
                    {snippetCopied ? (
                      <Check size={12} strokeWidth={1.5} color="#4ade80" />
                    ) : (
                      <Copy size={12} strokeWidth={1.5} />
                    )}
                    <span>{snippetCopied ? 'Скопировано' : 'Копия'}</span>
                  </button>
                </div>

                <div className="solution-preview-body" ref={previewBodyRef}>
                  <SyntaxHighlighter
                    language={targetLang}
                    style={appCodeTheme}
                    useInlineStyles={true}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                      fontSize: '12.5px',
                      lineHeight: '1.6',
                    }}
                    renderer={({ rows, stylesheet, useInlineStyles }) => {
                      return (
                        <div className="theory-code-lines">
                          {rows.map((rowNode, i) => {
                            const lineContent = createElement({
                              node: rowNode,
                              stylesheet,
                              useInlineStyles,
                              key: `sol-line-${i}`,
                            });
                            return (
                              <div key={i} className="theory-code-row">
                                <span className="theory-line-num">{fromLine + i}</span>
                                <div className="theory-line-content">{lineContent}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  >
                    {snippet}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="lesson-panel-footer">
        <div className="lesson-panel-footer-left">
          {hasPrevStep ? (
            <button className="btn btn-sm" onClick={onPrevStep} id="prev-step-btn" title="Предыдущий шаг">
              <ChevronLeft size={14} />
              Назад
            </button>
          ) : hasPrevLesson ? (
            <button className="btn btn-sm" onClick={onPrevLesson} id="prev-lesson-btn" title="Предыдущий модуль">
              <ChevronLeft size={14} />
              Пред. модуль
            </button>
          ) : null}
        </div>
        <div className="lesson-panel-footer-right" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {(() => {
            const canGoNext = Boolean(isCurrentStepCompleted || (hasTask ? taskSimilarity >= 80 : true));
            if (hasNextStep) {
              return (
                <button
                  className={`btn btn-sm ${canGoNext ? 'btn-accent' : ''}`}
                  style={!canGoNext ? { opacity: 0.45, cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: 6 } : undefined}
                  onClick={canGoNext ? onNextStep : undefined}
                  disabled={!canGoNext}
                  id="next-step-btn"
                  title={!canGoNext
                    ? hasTask
                      ? `Сначала выполните задание (прогресс ${taskSimilarity}%, порог 80%) или нажмите «Показать решение»`
                      : 'Сначала изучите материал'
                    : 'Следующий шаг'
                  }
                >
                  {!canGoNext && <Lock size={12} strokeWidth={1.5} />}
                  Далее
                  {canGoNext && <ChevronRight size={14} />}
                </button>
              );
            }
            if (hasNextLesson) {
              const canGoNextLesson = Boolean(isNextLessonAccessible || canGoNext);
              return (
                <button
                  className={`btn btn-sm ${canGoNextLesson ? 'btn-accent' : ''}`}
                  style={!canGoNextLesson ? { opacity: 0.45, cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: 6 } : undefined}
                  onClick={canGoNextLesson ? onNextLesson : undefined}
                  disabled={!canGoNextLesson}
                  id="next-lesson-btn"
                  title={!canGoNextLesson ? 'Сдайте тест текущего модуля, чтобы открыть следующий' : 'Следующий модуль'}
                >
                  {!canGoNextLesson && <Lock size={12} strokeWidth={1.5} />}
                  След. модуль
                  {canGoNextLesson && <ChevronRight size={14} />}
                </button>
              );
            }
            return null;
          })()}
          {hasQuiz && !hasNextStep && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <button
                className="btn btn-sm"
                style={isLessonUnlocked
                  ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(99,102,241,0.4)', fontWeight: 600, width: '100%' }
                  : { opacity: 0.45, cursor: 'not-allowed', width: '100%' }
                }
                onClick={isLessonUnlocked ? onStartQuiz : undefined}
                disabled={!isLessonUnlocked}
                id="start-quiz-btn"
                title={!isLessonUnlocked ? 'Завершите все уроки для доступа к тесту' : quizCompleted ? 'Пройти тест снова' : 'Пройти тест по модулю'}
              >
                {quizCompleted ? '★ Тест снова' : '★ Пройти тест'}
              </button>
              {import.meta.env.DEV && onForceCompleteQuiz && !quizCompleted && (
                <button
                  className="btn btn-sm"
                  style={{ background: '#10b981', color: '#fff', border: 'none', fontWeight: 600, width: '100%' }}
                  onClick={onForceCompleteQuiz}
                  title="Автоматически пройти тест (DEV)"
                >
                  <CheckCheck size={14} style={{ marginRight: '4px' }} />
                  Пройти тест (ADMIN)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
