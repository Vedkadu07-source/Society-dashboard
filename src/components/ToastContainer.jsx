import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'bg-white border-surface-200 text-surface-800',
  error: 'bg-white border-surface-200 text-surface-800',
  warning: 'bg-white border-surface-200 text-surface-800',
  info: 'bg-white border-surface-200 text-surface-800',
};

const iconColors = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

const progressColors = {
  success: 'bg-emerald-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || icons.info;
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto toast-enter relative flex items-start gap-3 p-4 rounded-xl border shadow-lg overflow-hidden ${colors[toast.type] || colors.info}`}
          >
            <Icon size={20} className={`mt-0.5 shrink-0 ${iconColors[toast.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded-md text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
            <div 
              className={`absolute bottom-0 left-0 h-1 ${progressColors[toast.type] || progressColors.info}`} 
              style={{ animation: 'toast-progress 3s linear forwards' }}
            />
          </div>
        );
      })}
    </div>
  );
}
