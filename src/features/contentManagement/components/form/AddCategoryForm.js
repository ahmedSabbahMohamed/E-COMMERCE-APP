import { Form, Formik } from "formik";
import Input from "../../../../components/form/Input";
import SubmitBtn from "../../../../components/form/SubmitBtn";
import { validationSchema } from "../../../../actions/validationSchema";
import ImageHandler from "../../../../components/form/ImageHandler";
import { API } from "../../../../Api";
import { Case, Default, Switch } from "react-if";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { closeModal, convertToFormData } from "../../../Helpers";
import Loading from "../../../Components/ui/Loading";
import { toast } from "react-toastify";

function AddCategoryForm({
  edit = false,
  id = undefined,
  // setShowModal = false,
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: ["get_category"],
    queryFn: () => API.get(`/admin/category/${id}`),
    enabled: edit && id,
  });

  // const handleSubmit = (formikProps) => {
  //   setIsSubmit(true);
  //   const data = convertToFormData(formikProps?.values);
  //   if (id && edit) {
  //     API.put(`/admin/category/${id}`, data)
  //       .then((res) => {
  //         swal("Category Updated Successfully");
  //         formikProps.setValues({});
  //         queryClient.invalidateQueries("categories");
  //         setShowModal(false);
  //       })
  //       .catch((err) =>
  //         swal(err?.response?.data?.message || "Category Not Updated")
  //       );
  //   } else {
  //     API.post("/admin/category", data)
  //       .then(() => {
  //         swal("Category Added Successfully");
  //         formikProps.setValues({});
  //         queryClient.invalidateQueries("categories");
  //         setShowModal(false);
  //       })
  //       .catch((err) =>
  //         swal(err?.response?.data?.message || "Category Not Added")
  //       )
  //       .finally(() => setIsSubmit(false));
  //   }
  // };

  // const handleSubmit = (formikProps) => {
  //   setIsSubmit(true);
  //   const data = convertToFormData(formikProps?.values);
  //   API.post("/admin/category", data)
  //     .then(() => {
  //       // swal("Category Added Successfully");
  //       formikProps.setValues({});
  //       setShowModal(false);
  //     })
  //     .catch((err) =>
  //       swal(err?.response?.data?.message || "Category Not Added")
  //     )
  //     .finally(() => setIsSubmit(false));
  // };

  // const handleEdit = (formikProps) => {
  //   setIsSubmit(true);
  //   const data = toFormData(formikProps.values);
  //   API.post(`/admin/category/${id}`, data)
  //     .then((res) => {
  //       swal(res?.data?.message);
  //       window.location.pathname = "/";
  //     })
  //     .catch((err) =>
  //       swal(err?.response?.data?.message || "Category Not Updated")
  //     )
  //     .finally(() => setIsSubmit(false));
  // };

  const handleSubmit = (formikProps) => {
    setIsSubmit(true);
    const formData = convertToFormData(formikProps?.values);

    const apiCall =
      id && edit
        ? API.post(`/admin/category/${id}`, formData)
        : API.post("/admin/category", formData);

    apiCall
      .then(() => {
        toast.success(
          `${id ? "Category Updated" : "Category Added"} Successfully`
        );
        formikProps.resetForm();
        queryClient.invalidateQueries("categories");
        // setShowModal(false);
        closeModal();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            `${id ? "Category Not Updated" : "Category Not Added"}`
        );
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };
  return (
    <Switch>
      <Case condition={isLoading}>
        <Spin />
      </Case>

      <Case condition={isError}>
        <Loading queryString={"get_category"} />
      </Case>

      <Default>
        <div
          key={id}
          className="d-flex align-items-center justify-content-center w-100"
        >
          <Formik
            initialValues={data?.data?.data || {}}
            validationSchema={validationSchema}
            onSubmit={() => false}
            enableReinitialize
          >
            {(formikProps) => (
              <Form className="d-grid gap-3 my-4">
                <Input label={"Category Name"} name={"name"} />
                <ImageHandler name={"images"} label={"Category Image"} />
                <SubmitBtn
                  disabled={isSubmit}
                  onClick={() => handleSubmit(formikProps)}
                  btnTxt={`${id ? "Edit" : "Add"} Category`}
                />
              </Form>
            )}
          </Formik>
        </div>
      </Default>
    </Switch>
  );
}

export default AddCategoryForm;
