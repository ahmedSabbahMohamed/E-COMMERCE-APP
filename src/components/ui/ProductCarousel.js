import Slider from "react-slick"
import { FcNext, FcPrevious } from "react-icons/fc";

function ProductCarousel({ children }) {
  const settings = {
    infinite: true,
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <FcNext />,
    prevArrow: <FcPrevious />,
  };

  return (
      <Slider {...settings}>
        {children}
      </Slider>
  );
};
export default ProductCarousel;
