import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import { API } from "../../Api";
import Product from "./Product";
import CustomDataTable from "../../Components/ui/CustomDataTable";
import { cartCols } from "./columns";
import { customStyles } from "./customStyles";

function Page() {
    const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => API.get("/user/cart"),
  });

  // const { isLoading, mutate } = useMutation({
  //   mutationFn: (id) => API.delete(`/user/cart/${id}`,),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("produclskd");
  //   },
  // });

  // const handleDeleteProduct = (id) => {
  //   mutate(id);
  // }

  return (
    <Container>
      {/* {data?.data?.cart.map((product) => (
        <div key={product?.id}>
          <h3>{product?.products?.name}</h3>
          <Product data={product?.products} />
          <h6 className="fw-bold">
            $ {product?.products?.price}
          </h6>
          <div className="d-flex gap-1 align-items-center">
            <button className="btn">-</button>
            <span className="fw-bold">{product?.quantity}</span>
            <button className="btn">+</button>
          </div>
          <h5>total: {product?.quantity * product?.product_id?.price}</h5>
          <button
            onClick={() => handleDeleteProduct(product?.product_id)}
            className="btn btn-danger"
            disabled={isLoading}
          >
            delete
          </button>
        </div>
      ))} */}
      <CustomDataTable
        title={"Cart"}
        subHeader={false}
        isPagination={false}
        columns={cartCols}
        data={data?.data?.cart}
        customStyles={customStyles}
      />
    </Container>
  );
}

export default Page;
