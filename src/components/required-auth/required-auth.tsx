import { useLocation, Navigate, Outlet } from "react-router-dom";
import { cacheStorage } from "../../core/infra/cache-storage";
import { jwtDecode } from "../../core/infra/jwt-decode";
import useAuth from "../../hooks/auth/use-auth";

type RequiredAuthProps = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles = [] }: RequiredAuthProps) => {
  const { isLogged } = useAuth();
  const location = useLocation();

  const token = cacheStorage.get<string>("token");
  const decodedToken = {
    roles: token ? jwtDecode.decode(token).roles : [],
  };

  return decodedToken?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : !isLogged ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
