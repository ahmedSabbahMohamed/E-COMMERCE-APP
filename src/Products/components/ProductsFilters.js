import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

function ProductsFilters({ children }) {
  const [show, setShow] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 992);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={handleShow}
        className="d-lg-none mx-1 p-1 rounded-pill d-flex align-items-center justify-content-center"
        style={{ marginTop: "30px", width: "30px", height: "30px" }}
      >
        <FaFilter size={"15px"} />
      </Button>

      {isLargeScreen ? (
        <div
          className="sidebar position-sticky d-none d-lg-block"
          style={{ marginTop: "20px" }}
        >
          <h4>
            Filters <FaFilter size={"20px"} />
          </h4>
          {children}
        </div>
      ) : (
        <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{children}</Offcanvas.Body>
        </Offcanvas>
      )}

      {/* Styles for the sidebar */}
      <style jsx>{`
        .sidebar {
          width: 250px;
          padding: 20px;
          height: 100vh;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}

export default ProductsFilters;
