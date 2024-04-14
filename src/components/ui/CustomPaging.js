import React, { useState } from "react";
import Slider from "react-slick";
import one from "../../assets/images/cu.jpeg";
import two from "../../assets/images/customPaging1.jpeg";
import three from "../../assets/images/customPaging2.jpeg";
import four from "../../assets/images/customPaging3.jpeg";
import "../../assets/styles/CustomPaging.css";
import { FcNext, FcPrevious } from "react-icons/fc";

function CustomPaging() {
  const imgs = [one, two, three, four];
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="">
        <ul className="list-unstyled d-flex align-items-center justify-content-center gap-5">
          {dots}
        </ul>
      </div>
    ),
    customPaging: function (i) {
      return (
        <li key={i} style={{ opacity: activeIndex === i ? 0.5 : 1 }}>
          <img
            className="rounded"
            src={imgs[i]}
            style={{ width: "60px", height: "60px" }}
            alt={`slide-${i}`}
          />
        </li>
      );
    },
    nextArrow: <FcNext className="slick-next" />,
    prevArrow: <FcPrevious className="slick-prev" />,
    beforeChange: (oldIndex, newIndex) => {
      setActiveIndex(newIndex);
    },
  };

  return (
    <Slider {...settings} className="mx-5 slider-container">
      {imgs.map((img, index) => (
        <div key={index} className="slide">
          <img src={img} alt={`slide-${index}`} />
        </div>
      ))}
    </Slider>
  );
}

export default CustomPaging;
