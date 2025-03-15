import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../../api";
import { useParams } from "react-router-dom";

import { Form, Formik } from "formik";

const ProductDetail = (props) => {
  const { product_id } = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["admin:product", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error message: {error.message}</div>;
  }

  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <Box>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          photos: data.photos,
          price: data.price,
        }}
        onSubmit={handleSubmit}
      >
        <Form></Form>
      </Formik>
    </Box>
  );
};

export default ProductDetail;
