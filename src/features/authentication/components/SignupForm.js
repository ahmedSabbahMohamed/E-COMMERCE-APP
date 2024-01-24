import { Form, Formik } from "formik";
import FormContainer from "./FormContainer"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import Input from "../../../components/form/Input";
import SubmitBtn from "./SubmitBtn";

function SignupForm() {

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(2, "name is so short")
      .max(30, "name is too long"),
    email: Yup.string()
      .required("email is required")
      .email("invalid email")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        "wront format"
      ),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
      , "weak password"),
    dateOfBirth: Yup.string()
      .required("date of birth is required")
      .matches(
        /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/,
        "wrong format"
      ),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    dateOfBirth: ''
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
            <Input label={"Name:"} name={"name"} type={"text"} id={"name"} />
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
            <Input
              label={"Date of birth:"}
              name={"dateOfBirth"}
              type={"text"}
              id={"dateOfBirth"}
            />

            <SubmitBtn btnTxt={"Signup"} />
            <p className="text-center">
              already have an account? <Link to={"/login"}>login</Link>
            </p>
          </Form>
        </Formik>
      }
      authType={"Signup"}
    />
  );
}

export default SignupForm