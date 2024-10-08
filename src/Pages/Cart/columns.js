import { Button } from "react-bootstrap";
import Product from "./Product";

export const cartCols = (
  handleQuantityChange,
  setProductId,
  deleteProductFromCart,
  isDeleting
) => [
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
    cell: (row) => {
      setProductId(row?.product_id);
      console.log(row?.quantity);
      return (
        <input
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="form-control form m-0 py-0 px-1 shadow-none w-75"
          type="number"
          min={1}
          defaultValue={row?.quantity}
        />
      );
    },
    center: true,
    maxWidth: "150px"
  },
  {
    name: <h5 className="text-dark fw-bold">Actions</h5>,
    cell: (row) => (
      <Button
        onClick={() => deleteProductFromCart(row?.id)}
        variant="outline-danger"
        size="sm"
        disabled={isDeleting}
      >
        Delete
      </Button>
    ),
    center: true,
  },
];
