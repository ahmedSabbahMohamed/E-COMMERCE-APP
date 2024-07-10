import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ProductDetails from "../features/productCatalog/components/ProductDetails";
import CategoryProducts from "../features/productCatalog/components/CategoryProducts";
import NotFoundPage from "../components/ui/NotFoundPage";
import Header from "../Layouts/components/Header";
import Footer from "../Layouts/Footer";

const routesConfig = [
  { path: "/", element: <HomePage /> },
  { path: "/products/:id", element: <ProductDetails /> },
  { path: "/categories/:categoryProducts", element: <CategoryProducts /> },
];

const UserRoutes = () => {
  const routes = useRoutes([
    ...routesConfig,
    { path: "*", element: <NotFoundPage /> },
  ]);

  const isRouteMatched = routesConfig.some(
    (route) => window.location.pathname === route.path
  );

  return (
    <>
      {isRouteMatched && <Header />}
      {routes}
      {isRouteMatched && <Footer />}
    </>
  );
};

export default UserRoutes;
