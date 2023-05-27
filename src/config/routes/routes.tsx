import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../../components/required-auth/required-auth";
import { Layout } from "../../layouts/base-layout/base-layout";
import { DashboardPage } from "../../pages/dashboard/dashboard-page";
import { HomePage } from "../../pages/home/home-page";
import { LoginPage } from "../../pages/login/login-page";
import { ProductsPage } from "../../pages/products/products-page";
import { UnauthorizedPage } from "../../pages/unauthorized/unauthorized-page";

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route element={<RequireAuth allowedRoles={[]} />}>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
        <Route path='products' element={<ProductsPage />} />
        <Route path='unauthorized' element={<UnauthorizedPage />} />
      </Route>
    </Routes>
  );
};
