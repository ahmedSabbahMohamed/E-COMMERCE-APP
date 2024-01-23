import "./Header.css"
import { Link } from "react-router-dom";
import Logo from "../../components/ui/Logo"
import Search from "./Search";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import MobileNavLinks from "./MobileNavLinks"
import DeskTopNavLinks from "./DeskTopNavLinks";

function Navbar() {

  const iconStyle = "text-black fs-2 d-inline-block bg-white border-0"

  return (
    <header className="shadow-sm">

      <div className="container d-flex align-items-center justify-content-between gap-3">

        <div className="d-flex align-items-center gap-2 gap-md-4">
          <Logo />
          <DeskTopNavLinks />
        </div>

        <div className="d-flex align-items-center gap-2">
          <Search />
          <Link className={`${iconStyle} d-none d-lg-block`}>
            <IoIosHeartEmpty />
          </Link>
          <Link className={iconStyle}>
            <IoCartOutline />
          </Link>
          <Link to={"/login"} className={`${iconStyle} d-none d-lg-block`}>
            <AiOutlineUser />
          </Link>
          <MobileNavLinks />
        </div>

      </div>

    </header>
  );
}

export default Navbar