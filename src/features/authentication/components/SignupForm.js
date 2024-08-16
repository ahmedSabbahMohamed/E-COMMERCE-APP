import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/form/Input";
import SubmitBtn from "../../../components/form/SubmitBtn";
import "../assets/styles/FormContainer.css";
import { API } from "../../../Api";
import swal from "sweetalert";
import { useState } from "react";
import ImageHandler from "../../../components/form/ImageHandler";

function SignupForm() {
  const [isSubmitting, setisSubmitting] = useState(false);

  const validationSchema = Yup.object({
    picture: Yup.mixed().required("Profile Image required"),
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
    password: Yup.string().required("password is required"),
    // .matches(
    //   /^(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    //   "weak password"
    // )
  });

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setisSubmitting(true);
    API.post("/user/register", values)
      .then(() => {
        swal("signup successfully").then(() => {
          navigate("/login");
        });
      })
      .catch((err) =>
        swal(err?.response?.data?.message || "something went wrong")
      )
      .finally(() => setisSubmitting(false));
  };

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
                      <ImageHandler
                        name={"picture"}
                        maxFiles={"1"}
                        label={"Profile Image"}
                      />
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

                      <SubmitBtn
                        disabled={isSubmitting}
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

export default SignupForm;
