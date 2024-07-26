import { getRandomBootstrapColor, getSrc, truncateText } from "../../Helpers";
import Rating from "react-rating-stars-component";

function ProductCard({ details, edit = false }) {
  const randomBackgroundColor = getRandomBootstrapColor(details?.id);

  return (
    <div
      className="p-2 shadow position-relative overflow-hidden"
      style={{ width: "18rem", height: "27rem" }}
    >
      <div
        className={`position-absolute rounded-pill ${randomBackgroundColor}`}
        style={{
          width: "35rem",
          height: "35rem",
          top: "-20rem",
          right: "-4rem",
          zIndex: "-1",
        }}
      ></div>
      <img
        src={getSrc(details?.picture)}
        alt={details?.name || "Product Image"}
        className="rounded-pill shadow position-relative top-50 start-50 translate-middle"
        style={{ width: "12rem", height: "12rem" }}
      />
      <span
        className="position-absolute p-1 bg-white text-secondary fw-bold rounded-pill d-flex align-items-center justify-content-center"
        style={{ right: ".5rem", top: "1rem" }}
      >
        ${details?.price || "price"}
      </span>
      <h2
        className="position-absolute text-white fw-bold"
        style={{
          top: "1rem",
          left: "1rem",
          fontSize: "1.4rem",
          maxWidth: "70%",
        }}
      >
        {truncateText(details?.name || "Product Title", 40)}
      </h2>
      <p
        className="position-absolute text-center text-secondary"
        style={{
          top: "20rem",
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: "95%",
          wordWrap: "break-word",
        }}
      >
        {truncateText(details?.description) || "description"}
      </p>
      <div
        className="d-flex align-items-center gap-2 position-absolute"
        style={{ bottom: ".3rem", left: "50%", transform: "translateX(-50%)" }}
      >
        <Rating
          count={5}
          value={Math.round(details?.rating * 2) / 2 || 0}
          edit={edit}
          size={25}
          activeColor="#ffd700"
          isHalf={true}
        />
        <span className="text-success">({details?.rating || 0})</span>
      </div>
    </div>
  );
}
export default ProductCard;
