import { useState } from "react";
import ProductList from "../../../Products/components/ProductList";
import ProductsFilters from "../../../Products/components/ProductsFilters";
import FilterForm from "../../../Products/components/FilterForm";
import { Container } from "react-bootstrap";

function Products({ category }) {
  const [filterData, setFilterData] = useState({});

  const handleFilterData = (data) => {
    setFilterData(data);
  };

  return (
    <Container>
      <div className="my-4">
        <ProductsFilters>
          <FilterForm filterData={handleFilterData} />
        </ProductsFilters>
      </div>
      <ProductList filterData={filterData} category={category} />
    </Container>
  );
}

export default Products;
