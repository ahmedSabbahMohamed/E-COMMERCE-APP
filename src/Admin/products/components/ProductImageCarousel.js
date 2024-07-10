import ImagesCarousel from "../../../Components/ui/ImagesCarousel";
import { getSrc } from "../../../Helpers";

function ProductImageCarousel({ images }) {
  return (
      <ImagesCarousel>
        {images?.map((img, index) => (
          <div key={index}>
            <img
              src={getSrc(img)}
              className="w-100 h-100"
              alt={`Product Image ${index + 1}`}
            />
          </div>
        ))}
      </ImagesCarousel>
  );
}

export default ProductImageCarousel;
