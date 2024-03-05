import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { FiMenu } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import links from "../../data/navData.json";
import { showMobileNav, closeMobileNav } from "../../actions/events";

function MobileNavLinks() {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)

  return (
    <div className="d-lg-none">
      <button
        className="bg-light rounded-pill border-0 menu-icon"
        onClick={showMobileNav}
      >
        <FiMenu />
      </button>

      <div className="position-fixed z-3 bg-dark p-2 d-none end-0 top-0 h-100 w-75 shadow mobile-nav">
        <div className="text-end">
          <button
            className="text-danger btn fs-4 rounded-pill"
            onClick={closeMobileNav}
          >
            <IoIosClose />
          </button>
        </div>

        <NavLinks
          navLinks={
            <>
              <div className="nav-link rounded">
                <div className="d-flex align-items-center ms-2">
                  <div className="text-light mb-1">
                    <IoMdPerson />
                  </div>
                  <Link className="btn text-light text-start d-block text-decoration-none p-2">
                    {user? user.name : "Profile"}
                  </Link>
                </div>
              </div>
              {user
                ? links.privateMobileNavbar.map((link) => {
                    return (
                      <li className="nav-link rounded" key={link.id}>
                        <Link
                          className="btn text-light text-start d-block text-decoration-none p-2"
                          to={link.href}
                        >
                          {link.link}
                        </Link>
                      </li>
                    );
                  })
                : links.publicMobileNavbar.map((link) => {
                    return (
                      <li className="nav-link rounded" key={link.id}>
                        <Link
                          className="btn text-light text-start d-block text-decoration-none p-2"
                          to={link.href}
                        >
                          {link.link}
                        </Link>
                      </li>
                    );
                  })}
            </>
          }
          navStyle={"d-grid"}
          ulStyles={"list-unstyled d-grid gap-2"}
        />
      </div>
    </div>
  );
}

export default MobileNavLinks;
