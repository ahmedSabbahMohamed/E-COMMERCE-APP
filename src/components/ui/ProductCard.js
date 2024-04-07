import React from "react";
import { Card } from "antd";
const { Meta } = Card;
function ProductCard({
  img = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
  title = "Product Title",
  description = "This is a product description.",
}) {
  return (
    <Card
      style={{
        width: 240,
      }}
      cover={<img alt="product" src={img} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
export default ProductCard;
