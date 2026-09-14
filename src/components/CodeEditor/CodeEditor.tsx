import { useRef, useEffect, useState } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, Decoration, type DecorationSet, drawSelection, dropCursor } from '@codemirror/view';
import { EditorState, EditorState as CMEditorState, StateField, StateEffect, EditorSelection, Transaction } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { abbreviationTracker, expandAbbreviation } from '@emmetio/codemirror6-plugin';
import { oneDark } from '@codemirror/theme-one-dark';
import { RotateCcw, Rows, Square, X, Wand2, WrapText, Lock } from 'lucide-react';
import { linter, lintGutter } from '@codemirror/lint';
import type { CodeFiles } from '../../types/lesson';
import type { SolutionTarget } from '../../hooks/useLesson';
import { formatCode } from '../../utils/formatCode';
import { createLinter } from '../../utils/codeLinter';
import { getStepFileConfig } from '../../utils/virtualFiles';
import { Toast } from '../Toast/Toast';
import './CodeEditor.css';

const setSolutionHighlightEffect = StateEffect.define<{ fromLine: number; toLine: number } | null>();

const solutionHighlightField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(decorations, tr) {
    for (const effect of tr.effects) {
      if (effect.is(setSolutionHighlightEffect)) {
        if (!effect.value) return Decoration.none;
        const { fromLine, toLine } = effect.value;
        const totalLines = tr.state.doc.lines;
        const validFrom = Math.max(1, Math.min(fromLine, totalLines));
        const validTo = Math.max(validFrom, Math.min(toLine, totalLines));
        const decos = [];
        for (let l = validFrom; l <= validTo; l++) {
          const lineObj = tr.state.doc.line(l);
          decos.push(
            Decoration.line({
              class: 'cm-solution-highlight-line',
            }).range(lineObj.from)
          );
        }
        return Decoration.set(decos);
      }
    }
    return decorations.map(tr.changes);
  },
  provide: (f) => EditorView.decorations.from(f),
});

type TabKey = 'html' | 'css' | 'js';

const langExtensions = {
  html: () => html(),
  css: () => css(),
  js: () => javascript(),
};

export interface ViewOnlyFile {
  key: string;
  name: string;
  content: string;
  lang: 'html' | 'css' | 'js';
}

interface SingleEditorPaneProps {
  id: string;
  tab: TabKey;
  onTabChange: (tab: TabKey) => void;
  code: CodeFiles;
  onCodeChange: (lang: keyof CodeFiles, value: string) => void;
  onFormat?: () => void;
  theme: 'dark' | 'light';
  wordWrap: boolean;
  headerActions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fileConfig: { htmlName: string; cssName: string; jsName: string };
  viewOnlyFile?: ViewOnlyFile | null;
  onCloseViewOnly?: () => void;
  solutionTarget?: SolutionTarget | null;
}

