import { useQuery } from "@tanstack/react-query";
import { Case, Switch } from "react-if";
import ProductCard from "../../../Components/ui/ProductCard";
import Loading from "../../../Components/ui/Loading";
import { API } from "../../../Api";
import { truncateDescription } from "../../../Helpers";
import { Link } from "react-router-dom";

function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["prodcuts"],
    queryFn: () => API.get("/admin/products"),
  });

  const products = data?.data?.data;

  return (
    <div className="vh-100 my-5">
      <h2 className="h2 mb-4 text-center text-lg-start text-dark fw-bold">
        Products
      </h2>
      <Switch>
        <Case condition={isLoading}>
          <Loading queryString={"products"} />
        </Case>

        <Case condition={products}>
          <div className="d-flex flex-row flex-wrap gap-3">
            {/* {products?.map((product, index) => {
              return (
                <Link
                  to={`/product/${product?.id}`}
                  className="text-decoration-none"
                  key={index}
                >
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
            })} */}
          </div>
        </Case>
      </Switch>
    </div>
  );
}

export default Products;
