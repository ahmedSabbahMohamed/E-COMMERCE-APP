import * as Yup from "yup";

export const validationSchema = Yup.object({
  picture: Yup.mixed().required("Profile Image required"),
  name: Yup.string()
    .required("name is required")
    .min(2, "name is so short")
    .max(30, "name is too long"),
  email: Yup.string()
    .required("email is required")
    .email("invalid email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      "wront format"
    ),
  password: Yup.string().required("password is required"),
  // .matches(
  //   /^(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  //   "weak password"
  // )
});
