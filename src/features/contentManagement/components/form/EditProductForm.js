import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "../../../../components/form/Input";
import TextArea from "../../../../components/form/TextArea";
import Select from "../../../../components/form/Select";
import ImageHandler from "../../../../components/form/ImageHandler";
import SubmitBtn from "../../../../components/form/SubmitBtn";
import { addProductSchema } from "../../../../actions/validationSchema";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../../Api";
import { convertToFormData } from "../../../Helpers";

const EditProductForm = ({ productId }) => {
  const [formikValues, setFormikValues] = useState({});

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => API.get(`/admin/product/${productId}`),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get("/admin/categories"),
  });

  const handleEdit = (formikProps) => {
    const data = convertToFormData(formikProps.values);
    API.post(`/admin/product/${productId}`, data)
      .then((res) => {
        swal(res?.data?.message);
      })
      .catch((err) => swal(err?.response?.data?.message || "error"));
  };

  return (
    <div className="d-flex align-items-center justify-content-center p-3">
      <Formik
        initialValues={productId ? product?.data?.data : {}}
        validationSchema={addProductSchema}
        onSubmit={false}
        enableReinitialize
      >
        {(formikProps) => {
          setFormikValues(formikProps.values);
          return (
            <Form className="d-grid gap-3 my-4 w-100">
              <Input label={"Product Name"} name={"name"} />
              <TextArea label={"Product description"} name={"description"} />
              <Input label={"Product price"} name={"price"} />
              <Select options={categories?.data?.data} name={"category_id"} />
              <ImageHandler
                label={"Product Main Image"}
                name={"picture"}
                maxFiles={1}
              />
              <ImageHandler
                label={"Product Images"}
                name={"images"}
                maxFiles={4}
              />
              <SubmitBtn
                disabled={isSubmitting}
                onClick={() => handleEdit(formikProps.values)}
                btnTxt={"Edit Product"}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProductForm;
