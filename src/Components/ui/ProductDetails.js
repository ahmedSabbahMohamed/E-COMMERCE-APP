import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function ProductDetails({ product, onAddToCart }) {
  const { category, name, description, price } = product;
  const [quantity, setQuantity] = useState(1);

  const spanStyles = "p-2 d-inline-block text-white fw-bold fs-6";

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="text-center text-md-start">

      <h1 className="text-dark my-3">{name}</h1>
      <p className="text-black-50 fs-6">{description}</p>
      <h5 className="text-black fw-bold my-3">${price}</h5>

      <div className="d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-sm-row gap-3">

        <div className="d-flex gap-3 bg-success rounded px-2 py-1">

          <Button
            variant=""
            className="text-white fw-bold"
            onClick={handleDecrement}
          >
            -
          </Button>

          <span className={spanStyles}>{quantity}</span>

          <Button
            variant=""
            className="text-white fw-bold"
            onClick={handleIncrement}
          >
            +
          </Button>

        </div>

        <Button
          variant="primary"
          size="lg"
          className=""
          onClick={() => onAddToCart(product, quantity)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
