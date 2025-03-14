import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductList } from "../../../api";
import { Table } from "antd";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const AdminProducts = (props) => {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ["admin:products"], queryFn: fetchProductList });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "createdAt",
      render: (text, record) => (
        <>
          <Link to={`/admin/products/${record._id}`}>Edit</Link>
        </>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }
  return (
    <>
      <Text fontSize={"2xl"} p={5}>
        Products
      </Text>
      <Table dataSource={data} columns={columns} rowKey={"_id"} />
    </>
  );
};

export default AdminProducts;
