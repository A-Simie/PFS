import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../services/storage';

interface User {
  fullName: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (fullName: string, email: string, password: string) => { success: boolean; error?: string };
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStorageItem<User>('current_user'));

  const isAuthenticated = !!user;

  useEffect(() => {
    const stored = getStorageItem<User>('current_user');
    if (stored) setUser(stored);
  }, []);

  const signUp = useCallback((fullName: string, email: string, password: string) => {
    const users = getStorageItem<StoredUser[]>('users') || [];
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists' };
    }

    users.push({ fullName, email: email.toLowerCase(), password });
    setStorageItem('users', users);

    const currentUser: User = { fullName, email: email.toLowerCase() };
    setStorageItem('current_user', currentUser);
    setUser(currentUser);

    return { success: true };
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const users = getStorageItem<StoredUser[]>('users') || [];
    const userExists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!userExists) {
      return { 
        success: false, 
        error: 'Account does not exist, use the one used when creating' 
      };
    }

    if (userExists.password !== password) {
      return { success: false, error: 'Invalid password' };
    }

    const currentUser: User = { fullName: userExists.fullName, email: userExists.email };
    setStorageItem('current_user', currentUser);
    setUser(currentUser);

    return { success: true };
  }, []);

  const signOut = useCallback(() => {
    removeStorageItem('current_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
