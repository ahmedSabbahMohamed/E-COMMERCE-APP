import React from "react";
import "../assets/styles/Arrow.css";

const Arrow = () => {
  const handleClick = () => {
    const header = document.getElementsByTagName("header")[0];
    if (header && header.nextElementSibling) {
      header.nextElementSibling.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div onClick={handleClick} className="arrow-down">
      <div className="arrow-part left"></div>
      <div className="arrow-part right"></div>
    </div>
  );
};

export default Arrow;
