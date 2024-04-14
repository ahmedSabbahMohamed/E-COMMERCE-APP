import { useEffect, useState } from "react";
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
import Logout from "../../components/ui/Logout"

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      const handleScroll = () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 140) {
          setScrolled(true);
          navbar.classList.add("scrolled");
        } else {
          setScrolled(false);
          navbar.classList.remove("scrolled");
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

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
          <Case condition={user}>
            <div>
              <IoCartOutline size={25} color="white" />
              <Logout />
            </div>
          </Case>
          <Default>
            <div className="d-flex align-items-center gap-2">
              <Link className="text-decoration-none text-white" to={"/login"}>
                Login
              </Link>
              <Link className="btn btn-outline-light" to={"/signup"}>
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
