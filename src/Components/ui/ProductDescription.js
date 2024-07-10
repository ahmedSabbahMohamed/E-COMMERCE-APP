import { truncateDescription } from "../../actions/events";

export const ProductDescription = ({ description }) => (
  <p className="mb-1 text-black-50">
    {truncateDescription(description) || "Description"}
  </p>
);
