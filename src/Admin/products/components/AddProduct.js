import ProductForm from "./ProductForm";
import ProductCard from "../../../Components/ui/ProductCard";
import ProductImageCarousel from "./ProductImageCarousel";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

function AddProduct() {
  const [formData, setFormData] = useState({});
  function productData(data) {
    setFormData(data);
  }

  return (
    <Row className="align-items-center justify-conten-center">
      <Col
        sm={12}
        lg={6}
      >
        <ProductForm productData={productData} />
      </Col>
      <Col
        sm={12}
        lg={6}
        className="d-flex flex-column gap-2 align-items-center justify-content-center"
      >
        <ProductCard details={formData} />
        <div className="p-3 w-100">
          {formData?.images?.length > 1 && (
            <ProductImageCarousel images={formData?.images} />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default AddProduct;
