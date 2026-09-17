import { useMemo, useState, useEffect, useRef, useCallback, memo } from 'react';
import { Download, FolderDown, Check, RotateCcw, Maximize2, ChevronDown, ChevronUp, Trash2, MoreHorizontal, Search, Minus, Plus, FileText, X } from 'lucide-react';
import type { CodeFiles } from '../../types/lesson';
import { downloadProjectZip, saveProjectToFolder, generateZipFilename } from '../../utils/exportProject';
import { CANONICAL_PROJECT_FILES, resolveVirtualPage, getStepFileConfig } from '../../utils/virtualFiles';
import { generateFullscreenPlayer } from '../../utils/fullscreenPlayer';
import './Preview.css';

interface PreviewProps {
  code: CodeFiles;
  lessonNumber?: number;
  stepNumber?: number;
  stepTitle?: string;
  activeHtmlFile?: string;
  searchParams?: string;
  allPages?: Record<string, string>;
  onNavigate?: (pageKey: string, search: string) => void;
  onResetPage?: () => void;
  isTheory?: boolean;
}

/** Console log entry from iframe */
interface ConsoleEntry {
  id: number;
  level: 'log' | 'warn' | 'error' | 'runtime-error';
  message: string;
}

let consoleIdCounter = 0;

/** Zoom levels matching browser steps (50% to 200%) */
const ZOOM_STEPS = [0.5, 0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0];
const PRESET_ZOOMS = [0.5, 0.75, 0.9, 1.0, 1.1, 1.25, 1.5, 2.0];
const MIN_ZOOM = ZOOM_STEPS[0];
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1];
const DEFAULT_ZOOM = 1.0;
const DEFAULT_CONSOLE_HEIGHT = 180;
const MIN_CONSOLE_HEIGHT = 56;

/** Dynamic zoom CSS injected into iframe */
const getZoomStyle = (zoom: number) => `<style id="foma-preview-zoom">
  :root { --preview-zoom: ${zoom}; }
  html {
    zoom: ${zoom};
  }
  @supports not (zoom: 1) {
    html {
      transform: scale(var(--preview-zoom, 1));
      transform-origin: 0 0;
      width: calc(100% / var(--preview-zoom, 1));
      min-height: calc(100% / var(--preview-zoom, 1));
    }
  }
</style>`;

const CLOSE_SCRIPT = '</' + 'script>';

/** Script injected into srcdoc to handle postMessage zoom, wheel zoom, and shortcuts */
const ZOOM_INTERCEPT_SCRIPT = `<script>
(function() {
  function applyZoom(z) {
    try {
      document.documentElement.style.zoom = z;
      document.documentElement.style.setProperty('--preview-zoom', z);
    } catch(e) {}
  }
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'foma-set-zoom' && typeof e.data.zoom === 'number') {
      applyZoom(e.data.zoom);
    }
  });
  window.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
      e.preventDefault();
      window.parent.postMessage({ type: 'foma-zoom-wheel', deltaY: e.deltaY }, '*');
    }
  }, { passive: false });
  window.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        window.parent.postMessage({ type: 'foma-zoom-key', action: 'in' }, '*');
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        window.parent.postMessage({ type: 'foma-zoom-key', action: 'out' }, '*');
      } else if (e.key === '0') {
        e.preventDefault();
        window.parent.postMessage({ type: 'foma-zoom-key', action: 'reset' }, '*');
      }
    }
  });
})();
${CLOSE_SCRIPT}`;

