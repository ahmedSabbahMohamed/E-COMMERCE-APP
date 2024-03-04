import { Form, Formik } from "formik"
import Input from "../../../../components/form/Input"
import ImageHandler from "../../../../components/form/ImageHandler"
import SubmitBtn from "../../../../components/form/SubmitBtn"
import { addProductSchema } from "../../../../actions/validationSchema"
import { useParams } from "react-router-dom"


function AddEditProductForm({btnTxt}) {
    const {productId} = useParams()

    const categories = [
    { id: 1, type: "electronics", desc: "electronic devices" },
    { id: 2, type: "books", desc: "books ..........." },
    { id: 3, type: "fashion", desc: "clothes ........." },
    { id: 4, type: "furniture", desc: "furniture ......." },
    { id: 5, type: "handbag", desc: "handbag ......." },
    { id: 6, type: "sneakers", desc: "sneakers ........." },
  ];

  return (
    <>
      <h2 className="text-success text-center h2 p-4 fw-bold">
        {productId ? `Edit product with id => ${productId}`: "Add New Product"}
      </h2>

      <div className="d-flex align-items-center justify-content-center">
        <Formik
          initialValues={{}}
          validationSchema={addProductSchema}
          validateOnChange
          onSubmit={(values) => console.log(values)}
        >
          {formikProps => {
            return (
              <Form className="d-grid gap-3 my-4">
                <Input
                  label={"Product title"}
                  name={"product_title"}
                  type={"text"}
                />
                <Input
                  label={"Product description"}
                  name={"product_desc"}
                  type={"text"}
                />
                <Input
                  label={"Product price"}
                  name={"product_price"}
                  type={"text"}
                />
                <select className="form-select select">
                  {categories.map((category) => (
                    <option key={category.id} value={category.type}>
                      {category.type}
                    </option>
                  ))}
                </select>
                <div className="border rounded p-3">
                  <h3>Product images:</h3>
                  <ImageHandler label={"image"} name={"picture"} />
                </div>
                <SubmitBtn btnTxt={btnTxt} />
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default AddEditProductForm