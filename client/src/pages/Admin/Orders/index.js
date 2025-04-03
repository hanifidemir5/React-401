import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../api";
import { Box, Button, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const Orders = (props) => {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ["admin:orders"], queryFn: fetchOrders });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error message: {error.message}</div>;
  }

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div>
        <Text fontSize={"2xl"}>Orders</Text>
        <Table variant={"simple"} style={{ width: "100%" }}>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th>Items</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>{item.user.email}</Td>
                <Td>{item.address}</Td>
                <Td isNumeric>
                  <Text display={"flex"} alignSelf={"flex-start"}>
                    {item.items.length}
                  </Text>
                </Td>
                <Td>
                  <Box display={"flex"} gap={"1rem"}>
                    <Button colorScheme="blue">Edit</Button> <Button colorScheme="red">Remove</Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
