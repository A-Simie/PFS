import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Logo } from '../../components/ui/Logo';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { signUpSchema, type SignUpSchemaType, getPasswordStrength } from '../../schemas/auth.schema';
import { useAuth } from '../../store/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch('password', '');
  const strength = getPasswordStrength(password);

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
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 text-text-primary">
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Left Side: Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-8">
            <Logo size={56} />
            <h1 className="text-4xl font-bold text-white tracking-tighter">Personal Finance Snapshot</h1>
          </div>
          <p className="text-xl text-text-muted leading-relaxed mb-12">
            The simplest way to track your wealth, manage budgets, and visualize your financial journey—all in one place, stored securely on your device.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Local Security</h3>
                <p className="text-text-muted text-sm">Your data never leaves your browser. No cloud, no tracking.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Instant Insights</h3>
                <p className="text-text-muted text-sm">Beautiful charts and real-time balance tracking for everything you own.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-bg-panel border border-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="lg:hidden flex flex-col items-center mb-8">
            <Logo size={48} className="mb-4" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
            <p className="text-text-muted">Join 1,000+ users tracking their wealth locally.</p>
          </div>

          {serverError && (
            <div className="bg-danger/10 text-danger px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-3 border border-danger/20">
              <X size={18} />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 font-semibold">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-danger text-xs mt-1.5">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 font-semibold">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              <div className="mt-3 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-text-muted">Password Strength</span>
                  <span className={strength.score >= 3 ? 'text-primary' : strength.score >= 2 ? 'text-accent-gold' : 'text-danger'}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-1 w-full bg-bg-dark rounded-full overflow-hidden flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className={`h-full flex-1 transition-all duration-500 bg-current transition-colors ${
                        strength.score > i 
                          ? strength.score >= 3 ? 'text-primary' : strength.score >= 2 ? 'text-accent-gold' : 'text-danger'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-lg shadow-primary/20 active:scale-[0.98] mt-4"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-text-muted text-center mt-8">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary font-bold hover:underline transition-colors">Sign In</Link>
          </p>

          <p className="text-xs text-text-muted text-center mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          {/* Local Security Note */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-accent-gold/5 border border-accent-gold/10 rounded-2xl p-5 flex items-start gap-4 shadow-inner"
          >
            <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
              <span className="text-xl">📝</span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary mb-1">Account Persistence Note</p>
              <p className="text-[12px] text-text-muted leading-relaxed">
                The account you create here is saved to your browser's local storage. 
                You can use these credentials to log in from this device anytime. 
                No cloud sync is active for this version.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
