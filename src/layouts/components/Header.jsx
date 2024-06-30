import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Logo from "../../components/ui/Logo";
import SearchBar from "./SearchBar";
import Arrow from "./Arrow";
import MobileSidebar from "./MobileSidebar";
import { navLinks } from "../../data/constants";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/Header.css";
import { Case, Default, Switch } from "react-if";
import Logout from "../../components/ui/Logout";
import headerImg from "../assets/images/header.jpeg";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api";
import Cart from "./Cart";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
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
    }, []);

    const { data } = useQuery({
      queryKey: ["data"],
      queryFn: () => API.get(`/admin${location.pathname}`),
      enabled: location.pathname !== "/"
    });

  return (
    <header className="w-100 position-relative">
      <div
        className="header-content"
        style={{
          backgroundImage:
            data?.data?.data && location.pathname !== "/" ? `url(${data?.data?.data?.picture})` : `url(${headerImg})`,
        }}
      ></div>
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
