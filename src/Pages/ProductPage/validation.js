import * as Yup from "yup";

export const validationSchema = Yup.object({
  comment: Yup.string()
    .min(5, "Too short comment")
    .required("You didn't wrote any comment"),
});
