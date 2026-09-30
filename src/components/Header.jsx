import { Bell, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const { user } = useApp();
  const location = useLocation();

  const getPageContext = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Resident Workspace';
    if (path === '/admin') return 'Command Center';
    if (path.includes('admin/complaints')) return 'Operations';
    if (path.includes('admin/residents')) return 'Directory';
    if (path.includes('admin/payments')) return 'Treasury';
    if (path.includes('admin/notices')) return 'Communications';
    if (path.includes('complaint')) return 'Service Desk';
    if (path.includes('payment')) return 'Billing';
    if (path.includes('notice')) return 'Communications';
    return 'SocietyHub';
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-surface-200 px-6 lg:px-12 h-16 flex items-center justify-between w-full min-w-0 transition-all">
      {/* Left – Context */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest hidden sm:inline-block">
          {getPageContext()}
        </span>
      </div>

      {/* Right – Controls */}
      <div className="flex items-center gap-6 min-w-0 shrink-0">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 text-surface-400 hover:text-surface-900 transition-colors cursor-pointer">
          <Search size={16} />
          <span className="text-xs font-bold uppercase tracking-widest mt-0.5">Search</span>
        </div>

        <button
          className="text-surface-400 hover:text-surface-900 relative transition-colors shrink-0"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-600 rounded-full border-2 border-white" />
        </button>

        <div className="hidden sm:block w-px h-4 bg-surface-200" />

        {/* User context */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-surface-900 uppercase tracking-widest max-w-[120px] truncate">
              {user?.name || 'User'}
            </p>
          </div>
          <div className="w-8 h-8 rounded-none bg-surface-900 flex items-center justify-center text-white shrink-0 font-light text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
