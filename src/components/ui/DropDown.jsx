function DropDown() {
  return (
    <div className="dropdown">
      <a
        className="btn text-black dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Categories
      </a>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item" href="#">
          one
        </a>
        <a className="dropdown-item" href="#">
          two
        </a>
        <a className="dropdown-item" href="#">
          three
        </a>
      </div>
    </div>
  );
}

export default DropDown