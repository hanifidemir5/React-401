import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

const Card = ({ item }) => {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find((basket_item) => basket_item._id === item._id);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`/product/${item._id}`}>
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
      <Button
        backgroundColor={findBasketItem ? "pink" : "green"}
        color={"white"}
        variant={"solid"}
        onClick={() => addToBasket(item, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket." : "Add to Basket"}
      </Button>
    </Box>
  );
};

export default Card;
