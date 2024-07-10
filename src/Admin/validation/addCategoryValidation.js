import * as Yup from "yup";

export const validationSchema = Yup.object({
  category: Yup.string().required("category name is required"),
  picture: Yup.mixed().required("image is required"),
});
