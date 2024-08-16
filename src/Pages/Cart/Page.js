import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import { API } from "../../Api";
import CustomDataTable from "../../Components/ui/CustomDataTable";
import { cartCols } from "./columns";
import { customStyles } from "./customStyles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Page() {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(undefined);
  const [debouncedQuantity, setDebouncedQuantity] = useState(quantity);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => API.get("/user/cart"),
  });

  const { mutate: updateQuantity } = useMutation({
    mutationFn: (data) => API.post("/user/edit-cart", data),
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (productId) => {
      await API.delete(`/user/cart/${productId}`);
    },
    onSuccess: () => {
      toast.success("Product deleted from cart successfully");
      queryClient.invalidateQueries(["cart"]);
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
    <Container>
      <CustomDataTable
        title={"Cart"}
        subHeader={false}
        isPagination={false}
        columns={cartCols(setQuantity, setProductId, deleteProduct)}
        data={data?.data?.cart}
        customStyles={customStyles}
      />
    </Container>
  );
}

export default Page;
