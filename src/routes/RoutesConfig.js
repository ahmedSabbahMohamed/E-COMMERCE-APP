import React from "react";
import Admin from "../Pages/Admin";
import HomePage from "../Pages/HomePage";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import NotFoundPage from "../Pages/NotFoundPage";
import { useSelector } from "react-redux";

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
    // {
    //   path: "/categories",
    //   element: <Admin />,
    //   isAuth: true,
    //   isPublic: false,
    //   userType: "admin",
    // },
    {
      path: "/products",
      element: <Admin />,
      isAuth: true,
      isPublic: false,
      userType: "admin",
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
