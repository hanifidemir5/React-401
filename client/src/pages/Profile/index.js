import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box, Code, Heading, Text } from "@chakra-ui/react";

const Profile = (props) => {
  const { user } = useAuth();

  return (
    <Box>
      <Heading>Profile</Heading>
      <Text>{user.email}</Text>
      <Code>{JSON.stringify(user)}</Code>
    </Box>
  );
};

export default Profile;
