import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { isValidEmail, isValidPhone } from '../utils/helpers';
import { Eye, EyeOff, LayoutDashboard, UserPlus } from 'lucide-react';

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
    `w-full px-3.5 py-2.5 rounded-lg border text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
      errors[key] ? 'border-red-400' : 'border-surface-300'
    }`;

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-900">SocietyHub</h1>
            <p className="text-xs text-surface-400">by VPSA Solutions</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-surface-900 mb-1">Create your account</h2>
          <p className="text-sm text-surface-500 mb-6">Register as a society resident</p>

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
                <label htmlFor="reg-flat" className="block text-sm font-medium text-surface-700 mb-1.5">Flat / Apt Number</label>
                <input id="reg-flat" type="text" value={form.flat} onChange={set('flat')} className={fieldClass('flat')} placeholder="A-204" />
                {errors.flat && <p className="text-xs text-red-500 mt-1">{errors.flat}</p>}
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-pw" className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
              <div className="relative">
                <input id="reg-pw" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} className={`${fieldClass('password')} pr-10`} placeholder="Min. 6 characters" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600" aria-label={showPw ? 'Hide password' : 'Show password'}>
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
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-surface-600">
                I agree to the <button type="button" className="text-primary-600 hover:underline font-medium" onClick={() => addToast('Terms page is not available in this demo.', 'info')}>Terms & Conditions</button>
              </span>
            </label>
            {errors.terms && <p className="text-xs text-red-500 -mt-2">{errors.terms}</p>}

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
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-surface-500 text-center mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-xs text-surface-400 text-center mt-6">
          Powered by <span className="font-medium text-surface-500">VPSA Solutions</span>
        </p>
      </div>
    </div>
  );
}
