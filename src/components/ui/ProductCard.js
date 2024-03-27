import { Button, Card } from "react-bootstrap";

function ProductCard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.text}
        </Card.Text>
        <Button variant="primary">Show Product</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard