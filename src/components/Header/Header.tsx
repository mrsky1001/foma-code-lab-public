import { useState } from 'react';
import { Sun, Moon, FlaskConical, ChevronDown, ShieldOff, ShieldCheck, Eye } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
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

const IS_LOCAL = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '[::1]' || window.location.hostname.endsWith('.local') || window.location.hostname === '' || window.location.protocol === 'file:');

export function Header({
  theme,
  onToggleTheme,
  onToggleSidebar,
  lessonTitles,
  onDevQuiz,
  onDevQuizResult,
  isLocal = IS_LOCAL,
  isAdmin = false,
  onToggleAdmin,
}: HeaderProps) {
  const [devMenuOpen, setDevMenuOpen] = useState(false);
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
          <span className="header-logo-text">Foma Code Lab</span>
          <span className="header-badge-beta">Beta</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-notice" id="header-dev-notice">
          <span className="notice-text">Сервис находится в разработке. По поводу ошибок и вопросов  пишите:</span>
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
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          id="theme-toggle"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

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
