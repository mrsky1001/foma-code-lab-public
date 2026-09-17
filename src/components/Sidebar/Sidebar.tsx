import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronRight, X, Check, BookOpen, Wrench, Trophy, ClipboardCheck, Lock, RotateCcw, AlertTriangle } from 'lucide-react';
import type { Lesson, CodeFiles } from '../../types/lesson';
import { ACHIEVEMENT_RANKS, INITIAL_RANK } from '../../types/quiz';
import { FileTree } from '../FileTree/FileTree';
import { hasCodeTask } from '../../utils/codeMatch';
import { pluralize } from '../../utils/pluralize';
import './Sidebar.css';

interface SidebarProps {
  lessons: readonly Lesson[];
  currentIndex: number;
  currentStepIndex: number;
  collapsed: boolean;
  onSelectLesson: (id: number) => void;
  onSelectStep: (lessonId: number, stepIdx: number) => void;
  onClose?: () => void;
  width?: number;
  isResizing?: boolean;
  visitedSteps?: Set<string>;
  lessonId: number;
  stepIndex: number;
  highlight?: 'html' | 'css' | 'js';
  selectedFileKey: string;
  onSelectFile: (fileKey: string, lang: 'html' | 'css' | 'js', isEditable: boolean) => void;
  isTheory?: boolean;
  code?: CodeFiles;
  // Quiz & Access
  isQuizCompleted?: (lessonId: number) => boolean;
  hasQuizForLesson?: (lessonId: number) => boolean;
  isLessonUnlocked?: (lessonId: number) => boolean;
  isLessonAccessible?: (lessonId: number) => boolean;
  onQuizClick?: (lessonId: number, unlocked: boolean) => void;
  showQuizForLessonId?: number | null;
  onResetAllProgress?: () => void;
  isStepCompleted?: (lessonId: number, stepIdx: number) => boolean;
  isStepAccessible?: (lessonId: number, stepIdx: number) => boolean;
}

