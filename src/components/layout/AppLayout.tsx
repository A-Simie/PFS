import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';
import { NotificationPanel } from './NotificationPanel';
import { Onboarding } from './Onboarding';

export function AppLayout() {

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary flex">
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:block sticky top-0 h-screen flex-shrink-0">
        <Sidebar onClose={() => {}} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Notification Panel */}
      <NotificationPanel />

      {/* Onboarding Process */}
      <Onboarding />
    </div>
  );
}
