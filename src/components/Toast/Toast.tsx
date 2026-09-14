import { useEffect, useState } from 'react';
import { X, Undo2 } from 'lucide-react';
import { TOAST_DURATION_MS } from '../../constants';
import './Toast.css';

interface ToastProps {
  message: string;
  icon?: React.ReactNode;
  onUndo?: () => void;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, icon, onUndo, onClose, duration = TOAST_DURATION_MS }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleUndo = () => {
    if (onUndo) onUndo();
    onClose();
  };

  return (
    <div className={`toast ${exiting ? 'toast-exit' : ''}`} role="alert" id="undo-toast">
      {icon && <span className="toast-icon">{icon}</span>}
      <span className="toast-message">{message}</span>
      {onUndo && (
        <button className="toast-undo-btn" onClick={handleUndo} id="undo-reset-btn">
          <Undo2 size={12} />
          <span>Отмена</span>
        </button>
      )}
      <button
        className="toast-close-btn"
        onClick={() => { setExiting(true); setTimeout(onClose, 200); }}
        aria-label="Закрыть"
        id="toast-close-btn"
      >
        <X size={12} />
      </button>
    </div>
  );
}
