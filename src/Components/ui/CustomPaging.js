import React, { useState } from "react";
import Slider from "react-slick";
import "../../Assets/styles/CustomPaging.css";
import { FcNext, FcPrevious } from "react-icons/fc";

function CustomPaging({ imgs }) {
  
  const settings = {
    customPaging: function (i) {
      return (
        <div
          className="custom-paging rounded"
          style={{ backgroundImage: `url(${imgs[i]})` }}
        ></div>
      );
    },
    dots: true,
    dotsClass:
      "slick-dots slick-thumb d-flex align-items-center justify-content-center gap-2",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <FcNext className="slick-next" />,
    prevArrow: <FcPrevious className="slick-prev" />,
  };

  return (
    <Slider {...settings} className="slider-container">
      {imgs &&
        imgs.map((img, index) => (
          <div key={index} className="slide mb-5">
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
