import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomPaging from "../Components/ui/CustomPaging";
import ProductDetails from "../Components/ui/ProductDetails";
import { useQuery } from "@tanstack/react-query";
import { API } from "../Api";
import { useParams } from "react-router-dom";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { Container } from "react-bootstrap";
import { getSrc } from "../Helpers";
import CustomRating from "../Components/ui/CustomRating";

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

  const comments = [
    {
      id: 1,
      picture:
        "https://cdn.pixabay.com/photo/2023/01/18/10/32/ouch-7726461_640.jpg",
        name: "John Doe",
        comment: "This is a great product!",
        rating: 5,
    },
    {
      id: 1,
      picture:
        "https://cdn.pixabay.com/photo/2023/01/18/10/32/ouch-7726461_640.jpg",
        name: "John Doe",
        comment: "This is a bad product!",
        rating: 2.3,
    },
  ];

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
      <Header />
      <Row className="p-0 m-0 d-flex align-items-center justify-content-center gap-4 min-vh-100">
        <Col className="p-0 m-0" sm={12} lg={5}>
          <CustomPaging imgs={images} customImages={images} />
        </Col>
        <Col sm={12} lg={5}>
          {product && <ProductDetails product={product} />}
        </Col>
      </Row>
      <Container
        className="my-5 d-flex flex-column gap-3"
        style={{ width: "70%" }}
      >
        {comments?.map((comment, index) => (
          <div key={index} className="p-2 border rounded">
            <div className="d-flex align-items-center justify-content-start gap-2">
              <img
                src={getSrc(comment?.picture)}
                alt="img"
                className="img img-fluid rounded-pill"
                style={{ width: "40px", height: "40px" }}
              />
              <h6 className="fw-bold">{comment?.name}</h6>
            </div>
            <p className="text-secondary pt-2 pb-0 mb-0">{comment?.comment}</p>
            <CustomRating value={comment?.rating} />
          </div>
        ))}
      </Container>
      <Footer />
    </>
  );
}

export default ProductPage;
