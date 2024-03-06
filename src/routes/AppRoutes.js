import React, { useState, useEffect } from "react";
import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";

const AppRouter = ({ loggedIn }) => {
  const [role, setRole] = useState(
    localStorage?.getItem("role")?.toString().replaceAll(`"`, "")
  );
  let router;

    useEffect(() => {
      setRole(localStorage?.getItem("role")?.toString().replaceAll(`"`, ""));
    }, [loggedIn]);

  switch (role) {
    case "admin":
      router = <AdminRoutes />;
      break;
    case "user":
      router = <UserRoutes />;
      break;
    default:
      router = <PublicRoutes />;
  }

  return router;
};

export default AppRouter;
