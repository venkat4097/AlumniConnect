import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * PrivateRoute protects routes from unauthorized access.
 * Optionally accepts a `requiredRole` prop to restrict by role.
 */
const PrivateRoute = ({ children, requiredRole }) => {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
