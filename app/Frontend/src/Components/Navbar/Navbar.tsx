import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import { connect } from "react-redux";

const Navbar = ({ cart } : any) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item : any) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  return (
    // <div className={styles.navbar}>
    //   <Link to="/cart">
    //     <div className={styles.navbar__cart}>
    //       <h3 className={styles.cart__title}>Cart</h3>
    //       <img
    //         className={styles.cart__image}
    //         src="https://image.flaticon.com/icons/svg/102/102276.svg"
    //         alt="shopping cart"
    //       />
    //       <div className={styles.cart__counter}>{cartCount}</div>
    //     </div>
    //   </Link>
    // </div>
    <>
    
    </>
  );
};

const mapStateToProps = (state : any) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
