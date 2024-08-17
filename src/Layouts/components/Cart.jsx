import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const { count } = useSelector((state) => state.cartSlice);

  return (
    <>
      <Link
        to={"/cart"}
        className="position-relative pe-2"
        style={{ cursor: "pointer" }}
      >
        <IoCartOutline size={25} color="white" />
        {count !== 0 && (
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
            {count}
          </span>
        )}
      </Link>
    </>
  );
}

export default Cart;
