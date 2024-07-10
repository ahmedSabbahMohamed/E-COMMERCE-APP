import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API } from "../../../Api";

function CategoryProducts() {
  const { categoryProducts } = useParams();

  const { data } = useQuery({
    queryKey: ["categoryProducts"],
    queryFn: () => API.get(`/admin/category/${categoryProducts}`),
  });

  console.log(data?.data?.data);

  return <div className="container min-vh-100">{categoryProducts}</div>;
}

export default CategoryProducts;
