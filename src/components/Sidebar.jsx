import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  MessageSquareText,
  CreditCard,
  ShieldCheck,
  LogOut,
  Users,
  BarChart3,
  BellRing,
  HelpCircle,
  Building2,
  ChevronRight
} from 'lucide-react';

const residentLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/complaints', label: 'Operations', icon: MessageSquareText },
  { to: '/payments', label: 'Treasury', icon: CreditCard },
  { to: '/notices', label: 'Notice Board', icon: BellRing },
];

const committeeLinks = [
  { to: '/admin', label: 'Command Center', icon: BarChart3 },
  { to: '/admin/complaints', label: 'Operations', icon: MessageSquareText },
  { to: '/admin/residents', label: 'Directory', icon: Users },
  { to: '/admin/payments', label: 'Treasury', icon: CreditCard },
  { to: '/admin/notices', label: 'Notice Board', icon: BellRing },
];

export default function Sidebar({ variant = 'resident' }) {
  const { user, logout, addToast } = useApp();
  const navigate = useNavigate();

  const links = variant === 'committee' ? committeeLinks : residentLinks;

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully.', 'info');
    navigate('/login');
  };

  const desktopLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-colors group relative ${
      isActive
        ? 'text-primary-600 bg-primary-50/50 border-r-2 border-primary-600'
        : 'text-surface-400 hover:text-surface-900 hover:bg-surface-50 border-r-2 border-transparent'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
      isActive ? 'text-primary-600' : 'text-surface-400 hover:text-surface-900'
    }`;

  const desktopContent = (
    <div className="flex flex-col h-full bg-white relative border-r border-surface-200">
      
      {/* Brand */}
      <div className="px-6 pt-8 pb-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface-900 rounded-none flex items-center justify-center">
            <Building2 size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-light text-surface-900 tracking-tight leading-none">SocietyHub</h1>
            <p className="text-[9px] font-bold text-surface-400 mt-1 uppercase tracking-widest">
              {variant === 'committee' ? 'Committee' : 'Resident'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className={desktopLinkClass}>
            {({ isActive }) => (
              <>
                <link.icon size={16} className={isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-900'} />
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
        
        {variant === 'resident' && (
          <div className="pt-8 mt-8 border-t border-surface-100">
            <NavLink to="/admin" className={desktopLinkClass}>
              {({ isActive }) => (
                <>
                  <ShieldCheck size={16} className={isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-900'} />
                  <span>Committee Access</span>
                </>
              )}
            </NavLink>
          </div>
        )}
      </nav>

      {/* Help link */}
      <div className="px-4 pb-4">
        <button className="flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest text-surface-400 hover:text-surface-900 transition-colors w-full">
          <HelpCircle size={14} />
          <span>Help Desk</span>
        </button>
      </div>

      {/* User profile */}
      <div className="px-6 pb-6 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-100 flex items-center justify-center text-surface-900 shrink-0 text-sm font-light">
            {user?.name ? user.name.charAt(0).toUpperCase() : variant === 'committee' ? 'C' : 'R'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-surface-900 truncate">
              {user?.name || (variant === 'committee' ? 'Committee' : 'Resident')}
            </p>
            <button
              onClick={handleLogout}
              className="text-[10px] font-bold uppercase tracking-widest text-surface-400 hover:text-red-600 transition-colors flex items-center gap-1 mt-0.5"
            >
              Log out <ChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:sticky lg:top-0 lg:h-screen shrink-0 bg-white">
        {desktopContent}
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-surface-200 z-40 flex items-center justify-around px-2 pb-safe">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className={mobileLinkClass}>
            {({ isActive }) => (
              <>
                <link.icon size={20} className={isActive ? 'text-primary-600' : 'text-surface-400'} />
                <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
        {variant === 'resident' && (
          <NavLink to="/admin" className={mobileLinkClass}>
            {({ isActive }) => (
              <>
                <ShieldCheck size={20} className={isActive ? 'text-primary-600' : 'text-surface-400'} />
                <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5">Admin</span>
              </>
            )}
          </NavLink>
        )}
      </nav>
    </>
  );
}
