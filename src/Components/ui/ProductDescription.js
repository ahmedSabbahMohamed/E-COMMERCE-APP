import { truncateDescription } from "../../Helpers";

export const ProductDescription = ({ description }) => (
  <p className="mb-1 text-black-50">
    {truncateDescription(description) || "Description"}
  </p>
);
