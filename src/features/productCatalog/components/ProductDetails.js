import { Col, Container, Row } from "react-bootstrap"
import product from "../assets/images/product.jpg"
import Count from "./Count";
import { IoCartOutline } from "react-icons/io5";

function ProductDetails() {
  return (
    <Container className="product-details vh-100 d-flex align-items-center justify-content-center">
      <Row className="m-0 gap-4">
        <Col
          sm={12}
          lg={4}
          className="img-container p-0 shadow rounded overflow-hidden mb-4 mb-md-0"
        >
          <img className="w-100 h-100" src={product} alt="product" />
        </Col>
        <Col sm={12} lg={6} className="px-2">
          <h2 className="text-uppercase h5 text-success">Product company</h2>
          <h3 className="h1 fw-bold">Product Tittle</h3>
          <p className="text-dark">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
          </p>
          <div className="price fw-bold text-dark fs-5 mb-3">$125.00</div>
          <Row className="gap-3 gap-md-0">
            <Col>
              <Count />
            </Col>
            <Col className="d-flex gap-2 align-items-center justify-content-center btn btn-success fw-bold">
              <IoCartOutline />
              <div>Add to cart</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails