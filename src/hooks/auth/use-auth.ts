import { useContext, useDebugValue } from "react";
import { AuthContext } from "../../contexts/auth/auth-provider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  return useContext(AuthContext);
};

export default useAuth;
