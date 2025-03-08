import React from "react";
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import validationSchema from "./validations";

const Signup = () => {
  return (
    <Flex align="center" w="full" justifyContent="center">
      <Box pt={10}>
        <Box textAlign="center">
          <Heading size="2xl">Sign up</Heading>
        </Box>
        <Box my={5} textAlign="left">
          <Formik
            initialValues={{ email: "", password: "", passwordConfirm: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
            }}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Field as={Input} name="email" />
                  <ErrorMessage name="email" component="div" />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} name="password" type="password" />
                  <ErrorMessage name="password" component="div" />
                </FormControl>

                <FormControl>
                  <FormLabel>Password Confirm</FormLabel>
                  <Field as={Input} name="passwordConfirm" type="password" />
                  <ErrorMessage name="passwordConfirm" component="div" />
                </FormControl>

                <Button mt={4} w="full" type="submit" isDisabled={isSubmitting || !isValid || !dirty}>
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
