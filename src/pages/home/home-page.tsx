import { PageContainer } from "../../components/page-container/page-container";
import useAuth from "../../hooks/auth/use-auth";

export const HomePage = () => {
  const { isLogged } = useAuth();

  const pageParams = {
    pageLink: isLogged ? "/dashboard" : "/login",
    destinationPage: isLogged ? "Dashboard" : "Login",
    pageName: "Home",
  };

  return (
    <PageContainer
      pageLink={pageParams.pageLink}
      pageName={pageParams.pageName}
      destinationPage={pageParams.destinationPage}
    />
  );
};
