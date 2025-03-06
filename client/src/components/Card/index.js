import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";

const Card = (props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to="#/">
        <Image src="https://picsum.photos/400/200" alt="product"></Image>
        <Box p={"6"}>
          <Box display="flex" alignItems={"baseline"}>
            12/12/2021
          </Box>
          <Box marginTop="1" fontWeight={"semibold"} as="h4" lineHeight={"tight"}>
            Macbook Pro
          </Box>
          <Box>100 TL</Box>
        </Box>
      </Link>
      <Button backgroundColor={"pink"}>Add to Basket</Button>
    </Box>
  );
};

export default Card;
