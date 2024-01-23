import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import formImg from "../assets/images/formImg.jpg"

function FormContainer({form, authType}) {
  return (
    <Container className="mt-5 mb-3">
      <Row className="rounded mx-2 shadow overflow-hidden">
        <Col className="p-0" sm={12} md={4}>
          <img className="w-100 h-100" src={formImg} alt="form" />
        </Col>
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