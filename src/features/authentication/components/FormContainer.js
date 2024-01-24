import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../assets/styles/FormContainer.css"

function FormContainer({form, authType}) {
  return (
    <Container className="form-container mt-5">
      <Row className="rounded mx-2 shadow overflow-hidden">
        <Col className="p-0 form-img" sm={12} md={4}></Col>
        <Col className="py-4" sm={12} md={8}>
          <Row className="">
            <Col>
              <h2 className="pb-3 text-center">{authType}</h2>
              {form}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer