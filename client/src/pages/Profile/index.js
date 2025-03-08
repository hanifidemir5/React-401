import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box, Button, Code, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {user && (
        <Box>
          <Heading>Profile</Heading>
          <Text>{user.email}</Text>
          <Code>{JSON.stringify(user)}</Code>
          <Button
            onClick={async () => {
              try {
                await logout();
                navigate("/");
              } catch (e) {
                console.log(e);
              }
            }}
            mt={2}
            colorScheme={"red"}
          >
            Logout
          </Button>
        </Box>
      )}
    </>
  );
};

export default Profile;
