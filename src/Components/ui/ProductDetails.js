import Button from "react-bootstrap/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../Api";
import { convertToFormData } from "../../Helpers";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductDetails({ product }) {
  const { id, name, description, price } = product;
  const { isLogin } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formData = convertToFormData({ product_id: id, quantity: 1 });

  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: () => API.post(`/user/cart`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries("user-cart");
      toast.success("added product successfully to cart");
    },
    onError: (error) => toast.error(error?.toString()),
  });

  const handleAddToCart = () => {
    if (isLogin) {
      return mutate();
    } else {
      toast.warning("Please login to add product to cart");
      navigate("/login")
    }
  };

  return (
    <div className="text-center text-md-start">
      <h1 className="text-dark my-3 fw-bold">{name}</h1>
      <p className="text-black-50 fs-6">{description}</p>
      <h5 className="text-secondary fw-bold my-3">
        <span className="text-success me-2">Price:</span> ${price}
      </h5>

      <div className="d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-sm-row gap-3">
        <Button disabled={isLoading} onClick={handleAddToCart} variant="outline-primary" size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
