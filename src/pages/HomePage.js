import { Categories, Products } from "../features/productCatalog";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <>
      <Header />
      <Container fluid>
        <Categories />
        <Products />
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
