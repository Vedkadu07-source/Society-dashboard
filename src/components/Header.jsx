import { Bell, Menu, User, Layout } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ onMenuClick }) {
  const { user } = useApp();

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-surface-200 px-4 sm:px-6 h-16 flex items-center justify-between w-full min-w-0 transition-all shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-surface-100 text-surface-600 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2.5 text-sm">
          <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center border border-primary-100">
            <Layout size={14} className="text-primary-600" />
          </div>
          <span className="font-bold text-surface-900 tracking-tight">Society Portal</span>
          <span className="text-surface-300">/</span>
          <span className="text-surface-500 font-medium">Workspace</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 min-w-0 shrink-0">
        <button
          className="p-2 rounded-xl hover:bg-surface-100 text-surface-500 relative transition-colors shrink-0"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-surface-200 min-w-0">
          <div className="hidden sm:block text-right min-w-0">
            <p className="text-[13px] font-bold text-surface-900 truncate max-w-[120px] leading-tight">
              {user?.name || 'User'}
            </p>
            <p className="text-[10px] text-surface-500 uppercase tracking-wider font-bold leading-tight mt-0.5">
              {user?.role === 'admin' ? 'Committee' : 'Resident'}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-100 to-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 shrink-0 shadow-sm font-bold">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
