import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  
  // user is null if not authenticated, object if authenticated
  // loading state isn't explicitly handled in this simple localStorage impl
  // but we check if we have a user
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