function SingleEditorPane({
  id,
  tab,
  onTabChange,
  code,
  onCodeChange,
  onFormat,
  theme,
  wordWrap,
  headerActions,
  className = '',
  style,
  fileConfig,
  viewOnlyFile,
  onCloseViewOnly,
  solutionTarget,
}: SingleEditorPaneProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onCodeChange);
  onChangeRef.current = onCodeChange;
  const onFormatRef = useRef(onFormat);
  onFormatRef.current = onFormat;

  const isReadOnly = !!viewOnlyFile;
  const currentLang = isReadOnly ? viewOnlyFile.lang : tab;
  const currentDoc = isReadOnly ? viewOnlyFile.content : code[tab];

  const isProgrammaticUpdateRef = useRef(false);

  // Create / recreate editor on tab, theme, or viewOnlyFile change
  useEffect(() => {
    if (!editorRef.current) return;

    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      bracketMatching(),
      drawSelection(),
      dropCursor(),
      solutionHighlightField,
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      langExtensions[currentLang](),
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
      }),
    ];

    if (isReadOnly) {
      extensions.push(CMEditorState.readOnly.of(true));
      extensions.push(EditorView.editable.of(false));
    } else {
      extensions.push(history());
      extensions.push(closeBrackets());
      extensions.push(autocompletion());
      extensions.push(abbreviationTracker());
      extensions.push(lintGutter());
      extensions.push(linter(createLinter(currentLang), { delay: 300 }));
      extensions.push(
        keymap.of([
          {
            key: 'Tab',
            run: expandAbbreviation,
          },
          ...completionKeymap,
          {
            key: 'Shift-Alt-f',
            run: () => {
              if (onFormatRef.current) {
                onFormatRef.current();
                return true;
              }
              return false;
            },
          },
          ...defaultKeymap,
          ...historyKeymap,
          ...closeBracketsKeymap,
        ])
      );
      extensions.push(
        EditorView.updateListener.of((update) => {
          const isUserChange = update.transactions.some(
            (tr) => tr.annotation(Transaction.userEvent) !== undefined
          );
          if (update.docChanged && isUserChange && !isProgrammaticUpdateRef.current) {
            onChangeRef.current(currentLang, update.state.doc.toString());
          }
        })
      );
    }

    if (theme === 'dark') {
      extensions.push(oneDark);
    }

    if (wordWrap) {
      extensions.push(EditorView.lineWrapping);
    }

    const state = EditorState.create({
      doc: currentDoc,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [tab, theme, wordWrap, isReadOnly, currentLang]);

  // Synchronize document content and solution highlight/scroll atomically
  useEffect(() => {
    const view = viewRef.current;
    if (!view || isReadOnly) return;

    const current = view.state.doc.toString();
    const incoming = code[tab];
    const docChanged = current !== incoming;

    const effects: StateEffect<unknown>[] = [];
    if (solutionTarget && solutionTarget.lang === currentLang) {
      effects.push(
        setSolutionHighlightEffect.of({
          fromLine: solutionTarget.fromLine,
          toLine: solutionTarget.toLine,
        })
      );
    } else {
      effects.push(setSolutionHighlightEffect.of(null));
    }

    if (docChanged) {
      isProgrammaticUpdateRef.current = true;
      try {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: incoming },
          effects,
        });
      } finally {
        isProgrammaticUpdateRef.current = false;
      }
    } else if (effects.length > 0) {
      view.dispatch({ effects });
    }

    // Smooth scroll and cursor selection of inserted lines
    if (solutionTarget && solutionTarget.lang === currentLang) {
      const timer = setTimeout(() => {
        const activeView = viewRef.current;
        if (!activeView) return;
        const total = activeView.state.doc.lines;
        const validFrom = Math.max(1, Math.min(solutionTarget.fromLine, total));
        const validTo = Math.max(validFrom, Math.min(solutionTarget.toLine, total));

        const fromPos = activeView.state.doc.line(validFrom).from;
        const toPos = activeView.state.doc.line(validTo).to;

        // Native cursor text selection of the inserted lines
        activeView.dispatch({
          selection: EditorSelection.range(fromPos, toPos),
        });
        activeView.focus();

        const targetLineNum = Math.max(1, Math.min(solutionTarget.scrollToLine, total));
        const line = activeView.state.doc.line(targetLineNum);
        const lineBlock = activeView.lineBlockAt(line.from);
        const scroller = activeView.scrollDOM;

        const targetTop = Math.max(0, lineBlock.top - Math.round(scroller.clientHeight * 0.25));

        scroller.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }, 70);

      return () => clearTimeout(timer);
    }
  }, [code, tab, solutionTarget, currentLang, isReadOnly]);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'html', label: fileConfig.htmlName },
    { key: 'css', label: fileConfig.cssName },
    { key: 'js', label: fileConfig.jsName },
  ];

  return (
    <div className={`editor-pane ${className}`} style={style}>
      <div className="editor-header">
        <div className="editor-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`editor-tab ${!isReadOnly && tab === t.key ? 'active' : ''}`}
              onClick={() => {
                if (isReadOnly && onCloseViewOnly) onCloseViewOnly();
                onTabChange(t.key);
              }}
              id={`${id}-tab-${t.key}`}
              title={`Редактировать ${t.label}`}
            >
              <span className={`editor-tab-dot ${t.key}`} />
              {t.label}
            </button>
          ))}

          {viewOnlyFile && (
            <div className="editor-tab active read-only-tab" id={`${id}-tab-readonly`}>
              <span className={`editor-tab-dot ${viewOnlyFile.lang}`} />
              <span className="tab-name">{viewOnlyFile.name}</span>
              <span className="tab-readonly-badge">просмотр</span>
              {onCloseViewOnly && (
                <button
                  className="tab-close-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseViewOnly();
                  }}
                  title="Закрыть просмотр"
                  id={`${id}-close-readonly-btn`}
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>
        {headerActions && <div className="editor-actions">{headerActions}</div>}
      </div>

      {viewOnlyFile && (
        <div className="editor-readonly-notice">
          <div className="notice-left">
            <Lock size={12} className="notice-icon" />
            <span>
              Файл <strong>{viewOnlyFile.name}</strong> открыт только для чтения.
            </span>
          </div>
          {onCloseViewOnly && (
            <button className="btn-return-edit" onClick={onCloseViewOnly} id="btn-return-edit">
              Вернуться к редактированию
            </button>
          )}
        </div>
      )}

      <div className="editor-body" ref={editorRef} />
    </div>
  );
}

