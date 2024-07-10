import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";

function AppRoutes() {
  const { isLogin, user } = useSelector((state) => state.userSlice);
  const routes = RoutesConfig();
  
  return (
    <Routes>
      {routes?.map((route, index) => {
        if (route.alwaysShow) {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        } else if (
          isLogin &&
          user.user_type === route.userType &&
          route.isAuth &&
          !route.isPublic
        ) {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        } else if (!isLogin && !route.isAuth && route.isPublic) {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        }
      })}
    </Routes>
  );
}

export default AppRoutes;
