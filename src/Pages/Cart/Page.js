import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import { API } from "../../Api";
import CustomDataTable from "../../Components/ui/CustomDataTable";
import { cartCols } from "./columns";
import { customStyles } from "./customStyles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import { useDispatch } from "react-redux";
import { removeProduct } from "./store/cartSlice";

function Page() {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(undefined);
  const [debouncedQuantity, setDebouncedQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: () => API.get("/user/cart"),
    refetchOnMount: true,
  });

  const { mutate: updateQuantity } = useMutation({
    mutationFn: (data) => API.post("/user/edit-cart", data),
  });

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: async (productId) => {
      await API.delete(`/user/cart/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      dispatch(removeProduct())
      toast.success("Product deleted from cart successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete product from cart. Please try again."
      );
    },
  });

  useEffect(() => {
    if (productId !== undefined) {
      const handler = setTimeout(() => {
        setDebouncedQuantity(quantity);
        updateQuantity({ product_id: productId, quantity: quantity });
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [quantity]);

  return (
    <>
      <Header />
      <Container>
        <h3 className="fw-bold">Cart</h3>
        <CustomDataTable
          subHeader={false}
          isPagination={false}
          columns={cartCols(
            setQuantity,
            setProductId,
            deleteProduct,
            isPending
          )}
          data={data?.data?.cart}
          customStyles={customStyles}
          progressComponent={<Spin />}
          progressPending={isLoading}
          isError={isError}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Page;
