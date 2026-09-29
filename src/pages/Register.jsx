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
    if (!form.flat.trim()) errs.flat = 'Flat number is required.';
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
    `w-full px-0 py-3 bg-transparent border-b text-surface-900 placeholder:text-surface-400 focus:outline-none transition-colors text-lg ${
      errors[key] ? 'border-red-500 focus:border-red-600' : 'border-surface-200 focus:border-surface-900'
    }`;

  const labelClass = "block text-xs font-semibold text-surface-900 uppercase tracking-widest mb-1";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface-50 font-sans relative overflow-hidden">
      
      {/* Subtle Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sage-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-sage-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none" />

      {/* Left Area: Brand & Statement */}
      <div className="flex-1 p-6 sm:p-12 lg:p-24 flex flex-col justify-between relative z-10 lg:sticky lg:top-0 lg:h-screen overflow-y-auto hidden lg:flex">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface-900 text-white rounded-lg flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-xl font-bold text-surface-900 tracking-tight">SocietyHub</h1>
        </div>

        <div className="mt-12 mb-12 max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-light text-surface-900 mb-6 leading-tight tracking-tight">
            Elevate your <span className="font-semibold">community</span> experience.
          </h2>
          <p className="text-surface-600 text-lg leading-relaxed font-light mb-12">
            Create a secure resident account to access society updates, raise complaints digitally, and track maintenance effortlessly.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4 text-surface-900">
              <div className="w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Create your secure account</p>
                <p className="text-sm text-surface-500 mt-1">Setup your personal login credentials.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-surface-900">
              <div className="w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Connect your apartment</p>
                <p className="text-sm text-surface-500 mt-1">Link your profile to your flat number.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-surface-900">
              <div className="w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Access the dashboard</p>
                <p className="text-sm text-surface-500 mt-1">Instantly view notices, dues, and requests.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-surface-400 text-xs tracking-wider uppercase font-medium">© {new Date().getFullYear()} VPSA Solutions</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 lg:p-24 relative z-10 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-8">
          
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors mb-10">
            <ArrowLeft size={16} />
            Back to login
          </Link>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-surface-900 tracking-tight mb-2">Create workspace</h3>
            <p className="text-surface-500">Register as a society resident.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label htmlFor="reg-name" className={labelClass}>Full Name</label>
                <input id="reg-name" type="text" value={form.name} onChange={set('name')} className={fieldClass('name')} placeholder="Rahul Sharma" />
                {errors.name && <p className="text-xs font-medium text-red-600 mt-2">{errors.name}</p>}
              </div>

              {/* Flat */}
              <div>
                <label htmlFor="reg-flat" className={labelClass}>Flat Number</label>
                <input id="reg-flat" type="text" value={form.flat} onChange={set('flat')} className={fieldClass('flat')} placeholder="A-204" />
                {errors.flat && <p className="text-xs font-medium text-red-600 mt-2">{errors.flat}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Email */}
              <div>
                <label htmlFor="reg-email" className={labelClass}>Email Address</label>
                <input id="reg-email" type="email" value={form.email} onChange={set('email')} className={fieldClass('email')} placeholder="you@example.com" autoComplete="email" />
                {errors.email && <p className="text-xs font-medium text-red-600 mt-2">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="reg-phone" className={labelClass}>Mobile Number</label>
                <input id="reg-phone" type="tel" value={form.phone} onChange={set('phone')} className={fieldClass('phone')} placeholder="9876543210" />
                {errors.phone && <p className="text-xs font-medium text-red-600 mt-2">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Password */}
              <div>
                <label htmlFor="reg-pw" className={labelClass}>Password</label>
                <div className="relative">
                  <input id="reg-pw" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} className={`${fieldClass('password')} pr-10`} placeholder="Min. 6 chars" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-900 transition-colors" aria-label={showPw ? 'Hide password' : 'Show password'}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs font-medium text-red-600 mt-2">{errors.password}</p>}
              </div>

              {/* Confirm */}
              <div>
                <label htmlFor="reg-cpw" className={labelClass}>Confirm Password</label>
                <input id="reg-cpw" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} className={fieldClass('confirmPassword')} placeholder="Re-enter password" autoComplete="new-password" />
                {errors.confirmPassword && <p className="text-xs font-medium text-red-600 mt-2">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms */}
            <div className="pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    className="peer appearance-none w-5 h-5 rounded border border-surface-300 bg-transparent checked:bg-surface-900 checked:border-surface-900 transition-colors cursor-pointer"
                  />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-surface-600 group-hover:text-surface-900 transition-colors">
                  I agree to the <button type="button" className="text-surface-900 hover:underline transition-colors font-medium" onClick={(e) => { e.preventDefault(); addToast('Terms page is not available in this demo.', 'info'); }}>Terms & Conditions</button>
                </span>
              </label>
              {errors.terms && <p className="text-xs font-medium text-red-600 mt-3">{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-surface-900 hover:bg-surface-800 active:bg-black disabled:opacity-50 text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
