import Admin from "../pages/Admin/Admin";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    isAuth: false,
    isPublic: true,
    userType: null,
    alwaysShow: true,
  },
  {
    path: "/admin",
    element: <Admin />,
    isAuth: true,
    isPublic: false,
    userType: "admin",
    alwaysShow: false,
  },
  {
    path: "/admin/products",
    element: <Admin />,
    isAuth: true,
    isPublic: false,
    userType: "admin",
    alwaysShow: false,
  },
  {
    path: "/login",
    element: <Login />,
    isAuth: false,
    isPublic: true,
    userType: null,
    alwaysShow: false,
  },
  {
    path: "/signup",
    element: <Signup />,
    isAuth: false,
    isPublic: true,
    userType: null,
    alwaysShow: false,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    isAuth: false,
    isPublic: true,
    userType: null,
    alwaysShow: true,
  },
];
