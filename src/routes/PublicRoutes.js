import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ProductDetails from "../features/productCatalog/components/ProductDetails";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import CategoryProducts from "../features/productCatalog/components/CategoryProducts";
import NotFoundPage from "../components/ui/NotFoundPage";
import Header from "../Layouts/components/Header";
import Footer from "../Layouts/Footer";
import ProductPage from "../components/ui/ProductPage";

const PublicRoutes = () => {
  const location = useLocation();

  const routesConfig = [
    { path: "/", element: <HomePage /> },
    { path: "/product", element: <ProductDetails /> },
    { path: "/category/:categoryProducts", element: <CategoryProducts /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/product/:productId", element: <ProductPage /> },
  ];

  const routes = useRoutes(routesConfig);
  const isLoginOrSignup =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {routes}
      {!isLoginOrSignup && <Header />}
      {!isLoginOrSignup && <Footer />}
      {!routes && <NotFoundPage />}
    </>
  );
};

export default PublicRoutes;
