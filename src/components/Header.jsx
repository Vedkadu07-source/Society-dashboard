import { Bell, Menu, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ onMenuClick }) {
  const { user } = useApp();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-surface-200 px-4 lg:px-6 h-14 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
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
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 relative transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-surface-200 ml-1">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-surface-700 hidden sm:block">
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}
