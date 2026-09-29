import { Bell, Menu, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ onMenuClick }) {
  const { user } = useApp();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-surface-200 px-4 sm:px-6 h-14 flex items-center justify-between w-full min-w-0">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-600 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <p className="text-sm font-medium text-surface-700 hidden sm:block">Green Valley Society</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 min-w-0 shrink-0">
        <button
          className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 relative transition-colors shrink-0"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-surface-200 ml-1 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 shrink-0">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-surface-700 hidden sm:block truncate max-w-[120px]">
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}
