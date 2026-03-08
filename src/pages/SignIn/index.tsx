import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="bg-primary rounded-lg p-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 7V5a4 4 0 0 0-8 0v2" />
            </svg>
          </div>
          <span className="text-xl font-bold">Finance Pro</span>
        </div>

        <div className="bg-bg-panel border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
          <p className="text-text-muted text-sm text-center mb-8">
            Sign in to continue to your dashboard
          </p>

          {serverError && (
            <div className="bg-danger/10 text-danger px-4 py-3 rounded-xl text-sm mb-6 text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-text-secondary">Password</label>
                <span className="text-xs text-primary cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full bg-bg-dark border border-border rounded-xl px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Enter your password"
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
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-text-muted text-center mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
