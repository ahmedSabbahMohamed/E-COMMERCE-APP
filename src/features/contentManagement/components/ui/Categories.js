import { Button, Table } from "react-bootstrap";

function Categories() {

  return (
    <>
      <h2 className="text-success fw-bold h2 p-4">All categories</h2>
      <Table striped bordered responsive className="m-0 p-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.desc}</td>
              <td className="d-flex gap-2 flex-md-row flex-column">
                <Button variant="danger">Delete</Button>
                <Button variant="primary">Edit</Button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
}

export default Categories