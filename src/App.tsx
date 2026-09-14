import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { BookOpen, Code2, Play } from 'lucide-react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { LessonPanel } from './components/LessonPanel/LessonPanel';
import { CodeEditor, type ViewOnlyFile } from './components/CodeEditor/CodeEditor';
import { Preview } from './components/Preview/Preview';
import { QuizPanel } from './components/Quiz/QuizPanel';
import { useLesson } from './hooks/useLesson';
import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { useAchievements } from './hooks/useAchievements';
import { useAdminMode } from './utils/admin';
import { getQuizQuestions, hasQuizForLesson } from './data/quizzes/index';
import type { QuizResult, QuizQuestion } from './types/quiz';
import { LAYOUT } from './constants';
import { CANONICAL_PROJECT_FILES, getStepFileConfig, getAllVirtualPages } from './utils/virtualFiles';
import { calculateCodeSimilarity, hasCodeTask } from './utils/codeMatch';
import './styles/tokens.css';
import './styles/global.css';

export default function App() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < LAYOUT.MOBILE_BREAKPOINT;
  });
  const [mobileView, setMobileView] = useState<'lesson' | 'editor' | 'preview'>('lesson');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < LAYOUT.MOBILE_BREAKPOINT;
  });
  const { theme, toggleTheme } = useTheme();

  // Resize listener to track mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < LAYOUT.MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Column width state with localStorage persistence
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = localStorage.getItem('foma-sidebar-width');
    return saved ? Math.max(LAYOUT.SIDEBAR_MIN, Math.min(LAYOUT.SIDEBAR_MAX, Number(saved))) : LAYOUT.SIDEBAR_DEFAULT;
  });

  const [lessonWidth, setLessonWidth] = useState<number>(() => {
    const saved = localStorage.getItem('foma-lesson-width');
    return saved ? Math.max(LAYOUT.LESSON_MIN, Math.min(LAYOUT.LESSON_MAX, Number(saved))) : LAYOUT.LESSON_DEFAULT;
  });

  const [editorRatio, setEditorRatio] = useState<number>(() => {
    const saved = localStorage.getItem('foma-editor-ratio');
    return saved ? Math.max(LAYOUT.EDITOR_RATIO_MIN, Math.min(LAYOUT.EDITOR_RATIO_MAX, Number(saved))) : LAYOUT.EDITOR_RATIO_DEFAULT;
  });

  // Active dragging column
  const [activeResizer, setActiveResizer] = useState<'sidebar' | 'lesson' | 'editor' | null>(null);
  const activeResizerRef = useRef<'sidebar' | 'lesson' | 'editor' | null>(null);
  activeResizerRef.current = activeResizer;

  const workspaceRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startSidebarWidth: number; startLessonWidth: number; workspaceLeft: number; workspaceWidth: number }>({
    startX: 0,
    startSidebarWidth: LAYOUT.SIDEBAR_DEFAULT,
    startLessonWidth: LAYOUT.LESSON_DEFAULT,
    workspaceLeft: 0,
    workspaceWidth: 800,
  });

  const handleSidebarResizeStart = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setActiveResizer('sidebar');
    dragStartRef.current.startX = e.clientX;
    dragStartRef.current.startSidebarWidth = sidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleLessonResizeStart = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setActiveResizer('lesson');
    dragStartRef.current.startX = e.clientX;
    dragStartRef.current.startLessonWidth = lessonWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleEditorResizeStart = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setActiveResizer('editor');
    if (workspaceRef.current) {
      const rect = workspaceRef.current.getBoundingClientRect();
      dragStartRef.current.workspaceLeft = rect.left;
      dragStartRef.current.workspaceWidth = rect.width;
    }
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const resizer = activeResizerRef.current;
      if (!resizer) return;

      if (resizer === 'sidebar') {
        const delta = e.clientX - dragStartRef.current.startX;
        const newWidth = Math.max(LAYOUT.SIDEBAR_MIN, Math.min(LAYOUT.SIDEBAR_MAX, dragStartRef.current.startSidebarWidth + delta));
        setSidebarWidth(newWidth);
      } else if (resizer === 'lesson') {
        const delta = e.clientX - dragStartRef.current.startX;
        const newWidth = Math.max(LAYOUT.LESSON_MIN, Math.min(LAYOUT.LESSON_MAX, dragStartRef.current.startLessonWidth + delta));
        setLessonWidth(newWidth);
      } else if (resizer === 'editor') {
        const { workspaceLeft, workspaceWidth } = dragStartRef.current;
        if (workspaceWidth > 0) {
          const ratio = (e.clientX - workspaceLeft) / workspaceWidth;
          const clamped = Math.max(LAYOUT.EDITOR_RATIO_MIN, Math.min(LAYOUT.EDITOR_RATIO_MAX, ratio));
          setEditorRatio(clamped);
        }
      }
    };

    const handleMouseUp = () => {
      if (activeResizerRef.current) {
        setActiveResizer(null);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('foma-sidebar-width', String(sidebarWidth));
  }, [sidebarWidth]);

  useEffect(() => {
    localStorage.setItem('foma-lesson-width', String(lessonWidth));
  }, [lessonWidth]);

  useEffect(() => {
    localStorage.setItem('foma-editor-ratio', String(editorRatio));
  }, [editorRatio]);

  // Active editor tab override (driven by hotkeys)
  const [tabOverride, setTabOverride] = useState<'html' | 'css' | 'js' | null>(null);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S — prevent default save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd + B — toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarCollapsed((v) => !v);
        return;
      }
      // Alt + 1/2/3 — switch editor tabs
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === '1') { e.preventDefault(); setTabOverride('html'); return; }
        if (e.key === '2') { e.preventDefault(); setTabOverride('css'); return; }
        if (e.key === '3') { e.preventDefault(); setTabOverride('js'); return; }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Clear tabOverride after CodeEditor picks it up
  const handleTabOverrideConsumed = useCallback(() => setTabOverride(null), []);

  const {
    lesson,
    lessonIndex,
    step,
    lessons: allLessons,
    stepIndex,
    totalSteps,
    code,
    goToStep,
    goToLessonStep,
    nextStep,
    prevStep,
    goToLesson,
    nextLesson,
    prevLesson,
    resetCode,
    resetAllDrafts,
    toggleSolution,
    isShowingSolution,
    solutionTarget,
    updateCode,
    hasNextStep,
    hasPrevStep,
    hasNextLesson,
    hasPrevLesson,
  } = useLesson();

  // When solution is activated, ensure view-only is closed, switch editor tab to target file, and open editor view on mobile
  useEffect(() => {
    if (!solutionTarget) return;
    setViewOnlyFile(null);
    setTabOverride(solutionTarget.lang);
    if (isMobile) {
      setMobileView('editor');
    }
  }, [solutionTarget, isMobile]);

  // Admin mode (local machine privilege with student simulation toggle)
  const { isLocal, isAdmin, setStudentSimulated } = useAdminMode();

  // Progress tracking
  const progress = useProgress(allLessons, lesson.id, stepIndex, isAdmin);

  // Achievements
  const achievements = useAchievements();

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizLessonId, setQuizLessonId] = useState<number | null>(null);
  const [devQuizResultMode, setDevQuizResultMode] = useState(false);

  const resetQuiz = useCallback(() => {
    setShowQuiz(false);
    setQuizQuestions([]);
    setQuizLessonId(null);
    setDevQuizResultMode(false);
  }, []);

  const handleStartQuiz = useCallback((forLessonId?: number) => {
    const id = forLessonId ?? lesson.id;
    const qs = getQuizQuestions(id);
    setQuizQuestions(qs);
    setQuizLessonId(id);
    setDevQuizResultMode(false);
    setShowQuiz(true);
  }, [lesson.id]);

  const handleShowDevQuizResult = useCallback((forLessonId: number) => {
    const qs = getQuizQuestions(forLessonId);
    setQuizQuestions(qs);
    setQuizLessonId(forLessonId);
    setDevQuizResultMode(true);
    setShowQuiz(true);
  }, []);

  const handleQuizComplete = useCallback((result: QuizResult) => {
    if (result.passed) {
      progress.markQuizCompleted(result.lessonId);
      achievements.checkAndUpdate();
    }
  }, [progress, achievements]);

  const handleResetAllProgress = useCallback(() => {
    progress.resetAllProgress();
    achievements.resetAchievements();
    resetAllDrafts();
    resetQuiz();
    setViewOnlyFile(null);
  }, [progress, achievements, resetAllDrafts, resetQuiz]);


  // Reset quiz when page loses focus (tab switch / alt-tab)
  useEffect(() => {
    const onVisChange = () => {
      if (document.hidden && showQuiz) resetQuiz();
    };
    document.addEventListener('visibilitychange', onVisChange);
    return () => document.removeEventListener('visibilitychange', onVisChange);
  }, [showQuiz, resetQuiz]);

  // Step has task if it's practice type or has code differences between start and solution
  const stepHasTask = useMemo(() => {
    return step.type === 'practice' || hasCodeTask(step.startCode, step.solutionCode);
  }, [step.type, step.startCode, step.solutionCode]);

  // Practice task similarity calculation
  const [taskSimilarity, setTaskSimilarity] = useState<number>(() => {
    if (!stepHasTask) return 100;
    return calculateCodeSimilarity(code, step.startCode, step.solutionCode, step.highlight);
  });

  // Re-calculate similarity when step changes or code changes
  useEffect(() => {
    if (stepHasTask) {
      const isAlreadyDone = progress.practiceDone.has(`foma-practice-done-${lesson.id}-${stepIndex}`);
      if (isAlreadyDone || isShowingSolution) {
        setTaskSimilarity(100);
      } else {
        const sim = calculateCodeSimilarity(code, step.startCode, step.solutionCode, step.highlight);
        setTaskSimilarity(sim);
      }
    } else {
      setTaskSimilarity(100);
    }
  }, [lesson.id, stepIndex, stepHasTask, step.startCode, step.solutionCode, step.highlight, code, isShowingSolution, progress.practiceDone]);

  // Check button status: 'idle' | 'success' | 'error'
  const [checkStatus, setCheckStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const errorResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearErrorResetTimer = useCallback(() => {
    if (errorResetTimerRef.current) {
      clearTimeout(errorResetTimerRef.current);
      errorResetTimerRef.current = null;
    }
  }, []);

  // Reset check status and timer when switching steps or lessons
  useEffect(() => {
    clearErrorResetTimer();
    setCheckStatus('idle');
  }, [lesson.id, stepIndex, clearErrorResetTimer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearErrorResetTimer();
  }, [clearErrorResetTimer]);

  // Update code on change; if check status was shown, reset to idle on code edit
  const handleCodeChange = useCallback((lang: 'html' | 'css' | 'js', value: string) => {
    updateCode(lang, value);
    if (checkStatus === 'error') {
      clearErrorResetTimer();
      setCheckStatus('idle');
    }
    if (stepHasTask) {
      const updatedCode = { ...code, [lang]: value };
      const sim = calculateCodeSimilarity(updatedCode, step.startCode, step.solutionCode, step.highlight);
      setTaskSimilarity(sim);
    }
  }, [updateCode, stepHasTask, code, step.startCode, step.solutionCode, step.highlight, checkStatus, clearErrorResetTimer]);

  // Handle explicit check button click (both practice and theory)
  const handleCheckSolution = useCallback(() => {
    clearErrorResetTimer();
    const sim = calculateCodeSimilarity(code, step.startCode, step.solutionCode, step.highlight);
    setTaskSimilarity(sim);
    if (sim >= 80) {
      setCheckStatus('success');
      progress.markStepCompleted(lesson.id, stepIndex);
    } else {
      setCheckStatus('error');
      // Auto-reset "Не верно" back to "Проверить" after 5 seconds so user can try again
      errorResetTimerRef.current = setTimeout(() => {
        setCheckStatus('idle');
      }, 5000);
    }
  }, [step, code, lesson.id, stepIndex, progress, clearErrorResetTimer]);

  // Handle toggling solution - marks step as done and sets success
  const handleToggleSolution = useCallback(() => {
    clearErrorResetTimer();
    toggleSolution();
    setTaskSimilarity(100);
    progress.markStepCompleted(lesson.id, stepIndex);
    setCheckStatus('success');
  }, [toggleSolution, lesson.id, stepIndex, progress, clearErrorResetTimer]);

  const handleSelectLesson = (id: number) => {
    if (!progress.isLessonAccessible(id)) return;
    if (id === lesson.id) return;
    resetQuiz();
    goToLesson(id);
    if (isMobile) setSidebarCollapsed(true);
  };

  const handleSelectStep = (lessonId: number, sIdx: number) => {
    if (!progress.isStepAccessible(lessonId, sIdx)) return;
    resetQuiz();
    goToLessonStep(lessonId, sIdx);
    if (isMobile) setSidebarCollapsed(true);
  };

  // View-only file selected from project file tree
  const [viewOnlyFile, setViewOnlyFile] = useState<ViewOnlyFile | null>(null);

  // Clear view-only file when step or lesson changes
  useEffect(() => {
    setViewOnlyFile(null);
  }, [lesson.id, stepIndex]);

  // Compute selected file in the project files tree
  const stepFileConfig = getStepFileConfig(lesson.id, stepIndex);
  const currentEditableFile = (tabOverride || step.highlight || 'html') === 'css' 
    ? stepFileConfig.cssName 
    : (tabOverride || step.highlight || 'html') === 'js' 
    ? stepFileConfig.jsName 
    : stepFileConfig.htmlName;
  const selectedProjectFileKey = viewOnlyFile ? viewOnlyFile.key : currentEditableFile;

  // Active virtual page in preview (e.g. 'index.html', 'catalog.html', etc.)
  const [activePreviewPage, setActivePreviewPage] = useState<string>(stepFileConfig.htmlName);
  const [previewSearch, setPreviewSearch] = useState<string>('');

  // Sync active preview page when lesson or step changes
  useEffect(() => {
    setActivePreviewPage(stepFileConfig.htmlName);
    setPreviewSearch('');
  }, [lesson.id, stepIndex, stepFileConfig.htmlName]);

  // Handle clicking a file in FileTree
  const handleSelectProjectFile = (fileKey: string, lang: 'html' | 'css' | 'js', isEditable: boolean) => {
    if (fileKey.endsWith('.html')) {
      setActivePreviewPage(fileKey);
      setPreviewSearch('');
    }
    if (isEditable) {
      setViewOnlyFile(null);
      if (fileKey === stepFileConfig.htmlName) setTabOverride('html');
      else if (fileKey === stepFileConfig.cssName) setTabOverride('css');
      else if (fileKey === stepFileConfig.jsName) setTabOverride('js');
    } else {
      const content = CANONICAL_PROJECT_FILES[fileKey] || '';
      setViewOnlyFile({ key: fileKey, name: fileKey, content, lang });
    }
    if (isMobile) {
      setSidebarCollapsed(true);
      if (fileKey.endsWith('.html')) {
        setMobileView('preview');
      } else {
        setMobileView('editor');
      }
    }
  };

  // Handle navigating inside the preview
  const handlePreviewNavigate = useCallback((pageKey: string, search: string) => {
    setActivePreviewPage(pageKey);
    setPreviewSearch(search);
    if (pageKey !== stepFileConfig.htmlName && CANONICAL_PROJECT_FILES[pageKey]) {
      setViewOnlyFile({
        key: pageKey,
        name: pageKey,
        content: CANONICAL_PROJECT_FILES[pageKey],
        lang: 'html'
      });
    } else if (pageKey === stepFileConfig.htmlName) {
      setViewOnlyFile(null);
      setTabOverride('html');
    }
  }, [stepFileConfig.htmlName]);

  const handleResetPreviewPage = useCallback(() => {
    setActivePreviewPage(stepFileConfig.htmlName);
    setPreviewSearch('');
    if (viewOnlyFile && viewOnlyFile.key.endsWith('.html')) {
      setViewOnlyFile(null);
      setTabOverride('html');
    }
  }, [stepFileConfig.htmlName, viewOnlyFile]);

  const allVirtualPages = useMemo(() => {
    return getAllVirtualPages(code, lesson.id, stepIndex);
  }, [code, lesson.id, stepIndex]);

  return (
    <div className={`app ${theme}`} id="app-root">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
        lessonTitles={allLessons.map(l => ({ id: l.id, title: l.title }))}
        onDevQuiz={(id) => handleStartQuiz(id)}
        onDevQuizResult={(id) => handleShowDevQuizResult(id)}
        isLocal={isLocal}
        isAdmin={isAdmin}
        onToggleAdmin={() => setStudentSimulated(isAdmin)}
      />

      {isMobile && (
        <nav className="mobile-navbar" role="tablist" id="mobile-nav-bar" aria-label="Рабочие области">
          <button
            className={`mobile-nav-item ${mobileView === 'lesson' ? 'active' : ''}`}
            onClick={() => setMobileView('lesson')}
            role="tab"
            aria-selected={mobileView === 'lesson'}
            id="mobile-tab-lesson"
          >
            <BookOpen size={14} />
            <span>Задание</span>
            <span className="mobile-nav-badge">{stepIndex + 1}/{totalSteps}</span>
          </button>
          <button
            className={`mobile-nav-item ${mobileView === 'editor' ? 'active' : ''}`}
            onClick={() => setMobileView('editor')}
            role="tab"
            aria-selected={mobileView === 'editor'}
            id="mobile-tab-editor"
          >
            <Code2 size={14} />
            <span>Код</span>
            <span className={`mobile-nav-dot ${step.highlight || 'html'}`} />
          </button>
          <button
            className={`mobile-nav-item ${mobileView === 'preview' ? 'active' : ''}`}
            onClick={() => setMobileView('preview')}
            role="tab"
            aria-selected={mobileView === 'preview'}
            id="mobile-tab-preview"
          >
            <Play size={14} />
            <span>Результат</span>
          </button>
        </nav>
      )}

      <div className={`app-body ${activeResizer ? 'is-resizing' : ''}`}>
        {isMobile && !sidebarCollapsed && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarCollapsed(true)}
            aria-hidden="true"
          />
        )}

        <Sidebar
          lessons={allLessons}
          currentIndex={lesson.id}
          currentStepIndex={stepIndex}
          collapsed={sidebarCollapsed}
          onSelectLesson={handleSelectLesson}
          onSelectStep={handleSelectStep}
          onClose={() => setSidebarCollapsed(true)}
          width={sidebarWidth}
          isResizing={activeResizer === 'sidebar'}
          visitedSteps={progress.visitedSteps}
          isStepCompleted={progress.isStepCompleted}
          isStepAccessible={progress.isStepAccessible}
          lessonId={lesson.id}
          stepIndex={stepIndex}
          highlight={step.highlight}
          selectedFileKey={selectedProjectFileKey}
          onSelectFile={handleSelectProjectFile}
          isQuizCompleted={progress.isQuizCompleted}
          hasQuizForLesson={hasQuizForLesson}
          isLessonUnlocked={progress.isLessonUnlocked}
          isLessonAccessible={progress.isLessonAccessible}
          onQuizClick={(id, unlocked) => {
            if (unlocked) {
              handleStartQuiz(id);
            } else {
              // Show locked quiz panel
              setQuizLessonId(id);
              setShowQuiz(true);
              setQuizQuestions([]); // empty = locked mode
            }
          }}
          showQuizForLessonId={showQuiz ? quizLessonId : null}
          onResetAllProgress={handleResetAllProgress}
        />

        {!sidebarCollapsed && !isMobile && (
          <div
            className={`col-resizer ${activeResizer === 'sidebar' ? 'active' : ''}`}
            onMouseDown={handleSidebarResizeStart}
            onDoubleClick={() => setSidebarWidth(LAYOUT.SIDEBAR_DEFAULT)}
            title="Потяните для изменения ширины списка уроков (двойной клик — сброс)"
            id="resizer-sidebar"
          />
        )}

        <div
          className={`panel-container ${activeResizer === 'lesson' ? 'resizing' : ''} ${
            isMobile ? (mobileView === 'lesson' ? 'mobile-active' : 'mobile-hidden') : ''
          }`}
          style={!isMobile ? (showQuiz ? { flex: 1 } : { width: `${lessonWidth}px` }) : undefined}
          id="lesson-panel-container"
        >
          {showQuiz ? (
            <QuizPanel
              key={`${quizLessonId ?? lesson.id}-${devQuizResultMode}`}
              lessonId={quizLessonId ?? lesson.id}
              lessonTitle={allLessons.find(l => l.id === (quizLessonId ?? lesson.id))?.title ?? lesson.title}
              questions={quizQuestions}
              onClose={resetQuiz}
              onComplete={handleQuizComplete}
              locked={quizQuestions.length === 0}
              initialResult={devQuizResultMode}
            />
          ) : (
            <LessonPanel
              lesson={lesson}
              step={step}
              stepIndex={stepIndex}
              totalSteps={totalSteps}
              hasPrevStep={hasPrevStep}
              hasNextStep={hasNextStep}
              hasPrevLesson={hasPrevLesson}
              hasNextLesson={hasNextLesson}
              isNextLessonAccessible={hasNextLesson ? progress.isLessonAccessible(allLessons[lessonIndex + 1]?.id ?? -1) : true}
              isShowingSolution={isShowingSolution}
              onToggleSolution={handleToggleSolution}
              onPrevStep={prevStep}
              onNextStep={nextStep}
              onPrevLesson={prevLesson}
              onNextLesson={nextLesson}
              onGoToStep={goToStep}
              hasQuiz={hasQuizForLesson(lesson.id)}
              isLessonUnlocked={progress.isLessonUnlocked(lesson.id)}
              quizCompleted={progress.isQuizCompleted(lesson.id)}
              onStartQuiz={() => handleStartQuiz()}
              onForceCompleteQuiz={() => progress.markQuizCompleted(lesson.id)}
              isCurrentStepCompleted={progress.isStepCompleted(lesson.id, stepIndex)}
              taskSimilarity={taskSimilarity}
              onCheckSolution={handleCheckSolution}
              checkStatus={checkStatus}
            />
          )}
        </div>

        {!isMobile && (
          <div
            className={`col-resizer ${activeResizer === 'lesson' ? 'active' : ''}`}
            onMouseDown={handleLessonResizeStart}
            onDoubleClick={() => setLessonWidth(LAYOUT.LESSON_DEFAULT)}
            title="Потяните для изменения ширины описания (двойной клик — сброс)"
            id="resizer-lesson"
          />
        )}

        {!showQuiz && (
          <>
            <div
              className={`workspace ${isMobile && mobileView === 'lesson' ? 'mobile-hidden' : ''}`}
              ref={workspaceRef}
              id="workspace"
            >
              <div
                className={`workspace-editor ${
                  isMobile ? (mobileView === 'editor' ? 'mobile-active' : 'mobile-hidden') : ''
                }`}
                style={!isMobile ? { width: `${editorRatio * 100}%`, flex: 'none' } : undefined}
              >
                <CodeEditor
                  code={code}
                  onCodeChange={(lang, value) => handleCodeChange(lang, value)}
                  activeTab={step.highlight}
                  theme={theme}
                  onReset={resetCode}
                  tabOverride={tabOverride}
                  onTabOverrideConsumed={handleTabOverrideConsumed}
                  lessonId={lesson.id}
                  stepIndex={stepIndex}
                  viewOnlyFile={viewOnlyFile}
                  onCloseViewOnly={() => setViewOnlyFile(null)}
                  onSelectTab={() => setViewOnlyFile(null)}
                  solutionTarget={solutionTarget}
                />
              </div>

              {!isMobile && (
                <div
                  className={`col-resizer ${activeResizer === 'editor' ? 'active' : ''}`}
                  onMouseDown={handleEditorResizeStart}
                  onDoubleClick={() => setEditorRatio(LAYOUT.EDITOR_RATIO_DEFAULT)}
                  title="Потяните для изменения соотношения редактора и превью (двойной клик — 50/50)"
                  id="resizer-editor"
                />
              )}

              <div
                className={`workspace-preview ${
                  isMobile ? (mobileView === 'preview' ? 'mobile-active' : 'mobile-hidden') : ''
                }`}
                style={!isMobile ? { flex: 1 } : undefined}
              >
                <Preview
                  code={code}
                  lessonNumber={lesson.id}
                  stepNumber={stepIndex + 1}
                  stepTitle={step.title}
                  activeHtmlFile={activePreviewPage}
                  searchParams={previewSearch}
                  allPages={allVirtualPages}
                  onNavigate={handlePreviewNavigate}
                  onResetPage={handleResetPreviewPage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
