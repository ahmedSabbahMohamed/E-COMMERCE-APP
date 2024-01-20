import { Link } from "react-router-dom";

function Signin() {

  const inputStyle = "d-block rounded border-1 border-secondary p-2 mt-2 w-100",
  labelStyle = "d-block text-secondary"

  return (
    <div className="container mt-5">
      <form className="rounded shadow bg-white p-4 mx-auto">
        <h2 className="text-center mb-5">Login</h2>
        <div className="d-flex flex-column gap-3">
          <label className={labelStyle} htmlFor="email">
            Email:
            <input
              className={inputStyle}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </label>
          <label className={labelStyle} htmlFor="password">
            Password:
            <input
              className={inputStyle}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </label>
          <input
            className="btn btn-primary rounded block"
            type="submit"
            value="Login"
          />
          <p className="text-secondary text-center">
            Don't have an Account?
            <Link className="text-decoration-none text-primary" to={"/register"}>
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin