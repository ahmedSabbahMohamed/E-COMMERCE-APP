import { IoMdEye } from "react-icons/io";
import CustomModal from "../../Components/ui/CustomModal";
import ImageViewer from "../../Components/ui/ImageViewer";
import { FiEdit2 } from "react-icons/fi";
import AddProduct from "./components/AddProduct";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "../../Components/ui/DeleteConfirmation";
import { truncateText } from "../../Helpers";

export const productListCols = (setSearch, setFilterKey) => [
  {
    name: "ID",
    selector: (_, index) => index + 1,
    maxWidth: "70px",
  },
  {
    name: (
      <div className="d-flex flex-column gap-1 align-items-center justify-content-center">
        <p className="m-0 p-0">Product Name</p>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setFilterKey("name");
          }}
          className="form-control form m-0 py-0 px-1 shadow-none w-75"
          style={{ height: "20px" }}
          type="text"
        />
      </div>
    ),
    selector: (row) => row?.name,
    minWidth: "200px",
    center: "true",
  },
  {
    name: (
      <div className="d-flex flex-column gap-1 align-items-center justify-content-center">
        <p className="m-0 p-0">Price</p>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setFilterKey("price");
          }}
          className="form-control form m-0 py-0 px-1 shadow-none w-75"
          style={{ height: "20px" }}
          type="text"
        />
      </div>
    ),
    selector: (row) => row?.price,
    minWidth: "100px",
    center: "true",
  },
  {
    name: "Description",
    selector: (row) => truncateText(row?.description),
    minWidth: "250px",
    center: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="d-flex gap-2">
        <CustomModal
          triggerText={<FiEdit2 size={"1rem"} />}
          className={
            "rounded-pill d-flex align-items-center justify-content-center"
          }
          style={{ width: "2rem", height: "2rem", padding: "0" }}
          heading={"Edit Product"}
          body={<AddProduct edit={true} id={row?.id} />}
        />
        <CustomModal
          triggerText={<RiDeleteBin6Line size={"1rem"} />}
          heading={"Delete Product"}
          body={
            <DeleteConfirmation
              name={"Product"}
              queryString={"products"}
              url={`/admin/product/${row?.id}`}
            />
          }
          variant="outline-danger"
          className={
            "rounded-pill d-flex align-items-center justify-content-center"
          }
          style={{ width: "2rem", height: "2rem", padding: "0" }}
        />
      </div>
    ),
    minWidth: "150px",
    center: "true",
  },
  {
    name: "Images",
    cell: (row) => (
      <CustomModal
        triggerText={<IoMdEye />}
        variant="outline-secondary"
        heading={`View ${row?.name} Images`}
        body={
          <ImageViewer
            imgs={row?.images ? row?.images : [{ path: row?.picture }]}
          />
        }
        className={
          "rounded-pill d-flex align-items-center justify-content-center"
        }
        style={{ width: "2rem", height: "2rem", padding: "0" }}
      />
    ),
    maxWidth: "90px",
    center: true,
  },
];
