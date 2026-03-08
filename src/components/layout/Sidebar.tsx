import { NavLink } from 'react-router-dom';
import { Logo } from '../ui/Logo';
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
  onNavigation?: () => void;
}

export function Sidebar({ onNavigation }: SidebarProps) {
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 h-full bg-bg-panel border-r border-border flex flex-col">
      {/* Branding */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <Logo size={32} />
          <span className="text-sm font-bold tracking-tight text-white uppercase opacity-80 leading-tight">
            Personal Finance<br />Snapshot
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigation}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                ? 'bg-primary/10 text-primary font-bold'
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
            <p className="text-sm font-bold truncate text-white">{user?.fullName || 'User Name'}</p>
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
