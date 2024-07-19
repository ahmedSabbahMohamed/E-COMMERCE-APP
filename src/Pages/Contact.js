import React from "react";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { Container } from "react-bootstrap";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Services from "../Components/ui/Services";
import { Form, Formik } from "formik";
import Input from "../Components/form/Input";
import TextArea from "../Components/form/TextArea";
import SubmitBtn from "../Components/form/SubmitBtn";

function Contact() {
  return (
    <>
      <Header />
      <Container className="min-vh-100 mt-5">

        <h2 className="heading mb-5 mt-5 text-center text-lg-start fw-bold text-primary">
          Contact
        </h2>

        <div className="d-flex flex-column flex-md-row align-items-center justify-conent-center">
          <div className="d-flex flex-column gap-5">
            <div className="shadow rounded p-3" style={{ width: "340px" }}>
              <div className="d-flex gap-2 align-items-center">
                <button
                  className="btn btn-outline-danger rounded-pill"
                  style={{ width: "40px", height: "40px" }}
                >
                  <FaPhone />
                </button>
                <p className="p-0 m-0 fw-bold">Call To Us</p>
              </div>
              <p className="mt-4">We are available 24/7, 7 days a week.</p>
              <p className="fw-bold">
                Phone Number:{" "}
                <span className="text-primary">+201557551293</span>
              </p>
            </div>

            <div className="shadow rounded p-3" style={{ width: "340px" }}>
              <div className="d-flex gap-2 align-items-center">
                <button
                  className="btn btn-outline-danger rounded-pill"
                  style={{ width: "40px", height: "40px" }}
                >
                  <MdEmail />
                </button>
                <p className="p-0 m-0 fw-bold">Write To US</p>
              </div>
              <p className="mt-4">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="fw-bold">
                Email:{" "}
                <span className="text-primary">ahmedsabbah880@gmail.com</span>
              </p>
            </div>
          </div>

          <Formik
            initialValues={{}}
            onSubmit={() => false}
          >
            {(formikProps) => (
              <Form className="rounded shadow p-3 my-5 mx-auto">
                <div className="d-flex gap-2">
                  <Input name={"name"} label={"Name"} />
                  <Input name={"email"} type="email" label={"Email"} />
                  <Input name={"phone"} label={"Phone"} />
                </div>
                <TextArea name={"message"} label={"Message"} />
                <SubmitBtn btnTxt={"Send Message"} />
              </Form>
            )}
          </Formik>
        </div>

        <div className="my-5">
          <Services />
        </div>

      </Container>
      <Footer />
    </>
  );
}

export default Contact;
