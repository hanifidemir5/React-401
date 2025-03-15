import { Box, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../../api";
import { useParams } from "react-router-dom";

import { FieldArray, Form, Formik } from "formik";

const ProductDetail = () => {
  const { product_id } = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["admin:product", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error message: {error.message}</div>;
  }

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <Box>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          photos: data.photos || [],
          price: data.price,
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
          <Box>
            <Form onSubmit={handleSubmit}>
              <Box my={5} textAlign={"left"}>
                <FormControl mt={4}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.title}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.description}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.price}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <div key={index}>
                              <Input
                                name={`photos.${index}`}
                                value={photo}
                                disabled={isSubmitting}
                                onChange={handleChange}
                                width={"3xl"}
                              />

                              <Button ml={4} type="button" colorScheme="red" onClick={() => arrayHelpers.remove(index)}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        <Button mt={5} type="button" onClick={() => arrayHelpers.push("")}>
                          Add a photo
                        </Button>
                      </div>
                    )}
                  />
                </FormControl>

                <Button mt={5} type="submit" colorScheme="blue" isLoading={isSubmitting}>
                  Submit
                </Button>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default ProductDetail;
