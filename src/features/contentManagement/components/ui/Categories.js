import React from "react";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../../api";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDeleteItem from "../../../../hooks/DeleteItem";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

function Categories () {

  const deleteCategory = useDeleteItem();
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => API.get('/admin/categories')
  })

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCategory('category', id, "categories");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Image",
      dataIndex: "picture",
      key: "picture",
      render: (img, record) => (
        <div key={record.id} style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "5px",
            }}
            src={img}
            alt="Category"
          />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="edit">
            <Button
              className="btn btn-outline-primary d-flex align-items-center justify-content-center"
              type="primary"
              shape="circle"
              icon={<FiEdit2 />}
              onClick={() => navigate(`/edit-category/${record?.id}`)}
            />
          </Tooltip>
          <Tooltip title="delete">
            <Button
              className="btn btn-outline-danger d-flex align-items-center justify-content-center"
              type="danger"
              shape="circle"
              icon={<RiDeleteBin6Line />}
              onClick={() => showDeleteConfirm(record?.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  return (
    <Table bordered virtual columns={columns} dataSource={data?.data?.data} />
  );
} 
export default Categories;
