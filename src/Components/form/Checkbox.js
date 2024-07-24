import { useFormikContext } from "formik";
import { get } from "lodash";

const Checkbox = ({ label, name, ...props }) => {
  const { setFieldValue, touched, errors, handleBlur, values } =
    useFormikContext();

  const handleChange = (e) => {
    setFieldValue(name, e.target.checked);
  };

  const hasError = touched[name] && errors[name];

  return (
    <div>
      <label
        htmlFor={name}
        className={`d-block text-black-50 ${hasError ? "text-danger" : ""}`}
      >
        {label}
      </label>
      <input
        {...props}
        checked={get(values, name, false)}
        name={name}
        type="checkbox"
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-check-input ${hasError ? "is-invalid" : ""}`}
      />
      {hasError && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
};

export default Checkbox;
