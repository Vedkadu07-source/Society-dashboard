import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Building2, ArrowRight } from 'lucide-react';

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
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none" />
      
      {/* Left Area: Brand & Statement */}
      <div className="flex-1 p-6 sm:p-12 lg:p-24 flex flex-col justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-sm">
            <Building2 size={20} />
          </div>
          <h1 className="text-xl font-bold text-surface-900 tracking-tight">SocietyHub</h1>
        </div>
        
        <div className="mt-20 lg:mt-0 max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-light text-surface-900 mb-6 leading-tight tracking-tight">
            The new standard in <span className="font-semibold text-primary-600">residential</span> management.
          </h2>
          <p className="text-surface-600 text-lg leading-relaxed font-light">
            A quiet, powerful workspace for maintenance, complaints, and community operations.
          </p>
        </div>

        <div className="hidden lg:block">
          <p className="text-surface-400 text-[11px] tracking-widest uppercase font-semibold">© {new Date().getFullYear()} VPSA Solutions</p>
        </div>
      </div>

      {/* Right Area: Form */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 lg:p-24 relative z-10">
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto xl:mr-24 bg-white/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-surface-900 tracking-tight mb-2">Welcome back</h3>
            <p className="text-surface-500 text-sm">Sign in to your SocietyHub workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">
                Work Email
              </label>
              <input
                id="login-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-300 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                placeholder="name@society.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="login-password" className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
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
                  className="w-full px-4 py-3.5 bg-white border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-300 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium pr-12"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-900 transition-colors"
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
                    className="peer appearance-none w-5 h-5 rounded-md border-2 border-surface-200 bg-white checked:bg-primary-600 checked:border-primary-600 transition-colors cursor-pointer"
                  />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-surface-600 group-hover:text-surface-900 transition-colors">Keep me signed in</span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-xl flex items-start gap-2 border border-red-100">
                <div className="mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-[0_4px_12px_rgba(79,70,229,0.2)] hover:shadow-[0_4px_16px_rgba(79,70,229,0.3)]"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-200/60">
            <p className="text-sm text-surface-500 mb-6 font-medium">
              New to SocietyHub?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center gap-1 transition-colors">
                Create a workspace
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="bg-surface-50/80 p-5 rounded-2xl border border-surface-200">
              <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-3">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-surface-900 mb-1">Resident</p>
                  <p className="text-[11px] text-surface-600 font-mono bg-white px-2 py-1 rounded border border-surface-100">resident@societyhub.demo</p>
                  <p className="text-[11px] text-surface-600 font-mono bg-white px-2 py-1 rounded border border-surface-100 mt-1">resident123</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-900 mb-1">Committee</p>
                  <p className="text-[11px] text-surface-600 font-mono bg-white px-2 py-1 rounded border border-surface-100">committee@societyhub.demo</p>
                  <p className="text-[11px] text-surface-600 font-mono bg-white px-2 py-1 rounded border border-surface-100 mt-1">committee123</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
