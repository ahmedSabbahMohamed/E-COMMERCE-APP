import { useFormikContext } from "formik";

function ImageHandler({ name, label }) {
  const { values, setFieldValue, touched, errors, handleBlur } =
    useFormikContext();
  const handleChange = (e) => {
    setFieldValue(name, e.target.files[0]);
  };
  const hasError = touched[name] && errors[name];

  // console.log("values:", values);
  // console.log("values[name]:", values && values[name]);

  const file = values && values[name] ? values[name] : null;

  // console.log("file:", file);

  let imageUrl = null;
  if (file instanceof File) {
    imageUrl = URL.createObjectURL(file);
    // console.log("imageUrl:", imageUrl);
  }

  return (
    <div>
      <label
        htmlFor={name}
        className={`d-block ${hasError ? "text-danger" : ""}`}
      >
        {hasError ? errors[name] : label}
      </label>
      <label
        htmlFor={name}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="uploaded image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "50%",
              marginTop: "30px",
            }}
          />
        ) : (
          <img
            src={values?.picture}
            alt="uploaded image"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginTop: "30px",
            }}
          />
        )}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ImageHandler;
