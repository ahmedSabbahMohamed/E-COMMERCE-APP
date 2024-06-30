import { useQuery } from "@tanstack/react-query";
import { Case, Switch } from "react-if";
import ProductCard from "../../../components/ui/ProductCard";
import Loading from "../../../components/ui/Loading";
import { API } from "../../../api";
import { truncateDescription } from "../../../actions/events";
import { Link } from "react-router-dom";

function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["prodcuts"],
    queryFn: () => API.get("/admin/products"),
  });

  const products = data?.data?.data;

  return (
    <div>
      <h2 className="fw-bold">Products</h2>
      <Switch>
        <Case condition={isLoading}>
          <Loading queryString={"products"} />
        </Case>
        <Case condition={products}>
          <div className="d-flex flex-row flex-wrap gap-3">
            {products?.map((product, index) => {
              return (
                <Link to={`/product/${product?.id}`}  className="text-decoration-none" key={index}>
                  <ProductCard
                    img={product.picture}
                    title={product.name}
                      description={
                        <>
                        <p className="fw-bold">Price: {product.price}</p>
                        <p>{truncateDescription(product.description)}</p>
                        </>
                      }
                  />
                </Link>
              );
            })}
          </div>
        </Case>
      </Switch>
    </div>
  );
}

export default Products;
