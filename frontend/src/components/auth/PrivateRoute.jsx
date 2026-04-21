import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role_id !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;