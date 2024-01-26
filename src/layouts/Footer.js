import { Col, Container, Row } from "react-bootstrap"
import Logo from "../components/ui/Logo"
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter, FaInstagramSquare, FaPhoneAlt } from "react-icons/fa";
import data from "../data/navData.json"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark py-3">
      <Container>
        <Logo />
        <Row className="gap-5 gap-md-3 gap-lg-0">
          <Col sm={12} md={5} className="d-grid gap-2">
            <div className="d-flex gap-2">
              <div className="icon text-white">
                <IoLocation />
              </div>
              <div className="desc text-light">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                facere neque impedit beatae magni minus commodi esse hic minima
                enim animi atque, laboriosam nesciunt ad pariatur sint eos
                dolores? Maxime!
              </div>
            </div>
            <div className="d-flex gap-2">
              <div className="icon text-white">
                <FaPhoneAlt />
              </div>
              <div className="desc text-light">+20123456789</div>
            </div>
            <div className="d-flex gap-2">
              <div className="icon text-white">
                <MdEmail />
              </div>
              <div className="desc text-light">exapmle@gamil.com</div>
            </div>
          </Col>

          <Col sm={12} md={5} lg={3}>
            <h4 className="text-white fw-bold px-0">NavLinks</h4>
            <nav>
              <ul className="d-grid gap-2 px-0">
                {data.mobileNavbar.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link
                        className="text-light text-decoration-none px-0"
                        to={category.href}
                      >
                        {category.link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Col>

          <Col sm={12} md={5} lg={2}>
            <h4 className="text-white fw-bold px-0">Categories</h4>
            <nav>
              <ul className="d-grid gap-2 px-0">
                {data.categories.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link
                        className="text-light text-decoration-none px-0"
                        to={category.href}
                      >
                        {category.link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Col>

          <Col sm={12} md={5} lg={2}>
            <div className="d-flex gap-3 text-white fs-3">
              <Link className="text-light" to={"/"}>
                <FaFacebook />
              </Link>
              <Link className="text-light" to={"/"}>
                <FaTwitter />
              </Link>
              <Link className="text-light" to={"/"}>
                <FaInstagramSquare />
              </Link>
            </div>
          </Col>
        </Row>
        <pre className="text-light text-start text-md-end mt-4 mt-lg-0">@copy rights. All rights reserved.</pre>
      </Container>
    </footer>
  );
}

export default Footer