export function Sidebar({
  lessons,
  currentIndex,
  currentStepIndex,
  collapsed,
  onSelectLesson,
  onSelectStep,
  onClose,
  width,
  isResizing,
  visitedSteps,
  lessonId,
  stepIndex,
  highlight,
  selectedFileKey,
  onSelectFile,
  isTheory,
  code,
  isQuizCompleted,
  hasQuizForLesson,
  isLessonUnlocked,
  isLessonAccessible,
  onQuizClick,
  showQuizForLessonId,
  onResetAllProgress,
  isStepCompleted,
  isStepAccessible,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const DEFAULT_FILES_HEIGHT = 220;
  const [filesHeight, setFilesHeight] = useState<number>(() => {
    const saved = localStorage.getItem('foma-sidebar-files-height');
    const parsed = saved ? Number(saved) : DEFAULT_FILES_HEIGHT;
    return isNaN(parsed) || parsed < 70 ? DEFAULT_FILES_HEIGHT : parsed;
  });
  const [isFileTreeCollapsed, setIsFileTreeCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('foma-sidebar-files-collapsed') === 'true';
  });
  const [isDraggingRow, setIsDraggingRow] = useState<boolean>(false);
  const isDraggingRowRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.classList.remove('is-resizing-row');
    };
  }, []);

  const handleRowResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFileTreeCollapsed) {
      setIsFileTreeCollapsed(false);
      localStorage.setItem('foma-sidebar-files-collapsed', 'false');
    }
    isDraggingRowRef.current = true;
    setIsDraggingRow(true);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    document.body.classList.add('is-resizing-row');

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingRowRef.current || !sidebarRef.current) return;
      const rect = sidebarRef.current.getBoundingClientRect();
      const rawHeight = rect.bottom - ev.clientY;
      const minH = 70;
      const maxH = Math.max(minH, rect.height - 120);
      const clamped = Math.max(minH, Math.min(maxH, rawHeight));
      setFilesHeight(clamped);
      localStorage.setItem('foma-sidebar-files-height', String(clamped));
    };

    const handleMouseUp = () => {
      isDraggingRowRef.current = false;
      setIsDraggingRow(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.classList.remove('is-resizing-row');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Collapsed discipline groups
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const toggleGroup = (discipline: string) => {
    setCollapsedGroups(prev => ({ ...prev, [discipline]: !prev[discipline] }));
  };

  // Expanded lessons (showing step sub-list)
  const [expandedLessons, setExpandedLessons] = useState<Record<number, boolean>>(() => {
    // Auto-expand the current lesson
    return { [currentIndex]: true };
  });

  // Keep current lesson expanded when it changes
  useEffect(() => {
    setExpandedLessons(prev => ({ ...prev, [currentIndex]: true }));
  }, [currentIndex]);

  const toggleLesson = (lessonId: number) => {
    setExpandedLessons(prev => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  const groupedLessons = useMemo(() => {
    return lessons.reduce((acc, lesson) => {
      let discipline = (lesson.discipline || 'Основы верстки').trim();
      if (discipline.toLowerCase().includes('основы верстки')) {
        discipline = 'Основы верстки';
      }
      if (!acc[discipline]) acc[discipline] = [];
      acc[discipline].push(lesson);
      return acc;
    }, {} as Record<string, Lesson[]>);
  }, [lessons]);

  const isStepDone = (lId: number, sIdx: number) =>
    isStepCompleted ? isStepCompleted(lId, sIdx) : (visitedSteps?.has(`foma-visited-${lId}-${sIdx}`) ?? false);

  const isStepOpen = (lId: number, sIdx: number) =>
    isStepAccessible ? isStepAccessible(lId, sIdx) : true;

  const getLessonCompletedCount = (targetLessonId: number, totalSteps: number): number => {
    let count = 0;
    for (let i = 0; i < totalSteps; i++) {
      if (isStepDone(targetLessonId, i)) count++;
    }
    return count;
  };

  const maxPassed = useMemo(() => {
    let max = 0;
    if (isQuizCompleted) {
      lessons.forEach(l => {
        if (isQuizCompleted(l.id)) {
          max = Math.max(max, l.id);
        }
      });
    }
    return max;
  }, [lessons, isQuizCompleted]);

  const currentRank = useMemo(() => {
    if (maxPassed > 0) {
      const rankIndex = Math.max(0, Math.min(maxPassed - 1, ACHIEVEMENT_RANKS.length - 1));
      return ACHIEVEMENT_RANKS[rankIndex];
    }
    return INITIAL_RANK;
  }, [maxPassed]);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isRankPanelOpen, setIsRankPanelOpen] = useState(false);

  useEffect(() => {
    if (!isResetModalOpen && !isRankPanelOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResetModalOpen(false);
        setIsRankPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResetModalOpen, isRankPanelOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${isResizing ? 'resizing' : ''} ${isDraggingRow ? 'resizing-row' : ''}`}
      style={!collapsed && width ? { width: `${width}px`, minWidth: `${width}px` } : undefined}
      id="sidebar"
    >
      <div className="sidebar-header">
        <div className="sidebar-header-title">Курс</div>
        {currentRank && (
          <div
            className="sidebar-header-rank"
            style={{ color: currentRank.color, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, marginLeft: 'auto', marginRight: '4px', cursor: 'pointer' }}
            title="Посмотреть все звания"
            onClick={() => setIsRankPanelOpen(true)}
            role="button"
            tabIndex={0}
          >
            <span style={{ fontSize: '12px' }}>{currentRank.icon}</span>
            <span>{currentRank.name}</span>
          </div>
        )}
        {onClose && (
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Закрыть меню курса"
            id="sidebar-close-btn"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <nav className="sidebar-lessons" aria-label="Lessons">
        {Object.entries(groupedLessons).map(([discipline, groupLessons]) => {
          const isGroupCollapsed = !!collapsedGroups[discipline];
          const totalGroupSteps = groupLessons.reduce((s, l) => s + l.steps.length, 0);
          return (
            <div key={discipline} className={`sidebar-discipline-group ${isGroupCollapsed ? 'collapsed' : ''}`}>
              <div
                className="sidebar-discipline-title clickable"
                onClick={() => toggleGroup(discipline)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleGroup(discipline)}
              >
                {isGroupCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                <span className="sidebar-discipline-name">{discipline}</span>
                <span className="sidebar-discipline-count" title={`${pluralize(groupLessons.length, 'модуль', 'модуля', 'модулей')} · ${pluralize(totalGroupSteps, 'шаг', 'шага', 'шагов')}`}>
                  {groupLessons.length} · {totalGroupSteps}
                </span>
              </div>

              {!isGroupCollapsed && groupLessons.map((lesson) => {
                const accessible = isLessonAccessible ? isLessonAccessible(lesson.id) : true;
                const completedCount = getLessonCompletedCount(lesson.id, lesson.steps.length);
                const isComplete = completedCount === lesson.steps.length && lesson.steps.length > 0;
                const progressPct = lesson.steps.length > 0 ? (completedCount / lesson.steps.length) * 100 : 0;
                const isActive = lesson.id === currentIndex;
                const isExpanded = !!expandedLessons[lesson.id];

                const theorySteps = lesson.steps
                  .map((s, i) => ({ s, i }))
                  .filter(({ s }) => s.type === 'theory');
                const practiceSteps = lesson.steps
                  .map((s, i) => ({ s, i }))
                  .filter(({ s }) => s.type === 'practice');

                return (
                  <div key={lesson.id} className={`lesson-group ${isActive ? 'lesson-group-active' : ''} ${!accessible ? 'lesson-group-locked' : ''}`}>
                    {/* Lesson header row */}
                    <div className="lesson-item-row">
                      <button
                        className={`lesson-expand-btn ${isExpanded ? 'expanded' : ''} ${!accessible ? 'disabled' : ''}`}
                        onClick={() => { if (accessible) toggleLesson(lesson.id); }}
                        disabled={!accessible}
                        aria-label={!accessible ? 'Модуль заблокирован' : isExpanded ? 'Свернуть' : 'Развернуть'}
                        id={`lesson-expand-${lesson.id}`}
                      >
                        {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                      </button>
                      <button
                        className={`lesson-item ${isActive ? 'active' : ''} ${isComplete ? 'completed' : ''} ${!accessible ? 'locked' : ''}`}
                        onClick={() => {
                          if (accessible) {
                            if (!isActive) {
                              onSelectLesson(lesson.id);
                            }
                            toggleLesson(lesson.id);
                          }
                        }}
                        disabled={!accessible}
                        title={!accessible ? 'Модуль заблокирован. Сдайте тест предыдущего модуля' : `${lesson.title} — ${completedCount}/${lesson.steps.length} пройдено`}
                        id={`lesson-nav-${lesson.id}`}
                      >
                        <span className={`lesson-number ${!accessible ? 'locked' : ''}`}>
                          {!accessible ? (
                            <Lock size={11} strokeWidth={1.5} />
                          ) : isComplete ? (
                            <Check size={11} strokeWidth={2.5} />
                          ) : (
                            lesson.id
                          )}
                        </span>
                        <div className="lesson-info">
                          <span className="lesson-title">{lesson.title}</span>
                          <div className="lesson-meta">
                            <span className="lesson-step-count">
                              {!accessible ? 'Заблокировано' : pluralize(lesson.steps.length, 'шаг', 'шага', 'шагов')}
                            </span>
                            {accessible && completedCount > 0 && (
                              <div className="lesson-progress-bar" title={`${completedCount}/${lesson.steps.length} пройдено`}>
                                <div className="lesson-progress-fill" style={{ width: `${progressPct}%` }} />
                              </div>
                            )}
                          </div>
                        </div>
                        {accessible && isComplete && isQuizCompleted && (
                          <span
                            aria-label={isQuizCompleted(lesson.id) ? 'Тест сдан!' : 'Тест не пройден'}
                            title={isQuizCompleted(lesson.id) ? 'Тест сдан!' : 'Тест не пройден'}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                          <Trophy
                            size={12}
                            style={{
                              color: isQuizCompleted(lesson.id) ? '#fbbf24' : '#4b5563',
                              flexShrink: 0,
                              transition: 'color 0.3s'
                            }}
                          /></span>
                        )}
                      </button>
                    </div>

                    {/* Step sub-list */}
                    {isExpanded && accessible && (
                      <div className="lesson-steps-list">
                        {/* Theory section — always shown */}
                        <div className="step-section">
                          <div className="step-section-header step-section-theory">
                            <BookOpen size={10} />
                            <span>Теория</span>
                            <span className="step-section-count">{theorySteps.length}</span>
                          </div>
                          {theorySteps.length === 0 ? (
                            <div className="step-section-empty">— нет теории</div>
                          ) : (
                            theorySteps.map(({ s, i }) => {
                              const isStepActive = isActive && currentStepIndex === i;
                              const stepDone = isStepDone(lesson.id, i);
                              const stepAccessible = isStepOpen(lesson.id, i);
                              return (
                                <button
                                  key={i}
                                  className={`step-list-item ${isStepActive ? 'active' : ''} ${stepDone ? 'visited' : ''} ${!stepAccessible ? 'locked' : ''}`}
                                  onClick={() => {
                                    if (stepAccessible) onSelectStep(lesson.id, i);
                                  }}
                                  disabled={!stepAccessible}
                                  id={`step-list-${lesson.id}-${i}`}
                                  title={!stepAccessible
                                    ? 'Шаг заблокирован. Сначала пройдите предыдущий шаг'
                                    : stepDone
                                    ? `${s.title} (пройдено)`
                                    : hasCodeTask(s.startCode, s.solutionCode)
                                    ? `${s.title} (требуется выполнить задание)`                                    : s.title
                                  }
                                >
                                  <span className={`step-list-num ${!stepAccessible ? 'locked' : ''}`}>
                                    {!stepAccessible ? <Lock size={9} strokeWidth={1.5} /> : i + 1}
                                  </span>
                                  <span className="step-list-title">{s.title}</span>
                                  {stepDone && <Check size={9} className="step-list-check" />}
                                </button>
                              );
                            })
                          )}
                        </div>

                        {/* Practice section — always shown */}
                        <div className="step-section">
                          <div className="step-section-header step-section-practice">
                            <Wrench size={10} />
                            <span>Практика</span>
                            <span className="step-section-count">{practiceSteps.length}</span>
                          </div>
                          {practiceSteps.length === 0 ? (
                            <div className="step-section-empty">— нет практики</div>
                          ) : (
                            practiceSteps.map(({ s, i }) => {
                              const isStepActive = isActive && currentStepIndex === i;
                              const stepDone = isStepDone(lesson.id, i);
                              const stepAccessible = isStepOpen(lesson.id, i);
                              return (
                                <button
                                  key={i}
                                  className={`step-list-item ${isStepActive ? 'active' : ''} ${stepDone ? 'visited' : ''} ${!stepAccessible ? 'locked' : ''}`}
                                  onClick={() => {
                                    if (stepAccessible) onSelectStep(lesson.id, i);
                                  }}
                                  disabled={!stepAccessible}
                                  id={`step-list-${lesson.id}-${i}`}
                                  title={!stepAccessible
                                    ? 'Шаг заблокирован. Сначала пройдите предыдущий шаг'
                                    : stepDone
                                    ? `${s.title} (пройдено)`
                                    : `${s.title} (требуется выполнить задание)`
                                  }
                                >
                                  <span className={`step-list-num ${!stepAccessible ? 'locked' : ''}`}>
                                    {!stepAccessible ? <Lock size={9} strokeWidth={1.5} /> : i + 1}
                                  </span>
                                  <span className="step-list-title">{s.title}</span>
                                  {stepDone && <Check size={9} className="step-list-check" />}
                                </button>
                              );
                            })
                          )}
                        </div>

                        {/* Quiz test item */}
                        {hasQuizForLesson && hasQuizForLesson(lesson.id) && (
                          <div className="step-section">
                            <div className="step-section-header step-section-quiz">
                              <ClipboardCheck size={10} />
                              <span>Тест</span>
                            </div>
                            {(() => {
                              const unlocked = isLessonUnlocked ? isLessonUnlocked(lesson.id) : false;
                              const completed = isQuizCompleted ? isQuizCompleted(lesson.id) : false;
                              const isQuizActive = showQuizForLessonId === lesson.id;
                              return (
                                <button
                                  className={`step-list-item step-quiz-item ${isQuizActive ? 'active' : ''} ${!unlocked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
                                  onClick={() => onQuizClick?.(lesson.id, unlocked)}
                                  id={`quiz-item-${lesson.id}`}
                                  title={!unlocked ? 'Завершите все уроки для доступа' : completed ? 'Тест сдан' : 'Пройти тест'}
                                >
                                  <span className="step-list-num step-quiz-icon">
                                    {!unlocked ? <Lock size={9} /> : completed ? <Trophy size={9} /> : <ClipboardCheck size={9} />}
                                  </span>
                                  <span className="step-list-title">Тест по модулю</span>
                                  {completed && <Check size={9} className="step-list-check" />}
                                </button>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {onResetAllProgress && (
          <div className="sidebar-reset-section">
            <button
              type="button"
              className="sidebar-reset-btn"
              onClick={() => setIsResetModalOpen(true)}
              id="sidebar-reset-all-btn"
              title="Сбросить все уроки, тесты и достижения"
            >
              <RotateCcw size={12} strokeWidth={1.5} />
              <span>Сбросить достижения</span>
            </button>
          </div>
        )}
      </nav>

      {!collapsed && (
        <>
          <div
            className={`sidebar-row-resizer ${isDraggingRow ? 'active' : ''}`}
            onMouseDown={handleRowResizeStart}
            onDoubleClick={() => {
              setFilesHeight(DEFAULT_FILES_HEIGHT);
              localStorage.setItem('foma-sidebar-files-height', String(DEFAULT_FILES_HEIGHT));
            }}
            title="Потяните для изменения высоты (двойной клик — сброс)"
            id="resizer-sidebar-files"
          />

          <FileTree
            lessonId={lessonId}
            stepIndex={stepIndex}
            highlight={highlight}
            selectedFileKey={selectedFileKey}
            onSelectFile={onSelectFile}
            height={filesHeight}
            collapsed={isFileTreeCollapsed}
            isTheory={isTheory}
            code={code}
            onToggleCollapse={() => {
              setIsFileTreeCollapsed(prev => {
                const next = !prev;
                localStorage.setItem('foma-sidebar-files-collapsed', String(next));
                return next;
              });
            }}
          />
        </>
      )}

      {isResetModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="reset-modal-backdrop" onClick={() => setIsResetModalOpen(false)}>
          <div
            className="reset-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-modal-title"
          >
            <div className="reset-modal-header">
              <div className="reset-modal-title-wrap">
                <div className="reset-modal-icon">
                  <AlertTriangle size={15} strokeWidth={1.8} />
                </div>
                <h3 id="reset-modal-title" className="reset-modal-title">Сброс прогресса и достижений</h3>
              </div>
              <button
                type="button"
                className="reset-modal-close-btn"
                onClick={() => setIsResetModalOpen(false)}
                aria-label="Закрыть"
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>

            <div className="reset-modal-body">
              <p className="reset-modal-desc">
                Вы собираетесь полностью сбросить весь прогресс обучения в тренажере. Это действие необратимо.
              </p>

              <div className="reset-modal-list">
                <div className="reset-modal-list-item">
                  <RotateCcw size={12} strokeWidth={2} className="item-icon" />
                  <span><strong>Уроки и модули:</strong> отметки о прохождении очистятся, модули 2–10 заблокируются.</span>
                </div>
                <div className="reset-modal-list-item">
                  <RotateCcw size={12} strokeWidth={2} className="item-icon" />
                  <span><strong>Тесты и звания:</strong> все сданные тесты и полученные ранги будут сброшены.</span>
                </div>
                <div className="reset-modal-list-item">
                  <RotateCcw size={12} strokeWidth={2} className="item-icon" />
                  <span><strong>Редактор кода:</strong> черновики удалятся, вернется стартовый код Модуля 1.</span>
                </div>
              </div>

              <div className="reset-modal-note">
                Настройки темы оформления и размеры панелей останутся сохранены.
              </div>
            </div>

            <div className="reset-modal-footer">
              <button
                type="button"
                className="reset-modal-btn cancel"
                onClick={() => setIsResetModalOpen(false)}
              >
                Отмена
              </button>
              <button
                type="button"
                className="reset-modal-btn confirm"
                onClick={() => {
                  setIsResetModalOpen(false);
                  onResetAllProgress?.();
                }}
              >
                <RotateCcw size={12} strokeWidth={2} />
                <span>Сбросить всё</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isRankPanelOpen && typeof document !== 'undefined' && createPortal(
        <div className="reset-modal-backdrop" onClick={() => setIsRankPanelOpen(false)}>
          <div
            className="reset-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rank-modal-title"
            style={{ maxWidth: '400px' }}
          >
            <div className="reset-modal-header">
              <div className="reset-modal-title-wrap">
                <div className="reset-modal-icon">
                  <Trophy size={15} strokeWidth={1.8} />
                </div>
                <h3 id="rank-modal-title" className="reset-modal-title">Система званий</h3>
              </div>
              <button
                type="button"
                className="reset-modal-close-btn"
                onClick={() => setIsRankPanelOpen(false)}
                aria-label="Закрыть"
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>

            <div className="rank-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[INITIAL_RANK, ...ACHIEVEMENT_RANKS].map(rank => {
                const isUnlocked = rank.level <= maxPassed;
                return (
                  <div key={rank.level} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                    borderRadius: '8px', background: isUnlocked ? 'var(--bg-secondary)' : 'var(--bg-main)',
                    border: `1px solid ${isUnlocked ? rank.color : 'var(--border-color)'}`,
                    opacity: isUnlocked ? 1 : 0.6
                  }}>
                    <div style={{
                      width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', background: isUnlocked ? rank.color + '20' : 'var(--bg-secondary)',
                      color: isUnlocked ? rank.color : 'var(--text-muted)', fontSize: '18px'
                    }}>
                      {isUnlocked ? rank.icon : <Lock size={14} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: isUnlocked ? rank.color : 'var(--text-muted)', marginBottom: '2px' }}>
                        {isUnlocked ? rank.name : 'Звание скрыто'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                        {isUnlocked ? rank.description : `Сдайте ${pluralize(rank.level, 'тест', 'теста', 'тестов')} для получения этого звания`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </aside>
  );
}
