import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

import { Box, Button, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ["admin:products"], queryFn: fetchProductList });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Title" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "createdAt", header: "Created At" },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <>
            <Button colorScheme="blue" as={Link} to={`/admin/products/${row.original._id}`}>
              Edit
            </Button>
            <Button
              ml={2}
              colorScheme="red"
              onClick={() =>
                deleteMutation.mutate(row.original._id, {
                  onError: (error) => alert(error.message),
                })
              }
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [deleteMutation]
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Text fontSize="2xl" p={5}>
        Products
      </Text>
      <Box display="flex" justifyContent="flex-end" mb={5}>
        <Button as={Link} to="/admin/products/new">
          New
        </Button>
      </Box>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default AdminProducts;
