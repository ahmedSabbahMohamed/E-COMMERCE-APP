import { Route, Routes } from "react-router-dom";
import Admin from "../features/contentManagement/components/ui/Admin";
import {
  AddCategoryForm,
  AddEditProductForm,
  Categories,
  Products,
} from "../features/contentManagement";
import NotFoundPage from "../components/ui/NotFoundPage";
import ProductPage from "../components/ui/ProductPage";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />}>
        <Route index element={<Categories />} />
        <Route
          path="add-product"
          element={<AddEditProductForm btnTxt={"Add Product"} />}
        />
        <Route
          path="edit-product/:productId"
          element={<AddEditProductForm btnTxt={"Edit Product"} />}
        />
        <Route path="products" element={<Products />} />
        <Route path="add-category" element={<AddCategoryForm />} />
        <Route path="edit-category/:categoryId" element={<AddCategoryForm />} />
        <Route path="/products/:productId" element={<ProductPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRoutes;
