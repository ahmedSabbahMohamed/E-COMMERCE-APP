import { Form, Formik } from "formik"
import FormContainer from "./FormContainer"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import Input from "../../../components/form/Input"
import SubmitBtn from "./SubmitBtn"

function LoginForm() {

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required")
  })

  const initialValues = {
    email: '',
    password: ''
  }

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <FormContainer
      form={
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mx-auto d-grid gap-2">
            <Input
              label={"Email:"}
              name={"email"}
              type={"email"}
              id={"email"}
            />

            <Input
              label={"Password:"}
              name={"password"}
              type={"password"}
              id={"password"}
            />

            <SubmitBtn btnTxt={"Login"} />
            <p className="text-center">
              don't have an account? <Link to={"/signup"}>Signup</Link>
            </p>
          </Form>
        </Formik>
      }
      authType={"Login"}
    />
  );
}

export default LoginForm