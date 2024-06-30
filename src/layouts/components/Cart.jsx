import { useState, useEffect } from "react";
import { Button, Offcanvas, Row } from "react-bootstrap";
import { IoCartOutline } from "react-icons/io5";

function Cart() {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(sessionStorage.getItem("cart")) ?? [];
    setOrders(storedOrders);
  }, [sessionStorage.getItem("cart")]);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const removeProductFromCart = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    sessionStorage.setItem("cart", JSON.stringify(updatedOrders));
  };

  return (
    <>
      <div
        onClick={handleShow}
        className="position-relative pe-2"
        style={{ cursor: "pointer" }}
      >
        <IoCartOutline size={25} color="white" />
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
          {orders?.length ? orders?.length : null}
        </span>
      </div>
      <Offcanvas
        scroll
        backdrop
        show={show}
        onHide={handleHide}
        placement="end"
      >
        <Offcanvas.Header className="mt-3" closeButton />
        <Offcanvas.Body>
          <div
            className="d-grid gap-3"
            style={{ maxHeight: "5rem", height: "5rem" }}
          >
            {orders.map((order, index) => (
              <Row
                key={index}
                className="align-items-center gap-2 border rounded mx-2"
              >
                <img
                  className="rounded col-sm w-100 h-100 p-0"
                  src={order?.product?.picture ?? ""}
                  alt={order?.product?.name ?? "Product Image"}
                />
                <div className="col-sm p-2">
                  <h5 className="fw-bold text-primary">
                    {order?.product?.name ?? "Product Name"}
                  </h5>
                  <p className="mb-0 fw-bold">
                    <span className="fw-bold text-success">Price: </span>$
                    {order?.product?.price ?? 0}
                  </p>
                  <p className="mb-0 fw-bold">
                    <span className="fw-bold text-success">Quantity: </span>
                    {order?.quantity ?? 0}
                  </p>
                  <p className="fw-bold">
                    <span className="fw-bold text-success">Total Price: </span>$
                    {(order?.product?.price ?? 0) * (order?.quantity ?? 0)}
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => removeProductFromCart(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Row>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
