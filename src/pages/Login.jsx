import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, LayoutDashboard, LogIn } from 'lucide-react';

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
    <div className="min-h-screen bg-surface-50 flex">
      {/* Left illustration panel – hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary-500 rounded-full opacity-30" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary-700 rounded-full opacity-30" />
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Society Management,<br />Simplified.</h2>
          <p className="text-primary-200 leading-relaxed">
            Track complaints, manage payments, and stay connected with your society — all in one place.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-surface-900">SocietyHub</h1>
              <p className="text-xs text-surface-400">by VPSA Solutions</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-surface-900 mb-1">Welcome back</h2>
          <p className="text-surface-500 mb-8">Sign in to your SocietyHub account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-surface-700 mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-surface-300 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-surface-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-surface-300 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition pr-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-surface-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => addToast('Password reset is not available in this demo.', 'info')}
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-sm text-surface-500 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Register here
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-8 bg-surface-100 rounded-lg p-4 border border-surface-200">
            <p className="text-xs font-semibold text-surface-600 uppercase tracking-wide mb-3">Demo Credentials</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-medium text-surface-700 mb-1">Resident</p>
                <p className="text-surface-500">resident@societyhub.demo</p>
                <p className="text-surface-500">resident123</p>
              </div>
              <div>
                <p className="font-medium text-surface-700 mb-1">Admin</p>
                <p className="text-surface-500">admin@societyhub.demo</p>
                <p className="text-surface-500">admin123</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-surface-400 text-center mt-6">
            Powered by <span className="font-medium text-surface-500">VPSA Solutions</span>
          </p>
        </div>
      </div>
    </div>
  );
}
