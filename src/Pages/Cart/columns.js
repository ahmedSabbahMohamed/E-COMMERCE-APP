import { Button } from "react-bootstrap";
import Product from "./Product";
import { API } from "../../Api";
import { toast } from "react-toastify";
import React, { useState } from "react";

// API Functions
const deleteProductFromCart = async (productId) => {
  try {
    await API.delete("/user/cart", { data: { product_id: productId } });
    toast.success("Product deleted from cart successfully");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to delete product from cart. Please try again."
    );
  }
};

const updateProductQuantity = async ({ productId, quantity }) => {
  try {
    await API.post("/user/edit-cart", {
      product_id: productId,
      quantity: quantity,
    });
    toast.success("Product quantity updated successfully");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to update the quantity"
    );
  }
};

// Quantity Management Component
const QuantityManager = ({ productId, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const decreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await updateProductQuantity({ productId, quantity: newQuantity });
    }
  };

  const increaseQuantity = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await updateProductQuantity({ productId, quantity: newQuantity });
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <button onClick={decreaseQuantity} className="btn fs-4">
        -
      </button>
      <span className="fw-bold fs-5">{quantity}</span>
      <button onClick={increaseQuantity} className="btn fs-4">
        +
      </button>
    </div>
  );
};

// Cart Columns Configuration
export const cartCols = [
  {
    name: <h5 className="text-dark fw-bold">Product</h5>,
    cell: (row) => <Product data={row?.products} />,
    minWidth: "300px",
    center: true,
  },
  {
    name: <h5 className="text-dark fw-bold">Price</h5>,
    cell: (row) => <h6 className="fw-bold">$ {row?.products?.price}</h6>,
    center: true,
  },
  {
    name: <h5 className="text-dark fw-bold">Quantity</h5>,
    cell: (row) => (
      <QuantityManager
        productId={row?.products?.id}
        initialQuantity={row?.quantity}
      />
    ),
    center: true,
  },
  {
    name: <h5 className="text-dark fw-bold">Actions</h5>,
    cell: (row) => (
      <Button
        onClick={() => deleteProductFromCart(row?.products?.id)}
        variant="outline-danger"
      >
        Delete
      </Button>
    ),
    center: true,
  },
];
