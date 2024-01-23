import { useField } from "formik";
// import PropTypes from 'prop-types'

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="form-group">
      <label className={`w-100 d-block ${meta.touched && meta.error ? "text-danger" : ""}`} htmlFor={props.id || props.name}>
        {meta.touched && meta.error ? meta.error : label}
        <input
          {...field}
          {...props}
          className={`form-control mt-1 ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
        />
      </label>
    </div>
  );
}

export default Input