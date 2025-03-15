import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Table, Popconfirm, Button } from "antd";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AdminProducts = (props) => {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ["admin:products"], queryFn: fetchProductList });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const queryClient = useQueryClient();

  const columns = useMemo(() => {
    return [
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
            <Button style={{ display: "inline-block", backgroundColor: "blue", color: "white" }}>
              <Link to={`/admin/products/${record._id}`}>Edit</Link>
            </Button>
            <Popconfirm
              title="Are you sure ?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onError: (error) => alert(error.message),
                });
              }}
              onCancel={() => console.log("Cancelled")}
              okText={"Yes"}
              cancelText={"No"}
              placement="left"
            >
              <Button style={{ marginLeft: 10, display: "inline-block", backgroundColor: "red", color: "white" }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, [deleteMutation]);

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
      <Table dataSource={data} columns={columns} rowKey={"_id"} tableLayout="fixed" />
    </>
  );
};

export default AdminProducts;
