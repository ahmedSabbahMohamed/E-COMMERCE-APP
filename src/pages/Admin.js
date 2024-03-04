import { Col, Row } from "react-bootstrap";
import { Sidebar } from "../features/contentManagement"
import { Outlet } from "react-router-dom";

function Admin() {

  return (
    <Row className="m-0 min-vh-100">
      <Sidebar />
      <Col className="container mb-5">
        <Outlet />
      </Col>
    </Row>
  );
}

export default Admin