import { Form, Formik } from "formik"
import Input from "../../../../components/form/Input"
import ImageHandler from "../../../../components/form/ImageHandler"
import SubmitBtn from "../../../../components/form/SubmitBtn"
import { addProductSchema } from "../../../../actions/validationSchema"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../../../api"
import { Case, Default, Switch } from "react-if"
import { useState } from "react"
import { toFormData } from "axios"
import swal from "sweetalert"
import Select from "../../../../components/form/Select"


function AddEditProductForm() {
    const [loading, setLoading] = useState(false)
    const {productId} = useParams()

      const { data: myProduct } = useQuery({
        queryFn: ["product-id"],
        queryFn: () => API.get(`/admin/product/${productId}`),
      });

        const { data: categories } = useQuery({
          queryKey: ["categories"],
          queryFn: () => API.get("/admin/categories"),
        });

      const handleSubmit = (values) => {
        // const data = toFormData(formikProps.values);
        // console.log(data)
        // API.post("/admin/product", data)
        //   .then((res) => {
        //     swal(res?.data?.message);
        //     formikProps.setValues({});
        //     setLoading(true);
        //   })
        //   .catch((err) => swal(err?.response?.data?.message || "error"))
        //   .finally(() =>
        //     setTimeout(() => {
        //       setLoading(false);
        //     }, 300)
        //   );

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("category_id", values.category_id);
        values.images.forEach((img, index) => {
          formData.append(`picture[${index}]`, img);
        });
        formData.append("picture", values.picture)

        console.log(formData)
        console.log(values)
        API.post("/admin/product", formData)
          .then((res) => {
            swal(res?.data?.message);
            values = {};
            setLoading(true);
          })
          .catch(err => swal(err?.response?.data?.message || "error"))
          .finally(() => {
            setTimeout(() => { setLoading(false) }, 300)
          })
      };

      const handleEdit = (formikProps) => {
        const data = toFormData(formikProps.values);
        API.post(`/admin/product/${productId}`, data)
          .then((res) => {
            swal(res?.data?.message);
            window.location.pathname = "/products";
          })
          .catch((err) => swal(err?.response?.data?.message || "error"));
      };

  return (
    <Switch>
      <Case condition={loading}>.</Case>
      <Default>
        <h2 className="text-success text-center h2 p-4 fw-bold">
          {productId
            ? `Edit ${myProduct?.data?.data.name} product`
            : "Add New Product"}
        </h2>

        <div className="d-flex align-items-center justify-content-center">
          <Formik
            initialValues={{}}
            validationSchema={addProductSchema}
            onSubmit={false}
            enableReinitialize
          >
            {(formikProps) => {
              return (
                <Form className="d-grid gap-3 my-4">
                  <Input label={"Product Name"} name={"name"} />
                  <Input label={"Product description"} name={"description"} />
                  <Input label={"Product price"} name={"price"} />
                  <Select
                    options={categories?.data?.data}
                    name={"category_id"}
                  />
                  <ImageHandler
                    label={"Product Images"}
                    name={"images"}
                    setFieldValue={formikProps.setFieldValue}
                  />
                  <ImageHandler
                    label={"Product Images"}
                    name={"picture"}
                    multiple={false}
                    setFieldValue={formikProps.setFieldValue}
                  />
                  <SubmitBtn
                    onClick={() => {
                      productId
                        ? handleEdit(formikProps.values)
                        : handleSubmit(formikProps.values);
                    }}
                    btnTxt={`${productId ? "Edit" : "Add"} Product`}
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

export default AddEditProductForm