interface CodeEditorProps {
  code: CodeFiles;
  onCodeChange: (lang: keyof CodeFiles, value: string) => void;
  activeTab?: TabKey;
  theme: 'dark' | 'light';
  onReset?: () => void;
  tabOverride?: TabKey | null;
  onTabOverrideConsumed?: () => void;
  lessonId?: number;
  stepIndex?: number;
  viewOnlyFile?: ViewOnlyFile | null;
  onCloseViewOnly?: () => void;
  onSelectTab?: (tab: TabKey) => void;
  solutionTarget?: SolutionTarget | null;
}

export function CodeEditor({
  code,
  onCodeChange,
  activeTab,
  theme,
  onReset,
  tabOverride,
  onTabOverrideConsumed,
  lessonId = 1,
  stepIndex = 0,
  viewOnlyFile,
  onCloseViewOnly,
  onSelectTab,
  solutionTarget,
}: CodeEditorProps) {
  const [isSplit, setIsSplit] = useState<boolean>(() => {
    return localStorage.getItem('foma-editor-split') === 'true';
  });
  const [wordWrap, setWordWrap] = useState<boolean>(() => {
    return localStorage.getItem('foma-editor-wrap') === 'true';
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('foma-editor-font-size');
    return saved ? Number(saved) : 13;
  });
  const [topTab, setTopTab] = useState<TabKey>(activeTab || 'html');
  const [bottomTab, setBottomTab] = useState<TabKey>('css');
  const [splitRatio, setSplitRatio] = useState<number>(0.5);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Undo toast state
  const [toast, setToast] = useState<{ message: string; savedCode: CodeFiles } | null>(null);

  const fileConfig = getStepFileConfig(lessonId, stepIndex);

  // Handle tab override from global hotkeys (Alt+1/2/3) or FileTree click
  useEffect(() => {
    if (tabOverride) {
      setTopTab(tabOverride);
      if (onTabOverrideConsumed) onTabOverrideConsumed();
    }
  }, [tabOverride, onTabOverrideConsumed]);

  // Ctrl + Wheel to zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1 : -1;
        setFontSize((prev) => {
          const next = Math.max(10, Math.min(30, prev + delta));
          localStorage.setItem('foma-editor-font-size', String(next));
          return next;
        });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Switch tab when activeTab prop changes (e.g. new step)
  useEffect(() => {
    if (activeTab) {
      setTopTab(activeTab);
      if (activeTab === 'html') {
        setBottomTab('css');
      } else if (activeTab === 'css') {
        setBottomTab('html');
      }
    }
  }, [activeTab]);

  const toggleSplit = () => {
    setIsSplit((prev) => {
      const next = !prev;
      localStorage.setItem('foma-editor-split', String(next));
      if (next && bottomTab === topTab) {
        setBottomTab(topTab === 'html' ? 'css' : 'html');
      }
      return next;
    });
  };

  const closeSplit = () => {
    setIsSplit(false);
    localStorage.setItem('foma-editor-split', 'false');
  };

  const toggleWordWrap = () => {
    setWordWrap((prev) => {
      const next = !prev;
      localStorage.setItem('foma-editor-wrap', String(next));
      return next;
    });
  };

  const handleFormatTop = () => {
    if (viewOnlyFile) return;
    const formatted = formatCode(topTab, code[topTab]);
    onCodeChange(topTab, formatted);
  };

  const handleFormatBottom = () => {
    const formatted = formatCode(bottomTab, code[bottomTab]);
    onCodeChange(bottomTab, formatted);
  };

  const handleSplitterMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = ev.clientY - rect.top;
      const ratio = relativeY / rect.height;
      const clamped = Math.max(0.2, Math.min(0.8, ratio));
      setSplitRatio(clamped);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTopTabChange = (t: TabKey) => {
    setTopTab(t);
    if (onSelectTab) onSelectTab(t);
  };

  const topHeaderActions = (
    <>
      <button
        className={`btn-editor-action btn-editor-icon-only ${wordWrap ? 'active' : ''}`}
        onClick={toggleWordWrap}
        title={wordWrap ? 'Отключить перенос строк' : 'Включить перенос длинных строк (Word Wrap)'}
        aria-label={wordWrap ? 'Отключить перенос строк' : 'Включить перенос длинных строк'}
        id="toggle-wrap-btn"
      >
        <WrapText size={13} />
      </button>

      <button
        className={`btn-editor-action btn-editor-icon-only ${isSplit ? 'active' : ''}`}
        onClick={toggleSplit}
        title={isSplit ? 'Объединить в одну панель' : 'Разделить редактор по горизонтали (сверху и снизу)'}
        aria-label={isSplit ? 'Объединить в одну панель' : 'Разделить редактор по горизонтали'}
        id="toggle-split-btn"
      >
        {isSplit ? <Square size={13} /> : <Rows size={13} />}
      </button>

      {!viewOnlyFile && (
        <button
          className="btn btn-xs btn-ghost"
          onClick={handleFormatTop}
          title="Автоформатировать код активной вкладки (Shift+Alt+F)"
          id="editor-format-top-btn"
        >
          <Wand2 size={12} />
          <span>Формат</span>
        </button>
      )}

      {onReset && !viewOnlyFile && (
        <button
          className="btn btn-xs btn-ghost"
          onClick={() => {
            const savedCode = { ...code };
            onReset();
            setToast({ message: 'Код сброшен к началу шага', savedCode });
          }}
          title="Сбросить код к началу шага"
          id="editor-reset-btn"
        >
          <RotateCcw size={12} />
          <span>Сбросить</span>
        </button>
      )}
    </>
  );

  const bottomHeaderActions = (
    <>
      <button
        className="btn btn-xs btn-ghost"
        onClick={handleFormatBottom}
        title="Автоформатировать код активной вкладки (Shift+Alt+F)"
        id="editor-format-bottom-btn"
      >
        <Wand2 size={12} />
        <span>Формат</span>
      </button>

      <button
        className="btn btn-xs btn-ghost btn-close-split"
        onClick={closeSplit}
        title="Закрыть нижнюю панель"
        id="close-split-btn"
      >
        <X size={12} />
        <span>Закрыть</span>
      </button>
    </>
  );

  return (
    <div className="code-editor-shell">
      <div
        className="code-editor-wrapper"
        ref={containerRef}
        style={{ '--editor-font-size': `${fontSize}px` } as React.CSSProperties}
      >
        <SingleEditorPane
          id="top-editor"
          tab={topTab}
          onTabChange={handleTopTabChange}
          code={code}
          onCodeChange={onCodeChange}
          onFormat={handleFormatTop}
          theme={theme}
          wordWrap={wordWrap}
          headerActions={topHeaderActions}
          className="top-pane"
          style={isSplit ? { height: `${splitRatio * 100}%` } : { flex: 1 }}
          fileConfig={fileConfig}
          viewOnlyFile={viewOnlyFile}
          onCloseViewOnly={onCloseViewOnly}
          solutionTarget={solutionTarget}
        />

        {isSplit && (
          <>
            <div
              className={`editor-splitter ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleSplitterMouseDown}
              onDoubleClick={() => setSplitRatio(0.5)}
              title="Потяните для изменения пропорций (двойной клик — 50/50)"
            />
            <SingleEditorPane
              id="bottom-editor"
              tab={bottomTab}
              onTabChange={setBottomTab}
              code={code}
              onCodeChange={onCodeChange}
              onFormat={handleFormatBottom}
              theme={theme}
              wordWrap={wordWrap}
              headerActions={bottomHeaderActions}
              className="bottom-pane"
              style={{ flex: 1 }}
              fileConfig={fileConfig}
              solutionTarget={solutionTarget}
            />
          </>
        )}

        {toast && (
          <Toast
            message={toast.message}
            onUndo={() => {
              const saved = toast.savedCode;
              onCodeChange('html', saved.html);
              onCodeChange('css', saved.css);
              onCodeChange('js', saved.js);
            }}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
