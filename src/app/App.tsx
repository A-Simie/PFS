import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { FinanceProvider } from '../store/FinanceContext';
import { NotificationProvider } from '../store/NotificationContext';
import { router } from './router';
import Loader from '../components/ui/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial application loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <NotificationProvider>
      <FinanceProvider>
        <RouterProvider router={router} />
      </FinanceProvider>
    </NotificationProvider>
  );
}
