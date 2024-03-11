import { Form, Formik } from "formik";
import Input from "../../../../components/form/Input"
import SubmitBtn from "../../../../components/form/SubmitBtn"
import { addCategorySchema } from "../../../../actions/validationSchema"
import { toFormData } from "axios";
import ImageHandler from "../../../../components/form/ImageHandler";
import { API } from "../../../../api";
import swal from "sweetalert";
import { Case, Default, Switch } from "react-if";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function AddCategoryForm() {
  const [loading, setLoading] = useState(false)
  const {categoryId} = useParams()

  const {data} = useQuery({
    queryFn: ["category id"],
    queryFn: () => API.get(`/admin/category/${categoryId}`),
  });

  const handleSubmit = (formikProps) => {
    const data = toFormData(formikProps.values);
    API.post("/admin/category", data)
      .then((res) => {
        swal(res?.data?.message);
        formikProps.setValues({})
        setLoading(true)
      })
      .catch((err) => swal(err?.response?.data?.message || "error"))
      .finally(() => setTimeout(() => { setLoading(false); }, 300))
  }

    const handleEdit = (formikProps) => {
      console.log("after submit", formikProps.values)
      const data = toFormData(formikProps.values);
      API.post(`/admin/category/${categoryId}`, data)
      .then((res) => {
          swal(res?.data?.message);
        })
        .catch((err) => swal(err?.response?.data?.message || "error"))
    };

  return (
    <Switch>
      <Case condition={loading}>.</Case>
      <Default>
        <h2 className="text-success text-center h2 p-4 fw-bold">
          {categoryId
            ? `Edit category ${data?.data?.data?.name}`
            : "Add New Category:"}
        </h2>
        <div className="d-flex align-items-center justify-content-center">
          <Formik
            initialValues={data?.data?.data}
            validationSchema={addCategorySchema}
            onSubmit={false}
            enableReinitialize
          >
            {(formikProps) => {
              console.log("before submit", formikProps.values)
              return (
                <Form className="d-grid gap-3 my-4">
                  <Input label={"Category"} name={"name"} />
                  <ImageHandler
                    values={formikProps.values}
                    label={"Category image"}
                    name={"picture"}
                  />
                  <SubmitBtn
                    onClick={() => {
                      categoryId
                        ? handleEdit(formikProps)
                        : handleSubmit(formikProps);
                    }}
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
