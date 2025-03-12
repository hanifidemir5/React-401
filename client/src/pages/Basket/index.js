import React, { useRef, useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";

const Basket = (props) => {
  const { items, emptyBasket, removeFromBasket } = useBasket();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const [address, setAddress] = useState("");

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const input = {
      address: address,
      items: JSON.stringify(itemIds),
    };

    const response = await postOrder(input);
    console.log(response);
    emptyBasket();
  };

  return (
    <Box padding={5}>
      {items.length < 1 && <Alert status="warning">There is no item in your basket.</Alert>}
      {items.length > 0 && (
        <>
          <ul>
            {items.map((item) => (
              <li key={items._id} style={{ marginBottom: 10, listStyleType: "decimal" }}>
                <Link to={`product/${item._id}`}>
                  <Text fontSize={18} fontWeight={"bold"}>
                    {item.title} - {item.price} TL
                  </Text>
                  <Image loading="lazy" htmlWidth={200} src={item.photos[0]} alt="basket item" htmlw />
                </Link>
                <Button mt={2} size={"sm"} colorScheme="pink" onClick={() => removeFromBasket(item._id)}>
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
          <Button mt={2} size={"sm"} colorScheme="green" onClick={onOpen}>
            Order
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default Basket;
