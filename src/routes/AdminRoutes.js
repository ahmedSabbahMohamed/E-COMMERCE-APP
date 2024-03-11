import { Route, Routes } from "react-router-dom"
import Admin from "../pages/Admin"
import { AddCategoryForm, AddEditProductForm, Categories, Products } from "../features/contentManagement"
import NotFoundPage from "../components/ui/NotFoundPage";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />}>
        <Route index element={<Products />} />
        <Route
          path="/add-product"
          element={<AddEditProductForm btnTxt={"Add Product"} />}
        />
        <Route
          path="/edit_product/:productId"
          element={<AddEditProductForm btnTxt={"Edit Product"} />}
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-category" element={<AddCategoryForm />} />
        <Route path="/edit-category/:categoryId" element={<AddCategoryForm />} />
      </Route>
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRoutes