import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component }) {
  const { isLogin } = useSelector((state) => state.userSlice);
  return isLogin ? <Component /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
