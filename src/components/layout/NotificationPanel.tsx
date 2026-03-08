import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Trash2, CheckCircle2, AlertCircle, Info, Calendar } from 'lucide-react';
import { useNotifications, type NotificationType } from '../../store/NotificationContext';

const typeConfig: Record<NotificationType, { icon: any; color: string }> = {
  success: { icon: CheckCircle2, color: 'text-primary' },
  danger: { icon: Trash2, color: 'text-danger' },
  warning: { icon: AlertCircle, color: 'text-accent-gold' },
  info: { icon: Info, color: 'text-info' },
};

export function NotificationPanel() {
  const { notifications, markAsRead, clearAll, isPanelOpen, setPanelOpen } = useNotifications();

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanelOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-bg-panel border-l border-border z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-primary" />
                <h2 className="text-lg font-bold">Notifications</h2>
              </div>
              <button onClick={() => setPanelOpen(false)} className="p-2 rounded-lg hover:bg-bg-dark text-text-muted transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-12">
                  <Bell size={48} className="mb-4" />
                  <p className="text-sm font-medium">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Config = typeConfig[notification.type];
                  return (
                    <motion.div
                      layout
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${notification.read
                          ? 'bg-bg-dark/30 border-transparent opacity-60'
                          : 'bg-bg-dark border-border hover:border-primary/50'
                        }`}
                    >
                      <div className="flex gap-4">
                        <div className={`shrink-0 w-10 h-10 rounded-full bg-bg-panel flex items-center justify-center ${Config.color}`}>
                          <Config.icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-sm font-bold truncate">{notification.title}</h3>
                            <span className="text-[10px] text-text-muted whitespace-nowrap flex items-center gap-1">
                              <Calendar size={10} />
                              {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed">{notification.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-6 border-t border-border">
                <button
                  onClick={clearAll}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-danger transition-colors border border-dashed border-border rounded-xl hover:border-danger/30"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
