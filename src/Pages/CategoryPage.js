import { useParams } from "react-router-dom";
import { API } from "../Api";
import { useQuery } from "@tanstack/react-query";
import CustomPaging from "../Components/ui/CustomPaging";
import { Case, Switch } from "react-if";
import { Spin } from "antd";
import Loading from "../Components/ui/Loading";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

function CategoryPage() {
  const { categoryId } = useParams();

  const {
    data: category,
    isLoading,
    isError,
  } = useQuery({
    queryFn: ["get_category"],
    queryFn: () => API.get(`/admin/category/${categoryId}`),
    enabled: !!categoryId,
  });

  const categoryImages = category?.data?.data?.images.map(
    (image) => image.path
  );

  return (
    <div className="pt-5 mt-3">
      <Header />
      <Switch>
        <Case condition={isLoading}>
          <Spin />
        </Case>
        <Case condition={isError}>
          <Loading queryString={"get_category"} />
        </Case>
        <Case condition={category?.data?.data}>
          <CustomPaging imgs={categoryImages} />
        </Case>
      </Switch>
      <Footer />
    </div>
  );
}

export default CategoryPage;
