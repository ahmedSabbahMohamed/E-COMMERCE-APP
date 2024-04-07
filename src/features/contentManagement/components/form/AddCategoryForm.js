import { Form, Formik } from "formik";
import Input from "../../../../components/form/Input";
import SubmitBtn from "../../../../components/form/SubmitBtn";
import { addCategorySchema } from "../../../../actions/validationSchema";
import { toFormData } from "axios";
import ImageHandler from "../../../../components/form/ImageHandler";
import { API } from "../../../../api";
import swal from "sweetalert";
import { Case, Default, Switch } from "react-if";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

function AddCategoryForm() {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false)
  const { categoryId } = useParams();

  const { data } = useQuery({
    queryFn: ["categoryid"],
    queryFn: () => API.get(`/admin/category/${categoryId}`),
    // staleTime: Infinity,
  });

  const handleSubmit = (formikProps) => {
    setIsSubmit(true)
    const data = toFormData(formikProps.values);
    API.post("/admin/category", data)
      .then((res) => {
        swal(res?.data?.message);
        formikProps.setValues({});
        setLoading(true);
      })
      .catch((err) => swal(err?.response?.data?.message || "error"))
      .finally(() =>
        setIsSubmit(false),
        setTimeout(() => {
          setLoading(false);
        }, 300)
      );
  };

  const handleEdit = (formikProps) => {
    setIsSubmit(true);
    const data = toFormData(formikProps.values);
    API.post(`/admin/category/${categoryId}`, data)
      .then((res) => {
        swal(res?.data?.message);
        window.location.pathname = "/";
      })
      .catch((err) => swal(err?.response?.data?.message || "error"))
      .finally(() => setIsSubmit(false))
  };

  return (
    <Switch>
      <Case condition={loading}>
        <Spin />
      </Case>
      <Default>
        <h2 className="text-black-50 text-center h2 p-4 fw-bold">
          {categoryId
            ? `Edit category ${data?.data?.data?.name}`
            : "Add New Category:"}
        </h2>
        <div className="d-flex align-items-center justify-content-center">
          <Formik
            initialValues={categoryId ? data?.data?.data : {}}
            validationSchema={addCategorySchema}
            onSubmit={false}
            enableReinitialize
          >
            {(formikProps) => {
              console.log(formikProps.values);
              return (
                <Form className="d-grid gap-3 my-4">
                  <Input label={"Category Name:"} name={"name"} />
                  <ImageHandler
                    name={"picture"}
                    numOfImgs={1}
                    label={"Category Image"}
                  />
                  <SubmitBtn
                    disabled={isSubmit}
                    onClick={
                      categoryId
                        ? () => handleEdit(formikProps)
                        : () => handleSubmit(formikProps)
                    }
                    btnTxt={`${categoryId ? "Edit" : "Add"} Category`}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </Default>
    </Switch>
  );
}

export default AddCategoryForm;
