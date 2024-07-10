import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal = ({
  show = false,
  onHide,
  variant = "outline-primary",
  triggerText = "+  Add",
  heading,
  body,
  ...rest
}) => {
  const [modalShow, setModalShow] = useState(show);

  const handleShow = () => setModalShow(true);
  const handleHide = () => {
    setModalShow(false);
    if (onHide) onHide();
  };

  return (
    <>
      <Button variant={variant} onClick={handleShow} {...rest}>
        {triggerText}
      </Button>

      <Modal
        show={modalShow}
        onHide={handleHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
