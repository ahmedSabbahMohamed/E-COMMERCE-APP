import React from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../../api";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDeleteItem from "../../../../hooks/DeleteItem";
import { useNavigate } from "react-router-dom";
import { showDeleteConfirm } from "../../../../actions/events";
import { Case, Switch } from "react-if";
import Loading from "../../../../components/ui/Loading";
import DataTable from "react-data-table-component";

function Categories() {
  const deleteCategory = useDeleteItem();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get("/admin/categories"),
  });

  const tableCols = [
    {
      name: "ID"
    },
    {
      name: "Category"
    }
  ];

  const tableData = data?.data?.data;

  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //     render: (text, record, index) => index + 1,
  //     width: 65,
  //   },
  //   {
  //     title: "Category",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Category Image",
  //     dataIndex: "picture",
  //     key: "picture",
  //     render: (img, record) => (
  //       <div key={record.id} style={{ display: "flex", alignItems: "center" }}>
  //         <img
  //           style={{
  //             maxWidth: "100px",
  //             maxHeight: "100px",
  //             borderRadius: "5px",
  //           }}
  //           src={img}
  //           alt="Category"
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="small">
  //         <Tooltip title="edit">
  //           <Button
  //             className="btn btn-outline-primary d-flex align-items-center justify-content-center"
  //             type="primary"
  //             shape="circle"
  //             icon={<FiEdit2 />}
  //             onClick={() => navigate(`/edit-category/${record?.id}`)}
  //           />
  //         </Tooltip>
  //         <Tooltip title="delete">
  //           <Button
  //             className="btn btn-outline-danger d-flex align-items-center justify-content-center"
  //             type="danger"
  //             shape="circle"
  //             icon={<RiDeleteBin6Line />}
  //             onClick={() =>
  //               showDeleteConfirm(
  //                 record?.id,
  //                 deleteCategory,
  //                 "category",
  //                 "categories"
  //               )
  //             }
  //           />
  //         </Tooltip>
  //       </Space>
  //     ),
  //   },
  // ];

  return (
    <Switch>
      <Case condition={isLoading}>
        <Loading queryString={"categories"} />
      </Case>
      <Case condition={data}>
        {/* <Table
          className="container"
          bordered
          virtual
          columns={columns}
          dataSource={data?.data?.data}
        /> */}

      </Case>
    </Switch>
  );
}
export default Categories;
