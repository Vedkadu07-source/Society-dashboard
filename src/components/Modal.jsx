import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, wide = false }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={`modal-content bg-white rounded-lg shadow-xl w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200">
          <h2 className="text-lg font-semibold text-surface-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-surface-100 transition-colors text-surface-500"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
