import Rating from "react-rating-stars-component"
function CustomRating({edit = false, value = 0}) {
  return (
    <div className="d-flex gap-1">
      <Rating
        isHalf={true}
        value={Math.ceil(value * 2) / 2}
        activeColor="#ffd700"
        edit={edit}
      />
      <p className="text-warning">({value})</p>
    </div>
  );
}

export default CustomRating