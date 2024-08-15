import { Case, Switch } from "react-if";
import ProductCard from "../../Components/ui/ProductCard";
import NoData from "../../Components/ui/NoData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "../../Api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Loading from "../../Components/ui/Loading";
import { Button, Container } from "react-bootstrap";

function ProductList({ filterData, category }) {
  const [pagination, setPagination] = useState({ start: 1, end: 8 });

  const { data, fetchNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery({
      queryKey: ["products", category],
      queryFn: ({ pageParam = pagination }) =>
        API.get(
          `/user/products?start=${pageParam.start}&end=${pageParam.end}&category=${category}`
        ),
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length * 8 < lastPage?.data?.count) {
          return {
            start: allPages.length * 8 + 1,
            end: (allPages.length + 1) * 8,
          };
        } else {
          return undefined;
        }
      },
      refetchOnMount: false,
    });

  const handleFetchNextPage = () => {
    const nextStart = pagination.start + 8;
    const nextEnd = pagination.end + 8;
    setPagination({ start: nextStart, end: nextEnd });
    fetchNextPage({ pageParam: { start: nextStart, end: nextEnd } });
  };

  const allProducts =
    data?.pages.flatMap((item) => item?.data?.data || []) || [];
  const count = data?.pages[0]?.data?.count;

  return (
    <div>
      <Switch>
        <Case condition={isLoading}>
          <div className="vh-100 d-flex justify-content-center align-itmes-center">
            <Spin />
          </div>
        </Case>

        <Case condition={isError}>
          <Loading queryString={["products"]} />
        </Case>

        <Case condition={allProducts.length > 0}>
          <Container className="d-flex flex-column gap-5 align-items-center justify-conent-center">
            <div className="d-flex gap-3 flex-row flex-wrap align-items-center justify-content-center justify-content-md-start">
              {allProducts?.map((product, index) => (
                <div
                  key={index}
                >
                  <ProductCard details={product} />
                </div>
              ))}
            </div>
            <div>
              <Button
                variant="outline-primary"
                disabled={isFetching}
                style={{
                  display: allProducts.length === count ? "none" : "",
                }}
                onClick={handleFetchNextPage}
              >
                {isFetching ? <Spin /> : "Load More Products"}
              </Button>
            </div>
          </Container>
        </Case>

        <Case condition={allProducts.length < 1}>
          <NoData />
        </Case>
      </Switch>
    </div>
  );
}

export default ProductList;
