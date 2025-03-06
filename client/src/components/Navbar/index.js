import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";

const Navbar = (props) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">Ecommerce</Link>
        </div>
        <div className={styles.menu}>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </div>
      </div>
      <div className={styles.right}>
        <Link to={"/signin"}>
          <Button colorScheme="red">Login</Button>
        </Link>
        <Link to={"/signup"}>
          <Button colorScheme="red">Register</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
