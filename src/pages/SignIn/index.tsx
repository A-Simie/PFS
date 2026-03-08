import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Logo } from '../../components/ui/Logo';
import { Eye, EyeOff } from 'lucide-react';
import { signInSchema, type SignInSchemaType } from '../../schemas/auth.schema';
import { useAuth } from '../../store/AuthContext';

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchemaType) => {
    setServerError('');
    const result = signIn(data.email, data.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 text-text-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4"
          >
            <Logo size={48} />
          </motion.div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to PFS</h1>
          <p className="text-text-muted text-sm mt-1">Access your financial dashboard</p>
        </div>

        <div className="bg-bg-panel border border-border rounded-2xl p-8 shadow-xl">
          {serverError && (
            <div className="bg-danger/10 text-danger px-4 py-3 rounded-xl text-sm mb-6 text-center border border-danger/20">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-text-secondary font-semibold">Password</label>
                <span className="text-xs text-primary cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-lg shadow-primary/20 active:scale-[0.98]"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-text-muted text-center mt-8">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline transition-colors">Create one</Link>
          </p>
        </div>

        {/* Local Persistence Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-start gap-3 shadow-inner"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <p className="text-xs font-bold text-text-primary mb-1">Local Persistence Mode</p>
            <p className="text-[11px] text-text-muted leading-relaxed">
              This application uses your browser's local storage to save your account and financial data. 
              No data ever leaves your device, ensuring total privacy.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
