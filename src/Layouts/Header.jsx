import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Case, Default, Switch } from "react-if";
import Logo from "../Components/ui/Logo";
import Arrow from "./components/Arrow";
import MobileSidebar from "./components/MobileSidebar";
import { navLinks } from "../Helpers/constants";
import "./assets/styles/Header.css";
import Logout from "../Components/ui/Logout";
import headerImg from "./assets/images/header.jpeg";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();

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
  }, [scrolled]);

  const regExp = /^\/(category|product)\/[0-9]+$/;

  const homePage = !regExp.test(location.pathname);

  return (
    <header className="w-100 position-relative">
      {homePage && (
        <div
          className="header-content"
          style={{
            backgroundImage: `url(${headerImg})`,
          }}
        ></div>
      )}

      <Container
        fluid
        className="navbar px-2 py-0 d-flex align-items-center justify-content-between position-fixed top-0 z-3"
        style={{
          backgroundColor: `${!homePage && "#000000e3"}`,
        }}
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
        </div>

        <Switch>
          <Case condition={user?.name}>
            <div className="d-flex gap-2 justify-content-center align-items-center">
              <Cart />
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
                <Cart />
              </div>
            </div>
          </Default>
        </Switch>
      </Container>

      {homePage && (
        <div
          className="position-absolute translate-middle bg-danger"
          style={{ left: "50%", bottom: "-40px" }}
        >
          <Arrow />
        </div>
      )}
    </header>
  );
}

export default Header;
