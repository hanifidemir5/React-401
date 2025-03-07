import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
const ProductDetail = (props) => {
  const { product_id } = useParams();
  const { isLoading, isError, data } = useQuery(["product", product_id], () => fetchProduct(product_id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Box>
      <Button colorScheme={"pink"}>Add to Basket</Button>
      <Text as="h2" fontSize={"2xl"}>
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
      <p>{data.description}</p>
    </Box>
  );
};

export default ProductDetail;
