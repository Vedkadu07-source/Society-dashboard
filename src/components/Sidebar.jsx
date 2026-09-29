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
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
      isActive
        ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm'
        : 'text-surface-600 font-medium hover:bg-surface-100 hover:text-surface-900'
    }`;

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-surface-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-surface-900 leading-tight">SocietyHub</h1>
            <p className="text-[10px] text-surface-400 leading-tight">by VPSA Solutions</p>
          </div>
        </div>
        {/* Close on mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-surface-100 text-surface-500"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className={linkClass} onClick={onClose}>
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
        {variant === 'resident' && (
          <NavLink to="/admin" className={linkClass} onClick={onClose}>
            <ShieldCheck size={18} />
            <span>Committee</span>
            <span className="ml-auto text-[10px] bg-surface-100 text-surface-500 px-1.5 py-0.5 rounded">Switch</span>
          </NavLink>
        )}
      </nav>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-surface-200 bg-surface-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
              {variant === 'admin' ? 'C' : 'R'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-surface-900 truncate">
                {variant === 'admin' ? 'Committee Member' : 'Resident'}
              </p>
              <p className="text-xs text-surface-500 truncate">Demo Account</p>
            </div>
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
