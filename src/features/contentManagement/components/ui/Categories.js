import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table } from "react-bootstrap";
import { API } from "../../../../api";
import { useState } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";

function Categories() {
  const [categoryId, setCategoryId] = useState(null);

  const query = useQueryClient()

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get("/admin/categories"),
  });

  let deleteProductDialog = document.getElementById("delete-dialog");

  const deleteProduct = (id) => {
    deleteProductDialog.classList.remove("d-none");
    deleteProductDialog.classList.add("d-flex");
    setCategoryId(id);
  };

  const cancelDeleteProduct = () => {
    deleteProductDialog.classList.remove("d-flex");
    deleteProductDialog.classList.add("d-none");
  };

  const confirmDeleteProduct = () => {
    API.delete(`/admin/category/${categoryId}`)
      .then((res) => {
        swal(res?.data?.message);
        query.invalidateQueries("categories");
      })
      .catch((err) => swal(err?.response?.data?.message || "error"))
      .finally(() => {
        deleteProductDialog.classList.remove("d-flex");
        deleteProductDialog.classList.add("d-none");
      });
  };

  return (
    <>
      <h2 className="text-success fw-bold h2 p-4">All categories</h2>
      <Table bordered responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Category image</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data?.map((category, index) => (
            <tr key={category?.id}>
              <td>{index + 1}</td>
              <td>{category?.name}</td>
              <td>
                <img
                  className="img-fluid"
                  style={{ height: "70px" }}
                  src={category?.picture}
                />
              </td>
              <td className="d-flex gap-2 flex-md-row flex-column">
                <Button
                  id={category?.id}
                  onClick={() => deleteProduct(category?.id)}
                  variant="danger"
                >
                  Delete
                </Button>
                <Button variant="primary">
                  <Link
                    className="btn btn-primary"
                    to={`/edit-category/${category?.id}`}
                  >
                    Edit
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <dialog
        className="d-none align-items-center justify-content-center"
        id="delete-dialog"
        style={{
          backgroundColor: "#00000085",
          top: "0px",
          left: "0px",
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="bg-light p-3 rounded">
          <p className="text-dark fw-bold">
            Are you sure you want to delete this category
          </p>
          <div className="d-flex gap-2">
            <Button onClick={confirmDeleteProduct} variant="danger">
              Yes, delete
            </Button>
            <Button onClick={cancelDeleteProduct} variant="dark">
              No, cancel
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Categories;
