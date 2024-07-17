import React from "react";
import ImageViewer from "../../../Components/ui/ImageViewer";
import { truncateDescription } from "../../../Helpers/commonUtils";
import { Table } from "react-bootstrap";

function CategoryProductsTable({ headRows = [], tableRows = [] }) {
  return (
    <Table bordered hover size="lg" responsive>
      <thead>
        <tr>
          <th>#</th>
          {headRows.map((cell, index) => (
            <th key={index}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((cell, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{cell?.name}</td>
            <td><ImageViewer width="4rem" height="4rem" imgs={[{path: cell?.picture}]} /></td>
            <td>{cell?.price}</td>
            <td>{truncateDescription(cell?.description)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CategoryProductsTable;
