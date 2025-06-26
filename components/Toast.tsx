import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      fixed bottom-4 right-4 z-50 flex items-center space-x-3 p-4 rounded-lg shadow-lg
      transform transition-all duration-300 ease-out translate-x-0 opacity-100
      ${type === 'success' 
        ? 'bg-green-50 dark:bg-green-900/20 border border-green-500 text-green-800 dark:text-green-200' 
        : 'bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-800 dark:text-red-200'
      }
    `}>
      {type === 'success' ? (
        <Check className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

interface ToastManagerProps {
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' }>;
  removeToast: (id: string) => void;
}

export const ToastManager: React.FC<ToastManagerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
