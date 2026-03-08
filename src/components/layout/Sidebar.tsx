import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/budgets', label: 'Budgets', icon: PieChart },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  onClose: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 bg-bg-panel border-r border-border flex flex-col h-screen h-[100dvh] overflow-hidden scrollbar-hide">
      {/* Branding */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-1.5 shadow-lg shadow-primary/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 7V5a4 4 0 0 0-8 0v2" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Finance Pro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                ? 'bg-primary/10 text-primary'
                : 'text-text-muted hover:bg-bg-dark hover:text-text-primary'
              }`
            }
          >
            <Icon size={18} className="group-hover:scale-110 transition-transform" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User Segment */}
      <div className="p-4 border-t border-border">
        <div className="bg-bg-dark rounded-2xl p-4 flex items-center gap-3 relative group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent-gold flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{user?.fullName || 'User Name'}</p>
            <p className="text-[10px] text-text-muted truncate">Premium Plan</p>
          </div>
          <button
            onClick={signOut}
            className="p-2 rounded-lg hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
