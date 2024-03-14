import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { useLocation } from "react-router-dom";
import { router } from "./routes";

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname

  return (
    <>
      {isAuthPage === "/login" || isAuthPage === "/signup" ? null : <Navbar />}
      {router}
      {isAuthPage === "/login" || isAuthPage === "/signup" ? null : <Footer />}
    </>
  );
}

export default App;
