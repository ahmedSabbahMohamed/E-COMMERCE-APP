import { Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import Input from "../Components/form/Input";
import { API } from "../Api";
import { Case, Switch } from "react-if";
import { Spin } from "antd";
import Loading from "../Components/ui/Loading";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Pagination from "../Components/ui/Pagination";
import { Link } from "react-router-dom";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

function Categories() {
  const [currentPage, setCurrentPage] = useState("1");
  const [search, setSearch] = useState("");
  const [debouncedFilterData, setDebouncedFilterData] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterData(search);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", currentPage, debouncedFilterData],
    queryFn: () =>
      API.get(`/admin/categories`, {
        params: {
          page: currentPage,
          ...(debouncedFilterData && {
            "filter[name]": debouncedFilterData,
          }),
        },
      }),
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const pageCount = categories?.data?.data?.last_page;

  return (
    <div>
    <Header />    
    <Container>
      <div className="d-flex flex-row flex-wrap mt-5 align-itmes-center justify-content-between">
        <h2 className="heading text-center text-lg-start fw-bold text-primary">
          Categories
        </h2>

        <Formik initialValues={{ name: "" }}>
          {(formikProps) => {
            setSearch(formikProps?.values?.name);
            return (
              <Form>
                <Input name={"name"} placeholder={"Search By Category Name"} />
              </Form>
            );
          }}
        </Formik>
      </div>

      <Switch>
        <Case condition={isLoading}>
          <Spin className="min-vh-100" />
        </Case>

        <Case condition={isError}>
          <Loading />
        </Case>

        <Case condition={categories?.data?.data?.data}>
          <div className="d-flex gap-4 flex-row flex-wrap mt-5 align-itmes-center justify-content">
            {categories?.data?.data?.data.map((category, index) => (
              <Link
                to={`/category/${category?.id}`}
                key={index}
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
              </Link>
            ))}
          </div>
        </Case>
      </Switch>
          <div className="d-flex justify-content-end">
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageCount={pageCount}
            />
          </div>
    </Container>
    <Footer />
    </div>
  );
}

export default Categories;
