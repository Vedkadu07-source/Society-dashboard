import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { isValidEmail, isValidPhone } from '../utils/helpers';
import { Eye, EyeOff, LayoutDashboard, UserPlus, ArrowLeft } from 'lucide-react';

export default function Register() {
  const { register, addToast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', flat: '', password: '', confirmPassword: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.phone.trim()) errs.phone = 'Mobile number is required.';
    else if (!isValidPhone(form.phone)) errs.phone = 'Enter a valid 10-digit mobile number.';
    if (!form.flat.trim()) errs.flat = 'Flat / apartment number is required.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    if (!terms) errs.terms = 'You must agree to the terms.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      const result = register(form);
      setLoading(false);
      if (!result.ok) {
        setErrors({ email: result.message });
        return;
      }
      addToast('Registration successful! Please sign in.', 'success');
      navigate('/login');
    }, 500);
  };

  const fieldClass = (key) =>
    `w-full px-4 py-2.5 rounded-lg border bg-white text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${
      errors[key] ? 'border-red-400 focus:border-red-500' : 'border-surface-300 focus:border-primary-500'
    }`;

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row-reverse border border-surface-200">
        
        {/* Right Branding Panel */}
        <div className="hidden lg:flex lg:w-5/12 bg-surface-900 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 to-surface-900 z-0"></div>
          
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <LayoutDashboard size={22} className="text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Join SocietyHub</h1>
            <p className="text-surface-300 leading-relaxed max-w-sm">
              Get instant access to society updates, raise complaints digitally, and manage your maintenance payments effortlessly.
            </p>
          </div>

          <div className="relative z-10 mt-16 space-y-4">
            <div className="flex items-center gap-3 text-surface-200">
              <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary-400">1</span>
              </div>
              <p className="text-sm">Create your secure account</p>
            </div>
            <div className="flex items-center gap-3 text-surface-200">
              <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary-400">2</span>
              </div>
              <p className="text-sm">Connect your apartment</p>
            </div>
            <div className="flex items-center gap-3 text-surface-200">
              <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary-400">3</span>
              </div>
              <p className="text-sm">Access the dashboard</p>
            </div>
          </div>
        </div>

        {/* Left Form Panel */}
        <div className="flex-1 p-8 sm:p-12 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors mb-8">
              <ArrowLeft size={16} />
              Back to login
            </Link>

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-surface-900 tracking-tight">SocietyHub</h1>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-surface-900 tracking-tight mb-2">Create workspace</h2>
              <p className="text-sm text-surface-500">Register as a society resident</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label>
                <input id="reg-name" type="text" value={form.name} onChange={set('name')} className={fieldClass('name')} placeholder="Rahul Sharma" />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-surface-700 mb-1.5">Email Address</label>
                <input id="reg-email" type="email" value={form.email} onChange={set('email')} className={fieldClass('email')} placeholder="you@example.com" autoComplete="email" />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone + Flat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-phone" className="block text-sm font-medium text-surface-700 mb-1.5">Mobile Number</label>
                  <input id="reg-phone" type="tel" value={form.phone} onChange={set('phone')} className={fieldClass('phone')} placeholder="9876543210" />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="reg-flat" className="block text-sm font-medium text-surface-700 mb-1.5">Flat Number</label>
                  <input id="reg-flat" type="text" value={form.flat} onChange={set('flat')} className={fieldClass('flat')} placeholder="A-204" />
                  {errors.flat && <p className="text-xs text-red-500 mt-1">{errors.flat}</p>}
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-pw" className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
                <div className="relative">
                  <input id="reg-pw" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} className={`${fieldClass('password')} pr-10`} placeholder="Min. 6 characters" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors" aria-label={showPw ? 'Hide password' : 'Show password'}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              {/* Confirm */}
              <div>
                <label htmlFor="reg-cpw" className="block text-sm font-medium text-surface-700 mb-1.5">Confirm Password</label>
                <input id="reg-cpw" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} className={fieldClass('confirmPassword')} placeholder="Re-enter password" autoComplete="new-password" />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-surface-300 text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer" />
                  <span className="text-sm text-surface-600 group-hover:text-surface-900 transition-colors">
                    I agree to the <button type="button" className="text-primary-600 hover:text-primary-700 font-medium transition-colors" onClick={() => addToast('Terms page is not available in this demo.', 'info')}>Terms & Conditions</button>
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm mt-4"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus size={18} />
                    Create Account
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
