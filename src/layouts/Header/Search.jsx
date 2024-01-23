// import { Col, Row } from "react-bootstrap";
import { MdSearch } from "react-icons/md";

function Search() {
  return (
      <div className="d-flex border-black border rounded-pill align-items-center overflow-hidden p-1">
        <div className="ps-2">
          <MdSearch />
        </div>
        <div>
          <input className="form-control border-0 shadow-none" placeholder="Search for product..." />
        </div>
      </div>
  );
}

export default Search;
