import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext.js";
const Navbar = (props) => {
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">Ecommerce</Link>
        </div>
        <div className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </div>
      </div>
      <div className={styles.right}>
        {!loggedIn ? (
          <>
            <Link to={"/signin"}>
              <Button colorScheme="red">Login</Button>
            </Link>
            <Link to={"/signup"}>
              <Button colorScheme="red">Register</Button>
            </Link>
          </>
        ) : (
          <Link to={"/profile"}>
            <Button colorScheme="red">Profile</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
