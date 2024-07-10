import { Form, Formik } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../../Api";
import { Case, Default, Switch } from "react-if";
import { useState } from "react";
import Select from "../../../../components/form/Select";
import TextArea from "../../../../components/form/TextArea";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../../../Components/ui/ProductCard";
import ProductCarousel from "../../../../components/ui/ProductCarousel";
import { ProductDescription } from "../../../../components/ui/ProductDescription";
import Input from "../../../../components/form/Input";
import ImageHandler from "../../../../components/form/ImageHandler";
import SubmitBtn from "../../../../components/form/SubmitBtn";
import { addProductSchema } from "../../../../actions/validationSchema";
import { closeModal, convertToFormData } from "../../../Helpers";
import { toast } from "react-toastify";
import Loading from "../../../Components/ui/Loading";
import { Spin } from "antd";

function AddProductForm({ edit = false, id = undefined }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_product"],
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
        toast.success(
          `${id ? "Product updated" : "Product Added"} Successfully`
        );
        formikProps.resetForm();
        queryClient.invalidateQueries("products");
        closeModal();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            `${id ? "Product Not Updated" : "Product Not Added"}`
        );
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  const productDescription = (
    <ProductDescription description={product?.data?.data?.description} />
  );

  return (
    <Switch>
      <Case condition={isLoading}>
        <Spin />
      </Case>

      <Case condition={isError}>
        <Loading queryString={"get_product"} />
      </Case>

      <Default>
        <Row className="justify-content-center align-items-center m-0 p-0">
          <Col
            sm={12}
            lg={5}
            className="p-3 mx-2 d-flex flex-column align-items-center gap-4"
          >
            <ProductCard
              img={
                product?.data?.data?.picture
                  ? typeof product?.data?.data?.picture === "string"
                    ? product?.data?.data?.picture
                    : product?.data?.data?.picture
                    ? URL.createObjectURL(product?.data?.data?.picture)
                    : null
                  : ""
              }
              title={product?.data?.data?.name || "Product Title"}
              description={
                <>
                  {productDescription}
                  <strong>Price: ${product?.data?.data?.price}</strong>
                </>
              }
            />

            <div className="w-100">
              <Switch>
                <Case
                  condition={
                    product?.data?.data &&
                    product?.data?.data?.images &&
                    product?.data?.data?.images.length >= 2
                  }
                >
                  <ProductCarousel>
                    {product?.data?.data?.images?.map((img, index) => (
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
                          title={product?.data?.data?.name}
                          description={
                            <>
                              {productDescription}
                              <strong>
                                Price: ${product?.data?.data?.price}
                              </strong>
                            </>
                          }
                        />
                      </div>
                    ))}
                  </ProductCarousel>
                </Case>

                <Case
                  condition={
                    !product?.data?.data ||
                    (product?.data?.data &&
                      product?.data?.data.images &&
                      product?.data?.data.images.length === 0)
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
                initialValues={product?.data?.data || {}}
                validationSchema={addProductSchema}
                onSubmit={() => false}
                enableReinitialize
              >
                {(formikProps) => (
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
                      maxFiles={1}
                    />
                    <ImageHandler
                      label={"Product Images"}
                      name={"images"}
                      maxFiles={4}
                    />
                    <SubmitBtn
                      disabled={isSubmit}
                      onClick={() => handleSubmit(formikProps)}
                      btnTxt={`${id ? "Edit" : "Add"} Product`}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Default>
    </Switch>
  );
}

export default AddProductForm;
