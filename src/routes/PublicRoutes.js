import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ProductDetails from "../features/productCatalog/components/ProductDetails"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import CategoryProducts from "../features/productCatalog/components/CategoryProducts";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductDetails />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/categories/:categoryProducts"
        element={<CategoryProducts />}
      />
    </Routes>
  );
}

export default PublicRoutes