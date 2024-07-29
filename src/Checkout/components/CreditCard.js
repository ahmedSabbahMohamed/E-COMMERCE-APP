import { Form, Formik } from "formik";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Input from "../../Components/form/Input";
import SubmitBtn from "../../Components/form/SubmitBtn";
import "../styles/CreditCard.css";

function CreditCard() {
  return (
    <div className="rounded shadow p-4 my-4">
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
          <div className="d-flex flex-row flex-wrap gap-5 align-items-center justify-conent-center">
            <Cards
              number={formikProps?.values?.number}
              name={formikProps?.values?.name}
              expiry={formikProps?.values?.expiry}
              cvc={formikProps?.values?.cvc}
              focused={formikProps?.values?.focused}
            />
            <Form>
              <Input
                name={"number"}
                label={"Number"}
                onFocus={() => formikProps?.setFieldValue("focused", "number")}
              />
              <Input
                name={"name"}
                label={"Name"}
                onFocus={() => formikProps?.setFieldValue("focused", "name")}
              />
              <Input
                name={"expiry"}
                label={"Expiry"}
                onFocus={() => formikProps?.setFieldValue("focused", "expiry")}
              />
              <Input
                type="tel"
                name={"cvc"}
                label={"CVC"}
                onFocus={() => formikProps?.setFieldValue("focused", "cvc")}
              />
              <SubmitBtn btnTxt={"Checkout"} />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default CreditCard;
