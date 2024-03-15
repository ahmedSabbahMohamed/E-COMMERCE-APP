import { useFormikContext } from "formik";
import { IoMdCloudUpload } from "react-icons/io";
import "../../assets/styles/ImageHandler.css";
import { useLocation } from "react-router-dom";

function ImageHandler({ name, label }) {
  const location = useLocation()
  
  const { values, setFieldValue, touched, errors, handleBlur } = useFormikContext();
  // location.pathname === "/add-category"? console.log(values) : ""
  const handleChange = (e) => {
    setFieldValue(name, e.target.files[0]);
  };
  const handleDelete = () => {
    setFieldValue(name, null);
  };
  const hasError = touched[name] && errors[name];

  const file = values && values[name] ? values[name] : null;

  let imageUrl = null;
  if (file instanceof File) {
    imageUrl = URL.createObjectURL(file);
  }

  return (
    <div className="position-relative">
      <label
        htmlFor={name}
        className={`d-block ${hasError ? "text-danger" : ""}`}
      >
        {hasError ? errors[name] : label}
      </label>

      <label
        className="image rounded overflow-hidden mt-2"
        htmlFor={name}
        style={{
          display: "inline-block",
          cursor: "pointer",
          width: "200px",
          height: "100px",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="uploaded image"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : values?.picture && location.pathname !== "/add-category" ? (
          <img
            src={values?.picture}
            alt="uploaded image"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <div className="w-100 h-100 fs-1 d-flex justify-content-center align-items-center">
            <IoMdCloudUpload />
          </div>
        )}
      </label>
      {imageUrl ? (
        <button
          className="btn btn-danger btn-small mt-2 position-absolute"
          style={{ left: "180px" }}
          onClick={handleDelete}
        >
          delete
        </button>
      ) : null}
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
