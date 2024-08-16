import { Form, Formik } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/form/Input";
import SubmitBtn from "../../Components/form/SubmitBtn";
import "../assets/styles/FormContainer.css";
import { API } from "../../Api";
import { useState } from "react";
import FileHandler from "../../Components/form/FileHandler";
import { validationSchema } from "../validation/signup";
import { toast } from "react-toastify";

function SignupForm() {
  const [isSubmitting, setisSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setisSubmitting(true);
    API.post("/user/register", values)
      .then(() => {
        toast.success("signup successfully").then(() => {
          navigate("/login");
        });
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message || "something went wrong")
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
                      <FileHandler
                        id={"picture"}
                        maxFiles={1}
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
