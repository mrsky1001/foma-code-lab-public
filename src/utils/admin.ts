import { useState, useEffect } from 'react';

export const ADMIN_SIMULATE_STUDENT_KEY = 'foma-simulate-student';
export const ADMIN_FORCE_KEY = 'foma-admin';
const ADMIN_CHANGE_EVENT = 'foma-admin-mode-change';

/** Checks if admin mode is explicitly forced via localStorage or URL query param */
export function hasAdminOverride(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1' || params.get('admin') === 'true') {
      localStorage.setItem(ADMIN_FORCE_KEY, 'true');
      return true;
    }
    return localStorage.getItem(ADMIN_FORCE_KEY) === 'true';
  } catch {
    return false;
  }
}

/** Checks if running on local development machine or has explicit admin override */
export function isLocalMachine(): boolean {
  if (typeof window === 'undefined') return false;
  if (hasAdminOverride()) return true;
  const h = window.location.hostname;
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h === '[::1]' ||
    h === '' ||
    h.endsWith('.local') ||
    window.location.protocol === 'file:'
  );
}

/** Checks if student mode is currently being simulated by admin */
export function isSimulatingStudent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_SIMULATE_STUDENT_KEY) === 'true';
}

/** Returns true if admin privileges are active (local machine or override, and not simulating student) */
export function isAdminMode(): boolean {
  return isLocalMachine() && !isSimulatingStudent();
}

/** Toggle student simulation mode on local machine or with admin override */
export function setSimulateStudent(simulate: boolean): void {
  if (typeof window === 'undefined') return;
  if (simulate) {
    localStorage.setItem(ADMIN_SIMULATE_STUDENT_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_SIMULATE_STUDENT_KEY);
  }
  window.dispatchEvent(new CustomEvent(ADMIN_CHANGE_EVENT, { detail: { simulate } }));
}

/** Explicitly enable or disable admin override */
export function setAdminOverride(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  if (enabled) {
    localStorage.setItem(ADMIN_FORCE_KEY, 'true');
    localStorage.removeItem(ADMIN_SIMULATE_STUDENT_KEY);
  } else {
    localStorage.removeItem(ADMIN_FORCE_KEY);
  }
  window.dispatchEvent(new CustomEvent(ADMIN_CHANGE_EVENT, { detail: { enabled } }));
}

/** React hook to reactively track admin mode */
export function useAdminMode(): { isLocal: boolean; isAdmin: boolean; isStudentSimulated: boolean; setStudentSimulated: (val: boolean) => void } {
  const [isLocal, setIsLocal] = useState<boolean>(() => isLocalMachine());
  const [isStudentSimulated, setIsStudentSimulated] = useState<boolean>(() => isSimulatingStudent());

  useEffect(() => {
    const handler = () => {
      setIsLocal(isLocalMachine());
      setIsStudentSimulated(isSimulatingStudent());
    };
    window.addEventListener(ADMIN_CHANGE_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(ADMIN_CHANGE_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return {
    isLocal,
    isAdmin: isLocal && !isStudentSimulated,
    isStudentSimulated,
    setStudentSimulated: setSimulateStudent,
  };
}
