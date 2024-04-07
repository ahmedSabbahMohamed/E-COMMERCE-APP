import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { API } from "../../../../api"
import { Button, Dropdown, Space, Table, Tooltip, Menu } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsThreeDotsVertical } from "react-icons/bs";
import useDeleteItem from '../../../../hooks/DeleteItem';
import { showDeleteConfirm } from '../../../../actions/events';

function Products() {
  const deleteProduct = useDeleteItem()

  const navigate = useNavigate()

  const { data: products } = useQuery({
        queryKey: ["prodcut id"],
        queryFn: () => API.get("/admin/products"),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, record, index) => index + 1,
      width: 65,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text) => (text.length > 40 ? `${text.slice(0, 40)}...` : text),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
          const items = [
            {
              key: "1",
              label: <Link className='text-decoration-none text-primary' to={`/product/${record?.id}`}>Review</Link>,
            },
          ]
        return (
          <Space size="small">
            <Tooltip title="edit">
              <Button
                className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                type="primary"
                shape="circle"
                icon={<FiEdit2 />}
                onClick={() => navigate(`/edit-product/${record?.id}`)}
              />
            </Tooltip>
  
            <Tooltip title="delete">
              <Button
                className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                type="danger"
                shape="circle"
                icon={<RiDeleteBin6Line />}
                onClick={() =>
                  showDeleteConfirm(
                    record?.id,
                    deleteProduct,
                    "product",
                    "products"
                  )
                }
              />
            </Tooltip>
  
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow
            >
              <Button
                shape="circle"
                className="border-0 shadow-0 bg-transparent d-flex align-items-center justify-content-center"
              >
                <BsThreeDotsVertical />
              </Button>
            </Dropdown>
          </Space>
        )
      }
    },
  ];

  return (
    <Table bordered virtual columns={columns} dataSource={products?.data?.data} />
  );
}

export default Products