import CustomModal from "../../Components/ui/CustomModal";
import { IoMdEye } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddCategoryForm from "./components/AddCategoryForm";
import DeleteConfirmation from "../../Components/ui/DeleteConfirmation";
import ImageViewer from "../../Components/ui/ImageViewer";
import { Table } from "antd";
import { truncateDescription } from "../../Helpers";

export const categoryListCols = (setSearch) => [
  {
    name: "ID",
    selector: (_, index) => index + 1,
    maxWidth: "70px",
  },
  {
    name: "Category Products",
    selector: (row) => (
      <CustomModal
        triggerText="products"
        variant="outline-success"
        heading={row?.name + " Category"}
        body={
          <div className="overflow-auto">
            <Table
              responsive
              dataSource={row?.products}
              columns={categoryProductscols}
              pagination={false}
            />
          </div>
        }
      />
    ),
    center: true,
    width: "200px",
  },
  {
    name: (
      <div className="d-flex flex-column gap-1 align-items-center justify-content-center">
        <p className="m-0 p-0">Category Name</p>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="form-control form m-0 py-0 px-1 shadow-none w-75"
          style={{ height: "20px" }}
          type="text"
        />
      </div>
    ),
    selector: (row) => row.name,
    minWidth: "200px",
    center: "true",
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
          heading={"Edit Category"}
          body={<AddCategoryForm edit={true} id={row?.id} />}
        />
        <CustomModal
          triggerText={<RiDeleteBin6Line size={"1rem"} />}
          heading={"Delete Category"}
          body={
            <DeleteConfirmation
              name={"Category"}
              queryString={"categories"}
              url={`/admin/category/${row?.id}`}
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
        body={<ImageViewer imgs={row?.images} />}
        className={
          "rounded-pill d-flex align-items-center justify-content-center"
        }
        style={{ width: "2rem", height: "2rem", padding: "0" }}
      />
    ),
    maxWidth: "90px",
  },
];

const categoryProductscols = [
  { title: "ID", render: (_, __, index) => index + 1 },
  { title: "Product Name", dataIndex: "name" },
  { title: "Price", dataIndex: "price" },
  {
    title: "Product Desc",
    dataIndex: "description",
    render: (desc) => truncateDescription(desc),
  },
  {
    title: "Product Picture",
    dataIndex: "picture",
    render: (img) => (
      <ImageViewer width="4rem" height="4rem" imgs={[{ path: img }]} />
    ),
  },
];
