import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import moment from "moment";

const Card = ({ item }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to="#/">
        <Image src={item.photos[0]} alt="product" loading="lazy"></Image>
        <Box p={"6"}>
          <Box display="flex" alignItems={"baseline"}>
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Box>
          <Box marginTop="1" fontWeight={"semibold"} as="h4" lineHeight={"tight"}>
            {item.title}
          </Box>
          <Box>{item.price} TL</Box>
        </Box>
      </Link>
      <Button backgroundColor={"pink"}>Add to Basket</Button>
    </Box>
  );
};

export default Card;
