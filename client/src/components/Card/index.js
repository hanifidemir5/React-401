import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

const Card = ({ item }) => {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find((basket_item) => basket_item._id === item._id);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width={"400px"}
      boxShadow={" 0px 4px 10px rgba(0, 0, 0, 0.1)"}
    >
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos[0]} alt="product" loading="lazy"></Image>
        <Box p={"6"} display={"flex"} flexDir={"column"}>
          <Box display="flex" alignItems={"baseline"}>
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Box>
          <Box fontWeight={"semibold"} fontSize={"2xl"} lineHeight={"tight"}>
            {item.title}
          </Box>
          <Text maxH={"20px"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
            {item.description}
          </Text>
        </Box>
      </Link>
      <Box m={2} display={"flex"} flexDir={"column"} justifyContent={"flex-end"}>
        <Box alignSelf={"flex-end"} fontWeight={"bold"} fontSize={"lg"}>
          {item.price} TL
        </Box>
        <Button
          backgroundColor={findBasketItem ? "pink" : "green"}
          color={"white"}
          alignSelf={"flex-end"}
          variant={"solid"}
          onClick={() => addToBasket(item, findBasketItem)}
        >
          {findBasketItem ? "Remove from basket." : "Add to Basket"}
        </Button>
      </Box>
    </Box>
  );
};

export default Card;
