import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Case, Switch } from "react-if";
import { Spin } from "antd";
import Loading from "../Components/ui/Loading";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ui/ProductCard";
import { API } from "../Api";
import Pagination from "../Components/ui/Pagination";
import { useState } from "react";

function Products() {
  const [currentPage, setCurrentPage] = useState("1");

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["prodcuts"],
    queryFn: () => API.get("/admin/products"),
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const pageCount = products?.data?.data?.last_page;

  return (
    <>
      <Header />
      <Container className="min-vh-100 pt-5">
        <h2 className="heading mb-5 mt-5 text-center text-lg-start fw-bold text-primary">
          Products
        </h2>

        <Switch>
          <Case condition={isLoading}>
            <Spin />
          </Case>

          <Case condition={isError}>
            <Loading queryString={"products"} />
          </Case>

          <Case condition={products?.data?.data}>
            <div className="d-flex flex-row flex-wrap gap-3 mb-5 align-items-center justify-content-center">
              {products?.data?.data?.data?.map((product, index) => (
                <Link
                  to={`/product/${product?.id}`}
                  className="text-decoration-none"
                  key={index}
                >
                  <ProductCard details={product} />
                </Link>
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageCount={pageCount}
              />
            </div>
          </Case>
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default Products;
