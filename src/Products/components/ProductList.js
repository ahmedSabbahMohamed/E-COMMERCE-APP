import { Case, Switch } from "react-if";
import ProductCard from "../../Components/ui/ProductCard";
import NoData from "../../Components/ui/NoData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../../Api";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Loading from "../../Components/ui/Loading";
import { Button, Container } from "react-bootstrap";

function ProductList({ filterData, category }) {
  const [pagination, setPagination] = useState({ start: 1, end: 8 });
  const [currentProducts, setCurrentProducts] = useState([]);
  const [prevCategory, setPrevCategory] = useState(category);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", pagination?.start, pagination?.end, category],
    queryFn: () =>
      API.get(
        `/user/products?start=${pagination?.start}&end=${pagination?.end}&category=${category}`
      ),
    enabled: !!category,
  });

  useEffect(() => {
    if (prevCategory !== category) {
      setCurrentProducts([]);
      setPrevCategory(category);
    }

    if (products?.data?.data) {
      setCurrentProducts((prev) => {
        const newProducts = products?.data?.data;
        const existingProducts = prev || [];
        const mergedProducts = [...existingProducts];
        newProducts.forEach((newProduct) => {
          if (!mergedProducts.find((product) => product.id === newProduct.id)) {
            mergedProducts.push(newProduct);
          }
        });
        return mergedProducts;
      });
    }
  }, [products, category, prevCategory]);

  const handleNext = () => {
    setPagination((prev) => ({
      start: prev.start + 8,
      end: prev.end + 8,
    }));
  };

  return (
    <div>
      <Switch>
        <Case condition={isLoading && currentProducts.length < 1}>
          <div className="vh-100 d-flex justify-content-center align-itmes-center">
            <Spin />
          </div>
        </Case>

        <Case condition={isError}>
          <Loading queryString={["products"]} />
        </Case>

        <Case condition={currentProducts.length > 0}>
          <Container className="d-flex flex-column gap-5 align-items-center justify-conent-center">
            <div className="d-flex gap-3 flex-row flex-wrap align-items-center justify-content-center justify-content-md-start">
              {currentProducts?.map((product, index) => (
                <Link
                  to={`/product/${product?.id}`}
                  className="text-decoration-none"
                  key={index}
                >
                  <ProductCard details={product} />
                </Link>
              ))}
            </div>
            <div>
              <Button
                variant="outline-primary"
                disabled={isLoading || products?.data?.data?.length < 1}
                style={{
                  display:
                    currentProducts.length === products?.data?.count
                      ? "none"
                      : "",
                }}
                onClick={handleNext}
              >
                {isLoading ? <Spin /> : "Load More Products"}
              </Button>
            </div>
          </Container>
        </Case>

        <Case condition={currentProducts.length < 1}>
          <NoData />
        </Case>
      </Switch>
    </div>
  );
}

export default ProductList;
