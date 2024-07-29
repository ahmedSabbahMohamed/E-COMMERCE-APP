import Admin from "../Pages/Admin";
import {default as HomePage} from "../Pages/HomePage/Page"
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import NotFoundPage from "../Pages/NotFoundPage";
import { useSelector } from "react-redux";
import ProductPage from "../Pages/ProductPage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Payment from "../Pages/Payment";

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
      isPublic: true,
      alwaysShow: true,
    },
    {
      path: "/products",
      element: <Admin />,
      isPublic: false,
      userType: "admin",
      isAuth: true,
    },
    {
      path: "/product/:productId",
      element: <ProductPage />,
      isPublic: true,
    },
    {
      path: "/checkout",
      element: <Payment />,
      isPublic: true,
    },
    {
      path: "/about",
      element: <About />,
      isPublic: true,
    },
    {
      path: "/contact",
      element: <Contact />,
      isPublic: true,
    },
    {
      path: "/login",
      element: <Login />,
      isAuth: false,
    },
    {
      path: "/signup",
      element: <Signup />,
      isAuth: false,
    },
    {
      path: "*",
      element: <NotFoundPage />,
      alwaysShow: true,
    },
  ];

  return routes;
};

export default RoutesConfig;
