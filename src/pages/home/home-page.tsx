import { Link } from "react-router-dom";
import { PageContainer } from "../../components/page-container/page-container";
import { cacheStorage } from "../../core/infra/cache-storage";
import { CacheStorage } from "../../core/infra/cache-storage/cache-storage";

export const HomePage = () => {
  const token = cacheStorage.get("token");
  return <PageContainer pageLink='/login' pageName='Home' destinationPage='Login' />;
};
