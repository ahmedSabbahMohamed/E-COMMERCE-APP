import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProductCard({
  img = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
  title = "Product Title",
  description = "This is a product description.",
}) {
  return (
    <Card style={{ width: "18rem", height: "24rem", overflow: "hidden" }}>
      <div style={{minHeight: "11rem", height: "11rem", backgroundImage: `url(${img})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>

      </div>
      <Card.Body className="position-relative">
        <Card.Title className="text-primary fw-bold" style={{ height: "3rem" }}>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {/* <Button
          className="position-absolute"
          style={{ bottom: "10px" }}
          variant="primary"
        >
          Go somewhere
        </Button> */}
      </Card.Body>
    </Card>
  );
}
export default ProductCard;
