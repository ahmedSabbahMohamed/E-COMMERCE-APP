import { Form, Formik } from "formik";
import Input from "../../../Components/form/Input";
import SubmitBtn from "../../../Components/form/SubmitBtn";
import FileHnadler from "../../../Components/form/FileHandler";
import { API } from "../../../Api";
import { Case, Default, Switch } from "react-if";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { closeModal, convertToFormData } from "../../../Helpers";
import Loading from "../../../Components/ui/Loading";
import { toast } from "react-toastify";
import { validationSchema } from "../../validation/addCategoryValidation";
import { get } from "lodash";

function AddCategoryForm({ edit = false, id = undefined }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: ["get_category"],
    queryFn: () => API.get(`/admin/category/${id}`),
    enabled: Boolean(edit && id),
  });

  const handleSubmit = (formikProps) => {
    setIsSubmit(true);
    console.log(formikProps.values);
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
        closeModal();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error(
          JSON.stringify(err?.response?.data?.message) ||
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
            initialValues={id && edit ? data?.data?.data : {}}
            validationSchema={validationSchema}
            onSubmit={() => false}
            enableReinitialize
          >
            {(formikProps) => (
              <Form className="d-grid gap-3 my-4">
                <Input label={"Category Name"} name={"name"} />
                <FileHnadler
                  id={"images"}
                  label={"Category Image"}
                  maxFiles={5}
                  currentFiles={
                    id && edit ? get(formikProps?.values, "images", []) : []
                  }
                />
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
