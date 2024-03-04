import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Products() {

  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res))
      .catch(err => console.log(err))
  }, [])

  let deleteProductDialog = document.getElementById("delete-dialog");

  const deleteProduct = (e) => {
    deleteProductDialog.classList.remove("d-none")
    deleteProductDialog.classList.add("d-flex");
    setProductId(e.currentTarget.getAttribute("id"));
  }

  const cancelDeleteProduct = () => {
    deleteProductDialog.classList.remove("d-flex")
    deleteProductDialog.classList.add("d-none")
  }

   const confirmDeleteProduct = () => {
    deleteProductDialog.classList.remove("d-flex");
    deleteProductDialog.classList.add("d-none")
   }

  return (
    <>
      <h2 className="text-success fw-bold h2 p-4">Products page</h2>
      <Table striped bordered responsive className="m-0 p-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tittle</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="d-flex gap-2 flex-md-row flex-column">
                <Button
                  onClick={deleteProduct}
                  id={product.id}
                  variant="danger"
                >
                  Delete
                </Button>
                <Link className="btn btn-primary" to={`/edit_product/${product.id}`}>
                  Edit
                </Link>
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
            Are you sure you want to delete this product
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

export default Products