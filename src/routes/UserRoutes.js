import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetails from "../features/productCatalog/components/ProductDetails";
import CategoryProducts from "../features/productCatalog/components/CategoryProducts";
import NotFoundPage from "../components/ui/NotFoundPage";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductDetails />} />
      <Route
        path="/categories/:categoryProducts"
        element={<CategoryProducts />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRoutes