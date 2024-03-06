import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { useLocation } from "react-router-dom";
import AppRouter from "./routes/AppRoutes";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token")
    setLoggedIn(userLoggedIn);
  }, [isAuthPage]);

  return (
    <>
      {isAuthPage === "/login" || isAuthPage === "/signup" ? null : <Navbar />}
      <AppRouter loggedIn={loggedIn} />
      {isAuthPage === "/login" || isAuthPage === "/signup" ? null : <Footer />}
    </>
  );
}

export default App;
