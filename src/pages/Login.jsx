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
    return <Navigate to={user.role === 'committee' ? '/admin' : '/dashboard'} replace />;
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
      navigate(result.user.role === 'committee' ? '/admin' : '/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface-50 font-sans relative overflow-hidden">
      {/* Subtle Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sage-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sage-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none" />
      
      {/* Left Area: Brand & Statement */}
      <div className="flex-1 p-6 sm:p-12 lg:p-24 flex flex-col justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface-900 text-white rounded-lg flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-xl font-bold text-surface-900 tracking-tight">SocietyHub</h1>
        </div>
        
        <div className="mt-20 lg:mt-0 max-w-lg">
          <h2 className="text-4xl lg:text-6xl font-light text-surface-900 mb-6 leading-tight tracking-tight">
            The new standard in <span className="font-semibold">residential</span> management.
          </h2>
          <p className="text-surface-600 text-lg leading-relaxed font-light">
            A quiet, powerful workspace for maintenance, complaints, and community operations.
          </p>
        </div>

        <div className="hidden lg:block">
          <p className="text-surface-400 text-xs tracking-wider uppercase font-medium">© {new Date().getFullYear()} VPSA Solutions</p>
        </div>
      </div>

      {/* Right Area: Form */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 lg:p-24 relative z-10">
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto xl:mr-24">
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-surface-900 tracking-tight mb-2">Welcome back</h3>
            <p className="text-surface-500">Sign in to your SocietyHub workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-surface-900 uppercase tracking-widest mb-2">
                Work Email
              </label>
              <input
                id="login-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-0 py-3 bg-transparent border-b border-surface-200 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-surface-900 transition-colors text-lg"
                placeholder="name@society.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="login-password" className="block text-xs font-semibold text-surface-900 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors"
                  onClick={() => addToast('Password reset is not available in this demo.', 'info')}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b border-surface-200 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-surface-900 transition-colors text-lg pr-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-900 transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer appearance-none w-5 h-5 rounded border border-surface-300 bg-transparent checked:bg-surface-900 checked:border-surface-900 transition-colors cursor-pointer"
                  />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-surface-600 group-hover:text-surface-900 transition-colors">Keep me signed in</span>
              </label>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium py-2 flex items-start gap-2">
                <div className="mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-surface-900 hover:bg-surface-800 active:bg-black disabled:opacity-50 text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-200/60">
            <p className="text-sm text-surface-500 mb-6">
              New to SocietyHub?{' '}
              <Link to="/register" className="text-surface-900 font-medium hover:underline inline-flex items-center gap-1">
                Create a workspace
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="bg-surface-100/50 p-5 rounded-xl border border-surface-200/50">
              <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-3">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-surface-900 mb-1">Resident</p>
                  <p className="text-xs text-surface-600 font-mono">resident@societyhub.demo</p>
                  <p className="text-xs text-surface-600 font-mono mt-0.5">resident123</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-900 mb-1">Committee</p>
                  <p className="text-xs text-surface-600 font-mono">committee@societyhub.demo</p>
                  <p className="text-xs text-surface-600 font-mono mt-0.5">committee123</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
