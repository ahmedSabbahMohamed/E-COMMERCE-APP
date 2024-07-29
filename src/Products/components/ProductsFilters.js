import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

function ProductsFilters({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={handleShow}
        className="mx-1 p-2 rounded-pill d-flex align-items-center justify-content-center"
        style={{ marginTop: "30px" }}
      >
        Filters <FaFilter size={"15px"} />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className={"shadow custom-offcanvas"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-success fw-bold">
            Filters <FaFilter size={"15px"} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>

      <style jsx>{`
        .sidebar {
          width: 250px;
          padding: 20px;
          height: 100vh;
          overflow-y: auto;
        }
        .custom-offcanvas .offcanvas-header {
          border-bottom: 1px solid #ddd;
        }
      `}</style>
    </>
  );
}

export default ProductsFilters;
