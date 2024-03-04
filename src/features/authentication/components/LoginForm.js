import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Container, Row, Col } from "react-bootstrap"
import Input from "../../../components/form/Input"
import SubmitBtn from "../../../components/form/SubmitBtn"
import "../assets/styles/FormContainer.css"
import swal from "sweetalert"
import { API } from "../../../api"

function LoginForm() {

  const validationSchema = Yup.object({
    email: Yup.string()
    .email("invalid email address")
    .required("email is required"),
    password: Yup.string().required("password is required"),
  });

    const navigate = useNavigate();

  const handleSubmit = (values) => {
    API.post("/user/login", values)
      .then((res) => {
        localStorage.setItem("token", res?.data?.access_token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        localStorage.setItem("role", JSON.stringify(res?.data?.user?.user_type));
        swal("signedin successfully").then(() => {
          if (res?.data?.user?.user_type === "admin") {
            navigate("/admin")
          } else {
            navigate("/")
          }
        });
      })
      .catch((err) => swal(err?.response?.data.error || "error"));
  };

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

                        <SubmitBtn disabled={formikProps.isSubmitting} btnTxt={"Login"} />
                        <p className="text-center">
                          don't have an account?{" "}
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