import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { closeModal } from "../../Helpers";
import { API } from "../../Api";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { toast } from "react-toastify";

const DeleteConfirmation = ({ url, name, queryString }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = () => {
    setIsSubmit(true);
    API.delete(url)
      .then(() => {
        toast.success(`${name} deleted successfully`);
        queryClient.invalidateQueries(queryString);
        closeModal();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || `Faild to delete ${name}`);
      })
      .finally(() => setIsSubmit(false));
  };

  return (
    <div>
      <p>Are your sure you want to delete this {name}</p>
      <div className="d-flex gap-2 align-items-center justify-content-end">
        <Button onClick={closeModal} variant="outline-secondary" size="lg">
          No
        </Button>
        <Button
          onClick={handleDelete}
          disabled={isSubmit}
          variant="outline-danger"
          size="lg"
        >
          {isSubmit ? <Spin /> : "Yes"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
