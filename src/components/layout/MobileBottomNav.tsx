import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Settings } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/budgets', label: 'Budgets', icon: PieChart },
  { to: '/transactions', label: 'History', icon: Receipt },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-panel border-t border-border px-4 py-2 flex justify-around items-center z-50 md:hidden pb-safe">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 group transition-colors ${
              isActive ? 'text-primary' : 'text-text-muted hover:text-text-primary'
            }`
          }
        >
          <div className="p-1 rounded-lg group-active:scale-95 transition-transform">
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-tight">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
