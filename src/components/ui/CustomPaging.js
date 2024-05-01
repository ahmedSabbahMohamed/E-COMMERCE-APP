import React, { useState } from "react";
import Slider from "react-slick";
import "../../assets/styles/CustomPaging.css";
import { FcNext, FcPrevious } from "react-icons/fc";

function CustomPaging({ imgs }) {
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
        <li className="d-none d-md-block" key={i} style={{ opacity: activeIndex === i ? 0.5 : 1 }}>
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
    <Slider {...settings} className="slider-container bg-danger">
      {imgs &&
        imgs.map((img, index) => (
          <div key={index} className="slide mb-4">
            <div
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
              }}
            ></div>
          </div>
        ))}
    </Slider>
  );
}

export default CustomPaging;
