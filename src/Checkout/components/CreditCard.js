import { Form, Formik } from "formik";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Input from "../../Components/form/Input";
import SubmitBtn from "../../Components/form/SubmitBtn";
import "../styles/CreditCard.css";
import { Col, Row } from "react-bootstrap";
import checkout from "../../Assets/images/checkout.webp";

function CreditCard() {
  return (
    <Row className="min-vh-100 p-0 m-0">
      <Col sm={12} md={6} className="p-0 m-0 overflow-hidden">
        <img
          src={checkout}
          alt="credit card"
          className="w-100 img-fluid d-none d-md-block"
          style={{ height: "100vh", objectFit: "cover" }}
        />
      </Col>
      <Col
        sm={12}
        md={6}
        className="min-vh-100 d-flex flex-column align-items-center gap-3 py-5 pt-md-5"
      >
        <Formik
          initialValues={{
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            focused: "",
          }}
          onSubmit={() => false}
        >
          {(formikProps) => (
            <>
              <Cards
                number={formikProps?.values?.number}
                name={formikProps?.values?.name}
                expiry={formikProps?.values?.expiry}
                cvc={formikProps?.values?.cvc}
                focused={formikProps?.values?.focused}
              />
              <Form className="d-flex flex-column gap-3">
                <Input
                  name={"name"}
                  label={"Name"}
                  onFocus={() => formikProps?.setFieldValue("focused", "name")}
                />
                <Input
                  name={"number"}
                  label={"Number"}
                  onFocus={() =>
                    formikProps?.setFieldValue("focused", "number")
                  }
                />
                <div className="d-flex justify-content-between gap-2 w-100">
                  <Input
                    name={"expiry"}
                    label={"Expiry"}
                    onFocus={() =>
                      formikProps?.setFieldValue("focused", "expiry")
                    }
                  />
                  <Input
                    type="tel"
                    name={"cvc"}
                    label={"CVC"}
                    onFocus={() => formikProps?.setFieldValue("focused", "cvc")}
                  />
                </div>
                <SubmitBtn btnTxt={"Checkout"} />
              </Form>
            </>
          )}
        </Formik>
      </Col>
    </Row>
  );
}

export default CreditCard;
