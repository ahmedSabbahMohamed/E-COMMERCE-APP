import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductForm from "./ProductForm";
import ProductCard from "../../../Components/ui/ProductCard";
import ProductImageCarousel from "./ProductImageCarousel";

function AddProduct({ edit = false, id = null }) {
  const [formData, setFormData] = useState(null);

  const handleProductData = (data) => {
    setFormData(data);
  };

  // console.log(Object.keys(formData).length)
  console.log(formData);

  return (
    <Row className="align-items-center justify-content-center">
      <Col sm={12} lg={6}>
        <ProductForm productData={handleProductData} edit={edit} id={id} />
      </Col>
      <Col
        sm={12}
        lg={6}
        className="d-flex flex-column gap-2 align-items-center justify-content-center"
      >
        {formData && <ProductCard details={formData} />}
        <div className="p-3 w-100">
          {formData?.images?.length > 1 && (
            <ProductImageCarousel images={formData.images} />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default AddProduct;
