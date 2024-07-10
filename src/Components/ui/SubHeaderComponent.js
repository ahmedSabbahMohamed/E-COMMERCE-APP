import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import CustomModal from "./CustomModal";
import { TbReload } from "react-icons/tb";
import { Button } from "react-bootstrap";

function SubHeaderComponent({ triggerText, heading, modalBody, queryString }) {
  const queryClient = useQueryClient();
  return (
    <div className="d-flex justify-content-end w-100 gap-2">
      <Button
        onClick={() => queryClient.invalidateQueries(queryString)}
        variant="outline-secondary"
      >
        <TbReload size={"20px"} />
      </Button>
      <CustomModal
        triggerText={triggerText}
        variant={"outline-primary"}
        heading={heading}
        body={modalBody}
      />
    </div>
  );
}

export default SubHeaderComponent;
