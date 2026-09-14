import { useState, useEffect, useCallback, useRef } from "react";
import { X, Send, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldAlert, Check, RefreshCw, CheckCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { type QuizQuestion, type QuizResult, ACHIEVEMENT_RANKS } from "../../types/quiz";
import { pluralize } from "../../utils/pluralize";
import "./QuizPanel.css";

interface Props {
  lessonId: number;
  lessonTitle: string;
  questions: QuizQuestion[];
  onClose: () => void;
  onComplete: (result: QuizResult) => void;
  /** If true, show "locked" message instead of quiz */
  locked?: boolean;
  /** If true, directly render a 100% passed result (used for dev preview) */
  initialResult?: boolean;
}

const LETTERS = ["A", "B", "C", "D"];
const QUIZ_TIME_SECONDS = 25 * 60; // 25 minutes

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function QuizPanel({ lessonId, lessonTitle, questions, onClose, onComplete, locked, initialResult }: Props) {
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(() => {
    if (initialResult && questions.length > 0) {
      return {
        lessonId,
        score: questions.length,
        total: questions.length,
        timestamp: Date.now(),
        passed: true,
        questionResults: questions.map(q => ({
          questionId: q.id,
          topic: q.topic,
          question: q.question,
          isCorrect: true,
          userAnswer: q.options[q.correctIndex],
          correctAnswer: q.options[q.correctIndex],
        }))
      };
    }
    return null;
  });

  // Synchronize result if initialResult or questions change
  useEffect(() => {
    if (initialResult && questions.length > 0) {
      setResult({
        lessonId,
        score: questions.length,
        total: questions.length,
        timestamp: Date.now(),
        passed: true,
        questionResults: questions.map(q => ({
          questionId: q.id,
          topic: q.topic,
          question: q.question,
          isCorrect: true,
          userAnswer: q.options[q.correctIndex],
          correctAnswer: q.options[q.correctIndex],
        }))
      });
    }
  }, [initialResult, questions, lessonId]);

  const handleCompleteInternal = useCallback((res: QuizResult) => {
    setResult(res);
    onComplete(res);
  }, [onComplete]);

  const handleRetry = useCallback(() => {
    setResult(null);
    setStarted(false);
  }, []);

  // ── Locked state ────────────────────────────────────────────────
  if (locked) {
    return (
      <div className="quiz-panel">
        <div className="quiz-panel-header">
          <div className="quiz-panel-header-top">
            <span className="quiz-panel-title">Тест — {lessonTitle}</span>
            <button className="quiz-panel-close" onClick={onClose} aria-label="Закрыть">
              <X size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="quiz-panel-body" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div className="quiz-locked-icon">
            <ShieldAlert size={40} strokeWidth={1.2} />
          </div>
          <p className="quiz-locked-title">Тест пока недоступен</p>
          <p className="quiz-locked-desc">
            Для прохождения теста необходимо выполнить все уроки модуля.
          </p>
        </div>
      </div>
    );
  }

  // ── Result screen ───────────────────────────────────────────────
  if (result) {
    return (
      <QuizPanelResult
        result={result}
        lessonTitle={lessonTitle}
        onClose={onClose}
        onRetry={handleRetry}
      />
    );
  }

  // ── Pre-start screen ────────────────────────────────────────────
  if (!started) {
    return (
      <div className="quiz-panel">
        <div className="quiz-panel-header">
          <div className="quiz-panel-header-top">
            <span className="quiz-panel-title">Тест — {lessonTitle}</span>
            <button className="quiz-panel-close" onClick={onClose} aria-label="Закрыть">
              <X size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="quiz-panel-body" style={{ justifyContent: "center", alignItems: "center", textAlign: "center", gap: 20 }}>
          <div className="quiz-prestart-icon">
            <AlertTriangle size={36} strokeWidth={1.3} />
          </div>
          <p className="quiz-prestart-title">Правила прохождения теста</p>
          <div className="quiz-prestart-rules">
            <div className="quiz-prestart-rule">
              <Clock size={14} />
              <span>На выполнение теста даётся <strong>25 минут</strong></span>
            </div>
            <div className="quiz-prestart-rule">
              <AlertTriangle size={14} />
              <span>Нельзя переключаться на другие вкладки или приложения — <strong>тест будет сброшен</strong></span>
            </div>
            <div className="quiz-prestart-rule">
              <ShieldAlert size={14} />
              <span>Нельзя переходить на другие уроки во время теста — <strong>тест будет сброшен</strong></span>
            </div>
          </div>
          <p className="quiz-prestart-count">
            {pluralize(questions.length, 'вопрос', 'вопроса', 'вопросов')} с вариантами ответа
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <button
              className="quiz-prestart-start-btn"
              onClick={() => setStarted(true)}
              id="quiz-start-btn"
            >
              Начать тест
            </button>
            {import.meta.env.DEV && (
              <button
                className="quiz-prestart-start-btn"
                style={{ background: '#10b981', color: '#fff', border: 'none', fontWeight: 600, width: '100%', padding: '12px 24px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => {
                  handleCompleteInternal({
                    lessonId,
                    score: questions.length,
                    total: questions.length,
                    timestamp: Date.now(),
                    passed: true,
                    questionResults: questions.map(q => ({
                      questionId: q.id,
                      topic: q.topic,
                      question: q.question,
                      isCorrect: true,
                      userAnswer: q.options[q.correctIndex],
                      correctAnswer: q.options[q.correctIndex]
                    }))
                  });
                }}
                title="Автоматически пройти тест (DEV)"
              >
                <CheckCheck size={16} style={{ marginRight: '6px' }} />
                Пройти тест (ADMIN)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Timer ───────────────────────────────────────────────────────
  // (moved to a wrapper to avoid hooks-after-early-return issue)
  return (
    <QuizPanelActive
      lessonId={lessonId}
      lessonTitle={lessonTitle}
      questions={questions}
      onClose={onClose}
      onComplete={handleCompleteInternal}
    />
  );
}

/** The actual quiz UI with timer — rendered only after "start" */
function QuizPanelActive({
  lessonId,
  lessonTitle,
  questions,
  onClose,
  onComplete,
}: Omit<Props, "locked">) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = questions[current];
  const total = questions.length;
  const answered = Object.keys(answers).length;
  const progressPct = ((current + 1) / total) * 100;

  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up — auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Auto-submit when time runs out
  const doSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    let score = 0;
    const questionResults: QuizResult["questionResults"] = [];
    questions.forEach((q, idx) => {
      const selectedIdx = answers[idx];
      const isCorrect = selectedIdx === q.correctIndex;
      if (isCorrect) score++;
      questionResults.push({
        questionId: q.id,
        topic: q.topic,
        question: q.question,
        isCorrect,
        userAnswer: selectedIdx !== undefined ? q.options[selectedIdx] : '— (пропущен)',
        correctAnswer: q.options[q.correctIndex],
      });
    });
    
    const passed = (score / questions.length) >= 0.75;
    
    onComplete({
      lessonId,
      score,
      total: questions.length,
      timestamp: Date.now(),
      passed,
      questionResults,
    });
  }, [questions, answers, lessonId, onComplete]);

  useEffect(() => {
    if (timeLeft <= 0) doSubmit();
  }, [timeLeft, doSubmit]);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const selectAnswer = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [current]: optIdx }));
    setShowHint(false);
  };

  const goNext = () => { if (current < total - 1) { setCurrent(c => c + 1); setShowHint(false); } };
  const goPrev = () => { if (current > 0) { setCurrent(c => c - 1); setShowHint(false); } };

  const handleSubmit = () => {
    const unanswered = total - answered;
    if (unanswered > 0 && !showHint) { setShowHint(true); return; }
    doSubmit();
  };

  const isUrgent = timeLeft < 120; // less than 2 min

  if (!q) return null;

  return (
    <div className="quiz-panel">
      {/* Header */}
      <div className="quiz-panel-header">
        <div className="quiz-panel-header-top">
          <span className="quiz-panel-title">Тест — {lessonTitle}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className={`quiz-panel-timer ${isUrgent ? "urgent" : ""}`}>
              <Clock size={12} />
              {formatTime(timeLeft)}
            </span>
            <button className="quiz-panel-close" onClick={onClose} aria-label="Закрыть тест">
              <X size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="quiz-panel-progress-wrap">
          <div className="quiz-panel-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="quiz-panel-counter">
          Вопрос {current + 1} из {total} · Отвечено: {answered}/{total}
        </span>
      </div>

      {/* Body */}
      <div className="quiz-panel-body">
        <span className="quiz-panel-topic">{q.topic}</span>
        <p className="quiz-panel-question">{q.question}</p>
        <div className="quiz-panel-options" role="radiogroup">
          {q.options.map((opt, i) => (
            <button
              key={`${current}-${i}`}
              className={`quiz-panel-option ${answers[current] === i ? "selected" : ""}`}
              onClick={() => selectAnswer(i)}
              role="radio"
              aria-checked={answers[current] === i}
              id={`quiz-opt-${current}-${i}`}
            >
              <span className="quiz-panel-option-letter">{LETTERS[i]}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="quiz-panel-footer">
        <button className="quiz-panel-nav-btn" onClick={goPrev} disabled={current === 0}>
          <ChevronLeft size={13} />Назад
        </button>

        {showHint && (
          <span className="quiz-panel-unanswered">
            {total - answered} без ответа. Завершить?
          </span>
        )}

        {current < total - 1 ? (
          <button className="quiz-panel-nav-btn" onClick={goNext}>
            Далее<ChevronRight size={13} />
          </button>
        ) : (
          <button className="quiz-panel-submit-btn" onClick={handleSubmit} id="quiz-submit-btn">
            <Send size={12} />Завершить
          </button>
        )}
      </div>
    </div>
  );
}

/** 
 * QuizPanelResult — inline result screen shown after finishing the quiz.
 * Always renders a full structured data table without floating cards.
 */
function QuizPanelResult({ result, lessonTitle, onClose, onRetry }: { result: QuizResult, lessonTitle: string, onClose: () => void, onRetry: () => void }) {
  const pct = Math.round((result.score / result.total) * 100);

  useEffect(() => {
    if (result.passed) {
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#38bdf8', '#fcd34d', '#f97066', '#fbbf24', '#f472b6'],
          zIndex: 9999
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#38bdf8', '#fcd34d', '#f97066', '#fbbf24', '#f472b6'],
          zIndex: 9999
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
    }
  }, [result.passed]);

  let rank = null;
  if (result.passed) {
    // Rank depends on the webinar number (lessonId) from smallest to largest
    const rankIndex = Math.max(0, Math.min(result.lessonId - 1, ACHIEVEMENT_RANKS.length - 1));
    rank = ACHIEVEMENT_RANKS[rankIndex];
  }

  return (
    <div className="quiz-panel quiz-result-panel">
      <div className="quiz-panel-header">
        <div className="quiz-panel-header-top">
          <span className="quiz-panel-title">Тест — {lessonTitle}</span>
          <button className="quiz-panel-close" onClick={onClose} aria-label="Закрыть">
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="quiz-result-toolbar">
        <div className="quiz-result-toolbar-left">
          <span className={`quiz-result-status-pill ${result.passed ? 'passed' : 'failed'}`}>
            {result.passed ? <CheckCircle2 size={13} strokeWidth={1.8} /> : <XCircle size={13} strokeWidth={1.8} />}
            <span>{result.passed ? 'Тест сдан' : 'Тест не сдан'}</span>
          </span>

          <span className="quiz-result-score-text">
            Результат: <strong>{result.score}</strong> / {result.total} ({pct}%)
          </span>

          {rank && (
            <span className="quiz-result-rank-tag" style={{ color: rank.color, borderColor: `${rank.color}40`, background: `${rank.color}15` }}>
              <span>{rank.icon}</span>
              <span>{rank.name}</span>
            </span>
          )}
        </div>

        <div className="quiz-result-toolbar-right">
          <span className="quiz-stat-pill correct">
            <Check size={11} strokeWidth={2.5} /> {result.score} верно
          </span>
          {result.total - result.score > 0 && (
            <span className="quiz-stat-pill wrong">
              <X size={11} strokeWidth={2.5} /> {result.total - result.score} неверно
            </span>
          )}
        </div>
      </div>

      <div className="quiz-result-table-container">
        <table className="quiz-result-table">
          <thead>
            <tr>
              <th className="th-num">№</th>
              <th className="th-status">Статус</th>
              <th className="th-topic">Тема</th>
              <th className="th-question">Вопрос</th>
              <th className="th-user-answer">Ваш ответ</th>
            </tr>
          </thead>
          <tbody>
            {result.questionResults.map((qr, i) => (
              <tr key={`${qr.questionId}-${i}`} className={`quiz-result-row ${qr.isCorrect ? 'row-correct' : 'row-wrong'}`}>
                <td className="td-num">{i + 1}</td>
                <td className="td-status">
                  {qr.isCorrect ? (
                    <span className="badge-status correct">
                      <CheckCircle2 size={12} strokeWidth={1.8} />
                      <span>Верно</span>
                    </span>
                  ) : (
                    <span className="badge-status wrong">
                      <XCircle size={12} strokeWidth={1.8} />
                      <span>Ошибка</span>
                    </span>
                  )}
                </td>
                <td className="td-topic">{qr.topic || '—'}</td>
                <td className="td-question">{qr.question}</td>
                <td className={`td-user-answer ${qr.isCorrect ? 'answer-correct' : 'answer-wrong'}`}>
                  {qr.userAnswer || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="quiz-panel-footer quiz-result-footer">
        <button className="quiz-panel-nav-btn" onClick={onClose}>
          Закрыть
        </button>
        <button className="quiz-panel-submit-btn" onClick={onRetry} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
          <RefreshCw size={12} style={{ marginRight: 4 }} />
          Пройти снова
        </button>
      </div>
    </div>
  );
}
