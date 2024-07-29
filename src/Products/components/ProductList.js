import { Case, Default, Switch } from "react-if";
import ProductCard from "../../Components/ui/ProductCard";
import NoData from "../../Components/ui/NoData";
import { Link } from "react-router-dom";

function ProductList({ filterData, products }) {

  return (
    <div>
      <Switch>
        <Default>
          <div className="d-flex gap-3 flex-row flex-wrap align-items-center justify-content-center justify-content-md-start">
            {products?.map((product, index) => (
              <Link
                to={`/product/${product?.id}`}
                className="text-decoration-none"
                key={index}
              >
                <ProductCard details={product} />
              </Link>
            ))}
          </div>
        </Default>

        <Case condition={products?.length < 1}>
          <NoData />
        </Case>
      </Switch>
    </div>
  );
}

export default ProductList;
