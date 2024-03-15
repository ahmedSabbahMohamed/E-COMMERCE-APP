import { useFormikContext } from "formik";
import { get } from "lodash";
import { useLocation } from "react-router-dom";

const Input = ({ label, name, type= "text", ...props }) => {
  const location = useLocation()

  const { setFieldValue, touched, errors, handleBlur, values } = useFormikContext()

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  const hasError = touched[name] && errors[name];

  return (
    <div>
      <label
        htmlFor={name}
        className={`d-block ${hasError ? "text-danger" : ""}`}
      >
        {hasError ? errors[name] : label}
      </label>
      <input
        {...props}
        value={
          location.pathname === "/add-category"
            ? ""
            : get(values, name, undefined)
        }
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-control mt-1 ${hasError ? "is-invalid" : ""}`}
      />
    </div>
  );
};

export default Input;
