import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const Landing = lazy(() => import('../pages/Landing'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Transactions = lazy(() => import('../pages/Transactions'));
const Budgets = lazy(() => import('../pages/Budgets'));
const Settings = lazy(() => import('../pages/Settings'));
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <Landing />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/signin',
    element: (
      <SuspenseWrapper>
        <SignIn />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/signup',
    element: (
      <SuspenseWrapper>
        <SignUp />
      </SuspenseWrapper>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: (
              <SuspenseWrapper>
                <Dashboard />
              </SuspenseWrapper>
            ),
          },

          {
            path: '/budgets',
            element: (
              <SuspenseWrapper>
                <Budgets />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/transactions',
            element: (
              <SuspenseWrapper>
                <Transactions />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/settings',
            element: (
              <SuspenseWrapper>
                <Settings />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
