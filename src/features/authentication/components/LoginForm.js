import { useState } from "react"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { Container, Row, Col } from "react-bootstrap"
import Input from "../../../components/form/Input"
import SubmitBtn from "../../../components/form/SubmitBtn"
import "../assets/styles/FormContainer.css"
import swal from "sweetalert"
import { API } from "../../../api"
import { useDispatch } from "react-redux"
import { handleLogin } from "../store"

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
    .email("invalid email address")
    .required("email is required"),
    password: Yup.string().required("password is required"),
  });

    const handleSubmit = (values) => {
      setIsSubmitting(true)
      API.post("/user/login", values)
      .then((res) => {
          dispatch(handleLogin(res?.data));
        })
        .catch((err) => {
          swal(err?.response?.data.error || "error");
        }).finally(() => setIsSubmitting(false))
  };

  return (
    <div className="form-container my-4 d-flex align-items-center justify-content-center">
      <Container>
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
                  onSubmit={values => handleSubmit(values)}
                >
                  {(formikProps) => {
                    return (
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

                        <SubmitBtn disabled={isSubmitting} id={"login"} btnTxt={"Login"} />
                        <p className="text-center">
                          don't have an account? 
                          <Link to={"/signup"}>Signup</Link>
                        </p>
                      </Form>
                    );
                  }}
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