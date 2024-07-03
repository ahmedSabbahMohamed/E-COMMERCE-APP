import { Form, Formik } from "formik"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../../../api"
import { Case, Default, Switch } from "react-if"
import { useEffect, useState } from "react"
import { toFormData } from "axios"
import swal from "sweetalert"
import Select from "../../../../components/form/Select"
import TextArea from "../../../../components/form/TextArea"
import { Row, Col } from 'react-bootstrap'
import ProductCard from "../../../../components/ui/ProductCard"
import ProductCarousel from "../../../../components/ui/ProductCarousel"
import { ProductDescription } from "../../../../components/ui/ProductDescription"
import ProgressBar from "../../../../components/ui/ProgressBar"
import Input from "../../../../components/form/Input"
import ImageHandler from "../../../../components/form/ImageHandler"
import SubmitBtn from "../../../../components/form/SubmitBtn"
import {addProductSchema} from "../../../../actions/validationSchema";
import CustomPaging from "../../../../components/ui/CustomPaging"

function AddEditProductForm() {
    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formikValues, setFormikValues] = useState({})
    const [progress, setProgress] = useState(0)
    const {productId} = useParams()

    const { data: myProduct, isLoading, isError, isSuccess } = useQuery({
      queryKey: ["product-id"],
      queryFn: () => API.get(`/admin/product/${productId}`),
      enabled: !!productId,
    });

    const { data: categories } = useQuery({
      queryKey: ["categories"],
      queryFn: () => API.get("/admin/categories"),
    });

      const handleSubmit = (values) => {
        setIsSubmitting(true);
        const data = toFormData(values);
        console.log(data)
        API.post("/admin/product", data, {
          onUploadProgress: (e) =>
            setProgress(Math.round((e.loaded * 100) / e.total)),
        })
          .then((res) => {
            swal(res?.data?.message);
            values = {};
            setLoading(true);
          })
          .catch((err) => swal(err?.response?.data?.message || "error"))
          .finally(
            () => setIsSubmitting(false),
            setTimeout(() => {
              setLoading(false);
            }, 300)
          );
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

      const productDescription = (
        <ProductDescription description={formikValues?.description} />
      );

  return (
    <Switch>
      <Case condition={loading}>.</Case>
      <Default>
        <h2 className="text-black-50 text-center h2 p-4 fw-bold">
          {productId
            ? `Edit ${myProduct?.data?.data.name} product`
            : "Add New Product"}
        </h2>
        <Row className="justify-content-center align-items-center m-0 p-0">
          <Col
            sm={12}
            lg={5}
            className="p-3 mx-2 d-flex flex-column align-items-center gap-4"
          >
            <ProductCard
              img={
                formikValues?.picture
                  ? typeof formikValues.picture === "string"
                    ? formikValues.picture
                    : formikValues.picture
                    ? URL.createObjectURL(formikValues.picture)
                    : null
                  : ""
              }
              title={formikValues?.name || "Product Title"}
              description={
                <>
                  {productDescription}
                  <strong>Price: ${formikValues?.price}</strong>
                </>
              }
            />

            <div className="w-100">
              <Switch>
                <Case
                  condition={
                    formikValues &&
                    formikValues.images &&
                    formikValues.images.length >= 2
                  }
                >
                  <ProductCarousel>
                    {formikValues?.images?.map((img, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <ProductCard
                          img={
                            img
                              ? typeof img.path === "string"
                                ? img.path
                                : img instanceof File
                                ? URL.createObjectURL(img)
                                : null
                              : ""
                          }
                          title={formikValues.name}
                          description={
                            <>
                              {productDescription}
                              <strong>Price: ${formikValues.price}</strong>
                            </>
                          }
                        />
                      </div>
                    ))}
                  </ProductCarousel>
                </Case>
                <Case
                  condition={
                    !formikValues ||
                    (formikValues &&
                      formikValues.images &&
                      formikValues.images.length === 0)
                  }
                >
                  <h3 className="text-center text-danger">
                    This Product doesn't have any images
                  </h3>
                </Case>
              </Switch>
            </div>
          </Col>

          <Col sm={12} lg={5}>
            <div className="d-flex align-items-center justify-content-center p-3">
              <Formik
                initialValues={productId ? myProduct?.data?.data : {}}
                validationSchema={addProductSchema}
                onSubmit={false}
                enableReinitialize
              >
                {(formikProps) => {
                  setFormikValues(formikProps.values);
                  return (
                    <Form className="d-grid gap-3 my-4 w-100">
                      <Input label={"Product Name"} name={"name"} />
                      <TextArea
                        label={"Product description"}
                        name={"description"}
                      />
                      <Input label={"Product price"} name={"price"} />
                      <Select
                        options={categories?.data?.data}
                        name={"category_id"}
                      />
                      <ImageHandler
                        label={"Product Main Image"}
                        name={"picture"}
                        numOfImgs={1}
                      />
                      <ImageHandler
                        label={"Product Images"}
                        name={"images"}
                        numOfImgs={4}
                      />
                      <SubmitBtn
                        disabled={isSubmitting}
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
          </Col>
        </Row>
      {isSubmitting && progress && <ProgressBar percent={progress} />}
      </Default>

    </Switch>
  );
}

export default AddEditProductForm
