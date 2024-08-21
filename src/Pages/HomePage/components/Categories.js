import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../../Api";
import { Case, Switch } from "react-if";
import { Spin } from "antd";
import Loading from "../../../Components/ui/Loading";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../assets/styles/Categories.css";
import CustomCarousel from "../../../Components/ui/CustomCarousel";
import Products from "./Products";
import NoData from "../../../Components/ui/NoData";

function Categories() {
  const [pagination, setPagination] = useState({ start: 1, end: 5 });
  const [categoryIndex, setCategoryIndex] = useState(
    Number(sessionStorage.getItem("categoryIndex")) || 0
  );

  const { data, fetchNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery({
      queryKey: ["categories"],
      queryFn: ({ pageParam = pagination }) =>
        API.get(
          `/user/categories?start=${pageParam.start}&end=${pageParam.end}`
        ),
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length * 5 < lastPage?.data?.count) {
          return {
            start: allPages.length * 5 + 1,
            end: (allPages.length + 1) * 5,
          };
        } else {
          return undefined;
        }
      },
      refetchOnMount: false,
    });

  const handleFetchNextPage = () => {
    const nextStart = pagination.start + 5;
    const nextEnd = pagination.end + 5;
    setPagination({ start: nextStart, end: nextEnd });
    fetchNextPage({ pageParam: { start: nextStart, end: nextEnd } });
  };

  const handleCategoryClick = (index) => {
    setCategoryIndex(index);
    sessionStorage.setItem("categoryIndex", index);
  };

  const allCategories =
    data?.pages.flatMap((item) => item?.data?.data || []) || [];
  const count = data?.pages[0]?.data?.count;

  useEffect(() => {
    if (!allCategories[Number(sessionStorage.getItem("categoryIndex"))]) {
      setCategoryIndex(0)
    }
  }, [allCategories])

  return (
    <div>
      <Switch>
        <Case condition={isLoading}>
          <Spin />
        </Case>
        <Case condition={isError}>
          <Loading queryString={"categories"} />
        </Case>
        <Case condition={allCategories?.length > 0}>
          <Container className="d-flex flex-column gap-2 align-items-center justify-content-between mb-5">
            <Row className="mb-5 pt-5 gap-3 align-items-center justify-content-center">
              {allCategories?.map((category, index) => (
                <Col
                  sm={12}
                  md={3}
                  lg={2}
                  key={index}
                  onClick={() => handleCategoryClick(index)}
                  className="category-card d-flex flex-column align-items-center justify-content-between text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  <div className="category-img rounded-pill d-flex align-items-center justify-content-center">
                    <img
                      src={category?.images[0]?.path}
                      alt={category.name}
                      className="rounded-pill"
                    />
                  </div>
                  <p className="p-0 m-0 text-secondary">{category?.name}</p>
                </Col>
              ))}
            </Row>
            <Button
              variant="outline-primary"
              onClick={handleFetchNextPage}
              disabled={isFetching}
              style={{
                display: allCategories?.length === count ? "none" : "",
              }}
            >
              {isFetching ? <Spin /> : "Load More Categories"}
            </Button>
          </Container>
          <CustomCarousel imgs={allCategories[categoryIndex]?.images} />
          <Products category={allCategories[categoryIndex]?.id} />
        </Case>
        <Case condition={allCategories?.length < 1}>
          <NoData />
        </Case>
      </Switch>
    </div>
  );
}

export default Categories;
