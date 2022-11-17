import { useCallback, useEffect, useState } from "react";
import { authorizedApi } from "../../api/api";
import { PageContainer } from "../../components/page-container/page-container";
import useAuth from "../../hooks/auth/use-auth";

export const DashboardPage = () => {
  const { logout } = useAuth();

  const [userInfo, setUserInfo] = useState({
    email: "",
  });

  const loadUserInfo = useCallback(async () => {
    const response = await authorizedApi.get("/me");
    setUserInfo(response?.data);
  }, []);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  return (
    <PageContainer destinationPage='Home' pageLink='/' pageName='Dashboard'>
      {userInfo?.email} <button onClick={logout}>Logout</button>
    </PageContainer>
  );
};
