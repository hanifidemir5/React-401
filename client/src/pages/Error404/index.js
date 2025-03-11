import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import React from "react";

const Error404 = (props) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Error 404</AlertTitle>
      <AlertDescription>Page was not found.</AlertDescription>
    </Alert>
  );
};

export default Error404;