/** Script injected into srcdoc to capture console output and runtime errors */
const CONSOLE_INTERCEPT_SCRIPT = `<script>
(function() {
  function createFallbackStorage() {
    var memoryStore = {};
    return {
      getItem: function(k) { return Object.prototype.hasOwnProperty.call(memoryStore, k) ? memoryStore[k] : null; },
      setItem: function(k, v) { memoryStore[k] = String(v); },
      removeItem: function(k) { delete memoryStore[k]; },
      clear: function() { memoryStore = {}; },
      key: function(i) { return Object.keys(memoryStore)[i] || null; },
      get length() { return Object.keys(memoryStore).length; }
    };
  }

  // Безопасный polyfill для localStorage и sessionStorage в sandboxed iframe
  try {
    var testKey = '__foma_test_ls__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
  } catch (err) {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: createFallbackStorage(),
        configurable: true,
        enumerable: true,
        writable: true
      });
    } catch (e) {}
  }

  try {
    var testKeySession = '__foma_test_ss__';
    window.sessionStorage.setItem(testKeySession, '1');
    window.sessionStorage.removeItem(testKeySession);
  } catch (err) {
    try {
      Object.defineProperty(window, 'sessionStorage', {
        value: createFallbackStorage(),
        configurable: true,
        enumerable: true,
        writable: true
      });
    } catch (e) {}
  }

  window.onerror = function(msg, src, line, col) {
    try {
      window.parent.postMessage({ type: 'foma-runtime-error', msg: String(msg), line: line, col: col }, '*');
    } catch(e) {}
  };
  ['log','warn','error'].forEach(function(method) {
    var orig = console[method];
    console[method] = function() {
      var args = Array.prototype.slice.call(arguments);
      try {
        window.parent.postMessage({
          type: 'foma-console',
          level: method,
          args: args.map(function(a) {
            try { return typeof a === 'object' ? JSON.stringify(a) : String(a); }
            catch(e) { return String(a); }
          })
        }, '*');
      } catch(e) {}
      orig.apply(console, args);
    };
  });
})();
${CLOSE_SCRIPT}`;

/** Script injected into srcdoc to capture link clicks and programmatic navigation */
const NAV_INTERCEPT_SCRIPT = `<script id="foma-nav-interceptor">
(function() {
  window.__fomaNavigate = function(href) {
    try {
      window.parent.postMessage({ type: 'foma-navigate', href: String(href) }, '*');
    } catch(e) {}
  };
  try {
    window.location.assign = window.location.replace = window.__fomaNavigate;
  } catch(e) {}

  document.addEventListener('click', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      a.setAttribute('target', '_blank');
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    window.__fomaNavigate(href);
  }, true);

  window.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG') {
      var src = e.target.getAttribute('src');
      if (src && src.startsWith('../img/')) {
        e.target.src = src.replace('../img/', 'img/');
      } else if (src && src.startsWith('img/')) {
        e.target.src = '../' + src;
      }
    }
  }, true);
})();
${CLOSE_SCRIPT}`;

/** Script injected into srcdoc to mock search params and pathname */
const getLocationScript = (pageKey: string, search: string) => `<script id="foma-virtual-location">
(function() {
  var vSearch = ${JSON.stringify(search || '')};
  var vPath = ${JSON.stringify('/' + pageKey)};
  try { history.replaceState(null, '', vPath + vSearch); } catch(e) {}
  try {
    Object.defineProperty(window.location, 'search', {
      get: function() { return vSearch; },
      configurable: true
    });
  } catch(e) {}
  try {
    Object.defineProperty(window.location, 'pathname', {
      get: function() { return vPath; },
      configurable: true
    });
  } catch(e) {}
})();
${CLOSE_SCRIPT}`;

/** Script injected into srcdoc to provide SmartOffice dataset fallback */
const getDataScript = () => `<script id="foma-canonical-data">
if (typeof window.OFFICE_ROOMS === 'undefined') {
  try {
    var dataCode = ${JSON.stringify(
      (CANONICAL_PROJECT_FILES['data.js'] || '')
        .replace(/const OFFICE_ROOMS/g, 'window.OFFICE_ROOMS')
        .replace(/const MOCK_BOOKINGS/g, 'window.MOCK_BOOKINGS')
    ).replace(/</g, '\\u003c')};
    (new Function(dataCode))();
  } catch(e) {}
}
${CLOSE_SCRIPT}`;

