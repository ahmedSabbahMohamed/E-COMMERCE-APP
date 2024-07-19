import Card from "react-bootstrap/Card";
import { getSrc, truncateDescription } from "../../Helpers";

function ProductCard({ details }) {
  return (
    <Card style={{ width: "18rem", height: "24rem", overflow: "hidden" }}>
      <div style={{ height: "11rem", height: "11rem" }}>
        <img
          style={{ width: "100%", height: "11rem"}}
          src={getSrc(details?.picture)}
          alt={details?.name || "Product Image"}
        />
      </div>
      <Card.Body className="position-relative">
        <Card.Title className="text-primary fw-bold" style={{ height: "3rem" }}>
          {details?.name || "Product name"}
        </Card.Title>
        <Card.Text>
          <p>{truncateDescription(details?.description) || "description"}</p>
          <p className="text-success fw-bold"><span className="fw-bold text-dark">Price: </span>${details?.price || "price"}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default ProductCard;
