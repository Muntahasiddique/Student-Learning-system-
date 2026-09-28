import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authtoken');
  
  // If there is no token, kick them back to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}