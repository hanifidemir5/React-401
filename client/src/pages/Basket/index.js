import React from "react";
import { useBasket } from "../../contexts/BasketContext";
import { Alert, Box, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Basket = (props) => {
  const { items } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <div>
      {items.length < 1 && <Alert status="warning">There is no item in your basket.</Alert>}
      {items.length > 0 && (
        <>
          <ul>
            {items.map((item) => (
              <li key={items._id}>
                <Link to={`product/${item._id}`}>
                  {item.title} - {item.price} TL
                  <Image htmlWidth={200} src={item.photos[0]} alt="basket item" htmlw />
                </Link>
                <Button mt={2} size={"sm"} colorScheme="pink" onClick={() => {}}>
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt={10}>
            <Text>
              Total:
              {total} TL
            </Text>
          </Box>
        </>
      )}
    </div>
  );
};

export default Basket;
