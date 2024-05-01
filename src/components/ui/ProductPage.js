import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomPaging from "./CustomPaging";
import ProductDetails from "./ProductDetails";
import { useQuery } from "@tanstack/react-query"
import {API} from "../../api/index"
import {useParams} from "react-router-dom"

function ProductPage() {
  const [images, setImages] = useState([])
  const { productId } = useParams();

  const { data: { data: { data: product } = {} } = {} } = useQuery({
    queryKey: ["product"],
    queryFn: () => API.get(`/admin/product/${productId}`),
  });

useEffect(() => {
  if (product) {
    const updatedImages = product.images.map((image) => image.path); // Extracting paths from objects
    if (product.picture) {
      updatedImages.push(product.picture); // Adding the picture URL string
    }
    setImages(updatedImages);
  }
}, [product]);
  
  console.log(images);
  const handleAddToCart = () => {
    console.log("Product added to cart");
  };

  return (
    <>
      <Row className="p-0 m-0 d-flex align-items-center justify-content-center gap-4 min-vh-100">
        <Col className="p-0 m-0" sm={12} lg={6}>
          <CustomPaging imgs={images} />
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
