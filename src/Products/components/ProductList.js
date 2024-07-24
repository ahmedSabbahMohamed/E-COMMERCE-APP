import React, { useEffect, useState } from "react";
import { Case, Switch } from "react-if";
import { Spin } from "antd";
import Loading from "../../Components/ui/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../Components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../Api";
import ProductCard from "../../Components/ui/ProductCard";

function ProductList({ filterData }) {
  const [currentPage, setCurrentPage] = useState("1");
  const [debouncedFilterData, setDebouncedFilterData] = useState(filterData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterData(filterData);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [filterData]);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", debouncedFilterData, currentPage],
    queryFn: () =>
      API.get(`/admin/products`, {
        params: {
          page: currentPage,
          ...(debouncedFilterData?.name && {
            "filter[name]": debouncedFilterData?.name,
          }),
        },
      }),
    keepPreviousData: true,
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const pageCount = products?.data?.data?.last_page;
  return (
    <div>
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
          <div className="d-flex flex-row flex-wrap gap-4 mb-5 align-items-center justify-content-center justify-content-md-start">
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
    </div>
  );
}

export default ProductList;
