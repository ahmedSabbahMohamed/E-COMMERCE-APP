import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import Input from "../../../Components/form/Input";
import Select from "../../../Components/form/Select";
import FileHandler from "../../../Components/form/FileHandler";
import TextArea from "../../../Components/form/TextArea";
import SubmitBtn from "../../../Components/form/SubmitBtn";
import { validationSchema } from "../../validation/addProductValidation";
import { API } from "../../../Api";
import { closeModal, convertToFormData } from "../../../Helpers";
import { toast } from "react-toastify";
import { get } from "lodash";

function ProductFom({ id = undefined, edit = false, productData }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_product", id],
    queryFn: () => API.get(`/admin/product/${id}`),
    enabled: Boolean(edit && id),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get("/admin/categories"),
  });

  const handleSubmit = (formikProps) => {
    setIsSubmit(true);
    const formData = convertToFormData(formikProps?.values);

    const apiCall =
      id && edit
        ? API.post(`/admin/product/${id}`, formData)
        : API.post("/admin/product", formData);

    apiCall
      .then(() => {
        toast.success(`Product ${id ? "Updated" : "Added"} Successfully`);
        formikProps.resetForm();
        queryClient.invalidateQueries("products");
        closeModal();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            `Product ${id ? "Not Updated" : "Not Added"}`
        );
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  return (
    <div>
      <Formik
        initialValues={id ? product?.data?.data : {}}
        validationSchema={validationSchema}
        onSubmit={() => false}
        enableReinitialize
      >
        {(formikProps) => {
          productData(formikProps.values);
          return (
            <Form className="d-grid gap-3 my-4 w-100">
              <Input label={"Product Name"} name={"name"} />
              <TextArea label={"Product description"} name={"description"} />
              <Input label={"Product price"} name={"price"} />
              <Select
                options={categories?.data?.data?.data}
                name={"category_id"}
              />
              <FileHandler
                label={"Product Main Image"}
                id={"picture"}
                maxFiles={1}
              />
              <FileHandler
                label={"Product Images"}
                id={"images"}
                maxFiles={4}
                currentFiles={
                  id && edit ? get(formikProps.values, "images", []) : []
                }
              />
              <SubmitBtn
                disabled={isSubmit}
                onClick={() => handleSubmit(formikProps)}
                btnTxt={`${id ? "Edit" : "Add"} Product`}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProductFom;
