import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'info' | 'success' | 'warning' | 'danger';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string; // Stored as ISO string for easy JSON serializing
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (title: string, message: string, type?: NotificationType) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
  isPanelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const STORAGE_KEY = 'pfs_notifications';

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notifications', e);
      }
    }
    return [
      {
        id: '1',
        title: 'Welcome to Finance Pro',
        message: 'Start by adding your income and creating a budget.',
        type: 'info',
        timestamp: new Date().toISOString(),
        read: false,
      }
    ];
  });

  // Persist to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = useCallback((title: string, message: string, type: NotificationType = 'info') => {
    const newNotification: Notification = {
      id: uuidv4(),
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ 
        notifications, 
        addNotification, 
        markAsRead, 
        clearAll, 
        unreadCount,
        isPanelOpen,
        setPanelOpen
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
