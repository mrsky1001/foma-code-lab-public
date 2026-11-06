import { useState, useEffect, useCallback } from 'react';

export type ThemePalette = 'azure' | 'coral' | 'emerald' | 'purple';
export type ThemeMode = 'dark' | 'light';
export type Theme = ThemePalette | 'dark' | 'light';

function getInitialPalette(): ThemePalette {
  const storedPalette = localStorage.getItem('foma-palette');
  if (
    storedPalette === 'azure' ||
    storedPalette === 'coral' ||
    storedPalette === 'emerald' ||
    storedPalette === 'purple'
  ) {
    return storedPalette as ThemePalette;
  }
  const storedTheme = localStorage.getItem('foma-theme');
  if (storedTheme === 'coral' || storedTheme === 'dark') return 'coral';
  return 'azure';
}

function getInitialMode(): ThemeMode {
  const storedMode = localStorage.getItem('foma-mode');
  if (storedMode === 'dark' || storedMode === 'light') {
    return storedMode as ThemeMode;
  }
  const storedTheme = localStorage.getItem('foma-theme');
  if (storedTheme === 'light') return 'light';
  if (storedTheme === 'dark' || storedTheme === 'azure' || storedTheme === 'coral') return 'dark';

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function useTheme() {
  const [palette, setPaletteState] = useState<ThemePalette>(getInitialPalette);
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  const applyTheme = useCallback((p: ThemePalette, m: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', p);
    document.documentElement.setAttribute('data-mode', m);
    document.documentElement.setAttribute('data-theme-mode', `${p}-${m}`);

    if (m === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    localStorage.setItem('foma-palette', p);
    localStorage.setItem('foma-mode', m);
    localStorage.setItem('foma-theme', m === 'light' ? 'light' : p);
  }, []);

  useEffect(() => {
    applyTheme(palette, mode);
  }, [palette, mode, applyTheme]);

  const setPalette = useCallback((p: ThemePalette) => {
    setPaletteState(p);
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((t: Theme) => {
    if (t === 'light') {
      setModeState('light');
    } else if (t === 'dark') {
      setModeState('dark');
      setPaletteState('coral');
    } else if (t === 'azure' || t === 'coral' || t === 'emerald' || t === 'purple') {
      setPaletteState(t);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    toggleMode();
  }, [toggleMode]);

  const theme: Theme = mode === 'light' ? 'light' : palette;

  return {
    palette,
    mode,
    theme,
    setPalette,
    setMode,
    toggleMode,
    setTheme,
    toggleTheme,
  } as const;
}
