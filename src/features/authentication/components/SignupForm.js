import { Form, Formik } from "formik";
import * as Yup from "yup"
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import Input from "../../../components/form/Input";
import SubmitBtn from "./SubmitBtn";
import "../assets/styles/FormContainer.css"
import { API } from "../../../api";
import swal from "sweetalert";

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

  const handleSubmit = (values) => {
    console.log(values)
    API.post("/api/user/register", values)
      .then(() => swal("signup successfully"))
      .catch((err) => swal(err?.response?.data?.message));
    
    
  }

  return (
    <div className="form-container d-flex align-items-center justify-content-center">
      <Container className="">
        <Row className="rounded mx-2 shadow overflow-hidden">
          <Col className="p-0 form-img" sm={12} md={4}></Col>
          <Col className="py-4" sm={12} md={8}>
            <Row>
              <Col>
                <Formik
                  initialValues={{}}
                  validationSchema={validationSchema}
                  onSubmit={false}
                >
                  {(formikProps) => (
                    <Form className="mx-auto d-grid gap-2">
                      <Input
                        label={"Name:"}
                        name={"name"}
                        type={"text"}
                        id={"name"}
                      />
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
                        name={"date_of_birth"}
                        type={"date"}
                        id={"dateOfBirth"}
                      />

                      <SubmitBtn
                        onClick={() => handleSubmit(formikProps.values)}
                        btnTxt={"Signup"}
                      />
                      <p className="text-center">
                        already have an account?{" "}
                        <Link to={"/login"}>login</Link>
                      </p>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignupForm