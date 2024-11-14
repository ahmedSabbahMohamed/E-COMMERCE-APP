import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import CustomPaging from "../../Components/ui/CustomPaging";
import ProductDetails from "../../Components/ui/ProductDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../Api";
import ProductReviews from "./ProductReviews";

function Page() {

  const [images, setImages] = useState([]);
  const { productId } = useParams();

  const { data: { data: { data: product } = {} } = {} } = useQuery({
    queryKey: ["product"],
    queryFn: () => API.get(`/admin/product/${productId}`),
    enabled: !!productId,
  });

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
        className="my-5 d-flex flex-column gap-3 border rounded p-3"
        style={{width: "100%", maxWidth: "662px"}}
      >
        <ProductReviews />
      </Container>
      <Footer />
    </>
  );
}

export default Page;
