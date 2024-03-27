import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API } from "../../../../api"
import { IoEye } from "react-icons/io5";
import swal from 'sweetalert'
import ProductModal from './ProductModal'
import ProductCard from '../../../../components/ui/ProductCard'

function Products() {
  // a;sdlfaskd

  const [productId, setProductId] = useState('')
  const [modalShow, setModalShow] = React.useState(false);
  const [productData, setProductData] = useState({})
  const query = useQueryClient()

      const { data: products } = useQuery({
        queryKey: ["prodcut id"],
        queryFn: () => API.get("/admin/products"),
      });

  let deleteProductDialog = document.getElementById("delete-dialog");

  const deleteProduct = (id) => {
    deleteProductDialog.classList.remove("d-none")
    deleteProductDialog.classList.add("d-flex");
    setProductId(id);
  }

  const cancelDeleteProduct = () => {
    deleteProductDialog.classList.remove("d-flex")
    deleteProductDialog.classList.add("d-none")
  }

  const confirmDeleteProduct = () => {
    API.delete(`/admin/product/${productId}`)
      .then((res) => {
        swal(res?.data?.message);
        query.invalidateQueries("prodcut id");
      })
      .catch((err) => swal(err?.response?.data?.message || "error"))
      .finally(() => {
        deleteProductDialog.classList.remove("d-flex");
        deleteProductDialog.classList.add("d-none");
      });
  };

  const viewProduct = (id) => {
    setProductId(id)
    setModalShow(true);
  }

  useEffect(() => {
    {productId &&
      API.get(`/admin/product/${productId}`).then(res => setProductData(res?.data?.data))}
  }, [productId])

  return (
    <>
      <h2 className="text-success fw-bold h2 p-4">Products page</h2>
      <Table bordered responsive hover className="m-0 p-0">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Discription</th>
            <th>Price</th>
            <th>View</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products?.data?.data?.map((product, index) => (
            <tr key={index} className="" style={{ fontWeight: "bold" }}>
              <td>{index + 1}</td>
              <td>{product?.name}</td>
              <td>{`${product?.description?.slice(
                0,
                40
              )}...`}</td>
              <td>{product?.price}</td>
              <td>
                <Button onClick={() => viewProduct(product?.id)} variant="">
                  <IoEye />
                </Button>
              </td>
              <td className="d-flex gap-2 flex-md-row flex-column align-items-center justify-content-center">
                <Button
                  onClick={() => deleteProduct(product?.id)}
                  id={product?.id}
                  variant="outline-danger"
                >
                  Delete
                </Button>
                <Link
                  className="btn btn-outline-primary"
                  to={`/edit-product/${product?.id}`}
                >
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

      <ProductModal
        heading={"Product name"}
        body={
          productData && (
            <ProductCard
              img={productData?.picture}
              name={productData?.name}
              text={productData?.description}
            />
          )
        }
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Products