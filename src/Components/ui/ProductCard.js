import { Link } from "react-router-dom";
import { getSrc, truncateText } from "../../Helpers";
import { FaRegHeart } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import "../../Assets/styles/ProductCard.css";
import CustomRating from "./CustomRating";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProductCard({ details, edit = false }) {

  const {isLoging } = useSelector((state) => state.userSlice);

  const handleAddToFavourite = () => {
    if (isLoging) {
      toast.success("added to favourites");
    } else {
      toast.error("Please login to add to favourites");
    }
  }

  return (
    <div className="d-flex flex-column gap-3" style={{ width: "16rem" }}>
      <div
        className="card-img rounded overflow-hidden position-relative shadow-lg"
        style={{ height: "15rem" }}
      >
        <img
          className="img w-100 h-100"
          style={{ objectFit: "cover" }}
          src={getSrc(details?.picture)}
          alt={details?.id}
        />
        <div className="position-absolute top-0 end-0 w-100 h-100 d-none flex-column justify-content-start align-items-end p-2 gap-2 card-icons">
          <button
          onClick={handleAddToFavourite}
            className="btn btn-outline-danger shadow rounded-pill d-flex align-items-center justify-content-center p-0 m-0"
            style={{ width: "30px", height: "30px" }}
          >
            <FaRegHeart size={"15px"} />
          </button>
          <Link
            to={`product/${details?.id}`}
            className="btn btn-outline-primary shadow rounded-pill d-flex align-items-center justify-content-center p-0"
            style={{ width: "30px", height: "30px" }}
          >
            <IoEyeOutline color="" />
          </Link>
        </div>
      </div>

      <div className="px-2 d-flex flex-row align-items-center justify-content-between">
        <div>
          <Link
            to={`product/${details?.id}`}
            className="text-primary text-decoration-none fw-bold"
          >
            {truncateText(details?.name, 15)}
          </Link>
          <h6 className="text-muted fw-bold small fst-italic mb-0 mt-1">
            $ {truncateText(details?.price?.toString(), 5)}
          </h6>
        </div>
        <CustomRating value={details?.Rating} edit={edit} />
      </div>
    </div>
  );
}
export default ProductCard;
