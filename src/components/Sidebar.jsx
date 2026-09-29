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
  Bell
} from 'lucide-react';

const residentLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/complaints', label: 'Complaints', icon: MessageSquareText },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/notices', label: 'Notices', icon: Bell },
];

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: BarChart3 },
  { to: '/admin/complaints', label: 'Complaints', icon: MessageSquareText },
  { to: '/admin/residents', label: 'Residents', icon: Users },
  { to: '/admin/payments', label: 'Maintenance', icon: CreditCard },
  { to: '/admin/notices', label: 'Notices', icon: Bell },
];

export default function Sidebar({ variant = 'resident' }) {
  const { logout, addToast } = useApp();
  const navigate = useNavigate();

  const links = variant === 'committee' ? adminLinks : residentLinks;

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully.', 'info');
    navigate('/login');
  };

  const desktopLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 group relative ${
      isActive
        ? 'text-surface-900 font-semibold bg-surface-100/50'
        : 'text-surface-500 font-medium hover:text-surface-900 hover:bg-surface-100/30'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
      isActive ? 'text-surface-900 font-semibold' : 'text-surface-400 hover:text-surface-700 font-medium'
    }`;

  const desktopContent = (
    <div className="flex flex-col h-full bg-surface-50 relative border-r border-surface-200">
      {/* Logo */}
      <div className="px-6 py-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface-900 flex items-center justify-center rounded border border-surface-800">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-surface-900 tracking-tight leading-none">SocietyHub</h1>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto" aria-label="Main navigation">
        <div className="px-4 mb-4 mt-2">
          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">
            {variant === 'committee' ? 'Committee Menu' : 'Resident Menu'}
          </p>
        </div>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className={desktopLinkClass}>
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-900 rounded-r" />}
                <link.icon size={18} className={isActive ? 'text-surface-900' : 'text-surface-400 group-hover:text-surface-600'} />
                {link.label}
              </>
            )}
          </NavLink>
        ))}
        
        {variant === 'resident' && (
          <div className="pt-6 mt-6 border-t border-surface-200">
            <NavLink to="/admin" className={desktopLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-900 rounded-r" />}
                  <ShieldCheck size={18} className="text-surface-400 group-hover:text-surface-600" />
                  <span>Committee Area</span>
                </>
              )}
            </NavLink>
          </div>
        )}
      </nav>

      {/* Profile & Logout */}
      <div className="p-6 mt-auto">
        <div className="flex items-center gap-3 py-4 border-t border-surface-200">
          <div className="w-9 h-9 rounded bg-surface-200 flex items-center justify-center text-surface-700 font-bold shrink-0 text-sm">
            {variant === 'committee' ? 'C' : 'R'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-surface-900 truncate">
              {variant === 'committee' ? 'Committee' : 'Resident'}
            </p>
            <p className="text-xs text-surface-500 truncate">Demo Access</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-surface-400 hover:text-red-600 transition-colors shrink-0"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:sticky lg:top-0 lg:h-screen shrink-0">
        {desktopContent}
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-t border-surface-200 z-40 flex items-center justify-around px-2 pb-safe">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className={mobileLinkClass}>
            {({ isActive }) => (
              <>
                <link.icon size={20} className={isActive ? 'text-surface-900' : 'text-surface-400'} />
                <span className="text-[10px]">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
        {variant === 'resident' && (
          <NavLink to="/admin" className={mobileLinkClass}>
            {({ isActive }) => (
              <>
                <ShieldCheck size={20} className={isActive ? 'text-surface-900' : 'text-surface-400'} />
                <span className="text-[10px]">Admin</span>
              </>
            )}
          </NavLink>
        )}
      </nav>
    </>
  );
}
