import { useFormikContext } from 'formik';
import React from 'react'

function ImageHandler( { name, label }) {

    const { setFieldValue, touched, errors, handleBlur } = useFormikContext();
    const handleChange = (e) => {
      console.log(e.target.files)
        setFieldValue(name, e.target.files[0])
    }
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
        type="file"
        multiple
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-control mt-1 ${hasError ? "is-invalid" : ""}`}
      />
    </div>
  );
}

export default ImageHandler