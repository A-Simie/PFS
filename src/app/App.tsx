import { RouterProvider } from 'react-router-dom';
import { FinanceProvider } from '../store/FinanceContext';
import { NotificationProvider } from '../store/NotificationContext';
import { router } from './router';

export default function App() {
  return (
    <NotificationProvider>
      <FinanceProvider>
        <RouterProvider router={router} />
      </FinanceProvider>
    </NotificationProvider>
  );
}
