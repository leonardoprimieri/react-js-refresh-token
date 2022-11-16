import { useLocation, Navigate, Outlet } from "react-router-dom";
import { cacheStorage } from "../../core/infra/cache-storage";
import { CacheStorage } from "../../core/infra/cache-storage/cache-storage";
import { jwtDecode } from "../../core/infra/jwt-decode";
import { JWTDecode } from "../../core/infra/jwt-decode/jwt-decode";
import useAuth from "../../hooks/auth/use-auth";

type RequiredAuthProps = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles = [] }: RequiredAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  const token = cacheStorage.get<string>("token");
  const decodedToken = jwtDecode.decode(token as string) as unknown as {
    roles: string[];
  };

  return decodedToken?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
