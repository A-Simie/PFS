import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { signUpSchema, type SignUpSchemaType, getPasswordStrength } from '../../schemas/auth.schema';
import { useAuth } from '../../store/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const watchPassword = watch('password', '');
  const strength = getPasswordStrength(watchPassword);

  const onSubmit = (data: SignUpSchemaType) => {
    setServerError('');
    const result = signUp(data.fullName, data.email, data.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-bg-dark via-bg-panel to-bg-dark items-center justify-center p-12">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary rounded-lg p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 7V5a4 4 0 0 0-8 0v2" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Finance Pro</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Start your journey to <span className="text-primary">financial freedom</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Join thousands of users who track their wealth with precision. Your data stays private and secure.
          </p>
          <div className="mt-12 space-y-4">
            {['Real-time spending insights', 'Smart budget management', 'Beautiful visual reports'].map((t) => (
              <div key={t} className="flex items-center gap-3 text-text-secondary">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check size={12} className="text-primary" />
                </div>
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-primary rounded-lg p-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a4 4 0 0 0-8 0v2" /></svg>
            </div>
            <span className="text-lg font-bold">Finance Pro</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-text-muted mb-8">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>

          {serverError && (
            <div className="bg-danger/10 text-danger px-4 py-3 rounded-xl text-sm mb-6">{serverError}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
              <input
                {...register('fullName')}
                className="w-full bg-bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-danger text-xs mt-1.5">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full bg-bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full bg-bg-panel border border-border rounded-xl px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>}

              {/* Password Strength */}
              {watchPassword.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted">Password strength</span>
                    <span className="text-xs font-semibold" style={{ color: strength.color }}>
                      {strength.score === 5 ? '✨ Perfectly Secure' : strength.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: level <= strength.score ? strength.color : '#1e293b' }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mt-3">
                    {[
                      { key: 'minLength', label: '6+ characters' },
                      { key: 'hasUppercase', label: 'Uppercase (A-Z)' },
                      { key: 'hasLowercase', label: 'Lowercase (a-z)' },
                      { key: 'hasNumber', label: 'Number (0-9)' },
                      { key: 'hasSpecial', label: 'Special (!@#$)' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-1.5">
                        {strength.checks[key as keyof typeof strength.checks] ? (
                          <Check size={12} className="text-primary shrink-0" />
                        ) : (
                          <X size={12} className="text-text-muted shrink-0" />
                        )}
                        <span className={`text-[11px] ${strength.checks[key as keyof typeof strength.checks] ? 'text-text-primary' : 'text-text-muted'}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className="w-full bg-bg-panel border border-border rounded-xl px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-danger text-xs mt-1.5">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              Create Account
            </button>
          </form>

          <p className="text-xs text-text-muted text-center mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
