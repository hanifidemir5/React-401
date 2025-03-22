import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../contexts/BasketContext";

const ProductDetail = (props) => {
  const { product_id } = useParams();
  const { items, addToBasket } = useBasket();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error...</div>;

  const findBasketItem = items.find((item) => item._id === product_id);

  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Box display={"flex"} margin={20} gap={"1rem"} position={"relative"}>
      <Box width={800} alignSelf={"center"}>
        <ImageGallery items={images} showThumbnails={false} />
      </Box>
      <Box display={"flex"} gap={"1rem"} flexDir={"column"}>
        <Text as="h2" fontSize={"2xl"}>
          {data.title}
        </Text>
        <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
        <p>{data.description}</p>
        <Button
          position={"absolute"}
          bottom={0}
          right={0}
          alignSelf={"flex-end"}
          colorScheme={findBasketItem ? "pink" : "green"}
          onClick={() => addToBasket(data, findBasketItem)}
        >
          {findBasketItem ? "Remove from basket" : "Add to basket"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
