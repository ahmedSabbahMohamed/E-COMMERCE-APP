import Button from "react-bootstrap/Button";

function ProductDetails({ product }) {
  const { name, description, price } = product;

  return (
    <div className="text-center text-md-start">
      <h1 className="text-dark my-3 fw-bold">{name}</h1>
      <p className="text-black-50 fs-6">{description}</p>
      <h5 className="text-secondary fw-bold my-3">
        <span className="text-success me-2">Price:</span> ${price}
      </h5>

      <div className="d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-sm-row gap-3">
        <Button variant="outline-primary" size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
