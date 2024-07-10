import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("invalid email address")
    .required("email is required"),
  password: Yup.string().required("password is required"),
});
