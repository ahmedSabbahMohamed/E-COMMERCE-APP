import "../assets/styles/Categories.css"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {API} from "../../../api";
import { Case, Switch } from "react-if"
import Loading from "../../../components/ui/Loading";

function Categories() {

    const { data, isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: () => API.get("/admin/categories"),
    });

  return (
    <div className="my-5">
      <h2 className="h2 mb-4 text-center text-lg-start text-dark fw-bold">
        Categories
      </h2>
      <Switch>
        <Case condition={isLoading}>
          <div className="vh-100 d-flex justify-content-center align-itmes-center">
            <Loading queryString={"categories"} />
          </div>
        </Case>
        <Case condition={data?.data?.data}>
          <div className="d-flex gap-4 align-items-center flex-wrap flex-row categories-container">
            {data?.data?.data.map((category) => {
              return (
                <div
                  key={category.id}
                  className="position-relative shadow-lg overflow-hidden category"
                  style={{ backgroundImage: `url(${category.picture})` }}
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
        </Case>
      </Switch>
    </div>
  );
}

export default Categories