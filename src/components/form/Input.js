import { useFormikContext } from "formik";

const Input = ({ label, name, type= "text", ...props }) => {

  const { setFieldValue, touched, errors, handleBlur } = useFormikContext()

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
