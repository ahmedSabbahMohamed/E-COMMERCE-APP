import Slider from "react-slick"
import { FcNext, FcPrevious } from "react-icons/fc";

function ProductCarousel({ children }) {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <FcNext />,
    prevArrow: <FcPrevious />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings} className="">
        {children}
      </Slider>
    </div>
  );
};
export default ProductCarousel;
