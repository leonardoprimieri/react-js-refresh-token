import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { cacheStorage } from "../../core/infra/cache-storage";

type AuthContextType = {
  auth: {
    roles: string[];
    user?: {};
  };
  setAuth: Dispatch<SetStateAction<{ roles: never[] }>>;
  login: ({ email, password }: any) => void;
  isLogged: boolean;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({ roles: [] });
  const [isLogged, setIsLogged] = useState(false);

  const token = cacheStorage.get<string>("token");

  useEffect(() => {
    if (!token) return;
    setIsLogged(true);
  }, [token]);

  const login = async ({ email, password }: any) => {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      setAuth({
        roles: response.data.roles,
      });

      if (response?.status === 200) {
        cacheStorage.set("token", response?.data?.token);
        cacheStorage.set("refreshToken", response?.data?.refreshToken);
        return navigate("/dashboard");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    cacheStorage.remove("token");
    cacheStorage.remove("refreshToken");
    setAuth({ roles: [] });
    setIsLogged(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
