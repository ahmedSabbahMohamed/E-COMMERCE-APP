import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Signin from "./components/Signin";
import Register from "./components/Register";

function App() {
  return (
    <>   
      <Header />
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
