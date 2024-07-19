import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Spin } from "antd";
import Loading from "../../../Components/ui/Loading";
import { Case, Default, Switch } from "react-if";

function ProductForm({ id = null, edit = false, productData }) {
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

  const mutation = useMutation({
    mutationFn: (formData) =>
      id && edit
        ? API.post(`/admin/product/${id}`, formData)
        : API.post("/admin/product", formData),
    onSuccess: () => {
      toast.success(`Product ${id ? "Updated" : "Added"} Successfully`);
      queryClient.invalidateQueries("products");
      closeModal();
    },
    onError: (err) => {
      toast.error(
        JSON.stringify(err?.response?.data?.message) ||
          `Product Not ${id ? "Updated" : "Added"}`
      );
    },
    onSettled: () => {
      setIsSubmit(false);
    },
  });

  const handleSubmit = (formikProps) => {
    setIsSubmit(true);
    const formData = convertToFormData(formikProps?.values);
    mutation.mutate(formData, {
      onSuccess: () => formikProps.resetForm(),
    });
  };

  return (
    <Switch>
      <Case condition={isLoading}>
        <Spin />
      </Case>
      <Case condition={isError}>
        <Loading queryString={"get_product"} />
      </Case>
      <Default>
        <Formik
          initialValues={id && edit ? product?.data?.data : {}}
          validationSchema={validationSchema}
          onSubmit={() => false}
          enableReinitialize
        >
          {(formikProps) => {
            productData(formikProps.values);
            return (
              <Form className="d-grid gap-3 my-4 w-100">
                <Input label={"Product Name"} name={"name"} />
                <TextArea label={"Product Description"} name={"description"} />
                <Input label={"Product Price"} name={"price"} />
                <Select
                  options={categories?.data?.data?.data}
                  name={"category_id"}
                />
                <FileHandler
                  label={"Product Main Image"}
                  id={"picture"}
                  maxFiles={1}
                  currentFiles={
                    typeof formikProps?.values?.picture === "string" &&
                    id &&
                    edit
                      ? [
                          {
                            id: Math.random(),
                            path: formikProps?.values?.picture,
                          },
                        ]
                      : []
                  }
                />
                <FileHandler
                  label={"Product Images"}
                  id={"images"}
                  maxFiles={4}
                  currentFiles={
                    id && edit ? get(formikProps?.values, "images", []) : []
                  }
                />
                <SubmitBtn
                  disabled={isSubmit}
                  btnTxt={`${id ? "Edit" : "Add"} Product`}
                  onClick={() => handleSubmit(formikProps)}
                />
              </Form>
            );
          }}
        </Formik>
      </Default>
    </Switch>
  );
}

export default ProductForm;
