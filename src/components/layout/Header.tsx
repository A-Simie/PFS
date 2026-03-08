import { Search, Bell } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { useNotifications } from '../../store/NotificationContext';

export function Header() {
  const { user } = useAuth();
  const { unreadCount, setPanelOpen } = useNotifications();

  return (
    <header className="h-16 border-b border-border bg-bg-panel/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="md:hidden bg-primary rounded-lg p-1.5 shadow-lg shadow-primary/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 7V5a4 4 0 0 0-8 0v2" />
            </svg>
          </div>
          
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="text"
              placeholder="Search transactions, budgets..."
              className="w-full bg-bg-dark border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPanelOpen(true)}
            className="p-2 rounded-lg hover:bg-bg-dark text-text-muted transition-colors relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-bg-dark animate-pulse" />
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border ml-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold truncate max-w-[100px]">{user?.fullName || 'User'}</p>
              <p className="text-[10px] text-text-muted">{user?.email || 'Premium Plan'}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
