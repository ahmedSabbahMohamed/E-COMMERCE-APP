import React from "react";
import "./assets/styles/Footer.css";
import FooterWaves from "./components/FooterWaves";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "../components/ui/Logo";
import { navLinks, hife } from "../data/constants";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  const socialMediaIcons = [
    <FaFacebook />,
    <FaTwitter />,
    <FaInstagramSquare />,
  ];
  return (
    <footer>
      <FooterWaves />
      <div className="footer-content">
        <Container>
          <div className="text-center text-md-start mb-5">
            <Logo />
          </div>
          <Row className="gap-3 gap-md-0 justify-content-between align-items-start text-center text-md-start">
            <Col md={3} sm={12}>
              <h2 className="text-uppercase text-light fw-bold h5">
                hife & information
              </h2>
              <div className="d-grid gap-2">
                {hife.map((link) => {
                  return (
                    <Link to={link.path} key={link.id} className="text-light">
                      {link.link}
                    </Link>
                  );
                })}
              </div>
            </Col>
            <Col md={3} sm={12}>
              <h2 className="text-uppercase text-light fw-bold h5">bereiche</h2>
              <div className="d-grid gap-2">
                {navLinks.map((link) => {
                  return (
                    <Link to={link.path} key={link.id} className="text-light">
                      {link.link}
                    </Link>
                  );
                })}
              </div>
            </Col>
            <Col md={3} sm={12}>
              <h2 className="text-uppercase text-light fw-bold h5">
                social media
              </h2>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start text-white fs-3">
                {socialMediaIcons.map((icon, index) => (
                  <Link
                    to={"/"}
                    key={index}
                    className="text-light d-inline-block"
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            </Col>
          </Row>

          <pre className="text-light p-0 m-0 mt-3 pb-3 text-center small text-md-end">
            @copy rights. All rights reserved.
          </pre>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
