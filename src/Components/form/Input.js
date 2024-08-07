import { useFormikContext } from "formik";
import { get } from "lodash";

const Input = ({ label, name, type= "text", ...props }) => {

  const { setFieldValue, touched, errors, handleBlur, values } = useFormikContext()

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  const hasError = touched[name] && errors[name];

  return (
    <div>
      <label
        htmlFor={name}
        className={`d-block text-black-50 ${hasError ? "text-danger" : ""}`}
      >
        {hasError ? errors[name] : label}
      </label>
      <input
        {...props}
        value={get(values, name, undefined)}
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-control mt-1 w-100 ${hasError ? "is-invalid" : ""}`}
      />
    </div>
  );
};

export default Input;
