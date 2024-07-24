import { Form, Formik } from "formik";
import Cards from "react-credit-cards-2"
 import "react-credit-cards-2/dist/es/styles-compiled.css";
import Input from "../../Components/form/Input";
import SubmitBtn from "../../Components/form/SubmitBtn";

function CreditCard() {
  return (
    <div className="rounded shadow p-4">
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
          <div className="d-grid gap-5">
            <Cards
              number={formikProps?.values?.number}
              name={formikProps?.values?.name}
              expiry={formikProps?.values?.expiry}
              cvc={formikProps?.values?.cvc}
              focused={formikProps?.values?.focused}
            />
            <Form>
              <Input name={"number"} label={"Number"} />
              <Input name={"name"} label={"Name"} />
              <Input name={"expiry"} label={"Expiry"} />
              <Input type="tel" name={"cvc"} label={"CVC"} />
              <SubmitBtn btnTxt={"Checkout"} />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default CreditCard