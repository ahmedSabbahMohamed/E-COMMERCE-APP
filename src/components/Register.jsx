import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"

function Register() {

  const inputStyle = "d-block rounded border-1 border-secondary p-2 mt-2 w-100",
    labelStyle = "d-block text-secondary",
    errorLabel = "d-block text-danger"
    
    // form logic
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(2, "name is so short"),
        email: Yup.string().matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email format"
        )
        .required("email is required"),
        password: Yup.string()
          .required("password is required")
          .min(8, "Password must me at least 8 digits")
      }),
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div className="container mt-5">
      <form
        onSubmit={formik.handleSubmit}
        className="rounded shadow bg-white p-4 mx-auto"
      >
        <h2 className="text-center mb-5">Signup</h2>
        <div className="d-flex flex-column gap-3">
          <label
            className={
              formik.errors.name && formik.touched.name
                ? errorLabel
                : labelStyle
            }
            htmlFor="name"
          >
            {formik.touched.name && formik.errors.name
              ? formik.errors.name
              : "Name:"}
            <input
              className={inputStyle}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          <label
            className={
              formik.errors.email && formik.touched.email
                ? errorLabel
                : labelStyle
            }
            htmlFor="email"
          >
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email:"}
            <input
              className={inputStyle}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          <label
            className={
              formik.errors.password && formik.touched.password
                ? errorLabel
                : labelStyle
            }
            htmlFor="password"
          >
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Password:"}
            <input
              className={inputStyle}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          <input
            className="btn btn-primary rounded block"
            type="submit"
            value="Create account"
          />
          <p className="text-secondary text-center">
            Already have an account?
            <Link className="text-decoration-none text-primary" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register