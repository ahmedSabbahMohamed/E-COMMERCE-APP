import { Categories, Products } from "../features/productCatalog";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
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
