import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/auth-provider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
