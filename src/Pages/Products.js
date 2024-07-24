import { useState } from "react";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { Col, Row } from "react-bootstrap";
import ProductList from "../Products/components/ProductList";
import ProductsFilters from "../Products/components/ProductsFilters";
import FilterForm from "../Products/components/FilterForm";

function Products() {
  const [filterData, setFilterData] = useState({});

  const handleFilterData = (data) => {
    setFilterData(data)
  }

  return (
    <>
      <Header />
      <Row className="mt-5 mx-0">
        <Col lg={3}>
          <ProductsFilters>
            <FilterForm filterData={handleFilterData} />
          </ProductsFilters>
        </Col>
        <Col lg={9}>
          <ProductList filterData={filterData} />
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Products;
