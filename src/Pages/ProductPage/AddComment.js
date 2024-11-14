import { Form, Formik } from "formik";
import SubmitBtn from "../../Components/form/SubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../Api";
import { toast } from "react-toastify";
import { convertToFormData } from "../../Helpers";
import { validationSchema } from "./validation";
import TextArea from "../../Components/form/TextArea";
import CustomRating from "../../Components/ui/CustomRating";
import { useState } from "react";

function AddComment() {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: (comment) => API.post("/user/comment", comment),
    onSuccess: () => {
      toast.success("Comment posted successfully");
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message || "Failed to post your comment"
      ),
  });

  const handlePostComment = (values) => {
    const formValues = convertToFormData({ ...values, rating });
    mutate(formValues);
    queryClient.invalidateQueries("comments");
  };

  return (
    <>
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={() => false}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formikProps) => (
          <Form className="w-100">
            <CustomRating
              edit={true}
              onRatingChange={(value) => setRating(value)}
            />

            <TextArea name={"comment"} label={"Add comment"} />
            <SubmitBtn
              onClick={() => handlePostComment(formikProps.values)}
              disabled={isPending}
              btnTxt={"Post Comment"}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddComment;
