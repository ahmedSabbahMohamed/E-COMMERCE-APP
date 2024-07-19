import ImagesCarousel from "../../../Components/ui/ImagesCarousel";
import { getSrc } from "../../../Helpers";

function ProductImageCarousel({ images }) {
  return (
    <ImagesCarousel>
      {images?.map((img, index) => (
        <div key={index} style={{ width: "8rem", height: "8rem" }}>
          <img
            src={getSrc(img)}
            style={{ width: "100%", height: "12rem" }}
            alt={`Product Image ${index + 1}`}
          />
        </div>
      ))}
    </ImagesCarousel>
  );
}

export default ProductImageCarousel;
