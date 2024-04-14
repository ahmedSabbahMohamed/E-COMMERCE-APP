import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomPaging from "./CustomPaging";
import ProductDetails from "./ProductDetails";
import { useQuery } from "@tanstack/react-query"
import {API} from "../../api/index"
import {useParams} from "react-router-dom"

function ProductPage() {
  const { productId } = useParams();

  const { data: { data: { data: product } = {} } = {} } = useQuery({
    queryKey: ["product"],
    queryFn: () => API.get(`/admin/product/${productId}`),
  });

  const handleAddToCart = () => {
    console.log("Product added to cart");
  };

  return (
    <>
      <Row className="p-0 m-0 d-flex align-items-center justify-content-center gap-4 min-vh-100">
        <Col sm={12} lg={6}>
          <CustomPaging />
        </Col>
        <Col sm={12} lg={4}>
          {product && (
            <ProductDetails product={product} onAddToCart={handleAddToCart} />
          )}
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
