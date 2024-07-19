import React from "react";
import "../assets/styles/Arrow.css";
import { Button } from "react-bootstrap";

const Arrow = () => {
  const handleClick = () => {
    const header = document.getElementsByTagName("header")[0];
    if (header && header.nextElementSibling) {
      header.nextElementSibling.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      variant=""
      onClick={handleClick}
      className="d-block arrow-container"
    >
      <div className="chevron"></div>
      <div className="chevron"></div>
      <div className="chevron"></div>
    </Button>
  );
};

export default Arrow;
