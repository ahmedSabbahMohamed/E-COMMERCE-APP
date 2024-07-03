import { useQuery } from "@tanstack/react-query";
import { API } from "../../api";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import useDeleteItem from "../../hooks/DeleteItem";
import { showDeleteConfirm } from "../../actions/events";
import { Case, Default, Switch } from "react-if";
import Loading from "../../components/ui/Loading";
import CustomDataTable from "../../components/ui/CustomDataTable";
import { Button, Container } from "react-bootstrap";
import {
  customStyles,
  productsTableCols,
} from "../../features/contentManagement/helpers";
import CustomModal from "../../components/ui/CustomModal";
import AddEditProductForm from "../../features/contentManagement/components/form/AddEditProductForm";

function Products() {
  const deleteProduct = useDeleteItem();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["prodcuts"],
    queryFn: () => API.get("/admin/products"),
  });

  const addNewProduct = <CustomModal triggerText="Add New Product" heading={"Add New Product"} body={<AddEditProductForm />} />

  console.log(isLoading, isError, error);

  return (
    <Switch>
      <Case condition={isLoading || isError}>
        <Loading queryString={"products"} />
      </Case>
      <Case
        condition={products?.data?.data && products?.data?.data.length !== 0}
      >
        <Container className="px-2 rounded overflow-hidden">
          <CustomDataTable
            title={"Products"}
            columns={productsTableCols}
            data={products?.data?.data}
            customStyles={customStyles}
            subHeader={true}
            subHeaderComponent={addNewProduct}
          />
        </Container>
      </Case>
      <Default>
        <div className="d-flex gap-2 flex-column align-items-center justify-content-center">
          <h2 className="text-center text-danger">No Products Found</h2>
          {addNewProduct}
        </div>
      </Default>
    </Switch>
  );
}

export default Products;
