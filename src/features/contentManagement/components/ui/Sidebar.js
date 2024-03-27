import React from "react";
import { Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../../assets/styles/Sidebar.css";

function Sidebar() {
  const adminSidebarLinks = [
    { id: 1, href: "/", text: "All categories" },
    { id: 2, href: "/add-category", text: "Add new category" },
    { id: 3, href: "/products", text: "All products" },
    { id: 4, href: "/add-product", text: "Add new product" },
  ];

  const admin = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  return (
    <Col sm={12} md={3} className="shadow sidebar p-0">
      <aside>
        <div className="sidebar-header">
          <p className="text-secondary fw-bold ps-3 py-3 fs-5 border-bottom d-none d-sm-block">
            Welcome,
            <br />
            {admin.name}
          </p>
        </div>
        <ul className="d-flex gap-3 flex-md-column list-unstyled sidebar-links">
          {adminSidebarLinks.map((link) => (
            <li className="nav-item" key={link.id}>
              <Link
                to={link.href}
                className={`nav-link p-2 text-decoration-none sidebar-link ${
                  location.pathname === link.href ? "active" : ""
                }`}
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
