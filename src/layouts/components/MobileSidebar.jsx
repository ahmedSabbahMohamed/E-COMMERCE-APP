import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RiMenu4Fill } from "react-icons/ri";
import { navLinks } from "../../data/constants";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/MobileSidebar.css"

function MobileSidebar() {
  const [show, setShow] = useState(false);
  const location = useLocation()

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  return (
    <>
      <Button className="p-0" variant="" onClick={handleShow}>
        <RiMenu4Fill color="white" size={22} />
      </Button>

      <Offcanvas scroll backdrop show={show} onHide={handleHide}>
        <Offcanvas.Header className="mt-3" closeButton />
        <Offcanvas.Body>
          <div className="d-grid gap-3 mobile-sidebar">
            {navLinks.map((link) => {
              return (
                <Link
                  className={`text-decoration-none ${location.pathname == link.path ? 'active' : ''}`}
                  to={link.path}
                  key={link.id}
                >
                  {link.link}
                </Link>
              );
            })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSidebar;
