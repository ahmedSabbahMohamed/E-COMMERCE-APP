import { Container } from "react-bootstrap";
import Logo from "../../components/ui/Logo";
import SearchBar from "./SearchBar";
import Arrow from "./Arrow";
import MobileSidebar from "./MobileSidebar";
import { navLinks } from "../../data/constants";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import "../assets/styles/Header.css";
import { Case, Default, Switch } from "react-if";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 140) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  return (
    <header className="w-100 position-relative">
      <div className="header-content"></div>
      <Container
        fluid
        className="navbar px-2 py-0 d-flex align-items-center justify-content-between position-fixed top-0 z-3"
      >
        <div className="d-flex gap-2 align-items-center">
          <div className="d-md-none">
            <MobileSidebar />
          </div>
          <Logo />
        </div>

        <div className="d-none d-md-flex gap-3 align-items-center list-unstyled">
          {navLinks.map((link) => {
            return (
              <Link
                to={link.path}
                className="text-decoration-none text-white fw-bolder"
                key={link.id}
              >
                {link.link}
              </Link>
            );
          })}
          <SearchBar />
        </div>

        <Switch>
          <Case condition={user}></Case>
          <Default>
            <div className="d-flex align-items-center gap-2">
              <Link className="text-decoration-none text-white" to={"/login"}>
                Login
              </Link>
              <Link className="btn btn-outline-light" to={"/register"}>
                Register
              </Link>
              <div>
                <IoCartOutline size={25} color="white" />
              </div>
            </div>
          </Default>
        </Switch>
      </Container>
      <div
        className="position-absolute translate-middle"
        style={{ left: "50%", bottom: "50px" }}
      >
        <Arrow />
      </div>
    </header>
  );
}

export default Header;
