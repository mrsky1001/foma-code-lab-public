import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, FlaskConical, ChevronDown, Check, ShieldOff, ShieldCheck, Eye } from 'lucide-react';
import { BUILD_INFO } from '../../version';
import { isLocalMachine } from '../../utils/admin';
import type { Theme, ThemePalette, ThemeMode } from '../../hooks/useTheme';
import './Header.css';

interface HeaderProps {
  theme: Theme;
  palette?: ThemePalette;
  mode?: ThemeMode;
  onSetPalette?: (palette: ThemePalette) => void;
  onSetMode?: (mode: ThemeMode) => void;
  onToggleMode?: () => void;
  onToggleTheme?: () => void;
  onSetTheme?: (theme: Theme) => void;
  onToggleSidebar: () => void;
  // Dev quiz testing
  lessonTitles?: { id: number; title: string }[];
  onDevQuiz?: (lessonId: number) => void;
  onDevQuizResult?: (lessonId: number) => void;
  // Admin mode controls (localhost only)
  isLocal?: boolean;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
}

const PALETTES: { id: ThemePalette; name: string; dotClass: string }[] = [
  { id: 'azure', name: 'Azure', dotClass: 'theme-dot-azure' },
  { id: 'coral', name: 'Coral', dotClass: 'theme-dot-coral' },
  { id: 'emerald', name: 'Emerald', dotClass: 'theme-dot-emerald' },
  { id: 'purple', name: 'Purple', dotClass: 'theme-dot-purple' },
];

