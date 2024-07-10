// import { Button, Popover } from "antd";
// import { FiEdit2 } from "react-icons/fi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { CiMenuKebab } from "react-icons/ci";
// import CustomModal from "../../components/ui/CustomModal";
// import AddCategoryForm from "./components/form/AddCategoryForm";
// import DeleteConfirmation from "./components/ui/DeleteConfirmation";
// import { IoMdEye } from "react-icons/io";
// import ViewImages from "./components/ui/ViewImages";

// const categoriesTableCols = [
//   {
//     name: "ID",
//     selector: (_, index) => index + 1,
//     width: "50px",
//   },
//   {
//     name: "Images",
//     cell: (row, index) => (
//       <CustomModal
//         triggerText={<IoMdEye />}
//         variant="outline-secondary"
//         heading={`View ${row?.name} Images`}
//         body={<ViewImages imgs={row?.images} />}
//         className={
//           "rounded-pill d-flex align-items-center justify-content-center"
//         }
//         style={{ width: "2rem", height: "2rem", padding: "0" }}
//       />
//     ),
//     width: "100px",
//   },
//   {
//     name: "Category Name",
//     selector: (row) => row.name,
//     // width: "250px"
//   },
//   {
//     name: "Options",
//     cell: (row) => (
//       <div className="d-flex gap-2">
//         <CustomModal
//           triggerText={<FiEdit2 size={"1rem"} />}
//           className={
//             "rounded-pill d-flex align-items-center justify-content-center"
//           }
//           style={{ width: "2rem", height: "2rem", padding: "0" }}
//           heading={"Edit Category"}
//           body={<AddCategoryForm edit={true} id={row?.id} />}
//         />

//         <CustomModal
//           triggerText={<RiDeleteBin6Line size={"1rem"} />}
//           heading={"Delete Confirmation"}
//           body={
//             <DeleteConfirmation
//               name={"Category"}
//               queryString={"categories"}
//               url={`/admin/category/${row?.id}`}
//             />
//           }
//           variant="outline-danger"
//           className={
//             "rounded-pill d-flex align-items-center justify-content-center"
//           }
//           style={{ width: "2rem", height: "2rem", padding: "0" }}
//         />

//         {/* <Popover content={content} placement="bottomRight">
//           <Button
//             className="btn btn-outline-dark d-flex align-items-center justify-content-center"
//             shape="circle"
//             icon={<CiMenuKebab />}
//             onClick={() => console.log(row?.id)}
//           />
//         </Popover> */}
//       </div>
//     ),
//     // width: "200px",
//   },
// ];

// const productsTableCols = [
//   {
//     name: "ID",
//     selector: (row) => row.id,
//   },
//   {
//     name: "Product Name",
//     selector: (row) => row.name,
//   },
//   {
//     name: "Options",
//   },
// ];

// const customStyles = {
//   rows: {
//     style: {
//       fontSize: "1rem",
//       borderBottom: "none",
//     },
//   },
//   headCells: {
//     style: {
//       fontSize: "1rem",
//       fontWeight: "bold",
//       color: "white",
//       backgroundColor: "#171f46",
//       borderLeft: "1px solid white",
//     },
//   },
//   pagination: {
//     style: {
//       display: "flex",
//       justifyContent: "end",
//       marginLeft: "auto",
//       width: "fit-content",
//       alignItems: "center",
//       padding: ".4rem",
//       border: "1px solid #171f46",
//       borderRadius: "9999px",
//       marginTop: "1rem",
//       color: "#171f46",
//       fontWeight: "bold",
//     },
//     pageButtonsStyle: {
//       cursor: "pointer",
//       margin: "0 0.25rem",
//       transition:
//         "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out",
//       "&:hover": {
//         color: "#0056b3",
//         backgroundColor: "#e9ecef",
//         borderColor: "#dee2e6",
//       },
//       "&:disabled": {
//         color: "#6c757d",
//         backgroundColor: "#fff",
//         borderColor: "#dee2e6",
//         cursor: "not-allowed",
//       },
//       "&:focus": {
//         outline: "none",
//         boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
//       },
//     },
//     pageButtonActiveStyle: {
//       color: "#fff",
//       backgroundColor: "#007bff",
//       borderColor: "#007bff",
//     },
//   },
//   subHeader: {
//     style: {
//       padding: "10px 15px",
//       color: "red",
//     },
//   },
// };

// export { categoriesTableCols, productsTableCols, customStyles };
