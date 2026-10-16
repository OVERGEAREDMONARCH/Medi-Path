import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/data/mock";

export const ProtectedRoute = ({ role }: { role: Role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== role) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?type=${role}&redirect=${redirect}`} replace />;
  }
  return <Outlet />;
};
