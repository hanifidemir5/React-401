import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

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
      <div className="right"></div>
    </nav>
  );
};

export default Navbar;
