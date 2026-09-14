import { useState, useEffect } from 'react';

const ADMIN_SIMULATE_STUDENT_KEY = 'foma-simulate-student';
const ADMIN_CHANGE_EVENT = 'foma-admin-mode-change';

/** Checks if running on local development machine */
export function isLocalMachine(): boolean {
  if (typeof window === 'undefined') return false;
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

/** Returns true if admin privileges are active (local machine and not simulating student) */
export function isAdminMode(): boolean {
  return isLocalMachine() && !isSimulatingStudent();
}

/** Toggle student simulation mode on local machine */
export function setSimulateStudent(simulate: boolean): void {
  if (typeof window === 'undefined') return;
  if (simulate) {
    localStorage.setItem(ADMIN_SIMULATE_STUDENT_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_SIMULATE_STUDENT_KEY);
  }
  window.dispatchEvent(new CustomEvent(ADMIN_CHANGE_EVENT, { detail: { simulate } }));
}

/** React hook to reactively track admin mode */
export function useAdminMode(): { isLocal: boolean; isAdmin: boolean; isStudentSimulated: boolean; setStudentSimulated: (val: boolean) => void } {
  const isLocal = isLocalMachine();
  const [isStudentSimulated, setIsStudentSimulated] = useState<boolean>(() => isSimulatingStudent());

  useEffect(() => {
    const handler = () => {
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
