import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { Container, Row, Col } from "react-bootstrap"
import Input from "../../../components/form/Input"
import SubmitBtn from "./SubmitBtn"
import "../assets/styles/FormContainer.css"

function LoginForm() {

  const validationSchema = Yup.object({
    email: Yup.string()
    .email("invalid email address")
    .required("email is required"),
    password: Yup.string().required("password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className="form-container d-flex align-items-center justify-content-center">
      <Container className="">
        <Row className="rounded mx-2 shadow overflow-hidden">
          <Col className="p-0 form-img" sm={12} md={4}></Col>
          <Col className="py-4" sm={12} md={8}>
            <Row className="">
              <Col>
                <h2 className="pb-3 text-center">Login</h2>
                <Formik
                  initialValues={{}}
                  validationSchema={validationSchema}
                  validateOnBlur
                  validateOnChange                  
                  onSubmit={handleSubmit}
                >
                  {(formikProps) => (
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
                        don't have an account?{" "}
                        <Link to={"/signup"}>Signup</Link>
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

export default LoginForm