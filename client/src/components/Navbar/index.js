import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useBasket } from "../../contexts/BasketContext.js";
const Navbar = (props) => {
  const { loggedIn } = useAuth();
  const { items } = useBasket();

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
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant={"outline"}>
                  Basket ({items.length})
                </Button>
              </Link>
            )}
            <Link to={"/profile"}>
              <Button colorScheme="red">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
