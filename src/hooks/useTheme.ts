import { useState, useEffect, useCallback } from 'react';

export type Theme = 'azure' | 'dark' | 'light';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('foma-theme');
  if (stored === 'azure' || stored === 'dark' || stored === 'coral' || stored === 'light') {
    return (stored === 'coral' ? 'dark' : stored) as Theme;
  }

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'azure';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('foma-theme', t);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (prev === 'azure') return 'dark';
      if (prev === 'dark') return 'light';
      return 'azure';
    });
  }, []);

  return { theme, setTheme, toggleTheme } as const;
}