export const Preview = memo(function Preview({
  code,
  lessonNumber = 1,
  stepNumber = 1,
  stepTitle = 'код',
  activeHtmlFile,
  searchParams = '',
  allPages,
  onNavigate,
  onResetPage,
  isTheory,
}: PreviewProps) {
  const isIsolatedTheory = Boolean(isTheory || lessonNumber === 1);
  const stepConfig = useMemo(() => getStepFileConfig(lessonNumber, (stepNumber || 1) - 1), [lessonNumber, stepNumber]);
  const defaultHtmlFile = stepConfig.htmlName || 'index.html';

  const [currentHtmlKey, setCurrentHtmlKey] = useState<string>(activeHtmlFile || defaultHtmlFile);
  const [currentSearch, setCurrentSearch] = useState<string>(searchParams || '');

  useEffect(() => {
    if (activeHtmlFile) {
      setCurrentHtmlKey(activeHtmlFile);
    }
  }, [activeHtmlFile]);

  useEffect(() => {
    if (searchParams !== undefined) {
      setCurrentSearch(searchParams);
    }
  }, [searchParams]);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const [consoleHeight, setConsoleHeight] = useState<number>(() => {
    const saved = localStorage.getItem('foma-preview-console-height');
    const parsed = saved ? Number(saved) : DEFAULT_CONSOLE_HEIGHT;
    return isNaN(parsed) || parsed < MIN_CONSOLE_HEIGHT ? DEFAULT_CONSOLE_HEIGHT : parsed;
  });
  const [consoleExpanded, setConsoleExpanded] = useState<boolean>(() => {
    return localStorage.getItem('foma-preview-console-expanded') === 'true';
  });
  const [isDraggingConsole, setIsDraggingConsole] = useState(false);
  const isDraggingConsoleRef = useRef(false);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    const saved = localStorage.getItem('foma-preview-zoom');
    const val = saved ? parseFloat(saved) : DEFAULT_ZOOM;
    return !isNaN(val) && val >= MIN_ZOOM && val <= MAX_ZOOM ? val : DEFAULT_ZOOM;
  });

  const toggleConsole = useCallback(() => {
    setConsoleExpanded((prev) => {
      const next = !prev;
      localStorage.setItem('foma-preview-console-expanded', String(next));
      return next;
    });
  }, []);

  const handleConsoleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ('cancelable' in e && e.cancelable) {
      e.preventDefault();
    }
    if (!consoleExpanded) {
      setConsoleExpanded(true);
      localStorage.setItem('foma-preview-console-expanded', 'true');
    }
    isDraggingConsoleRef.current = true;
    setIsDraggingConsole(true);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    document.body.classList.add('is-resizing-row');

    const getClientY = (ev: MouseEvent | TouchEvent) => {
      if ('touches' in ev && ev.touches && ev.touches.length > 0) {
        return ev.touches[0].clientY;
      }
      return (ev as MouseEvent).clientY;
    };

    const handleMove = (ev: MouseEvent | TouchEvent) => {
      if (!isDraggingConsoleRef.current || !previewWrapperRef.current) return;
      const clientY = getClientY(ev);
      const rect = previewWrapperRef.current.getBoundingClientRect();
      const rawHeight = rect.bottom - clientY;
      const minH = MIN_CONSOLE_HEIGHT;
      const maxH = Math.max(minH, rect.height - 80);
      const clamped = Math.max(minH, Math.min(maxH, rawHeight));
      setConsoleHeight(clamped);
      localStorage.setItem('foma-preview-console-height', String(clamped));
    };

    const handleEnd = () => {
      isDraggingConsoleRef.current = false;
      setIsDraggingConsole(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.classList.remove('is-resizing-row');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleEnd);
  };

  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.classList.remove('is-resizing-row');
    };
  }, []);

  const consoleEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const zoomMenuRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasFolderApi = typeof window !== 'undefined' && 'showDirectoryPicker' in window;
  const targetZipName = useMemo(
    () => generateZipFilename(lessonNumber, stepNumber, stepTitle),
    [lessonNumber, stepNumber, stepTitle]
  );

  const changeZoom = useCallback((newZoom: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(newZoom * 100) / 100));
    setZoomLevel(clamped);
    localStorage.setItem('foma-preview-zoom', String(clamped));
    try {
      iframeRef.current?.contentWindow?.postMessage({
        type: 'foma-set-zoom',
        zoom: clamped,
      }, '*');
    } catch(e) {}
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((current) => {
      const next = ZOOM_STEPS.find((s) => s > current + 0.01) ?? MAX_ZOOM;
      changeZoom(next);
      return next;
    });
  }, [changeZoom]);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((current) => {
      const prev = [...ZOOM_STEPS].reverse().find((s) => s < current - 0.01) ?? MIN_ZOOM;
      changeZoom(prev);
      return prev;
    });
  }, [changeZoom]);

  const handleResetZoom = useCallback(() => {
    changeZoom(DEFAULT_ZOOM);
  }, [changeZoom]);

  const zoomActionsRef = useRef({ handleZoomIn, handleZoomOut, handleResetZoom });
  useEffect(() => {
    zoomActionsRef.current = { handleZoomIn, handleZoomOut, handleResetZoom };
  }, [handleZoomIn, handleZoomOut, handleResetZoom]);

  // Listen for postMessage from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'foma-console') {
        const entry: ConsoleEntry = {
          id: ++consoleIdCounter,
          level: e.data.level || 'log',
          message: (e.data.args || []).join(' '),
        };
        setConsoleLogs((prev) => [...prev, entry]);
        if (entry.level === 'error') setConsoleExpanded(true);
      } else if (e.data.type === 'foma-runtime-error') {
        const entry: ConsoleEntry = {
          id: ++consoleIdCounter,
          level: 'runtime-error',
          message: `${e.data.msg}${e.data.line ? ` (строка ${e.data.line})` : ''}`,
        };
        setConsoleLogs((prev) => [...prev, entry]);
        setConsoleExpanded(true);
      } else if (e.data.type === 'foma-zoom-wheel') {
        if (typeof e.data.deltaY === 'number') {
          if (e.data.deltaY < 0) {
            zoomActionsRef.current.handleZoomIn();
          } else if (e.data.deltaY > 0) {
            zoomActionsRef.current.handleZoomOut();
          }
        }
      } else if (e.data.type === 'foma-zoom-key') {
        if (e.data.action === 'in') zoomActionsRef.current.handleZoomIn();
        else if (e.data.action === 'out') zoomActionsRef.current.handleZoomOut();
        else if (e.data.action === 'reset') zoomActionsRef.current.handleResetZoom();
      } else if (e.data.type === 'foma-navigate') {
        if (typeof e.data.href === 'string') {
          const { pageKey, search } = resolveVirtualPage(e.data.href);
          setCurrentHtmlKey(pageKey);
          setCurrentSearch(search);
          if (onNavigate) {
            onNavigate(pageKey, search);
          }
        }
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Auto-scroll console to bottom
  useEffect(() => {
    if (consoleExpanded && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs, consoleExpanded]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!menuOpen && !zoomMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuOpen && menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
      if (zoomMenuOpen && zoomMenuRef.current && !zoomMenuRef.current.contains(target)) {
        setZoomMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen, zoomMenuOpen]);

  // Clear console on refresh
  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
    setConsoleLogs([]);
  }, []);

  // Compute base URL so that img/ paths resolve correctly both on file:// and web servers
  const baseHref = useMemo(() => {
    try {
      const href = window.location.href;
      // Strip filename and query — keep just the directory path
      return href.replace(/[^/]*$/, '');
    } catch {
      return '/';
    }
  }, []);

  const srcdoc = useMemo(() => {
    const rawHtml = isIsolatedTheory
      ? (code.html || '')
      : ((allPages && allPages[currentHtmlKey]) ||
         (currentHtmlKey === defaultHtmlFile ? code.html : CANONICAL_PROJECT_FILES[currentHtmlKey]) ||
         code.html || '');
    const hasDocType = rawHtml.includes('<!DOCTYPE') || rawHtml.includes('<html');
    const zoomCss = getZoomStyle(zoomLevel);
    const locationScript = isIsolatedTheory ? '' : getLocationScript(currentHtmlKey, currentSearch);
    const dataScript = isIsolatedTheory ? '' : getDataScript();

    // 1. Remove external style.css / data.js / main.js to prevent 404s against Vite dev server
    let html = rawHtml
      .replace(/<link[^>]*href=["'][^"']*style\.css["'][^>]*>/gi, '')
      .replace(/<script[^>]*src=["'][^"']*(?:data|main)\.js["'][^>]*><\/script>/gi, '');

    // 2. Dynamic base href
    if (!html.includes('<base')) {
      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>\n  <base href="${baseHref}">`);
      } else {
        html = `<base href="${baseHref}">` + html;
      }
    }

    // Ensure responsive viewport meta tag for mobile devices
    if (!html.includes('viewport')) {
      const metaViewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>\n  ${metaViewport}`);
      } else {
        html = `${metaViewport}\n` + html;
      }
    }

    // 3. Head scripts & inlined CSS
    const scriptsToInject = `${CONSOLE_INTERCEPT_SCRIPT}\n${ZOOM_INTERCEPT_SCRIPT}\n${NAV_INTERCEPT_SCRIPT}\n${locationScript}\n${dataScript}\n${zoomCss}`;
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>\n${scriptsToInject}`);
    } else {
      html = scriptsToInject + html;
    }

    const cssContent = isIsolatedTheory
      ? (code.css || '')
      : (code.css || CANONICAL_PROJECT_FILES['style.css'] || '');
    const styleTag = `<style id="foma-inlined-css">\n${cssContent}\n</style>`;
    if (html.includes('</head>')) {
      html = html.replace('</head>', `  ${styleTag}\n</head>`);
    } else {
      html = styleTag + html;
    }

    // 4. JS scripts with location navigation intercepted
    const sanitizeNavigation = (jsCode: string) => {
      return (jsCode || '')
        .replace(/(?:window\.)?location\.(?:assign|replace)\(([^)]+)\);?/g, 'window.__fomaNavigate($1);')
        .replace(/(?:window\.)?location\.href\s*=\s*([^;\r\n]+);?/g, 'window.__fomaNavigate($1);');
    };
    const sanitizedUserJs = sanitizeNavigation(code.js || '');
    const sanitizedCanonicalJs = isIsolatedTheory ? '' : sanitizeNavigation(CANONICAL_PROJECT_FILES['main.js'] || '');

    const userScript = sanitizedUserJs
      ? `<script>\ntry {\n${sanitizedUserJs}\n} catch(e) { window.parent.postMessage({ type: 'foma-runtime-error', msg: String(e) }, '*'); }\n${CLOSE_SCRIPT}`
      : '';
    const canonicalScript = sanitizedCanonicalJs
      ? `<script>\ntry {\n${sanitizedCanonicalJs}\n} catch(e) {}\n${CLOSE_SCRIPT}`
      : '';

    const allScripts = `${userScript}\n${canonicalScript}`;

    if (hasDocType) {
      if (html.includes('</body>')) {
        html = html.replace('</body>', `  ${allScripts}\n</body>`);
      } else {
        html = html + '\n' + allScripts;
      }
      return html;
    }

    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="${baseHref}">
  ${scriptsToInject}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ${styleTag}
</head>
<body>
${html}
${allScripts}
</body>
</html>`;
  }, [code.html, code.css, code.js, zoomLevel, baseHref, currentHtmlKey, currentSearch, allPages, defaultHtmlFile, isIsolatedTheory]);

  const handleSaveToFolder = async () => {
    const res = await saveProjectToFolder(code);
    if (res.success) {
      setStatusMsg('Сохранено в папку!');
      setTimeout(() => setStatusMsg(null), 3500);
    } else if (res.message) {
      alert(res.message);
    }
  };

  const handleDownloadZip = async () => {
    const filename = await downloadProjectZip(
      code,
      lessonNumber,
      stepNumber,
      stepTitle
    );
    setStatusMsg(`ZIP скачан (${filename})`);
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleOpenFullscreen = useCallback(() => {
    const playerHtml = generateFullscreenPlayer({
      initialPage: currentHtmlKey,
      initialSearch: currentSearch,
      pages: isIsolatedTheory
        ? { [defaultHtmlFile]: code.html || '' }
        : (allPages || CANONICAL_PROJECT_FILES),
      css: isIsolatedTheory
        ? (code.css || '')
        : (code.css || CANONICAL_PROJECT_FILES['style.css'] || ''),
      userJs: code.js || '',
      canonicalJs: isIsolatedTheory ? '' : (CANONICAL_PROJECT_FILES['main.js'] || ''),
      dataJs: isIsolatedTheory ? '' : (CANONICAL_PROJECT_FILES['data.js'] || ''),
      baseHref,
    });
    const blob = new Blob([playerHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }, [currentHtmlKey, currentSearch, allPages, code.css, code.js, baseHref, isIsolatedTheory, defaultHtmlFile]);

  const handleContainerWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else if (e.deltaY > 0) {
        handleZoomOut();
      }
    }
  };

  const errorCount = consoleLogs.filter((l) => l.level === 'error' || l.level === 'runtime-error').length;

  return (
    <div className="preview-wrapper" ref={previewWrapperRef}>
      <div className="preview-header">
        <div className="preview-header-left">
          <span className="preview-header-title">Результат</span>
          {currentHtmlKey !== defaultHtmlFile && (
            <div className="preview-page-badge" title={`Просмотр виртуальной страницы: ${currentHtmlKey}`}>
              <FileText size={12} strokeWidth={1.5} className="preview-page-badge-icon" />
              <span className="preview-page-badge-label">{currentHtmlKey}</span>
              <button
                type="button"
                className="preview-page-badge-close"
                onClick={() => {
                  setCurrentHtmlKey(defaultHtmlFile);
                  setCurrentSearch('');
                  if (onResetPage) onResetPage();
                  else if (onNavigate) onNavigate(defaultHtmlFile, '');
                }}
                title="Вернуться к файлу текущего урока"
                aria-label="Вернуться к файлу текущего урока"
              >
                <X size={12} strokeWidth={1.5} />
              </button>
            </div>
          )}
          {statusMsg && (
            <span className="preview-status-badge">
              <Check size={12} />
              {statusMsg}
            </span>
          )}
        </div>
        <div className="preview-header-actions" ref={menuRef}>
          {/* Zoom controls (browser magnifier) */}
          <div className="preview-zoom-group" ref={zoomMenuRef} id="preview-zoom-controls">
            <button
              className="preview-zoom-btn"
              onClick={handleZoomOut}
              disabled={zoomLevel <= MIN_ZOOM}
              title="Уменьшить масштаб (Ctrl -)"
              aria-label="Уменьшить масштаб"
              id="preview-zoom-out-btn"
            >
              <Minus size={11} strokeWidth={2.2} />
            </button>
            <button
              className={`preview-zoom-indicator ${zoomLevel !== 1.0 ? 'is-zoomed' : ''}`}
              onClick={() => setZoomMenuOpen((v) => !v)}
              title={zoomLevel !== 1.0 ? "Масштаб изменён. Кликните для выбора или сброса (Ctrl 0)" : "Масштаб превью (клик для выбора)"}
              aria-label="Выбрать масштаб"
              aria-haspopup="true"
              aria-expanded={zoomMenuOpen}
              id="preview-zoom-val-btn"
            >
              <Search size={11} strokeWidth={2} className="preview-zoom-icon" />
              <span>{Math.round(zoomLevel * 100)}%</span>
            </button>
            <button
              className="preview-zoom-btn"
              onClick={handleZoomIn}
              disabled={zoomLevel >= MAX_ZOOM}
              title="Увеличить масштаб (Ctrl +)"
              aria-label="Увеличить масштаб"
              id="preview-zoom-in-btn"
            >
              <Plus size={11} strokeWidth={2.2} />
            </button>

            {zoomMenuOpen && (
              <div className="preview-dropdown preview-zoom-dropdown" role="menu" id="preview-zoom-menu">
                <div className="preview-dropdown-header">Масштаб</div>
                {PRESET_ZOOMS.map((preset) => {
                  const isCurrent = Math.abs(preset - zoomLevel) < 0.01;
                  return (
                    <button
                      key={preset}
                      className={`preview-dropdown-item ${isCurrent ? 'active' : ''}`}
                      onClick={() => {
                        changeZoom(preset);
                        setZoomMenuOpen(false);
                      }}
                      role="menuitem"
                    >
                      <span className="preview-zoom-check">
                        {isCurrent && <Check size={11} strokeWidth={2.5} />}
                      </span>
                      <span>{Math.round(preset * 100)}%</span>
                      {preset === 1.0 && <span className="preview-zoom-def-label">исходный</span>}
                    </button>
                  );
                })}
                {zoomLevel !== 1.0 && (
                  <>
                    <div className="preview-dropdown-divider" />
                    <button
                      className="preview-dropdown-item preview-zoom-reset-item"
                      onClick={() => {
                        handleResetZoom();
                        setZoomMenuOpen(false);
                      }}
                      role="menuitem"
                    >
                      <RotateCcw size={11} />
                      <span>Сбросить к 100%</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="btn btn-xs btn-ghost"
            onClick={handleRefresh}
            title="Перезапустить превью (Ctrl+R)"
            id="refresh-preview-btn"
          >
            <RotateCcw size={12} />
          </button>
          <button
            className="btn btn-xs btn-ghost"
            onClick={handleOpenFullscreen}
            title="Полный экран (открыть в отдельной вкладке)"
            id="fullscreen-preview-btn"
          >
            <Maximize2 size={12} />
          </button>
          <div className="preview-menu-wrap">
            <button
              className={`btn btn-xs btn-ghost preview-menu-trigger ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              title="Дополнительные действия"
              id="preview-more-btn"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <MoreHorizontal size={13} />
            </button>
            {menuOpen && (
              <div className="preview-dropdown" role="menu">
                <button
                  className="preview-dropdown-item"
                  onClick={() => {
                    handleDownloadZip();
                    setMenuOpen(false);
                  }}
                  id="download-zip-btn"
                  role="menuitem"
                  title={`Скачать ZIP: ${targetZipName}`}
                >
                  <Download size={12} />
                  <span>Скачать ZIP</span>
                </button>
                {hasFolderApi && (
                  <button
                    className="preview-dropdown-item"
                    onClick={() => {
                      handleSaveToFolder();
                      setMenuOpen(false);
                    }}
                    id="save-to-folder-btn"
                    role="menuitem"
                  >
                    <FolderDown size={12} />
                    <span>Сохранить в папку</span>
                  </button>
                )}
                <button
                  className="preview-dropdown-item"
                  onClick={() => {
                    handleOpenFullscreen();
                    setMenuOpen(false);
                  }}
                  id="fullscreen-preview-dropdown-btn"
                  role="menuitem"
                >
                  <Maximize2 size={12} />
                  <span>Полный экран</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="preview-body" onWheel={handleContainerWheel}>
        <iframe
          ref={iframeRef}
          key={refreshKey}
          srcDoc={srcdoc}
          title="Preview"
          sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
          id="preview-iframe"
        />
      </div>

      {/* Console row resizer divider */}
      <div
        className={`preview-console-resizer ${isDraggingConsole ? 'active' : ''}`}
        onMouseDown={handleConsoleResizeStart}
        onTouchStart={handleConsoleResizeStart}
        onDoubleClick={() => {
          if (!consoleExpanded) {
            setConsoleExpanded(true);
            localStorage.setItem('foma-preview-console-expanded', 'true');
          }
          setConsoleHeight(DEFAULT_CONSOLE_HEIGHT);
          localStorage.setItem('foma-preview-console-height', String(DEFAULT_CONSOLE_HEIGHT));
        }}
        title="Потяните для изменения высоты (двойной клик — сброс)"
        id="resizer-preview-console"
      />

      {/* Console panel */}
      <div
        className={`preview-console ${consoleExpanded ? 'expanded' : ''}`}
        style={consoleExpanded ? { height: `${consoleHeight}px` } : undefined}
      >
        <div
          className="preview-console-header"
          onClick={toggleConsole}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleConsole()}
          id="console-toggle"
        >
          <span className="preview-console-title">Консоль</span>
          {errorCount > 0 && (
            <span className="preview-console-error-badge">{errorCount}</span>
          )}
          {consoleLogs.length > 0 && !consoleExpanded && (
            <span className="preview-console-count">{consoleLogs.length}</span>
          )}
          <div className="preview-console-actions">
            {consoleExpanded && consoleLogs.length > 0 && (
              <button
                className="preview-console-clear"
                onClick={(e) => { e.stopPropagation(); setConsoleLogs([]); }}
                title="Очистить консоль"
                id="console-clear-btn"
              >
                <Trash2 size={11} />
              </button>
            )}
            {consoleExpanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </div>
        </div>
        {consoleExpanded && (
          <div className="preview-console-body">
            {consoleLogs.length === 0 && (
              <div className="preview-console-empty">Пусто — используйте console.log() в JS</div>
            )}
            {consoleLogs.map((entry) => (
              <div key={entry.id} className={`preview-console-entry level-${entry.level}`}>
                <span className="preview-console-level-icon">
                  {entry.level === 'error' || entry.level === 'runtime-error' ? '✕' : entry.level === 'warn' ? '▲' : '›'}
                </span>
                <span className="preview-console-text">{entry.message}</span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        )}
      </div>
    </div>
  );
});
