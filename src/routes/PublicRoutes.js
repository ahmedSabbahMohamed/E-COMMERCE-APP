import { useLocation, useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetails from "../features/productCatalog/components/ProductDetails";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import CategoryProducts from "../features/productCatalog/components/CategoryProducts";
import NotFoundPage from "../components/ui/NotFoundPage";
import Header from "../layouts/components/Header";
import Footer from "../layouts/Footer";
import ProductPage from "../components/ui/ProductPage";

function PublicRoutes() {
  const location = useLocation();

  const existingPaths = [
    { path: "/", element: <HomePage /> },
    { path: "/product", element: <ProductDetails /> },
    { path: "/category/:categoryProducts", element: <CategoryProducts /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/product/:productId", element: <ProductPage /> },
  ];

  const routes = useRoutes(existingPaths);

  const isLoginOrSignup =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!routes && <NotFoundPage />}
      {routes && !isLoginOrSignup ? <Header /> : null}
      {routes}
      {routes && !isLoginOrSignup ? <Footer /> : null}
    </>
  );
}

export default PublicRoutes;
