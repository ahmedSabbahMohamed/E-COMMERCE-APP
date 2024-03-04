import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";

const role = localStorage?.getItem("role")?.toString().replaceAll(`"`, "")

let router;

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

export { router }
