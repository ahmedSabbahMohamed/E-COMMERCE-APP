import Footer from "./layouts/Footer";
import { useLocation } from "react-router-dom";
import { router } from "./routes";
import Header from "./layouts/components/Header";
import Footer2 from "./layouts/Footer2";

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname

  return (
    <>
      {/* {isAuthPage === "/login" || isAuthPage === "/signup" ? null : <Navbar />}
      {router}
      {isAuthPage === "/login" || isAuthPage === "/signup" ? null : <Footer />} */}
      <Header />
      <main id="main" className="min-vh-100 mt-5"></main>
      <Footer2/>
    </>
  );
}

export default App;
