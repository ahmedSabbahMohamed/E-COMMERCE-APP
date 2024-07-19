import { FcNext, FcPrevious } from "react-icons/fc";
import Slider from "react-slick";

function ImagesCarousel({
  children,
  settings = {
    infinite: true,
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  },
  nextArrow,
  prevArrow,
}) {
  const customSettings = {
    ...settings,
    nextArrow: nextArrow || <FcNext />,
    prevArrow: prevArrow || <FcPrevious />,
  };

  return <Slider {...customSettings}>{children}</Slider>;
}

export default ImagesCarousel;