export function Header({
  theme,
  palette,
  mode,
  onSetPalette,
  onSetMode,
  onToggleMode,
  onToggleTheme,
  onSetTheme,
  onToggleSidebar,
  lessonTitles,
  onDevQuiz,
  onDevQuizResult,
  isLocal = isLocalMachine(),
  isAdmin = false,
  onToggleAdmin,
}: HeaderProps) {
  const [devMenuOpen, setDevMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  // Derive current palette and mode with fallback to theme prop
  const currentPalette: ThemePalette =
    palette ||
    (theme === 'coral' || theme === 'dark'
      ? 'coral'
      : theme === 'emerald'
      ? 'emerald'
      : theme === 'purple'
      ? 'purple'
      : 'azure');

  const currentMode: ThemeMode = mode || (theme === 'light' ? 'light' : 'dark');

  const currentPaletteObj = PALETTES.find((p) => p.id === currentPalette) || PALETTES[0];

  // Close dropdown on outside click
  useEffect(() => {
    if (!themeDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [themeDropdownOpen]);

  return (
    <header className="header" id="app-header">
      <div className="header-left">
        <button
          className="btn-icon"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          id="sidebar-toggle"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="header-logo">
          <div className="header-logo-mark">F</div>
          <div className="header-brand-group">
            <div className="header-brand-title-row">
              <span className="header-logo-text">Foma Code Lab</span>
              <span className="header-badge-beta">Beta</span>
            </div>
            <div className="header-version-info" title={`Коммит: ${BUILD_INFO.commit} от ${BUILD_INFO.date}`}>
              <span className="header-commit-hash">{BUILD_INFO.commit}</span>
              <span className="header-version-dot">·</span>
              <span className="header-commit-date">{BUILD_INFO.date}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="header-right">
        <div className="header-notice" id="header-dev-notice">
          <span className="notice-text">Сервис находится в разработке. По поводу ошибок и вопросов пишите:</span>
          <a
            href="mailto:mrsky1001.work@gmail.com"
            className="notice-link"
            title="Сообщить об ошибке или предложении: mrsky1001.work@gmail.com"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="notice-mail-icon">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="notice-email">mrsky1001.work@gmail.com</span>
          </a>
        </div>

        {/* 1. Theme Palette Dropdown */}
        <div className="theme-dropdown-wrap" ref={themeDropdownRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="theme-dropdown-btn"
            onClick={() => setThemeDropdownOpen((v) => !v)}
            title="Выбор темы (палитры)"
            aria-label="Выбор темы"
            id="theme-select-toggle"
            aria-expanded={themeDropdownOpen}
          >
            <span className={`theme-dot ${currentPaletteObj.dotClass}`} />
            <span className="theme-dropdown-label">{currentPaletteObj.name}</span>
            <ChevronDown size={12} strokeWidth={1.5} className={`theme-chevron ${themeDropdownOpen ? 'open' : ''}`} />
          </button>
          {themeDropdownOpen && (
            <div className="theme-dropdown-menu" role="menu">
              {PALETTES.map((p) => {
                const isSelected = p.id === currentPalette;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`theme-dropdown-item ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      if (onSetPalette) onSetPalette(p.id);
                      else onSetTheme?.(p.id);
                      setThemeDropdownOpen(false);
                    }}
                    role="menuitem"
                  >
                    <span className={`theme-dot ${p.dotClass}`} />
                    <span className="theme-item-name">{p.name}</span>
                    {isSelected && <Check size={12} strokeWidth={2} className="theme-item-check" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Light / Dark Mode Toggle */}
        <div className="header-mode-toggle theme-mode-toggle" id="theme-mode-toggle" role="radiogroup" aria-label="Светлая или тёмная тема">
          <button
            type="button"
            className={`mode-btn ${currentMode === 'dark' ? 'active' : ''}`}
            onClick={() => {
              if (onSetMode) onSetMode('dark');
              else if (onToggleMode) onToggleMode();
              else if (onToggleTheme) onToggleTheme();
              else onSetTheme?.('dark');
            }}
            title="Тёмный режим интерфейса"
            aria-label="Тёмная тема"
            aria-checked={currentMode === 'dark'}
            role="radio"
            id="theme-mode-dark"
          >
            <Moon size={12} strokeWidth={1.5} />
            <span className="mode-btn-label">Тёмная</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${currentMode === 'light' ? 'active' : ''}`}
            onClick={() => {
              if (onSetMode) onSetMode('light');
              else if (onToggleMode) onToggleMode();
              else if (onToggleTheme) onToggleTheme();
              else onSetTheme?.('light');
            }}
            title="Светлый режим интерфейса"
            aria-label="Светлая тема"
            aria-checked={currentMode === 'light'}
            role="radio"
            id="theme-mode-light"
          >
            <Sun size={12} strokeWidth={1.5} />
            <span className="mode-btn-label">Светлая</span>
          </button>
        </div>

        {isLocal && onToggleAdmin && (
          <button
            className={`admin-toggle-btn ${isAdmin ? 'admin-active' : 'admin-disabled'}`}
            onClick={onToggleAdmin}
            title={isAdmin ? 'Кликните, чтобы отключить админа и протестировать последовательное открытие уроков для учеников' : 'Кликните, чтобы включить режим админа (все уроки открыты)'}
            id="admin-mode-toggle"
          >
            {isAdmin ? <ShieldOff size={13} strokeWidth={1.5} /> : <ShieldCheck size={13} strokeWidth={1.5} />}
            <span>{isAdmin ? 'Отключить админа' : 'Включить админа'}</span>
          </button>
        )}

        {isLocal && lessonTitles && onDevQuiz && (
          <div className="dev-quiz-wrap" style={{ position: 'relative' }}>
            <button
              className="dev-quiz-btn"
              onClick={() => setDevMenuOpen(v => !v)}
              id="dev-quiz-toggle"
            >
              <FlaskConical size={13} />
              <span>Тесты</span>
              <ChevronDown size={11} />
            </button>
            {devMenuOpen && (
              <div className="dev-quiz-dropdown" onMouseLeave={() => setDevMenuOpen(false)}>
                {lessonTitles.map(l => (
                  <div key={l.id} style={{ display: 'flex' }}>
                    <button
                      className="dev-quiz-item"
                      style={{ flex: 1 }}
                      onClick={() => { onDevQuiz(l.id); setDevMenuOpen(false); }}
                      id={`dev-quiz-${l.id}`}
                    >
                      <span className="dev-quiz-num">{l.id}</span>
                      {l.title}
                    </button>
                    {onDevQuizResult && (
                      <button
                        className="dev-quiz-item"
                        style={{ flex: 'none', padding: '6px', borderLeft: '1px solid var(--border-subtle)', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, opacity: 0.7 }}
                        title="Посмотреть ответы (100%)"
                        onClick={() => { onDevQuizResult(l.id); setDevMenuOpen(false); }}
                      >
                        <Eye size={13} strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
