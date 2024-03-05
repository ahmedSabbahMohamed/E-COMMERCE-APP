import { Form, Formik } from "formik";
import Input from "../../../../components/form/Input"
import SubmitBtn from "../../../../components/form/SubmitBtn"
import { addCategorySchema } from "../../../../actions/validationSchema"
import { toFormData } from "axios";
import ImageHandler from "../../../../components/form/ImageHandler";
import { API } from "../../../../api";
import swal from "sweetalert";

function AddCategoryForm() {

  const handleSubmit = (values) => {
    const data = toFormData(values);
    API.post("/admin/category", data)
       .then((res) => console.log(res))
       .catch(err => console.log(err))
    console.log(data)
  }

  return (
    <>
      <h2 className="text-success text-center h2 p-4 fw-bold">
        Add New Category:
      </h2>
      <div className="d-flex align-items-center justify-content-center">
        <Formik
          initialValues={{}}
          validationSchema={addCategorySchema}
          onSubmit={false}
        >
          {(formikProps) => (
            <Form className="d-grid gap-3 my-4">
              <Input label={"Category"} name={"name"} />
              <ImageHandler label={"image"} name={'picture'} />
              <SubmitBtn onClick={handleSubmit(formikProps.values)} btnTxt={"Add Category"} />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddCategoryForm;