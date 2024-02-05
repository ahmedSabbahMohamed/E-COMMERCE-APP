import { useFormikContext } from "formik";

const Input = ({ label, name, ...props }) => {
  const { errors, setFieldValue } = useFormikContext();

  return (
    <div className="form-group">

      <label
        htmlFor={name}
        className={`d-block ${errors[name] ? "text-danger" : ""}`}
      >
        {errors[name] ? errors[name] : label}
      </label>

      <input
        {...props}
        onChange={(e) => setFieldValue(name, e.target.value)}
        name={name}
        className={`form-control mt-1 ${errors[name] ? "is-invalid" : ""}`}
      />

    </div>
  );
}

export default Input