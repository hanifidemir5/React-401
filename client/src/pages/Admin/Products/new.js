import React from "react";
import { Formik, FieldArray, Form } from "formik";
import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import validationSchema from "./validations.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../api.js";
import { useNavigate } from "react-router-dom";

const NewProduct = (props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: (createData) => createProduct(createData),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin:products"]);
      queryClient.invalidateQueries(["admin:product"]);
      navigate("/admin/products");
    },
  });

  const handleSubmit = async (values, bag) => {
    const toastId = toast.loading("Loading...");

    const formValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    try {
      createMutation.mutate(formValues, {
        onError: (error) => {
          toast.update(toastId, { render: error.message, type: "error", isLoading: false, autoClose: 2000 });
        },
      });

      toast.update(toastId, {
        render: "The product successfully updated.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        position: "bottom-right",
      });
    } catch (e) {
      toast.update(toastId, {
        render: "The product is not updated properly.",
        type: "error",
        isLoading: false,
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <Text fontSize={"2xl"}>New Product</Text>
      <Formik
        initialValues={{ title: "", description: "", price: "", photos: [] }}
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
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <div key={index} style={{ display: "flex", gap: "2px" }}>
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
                        <Button mt={5} type="button" onClick={() => arrayHelpers.push("")} alignSelf={"flex-start"}>
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
    </div>
  );
};

export default NewProduct;
