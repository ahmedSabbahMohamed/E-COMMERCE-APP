import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import links from "../../data/navData.json";

function DeskTopNavLinks() {
  return (
    <NavLinks
      navLinks={links.desktopNavbar.map((link) => {
        return (
          <li key={link.id}>
            <Link className="btn text-white fw-bold" to={link.href}>
              {link.link}
            </Link>
          </li>
        );
      })}
      navStyle={"d-none d-md-flex rounded-pill p-1 desktop-nav-style"}
      ulStyles={"list-unstyled d-flex gap-1 align-items-center mb-0"}
    />
  );
}

export default DeskTopNavLinks;
