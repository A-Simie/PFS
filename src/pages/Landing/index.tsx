import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Shield, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Real-time Tracking',
    description: 'Monitor every asset and transaction as they happen with precision data syncing across all your accounts.',
  },
  {
    icon: PieChart,
    title: 'Detailed Visualizations',
    description: 'Transform raw data into beautiful, actionable charts that reveal your spending habits and net worth trends.',
  },
  {
    icon: Shield,
    title: 'Budget Management',
    description: 'Set smart limits and receive alerts to ensure you stay on track with your long-term financial goals.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size={32} />
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
              PFS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-text-muted">
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <Link to="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="hidden sm:block text-sm text-text-muted hover:text-text-primary transition-colors">
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-full transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider mb-6">
            💎 Fintech Excellence
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Master Your Wealth with{' '}
            <span className="text-primary">Precision</span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            The definitive platform for sophisticated asset management and wealth tracking. 
            Experience absolute control over your financial journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
            >
              Start Free Trial
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-bg-panel hover:bg-bg-panel/80 text-white font-semibold rounded-2xl transition-all border border-border">
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-75 -z-10" />
          <div className="bg-bg-panel border border-border rounded-3xl p-4 shadow-2xl">
            <div className="aspect-[16/9] bg-bg-dark rounded-2xl overflow-hidden border border-border">
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-border rounded" />
                    <div className="h-8 w-48 bg-primary rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 bg-border rounded-full" />
                    <div className="h-10 w-10 bg-border rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-32 bg-bg-panel border border-border rounded-2xl p-4 space-y-3">
                    <div className="h-3 w-1/2 bg-border rounded" />
                    <div className="h-6 w-full bg-primary/20 rounded" />
                  </div>
                  <div className="h-32 bg-bg-panel border border-border rounded-2xl p-4 space-y-3">
                    <div className="h-3 w-1/2 bg-border rounded" />
                    <div className="h-6 w-full bg-border rounded" />
                  </div>
                  <div className="h-32 bg-bg-panel border border-border rounded-2xl p-4 space-y-3">
                    <div className="h-3 w-1/2 bg-border rounded" />
                    <div className="h-6 w-full bg-border rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-bg-panel/50 py-24 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Everything You Need</h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Powerful tools designed for serious financial management.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-panel border border-border p-8 rounded-3xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-tight opacity-90">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-primary to-primary-hover p-12 md:p-20 rounded-[48px] shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter">Ready to take control?</h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-medium">
                Simple enough for anyone. Powerful enough for everyone. 
                Get started today and see the difference.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all shadow-xl active:scale-95"
              >
                Create Free Account
                <ArrowRight size={22} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-panel py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-text-muted">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Logo size={28} />
                <span className="text-lg font-bold text-white tracking-tight">PFS</span>
              </div>
              <p className="text-xs leading-relaxed max-w-[200px]">
                The definitive platform for sophisticated wealth tracking.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
