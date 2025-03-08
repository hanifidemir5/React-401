import React from "react";
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const Signup = (props) => {
  return (
    <Flex align={"center"} w={"full"} justifyContent={"center"}>
      <Box pt={10}>
        <Box textAlign={"center"}>
          <Heading size={"5xl"}>Sign up</Heading>
        </Box>
        <Box my={5} textAlign={"left"}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input name="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" />
          </FormControl>
          <FormControl>
            <FormLabel>Password Confirm</FormLabel>
            <Input name="passwordConfirm" type="passwordConfirm" />
          </FormControl>
          <Button mt={4} w={"full"} type="submit">
            Sign up
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
