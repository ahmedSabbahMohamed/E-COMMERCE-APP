import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/Sidebar.css";

function Sidebar() {
  const adminSidebarLinks = [
    { id: 1, href: "/categories", text: "All categories" },
    { id: 2, href: "/add-category", text: "Add new category" },
    { id: 3, href: "/", text: "All products" },
    { id: 4, href: "/add-product", text: "Add new product" },
  ];

  const admin = JSON.parse(localStorage.getItem("user"));

  const handleClick = (e) => {
    let route = document.querySelectorAll(".sidebar aside ul li a")
    route.forEach(ele => {
      ele.classList.remove("active")
    })
    e.currentTarget.classList.add("active")
  }

  return (
    <Col sm={12} md={3} className="shadow sidebar p-4">
      <aside>
        <p className="text-secondary fw-bold d-none d-md-block">
          Welcome,
          <br />
          {admin.name}
        </p>
        <ul className="d-flex flex-row flex-wrap flex-md-column gap-3 list-unstyled mb-0">
          {adminSidebarLinks.map((link) => (
            <li key={link.id}>
              <Link
                onClick={handleClick}
                to={link.href}
                className="text-decoration-none fw-bold p-2 rounded"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </Col>
  );
}

export default Sidebar;
