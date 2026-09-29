import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  MessageSquareText,
  CreditCard,
  ShieldCheck,
  LogOut,
  X,
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

export default function Sidebar({ open, onClose, variant = 'resident' }) {
  const { logout, addToast } = useApp();
  const navigate = useNavigate();

  const links = variant === 'admin' ? adminLinks : residentLinks;

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully.', 'info');
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group ${
      isActive
        ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100/50'
        : 'text-surface-500 hover:bg-surface-100 hover:text-surface-900 border border-transparent'
    }`;

  const content = (
    <div className="flex flex-col h-full bg-white relative">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-md border border-primary-800/20">
            <LayoutDashboard size={18} className="text-white drop-shadow-sm" />
          </div>
          <div>
            <h1 className="text-xl font-black text-surface-900 tracking-tight leading-none">SocietyHub</h1>
            <p className="text-[9px] font-bold text-surface-400 mt-1.5 uppercase tracking-widest">Workspace</p>
          </div>
        </div>
        {/* Close on mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-xl hover:bg-surface-100 text-surface-500 transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto" aria-label="Main navigation">
        <div className="px-3 mb-3 mt-2">
          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">
            {variant === 'admin' ? 'Committee Menu' : 'Resident Menu'}
          </p>
        </div>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className={linkClass} onClick={onClose}>
            {({ isActive }) => (
              <>
                <link.icon size={18} className={isActive ? 'text-primary-600 drop-shadow-sm' : 'text-surface-400 group-hover:text-surface-600 transition-colors'} />
                {link.label}
              </>
            )}
          </NavLink>
        ))}
        
        {variant === 'resident' && (
          <div className="pt-4 mt-4 border-t border-surface-100">
            <NavLink to="/admin" className={linkClass} onClick={onClose}>
              <ShieldCheck size={18} className="text-surface-400 group-hover:text-surface-600 transition-colors" />
              <span>Committee Area</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* Profile & Logout */}
      <div className="p-4 m-4 mt-auto bg-surface-50 rounded-2xl border border-surface-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-surface-200 flex items-center justify-center text-primary-700 font-bold shrink-0 shadow-sm text-sm">
            {variant === 'admin' ? 'C' : 'R'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-surface-900 truncate tracking-tight">
              {variant === 'admin' ? 'Committee' : 'Resident'}
            </p>
            <p className="text-[11px] font-medium text-surface-500 truncate">Demo Access</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-surface-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:sticky lg:top-0 lg:h-screen bg-white border-r border-surface-200 z-30 shrink-0">
        {content}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-surface-900/30"
            onClick={onClose}
          />
          <aside className="sidebar-slide relative w-64 h-full bg-white shadow-xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
