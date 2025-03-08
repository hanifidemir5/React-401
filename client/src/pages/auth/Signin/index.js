import React from "react";
import { Box, Flex, Heading, FormControl, FormLabel, Alert, Input, Button, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { signInValidation } from "../validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <Flex align="center" w="full" justifyContent="center">
      <Box pt={10}>
        <Box textAlign="center">
          <Heading size="2xl">Sign up</Heading>
        </Box>
        <Box my={5} textAlign="left">
          <Formik
            initialValues={{ email: "", password: "", passwordConfirm: "" }}
            validationSchema={signInValidation}
            onSubmit={async (values, bag) => {
              try {
                const registerResponse = await fetchLogin({ email: values.email, password: values.password });
                await login(registerResponse);
                return navigate("/");
              } catch (e) {
                bag.setErrors({ general: e.response.data.message });
              }
            }}
          >
            {({ isSubmitting, isValid, dirty, errors, touched }) => (
              <Form>
                <Box>
                  {errors.general && (
                    <Alert backgroundColor={"red"} color={"white"}>
                      {errors.general}
                    </Alert>
                  )}
                </Box>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Field as={Input} name="email" isInvalid={errors.email && touched.email} />
                  {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} name="password" type="password" isInvalid={errors.password && touched.password} />
                  {errors.password && touched.password ? <Text color={"red"}>{errors.password}</Text> : null}
                </FormControl>
                <Button mt={4} w="full" type="submit" isDisabled={isSubmitting || !isValid || !dirty}>
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signin;
