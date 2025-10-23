import { Navigate } from 'react-router-dom';

/**
 * AuthGuard - Protects admin routes
 * Checks if user has adminToken in localStorage
 * Redirects to /admin/login if not authenticated
 */
export default function AuthGuard({ children }) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // User is not authenticated, redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  // User is authenticated, render the protected content
  return children;
}
