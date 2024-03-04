// import { Route, Routes } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login"
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
// import CategoryProducts from "./features/productCatalog/components/CategoryProducts";
// import HomePage from "./pages/HomePage";
// import ProductDetails from "./features/productCatalog/components/ProductDetails";
// import Admin from "./pages/Admin";
import { router } from "./routes";

function App() {
  // const role = JSON.parse(localStorage.getItem("role"))

  return (
    <div className="grid">
      <Navbar />
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/categories/:categoryProducts"
          element={<CategoryProducts />}
        />
        {role === "admin"? 
          <Route path="/admin/*" element={<Admin />} /> : null
        }
      </Routes> */}
      {/* {role === "admin"? <AdminRoutes /> : <PublicRoutes />} */}
      { router }
      <Footer />
    </div>
  );
}

export default App;
