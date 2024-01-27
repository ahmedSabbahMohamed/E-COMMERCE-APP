import { useFormikContext } from "formik";

const Input = ({ label, name, ...props }) => {
  const { errors, touched } = useFormikContext();

  console.log(touched)

  return (
    <div className="form-group">

      <label
        htmlFor={name}
        className={`d-block ${errors[name] && touched[name] ? "text-danger" : ""}`}
      >
        {errors[name] && touched[name] ? errors[name] : label}
      </label>

      <input
        {...props}
        className={`form-control mt-1 ${errors[name] && touched[name] ? "is-invalid" : ""}`}
      />

    </div>
  );
}

export default Input