import * as Yup from "yup";

export const validationSchema = Yup.object({
  product_title: Yup.string().required("product title is required"),
  product_desc: Yup.string()
    .min(20, "product description is too short")
    .required("product description is required"),
  product_price: Yup.number("price must be a number").required(
    "product price is required"
  ),
  picture: Yup.array().required("picture field is required").max(1, "max is 1"),
  images: Yup.array().required("Images field is required").max(1, "max is 4"),
});