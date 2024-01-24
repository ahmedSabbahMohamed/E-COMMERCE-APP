import { Container } from "react-bootstrap"
import Logo from "../components/ui/Logo"
import "./assets/styles/Navbar.css"
import DeskTopNavLinks from "./components/DeskTopNavLinks";
import MobileNavLinks from "./components/MobileNavLinks"
import Search from "./components/Search"
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

function Navbar() {

    const iconStyle = "text-secondary fs-1 d-inline-block bg-white border-0";

  return (
    <header className="">
      <Container>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <div className="d-flex gap-3 align-items-center">
            <Logo />
            <DeskTopNavLinks />
          </div>
          <div className="d-flex align-items-center gap-2">
            <Search />
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <Link className={`${iconStyle} d-none d-lg-block`}>
                  <IoIosHeartEmpty />
                </Link>
                <Link className={`${iconStyle} position-relative`}>
                  <IoCartOutline />
                  {/* <span className="d-inline-block position-absolute btn btn-danger top-0 end-0">2</span> */}
                </Link>
                <Link
                  to={"/login"}
                  className={`${iconStyle} d-none d-lg-block`}
                >
                  <AiOutlineUser />
                </Link>
                <MobileNavLinks />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Navbar