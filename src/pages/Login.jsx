import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, LayoutDashboard, LogIn, ArrowRight } from 'lucide-react';

export default function Login() {
  const { user, login, addToast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    // Simulate slight delay
    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      addToast(`Welcome back, ${result.user.name}!`, 'success');
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-surface-200">
        
        {/* Left Branding Panel */}
        <div className="hidden lg:flex lg:w-5/12 bg-surface-900 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-surface-900 z-0"></div>
          
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <LayoutDashboard size={22} className="text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">SocietyHub</h1>
            <p className="text-surface-300 leading-relaxed max-w-sm">
              The modern workspace for residential communities. Manage complaints, track maintenance, and stay connected.
            </p>
          </div>

          <div className="relative z-10 mt-16">
            <div className="bg-surface-800/50 backdrop-blur-md border border-surface-700 rounded-xl p-5">
              <p className="text-sm font-medium text-surface-200 mb-2">"This platform transformed how our committee handles maintenance collection."</p>
              <p className="text-xs text-surface-400">— Sarah Jenkins, Society Secretary</p>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-surface-900 tracking-tight">SocietyHub</h1>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-surface-900 tracking-tight mb-2">Welcome back</h2>
              <p className="text-sm text-surface-500">Sign in to your SocietyHub workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-surface-700 mb-1.5">
                  Work Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-surface-300 bg-white text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  placeholder="name@society.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="login-password" className="block text-sm font-medium text-surface-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    onClick={() => addToast('Password reset is not available in this demo.', 'info')}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-surface-300 bg-white text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all pr-10"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer"
                  />
                  <span className="text-sm text-surface-600 group-hover:text-surface-900 transition-colors">Remember me for 30 days</span>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 animate-in fade-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="text-sm text-surface-500 text-center mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 transition-colors">
                Create workspace <ArrowRight size={14} />
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-8 bg-surface-50 rounded-xl p-4 border border-surface-200">
              <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-3">Demo Accounts</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-surface-700 mb-1">Resident</p>
                  <p className="text-[11px] text-surface-500 font-mono">resident@societyhub.demo</p>
                  <p className="text-[11px] text-surface-500 font-mono mt-0.5">resident123</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-700 mb-1">Committee</p>
                  <p className="text-[11px] text-surface-500 font-mono">committee@societyhub.demo</p>
                  <p className="text-[11px] text-surface-500 font-mono mt-0.5">committee123</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
