import { Spin } from "antd";
import { Case, Switch } from "react-if";
import Loading from "../../Components/ui/Loading";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/ui/ProductCard";
import { Container } from "react-bootstrap";
import NoData from "../../Components/ui/NoData";
import { API } from "../../Api";
import { useQuery } from "@tanstack/react-query";

function FavouritesList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["favourites"],
    queryFn: () => API.get("/user/favourites"),
  });

  console.log(data?.data);

  return (
    <Switch>
      <Case condition={isLoading}>
        <div className="vh-100 d-flex justify-content-center align-itmes-center">
          <Spin />
        </div>
      </Case>

      <Case condition={isError}>
        <Loading queryString={["products"]} />
      </Case>

      <Case condition={data?.data}>
        <Container className="d-flex flex-column gap-5 align-items-center justify-conent-center">
          <div className="d-flex gap-3 flex-row flex-wrap align-items-center justify-content-center justify-content-md-start">
            {data?.data.map((product, index) => (
              <Link
                to={`/product/${product?.id}`}
                className="text-decoration-none"
                key={index}
              >
                <ProductCard details={product} />
              </Link>
            ))}
          </div>
        </Container>
      </Case>

      <Case condition={!data?.data}>
        <NoData />
      </Case>
    </Switch>
  );
}

export default FavouritesList;
