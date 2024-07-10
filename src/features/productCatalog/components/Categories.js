import { useState } from "react";
import "../assets/styles/Categories.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../Api";
import { Case, Switch } from "react-if";
import Loading from "../../../Components/ui/Loading";
import { Spin } from "antd";
import Pagination from "../../../Components/ui/Pagination";

function Categories() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: () => API.get(`/admin/categories?page=${currentPage}`),
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const pageCount = categories?.data?.data?.last_page;

  return (
    <div className="my-5 min-vh-100">
      <h2 className="h2 mb-4 text-center text-lg-start text-dark fw-bold">
        Categories
      </h2>
      <Switch>
        <Case condition={isLoading}>
          <div className="vh-100 d-flex justify-content-center align-itmes-center">
            <Spin />
          </div>
        </Case>
        <Case condition={isError}>
          <Loading queryString={["categories", currentPage]} />
        </Case>
        <Case condition={categories?.data?.data}>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex gap-4 align-items-center flex-wrap flex-row categories-container">
              {categories?.data?.data?.data.map((category) => {
                return (
                  <div
                    key={category.id}
                    className="position-relative shadow-lg overflow-hidden category"
                    style={{
                      backgroundImage: `url(${category.images[0]?.path})`,
                    }}
                  >
                    <Link
                      to={`/category/${category.id}`}
                      className="w-100 h-100 d-block"
                    ></Link>
                    <h3 className="h3 text-light fw-bold position-absolute top-0 mt-5 start-50 translate-middle">
                      {category.name}
                    </h3>
                  </div>
                );
              })}
            </div>
            <div>
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageCount={pageCount}
              />
            </div>
          </div>
        </Case>
      </Switch>
    </div>
  );
}

export default Categories;
