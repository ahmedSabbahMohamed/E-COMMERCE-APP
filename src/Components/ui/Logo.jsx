import { Link } from "react-router-dom";
import logo from "../../Assets/images/logo.png";

function Logo() {
  return (
    <div>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
}

export default Logo;
