import { IoMdEye } from "react-icons/io";
import CustomModal from "../../Components/ui/CustomModal";
import ImageViewer from "../../Components/ui/ImageViewer";

export const ordersListCols = (setSearch, setFilterKey) => [
  {
    name: "ID",
    selector: (_, index) => index + 1,
    maxWidth: "70px",
  },
  {
    name: (
      <div className="d-flex flex-column gap-1 align-items-center justify-content-center">
        <p className="m-0 p-0">Order Name</p>
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
    name: (
      <div className="d-flex flex-column gap-1 align-items-center justify-content-center">
        <p className="m-0 p-0">Date</p>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setFilterKey("date");
          }}
          className="form-control form m-0 py-0 px-1 shadow-none w-75"
          style={{ height: "20px" }}
          type="text"
        />
      </div>
    ),
    selector: (row) => row?.date,
    minWidth: "100px",
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
