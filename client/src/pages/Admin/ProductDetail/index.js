import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, updateProduct } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";
import validationSchema from "./validations";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { product_id } = useParams();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: (updatedData) => updateProduct(updatedData, product_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin:products"]);
      queryClient.invalidateQueries(["admin:product", product_id]);
      navigate("/admin/products");
    },
  });

  const handleSubmit = async (values, bag) => {
    const toastId = toast.loading("Loading...");

    try {
      updateMutation.mutate(values, {
        onError: (error) => {
          toast.update(toastId, { render: error.message, type: "error", isLoading: false, autoClose: 2000 });
        },
      });
      try {
        toast.update(toastId, {
          render: "The product successfully updated.",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          position: "bottom-right",
        });
      } catch (e) {
        console.log("not successfull");
      }
    } catch (e) {
      toast.update(toastId, {
        render: "The product is not updated properly.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "bottom-right",
      });
    }
  };

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

  return (
    <Box>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          photos: data.photos || [],
          price: data.price,
        }}
        validationSchema={validationSchema}
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
                    isInvalid={touched.title && errors.title}
                  />

                  {touched.title && errors.title && (
                    <Text color="red" fontWeight={"bold"} mt={1}>
                      {errors.title}
                    </Text>
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.description}
                    isInvalid={touched.description && errors.description}
                  />
                  {touched.description && errors.description && (
                    <Text color="red" fontWeight={"bold"} mt={1}>
                      {errors.description}
                    </Text>
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.price}
                    isInvalid={touched.price && errors.price}
                  />
                  {touched.price && errors.price && (
                    <Text color="red" fontWeight={"bold"} mt={1}>
                      {errors.price}
                    </Text>
                  )}
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
