import React from "react";
import Admin from "../Pages/Admin";
import HomePage from "../Pages/HomePage";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import NotFoundPage from "../Pages/NotFoundPage";
import { useSelector } from "react-redux";
import ProductPage from "../Pages/ProductPage";
import Products from "../Pages/Products";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Payment from "../Pages/Payment";
import Categories from "../Pages/Categories";
import CategoryPage from "../Pages/CategoryPage";

const RoutesConfig = () => {
  const { isLogin, user } = useSelector((state) => state.userSlice);

  const handleAdminRoutes = ({ defaultComponent }) => {
    return isLogin && user?.user_type === "admin" ? (
      <Admin />
    ) : (
      defaultComponent
    );
  };

  const routes = [
    {
      path: "/",
      element: handleAdminRoutes({ defaultComponent: <HomePage /> }),
      isAuth: false,
      isPublic: true,
      alwaysShow: true,
    },
    {
      path: "/products",
      element: <Admin />,
      isAuth: true,
      isPublic: false,
      userType: "admin",
    },
    {
      path: "/product/:productId",
      element: <ProductPage />,
      isPublic: true,
      isAuth: false,
    },
    {
      path: "/products",
      element: <Products />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "/categories",
      element: <Categories />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "/category/:categoryId",
      element: <CategoryPage />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "/checkout",
      element: <Payment />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "/about",
      element: <About />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "/contact",
      element: <Contact />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "/login",
      element: <Login />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "/signup",
      element: <Signup />,
      isAuth: false,
      isPublic: true,
    },
    {
      path: "*",
      element: <NotFoundPage />,
      isAuth: false,
      isPublic: true,
      alwaysShow: true,
    },
  ];

  return routes;
};

export default RoutesConfig;
