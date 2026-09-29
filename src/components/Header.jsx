import { Bell, User, Layout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const { user } = useApp();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Resident Dashboard';
    if (path === '/admin') return 'Committee Dashboard';
    if (path.includes('complaint')) return 'Complaints';
    if (path.includes('payment')) return 'Maintenance';
    if (path.includes('notice')) return 'Notices';
    if (path.includes('resident')) return 'Residents';
    return 'SocietyHub';
  };

  return (
    <header className="sticky top-0 z-20 bg-surface-100/80 backdrop-blur-md border-b border-surface-200 px-4 sm:px-8 h-16 flex items-center justify-between w-full min-w-0 transition-all">
      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex w-8 h-8 rounded border border-surface-200 bg-white items-center justify-center shrink-0">
            <Layout size={16} className="text-surface-600" />
          </div>
          <h2 className="text-lg font-bold text-surface-900 tracking-tight truncate">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 lg:gap-4 min-w-0 shrink-0">
        <button
          className="p-2 rounded hover:bg-surface-200 text-surface-500 relative transition-colors shrink-0"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface-100" />
        </button>
        <div className="hidden sm:block w-px h-6 bg-surface-200 mx-1"></div>
        <div className="flex items-center gap-3 pl-1 min-w-0">
          <div className="hidden sm:block text-right min-w-0">
            <p className="text-sm font-semibold text-surface-900 truncate max-w-[140px] leading-tight">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-surface-500 font-medium truncate leading-tight mt-0.5">
              {user?.role === 'committee' ? 'Committee' : 'Resident'}
            </p>
          </div>
          <div className="w-9 h-9 rounded bg-surface-200 flex items-center justify-center text-surface-700 shrink-0 font-bold overflow-hidden">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
          </div>
        </div>
      </div>
    </header>
  );
}
