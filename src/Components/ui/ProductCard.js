import Card from "react-bootstrap/Card";
import { getSrc, truncateDescription } from "../../Helpers";

function ProductCard({ details }) {

  return (
    <Card style={{ width: "18rem", height: "24rem", overflow: "hidden" }}>
      <div
        style={{
          minHeight: "11rem",
          height: "11rem",
          backgroundImage: `url(${getSrc(details?.picture)})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Card.Body className="position-relative">
        <Card.Title className="text-primary fw-bold" style={{ height: "3rem" }}>
          {details?.name || "Product name"}
        </Card.Title>
        <Card.Text>
          <p>{truncateDescription(details?.description) || "description"}</p>
          <p>${details?.price || "price"}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default ProductCard;
