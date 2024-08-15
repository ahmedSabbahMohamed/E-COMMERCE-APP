import { useState } from "react";
import Rating from "react-rating-stars-component";
function CustomRating({ edit = false, value = 0 }) {
  const [ratingValue, setRatingValue] = useState(value);

  const handleRatingChange = (newRating) => {
    setRatingValue(newRating);
  };

  return (
    <div className="d-flex gap-1">
      <Rating
        isHalf={true}
        value={Math.ceil(value * 2) / 2}
        activeColor="#ffd700"
        edit={edit}
        onChange={edit ? handleRatingChange : null}
      />
      <p className="text-warning">({ratingValue})</p>
    </div>
  );
}

export default CustomRating;
