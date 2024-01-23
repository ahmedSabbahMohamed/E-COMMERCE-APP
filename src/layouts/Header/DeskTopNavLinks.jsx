import NavLinks from "../../components/ui/NavLinks"
import { Link } from "react-router-dom";
import links from "../../data/navData.json";

function DeskTopNavLinks() {
  return (
    <NavLinks
      navLinks={links.desktopNavbar.map((link) => {
        return (
          <li key={link.id}>
            <Link className="btn" to={link.href}>
              {link.link}
            </Link>
          </li>
        );
      })}
      navStyle={"d-none d-lg-flex align-items-center gap-4"}
      ulStyles={"list-unstyled d-flex gap-4 align-items-center mb-0"}
      liStyles={"text-decoration-none text-black"}
    />
  );
}

export default DeskTopNavLinks;
