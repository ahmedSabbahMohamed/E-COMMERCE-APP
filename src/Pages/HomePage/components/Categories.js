import "../assets/styles/Categories.css";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../Api";
import { Case, Switch } from "react-if";
import Loading from "../../../Components/ui/Loading";
import { Spin } from "antd";
import { FcNext, FcPrevious } from "react-icons/fc";
import NoData from "../../../Components/ui/NoData";
import { useState } from "react";
import CustomCarousel from "../../../Components/ui/CustomCarousel";
import Products from "./Products";
import { Button } from "react-bootstrap";

function Categories() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(0);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: () => API.get(`/admin/categories?page=${currentPage}`),
  });

  const lastPage = categories?.data?.data?.last_page;

  const handleNextPage = () => {
    if (lastPage > currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="mb-5 mt-3">
      <Switch>
        <Case condition={isLoading}>
          <div className="vh-100 d-flex justify-content-center align-itmes-center">
            <Spin />
          </div>
        </Case>

        <Case condition={isError}>
          <Loading queryString={["categories"]} />
        </Case>

        <Case condition={categories?.data?.data?.data.length > 0}>
          <div className="container d-flex align-items-center justify-content-between">
            <Button variant="ouline-primary" onClick={handlePreviousPage}>
              <FcPrevious size={"25px"} />
            </Button>

            <div className="mb-5 pt-5 d-flex align-items-center justify-content-center gap-4 flex-row flex-wrap">
              {categories?.data?.data?.data.map((category, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentCategory(index)}
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
                </div>
              ))}
            </div>

            <Button variant="ouline-primary" onClick={handleNextPage}>
              <FcNext size={"25px"} />
            </Button>
          </div>

          <CustomCarousel
            imgs={categories?.data?.data?.data[currentCategory]?.images}
          />

          <Products
            products={categories?.data?.data?.data[currentCategory]?.products}
          />
        </Case>

        <Case condition={categories?.data?.data?.data.length < 1}>
          <NoData />
        </Case>
      </Switch>
    </div>
  );
}

export default Categories;
