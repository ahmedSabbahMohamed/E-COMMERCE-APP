import * as Yup from "yup";

export const addProductSchema = Yup.object({
  product_title: Yup.string().required("product title is required"),
  product_desc: Yup.string()
    .min(20, "product description is too short")
    .required("product description is required"),
  product_price: Yup.number("price must be a number").required("product price is required"),
  prodcut_img_one: Yup.mixed().required("please select an image"),
  prodcut_img_two: Yup.mixed().required("please select an image"),
  prodcut_img_three: Yup.mixed().required("please select an image"),
});

export const addCategorySchema = Yup.object({
  category: Yup.string().required("category name is required"),
  picture: Yup.mixed().required("image is required")
});