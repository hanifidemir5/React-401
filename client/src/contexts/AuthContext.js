import React from "react";
import { useState, createContext, useEffect, useContext } from "react";
import { fetchLogout, fetchMe } from "../api";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();
        setLoggedIn(true);
        setUser(me);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setLoggedIn(false);
        setUser(null);
        console.log(e);
      }
    })();
  }, []);

  const login = async (data) => {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);
    await fetchLogout();
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, loading }}>
      {loading ? (
        <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size={"xl"} color="red.500" />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
