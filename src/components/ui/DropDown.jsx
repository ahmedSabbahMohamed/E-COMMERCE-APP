import { Link } from "react-router-dom";
import links from "../../data/navData.json"

function DropDown() {
  return (
    <div className="dropdown">
      <button
        className="btn border-0 text-white fw-bold dropdown-toggle"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Categories
      </button>

      <div className="dropdown-menu shadow border-0" aria-labelledby="dropdownMenuLink">
        {
          links.categories.map(category => {
            return (
              <Link className="dropdown-item" to={category.href} key={category.id}>
                {category.link}
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}

export default DropDown