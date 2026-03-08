import { Link } from 'react-router-dom';
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
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 7V5a4 4 0 0 0-8 0v2" />
              </svg>
            </div>
            <span className="text-lg font-bold">SNAPSHOT</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-text-muted">
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <Link to="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
            <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
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
            Experience a sophisticated approach to asset tracking and financial growth with our premium dashboard designed for the modern elite investor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full transition-colors text-sm flex items-center gap-2"
            >
              Start Your Snapshot <ArrowRight size={16} />
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3.5 border border-border text-text-primary font-semibold rounded-full hover:bg-bg-panel transition-colors text-sm"
            >
              View Demo
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 rounded-2xl overflow-hidden border border-border bg-bg-panel p-1"
        >
          <div className="bg-bg-dark rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-20 rounded-lg bg-primary/10 border border-primary/20" />
              <div className="h-20 rounded-lg bg-accent-gold/10 border border-accent-gold/20" />
              <div className="h-20 rounded-lg bg-blue-500/10 border border-blue-500/20" />
            </div>
            <div className="flex items-end gap-2 justify-center h-32">
              {[60, 80, 55, 90, 70, 85, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  className="w-6 md:w-8 bg-primary/80 rounded-t"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust bar */}
        <div className="mt-12 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted mb-4">Trusted by modern investors globally</p>
          <div className="flex items-center justify-center gap-8 text-text-muted text-sm font-medium">
            <span>💎 LUMIERE</span>
            <span>📊 VERTEX</span>
            <span>📈 EQUITY</span>
            <span>⚙️ ALTOS</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Precision Tools</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
              Engineered for absolute financial clarity
            </h2>
          </div>
          <p className="text-text-secondary leading-relaxed self-end">
            Sophisticated features designed to give you a 360-degree view of your net worth across all asset classes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-bg-panel border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              <div className="mt-6 h-32 rounded-xl bg-bg-dark border border-border overflow-hidden" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-panel border border-border rounded-3xl p-8 md:p-12 text-center"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Ready to start?</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-8">
            Elite wealth management for everyone.
          </h2>
          <div className="flex items-center justify-center gap-8 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-text-muted font-semibold">Standard Plan</span>
              <p className="text-4xl font-bold mt-1">$29<span className="text-lg text-text-muted font-normal">/mo</span></p>
            </div>
            <div className="w-px h-16 bg-border" />
            <div>
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">Elite Snapshot</span>
              <p className="text-4xl font-bold mt-1">$89<span className="text-lg text-text-muted font-normal">/mo</span></p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="inline-block px-10 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full transition-colors"
          >
            Get Started Now
          </Link>
          <p className="text-xs text-text-muted mt-4">No credit card required for 14-day trial. 256-bit AES encryption standard.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                  </svg>
                </div>
                <span className="text-sm font-bold">SNAPSHOT</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                The definitive platform for sophisticated asset management and wealth tracking.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-xs text-text-muted">
                <li><a href="#" className="hover:text-text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">API Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-text-muted">
                <li><a href="#" className="hover:text-text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-text-muted">
                <li><a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-xs text-text-muted">
            &copy; 2024 Snapshot Financial Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
