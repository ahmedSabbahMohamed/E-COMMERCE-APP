import "../assets/styles/Categories.css";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../Api";
import { Case, Switch } from "react-if";
import Loading from "../../../Components/ui/Loading";
import { Spin } from "antd";
import NoData from "../../../Components/ui/NoData";
import { useEffect, useState } from "react";
import CustomCarousel from "../../../Components/ui/CustomCarousel";
import { Button, Col, Container, Row } from "react-bootstrap";
import Products from "./Products";

function Categories() {
  const [pagination, setPagination] = useState({ start: 1, end: 5 });
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", pagination?.start, pagination?.end],
    queryFn: () =>
      API.get(
        `/user/categories?start=${pagination?.start}&end=${pagination?.end}`
      ),
  });

  useEffect(() => {
    if (categories?.data?.data) {
      setCurrentCategories((prev) => {
        return [...prev, ...categories.data.data];
      });
    }
  }, [categories]);

  const handleNext = () => {
    setPagination((prev) => ({
      start: prev.start + 5,
      end: prev.end + 5,
    }));
  };

  return (
    <div className="mb-5 mt-3">
      <Switch>
        <Case condition={isLoading}>
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <Spin />
          </div>
        </Case>

        <Case condition={isError}>
          <Loading queryString={["categories"]} />
        </Case>

        <Case condition={currentCategories.length > 0}>
          <Container className="d-flex flex-column gap-2 align-items-center justify-content-between mb-5">
            <Row className="mb-5 pt-5 gap-2 align-items-center justify-content-center">
              {currentCategories.map((category, index) => (
                <Col
                  sm={12}
                  md={4}
                  lg={2}
                  key={index}
                  onClick={() => setCurrentCategoryIndex(index)}
                  className="category-card d-flex flex-column align-items-center justify-content-between text-decoration-none"
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
              disabled={isLoading || categories?.data?.data?.length < 1}
              onClick={handleNext}
            >
              Load More Categories
            </Button>
          </Container>

          <div>
            <CustomCarousel
              imgs={currentCategories[currentCategoryIndex]?.images}
            />
          </div>
        </Case>

        <Case condition={currentCategories.length === 0}>
          <NoData />
        </Case>
      </Switch>
      <Products category={currentCategories[currentCategoryIndex]?.id} />
    </div>
  );
}

export default Categories;
