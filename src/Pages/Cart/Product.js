import CustomRating from "../../Components/ui/CustomRating";
import { truncateText } from "../../Helpers";

function Product({ data }) {
  return (
    <div className="d-flex flex-row align-items-start gap-2">
      <img
        style={{ width: "40%", height: "100px" }}
        className="rounded"
        src={data?.picture}
        alt="product"
      />
      <div style={{width: "60%"}}>
        <h6 className="fw-bold">{truncateText(data?.name, 30)}</h6>
        <p className="text-secondary fw-bold mb-0">
          {truncateText(data?.description, 40)}
        </p>
        <CustomRating value={data?.rating} />
      </div>
    </div>
  );
}

export default Product;
