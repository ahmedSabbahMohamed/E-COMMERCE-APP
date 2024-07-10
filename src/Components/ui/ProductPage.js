import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomPaging from "./CustomPaging";
import ProductDetails from "./ProductDetails";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../Api";
import { useParams } from "react-router-dom";

function ProductPage() {
  const [images, setImages] = useState([]);
  const [cart, setCart] = useState(() => {
    const myCart = sessionStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : [];
  });
  const { productId } = useParams();

  const { data: { data: { data: product } = {} } = {} } = useQuery({
    queryKey: ["product"],
    queryFn: () => API.get(`/admin/product/${productId}`),
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const itemIndex = cart.findIndex((item) => item.product.id === product.id);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity = quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  useEffect(() => {
    if (product) {
      const updatedImages = product.images.map((image) => image.path);
      if (product.picture) {
        updatedImages.push(product.picture);
      }
      setImages(updatedImages);
    }
  }, [product]);

  return (
    <>
      <Row className="p-0 m-0 d-flex align-items-center justify-content-center gap-4 min-vh-100">
        <Col className="p-0 m-0" sm={12} lg={5}>
          <CustomPaging imgs={images} customImages={images} />
        </Col>
        <Col sm={12} lg={5}>
          {product && (
            <ProductDetails product={product} onAddToCart={addToCart} />
          )}
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
